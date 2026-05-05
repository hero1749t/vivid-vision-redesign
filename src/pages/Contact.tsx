import { useEffect, useState } from "react";
import { SITE as STATIC_SITE } from "@/data/site";
import { LocationMap } from "@/components/home/LocationMap";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Phone, Mail } from "lucide-react";
import { client } from "@/lib/sanity";

const Contact = () => {
  const [data, setData] = useState({ name: "", email: "", course: "", message: "" });
  const [site, setSite] = useState(STATIC_SITE);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await client.fetch(`*[_type == "settings"][0]`);
        if (settingsData?.contactInfo) {
          setSite({
            ...STATIC_SITE,
            email: settingsData.contactInfo.email || STATIC_SITE.email,
            phone: settingsData.contactInfo.phone || STATIC_SITE.phone,
          });
        }
      } catch (err) {
        console.error("Settings fetch error:", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <>
      <section className="pt-40 pb-16 bg-cream">
        <div className="container-edit">
          <SectionHeading
            eyebrow="Get in touch"
            title={<>We'd love to <em className="text-terra">hear from you</em></>}
            sub="Send a message to our admissions team. We usually reply within an hour."
          />
        </div>
      </section>

      <section className="pb-24 bg-cream">
        <div className="container-edit grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast({ title: "Message sent", description: "Demo: we'll be in touch soon." });
                setData({ name: "", email: "", course: "", message: "" });
              }}
              className="bg-sand p-8 md:p-10 rounded-lg space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label className="text-warm-mid text-xs uppercase tracking-wider">Name</Label>
                  <Input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="mt-1.5 bg-cream" />
                </div>
                <div>
                  <Label className="text-warm-mid text-xs uppercase tracking-wider">Email</Label>
                  <Input required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="mt-1.5 bg-cream" />
                </div>
              </div>
              <div>
                <Label className="text-warm-mid text-xs uppercase tracking-wider">Interested course</Label>
                <Input value={data.course} onChange={(e) => setData({ ...data, course: e.target.value })} placeholder="e.g. 200-Hour YTT, March 2026" className="mt-1.5 bg-cream" />
              </div>
              <div>
                <Label className="text-warm-mid text-xs uppercase tracking-wider">Your message</Label>
                <Textarea required rows={6} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} className="mt-1.5 bg-cream" />
              </div>
              <Button type="submit" size="lg" className="bg-terra hover:bg-terra-deep text-cream h-12 w-full sm:w-auto px-8">Send message</Button>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 space-y-4">
            <div className="bg-cream border border-warm-dark/10 rounded-lg p-7">
              <Phone className="w-7 h-7 text-terra mb-3" />
              <p className="font-serif text-xl text-warm-dark">{site.phone}</p>
              <p className="text-ink-soft text-sm mt-1">Mon-Sat / 9am-7pm WITA</p>
            </div>
            <div className="bg-cream border border-warm-dark/10 rounded-lg p-7">
              <Mail className="w-7 h-7 text-terra mb-3" />
              <p className="font-serif text-xl text-warm-dark">{site.email}</p>
              <p className="text-ink-soft text-sm mt-1">For applications, partnerships and press.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <LocationMap />
    </>
  );
};

export default Contact;

