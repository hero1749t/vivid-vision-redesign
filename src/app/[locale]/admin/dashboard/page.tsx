"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users, DollarSign, GraduationCap, Calendar,
  Search, Eye, Mail, CreditCard, BookOpen, Tag, Bell,
  ArrowUpRight, ArrowDownRight, CheckCircle, Clock, XCircle,
  Loader2
} from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  DEPOSIT_PAID: "bg-blue-100 text-blue-800 border-blue-200",
  FULL_PAID: "bg-green-100 text-green-800 border-green-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  FAILED: "bg-red-100 text-red-800 border-red-200",
  failed: "bg-red-100 text-red-800 border-red-200",
};

interface AnalyticsStats {
  totalEnrollments: number;
  totalStudents: number;
  totalRevenue: number;
  upcomingBatches: number;
  monthlyRevenue: number;
}

interface Enrollment {
  id: string;
  name: string;
  email: string;
  courseSlug: string;
  amount: number;
  paymentStatus: string;
  createdAt: string;
  user?: {
    email: string;
    displayName: string;
  };
}

interface Student {
  id: string;
  completedHours: number;
  totalHours: number;
  user?: {
    email: string;
    displayName: string;
  };
}

interface Batch {
  id: string;
  name: string;
  enrolled: number;
  capacity: number;
  status: string;
  startDate: string;
  endDate: string;
  course?: {
    name: string;
  };
}

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";
  const [search, setSearch] = useState("");

  // Data states
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [analyticsRes, enrollmentsRes, studentsRes, batchesRes] = await Promise.all([
        fetch('/api/admin/analytics'),
        fetch('/api/enrollments'),
        fetch('/api/students'),
        fetch('/api/batches'),
      ]);

      const [analytics, enrollData, studentsData, batchesData] = await Promise.all([
        analyticsRes.json(),
        enrollmentsRes.json(),
        studentsRes.json(),
        batchesRes.json(),
      ]);

      setStats(analytics.stats);
      setEnrollments(enrollData.enrollments || []);
      setStudents(studentsData.students || []);
      setBatches(batchesData.batches || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.email?.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'pending',
      DEPOSIT_PAID: 'deposit_paid',
      FULL_PAID: 'confirmed',
      FAILED: 'failed',
      OPEN: 'open',
      DRAFT: 'draft',
      FULL: 'full',
      CLOSED: 'closed',
    };
    return labels[status] || status.toLowerCase();
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-700">{error}</p>
            <Button onClick={fetchData} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const metrics = [
    {
      label: "Total Enrollments",
      value: stats?.totalEnrollments || 0,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      label: "Revenue",
      value: formatCurrency(stats?.totalRevenue || 0),
      change: "+23%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      label: "Active Students",
      value: stats?.totalStudents || 0,
      change: "+8%",
      trend: "up",
      icon: GraduationCap,
      color: "bg-purple-500"
    },
    {
      label: "Upcoming Batches",
      value: stats?.upcomingBatches || 0,
      change: "-1",
      trend: "down",
      icon: Calendar,
      color: "bg-orange-500"
    },
  ];

  const renderContent = () => {
    switch (tab) {
      case "students":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <div className="grid gap-4">
              {students.length === 0 ? (
                <Card className="bg-white border-0 shadow-sm">
                  <CardContent className="p-6 text-center text-gray-500">
                    No students found
                  </CardContent>
                </Card>
              ) : students.map((s) => (
                <Card key={s.id} className="bg-white border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                          {s.user?.displayName?.split(' ').map(n => n[0]).join('') || 'S'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{s.user?.displayName || 'Student'}</p>
                          <p className="text-sm text-gray-500">{s.user?.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {Math.round((s.completedHours / s.totalHours) * 100)}% complete
                        </p>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(s.completedHours / s.totalHours) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "enrollments":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Enrollments</h1>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">Student</th>
                        <th className="text-left py-3 px-2">Course</th>
                        <th className="text-left py-3 px-2">Date</th>
                        <th className="text-left py-3 px-2">Amount</th>
                        <th className="text-left py-3 px-2">Status</th>
                        <th className="text-right py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEnrollments.map((e) => (
                        <tr key={e.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <p className="font-medium">{e.name}</p>
                            <p className="text-xs text-gray-500">{e.email}</p>
                          </td>
                          <td className="py-3 px-2 uppercase">{e.courseSlug}</td>
                          <td className="py-3 px-2 text-sm text-gray-500">{formatDate(e.createdAt)}</td>
                          <td className="py-3 px-2 font-medium">{formatCurrency(e.amount)}</td>
                          <td className="py-3 px-2">
                            <Badge className={statusColors[e.paymentStatus] || statusColors.pending}>
                              {getStatusLabel(e.paymentStatus)}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Button size="sm" variant="ghost"><Eye size={16} /></Button>
                            <Button size="sm" variant="ghost"><Mail size={16} /></Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "finance":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-0 shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-green-100 rounded-xl"><DollarSign className="w-8 h-8 text-green-600" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats?.totalRevenue || 0)}</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-white border-0 shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-100 rounded-xl"><CheckCircle className="w-8 h-8 text-blue-600" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats?.monthlyRevenue || 0)}</p>
                  </div>
                </div>
              </Card>
              <Card className="bg-white border-0 shadow-sm p-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-amber-100 rounded-xl"><CreditCard className="w-8 h-8 text-amber-600" /></div>
                  <div>
                    <p className="text-sm text-gray-500">Total Enrollments</p>
                    <p className="text-3xl font-bold text-gray-900">{stats?.totalEnrollments || 0}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case "coupons":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <p className="text-gray-500 text-center py-8">
                  Coupon management coming soon. Create coupons from the CLI.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case "batches":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.length === 0 ? (
                <Card className="bg-white border-0 shadow-sm col-span-full">
                  <CardContent className="p-6 text-center text-gray-500">
                    No batches found
                  </CardContent>
                </Card>
              ) : batches.map((b) => (
                <Card key={b.id} className="bg-white border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{b.name}</h3>
                        <p className="text-sm text-gray-500">{b.course?.name || b.name}</p>
                      </div>
                      <Badge className={b.status === "OPEN" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {b.status.toLowerCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(b.startDate)} - {formatDate(b.endDate)}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Enrolled</span>
                        <span className="font-medium">{b.enrolled}/{b.capacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${(b.enrolled / b.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">School Name</label>
                  <Input defaultValue="Bali YTTC" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact Email</label>
                  <Input defaultValue="info@baliyttc.com" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
                  <Input defaultValue="6281999333327" className="mt-1" />
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        );

      default: // overview
        return (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening with Bali YTTC.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <Card key={m.label} className="bg-white border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${m.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className={`flex items-center text-sm font-medium ${m.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {m.trend === "up" ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          {m.change}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{m.value}</h3>
                      <p className="text-sm text-gray-500 mt-1">{m.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">Recent Enrollments</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 w-48"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredEnrollments.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No enrollments found</p>
                ) : (
                  <div className="space-y-4">
                    {filteredEnrollments.slice(0, 5).map((e) => (
                      <div key={e.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                            {e.name?.split(' ').map(n => n[0]).join('') || 'S'}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{e.name}</p>
                            <p className="text-sm text-gray-500">{e.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(e.amount)}</p>
                            <p className="text-sm text-gray-500 uppercase">{e.courseSlug}</p>
                          </div>
                          <Badge className={statusColors[e.paymentStatus] || statusColors.pending}>
                            {getStatusLabel(e.paymentStatus)}
                          </Badge>
                          <Button size="sm" variant="ghost"><Eye size={16} /></Button>
                          <Button size="sm" variant="ghost"><Mail size={16} /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return renderContent();
}
