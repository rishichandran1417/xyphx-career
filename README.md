# xyphx careers page (React)

Converted from the original single-file HTML mockup into a proper component-based
Vite + React project. Job listings are no longer hardcoded — they're fetched at
runtime from `public/jobs.json`.

## Structure

```
xyphx-careers/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── jobs.json          ← the "database" of open roles, fetched via fetch('/jobs.json')
└── src/
    ├── main.jsx            ← React entry point
    ├── App.jsx             ← fetches jobs.json, composes all sections
    ├── styles/
    │   └── App.css         ← all page styling (design tokens, layout, animations)
    └── components/
        ├── Navbar.jsx      ← sticky nav + hover-scramble wordmark
        ├── Hero.jsx        ← headline, decode/scramble role-title cycler, ambient token field (canvas)
        ├── Mission.jsx     ← $ train / $ ship / $ align pillars
        ├── Teams.jsx       ← team cards with live open-role counts (derived from jobs)
        ├── Roles.jsx       ← filterable role board (team + location filters, loading/empty states)
        ├── Benefits.jsx    ← benefits grid
        └── Footer.jsx      ← catch-all CTA + footer
```

## Why `public/jobs.json` instead of importing it

Putting the data in `public/` and fetching it with `fetch('/jobs.json')` (done in
`App.jsx`) means it behaves like a real API response — loading and error states are
handled for real, and you can swap the fetch call for an actual backend endpoint
later without touching any component.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build in `dist/`.

## Editing the roles

Add, remove, or edit postings by editing `public/jobs.json` — no component code needs
to change. Each entry:

```json
{ "id": "unique-id", "title": "Role Title", "team": "Research", "loc": "Remote (US)", "type": "Full-time", "comp": "$180K–$250K + equity" }
```

`team` must match one of the team `id`s defined in `src/components/Teams.jsx`
(Research, Applied AI, Infrastructure, Product, Go-to-Market, People & Ops) so it
shows up correctly in the team counts and the role filter chips.
