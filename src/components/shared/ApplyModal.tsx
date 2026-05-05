import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { COURSES, SITE } from "@/data/site";
import { Check, CheckCircle, Zap, Heart, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  trigger: React.ReactNode;
  defaultCourse?: string;
}

export const ApplyModal = ({ trigger, defaultCourse }: Props) => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    course: defaultCourse ?? "200hr",
    date: "",
    message: "",
  });

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!data.name.trim()) newErrors.name = "Name is required";
      if (!data.email.trim()) newErrors.email = "Email is required";
      if (!data.phone.trim()) newErrors.phone = "Phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      setStep((s) => Math.min(3, s + 1));
    }
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Application received",
        description: `We will review your submission and reach out within 24 hours. Welcome to ${SITE.name}.`,
      });
      setTimeout(() => {
        setOpen(false);
        setStep(1);
        setIsSuccess(false);
        setData({ name: "", email: "", phone: "", course: defaultCourse ?? "200hr", date: "", message: "" });
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-orange-50/30 border-amber-200/50 shadow-2xl">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 px-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="font-serif text-3xl text-gray-900 mb-3">
                Welcome to {SITE.name}
              </h2>
              <p className="text-gray-700 mb-2">
                Your application has been submitted successfully.
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Check your email for next steps. Our team will be in touch within 24 hours!
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Confirmation email sent
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
                  <p className="inline-flex items-center gap-2 text-amber-700 font-semibold text-sm mb-3">
                    <Zap className="w-4 h-4" />
                    Apply now / Step {step} of 3
                  </p>
                  <DialogTitle className="font-serif text-3xl md:text-4xl text-gray-900 leading-tight">
                    Begin Your
                    <br />
                    <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      Yoga Journey
                    </span>
                  </DialogTitle>
                </motion.div>
              </DialogHeader>

              {/* Progress Bar */}
              <div className="flex gap-2 mt-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className={`h-1.5 flex-1 rounded-full transition-all origin-left ${
                      i <= step
                        ? "bg-gradient-to-r from-amber-500 to-orange-500"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Form Content */}
              <div className="space-y-5 mb-8 max-h-96 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <p className="text-gray-700 font-medium">Tell us about yourself</p>
                      <div>
                        <Label htmlFor="name" className="text-gray-700 text-sm font-semibold">Full Name *</Label>
                        <Input
                          id="name"
                          value={data.name}
                          onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          className={`mt-2 bg-white border-2 transition-all ${
                            errors.name ? "border-red-400" : "border-amber-100 focus:border-amber-400"
                          }`}
                          placeholder="Your full name"
                        />
                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700 text-sm font-semibold">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={data.email}
                          onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`mt-2 bg-white border-2 transition-all ${
                            errors.email ? "border-red-400" : "border-amber-100 focus:border-amber-400"
                          }`}
                          placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-gray-700 text-sm font-semibold">Phone (with country code) *</Label>
                        <Input
                          id="phone"
                          value={data.phone}
                          onChange={(e) => {
                            setData({ ...data, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          className={`mt-2 bg-white border-2 transition-all ${
                            errors.phone ? "border-red-400" : "border-amber-100 focus:border-amber-400"
                          }`}
                          placeholder="+1 (555) 000-0000"
                        />
                        {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <p className="text-gray-700 font-semibold mb-4">Choose Your Program</p>
                        {COURSES.map((c) => (
                          <motion.button
                            key={c.slug}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setData({ ...data, course: c.slug })}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all mb-3 ${
                              data.course === c.slug
                                ? "border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 ring-2 ring-amber-200"
                                : "border-gray-200 bg-white hover:border-amber-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-serif text-lg text-gray-900 font-bold">{c.title}</p>
                                <p className="text-xs text-gray-600 mt-1">{c.style} / {c.days} days</p>
                              </div>
                              <div className="text-right">
                                <p className="text-amber-700 font-bold text-lg">${c.priceFrom}</p>
                                {c.featured && <p className="text-[10px] text-amber-600 font-semibold">Popular</p>}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="date" className="text-gray-700 text-sm font-semibold">Preferred Start Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={data.date}
                          onChange={(e) => setData({ ...data, date: e.target.value })}
                          className="mt-2 bg-white border-2 border-amber-100 focus:border-amber-400"
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div>
                        <Label htmlFor="msg" className="text-gray-700 text-sm font-semibold">Tell Us More About You</Label>
                        <Textarea
                          id="msg"
                          rows={4}
                          value={data.message}
                          onChange={(e) => setData({ ...data, message: e.target.value })}
                          className="mt-2 bg-white border-2 border-amber-100 focus:border-amber-400"
                          placeholder="Yoga experience, wellness goals, dietary needs..."
                        />
                      </div>

                      {/* Trust Signals */}
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200"
                      >
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800">No payment required now - receive a custom enrolment link after review</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800">Personal reply within 24 hours from our admissions team</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800">Free cancellation up to 30 days before program start</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800">Yoga Alliance certified program with international recognition</span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={back}
                  disabled={step === 1}
                  className="border-gray-300 hover:border-gray-400 disabled:opacity-50"
                >
                  Back
                </Button>

                {step < 3 ? (
                  <Button
                    onClick={next}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold h-12 rounded-lg transition-all hover:shadow-lg"
                  >
                                        Continue
                  </Button>
                ) : (
                  <motion.div className="flex-1">
                    <Button
                      onClick={submit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold h-12 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Complete application"}
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Step Info */}
              <p className="text-xs text-gray-600 text-center mt-4">
                {step === 1 && "Step 1: Your Contact Information"}
                {step === 2 && "Step 2: Select Your Program"}
                {step === 3 && "Step 3: Final Details & Submit"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

