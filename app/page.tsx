import { CollectionSection } from "@/components/site/CollectionSection";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Reveal } from "@/components/site/Reveal";
import { labNotes, papers, profile, work } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <main className="body shell">
        <div className="lists">
          <CollectionSection collection={work} />
          <CollectionSection collection={papers} />
        </div>
      </main>

      <Reveal className="notes shell">
        <a href={labNotes}>
          <span className="label">Lab notes</span>
          <span className="big">
            Read the notes from the lab{"\u00a0"}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </span>
        </a>
      </Reveal>

      <footer className="end shell label">
        <span>
          {profile.first} {profile.last} · {profile.place}
        </span>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </footer>
    </>
  );
}
