import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { TEACHERS as STATIC_TEACHERS } from "@/data/site";

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ teachers });
  } catch (error) {
    console.error("GET teachers error:", error);
    return NextResponse.json({
      teachers: STATIC_TEACHERS.map((teacher, index) => ({
        id: `static-teacher-${index + 1}`,
        name: teacher.name,
        slug: teacher.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        role: teacher.role,
        credentials: teacher.cred,
        bio: teacher.bio,
        image: teacher.img,
        styles: teacher.style,
        isActive: true,
      })),
      fallback: true,
    });
  }
}
