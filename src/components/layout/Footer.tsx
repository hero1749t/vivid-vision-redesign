import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube, MessageCircle, ArrowUpRight, Heart } from "lucide-react";
import { BalieytcLogo } from "@/components/shared/BalieytcLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { IMG, SITE as STATIC_SITE } from "@/data/site";
import { motion } from "framer-motion";
import { client } from "@/lib/sanity";

const footerLinks = [
  {
    title: "Programs",
    links: [
      { label: "100-Hour YTT", to: "/courses/100hr" },
      { label: "200-Hour YTT", to: "/courses/200hr" },
      { label: "300-Hour YTT", to: "/courses/300hr" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  {
    title: "School",
    links: [
      { label: "About", to: "/about" },
      { label: "Teachers", to: "/instructors" },
      { label: "Testimonials", to: "/#testimonials" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [site, setSite] = useState(STATIC_SITE);
  const [socials, setSocials] = useState({
    instagram: "https://www.instagram.com/baliyttc/",
    facebook: "https://www.facebook.com/baliyttc",
    youtube: "https://www.youtube.com/@baliyttc"
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await client.fetch(`*[_type == "settings"][0]`);
        if (settingsData) {
          if (settingsData.contactInfo) {
            setSite({
              ...STATIC_SITE,
              name: settingsData.siteName || STATIC_SITE.name,
              email: settingsData.contactInfo.email || STATIC_SITE.email,
              phone: settingsData.contactInfo.phone || STATIC_SITE.phone,
              whatsapp: settingsData.contactInfo.whatsapp || STATIC_SITE.whatsapp,
              location: settingsData.contactInfo.location || STATIC_SITE.location,
            });
          }
          if (settingsData.socialLinks) {
            setSocials({
              instagram: settingsData.socialLinks.instagram || socials.instagram,
              facebook: settingsData.socialLinks.facebook || socials.facebook,
              youtube: settingsData.socialLinks.youtube || socials.youtube,
            });
          }
        }
      } catch (err) {
        console.error("Footer settings fetch error:", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-warm-dark pt-20 pb-8 text-cream/80">
      <div className="container-wide">
        {/* Top Grid */}
        <div className="grid gap-12 lg:grid-cols-12 pb-14 border-b border-cream/10">
          {/* Brand col */}
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-center gap-3">
              <BalieytcLogo className="h-12 w-12" showText={false} />
              <div>
                <p className="font-serif text-xl font-bold text-cream">{site.name}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-cream/45">Yoga Teacher Training · Ubud, Bali</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-cream/55">
              Yoga Alliance certified teacher training in Ubud, Bali. Authentic Hatha, Ashtanga and
              Vinyasa programs since {site.established}.
            </p>

            {/* Trust logos */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <img 
                src={IMG.yogaAlliance} 
                alt="Yoga Alliance RYS" 
                className="h-10 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" 
              />
              <div className="bg-white rounded-full p-1 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                <img 
                  src={IMG.rys200} 
                  alt="RYS 200" 
                  className="h-9 w-9 object-contain" 
                />
              </div>
              <img 
                src={IMG.trustpilot} 
                alt="Trustpilot" 
                className="h-8 object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>

            {/* Social icons */}
            <div className="mt-8 flex gap-3">
              {[
                { href: socials.instagram, icon: Instagram, label: "Instagram", bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500" },
                { href: socials.facebook, icon: Facebook, label: "Facebook", bg: "bg-[#1877F2]" },
                { href: socials.youtube, icon: Youtube, label: "YouTube", bg: "bg-[#FF0000]" },
                { href: `https://wa.me/${site.whatsapp}`, icon: MessageCircle, label: "WhatsApp", bg: "bg-[#25D366]" },
              ].map(({ href, icon: Icon, label, bg }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -4 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 shadow-lg ${bg} hover:shadow-xl`}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links cols */}
          {footerLinks.map(col => (
            <div key={col.title} className="lg:col-span-2">
              <p className="mb-5 font-serif text-lg font-semibold text-cream">{col.title}</p>
              <ul className="space-y-3 text-sm">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-cream/55 transition-colors duration-200 hover:text-amber-300 hover:pl-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter col */}
          <div className="lg:col-span-4">
            <p className="mb-4 font-serif text-lg font-semibold text-cream">Stay connected</p>
            <p className="mb-5 text-sm text-cream/55 leading-6">
              Get course dates, yoga articles and Bali inspiration in your inbox. No spam, ever.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                toast({ title: "Subscribed!", description: "Thanks for joining the Bali YTTC community." });
                setEmail("");
              }}
              className="flex gap-2"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your@email.com"
                className="border-cream/20 bg-cream/10 text-cream placeholder:text-cream/35 focus:border-amber-400"
              />
              <Button type="submit" className="bg-[#F04E23] hover:bg-[#D03D12] text-white font-semibold">
                Join
              </Button>
            </form>

            {/* Contact info */}
            <div className="mt-7 space-y-3 text-sm">
              <a href={`https://maps.app.goo.gl/baliyttc`} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-cream/55 hover:text-cream transition-colors">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{site.location}</span>
              </a>
              <a href={`tel:${site.phone}`}
                className="flex items-center gap-2.5 text-cream/55 hover:text-cream transition-colors">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-cream/55 hover:text-cream transition-colors">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                {site.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} {site.longName || site.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-amber-500 text-amber-500 mx-0.5" /> in Bali
          </p>
          <div className="flex gap-5">
            <a href="https://baliyttc.com/terms-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Terms & Policy</a>
            <a href="https://baliyttc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              Main Site <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
