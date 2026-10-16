"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { profile } from "@/lib/site";
import field from "@/public/images/yellow-field.jpg";

const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

export function Hero() {
  return (
    <div className="hero shell">
      <motion.div
        className="hero-media"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.8 } }}
      >
        <Image
          src={field}
          alt=""
          fill
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 820px) calc(100vw - 32px), min(100vw - 48px, 1240px)"
        />
      </motion.div>
      <div className="hero-wash" />
      <motion.section className="intro" aria-labelledby="page-title" initial="hidden" animate="shown">
        <div>
          <h1 className="name" id="page-title">
            <motion.span variants={rise} custom={0.05}>
              {profile.first}
            </motion.span>
            <motion.span className="last" variants={rise} custom={0.12}>
              {profile.last}
            </motion.span>
          </h1>
          <motion.p className="subtitle" variants={rise} custom={0.2}>
            {profile.subtitle}
          </motion.p>
        </div>
        <motion.div className="identity label" variants={rise} custom={0.28}>
          <span>{profile.title}</span>
          <span>{profile.place}</span>
        </motion.div>
      </motion.section>
    </div>
  );
}
