"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/shared/Reveal';
import { VideoPlayer } from '@/components/shared/VideoPlayer';
import { IMG } from '@/data/site';
import { CheckCircle, MapPin, Flower2, Home, Utensils, Users, Sunrise } from 'lucide-react';

const facilities = [
  {
    icon: MapPin,
    title: 'Professional Studio',
    desc: 'State-of-the-art yoga studios with premium equipment and serene ambiance.',
    color: 'bg-orange-50 text-[#F04E23]'
  },
  {
    icon: Flower2,
    title: 'Sacred Gardens',
    desc: 'Peaceful gardens for meditation, pranayama, and spiritual connection with nature.',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: Home,
    title: 'Comfortable Lodging',
    desc: 'Cozy, clean rooms with all amenities to support your focused practice.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Utensils,
    title: 'Organic Meals',
    desc: 'Plant-based, nutritious meals prepared fresh daily from local ingredients.',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: Users,
    title: 'Welcoming Community',
    desc: 'Connect with yoga practitioners from around the world in a supportive environment.',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    icon: Sunrise,
    title: 'Spiritual Location',
    desc: 'Located in Ubud - Bali\'s spiritual heart, surrounded by rice paddies and temples.',
    color: 'bg-rose-50 text-rose-600'
  },
];

export const VideoShowcase = () => {
  const videoWatched = () => {
    console.log('User watched campus tour video');
  };

  return (
    <section id="campus-video" className="relative py-20 md:py-32 bg-[#FAFAFA] overflow-hidden border-b border-gray-100">
      {/* Premium Minimal Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-orange-100/40 to-transparent rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="mb-12 md:mb-20 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 justify-center">
              <div className="w-2 h-2 rounded-full bg-[#F04E23]"></div>
              <p className="font-bold text-[11px] uppercase tracking-[0.25em] text-[#F04E23]">Campus & Community</p>
              <div className="w-2 h-2 rounded-full bg-[#F04E23]"></div>
            </div>
            <h2 className="font-serif font-bold text-gray-900 leading-[1.1] text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Experience the Sanctuary
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Walk through our world-class yoga sanctuary in Ubud. See the meditation halls, 
              yoga studios, and cozy accommodations where transformation happens.
            </p>
          </div>
        </Reveal>

        {/* Main Video Player */}
        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20 md:mb-32 rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5 bg-white"
          >
            <VideoPlayer
              youtubeId="TNzFh1N3GI0"
              poster={IMG.heroCeremony}
              title="Bali YTTC Campus Tour - Yoga & Wellness in Ubud"
              autoPlay={false}
              muted={true}
              onPlay={videoWatched}
            />
          </motion.div>
        </Reveal>

        {/* Premium Bento Grid for Facilities */}
        <div className="mb-24">
          <Reveal>
            <div className="text-center mb-12">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">World-Class Facilities</h3>
              <p className="mt-3 text-gray-600">Everything you need for a distraction-free practice</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="group flex flex-col h-full p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                  >
                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#F04E23] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us - Premium List */}
        <Reveal delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-10 md:p-16 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl relative overflow-hidden"
          >
            {/* Decorative background shape */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-60" />
            
            <div className="relative z-10 text-center mb-12">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
                Why Students Choose Bali YTTC
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 lg:gap-y-8">
              {[
                'Internationally certified Yoga Alliance RYS 200 & 300 programs',
                'Expert instructors with 15+ years combined teaching experience',
                'All-inclusive pricing: accommodation, meals, materials, ceremonies',
                '5000+ students successfully transformed since 2018',
                'Lifetime access to alumni community and online resources',
                '100% money-back satisfaction guarantee',
              ].map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-6 h-6 text-[#F04E23]" strokeWidth={2.5} />
                  </div>
                  <p className="text-gray-800 font-semibold leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default VideoShowcase;
