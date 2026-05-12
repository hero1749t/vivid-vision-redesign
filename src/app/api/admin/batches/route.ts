import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const batches = await prisma.batch.findMany({
      include: {
        course: true,
        accommodation: true,
        students: true,
      },
      orderBy: { startDate: "asc" },
    });
    return NextResponse.json({ batches });
  } catch (error) {
    console.error("GET batches error:", error);
    return NextResponse.json({ error: "Failed to fetch batches" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, name, startDate, endDate, capacity, priceRegular, priceEarlyBird, earlyBirdDeadline, status = "DRAFT", waitlistEnabled = false, accommodation } = body;

    const batch = await prisma.batch.create({
      data: {
        courseId,
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        capacity,
        enrolled: 0,
        priceRegular,
        priceEarlyBird,
        earlyBirdDeadline: earlyBirdDeadline ? new Date(earlyBirdDeadline) : null,
        status,
        waitlistEnabled,
      },
      include: { course: true },
    });

    // Create accommodation options
    if (accommodation && accommodation.length > 0) {
      await prisma.accommodation.createMany({
        data: accommodation.map((a: any) => ({
          batchId: batch.id,
          type: a.type,
          price: a.price,
          mandatory: a.mandatory || false,
        })),
      });
    }

    const batchWithAccommodation = await prisma.batch.findUnique({
      where: { id: batch.id },
      include: { accommodation: true },
    });

    return NextResponse.json({ success: true, batch: batchWithAccommodation });
  } catch (error) {
    console.error("POST batch error:", error);
    return NextResponse.json({ error: "Failed to create batch" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);
    if (data.earlyBirdDeadline) data.earlyBirdDeadline = new Date(data.earlyBirdDeadline);

    const batch = await prisma.batch.update({
      where: { id },
      data,
      include: { accommodation: true },
    });
    return NextResponse.json({ success: true, batch });
  } catch (error) {
    console.error("PATCH batch error:", error);
    return NextResponse.json({ error: "Failed to update batch" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    await prisma.batch.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE batch error:", error);
    return NextResponse.json({ error: "Failed to delete batch" }, { status: 500 });
  }
}
