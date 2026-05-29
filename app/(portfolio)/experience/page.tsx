import { getExperiences } from "@/lib/content";

export default function ExperiencePage() {
  const experiences = getExperiences();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Experience</h1>
        <p className="text-sm text-muted-foreground">
          Professional background and roles.
        </p>
      </div>

      <ol className="relative flex flex-col gap-10 border-l border-border pl-8">
        {experiences.map((exp) => (
          <li key={exp.slug} className="relative">
            {/* Timeline dot */}
            <span className="absolute -left-[2.15rem] top-1.5 size-2 rounded-full bg-border ring-4 ring-background" />

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h2 className="text-base font-medium leading-snug">
                    {exp.title}
                  </h2>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                    {exp.startLabel} – {exp.endLabel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exp.company} · {exp.location}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                {exp.body}
              </p>

              {exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
