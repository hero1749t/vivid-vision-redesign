import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const scheduleEntrySchema = z.object({
  id: z.string().optional(),
  batchId: z.string(),
  date: z.string(),
  dayNumber: z.number(),
  activities: z.array(z.object({
    time: z.string(),
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(["yoga", "lecture", "meal", "ceremony", "excursion", "free", "meditation"]),
    teacher: z.string().optional(),
    room: z.string().optional(),
    duration: z.string().optional(),
  })),
  ceremonyBlocked: z.boolean().default(false),
  notes: z.string().optional(),
});

// Demo schedule data
const schedule: Array<z.infer<typeof scheduleEntrySchema>> = [
  {
    id: "sched-1",
    batchId: "batch-200-mar26",
    date: "2026-03-02",
    dayNumber: 1,
    activities: [
      { time: "06:00", title: "Morning Meditation", description: "Silent meditation by the river", type: "meditation", teacher: "Sandeep Ji", room: "River Shala", duration: "45 min" },
      { time: "07:00", title: "Pranayama & Asana", description: "Sun salutations and breath work", type: "yoga", teacher: "Vivek Kalura", room: "Main Shala", duration: "2 hours" },
      { time: "09:00", title: "Breakfast", type: "meal", duration: "1 hour" },
      { time: "10:15", title: "Yoga Philosophy", description: "Introduction to Patanjali's Yoga Sutras", type: "lecture", teacher: "Sandeep Ji", room: "Study Room", duration: "1.5 hours" },
      { time: "11:45", title: "Anatomy & Physiology", description: "Skeletal system and yoga", type: "lecture", room: "Study Room", duration: "1.5 hours" },
      { time: "13:15", title: "Lunch", type: "meal", duration: "45 min" },
      { time: "14:00", title: "Free Time", description: "Rest, study, or explore Ubud", type: "free", duration: "1 hour" },
      { time: "15:00", title: "Teaching Methodology", description: "Art of sequencing and cueing", type: "lecture", teacher: "Vivek Kalura", room: "Main Shala", duration: "1.5 hours" },
      { time: "16:30", title: "Evening Practice", description: "Restorative yoga and nidra", type: "yoga", teacher: "Sachin Rautela", room: "Main Shala", duration: "1.5 hours" },
      { time: "18:00", title: "Dinner", type: "meal", duration: "1 hour" },
    ],
    ceremonyBlocked: false,
  },
  {
    id: "sched-2",
    batchId: "batch-200-mar26",
    date: "2026-03-03",
    dayNumber: 2,
    activities: [
      { time: "06:00", title: "Morning Meditation", description: "Mantra chanting", type: "meditation", teacher: "Sandeep Ji", room: "River Shala", duration: "45 min" },
      { time: "07:00", title: "Hatha Yoga", description: "Foundation poses and alignment", type: "yoga", teacher: "Sachin Rautela", room: "Main Shala", duration: "2 hours" },
      { time: "09:00", title: "Breakfast", type: "meal", duration: "1 hour" },
      { time: "10:15", title: "Philosophy Workshop", description: "Eight limbs of yoga", type: "lecture", teacher: "Sandeep Ji", room: "Study Room", duration: "1.5 hours" },
      { time: "11:45", title: "Anatomy Lab", description: "Muscular system and yoga", type: "lecture", room: "Study Room", duration: "1.5 hours" },
      { time: "13:15", title: "Lunch", type: "meal", duration: "45 min" },
      { time: "14:00", title: "Teaching Practice", description: "Student teaching sessions", type: "yoga", teacher: "Vivek Kalura", room: "Main Shala", duration: "2 hours" },
      { time: "16:00", title: "Workshop", description: "Art of Adjustments", type: "yoga", teacher: "Sachin Rautela", room: "Main Shala", duration: "1.5 hours" },
      { time: "17:30", title: "Free Time", type: "free", duration: "1.5 hours" },
      { time: "19:00", title: "Dinner", type: "meal", duration: "1 hour" },
    ],
    ceremonyBlocked: false,
  },
  {
    id: "sched-3",
    batchId: "batch-200-mar26",
    date: "2026-03-04",
    dayNumber: 3,
    activities: [
      { time: "06:00", title: "Sunrise Meditation", description: "Walking meditation", type: "meditation", teacher: "Sandeep Ji", room: "Garden", duration: "45 min" },
      { time: "07:00", title: "Ashtanga Vinyasa", description: "Primary series practice", type: "yoga", teacher: "Vivek Kalura", room: "Main Shala", duration: "2 hours" },
      { time: "09:00", title: "Breakfast", type: "meal", duration: "1 hour" },
      { time: "10:00", title: "Temple Ceremony", description: "Balinese purification ceremony", type: "ceremony", room: "Goa Gajah Temple", duration: "3 hours" },
      { time: "13:00", title: "Lunch", type: "meal", duration: "1 hour" },
      { time: "14:00", title: "Integration Session", description: "Reflection and journaling", type: "lecture", teacher: "Sandeep Ji", room: "Study Room", duration: "1.5 hours" },
      { time: "15:30", title: "Restorative Yoga", description: "Evening relaxation", type: "yoga", teacher: "Yuli", room: "Main Shala", duration: "1 hour" },
      { time: "17:00", title: "Free Time", type: "free", duration: "2 hours" },
      { time: "19:00", title: "Dinner", type: "meal", duration: "1 hour" },
    ],
    ceremonyBlocked: true,
    notes: "Temple ceremony day - no regular classes in afternoon",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const batchId = searchParams.get("batchId");
  const date = searchParams.get("date");

  let filtered = [...schedule];

  if (batchId) {
    filtered = filtered.filter((s) => s.batchId === batchId);
  }
  if (date) {
    filtered = filtered.filter((s) => s.date === date);
  }

  return NextResponse.json({
    schedule: filtered.sort((a, b) => a.date.localeCompare(b.date)),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = scheduleEntrySchema.parse(body);

    const entry = {
      id: data.id || `sched-${Date.now()}`,
      ...data,
    };

    // In production: await prisma.schedule.create({ data: entry });
    schedule.push(entry as typeof schedule[0]);

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create schedule" }, { status: 500 });
  }
}
