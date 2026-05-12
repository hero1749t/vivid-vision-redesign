import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        modules: { orderBy: { order: "asc" } },
        batches: {
          where: { endDate: { gte: new Date() } },
          orderBy: { startDate: "asc" },
        },
      },
      orderBy: { priceFrom: "asc" },
    });
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("GET courses error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, duration, summary, description, priceFrom, priceFull, image } = body;

    const course = await prisma.course.create({
      data: { name, slug, duration, summary, description, priceFrom, priceFull, image },
    });
    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error("POST course error:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const course = await prisma.course.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error("PATCH course error:", error);
    return NextResponse.json({ error: "Failed to update course" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE course error:", error);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
