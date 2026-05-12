import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        modules: {
          orderBy: { order: "asc" },
        },
        batches: {
          where: {
            status: { in: ["OPEN", "DRAFT"] },
            endDate: { gte: new Date() },
          },
          include: {
            accommodation: true,
          },
          orderBy: { startDate: "asc" },
          take: 5,
        },
      },
      orderBy: { priceFrom: "asc" },
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("GET courses error:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
