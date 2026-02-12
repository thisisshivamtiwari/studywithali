# Study with Ali

Website for **Elite Stars Academy** – tuition and courses (11+, Primary, GCSE, A-Level, Adult learning) with admission and contact flows.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** – dev server and build
- **React Router 7** – client-side routing
- **Tailwind CSS 4** – styling
- **react-icons** – icons

## Quick start

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

## Project structure

```
src/
├── App.tsx              # Router, layout (Header + main + Footer)
├── main.tsx
├── index.css            # Tailwind, global styles, animations
├── assets/              # Images (e.g. logo)
├── components/          # Shared UI
│   ├── Header.tsx       # Nav, dropdowns, social links
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── AboutUs.tsx
│   ├── FeaturedCourses.tsx
│   ├── OurCourses.tsx
│   ├── TikTokVideos.tsx
│   └── Newsletter.tsx
├── pages/               # Route-level pages
│   ├── Home.tsx
│   ├── ElevenPlusPreparation.tsx
│   ├── PrimaryLearning.tsx
│   ├── ALevel.tsx
│   ├── GCSE.tsx
│   ├── AdultCourses.tsx
│   ├── AdmissionForm.tsx   # Multi-step wizard
│   └── ContactUs.tsx       # Contact form + map
├── hooks/
│   └── useScrollAnimation.ts
└── utils/
    └── tiktokApi.ts
```

## Routes

| Path        | Page              |
|------------|-------------------|
| `/`        | Home              |
| `/11plus`  | 11+ Preparation   |
| `/primary` | Primary Learning  |
| `/alevel`  | A Level           |
| `/gcse`    | GCSE              |
| `/adults`  | Adult Courses     |
| `/admission` | Admission Form (wizard) |
| `/contact` | Contact Us (form + map) |

## Features

- **Course pages** – Hero, content sections, pricing/CTAs, “Book Now” → admission form
- **Admission form** – 6-step wizard (Personal → Address → Urgent contact → Education → Tuition → Agreement) with validation and progress stepper
- **Contact** – Address & email, message form, embedded map (same column as “Reach us”)
- **Design** – Indigo/purple/pink gradient hero, `card-material` sections with gradient accent, scroll animations, responsive layout

## Build output

Production build goes to `dist/`. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## License

Private project.
