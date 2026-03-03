// Centralized portfolio data – single source of truth
export const PERSONAL = {
  name: 'Jose Antonio Navarro Guerrero',
  firstName: 'Jose Antonio',
  lastName: 'Navarro',
  lastNameHighlight: 'Guerrero',
  title: 'Backend Python Developer',
  tagline: 'Senior Backend Developer | Cybersecurity Specialist | Tech Lead',
  location: 'Granada, Spain',
  phone: '(+34) 722 666 152',
  email: 'joseng2709@gmail.com',
  github: 'https://github.com/j4ngx',
  linkedin: 'https://linkedin.com/in/joseng2709',
  available: true,
  cv: '/portfolio/cv.pdf',
  photo: '/portfolio/photo.webp',
} as const

/** Rotating phrases for the Hero typing animation */
export const HERO_ROLES = [
  'Backend Developer',
  'Security Engineer',
  'Tech Lead',
  'API Architect',
  'Python Specialist',
] as const

export const SUMMARY = `Strategic Technical Architect specializing in the convergence of high-performance Python engineering and AI-driven security automation. Expert in architecting idempotent data pipelines bridging complex backend logic with enterprise-grade Security Operations (SecOps). Mastering the API-First paradigm and FastAPI ecosystem to drive interoperability in multinational environments.`

export const HERO_DESCRIPTION = `Backend Python Developer with strong experience building APIs and backend services (mainly FastAPI and Django/Flask) in security-focused environments for multinational companies. Specialized in integrating security platforms and automating incident response.`

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
  techStack: string
  highlight: boolean
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'classora',
    title: 'Backend Python Developer',
    company: 'Classora Technologies',
    location: 'Granada, Spain',
    period: 'Oct 2023 – Present',
    bullets: [
      'Designed and developed internal cybersecurity applications using FastAPI and hexagonal architecture.',
      'Built and integrated solutions with Cortex XSOAR and multiple cybersecurity APIs to automate incident response.',
      'Took ownership of internal applications as Tech Lead, managing backlogs and defining technical direction.',
      'Led Agile teams, defining architecture standards and enforcing Clean Architecture principles across projects.',
    ],
    techStack: 'FastAPI, OpenAPI, XSOAR, Torq, Poetry, UV, asdf, CyberArk, Agile',
    highlight: true,
  },
  {
    id: 'cipher-mid',
    title: 'Intermediate Tech Cybersecurity / Backend Developer',
    company: 'Cipher | A Prosegur Company',
    location: 'Granada, Spain',
    period: 'Jul 2023 – Oct 2023',
    bullets: [
      'Led the development of a SOAR platform with AI-assisted incident response.',
      'Developed RESTful APIs using Django to support platform modules and data visualization.',
      'Built an AI-driven conversational interface for automated reports and visual analytics.',
    ],
    techStack: 'Django, Elastic Cloud, CrowdStrike, SCADAfence, AI Interface',
    highlight: false,
  },
  {
    id: 'cipher-jr',
    title: 'DevOps and Threat Intelligence Junior Analyst',
    company: 'Cipher | A Prosegur Company',
    location: 'Granada, Spain',
    period: 'Aug 2022 – Jul 2023',
    bullets: [
      'Developed custom Python actions for Siemplify SOAR to automate response workflows.',
      'Created data synchronization jobs between security platforms using REST APIs.',
      'Worked with AWS infrastructure to support deployment of automation services.',
    ],
    techStack: 'Siemplify, AWS, Flask, REST APIs, Automation',
    highlight: false,
  },
  {
    id: 'iwi',
    title: 'Systems Administrator Intern',
    company: 'Grupo IWI',
    location: 'Granada, Spain',
    period: 'Apr 2022 – Aug 2022',
    bullets: [
      'Assisted with administration and maintenance of Linux and Windows servers.',
      'Supported IT operations including system monitoring and troubleshooting.',
      'Collaborated on updates to internal services and documentation.',
    ],
    techStack: 'Linux, Windows Server, Networking, Monitoring',
    highlight: false,
  },
]

export interface SkillGroup {
  title: string
  color: string
  skills: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Languages & Foundations',
    color: 'bg-blue-500',
    skills: ['Python', 'SQL', 'JSON', 'English (C1)', 'Spanish (Native)'],
  },
  {
    title: 'Backend & APIs',
    color: 'bg-emerald-500',
    skills: ['FastAPI', 'Django', 'Flask', 'RESTful', 'OpenAPI', 'Hexagonal Architecture'],
  },
  {
    title: 'Security & SOAR',
    color: 'bg-red-500',
    skills: ['Cortex XSOAR', 'Siemplify', 'Torq', 'SIEM/EDR', 'Incident Response', 'CrowdStrike'],
  },
  {
    title: 'Cloud & DevOps',
    color: 'bg-violet-500',
    skills: ['AWS', 'Azure', 'Docker', 'CI/CD', 'GitHub Actions', 'Git/GitHub/GitLab'],
  },
  {
    title: 'Databases & OS',
    color: 'bg-amber-500',
    skills: ['MySQL', 'SQL Server', 'MongoDB', 'Redis', 'Linux', 'Windows Server'],
  },
  {
    title: 'Tools & Environment',
    color: 'bg-cyan-500',
    skills: ['Poetry', 'UV', 'asdf', 'Alembic', 'Postman', 'CyberArk', 'Pydantic v2'],
  },
]

export interface ProjectSection {
  heading: string
  content: string
}

export interface ProjectOutcome {
  metric: string
  label: string
}

export interface Project {
  id: string
  icon: string
  title: string
  subtitle: string
  tags: string[]
  sections: ProjectSection[]
  outcomes: ProjectOutcome[]
  github?: string
  /** Tab key in the Playground section (e.g. 'forge', 'glados') */
  playground?: string
}

export const PROFESSIONAL_PROJECTS: Project[] = [
  {
    id: 'soar-ai',
    icon: '🤖',
    title: 'Enterprise SOAR Platform with AI Chat',
    subtitle: 'RAG-Enhanced Security Automation',
    tags: ['FastAPI', 'LLM / RAG', 'XSOAR', 'Python', 'Vector DB'],
    sections: [
      {
        heading: 'Background',
        content:
          'Multinational security analysts faced extreme fatigue due to fragmented alerts and high manual triage overhead.',
      },
      {
        heading: 'Process',
        content:
          'Integrated LLMs into the SOAR workflow using a RAG-enhanced pipeline. Optimized vector storage and prompt engineering for grounded answers based on internal documentation, while managing API rate limits and concurrency locks.',
      },
      {
        heading: 'Architecture',
        content:
          'Hexagonal Architecture with Dependency Injection. FastAPI async endpoints orchestrating calls to the vector store and LLM provider. Redis-backed concurrency control and caching layer.',
      },
    ],
    outcomes: [
      { metric: 'RAG', label: 'Grounded answers from internal docs' },
      { metric: 'Async', label: 'FastAPI non-blocking pipeline' },
      { metric: 'Redis', label: 'Concurrency control & caching' },
    ],
  },
  {
    id: 'siem-edr',
    icon: '🛡️',
    title: 'SIEM/EDR High-Performance Integration Layer',
    subtitle: 'CrowdStrike Falcon ↔ Cortex XSOAR',
    tags: ['Python', 'CrowdStrike FQL', 'OAuth2', 'Redis', 'Multi-threading'],
    sections: [
      {
        heading: 'Background',
        content:
          'The need to synchronize massive volumes of real-time detection data from CrowdStrike Falcon into a centralized Cortex XSOAR environment.',
      },
      {
        heading: 'Process',
        content:
          'Developed a multi-threaded integration layer using FQL to refine data collection. Utilized OAuth2 for secure authentication and implemented Redis for state fanning. Handled race conditions during incident mirroring.',
      },
      {
        heading: 'Challenges',
        content:
          'Race conditions in incident mirroring required careful distributed locking. OAuth2 token refresh under high concurrency demanded a thread-safe renewal mechanism with exponential backoff.',
      },
    ],
    outcomes: [
      { metric: 'Real-time', label: 'High-volume event ingestion' },
      { metric: 'OAuth2', label: 'Thread-safe token management' },
      { metric: 'Mirroring', label: 'Bi-directional incident sync' },
    ],
  },
  {
    id: 'api-boilerplate',
    icon: '⚡',
    title: 'Internal API-First Ecosystem',
    subtitle: 'Production-Ready FastAPI Boilerplate',
    tags: ['FastAPI', 'OpenAPI', 'Repository Pattern', 'DI', 'Alembic'],
    sections: [
      {
        heading: 'Background',
        content:
          'Lack of standardization across microservices led to mounting integration debt and slow developer onboarding.',
      },
      {
        heading: 'Process',
        content:
          'Architected a production-ready FastAPI boilerplate with Repository Pattern and Dependency Injection. Decoupled data access from business logic, ensuring a scalable and maintainable codebase.',
      },
      {
        heading: 'Impact',
        content:
          'Adopted as the internal standard for all new Python microservices. Includes auto-generated OpenAPI docs, health checks, structured logging, and CI/CD templates.',
      },
    ],
    outcomes: [
      { metric: 'Standard', label: 'Adopted as internal boilerplate' },
      { metric: 'Modular', label: 'Independent service scaling' },
      { metric: 'DI', label: 'Repository Pattern + Dependency Injection' },
    ],
  },
]

export const PERSONAL_PROJECTS: Project[] = [
  {
    id: 'forge-mcp',
    icon: '🔧',
    title: 'Forge MCP',
    subtitle: 'AI-Powered Developer Productivity Server',
    tags: ['Python', 'MCP', 'FastMCP', 'LLM', 'GitHub Copilot', 'VS Code', 'uv'],
    sections: [
      {
        heading: 'What is it',
        content:
          'A Model Context Protocol (MCP) server that plugs directly into VS Code via GitHub Copilot Agent Mode. It exposes two core tools — review_pr for senior-level code review and apply_issue for end-to-end GitHub issue implementation — turning your IDE into an autonomous developer assistant.',
      },
      {
        heading: 'How it works',
        content:
          'Each tool is prompt-driven: system prompts live in dedicated Markdown files under prompts/, making them easy to customise without touching code. apply_issue fetches issue details via mcp_github_issue_read, creates a branch with gh buddy, proposes an action plan with a mandatory approval gate, implements the solution, self-reviews with review_pr, fixes any findings, and opens a PR automatically.',
      },
      {
        heading: 'Review capabilities',
        content:
          'review_pr produces structured Markdown reviews covering 7 dimensions: logic correctness, software design, security, performance, testing, readability, and integration. Each dimension is rated and includes specific line-level feedback with suggested fixes, making it a true senior-reviewer replacement for solo developers.',
      },
      {
        heading: 'Who is it for',
        content:
          'Solo developers and small teams who want faster, higher-quality code without waiting for human reviewers. It is especially useful for personal projects, open-source maintainers, and anyone who wants a consistent review standard applied to every PR they ship.',
      },
      {
        heading: 'Extensibility',
        content:
          'Adding a new tool is a 3-step process: create a Markdown system prompt, write a thin Python module following the existing pattern, and register it with the @mcp.tool() decorator in server.py. The architecture is intentionally minimal — no frameworks beyond FastMCP — so the codebase stays small and understandable.',
      },
    ],
    outcomes: [
      { metric: '2', label: 'Core tools (review_pr, apply_issue)' },
      { metric: '7', label: 'Review dimensions covered' },
      { metric: 'E2E', label: 'Issue → branch → implement → review → PR' },
      { metric: '3 steps', label: 'To add a new tool' },
    ],
    github: 'https://github.com/j4ngx/Forge_MCP',
    playground: 'forge',
  },
  {
    id: 'glados-installer',
    icon: '🤖',
    title: 'GLaDOS Installer',
    subtitle: 'All-in-One Local AI Assistant Stack for Low-Power Hardware',
    tags: ['Bash', 'Docker', 'Ollama', 'Linux', 'Networking', 'Security', 'Whisper', 'TTS'],
    sections: [
      {
        heading: 'What is it',
        content:
          'A professional, modular Bash installer that deploys a complete local AI assistant environment on Debian-based systems. It orchestrates 17 independent library modules across 4 phases — system foundations (networking, swap, GPU), core services (Ollama, OpenClaw), optional features (voice I/O, web search, Telegram), and server hardening (firewall, SSH, health monitoring).',
      },
      {
        heading: 'What gets installed',
        content:
          'Ollama as the local LLM runtime with Meta Llama 3 by default, OpenClaw as the personal AI assistant with gateway and CLI, whisper.cpp for offline speech-to-text, Piper TTS for text-to-speech with multi-voice support, SearXNG as a self-hosted meta-search engine, plus static IP configuration, swap management, GPU acceleration (NVIDIA Container Toolkit and AMD ROCm), UFW firewall, SSH hardening, unattended security updates, cron-based health monitoring, and optional Telegram bot integration.',
      },
      {
        heading: 'Engineering principles',
        content:
          'Every design decision prioritises reliability: idempotent execution safe to re-run any time, strict error handling with set -Eeuo pipefail and ERR/EXIT trap handlers, lock files to prevent concurrent runs, pre-flight validation of RAM/disk/CPU/network before touching anything, and timestamped logging stripped of ANSI codes for clean storage. The installer supports 30+ CLI flags, a --dry-run mode, --non-interactive mode for CI, and a --status command to check health at a glance.',
      },
      {
        heading: 'Who is it for',
        content:
          'Anyone who wants to run a private, offline-capable AI assistant on their own hardware — hobbyists with Intel N4000 mini-PCs, developers who want a local LLM stack without cloud dependencies, privacy-conscious users, or homelab enthusiasts who want voice control and web search integrated out of the box. It is optimised for low-power x86_64 and ARM64 machines but works on any compatible Debian system.',
      },
      {
        heading: 'Maintenance & recovery',
        content:
          'Built-in backup/restore creates timestamped archives of all configuration (OpenClaw, Ollama models, SearXNG, network, SSH, UFW rules, Piper voices, crontab) and can restore with a single command. The uninstall mode removes all GLaDOS components while preserving Docker and system packages. Health monitoring runs every 5 minutes via cron and alerts through Telegram or syslog.',
      },
    ],
    outcomes: [
      { metric: '17', label: 'Independent library modules' },
      { metric: '14', label: 'Components orchestrated' },
      { metric: '30+', label: 'CLI configuration flags' },
      { metric: '4', label: 'Installation phases' },
    ],
    github: 'https://github.com/j4ngx/GLaDos-Installer',
    playground: 'glados',
  },
  {
    id: 'mesocycle-planner',
    icon: '🏋️',
    title: 'Mesocycle Planner',
    subtitle: 'Full-Stack Gym Training Periodization App',
    tags: ['Python', 'FastAPI', 'SwiftUI', 'MongoDB', 'OpenAPI', 'JWT', 'Hexagonal Architecture'],
    sections: [
      {
        heading: 'What is it',
        content:
          'A full-stack training periodization application with a Python backend (FastAPI + MongoDB) and a native iOS client (SwiftUI). It lets users create structured mesocycles, log workouts, track body metrics over time, and get AI-generated training suggestions — all through 38 REST endpoints defined API-First with OpenAPI.',
      },
      {
        heading: 'Backend architecture',
        content:
          'Hexagonal Architecture with a clean Domain layer (Mesocycle, Workout, Progress, Exercise entities), Infrastructure layer with MongoDB repositories, and an API layer auto-generated from the OpenAPI spec. JWT authentication, full CRUD for all resources, analytics endpoints, smart logging, and progression recommendations.',
      },
      {
        heading: 'iOS client',
        content:
          'Native SwiftUI app following MVVM with Observable services for state management. Five main tabs: Home dashboard with stats, Exercise library with search and filters, Mesocycle management with timeline and progress bars, Workout tracking with completion flow, and Progress charts using the Charts framework. Consistent design system with AppColors, AppTypography, and AppSpacing.',
      },
      {
        heading: 'Who is it for',
        content:
          'Gym-goers who want structured, science-based training periodization instead of random workouts. The app handles mesocycle planning (hypertrophy, strength, endurance), deload week scheduling, progressive overload tracking, and body composition analytics — bridging the gap between a spreadsheet and a personal trainer.',
      },
    ],
    outcomes: [
      { metric: '38', label: 'API endpoints' },
      { metric: '2', label: 'Platforms (Backend + iOS)' },
      { metric: 'Hex', label: 'Hexagonal Architecture' },
      { metric: 'JWT', label: 'Authentication & authorization' },
    ],
    github: 'https://github.com/j4ngx/mesocycle_planner',
    playground: 'evofit',
  },
  {
    id: 'portfolio',
    icon: '🌐',
    title: 'Developer Portfolio',
    subtitle: 'Modern React + Tailwind CSS v4 Single-Page Application',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite 7', 'GitHub Pages', 'GitHub Actions'],
    sections: [
      {
        heading: 'What is it',
        content:
          'A responsive single-page portfolio application built to showcase professional experience, projects, tech stack, education, and certifications. The entire site is data-driven — all content lives in a single TypeScript file (portfolio.ts), making it trivial to update without touching any component code.',
      },
      {
        heading: 'Tech stack & features',
        content:
          'Built with Vite 7 for instant HMR and optimised builds, React 19 with functional components and hooks, TypeScript for type safety across all data structures, and Tailwind CSS v4 with a custom dark professional theme. Features include smooth-scroll navigation, staggered fade-in animations on scroll via IntersectionObserver, and an interactive terminal component that simulates a shell with Easter eggs.',
      },
      {
        heading: 'Deployment pipeline',
        content:
          'Automated CI/CD via GitHub Actions: every push to main triggers a build with Node 20, runs npm ci for reproducible installs, builds the production bundle, and deploys to GitHub Pages. Branch protection is enforced with required reviews and no force-pushes to main, ensuring the live site always reflects reviewed and approved code.',
      },
      {
        heading: 'Who is it for',
        content:
          'Developers looking for a clean, modern portfolio template. The data-driven architecture means you can fork it, replace the content in portfolio.ts with your own data, and have a fully personalised portfolio deployed in minutes — no need to modify React components.',
      },
    ],
    outcomes: [
      { metric: '< 2s', label: 'Initial page load' },
      { metric: '100%', label: 'Responsive on all devices' },
      { metric: 'Auto', label: 'CI/CD deploy on merge to main' },
      { metric: '1 file', label: 'To customise all content' },
    ],
    github: 'https://github.com/j4ngx/portfolio',
  },
]

export interface Education {
  title: string
  institution: string
  period: string
}

export const EDUCATION: Education[] = [
  {
    title: 'Higher Technician in Networked Computer Systems Administration (ASIR)',
    institution: 'IES Zaidín Vergeles – Granada, Spain',
    period: 'Sep 2021 – Aug 2023',
  },
  {
    title: 'Software Engineering (ongoing)',
    institution: 'Universidad de Granada – Granada, Spain',
    period: 'Sep 2017 – Present',
  },
  {
    title: 'Science Bachelor',
    institution: 'IES Luis Bueno Crespo – Granada, Spain',
    period: 'Sep 2015 – Aug 2017',
  },
]

export interface Certification {
  title: string
  year: string
}

export const CERTIFICATIONS: Certification[] = [
  { title: 'Microsoft Certified: Azure Fundamentals (AZ‑900)', year: '2025' },
  { title: 'Siemplify Certified SOAR Developer (SCSD)', year: '2022' },
  { title: 'Siemplify Platform Fundamentals – Version 6+ (SPFv6)', year: '2022' },
  { title: 'Siemplify Certified SOAR Analyst (SCSA)', year: '2022' },
]
