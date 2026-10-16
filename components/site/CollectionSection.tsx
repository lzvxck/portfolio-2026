"use client";

import { motion, type Variants } from "framer-motion";
import type { Collection, Entry } from "@/lib/site";

const list: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0 },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: 0.6 } },
};

function Summary({ entry }: { entry: Entry }) {
  if (!entry.highlight) return <p>{entry.summary}</p>;
  const [before, after] = entry.summary.split(entry.highlight);
  return (
    <p>
      {before}
      <strong>{entry.highlight}</strong>
      {after}
    </p>
  );
}

function Row({ entry }: { entry: Entry }) {
  const content = (
    <>
      <h3>
        {entry.title}
        {entry.href && (
          <>
            {"\u00a0"}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </>
        )}
      </h3>
      <span className="label">{entry.year}</span>
      <Summary entry={entry} />
    </>
  );

  if (entry.href) {
    return (
      <motion.a className="row" href={entry.href} variants={item}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.div className="row" variants={item}>
      {content}
    </motion.div>
  );
}

export function CollectionSection({ collection }: { collection: Collection }) {
  return (
    <motion.section
      id={collection.id}
      aria-labelledby={`${collection.id}-title`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
      variants={list}
    >
      <div className="head">
        <motion.h2 id={`${collection.id}-title`} variants={item}>
          {collection.title}
        </motion.h2>
        <motion.span className="rule" variants={rule} />
      </div>
      {collection.entries.map((entry) => (
        <Row key={entry.title} entry={entry} />
      ))}
    </motion.section>
  );
}
