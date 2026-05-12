import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateCertificatePDF, generateCertificateId } from "@/lib/certificate";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const studentEmail = searchParams.get("email");
    const courseSlug = searchParams.get("course");

    let student;

    if (studentId) {
      student = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
          user: true,
          certificates: true,
        },
      });
    } else if (studentEmail) {
      student = await prisma.student.findFirst({
        where: { user: { email: studentEmail } },
        include: {
          user: true,
          certificates: true,
        },
      });
    }

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Get certificates
    const certificates = await prisma.certificate.findMany({
      where: { studentId: student.id },
      orderBy: { issuedAt: "desc" },
    });

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("GET certificates error:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, courseSlug } = body;

    if (!studentId || !courseSlug) {
      return NextResponse.json(
        { error: "studentId and courseSlug are required" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if certificate already exists
    const existing = await prisma.certificate.findFirst({
      where: {
        studentId: student.id,
        course: course.name,
      },
    });

    if (existing) {
      return NextResponse.json({ certificate: existing, message: "Certificate already exists" });
    }

    // Generate certificate ID
    const year = new Date().getFullYear();
    const certificateId = generateCertificateId(courseSlug, year);

    // Create certificate record
    const certificate = await prisma.certificate.create({
      data: {
        studentId: student.id,
        certificateId,
        course: course.name,
        status: "ISSUED",
        issuedAt: new Date(),
      },
    });

    // Update student progress
    await prisma.student.update({
      where: { id: student.id },
      data: {
        certificateIssued: true,
        certificateId: certificate.id,
      },
    });

    return NextResponse.json({
      success: true,
      certificate,
    });
  } catch (error) {
    console.error("POST certificate error:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
