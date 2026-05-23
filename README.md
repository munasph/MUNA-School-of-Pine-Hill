# MUNA School of Pine Hill — Website

Official Angular 17 website for **MUNA School of Pine Hill**, an Islamic
school located at 400 Erial Rd, Pine Hill, NJ 08021. The site combines
informational pages with a dynamic **Announcements & Events** portal that
the school administration can manage end-to-end.

> Domain contact: [admin@munasph.org](mailto:admin@munasph.org)

## Features

- **Announcements portal** — full CRUD (create / list / view / edit / delete)
  for school announcements and events. Each announcement has:
  `id`, `title`, `content`, `eventDate`, `isUrgent`.
- **Modern, branded UI** — Tailwind CSS with an Islamic-school-appropriate
  palette of emerald greens, clean whites, and gold accents.
- **Informational page scaffolding** — placeholder routes for `/about`,
  `/academics`, `/admissions`, and `/contact` that will be built out next.
- **Responsive shell** — accessible Navbar (with mobile drawer) and Footer
  on every page, including school address and contact email.

## Architecture

```
src/app/
├── app.component.{ts,html,css}      // Global shell: Navbar + Router + Footer
├── app-routing.module.ts            // Routes for announcements + info pages
├── app.module.ts                    // NgModule wiring
├── models/
│   └── announcement.model.ts        // { id, title, content, eventDate, isUrgent }
├── services/
│   └── announcement.service.ts      // CRUD against /api/announcements
└── components/
    ├── announcements-list/          // /announcements
    ├── announcement-details/        // /announcements/:id  (and inline view)
    ├── add-announcement/            // /add
    └── placeholder-page/            // /about, /academics, /admissions, /contact
```

The announcement service points to `http://localhost:8080/api/announcements`
by default; adjust the `baseUrl` constant in
`src/app/services/announcement.service.ts` for your deployed back end.

## Getting started

```bash
npm install
npm start
```

Then navigate to `http://localhost:4200/` (or `ng serve --port 8081` to match
the original dev port).

## Tech stack

- Angular 17 (with the new control-flow syntax: `@if`, `@for`, `@empty`)
- Tailwind CSS 3 with a custom `muna` (emerald) and `gold` color palette
- TypeScript 5.2
