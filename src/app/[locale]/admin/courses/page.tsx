"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Clock, DollarSign, Globe, Edit, Copy, Trash2, Eye } from "lucide-react";

const courses = [
  { id: "1", name: "200-Hour Yoga Teacher Training", slug: "200hr", duration: "21 Days", price: 1499, fullPrice: 1899, language: "English", students: 68, active: true },
  { id: "2", name: "100-Hour Foundation Course", slug: "100hr", duration: "11 Days", price: 999, fullPrice: 1299, language: "English", students: 35, active: true },
  { id: "3", name: "300-Hour Advanced YTT", slug: "300hr", duration: "28 Days", price: 1899, fullPrice: 2299, language: "English", students: 24, active: true },
  { id: "4", name: "50-Hour Hatha-Vinyasa", slug: "50hr", duration: "7 Days", price: 699, fullPrice: 899, language: "English", students: 12, active: true },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const filtered = courses.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your yoga training programs</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus size={16} className="mr-2" /> Add Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <Card key={course.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                </div>
                <Badge className={course.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                  {course.active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-4">/{course.slug}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} />
                  <span>From €{course.price} / €{course.fullPrice}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye size={14} className="mr-1" /> View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit size={14} />
                </Button>
                <Button variant="outline" size="sm">
                  <Copy size={14} />
                </Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
