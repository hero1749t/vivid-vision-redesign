import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get("batchId");

    const where: Record<string, unknown> = {
      accessLevel: { in: ["PRE_ARRIVAL", "FULL"] },
    };
    if (batchId) where.batchId = batchId;

    const students = await prisma.student.findMany({
      where,
      include: {
        user: {
          select: { displayName: true, email: true },
        },
        batch: {
          include: { course: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      students: students.map((s) => ({
        id: s.id,
        name: s.user.displayName || s.user.email,
        email: s.user.email,
        phone: s.phone,
        course: s.batch?.course?.name,
        batch: s.batch?.name,
        progress: Math.round((s.completedHours / s.totalHours) * 100),
        certificateIssued: s.certificateIssued,
        enrolledAt: s.enrollmentDate,
      })),
    });
  } catch (error) {
    console.error("GET teacher students error:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
