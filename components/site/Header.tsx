"use client";

import { motion } from "framer-motion";
import { nav, profile } from "@/lib/site";

export function Header() {
  return (
    <motion.header
      className="top shell"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <a className="home label" href="#">
        {profile.first} {profile.last}
      </a>
      <nav className="label" aria-label="Primary">
        {nav.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
