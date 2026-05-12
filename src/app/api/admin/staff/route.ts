import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PERMISSIONS } from "@/lib/rbac";

const staffSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["SUPER_ADMIN", "STUDENT_MANAGER", "SEO_EDITOR", "FINANCE_MANAGER", "COURSE_MANAGER", "TEACHER"]),
  status: z.enum(["active", "inactive", "pending"]).default("pending"),
  invitedAt: z.string().optional(),
  lastLogin: z.string().optional(),
});

// Demo staff data
const staff = [
  { id: "staff-1", email: "admin@baliyttc.com", name: "Admin User", role: "SUPER_ADMIN" as const, status: "active" as const, permissions: ["*"] },
  { id: "staff-2", email: "student.manager@baliyttc.com", name: "Student Manager", role: "STUDENT_MANAGER" as const, status: "active" as const, permissions: PERMISSIONS.STUDENT_MANAGER },
  { id: "staff-3", email: "seo.editor@baliyttc.com", name: "SEO Editor", role: "SEO_EDITOR" as const, status: "active" as const, permissions: PERMISSIONS.SEO_EDITOR },
  { id: "staff-4", email: "finance@baliyttc.com", name: "Finance Manager", role: "FINANCE_MANAGER" as const, status: "active" as const, permissions: PERMISSIONS.FINANCE_MANAGER },
  { id: "staff-5", email: "courses@baliyttc.com", name: "Course Manager", role: "COURSE_MANAGER" as const, status: "active" as const, permissions: PERMISSIONS.COURSE_MANAGER },
];

export async function GET(request: NextRequest) {
  // In production, verify JWT and check SUPER_ADMIN role
  return NextResponse.json({ staff });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = staffSchema.parse(body);

    const newStaff = {
      id: `staff-${Date.now()}`,
      ...data,
      permissions: PERMISSIONS[data.role] || [],
      invitedAt: new Date().toISOString(),
    };

    // In production: await prisma.staff.create({ data: newStaff });
    staff.push(newStaff as typeof staff[0]);

    // Send invitation email
    // await sendInvitationEmail(data.email, data.name);

    return NextResponse.json({
      success: true,
      staff: newStaff,
      message: "Invitation sent successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create staff" }, { status: 500 });
  }
}
