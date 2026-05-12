"use client";
import { useState, useEffect } from "react";
import { NextLayoutWrapper } from "@/components/layout/NextLayoutWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GraduationCap, Calendar, Download, Book, Video, CheckCircle2,
  Clock, MessageCircle, FileText, Award, Settings, LogOut,
  ChevronRight, Loader2, ExternalLink
} from "lucide-react";

interface StudentData {
  id: string;
  enrolledCourse?: string;
  batchId?: string;
  paymentStatus: string;
  accessLevel: string;
  completedHours: number;
  totalHours: number;
  batch?: {
    name: string;
    startDate: string;
    endDate: string;
    course?: {
      name: string;
    };
  };
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  icon: string;
}

export default function StudentDashboardPage() {
  const { user, role, logout } = useAuth();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, [user]);

  const fetchStudentData = async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(`/api/students?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();

      if (data.student) {
        setStudentData(data.student);
      }
    } catch (err) {
      console.error("Failed to fetch student data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysUntilStart = (startDate: string) => {
    if (!startDate) return 0;
    const start = new Date(startDate);
    const today = new Date();
    const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const progress = studentData
    ? Math.round((studentData.completedHours / studentData.totalHours) * 100)
    : 0;

  const daysUntilStart = studentData?.batch?.startDate
    ? getDaysUntilStart(studentData.batch.startDate)
    : 0;

  const preArrivalTasks: Task[] = [
    { id: 1, title: "Read the course manual introduction", completed: false, icon: "FileText" },
    { id: 2, title: "Watch the welcome video from lead teachers", completed: false, icon: "Video" },
    { id: 3, title: "Review the Bali packing checklist", completed: false, icon: "CheckCircle2" },
    { id: 4, title: "Complete your profile information", completed: false, icon: "Settings" },
    { id: 5, title: "Join the batch WhatsApp group", completed: false, icon: "MessageCircle" },
  ];

  const resources = [
    {
      icon: Book,
      title: "Course Manual",
      subtitle: "Read online or download PDF",
      color: "bg-blue-500",
      available: true,
    },
    {
      icon: Video,
      title: "Welcome Video",
      subtitle: "Message from your teachers",
      color: "bg-red-500",
      available: true,
    },
    {
      icon: FileText,
      title: "Packing List",
      subtitle: "What to bring to Bali",
      color: "bg-green-500",
      available: true,
    },
    {
      icon: Award,
      title: "Certificate Preview",
      subtitle: "See your certificate template",
      color: "bg-purple-500",
      available: studentData?.paymentStatus === "FULL_PAID",
    },
  ];

  const icons: Record<string, React.ElementType> = {
    FileText, Video, CheckCircle2, Settings, MessageCircle,
  };

  if (loading) {
    return (
      <NextLayoutWrapper>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <Skeleton className="h-14 w-64 bg-white/20" />
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
            <Skeleton className="h-40 w-full" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </main>
        </div>
      </NextLayoutWrapper>
    );
  }

  return (
    <NextLayoutWrapper>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {(user?.displayName || "S")[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Welcome, {user?.displayName || "Student"}!</h1>
                  <p className="text-white/80">
                    {daysUntilStart > 0
                      ? `Your yoga journey begins in ${daysUntilStart} days!`
                      : "Your yoga journey continues!"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-white hover:bg-white/20" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Course Overview Card */}
          <Card className="mb-6 border-orange-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500 rounded-lg">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      {studentData?.batch?.course?.name || studentData?.enrolledCourse || "No Enrolled Course"}
                    </CardTitle>
                    <CardDescription>
                      {studentData?.batch?.name || "Batch TBD"} - Ubud, Bali
                    </CardDescription>
                  </div>
                </div>
                <Badge className={`text-sm px-3 py-1 ${
                  studentData?.accessLevel === "FULL"
                    ? "bg-green-100 text-green-800"
                    : studentData?.accessLevel === "PRE_ARRIVAL"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {studentData?.accessLevel === "FULL"
                    ? "Enrolled"
                    : studentData?.accessLevel === "PRE_ARRIVAL"
                    ? "Pre-Arrival"
                    : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-semibold text-lg">
                    {formatDate(studentData?.batch?.startDate || "")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-semibold text-lg">
                    {formatDate(studentData?.batch?.endDate || "")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Days Until Start</p>
                  <p className="font-semibold text-lg text-orange-600">
                    {daysUntilStart > 0 ? `${daysUntilStart} days` : "Started!"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Course Progress</p>
                  <p className="font-semibold text-lg">{progress}%</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{studentData?.completedHours || 0}/{studentData?.totalHours || 200} hours</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pre-Arrival Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-orange-500" />
                  Pre-Arrival Tasks
                </CardTitle>
                <CardDescription>Complete these tasks before your training begins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {preArrivalTasks.map((task) => {
                    const Icon = icons[task.icon] || CheckCircle2;
                    return (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          task.completed ? "bg-green-50" : "bg-gray-50"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${task.completed ? "bg-green-100" : "bg-gray-200"}`}>
                          <Icon className={`h-4 w-4 ${task.completed ? "text-green-600" : "text-gray-600"}`} />
                        </div>
                        <span className={`flex-1 ${task.completed ? "text-green-700" : "text-gray-700"}`}>
                          {task.title}
                        </span>
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Button variant="ghost" size="sm">Start</Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-orange-500" />
                  Resources
                </CardTitle>
                <CardDescription>Access your course materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {resources.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={i}
                        disabled={!item.available}
                        className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors text-left ${
                          item.available
                            ? "bg-gray-50 hover:bg-gray-100 cursor-pointer"
                            : "bg-gray-50 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${item.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.subtitle}</p>
                        </div>
                        {item.available ? (
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Badge variant="outline">Coming Soon</Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Schedule */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                Upcoming Schedule
              </CardTitle>
              <CardDescription>Your training schedule will appear here once it begins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Schedule will be available soon</p>
                <p className="text-sm">Check back closer to your start date for daily class schedules</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Need help?</p>
                    <p className="text-sm text-gray-600">Our team is here to support you</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100" asChild>
                    <a href="https://wa.me/6281999333327" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                    </a>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" asChild>
                    <a href="mailto:info@baliyttc.com">
                      <Download className="h-4 w-4 mr-2" /> Email Us
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </NextLayoutWrapper>
  );
}
