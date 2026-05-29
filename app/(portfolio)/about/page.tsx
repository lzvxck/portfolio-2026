import { getProfile, getEducation, getCertifications } from "@/lib/content";

export default function AboutPage() {
  const profile = getProfile();
  const education = getEducation();
  const certifications = getCertifications();

  return (
    <div className="flex flex-col gap-12">
      {/* Bio */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {profile.title} · {profile.location}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
          {profile.body}
        </p>
        <div className="flex flex-col gap-1 font-mono text-xs text-muted-foreground">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-foreground transition-colors duration-150"
          >
            {profile.email}
          </a>
          <a
            href={`https://${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-150"
          >
            {profile.github}
          </a>
          <a
            href={`https://${profile.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-150"
          >
            {profile.linkedin}
          </a>
        </div>
      </div>

      {/* Education */}
      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.institution} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <span className="text-sm font-medium">{edu.degree}</span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                {edu.start} – {edu.end}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {edu.institution} · {edu.location}
            </p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-4">
        <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
          Certifications
        </h2>
        <div className="flex flex-col divide-y divide-border">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-baseline justify-between gap-4 py-3 flex-wrap"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm">{cert.name}</span>
                <span className="text-xs text-muted-foreground">
                  {cert.issuer}
                </span>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                {cert.issued}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
