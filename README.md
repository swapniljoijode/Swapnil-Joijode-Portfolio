# Swapnil Joijode — Portfolio

Personal portfolio for **Swapnil Sanjay Joijode**, Data Engineer.
Single-page site built with **Vite + React + TypeScript + Tailwind CSS**.

**Repository:** https://github.com/swapniljoijode/portfolio-website

## Run locally

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ (includes npm).

```bash
git clone https://github.com/swapniljoijode/portfolio-website.git
cd portfolio-website

npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # type-check with tsc
```

## Project structure

```
index.html            # entry; title, meta, favicon
public/               # static assets served at site root
  favicon.svg
  Swapnil-Joijode-Resume.docx
src/
  main.tsx            # React entry
  App.tsx             # tab state + layout
  index.css           # Tailwind theme + animations
  data.ts             # SINGLE SOURCE OF TRUTH for all content
  types.ts            # shared TypeScript types
  components/
    Header.tsx  Footer.tsx
    HomeView.tsx  PipelineFlow.tsx   # hero + animated data-flow visual
    ExperienceView.tsx               # work history + skills
    ProjectsView.tsx                 # project case studies
    ContactView.tsx                  # contact form (Web3Forms)
    ResumeModal.tsx                  # résumé overlay
    Icon.tsx                         # icon-name → lucide icon
```

**To update content,** edit `src/data.ts` — everything (home, experience, projects, résumé) reads from it.

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com) (free).
Set your access key in `src/components/ContactView.tsx` (`WEB3FORMS_ACCESS_KEY`).
Until a key is set, the form falls back to opening the visitor's email client.

## Deploy (free)

Hosted on **Vercel**, deployed from
[`swapniljoijode/portfolio-website`](https://github.com/swapniljoijode/portfolio-website):

1. Push changes to the `main` branch on GitHub.
2. On [vercel.com](https://vercel.com), **Add New → Project → Import** `portfolio-website`.
3. Vercel auto-detects Vite (build `npm run build`, output `dist`). Click **Deploy**.

Every push to `main` redeploys automatically.
