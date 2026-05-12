"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Mail, Phone, Eye, UserX, UserCheck, MoreHorizontal, 
  ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, Shield
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  batch: string;
  progress: number;
  status: "pending" | "approved" | "rejected" | "revoked";
  accessLevel: "NONE" | "PRE_ARRIVAL" | "FULL" | "ALUMNI";
  enrolledAt: string;
  paymentStatus: "unpaid" | "deposit" | "full";
  lastActivity: string;
}

const students: Student[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@test.com", phone: "+1 555-0101", course: "200-Hour YTT", batch: "Mar 2026", progress: 0, status: "pending", accessLevel: "NONE", enrolledAt: "2026-01-15", paymentStatus: "unpaid", lastActivity: "2026-01-15" },
  { id: "2", name: "Michael Chen", email: "michael@test.com", phone: "+1 555-0102", course: "100-Hour YTT", batch: "Feb 2026", progress: 45, status: "approved", accessLevel: "PRE_ARRIVAL", enrolledAt: "2026-01-14", paymentStatus: "deposit", lastActivity: "2026-01-18" },
  { id: "3", name: "Emma Wilson", email: "emma@test.com", phone: "+1 555-0103", course: "300-Hour YTT", batch: "Apr 2026", progress: 78, status: "approved", accessLevel: "FULL", enrolledAt: "2026-01-13", paymentStatus: "full", lastActivity: "2026-01-20" },
  { id: "4", name: "David Kim", email: "david@test.com", phone: "+1 555-0104", course: "200-Hour YTT", batch: "Mar 2026", progress: 0, status: "pending", accessLevel: "NONE", enrolledAt: "2026-01-12", paymentStatus: "unpaid", lastActivity: "2026-01-12" },
  { id: "5", name: "Anna Schmidt", email: "anna@test.com", phone: "+1 555-0105", course: "100-Hour YTT", batch: "Feb 2026", progress: 100, status: "approved", accessLevel: "ALUMNI", enrolledAt: "2025-11-11", paymentStatus: "full", lastActivity: "2026-01-05" },
  { id: "6", name: "James Wilson", email: "james@test.com", phone: "+1 555-0106", course: "200-Hour YTT", batch: "Mar 2026", progress: 0, status: "rejected", accessLevel: "NONE", enrolledAt: "2026-01-10", paymentStatus: "unpaid", lastActivity: "2026-01-10" },
  { id: "7", name: "Lisa Park", email: "lisa@test.com", phone: "+1 555-0107", course: "300-Hour YTT", batch: "Apr 2026", progress: 12, status: "approved", accessLevel: "PRE_ARRIVAL", enrolledAt: "2026-01-09", paymentStatus: "deposit", lastActivity: "2026-01-19" },
  { id: "8", name: "Robert Brown", email: "robert@test.com", phone: "+1 555-0108", course: "200-Hour YTT", batch: "Mar 2026", progress: 0, status: "revoked", accessLevel: "NONE", enrolledAt: "2025-12-28", paymentStatus: "deposit", lastActivity: "2026-01-02" },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    revoked: "bg-gray-100 text-gray-600",
  };

  const accessColors: Record<string, string> = {
    NONE: "bg-gray-100 text-gray-600",
    PRE_ARRIVAL: "bg-blue-100 text-blue-800",
    FULL: "bg-green-100 text-green-800",
    ALUMNI: "bg-purple-100 text-purple-800",
  };

  const handleApprove = (id: string) => {
    console.log("Approve student:", id);
  };

  const handleReject = (id: string) => {
    console.log("Reject student:", id);
  };

  const handleRevoke = (id: string) => {
    console.log("Revoke access:", id);
  };

  const handleSendEmail = (email: string) => {
    window.open(`mailto:${email}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage enrollments, approve/reject students, control access levels</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-orange-500 text-orange-500">Export CSV</Button>
          <Button className="bg-orange-500 hover:bg-orange-600">Add Student</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-100 rounded-xl"><Clock className="w-6 h-6 text-amber-600" /></div>
            <div><p className="text-2xl font-bold">{students.filter(s => s.status === "pending").length}</p><p className="text-sm text-gray-500">Pending</p></div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl"><CheckCircle className="w-6 h-6 text-green-600" /></div>
            <div><p className="text-2xl font-bold">{students.filter(s => s.status === "approved").length}</p><p className="text-sm text-gray-500">Approved</p></div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl"><Shield className="w-6 h-6 text-blue-600" /></div>
            <div><p className="text-2xl font-bold">{students.filter(s => s.accessLevel === "FULL").length}</p><p className="text-sm text-gray-500">Full Access</p></div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl"><UserCheck className="w-6 h-6 text-purple-600" /></div>
            <div><p className="text-2xl font-bold">{students.filter(s => s.accessLevel === "ALUMNI").length}</p><p className="text-sm text-gray-500">Alumni</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search students..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="px-3 py-2 border rounded-lg text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Student</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Course / Batch</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Payment</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Access Level</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Last Activity</th>
                <th className="text-left p-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                        <p className="text-xs text-gray-400">{student.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <p className="text-sm font-medium">{student.course}</p>
                    <p className="text-xs text-gray-500">{student.batch}</p>
                  </td>
                  <td className="p-3">
                    <Badge className={student.paymentStatus === "full" ? "bg-green-100 text-green-800" : student.paymentStatus === "deposit" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"}>
                      {student.paymentStatus.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge className={accessColors[student.accessLevel]}>
                      {student.accessLevel.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm text-gray-500">{student.lastActivity}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {student.status === "pending" && (
                        <>
                          <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700" onClick={() => handleApprove(student.id)}>
                            <CheckCircle size={16} />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => handleReject(student.id)}>
                            <XCircle size={16} />
                          </Button>
                        </>
                      )}
                      {student.status === "approved" && student.accessLevel !== "NONE" && (
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700" onClick={() => handleRevoke(student.id)}>
                          <UserX size={16} />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => handleSendEmail(student.email)}>
                        <Mail size={16} />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Eye size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-500">Showing {filtered.length} of {students.length} students</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft size={16} />
              </Button>
              <span className="text-sm">Page {page}</span>
              <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(filtered.length / 10)}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
