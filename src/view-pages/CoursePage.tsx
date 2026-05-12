import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Check, X, CalendarDays, Clock, MapPin, Users, Loader2 } from "lucide-react";

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

interface Course {
  id: string;
  slug: string;
  name: string;
  duration: string;
  summary: string;
  description: string;
  priceFrom: number;
  priceFull?: number;
  image: string;
  modules: { title: string; description: string; hours: number }[];
  batches?: { id: string; name: string; startDate: string; priceRegular: number; enrolled: number; capacity: number }[];
}

const CoursePage = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/courses?slug=${slug}`);
      const data = await res.json();
      if (data.courses && data.courses.length > 0) {
        setCourse(data.courses[0]);
      } else {
        router.push("/courses");
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
      router.push("/courses");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-terra" />
      </div>
    );
  }

  if (!course) {
    return null;
  }

  const availableBatches = course.batches?.filter(b => b.enrolled < b.capacity) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-warm-dark">
        <div className="absolute inset-0">
          <img src={course.image} alt={course.name} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-dark/90 to-warm-dark/60" />
        </div>
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <Badge className="bg-white/20 text-white mb-4">{course.duration}</Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {course.name}
            </h1>
            <p className="text-xl text-white/80 mb-8">{course.summary}</p>
            <div className="flex flex-wrap gap-4">
              <ApplyModal
                trigger={<Button size="lg" className="bg-terra hover:bg-terra-deep text-white">{course.priceFrom < 1500 ? "Apply from $" + course.priceFrom : "Apply Now"}</Button>}
                defaultCourse={course.slug}
              />
              <Link href="#batches">
                <Button size="lg" variant="secondary" className="bg-white text-warm-dark hover:bg-white/90">
                  View Dates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-cream">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Reveal>
                <SectionHeading eyebrow="About This Course" title={<>What You&apos;ll <em className="text-terra">Learn</em></>} />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="prose prose-lg max-w-none text-warm-mid">
                  <p className="text-lg leading-relaxed">{course.description}</p>
                </div>
              </Reveal>

              {/* Curriculum */}
              {course.modules && course.modules.length > 0 && (
                <Reveal delay={0.2}>
                  <div className="mt-12">
                    <h2 className="font-serif text-2xl font-bold text-warm-dark mb-6">Curriculum</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {course.modules.map((module, i) => (
                        <AccordionItem key={i} value={`module-${i}`} className="bg-white rounded-lg px-6 border border-warm-light/20">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="text-left">
                              <span className="text-xs text-terra font-medium">{module.hours} hours</span>
                              <p className="font-serif text-lg font-bold text-warm-dark">{module.title}</p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-warm-mid pb-4">{module.description}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Reveal>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-light/20 sticky top-24">
                  <h3 className="font-serif text-xl font-bold text-warm-dark mb-4">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {includedList.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-warm-mid text-sm">{item}</span>
                      </li>
                    ))}
                    {notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <span className="text-gray-400 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-16 bg-warm-light/30">
        <div className="container-wide">
          <Reveal>
            <SectionHeading eyebrow="Accommodation" title={<>Stay in <em className="text-terra">Paradise</em></>} />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {accommodationTiers.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`bg-white rounded-xl p-6 ${tier.featured ? "ring-2 ring-terra" : ""}`}>
                  {tier.featured && <Badge className="bg-terra text-white mb-3">Most Popular</Badge>}
                  <h3 className="font-serif text-xl font-bold text-warm-dark">{tier.name}</h3>
                  <p className="text-2xl font-bold text-terra my-2">{tier.price}</p>
                  <p className="text-warm-mid text-sm">{tier.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Batches */}
      {availableBatches.length > 0 && (
        <section id="batches" className="py-16 bg-cream">
          <div className="container-wide">
            <Reveal>
              <SectionHeading eyebrow="Upcoming Dates" title={<>Start Your <em className="text-terra">Journey</em></>} />
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {availableBatches.map((batch, i) => (
                <Reveal key={batch.id} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-light/20">
                    <div className="flex items-center gap-2 text-sm text-warm-mid mb-4">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(batch.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </div>
                    <p className="font-serif text-xl font-bold text-warm-dark mb-2">{batch.name}</p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-warm-mid">{batch.enrolled}/{batch.capacity} enrolled</span>
                      <span className="font-bold text-terra">${batch.priceRegular}</span>
                    </div>
                    <ApplyModal
                      trigger={<Button className="w-full bg-terra hover:bg-terra-deep text-white">Apply for This Batch</Button>}
                      defaultCourse={course.slug}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-terra to-terra-deep text-white">
        <div className="container-wide text-center">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Life?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have completed their yoga teacher training in Bali.
            </p>
            <ApplyModal
              trigger={<Button size="lg" className="bg-white text-terra hover:bg-white/90">Apply Now</Button>}
              defaultCourse={course.slug}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default CoursePage;
