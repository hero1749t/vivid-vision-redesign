import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const [
      upcomingBatches,
      totalStudents,
      scheduleEntries,
      recentAnnouncements,
    ] = await Promise.all([
      // Get batches where teacher is assigned
      prisma.batch.findMany({
        where: {
          startDate: { gte: today },
          status: { in: ["OPEN", "FULL"] },
        },
        include: {
          course: true,
        },
        orderBy: { startDate: "asc" },
        take: 5,
      }),

      // Get total enrolled students
      prisma.student.count({
        where: {
          accessLevel: { in: ["PRE_ARRIVAL", "FULL"] },
        },
      }),

      // Get schedule for current/next batch
      prisma.scheduleEntry.findMany({
        where: {
          date: {
            gte: startOfWeek,
            lte: endOfWeek,
          },
        },
        include: {
          batch: {
            include: {
              course: true,
            },
          },
        },
        orderBy: { date: "asc" },
        take: 7,
      }),

      // Get recent announcements
      prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      upcomingBatches,
      totalStudents,
      scheduleEntries,
      recentAnnouncements,
    });
  } catch (error) {
    console.error("Teacher dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teacher data" },
      { status: 500 }
    );
  }
}
