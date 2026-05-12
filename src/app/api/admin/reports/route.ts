import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "enrollments"; // enrollments, revenue, students

    const formatDate = (d: Date) => d.toISOString().split("T")[0];

    if (type === "enrollments") {
      const enrollments = await prisma.enrollment.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: { select: { email: true } } },
      });

      const csv = [
        ["ID", "Name", "Email", "Phone", "Course", "Batch", "Amount", "Currency", "Payment Status", "Created At"].join(","),
        ...enrollments.map((e) =>
          [e.id, e.name, e.email, e.phone, e.courseSlug, e.batchId || "", e.amount, e.currency, e.paymentStatus, formatDate(e.createdAt)].join(",")
        ),
      ].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="enrollments-${formatDate(new Date())}.csv"`,
        },
      });
    }

    if (type === "revenue") {
      const enrollments = await prisma.enrollment.findMany({
        where: { paymentStatus: { in: ["DEPOSIT_PAID", "FULL_PAID"] } },
        orderBy: { createdAt: "desc" },
      });

      const csv = [
        ["ID", "Name", "Email", "Course", "Amount", "Currency", "Payment Status", "Date"].join(","),
        ...enrollments.map((e) =>
          [e.id, e.name, e.email, e.courseSlug, e.amount, e.currency, e.paymentStatus, formatDate(e.createdAt)].join(",")
        ),
      ].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="revenue-${formatDate(new Date())}.csv"`,
        },
      });
    }

    if (type === "students") {
      const students = await prisma.student.findMany({
        where: { accessLevel: { in: ["PRE_ARRIVAL", "FULL"] } },
        include: {
          user: { select: { email: true } },
          batch: { include: { course: true } },
        },
        orderBy: { createdAt: "desc" },
      });

      const csv = [
        ["ID", "Name", "Email", "Phone", "Course", "Batch", "Progress", "Certificate", "Access Level"].join(","),
        ...students.map((s) =>
          [
            s.id,
            s.user?.email || "",
            s.user?.email || "",
            s.phone || "",
            s.batch?.course?.name || "",
            s.batch?.name || "",
            `${Math.round((s.completedHours / s.totalHours) * 100)}%`,
            s.certificateIssued ? "Yes" : "No",
            s.accessLevel,
          ].join(",")
        ),
      ].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="students-${formatDate(new Date())}.csv"`,
        },
      });
    }

    return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
  } catch (error) {
    console.error("Reports error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
