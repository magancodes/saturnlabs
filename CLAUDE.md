# Claude Code: Saturn Labs Website

## Build & Development
- **Dev Server**: `npm run dev` (Next.js 16.2.4)
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Tech Stack
- **Framework**: Next.js App Router (16.2.4)
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **3D**: Spline (@splinetool/react-spline)
- **Icons**: Lucide React (use inline SVG for build compatibility if needed)
- **Fonts**: 
  - Sans: Gilroy (`font-gilroy`)
  - Serif: Rhymes (`font-rhymes`, `font-serif`)

## Project Structure & Conventions
- **Component Path**: `components/ui/` for reusable components.
- **Pages**: `app/` directory (Next.js App Router).
- **Brutalist Aesthetic**: Sharp edges, monospace accents, high contrast, heavy use of black `#050505`.
- **Encryption Animation**: Use `EncryptedText` for major headings.

## Critical Instructions (from AGENTS.md)
This version of Next.js has breaking changes and specific conventions. Always reference documentation in `node_modules/next/dist/docs/` when in doubt.
