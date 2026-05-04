import { FAQS } from "@/data/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => (
  <section className="py-28 md:py-36 bg-cream">
    <div className="container-edit grid lg:grid-cols-12 gap-14">
      <div className="lg:col-span-5">
        <SectionHeading
          eyebrow="Common questions"
          title={<>Everything you need <em className="text-terra">to know</em></>}
          sub="Still have questions? Reach out on WhatsApp — our team usually replies within an hour."
        />
      </div>
      <div className="lg:col-span-7">
        <Reveal>
          <Accordion type="single" collapsible className="border-t border-warm-dark/10">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-b border-warm-dark/10">
                <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-warm-dark hover:text-terra py-6 hover:no-underline">
                  <span className="flex gap-4 items-start">
                    <span className="text-terra font-mono text-sm pt-1.5">0{i + 1}</span>
                    <span>{f.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-ink-soft leading-relaxed text-base pl-10 pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </div>
  </section>
);
