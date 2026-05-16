import { NextRequest } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { getRoleHomePath, isAdminPanelRole, type AppRole } from "@/lib/rbac";
import { getClientIp, jsonWithRequestId, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function expectedPassword(email: string) {
  if (email === "student@test.com") return process.env.TEST_STUDENT_PASSWORD;
  if (email === "teacher@test.com") return process.env.TEST_TEACHER_PASSWORD;
  return null;
}

export async function POST(request: NextRequest) {
  if (process.env.ENABLE_TEST_LOGIN !== "true") {
    return jsonWithRequestId({ error: "Test login is disabled" }, { status: 404 }, request);
  }

  const limit = rateLimit({
    key: `auth:test-login:${getClientIp(request)}`,
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });

  if (!limit.allowed) {
    return jsonWithRequestId({ error: "Too many login attempts. Try again later." }, { status: 429 }, request);
  }

  try {
    const { email, password } = schema.parse(await request.json());
    const normalizedEmail = email.toLowerCase();
    const configuredPassword = expectedPassword(normalizedEmail);

    if (!configuredPassword || password !== configuredPassword) {
      return jsonWithRequestId({ error: "Invalid credentials" }, { status: 401 }, request);
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { staff: true, student: true },
    });

    if (!user) {
      return jsonWithRequestId({ error: "User not found" }, { status: 404 }, request);
    }

    if (normalizedEmail === "student@test.com") {
      if (!user.student || user.student.accessLevel === "NONE") {
        return jsonWithRequestId({ error: "Student access is not active" }, { status: 403 }, request);
      }
    }

    if (normalizedEmail === "teacher@test.com") {
      if (!user.staff || user.staff.status !== "ACTIVE") {
        return jsonWithRequestId({ error: "Teacher access is not active" }, { status: 403 }, request);
      }
    }

    const role: AppRole = user.staff?.status === "ACTIVE" ? (user.staff.role as AppRole) : (user.role as AppRole);

    if (user.staff?.status === "ACTIVE") {
      await prisma.staff.update({
        where: { id: user.staff.id },
        data: { lastLogin: new Date() },
      });
    }

    await createSession(user.id, role, user.email);

    return jsonWithRequestId({
      success: true,
      role,
      redirectTo: getRoleHomePath(role),
      isAdmin: isAdminPanelRole(role) || role === "ADMIN",
      testLogin: true,
    }, undefined, request);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonWithRequestId({ error: "Validation failed", details: error.errors }, { status: 400 }, request);
    }
    console.error("test login error:", error);
    return jsonWithRequestId({ error: "Failed to login" }, { status: 500 }, request);
  }
}
