# portfolio-2026

Personal page for [Lionel Arce](https://github.com/lzvxck), software & research engineer in Buenos Aires. One quiet page with work, papers, and lab notes.

## Stack

- **Next.js 16** (App Router, static page)
- **Tailwind CSS v4** + **shadcn/ui** tokens, with a warm paper palette
- **Framer Motion**, for soft entrance and scroll reveals that respect `prefers-reduced-motion`
- **next/font**, for Newsreader and DM Sans
- **bun**, as package manager and script runner

## Local development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Everything on the page lives in `lib/site.ts`. Add a project or a paper by adding an entry there. The hero photo is `public/images/yellow-field.jpg`.

`content/` keeps the long-form Markdown notes from the previous version of the site. The page does not read them.

## Deployment

Deploy to Vercel. No environment variables are needed.
