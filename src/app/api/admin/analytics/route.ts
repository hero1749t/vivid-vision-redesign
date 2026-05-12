import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "month";

    const now = new Date();
    const ranges: Record<string, Date> = {
      day: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      week: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      month: new Date(now.getFullYear(), now.getMonth(), 1),
      year: new Date(now.getFullYear(), 0, 1),
    };
    const startDate = ranges[period] || ranges.month;

    // Fetch all data
    const [
      totalEnrollments,
      totalStudents,
      totalRevenueResult,
      recentEnrollments,
      courseStats,
      enrollmentsForMonth,
      enrollmentBySource,
      enrollmentByStatus,
      batchUtilization,
      topBatches,
      leadsStats,
      waitlistStats,
    ] = await Promise.all([
      prisma.enrollment.count(),
      prisma.student.count({
        where: { accessLevel: { in: ["PRE_ARRIVAL", "FULL"] } },
      }),
      prisma.enrollment.aggregate({
        _sum: { amount: true },
        where: { paymentStatus: { in: ["DEPOSIT_PAID", "FULL_PAID"] } },
      }),
      prisma.enrollment.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { email: true, displayName: true } } },
      }),
      prisma.enrollment.groupBy({
        by: ["courseSlug"],
        _count: true,
        _sum: { amount: true },
      }),
      prisma.enrollment.findMany({
        where: {
          paymentStatus: { in: ["DEPOSIT_PAID", "FULL_PAID"] },
          createdAt: { gte: new Date(now.getFullYear(), now.getMonth() - 11, 1) },
        },
        select: { amount: true, createdAt: true },
      }),
      prisma.enrollment.groupBy({
        by: ["referralSource"],
        _count: true,
      }),
      prisma.enrollment.groupBy({
        by: ["paymentStatus"],
        _count: true,
      }),
      prisma.batch.findMany({
        where: { startDate: { gte: new Date(now.getFullYear(), now.getMonth() - 2, 1) } },
        select: { name: true, capacity: true, enrolled: true, status: true },
      }),
      prisma.batch.findMany({
        orderBy: { enrolled: "desc" },
        take: 5,
        select: { name: true, enrolled: true, capacity: true },
      }),
      prisma.lead.groupBy({ by: ["status"], _count: true }),
      prisma.waitlist.groupBy({ by: ["status"], _count: true }),
    ]);

    // Process revenue by month
    const monthlyRevenue: Record<string, number> = {};
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthlyRevenue[key] = 0;
    }
    enrollmentsForMonth.forEach((e) => {
      const d = new Date(e.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (monthlyRevenue[key] !== undefined) {
        monthlyRevenue[key] += e.amount;
      }
    });

    // Calculate period stats
    const periodEnrollments = await prisma.enrollment.count({
      where: { createdAt: { gte: startDate } },
    });
    const periodRevenue = await prisma.enrollment.aggregate({
      _sum: { amount: true },
      where: {
        paymentStatus: { in: ["DEPOSIT_PAID", "FULL_PAID"] },
        createdAt: { gte: startDate },
      },
    });

    return NextResponse.json({
      overview: {
        totalEnrollments,
        totalStudents,
        totalRevenue: totalRevenueResult._sum.amount || 0,
        periodRevenue: periodRevenue._sum.amount || 0,
        periodEnrollments,
        period,
      },
      recentEnrollments,
      courses: courseStats.map((c) => ({
        course: c.courseSlug,
        count: c._count,
        revenue: c._sum?.amount || 0,
      })),
      revenueByMonth: Object.entries(monthlyRevenue)
        .map(([month, revenue]) => ({ month, revenue }))
        .reverse(),
      enrollmentBySource: enrollmentBySource
        .filter((s) => s.referralSource)
        .map((s) => ({ source: s.referralSource, count: s._count })),
      enrollmentByStatus: enrollmentByStatus.map((s) => ({
        status: s.paymentStatus,
        count: s._count,
      })),
      batchUtilization: batchUtilization.map((b) => ({
        name: b.name,
        enrolled: b.enrolled,
        capacity: b.capacity,
        utilization: Math.round((b.enrolled / b.capacity) * 100),
        status: b.status,
      })),
      topBatches,
      leads: leadsStats.map((l) => ({ status: l.status, count: l._count })),
      waitlist: waitlistStats.map((w) => ({ status: w.status, count: w._count })),
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
