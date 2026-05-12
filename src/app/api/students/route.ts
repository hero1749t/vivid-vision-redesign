import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const studentSchema = z.object({
  userId: z.string(),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  yogaExperience: z.string().optional(),
  emergencyContact: z.string().optional(),
  batchId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    if (userId) {
      const student = await prisma.student.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              email: true,
              displayName: true,
              photoURL: true,
            },
          },
          batch: {
            include: {
              course: true,
            },
          },
          enrollments: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });

      if (!student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
      }
      return NextResponse.json({ student });
    }

    if (email) {
      const student = await prisma.student.findFirst({
        where: {
          user: {
            email: email,
          },
        },
        include: {
          user: {
            select: {
              email: true,
              displayName: true,
            },
          },
          batch: {
            include: {
              course: true,
            },
          },
        },
      });

      if (!student) {
        return NextResponse.json({ error: "Student not found" }, { status: 404 });
      }
      return NextResponse.json({ student });
    }

    // Return all students
    const students = await prisma.student.findMany({
      include: {
        user: {
          select: {
            email: true,
            displayName: true,
          },
        },
        batch: {
          include: {
            course: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ students });
  } catch (error) {
    console.error("GET students error:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = studentSchema.parse(body);

    const student = await prisma.student.create({
      data: data,
      include: {
        user: {
          select: {
            email: true,
            displayName: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, student });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("POST student error:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...data } = body;

    const student = await prisma.student.update({
      where: { userId },
      data: data,
      include: {
        user: {
          select: {
            email: true,
            displayName: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, student });
  } catch (error) {
    console.error("PATCH student error:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}
