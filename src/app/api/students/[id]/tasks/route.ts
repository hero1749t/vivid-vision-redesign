import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Default pre-arrival tasks
const DEFAULT_TASKS = [
  { taskKey: "read_manual", taskTitle: "Read the course manual introduction" },
  { taskKey: "watch_video", taskTitle: "Watch the welcome video from lead teachers" },
  { taskKey: "packing_list", taskTitle: "Review the Bali packing checklist" },
  { taskKey: "complete_profile", taskTitle: "Complete your profile information" },
  { taskKey: "join_whatsapp", taskTitle: "Join the batch WhatsApp group" },
];

// Default course tasks
const COURSE_TASKS = [
  { taskKey: "daily_sadhana", taskTitle: "Complete daily sadhana practice" },
  { taskKey: "philosophy_reading", taskTitle: "Complete philosophy readings" },
  { taskKey: "anatomy_quiz", taskTitle: "Pass anatomy quiz" },
  { taskKey: "teaching_practice", taskTitle: "Complete teaching practice sessions" },
  { taskKey: "final_assessment", taskTitle: "Complete final assessment" },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;

    // Get or create task progress records
    let taskProgress = await prisma.taskProgress.findMany({
      where: { studentId },
    });

    // If no tasks exist, initialize with defaults
    if (taskProgress.length === 0) {
      const tasksToCreate = DEFAULT_TASKS.map((t) => ({
        studentId,
        taskKey: t.taskKey,
        taskTitle: t.taskTitle,
        completed: false,
      }));

      await prisma.taskProgress.createMany({
        data: tasksToCreate,
      });

      taskProgress = await prisma.taskProgress.findMany({
        where: { studentId },
      });
    }

    return NextResponse.json({ tasks: taskProgress });
  } catch (error) {
    console.error("GET tasks error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { taskKey, completed } = body;
    const studentId = params.id;

    if (!taskKey) {
      return NextResponse.json({ error: "taskKey is required" }, { status: 400 });
    }

    // Update or create task progress
    const task = await prisma.taskProgress.upsert({
      where: {
        studentId_taskKey: {
          studentId,
          taskKey,
        },
      },
      create: {
        studentId,
        taskKey,
        taskTitle: "Task",
        completed: completed ?? true,
        completedAt: completed ? new Date() : null,
      },
      update: {
        completed: completed ?? true,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, task });
  } catch (error) {
    console.error("PATCH task error:", error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { taskKey, taskTitle } = body;
    const studentId = params.id;

    if (!taskKey || !taskTitle) {
      return NextResponse.json(
        { error: "taskKey and taskTitle are required" },
        { status: 400 }
      );
    }

    const task = await prisma.taskProgress.create({
      data: {
        studentId,
        taskKey,
        taskTitle,
        completed: false,
      },
    });

    return NextResponse.json({ success: true, task });
  } catch (error) {
    console.error("POST task error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
