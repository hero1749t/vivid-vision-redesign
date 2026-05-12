import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Firebase Admin SDK - use dynamically to handle server-side only
async function getFirebaseAdmin() {
  if (typeof window !== "undefined") return null;

  try {
    const { default: admin } = await import("firebase-admin");

    if (!admin.apps.length) {
      const isConfigured =
        process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY;

      if (isConfigured) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
      }
    }

    return admin.apps.length ? admin : null;
  } catch (error) {
    console.error("Firebase Admin error:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (id) {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          student: true,
          staff: true,
        },
      });
      return NextResponse.json({ user });
    }

    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          student: true,
          staff: true,
        },
      });
      return NextResponse.json({ user });
    }

    // Return all users (admin only)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        displayName: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, displayName, role = "STUDENT" } = body;

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists", user: existing });
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        displayName,
        uid: `user-${Date.now()}`,
        role,
      },
    });

    // Create student record if role is STUDENT
    if (role === "STUDENT") {
      await prisma.student.create({
        data: {
          userId: user.id,
        },
      });
    }

    // Create staff record for non-student roles
    if (role !== "STUDENT") {
      await prisma.staff.create({
        data: {
          userId: user.id,
          role: role === "TEACHER" ? "TEACHER" : "STUDENT_MANAGER",
          status: "ACTIVE",
        },
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("POST user error:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, displayName, role, status } = body;

    const updateData: Record<string, unknown> = {};
    if (displayName) updateData.displayName = displayName;
    if (role) updateData.role = role;

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Update staff status if provided
    if (status) {
      await prisma.staff.updateMany({
        where: { userId: id },
        data: { status },
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("PATCH user error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
