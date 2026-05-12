import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { sendEnrollmentConfirmation, sendAdminEnrollmentNotification } from "@/lib/resend";
import { sendEnrollmentConfirmationWhatsApp, sendWelcomeWhatsApp } from "@/lib/whatsapp";

const enrollmentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  course: z.string(),
  batchId: z.string().optional(),
  accommodation: z.enum(["SHARED", "PRIVATE", "LUXURY"]).default("SHARED"),
  paymentType: z.enum(["DEPOSIT", "FULL"]).default("DEPOSIT"),
  amount: z.number(),
  currency: z.string().default("USD"),
  couponCode: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
  referralSource: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const course = searchParams.get("course");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = {};
    if (status) where.paymentStatus = status.toUpperCase();
    if (course) where.courseSlug = course;

    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        include: {
          user: {
            select: {
              email: true,
              displayName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.enrollment.count({ where }),
    ]);

    return NextResponse.json({
      enrollments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET enrollments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = enrollmentSchema.parse(body);

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    // Create user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.email,
          displayName: data.name,
          uid: `user-${Date.now()}`,
          role: "STUDENT",
        },
      });
    }

    // Find or create student record
    let student = await prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (!student) {
      student = await prisma.student.create({
        data: {
          userId: user.id,
          phone: data.phone,
        },
      });
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        userId: user.id,
        studentId: student.id,
        courseSlug: data.course,
        batchId: data.batchId,
        accommodation: data.accommodation,
        name: data.name,
        email: data.email,
        phone: data.phone,
        preferredDate: data.preferredDate,
        message: data.message,
        paymentType: data.paymentType,
        paymentStatus: "PENDING",
        amount: data.amount,
        currency: data.currency,
        couponCode: data.couponCode,
        referralSource: data.referralSource,
        accessLevel: "PRE_ARRIVAL",
      },
      include: {
        user: {
          select: {
            email: true,
            displayName: true,
          },
        },
      },
    });

    // Get batch info for emails
    let batchName = data.preferredDate || "TBD";
    if (data.batchId) {
      const batch = await prisma.batch.findUnique({
        where: { id: data.batchId },
      });
      if (batch) {
        batchName = batch.name;
      }
    }

    // Get course info
    const course = await prisma.course.findUnique({
      where: { slug: data.course },
    });
    const courseName = course?.name || data.course;

    // Send confirmation email to student (async, don't wait)
    sendEnrollmentConfirmation({
      name: data.name,
      email: data.email,
      course: courseName,
      batch: batchName,
      amount: data.amount,
      paymentType: data.paymentType === "DEPOSIT" ? "deposit" : "full",
    }).catch(console.error);

    // Send admin notification (async, don't wait)
    sendAdminEnrollmentNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      course: courseName,
      batch: batchName,
      amount: data.amount,
      paymentType: data.paymentType === "DEPOSIT" ? "deposit" : "full",
    }).catch(console.error);

    // Send WhatsApp notification to student (async, don't wait)
    sendEnrollmentConfirmationWhatsApp({
      name: data.name,
      phone: data.phone,
      course: courseName,
      batch: batchName,
    }).catch(console.error);

    // Send welcome WhatsApp to admin (async, don't wait)
    sendWelcomeWhatsApp({
      name: data.name,
      phone: data.phone,
      course: courseName,
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      enrollment,
      message: data.paymentType === "DEPOSIT"
        ? "Deposit received! Pre-arrival access granted."
        : "Full payment received! Full access granted.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    console.error("POST enrollment error:", error);
    return NextResponse.json(
      { error: "Failed to create enrollment" },
      { status: 500 }
    );
  }
}
