import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        progress: {
          orderBy: { createdAt: "asc" },
        },
        batch: {
          include: {
            course: {
              include: {
                modules: {
                  orderBy: { order: "asc" },
                },
              },
            },
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const modules = student.batch?.course?.modules || [];
    const completedModuleIds = student.progress
      .filter((p) => p.completed)
      .map((p) => p.moduleId);

    const totalModules = modules.length;
    const completedModules = completedModuleIds.length;
    const progressPercentage = totalModules > 0
      ? Math.round((completedModules / totalModules) * 100)
      : 0;

    return NextResponse.json({
      student: {
        id: student.id,
        completedHours: student.completedHours,
        totalHours: student.totalHours,
        progressPercentage,
        totalModules,
        completedModules,
      },
      modules: modules.map((m: any) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        hours: m.hours,
        order: m.order,
        completed: completedModuleIds.includes(m.id),
      })),
      progress: student.progress,
    });
  } catch (error) {
    console.error("GET progress error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { moduleId, completed, notes } = body;
    const studentId = params.id;

    if (!moduleId) {
      return NextResponse.json({ error: "moduleId is required" }, { status: 400 });
    }

    // Update or create module progress
    const progress = await prisma.moduleProgress.upsert({
      where: {
        studentId_moduleId: {
          studentId,
          moduleId,
        },
      },
      create: {
        studentId,
        moduleId,
        moduleTitle: "Module",
        completed: completed ?? true,
        completedAt: completed ? new Date() : null,
        notes,
      },
      update: {
        completed: completed ?? true,
        completedAt: completed ? new Date() : null,
        notes,
      },
    });

    // Recalculate student progress
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        progress: true,
        batch: {
          include: {
            course: {
              include: {
                modules: true,
              },
            },
          },
        },
      },
    });

    if (student) {
      const completedModules = student.progress.filter((p) => p.completed).length;
      const totalHours = student.batch?.course?.modules.reduce(
        (sum: number, m: any) => sum + (m.hours || 0),
        0
      ) || student.totalHours;

      const completedHours = student.progress
        .filter((p) => p.completed)
        .reduce((sum: number, p) => {
          const module = student.batch?.course?.modules?.find(
            (m: any) => m.id === p.moduleId
          );
          return sum + (module?.hours || 0);
        }, 0);

      await prisma.student.update({
        where: { id: studentId },
        data: {
          completedHours,
          totalHours,
          modulesCompleted: student.progress
            .filter((p) => p.completed)
            .map((p) => p.moduleId),
        },
      });
    }

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("PATCH progress error:", error);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
