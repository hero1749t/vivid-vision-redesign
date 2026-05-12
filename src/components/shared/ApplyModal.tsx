"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { SITE } from "@/data/site";
import { Check, CheckCircle, Zap, Shield, Loader2, Users, Home, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  trigger: React.ReactNode;
  defaultCourse?: string;
}

interface Batch {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  priceRegular: number;
  priceEarlyBird?: number;
  enrolled: number;
  capacity: number;
  accommodation: { type: string; price: number; mandatory: boolean }[];
}

interface Course {
  slug: string;
  name: string;
  priceFrom: number;
  duration: string;
  batches: Batch[];
}

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  course: string;
  batchId: string;
  accommodation: string;
  paymentType: string;
  message: string;
  referralSource: string;
}

const accommodationOptions = [
  { value: "SHARED", label: "Shared Twin Room", desc: "Included in course fee", icon: Users, price: 0 },
  { value: "PRIVATE", label: "Private Room", desc: "Private room upgrade", icon: Home, price: 400 },
  { value: "LUXURY", label: "Luxury Villa", desc: "Premium accommodation", icon: Star, price: 900 },
];

export const ApplyModal = ({ trigger, defaultCourse }: Props) => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingBatches, setLoadingBatches] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [data, setData] = useState<ApplicationData>({
    name: "",
    email: "",
    phone: "",
    course: defaultCourse ?? "200hr",
    batchId: "",
    accommodation: "SHARED",
    paymentType: "DEPOSIT",
    message: "",
    referralSource: "",
  });

  useEffect(() => {
    if (open) fetchCourses();
  }, [open]);

  const fetchCourses = async () => {
    setLoadingBatches(true);
    try {
      const res = await fetch("/api/courses?includeBatches=true");
      const result = await res.json();
      setCourses(result.courses || []);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoadingBatches(false);
    }
  };

  const selectedCourse = courses.find((c) => c.slug === data.course);
  const selectedBatch = selectedCourse?.batches.find((b) => b.id === data.batchId);
  const accommodationPrice = accommodationOptions.find((a) => a.value === data.accommodation)?.price || 0;
  const basePrice = selectedBatch?.priceRegular || selectedCourse?.priceFrom || 999;
  const totalPrice = basePrice + accommodationPrice;
  const depositAmount = 200;

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
        setData({ name: "", email: "", phone: "", course: defaultCourse ?? "200hr", batchId: "", accommodation: "SHARED", paymentType: "DEPOSIT", message: "", referralSource: "" });
      }, 300);
    }
  }, [open, defaultCourse]);

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) newErrors.name = "Name is required";
      if (!data.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Please enter a valid email";
      if (!data.phone.trim()) newErrors.phone = "Phone is required";
    }
    if (step === 2) { if (!data.batchId) newErrors.batchId = "Please select a batch"; }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(4, s + 1)); };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name, email: data.email, phone: data.phone, course: data.course,
          batchId: data.batchId, accommodation: data.accommodation, paymentType: data.paymentType,
          amount: data.paymentType === "DEPOSIT" ? depositAmount : totalPrice, currency: "USD",
          preferredDate: selectedBatch?.startDate, message: data.message, referralSource: data.referralSource,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        toast({ title: "Application received!", description: "We will review your submission and reach out within 24 hours." });
        setTimeout(() => setOpen(false), 3000);
      } else { throw new Error(result.error || "Submission failed"); }
    } catch (error) {
      console.error("Application error:", error);
      toast({ title: "Error submitting application", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-orange-50/30 border-amber-200/50 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 px-6 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="font-serif text-3xl text-gray-900 mb-3">Welcome to {SITE.name}!</h2>
              <p className="text-gray-700 mb-6">Your application has been submitted successfully.</p>
              <div className="bg-green-50 rounded-xl p-4 text-left">
                <p className="text-sm font-semibold text-gray-700 mb-2">Application Summary:</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Name:</strong> {data.name}</p>
                  <p><strong>Course:</strong> {selectedCourse?.name}</p>
                  <p><strong>Amount:</strong> ${data.paymentType === "DEPOSIT" ? depositAmount : totalPrice}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-y-auto">
              <DialogHeader>
                <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
                  <p className="inline-flex items-center gap-2 text-amber-700 font-semibold text-sm mb-3"><Zap className="w-4 h-4" />Step {step} of 4</p>
                  <DialogTitle className="font-serif text-3xl text-gray-900">Begin Your <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Yoga Journey</span></DialogTitle>
                </motion.div>
              </DialogHeader>
              <div className="flex gap-2 mt-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gray-200"}`} />
                ))}
              </div>
              <div className="space-y-5 mb-8 max-h-[50vh] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <p className="text-gray-700 font-medium">Tell us about yourself</p>
                      <div>
                        <Label htmlFor="apply-name">Full Name *</Label>
                        <Input id="apply-name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className={errors.name ? "border-red-400" : ""} placeholder="Your full name" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="apply-email">Email *</Label>
                        <Input id="apply-email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={errors.email ? "border-red-400" : ""} placeholder="you@example.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="apply-phone">Phone (with country code) *</Label>
                        <Input id="apply-phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className={errors.phone ? "border-red-400" : ""} placeholder="+1 (555) 000-0000" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      {loadingBatches ? (
                        <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" /><p className="text-gray-500 mt-2">Loading batches...</p></div>
                      ) : (
                        <>
                          <p className="text-gray-700 font-medium">Choose Your Program & Batch</p>
                          <div className="space-y-3">
                            {courses.map((course) => (
                              <button key={course.slug} type="button" onClick={() => setData({ ...data, course: course.slug, batchId: "" })} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${data.course === course.slug ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-300"}`}>
                                <div className="flex justify-between items-start">
                                  <div><p className="font-serif text-lg font-bold text-gray-900">{course.name}</p><p className="text-sm text-gray-500">{course.duration}</p></div>
                                  <p className="text-amber-700 font-bold">${course.priceFrom}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                          {selectedCourse && selectedCourse.batches.length > 0 && (
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-gray-700">Select Start Date</p>
                              {selectedCourse.batches.map((batch) => (
                                <button key={batch.id} type="button" onClick={() => setData({ ...data, batchId: batch.id })} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${data.batchId === batch.id ? "border-amber-500 bg-amber-50" : "border-gray-200 hover:border-amber-300"}`}>
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium text-gray-900">{batch.name}</p>
                                      <p className="text-sm text-gray-500">{formatDate(batch.startDate)} - {formatDate(batch.endDate)}</p>
                                      <p className={`text-xs mt-1 ${batch.capacity - batch.enrolled <= 5 ? "text-red-500 font-medium" : "text-gray-400"}`}>{batch.capacity - batch.enrolled} seats left</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-gray-900">${batch.priceRegular}</p>
                                      {batch.priceEarlyBird && new Date(batch.priceEarlyBird) > new Date() && <p className="text-xs text-green-600">Early bird: ${batch.priceEarlyBird}</p>}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          )}
                          {errors.batchId && <p className="text-red-500 text-sm">{errors.batchId}</p>}
                        </>
                      )}
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <p className="text-gray-700 font-medium">Choose Your Accommodation</p>
                      <RadioGroup value={data.accommodation} onValueChange={(value) => setData({ ...data, accommodation: value })} className="space-y-3">
                        {accommodationOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <div key={option.value} className={`relative p-4 rounded-xl border-2 transition-all ${data.accommodation === option.value ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}>
                              <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                              <Label htmlFor={option.value} className="cursor-pointer flex items-start gap-4">
                                <div className={`p-2 rounded-lg ${data.accommodation === option.value ? "bg-amber-500 text-white" : "bg-gray-100"}`}><Icon className="w-5 h-5" /></div>
                                <div className="flex-1"><p className="font-medium text-gray-900">{option.label}</p><p className="text-sm text-gray-500">{option.desc}</p></div>
                                <p className="font-bold text-gray-900">{option.price === 0 ? "Included" : `+$${option.price}`}</p>
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                      <div className="p-4 bg-blue-50 rounded-xl"><p className="text-sm text-blue-800"><strong>Note:</strong> All rooms include private bathroom, AC, Wi-Fi, and hot water.</p></div>
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      <p className="text-gray-700 font-medium">Review & Submit</p>
                      <div className="bg-amber-50 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between"><span className="text-gray-600">Name</span><span className="font-medium">{data.name}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Email</span><span className="font-medium">{data.email}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Course</span><span className="font-medium">{selectedCourse?.name}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Batch</span><span className="font-medium">{selectedBatch?.name}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Accommodation</span><span className="font-medium">{accommodationOptions.find((a) => a.value === data.accommodation)?.label}</span></div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-gray-700 font-medium">Payment Option</p>
                        <RadioGroup value={data.paymentType} onValueChange={(value) => setData({ ...data, paymentType: value })} className="space-y-2">
                          <div className={`p-4 rounded-xl border-2 ${data.paymentType === "DEPOSIT" ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}>
                            <RadioGroupItem value="DEPOSIT" id="deposit" className="sr-only" />
                            <Label htmlFor="deposit" className="cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div><p className="font-medium">Pay Deposit</p><p className="text-sm text-gray-500">Secure your spot with ${depositAmount}</p></div>
                                <p className="font-bold text-lg">${depositAmount}</p>
                              </div>
                            </Label>
                          </div>
                          <div className={`p-4 rounded-xl border-2 ${data.paymentType === "FULL" ? "border-amber-500 bg-amber-50" : "border-gray-200"}`}>
                            <RadioGroupItem value="FULL" id="full" className="sr-only" />
                            <Label htmlFor="full" className="cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div><p className="font-medium">Pay Full Amount</p><p className="text-sm text-gray-500">Get 5% discount</p></div>
                                <p className="font-bold text-lg">${totalPrice}</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div><Label htmlFor="apply-msg">Message (Optional)</Label><Textarea id="apply-msg" rows={3} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} placeholder="Yoga experience, dietary needs..." /></div>
                      <div className="bg-green-50 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-green-800"><CheckCircle className="w-4 h-4" />Free cancellation up to 30 days before</div>
                        <div className="flex items-center gap-2 text-sm text-green-800"><Shield className="w-4 h-4" />Yoga Alliance certified</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4 border-t">
                <Button variant="outline" onClick={back} disabled={step === 1 || isSubmitting}>Back</Button>
                {step < 4 ? (
                  <Button onClick={next} className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600">Continue</Button>
                ) : (
                  <Button onClick={submit} disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600">
                    {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</> : "Submit Application"}
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
