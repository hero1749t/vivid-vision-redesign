import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const batchId = searchParams.get("batchId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: Record<string, unknown> = {};

    if (batchId) where.batchId = batchId;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) (where.date as any).gte = new Date(startDate);
      if (endDate) (where.date as any).lte = new Date(endDate);
    }

    const schedule = await prisma.scheduleEntry.findMany({
      where,
      include: {
        batch: {
          include: {
            course: true,
            students: {
              where: { accessLevel: { in: ["PRE_ARRIVAL", "FULL"] } },
              include: {
                user: {
                  select: { displayName: true, email: true },
                },
              },
            },
          },
        },
        teacher: {
          select: { name: true, role: true },
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json({ schedule });
  } catch (error) {
    console.error("GET schedule error:", error);
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { batchId, teacherId, date, dayNumber, activities, ceremonyBlocked, notes } = body;

    if (!batchId || !date || dayNumber === undefined) {
      return NextResponse.json(
        { error: "batchId, date, and dayNumber are required" },
        { status: 400 }
      );
    }

    const schedule = await prisma.scheduleEntry.create({
      data: {
        batchId,
        teacherId,
        date: new Date(date),
        dayNumber,
        activities: activities || [],
        ceremonyBlocked: ceremonyBlocked || false,
        notes,
      },
      include: {
        batch: { include: { course: true } },
      },
    });

    return NextResponse.json({ success: true, schedule });
  } catch (error) {
    console.error("POST schedule error:", error);
    return NextResponse.json({ error: "Failed to create schedule entry" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const schedule = await prisma.scheduleEntry.update({
      where: { id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });

    return NextResponse.json({ success: true, schedule });
  } catch (error) {
    console.error("PATCH schedule error:", error);
    return NextResponse.json({ error: "Failed to update schedule entry" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.scheduleEntry.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE schedule error:", error);
    return NextResponse.json({ error: "Failed to delete schedule entry" }, { status: 500 });
  }
}
