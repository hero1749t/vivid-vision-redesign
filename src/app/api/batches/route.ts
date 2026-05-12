import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const batchSchema = z.object({
  courseId: z.string(),
  name: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  capacity: z.number().positive(),
  enrolled: z.number().min(0).default(0),
  priceRegular: z.number().positive(),
  priceEarlyBird: z.number().positive().optional(),
  earlyBirdDeadline: z.string().optional(),
  status: z.enum(["DRAFT", "OPEN", "FULL", "CLOSED"]).default("DRAFT"),
  waitlistEnabled: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("course");
    const status = searchParams.get("status");
    const upcoming = searchParams.get("upcoming") === "true";

    const where: Record<string, unknown> = {};

    if (courseSlug) {
      where.course = { slug: courseSlug };
    }
    if (status) {
      where.status = status.toUpperCase();
    }
    if (upcoming) {
      where.startDate = { gte: new Date() };
    }

    const batches = await prisma.batch.findMany({
      where,
      include: {
        course: {
          select: {
            slug: true,
            name: true,
          },
        },
        accommodation: true,
      },
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json({ batches });
  } catch (error) {
    console.error("GET batches error:", error);
    return NextResponse.json(
      { error: "Failed to fetch batches" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = batchSchema.parse(body);

    const batch = await prisma.batch.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        earlyBirdDeadline: data.earlyBirdDeadline ? new Date(data.earlyBirdDeadline) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      batch,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("POST batch error:", error);
    return NextResponse.json(
      { error: "Failed to create batch" },
      { status: 500 }
    );
  }
}
