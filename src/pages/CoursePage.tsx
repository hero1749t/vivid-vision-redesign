import { useParams, Navigate, Link } from "react-router-dom";
import { COURSES, IMG, FAQS, DAILY_LIFE, PILLARS, TEACHERS } from "@/data/site";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, CalendarDays, Clock, MapPin, Users, ArrowUpRight, Star } from "lucide-react";

const includedList = [
  "Yoga Alliance certification on graduation",
  "Daily asana, pranayama & meditation",
  "Sattvic vegetarian meals (3x daily)",
  "Shared villa accommodation",
  "All workshops & ceremonies",
  "Excursions: temple, beach, sound healing",
  "Course manual & study materials",
  "Welcome & graduation ceremonies",
];
const notIncluded = [
  "Flights to/from Denpasar (DPS)",
  "Visa fees",
  "Personal travel insurance",
  "Private room upgrade (optional)",
];

const accommodationTiers = [
  { name: "Shared Villa", price: "Included", desc: "Shared twin room with private en-suite bathroom, AC, hot water, Wi-Fi.", featured: false },
  { name: "Private Villa", price: "+ $400", desc: "Private room with en-suite bathroom, AC, hot water, daily housekeeping, Wi-Fi.", featured: true },
  { name: "Luxury Villa", price: "+ $900", desc: "Private deluxe villa with garden view, premium amenities and bath tub.", featured: false },
];

const CoursePage = () => {
  const { slug } = useParams();
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return <Navigate to="/" replace />;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-warm-dark">
        <div className="absolute inset-0">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-warm-dark via-warm-dark/80 to-warm-dark/30" />

        <div className="relative container-edit grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <Link to="/" className="text-cream/60 hover:text-cream text-xs tracking-widest uppercase mb-6 inline-block">← Back to courses</Link>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="eyebrow text-gold-light mb-5">{course.duration} · {course.days} · Ubud, Bali</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif font-bold text-cream leading-[1.04]" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)" }}>
                {course.title.split("Yoga")[0]}<em className="text-terra-light">Yoga</em>{course.title.split("Yoga")[1]}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-cream/75 max-w-xl text-base md:text-lg leading-relaxed">{course.summary}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-6 text-cream/85 text-sm">
                <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-terra-light" /> Next: {course.next}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-terra-light" /> {course.days}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-terra-light" /> Ubud, Bali</span>
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-terra-light" /> Max 14 students</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="lg:col-span-4">
            <div className="bg-cream rounded-lg p-7 shadow-elev-lg">
              <p className="text-[10px] tracking-widest uppercase text-warm-light">Investment from</p>
              <p className="font-serif text-5xl text-terra-deep font-bold mt-1">${course.priceFrom}</p>
              <p className="text-xs text-ink-soft mt-1">All-inclusive · accommodation, meals, certification</p>
              <div className="mt-5 p-3 bg-terra/10 rounded-md">
                <p className="text-xs text-terra-deep font-semibold">{course.seats}</p>
                <p className="text-xs text-warm-mid mt-0.5">Next batch: {course.next}</p>
              </div>
              <div className="mt-5 space-y-2">
                <ApplyModal defaultCourse={course.slug} trigger={
                  <Button className="w-full bg-terra hover:bg-terra-deep text-cream h-12">Apply for this course</Button>
                } />
                <a href={`https://wa.me/6281999333327`} target="_blank" rel="noopener" className="block text-center w-full py-3 text-sm text-warm-dark border border-warm-dark/20 rounded-md hover:bg-sand transition-colors">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-edit grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What you'll learn"
              title={<>A complete <em className="text-terra">teacher's foundation</em></>}
              sub={`This ${course.duration} programme is designed to give you the tools, confidence and embodied wisdom to teach with authenticity.`}
            />
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {course.highlights.concat(["Teaching methodology", "Bandhas & mudras", "Yoga history", "Ethics of teaching"]).map((h, i) => (
              <Reveal key={h} delay={i * 0.04}>
                <div className="flex gap-3 items-start p-5 rounded-md bg-sand">
                  <Check className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <p className="text-warm-dark font-medium">{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Daily timeline */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container-edit">
          <SectionHeading
            eyebrow="Daily rhythm"
            title={<>A typical day in <em className="text-terra">Ubud</em></>}
          />
          <div className="mt-14 relative">
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-terra/30" />
            <div className="space-y-10">
              {DAILY_LIFE.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.05}>
                  <div className={`relative grid md:grid-cols-2 gap-6 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                    <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pl-12"}`} style={{ direction: "ltr" }}>
                      <p className="font-mono text-terra text-sm">{d.time}</p>
                      <h3 className="font-serif text-2xl md:text-3xl text-warm-dark mt-1">{d.title}</h3>
                      <p className="mt-3 text-ink-soft leading-relaxed">{d.desc}</p>
                    </div>
                    <div style={{ direction: "ltr" }} className="aspect-[16/10] rounded-md overflow-hidden">
                      <img src={d.img} alt={d.title} className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-terra ring-4 ring-sand" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum accordion */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-edit grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Curriculum"
              title={<>The full <em className="text-terra">syllabus</em></>}
              sub="Six pillars taught with depth, daily practice, and time to embody."
            />
          </div>
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="border-t border-warm-dark/10">
              {PILLARS.map((p, i) => (
                <AccordionItem key={p.title} value={`p${i}`} className="border-b border-warm-dark/10">
                  <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-warm-dark hover:text-terra py-5 hover:no-underline">
                    <span className="flex gap-4 items-center">
                      <span className="text-terra font-mono text-sm">0{i + 1}</span>
                      {p.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-ink-soft leading-relaxed pl-10 pb-5">{p.desc}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Accommodation tiers */}
      <section className="py-20 md:py-28 bg-sand">
        <div className="container-edit">
          <SectionHeading
            eyebrow="Stay & nourishment"
            title={<>Your home in <em className="text-terra">Ubud</em></>}
            sub="Choose the accommodation that fits your needs. All options include three sattvic meals daily, Wi-Fi, AC and hot water."
          />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {accommodationTiers.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.06}>
                <div className={`rounded-lg bg-cream p-7 border h-full ${a.featured ? "border-terra ring-1 ring-terra/30" : "border-warm-dark/10"}`}>
                  {a.featured && <p className="text-[10px] uppercase tracking-widest text-terra font-semibold mb-2">Most chosen</p>}
                  <h3 className="font-serif text-2xl text-warm-dark">{a.name}</h3>
                  <p className="mt-2 font-serif text-3xl text-terra-deep font-bold">{a.price}</p>
                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Included / Not included */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-edit grid md:grid-cols-2 gap-10">
          <Reveal>
            <div className="bg-sand rounded-lg p-8">
              <p className="eyebrow text-sage mb-4">What's included</p>
              <ul className="space-y-3">
                {includedList.map((it) => (
                  <li key={it} className="flex gap-3 text-warm-dark">
                    <Check className="w-5 h-5 text-sage mt-0.5 shrink-0" />{it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="bg-cream border border-warm-dark/10 rounded-lg p-8">
              <p className="eyebrow text-warm-light mb-4">Not included</p>
              <ul className="space-y-3">
                {notIncluded.map((it) => (
                  <li key={it} className="flex gap-3 text-warm-mid">
                    <X className="w-5 h-5 text-warm-light mt-0.5 shrink-0" />{it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Teachers for course */}
      <section className="py-20 md:py-28 bg-warm-dark text-cream">
        <div className="container-edit">
          <SectionHeading light eyebrow="Your teachers for this batch" title={<>Trained in <em className="text-terra-light">lineage</em></>} />
          <div className="mt-14 grid md:grid-cols-2 gap-10">
            {TEACHERS.map((t) => (
              <Reveal key={t.name}>
                <div className="flex gap-5 items-start">
                  <img src={t.img} alt={t.name} className="w-28 h-32 rounded-md object-cover" />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-terra-light">{t.role}</p>
                    <h3 className="font-serif text-2xl text-cream mt-1">{t.name}</h3>
                    <p className="text-cream/60 text-xs mt-1">{t.cred}</p>
                    <p className="mt-3 text-cream/75 text-sm leading-relaxed">{t.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-edit grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Course FAQs" title={<>Questions, <em className="text-terra">answered</em></>} />
          </div>
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="border-t border-warm-dark/10">
              {FAQS.slice(0, 5).map((f, i) => (
                <AccordionItem key={i} value={`f${i}`} className="border-b border-warm-dark/10">
                  <AccordionTrigger className="text-left font-serif text-lg text-warm-dark hover:text-terra py-5 hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-ink-soft leading-relaxed pb-5">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-sand text-center">
        <div className="container-edit">
          <Reveal>
            <h2 className="heading-display text-warm-dark">Ready to begin?</h2>
            <p className="mt-5 text-ink-soft max-w-lg mx-auto">No payment required to apply. We'll personally review and reply within 24 hours.</p>
            <div className="mt-8">
              <ApplyModal defaultCourse={course.slug} trigger={
                <Button size="lg" className="bg-terra hover:bg-terra-deep text-cream h-14 px-10">Apply for {course.duration} YTT</Button>
              } />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default CoursePage;
