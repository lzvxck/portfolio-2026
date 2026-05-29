import Link from "next/link";
import NavLinks from "@/components/portfolio/NavLinks";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="shrink-0 flex items-center justify-between px-6 h-14 border-b border-border">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight hover:text-muted-foreground transition-colors duration-150"
        >
          Lionel Arce
        </Link>
        <NavLinks />
      </header>
      <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-16">
        {children}
      </main>
    </div>
  );
}
