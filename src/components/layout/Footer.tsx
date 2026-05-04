import { Link } from "react-router-dom";
import { SITE, IMG } from "@/data/site";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-warm-dark text-cream/80 pt-20 pb-10">
      <div className="container-wide grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-terra grid place-items-center font-serif font-bold text-cream">B</div>
            <div>
              <p className="font-serif text-xl text-cream font-bold">Bali YTTC</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-cream/50">Ubud · Est 2018</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-cream/60 max-w-sm">
            A Yoga Alliance certified school in the heart of Ubud, dedicated to authentic, multi-style yoga teacher trainings since 2018.
          </p>
          <div className="flex gap-3 mt-6">
            <img src={IMG.yogaAlliance} alt="Yoga Alliance RYS" className="h-12 w-12 rounded-full bg-cream/10 p-1.5" />
            <img src={IMG.rys200} alt="RYS 200" className="h-12 w-12 rounded-full bg-cream/10 p-1.5" />
            <img src={IMG.trustpilot} alt="Trustpilot" className="h-12 bg-cream/10 px-2 rounded" />
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="font-serif text-cream text-lg mb-4">Courses</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/courses/100hr" className="hover:text-terra-light">100-Hour YTT</Link></li>
            <li><Link to="/courses/200hr" className="hover:text-terra-light">200-Hour YTT</Link></li>
            <li><Link to="/courses/300hr" className="hover:text-terra-light">300-Hour YTT</Link></li>
            <li><Link to="/gallery" className="hover:text-terra-light">Gallery</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className="font-serif text-cream text-lg mb-4">School</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-terra-light">About</Link></li>
            <li><Link to="/instructors" className="hover:text-terra-light">Teachers</Link></li>
            <li><Link to="/contact" className="hover:text-terra-light">Contact</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="font-serif text-cream text-lg mb-4">Stay in touch</p>
          <p className="text-sm text-cream/60 mb-4">Get retreat dates, articles and gentle yoga inspiration in your inbox. No spam, ever.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast({ title: "Subscribed ✦", description: "Demo: thanks for subscribing." });
              setEmail("");
            }}
            className="flex gap-2"
          >
            <Input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40"
            />
            <Button type="submit" className="bg-terra hover:bg-terra-deep text-cream">Subscribe</Button>
          </form>

          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-terra-light" /> {SITE.location}</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-terra-light" /> {SITE.phone}</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-terra-light" /> {SITE.email}</p>
          </div>
        </div>
      </div>

      <div className="container-wide mt-14 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50">
        <p>© {new Date().getFullYear()} {SITE.longName}. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-terra-light"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="hover:text-terra-light"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="hover:text-terra-light"><Youtube className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
};
