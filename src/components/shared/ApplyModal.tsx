import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { COURSES } from "@/data/site";
import { Check } from "lucide-react";

interface Props {
  trigger: React.ReactNode;
  defaultCourse?: string;
}

export const ApplyModal = ({ trigger, defaultCourse }: Props) => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    course: defaultCourse ?? "200hr",
    date: "",
    message: "",
  });

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const submit = () => {
    toast({
      title: "Application received ✦",
      description: "Demo submission — our team will be in touch within 24 hours.",
    });
    setOpen(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg bg-cream border-terra/20">
        <DialogHeader>
          <p className="eyebrow text-terra mb-2">Apply · Step {step} of 3</p>
          <DialogTitle className="font-serif text-3xl text-warm-dark leading-tight">
            Reserve your seat in <em className="text-terra">Bali</em>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-1.5 mt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-terra" : "bg-sand-deep"
              }`}
            />
          ))}
        </div>

        <div className="space-y-4 mt-4">
          {step === 1 && (
            <>
              <div>
                <Label htmlFor="name" className="text-warm-mid text-xs uppercase tracking-wider">Full name</Label>
                <Input id="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="mt-1.5 bg-white" />
              </div>
              <div>
                <Label htmlFor="email" className="text-warm-mid text-xs uppercase tracking-wider">Email</Label>
                <Input id="email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="mt-1.5 bg-white" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-warm-mid text-xs uppercase tracking-wider">Phone (with country code)</Label>
                <Input id="phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="mt-1.5 bg-white" />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <p className="text-sm text-ink-soft">Choose your course</p>
              <div className="grid gap-2">
                {COURSES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => setData({ ...data, course: c.slug })}
                    className={`text-left p-4 rounded-md border-2 transition-all ${
                      data.course === c.slug
                        ? "border-terra bg-terra/5"
                        : "border-sand-deep bg-white hover:border-terra/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-serif text-lg text-warm-dark">{c.duration} YTT</p>
                        <p className="text-xs text-ink-muted mt-0.5">{c.style} · {c.days}</p>
                      </div>
                      <p className="text-terra-deep font-semibold">${c.priceFrom}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <Label htmlFor="date" className="text-warm-mid text-xs uppercase tracking-wider">Preferred start date</Label>
                <Input id="date" type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="mt-1.5 bg-white" />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div>
                <Label htmlFor="msg" className="text-warm-mid text-xs uppercase tracking-wider">A little about you</Label>
                <Textarea id="msg" rows={4} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} className="mt-1.5 bg-white" placeholder="Yoga experience, intentions, dietary needs…" />
              </div>
              <div className="bg-sand rounded-md p-4 text-sm space-y-2">
                <div className="flex items-center gap-2 text-warm-dark"><Check className="w-4 h-4 text-sage" /> No payment yet — you'll receive a custom enrolment link.</div>
                <div className="flex items-center gap-2 text-warm-dark"><Check className="w-4 h-4 text-sage" /> Personal reply within 24 hours.</div>
                <div className="flex items-center gap-2 text-warm-dark"><Check className="w-4 h-4 text-sage" /> Free cancellation up to 30 days before start.</div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="ghost" onClick={back}>Back</Button>
          ) : <span />}
          {step < 3 ? (
            <Button onClick={next} className="bg-terra hover:bg-terra-deep text-cream">Continue</Button>
          ) : (
            <Button onClick={submit} className="bg-terra hover:bg-terra-deep text-cream">Submit application</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
