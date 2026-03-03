# j4ngx/portfolio

Personal portfolio site built with React 19, TypeScript, Tailwind CSS v4 and Vite 7.  
Live at **[j4ngx.github.io/portfolio](https://j4ngx.github.io/portfolio/)**.

## Features

- **Dark / Light mode** with system preference detection and manual toggle
- **Interactive Playground** section with two browser-based demos:
  - **Forge MCP** — VS Code + Copilot Agent Mode simulator. Runs three tools (`review_pr`, `apply_issue`, `scaffold_project`) with animated chat, live diff viewer, progressive file tree and rich markdown rendering.
  - **GLaDOS Installer** — Interactive terminal emulator that simulates the GLaDOS Installer CLI (`help`, `status`, `dry-run`, `clear`).
- **Experience timeline**, **tech stack grid**, **projects**, **education & certs**, **contact form**
- Fully responsive (mobile → desktop)
- Deployed automatically to GitHub Pages on push to `main`

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@theme` + `@custom-variant`) |
| Build | Vite 7 |
| Hosting | GitHub Pages |

## Getting Started

```bash
# Clone
git clone https://github.com/j4ngx/portfolio.git
cd portfolio

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── ForgeDemo.tsx       # VS Code + Copilot chat simulator
│   ├── GladosDemo.tsx      # Terminal emulator for GLaDOS Installer
│   ├── Playground.tsx      # Tabbed container for interactive demos
│   ├── Hero.tsx            # Landing section
│   ├── Navbar.tsx          # Navigation bar with dark mode toggle
│   ├── ExperienceTimeline.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   ├── EducationCerts.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ...
├── data/
│   └── portfolio.ts        # Single source of truth for all content
├── hooks/
│   └── useTheme.ts         # Dark/light mode hook
├── index.css               # Tailwind v4 theme + custom animations
├── App.tsx
└── main.tsx
```

## License

MIT
