import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateCertificatePDF } from "@/lib/certificate";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: params.id },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Generate PDF
    const pdfBuffer = await generateCertificatePDF({
      studentName: certificate.student.user.displayName || certificate.student.user.email || "Student",
      courseName: certificate.course,
      courseHours: parseInt(certificate.course.replace(/\D/g, "")) || 200,
      completionDate: certificate.issuedAt || new Date(),
      certificateId: certificate.certificateId,
      schoolName: "Bali Yoga Teacher Training Center",
      schoolLocation: "Ubud, Bali, Indonesia",
      instructorName: "Vivek Kalura",
    });

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="certificate-${certificate.certificateId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Certificate download error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}
