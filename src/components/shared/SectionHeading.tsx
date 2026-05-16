"use client";
import { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export const SectionHeading = ({ eyebrow, title, sub, align = "left", light, className = "" }: Props) => (
  <div
    className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
  >
    {eyebrow && (
      <Reveal>
        <p className={`eyebrow mb-5 ${light ? "text-sage-light" : "text-sage"}`}>
          {eyebrow}
        </p>
      </Reveal>
    )}
    <Reveal delay={0.05}>
      <h2 className={`heading-xl ${light ? "text-cream" : "text-charcoal"}`}>
        {title}
      </h2>
    </Reveal>
    {sub && (
      <Reveal delay={0.1}>
        <p className={`mt-5 text-base leading-relaxed ${light ? "text-cream/70" : "text-ink-soft"}`}>
          {sub}
        </p>
      </Reveal>
    )}
  </div>
);
