import { getProjects } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="text-sm text-muted-foreground">
          Selected open-source and personal projects.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex flex-col gap-3 rounded-xl border border-border p-5"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-medium">{project.name}</h2>
                  {project.status === "production" && (
                    <span className="rounded-full border border-border px-2 py-px font-mono text-[10px] text-muted-foreground">
                      production
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>

              {project.github && (
                <a
                  href={`https://${project.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  {project.github}
                </a>
              )}
            </div>

            <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
              {project.body.split("\n\n")[0]}
            </p>

            {project.tech.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
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
        ))}
      </div>
    </div>
  );
}
