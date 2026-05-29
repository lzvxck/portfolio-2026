import { getSkillGroups } from "@/lib/content";

export default function SkillsPage() {
  const groups = getSkillGroups();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Skills</h1>
        <p className="text-sm text-muted-foreground">
          Technical areas and tools.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.slug} className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              {group.category}
            </h2>
            <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
              {group.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
