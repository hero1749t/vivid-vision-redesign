import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { DailyLife } from "@/components/home/DailyLife";
import { Pillars } from "@/components/home/Pillars";
import { Teachers } from "@/components/home/Teachers";
import { Experiences } from "@/components/home/Experiences";
import { Testimonials } from "@/components/home/Testimonials";
import { Schedule } from "@/components/home/Schedule";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { FAQ } from "@/components/home/FAQ";
import { LocationMap } from "@/components/home/LocationMap";
import { FinalCTA } from "@/components/home/FinalCTA";

const Index = () => (
  <>
    <Hero />
    <TrustStrip />
    <Manifesto />
    <FeaturedCourses />
    <DailyLife />
    <Pillars />
    <Teachers />
    <Experiences />
    <Testimonials />
    <Schedule />
    <GalleryTeaser />
    <FAQ />
    <LocationMap />
    <FinalCTA />
  </>
);

export default Index;
