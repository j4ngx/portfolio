// Centralized portfolio data – single source of truth

/* ------------------------------------------------------------------ */
/*  Bilingual helpers                                                  */
/* ------------------------------------------------------------------ */

export type LocalizedText = { en: string; es: string }

/** Pick the localized variant for the current locale */
export function loc(text: LocalizedText | string, locale: 'en' | 'es'): string {
  if (typeof text === 'string') return text
  return text[locale]
}

/* ------------------------------------------------------------------ */
/*  Personal (language-neutral)                                        */
/* ------------------------------------------------------------------ */

export const PERSONAL = {
  name: 'Jose Antonio Navarro Guerrero',
  firstName: 'Jose Antonio',
  lastName: 'Navarro',
  lastNameHighlight: 'Guerrero',
  title: 'Backend Python Developer',
  tagline: 'Backend Developer | Cybersecurity Automation | Python Specialist',
  location: 'Granada, Spain',
  phone: '(+34) 722 666 152',
  email: 'joseng2709@gmail.com',
  github: 'https://github.com/j4ngx',
  linkedin: 'https://www.linkedin.com/in/jose-antonio-navarro-guerrero-1b6b86194/',
  available: true,
  cv: '/portfolio/cv.pdf',
  photo: '/portfolio/photo.png',
} as const

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

/** Rotating phrases for the Hero typing animation */
export const HERO_ROLES: LocalizedText[] = [
  { en: 'Building secure APIs.', es: 'Construyendo APIs seguras.' },
  { en: 'Automating incident response.', es: 'Automatizando respuesta a incidentes.' },
  { en: 'Leading backend teams.', es: 'Liderando equipos backend.' },
  { en: 'Engineering SOAR platforms.', es: 'Diseñando plataformas SOAR.' },
  { en: 'Crafting Python services.', es: 'Creando servicios en Python.' },
]

export const HERO_DESCRIPTION = `Backend Python Developer with strong experience building APIs and backend services (mainly FastAPI and Django/Flask) in security-focused environments for multinational companies. Specialized in integrating security platforms and automating incident response.`

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */

export interface Experience {
  id: string
  title: LocalizedText
  company: string
  location: string
  period: string
  bullets: LocalizedText[]
  techStack: string
  highlight: boolean
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'classora',
    title: {
      en: 'Backend Python Developer',
      es: 'Desarrollador Backend Python',
    },
    company: 'Classora Technologies',
    location: 'Granada, Spain',
    period: 'Oct 2023 – Present',
    bullets: [
      {
        en: 'Designed and developed internal cybersecurity applications using FastAPI and hexagonal architecture.',
        es: 'Diseñé y desarrollé aplicaciones internas de ciberseguridad con FastAPI y arquitectura hexagonal.',
      },
      {
        en: 'Built and integrated solutions with Cortex XSOAR and multiple cybersecurity APIs to automate incident response.',
        es: 'Construí e integré soluciones con Cortex XSOAR y múltiples APIs de ciberseguridad para automatizar la respuesta a incidentes.',
      },
      {
        en: 'Took ownership of internal applications as Tech Lead, managing backlogs and defining technical direction.',
        es: 'Asumí la responsabilidad de aplicaciones internas como Tech Lead, gestionando backlogs y definiendo la dirección técnica.',
      },
      {
        en: 'Led Agile teams, defining architecture standards and enforcing Clean Architecture principles across projects.',
        es: 'Lideré equipos Agile, definiendo estándares de arquitectura y aplicando principios de Clean Architecture en los proyectos.',
      },
    ],
    techStack: 'FastAPI, OpenAPI, XSOAR, Torq, Poetry, UV, asdf, CyberArk, Agile',
    highlight: true,
  },
  {
    id: 'cipher-mid',
    title: {
      en: 'Intermediate Tech Cybersecurity / Backend Developer',
      es: 'Técnico Intermedio de Ciberseguridad / Desarrollador Backend',
    },
    company: 'Cipher | A Prosegur Company',
    location: 'Granada, Spain',
    period: 'Jul 2023 – Oct 2023',
    bullets: [
      {
        en: 'Led the development of a SOAR platform with AI-assisted incident response.',
        es: 'Lideré el desarrollo de una plataforma SOAR con respuesta a incidentes asistida por IA.',
      },
      {
        en: 'Developed RESTful APIs using Django to support platform modules and data visualization.',
        es: 'Desarrollé APIs RESTful con Django para módulos de plataforma y visualización de datos.',
      },
      {
        en: 'Built an AI-driven conversational interface for automated reports and visual analytics.',
        es: 'Construí una interfaz conversacional basada en IA para informes automatizados y analítica visual.',
      },
    ],
    techStack: 'Django, Elastic Cloud, CrowdStrike, SCADAfence, AI Interface',
    highlight: false,
  },
  {
    id: 'cipher-jr',
    title: {
      en: 'DevOps and Threat Intelligence Junior Analyst',
      es: 'Analista Junior de DevOps e Inteligencia de Amenazas',
    },
    company: 'Cipher | A Prosegur Company',
    location: 'Granada, Spain',
    period: 'Aug 2022 – Jul 2023',
    bullets: [
      {
        en: 'Developed custom Python actions for Siemplify SOAR to automate response workflows.',
        es: 'Desarrollé acciones personalizadas en Python para Siemplify SOAR para automatizar flujos de respuesta.',
      },
      {
        en: 'Created data synchronization jobs between security platforms using REST APIs.',
        es: 'Creé trabajos de sincronización de datos entre plataformas de seguridad usando APIs REST.',
      },
      {
        en: 'Worked with AWS infrastructure to support deployment of automation services.',
        es: 'Trabajé con infraestructura AWS para desplegar servicios de automatización.',
      },
    ],
    techStack: 'Siemplify, AWS, Flask, REST APIs, Automation',
    highlight: false,
  },
  {
    id: 'iwi',
    title: {
      en: 'Systems Administrator Intern',
      es: 'Becario de Administración de Sistemas',
    },
    company: 'Grupo IWI',
    location: 'Granada, Spain',
    period: 'Apr 2022 – Aug 2022',
    bullets: [
      {
        en: 'Assisted with administration and maintenance of Linux and Windows servers.',
        es: 'Asistí en la administración y mantenimiento de servidores Linux y Windows.',
      },
      {
        en: 'Supported IT operations including system monitoring and troubleshooting.',
        es: 'Apoyé operaciones de TI incluyendo monitorización de sistemas y resolución de problemas.',
      },
      {
        en: 'Collaborated on updates to internal services and documentation.',
        es: 'Colaboré en actualizaciones de servicios internos y documentación.',
      },
    ],
    techStack: 'Linux, Windows Server, Networking, Monitoring',
    highlight: false,
  },
]

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string
  proficiency: number
}

export interface SkillGroup {
  title: LocalizedText
  color: string
  skills: Skill[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: { en: 'Programming & Data', es: 'Programación y Datos' },
    color: 'bg-blue-500',
    skills: [
      { name: 'Python', proficiency: 95 },
      { name: 'SQL', proficiency: 80 },
      { name: 'Bash', proficiency: 70 },
      { name: 'JSON / YAML', proficiency: 90 },
    ],
  },
  {
    title: { en: 'Backend & APIs', es: 'Backend y APIs' },
    color: 'bg-emerald-500',
    skills: [
      { name: 'FastAPI', proficiency: 95 },
      { name: 'Django', proficiency: 80 },
      { name: 'Flask', proficiency: 75 },
      { name: 'RESTful APIs', proficiency: 90 },
      { name: 'OpenAPI', proficiency: 90 },
      { name: 'Hexagonal Arch.', proficiency: 85 },
    ],
  },
  {
    title: { en: 'Security & SOAR', es: 'Seguridad y SOAR' },
    color: 'bg-red-500',
    skills: [
      { name: 'Cortex XSOAR', proficiency: 90 },
      { name: 'Siemplify', proficiency: 85 },
      { name: 'Torq', proficiency: 80 },
      { name: 'SIEM / EDR', proficiency: 85 },
      { name: 'Incident Response', proficiency: 85 },
      { name: 'CrowdStrike', proficiency: 75 },
    ],
  },
  {
    title: { en: 'Cloud & DevOps', es: 'Cloud y DevOps' },
    color: 'bg-violet-500',
    skills: [
      { name: 'AWS', proficiency: 70 },
      { name: 'Azure', proficiency: 65 },
      { name: 'Docker', proficiency: 80 },
      { name: 'CI/CD', proficiency: 85 },
      { name: 'GitHub Actions', proficiency: 85 },
      { name: 'Git', proficiency: 90 },
    ],
  },
  {
    title: { en: 'Databases & OS', es: 'Bases de Datos y SO' },
    color: 'bg-amber-500',
    skills: [
      { name: 'MySQL', proficiency: 80 },
      { name: 'SQL Server', proficiency: 70 },
      { name: 'MongoDB', proficiency: 75 },
      { name: 'Redis', proficiency: 75 },
      { name: 'Linux', proficiency: 85 },
      { name: 'Windows Server', proficiency: 70 },
    ],
  },
  {
    title: { en: 'Tools & Ecosystem', es: 'Herramientas y Ecosistema' },
    color: 'bg-cyan-500',
    skills: [
      { name: 'Poetry', proficiency: 90 },
      { name: 'UV', proficiency: 90 },
      { name: 'asdf', proficiency: 80 },
      { name: 'Alembic', proficiency: 80 },
      { name: 'Pydantic v2', proficiency: 90 },
      { name: 'CyberArk', proficiency: 70 },
    ],
  },
]

export const LANGUAGES = [
  { name: 'Spanish', level: 'Native' },
  { name: 'English', level: 'C1' },
] as const

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

export interface ProjectSection {
  heading: LocalizedText
  content: LocalizedText
}

export interface ProjectOutcome {
  metric: string
  label: LocalizedText
}

export interface Project {
  id: string
  icon: string
  title: string
  subtitle: LocalizedText
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
    subtitle: {
      en: 'RAG-Enhanced Security Automation',
      es: 'Automatización de Seguridad con RAG',
    },
    tags: ['FastAPI', 'LLM / RAG', 'XSOAR', 'Python', 'Vector DB'],
    sections: [
      {
        heading: { en: 'Background', es: 'Contexto' },
        content: {
          en: 'Multinational security analysts faced extreme fatigue due to fragmented alerts and high manual triage overhead.',
          es: 'Los analistas de seguridad de una multinacional sufrían fatiga extrema por alertas fragmentadas y alta carga de triaje manual.',
        },
      },
      {
        heading: { en: 'Process', es: 'Proceso' },
        content: {
          en: 'Integrated LLMs into the SOAR workflow using a RAG-enhanced pipeline. Optimized vector storage and prompt engineering for grounded answers based on internal documentation, while managing API rate limits and concurrency locks.',
          es: 'Integré LLMs en el flujo de trabajo SOAR mediante un pipeline mejorado con RAG. Optimicé el almacenamiento vectorial y la ingeniería de prompts para respuestas fundamentadas en documentación interna, gestionando límites de tasa de API y bloqueos de concurrencia.',
        },
      },
      {
        heading: { en: 'Architecture', es: 'Arquitectura' },
        content: {
          en: 'Hexagonal Architecture with Dependency Injection. FastAPI async endpoints orchestrating calls to the vector store and LLM provider. Redis-backed concurrency control and caching layer.',
          es: 'Arquitectura Hexagonal con Inyección de Dependencias. Endpoints asíncronos de FastAPI orquestando llamadas al almacén vectorial y al proveedor de LLM. Control de concurrencia y capa de caché respaldados por Redis.',
        },
      },
    ],
    outcomes: [
      { metric: 'RAG', label: { en: 'Grounded answers from internal docs', es: 'Respuestas fundamentadas en docs internos' } },
      { metric: 'Async', label: { en: 'FastAPI non-blocking pipeline', es: 'Pipeline no bloqueante con FastAPI' } },
      { metric: 'Redis', label: { en: 'Concurrency control & caching', es: 'Control de concurrencia y caché' } },
    ],
  },
  {
    id: 'siem-edr',
    icon: '🛡️',
    title: 'SIEM/EDR High-Performance Integration Layer',
    subtitle: {
      en: 'CrowdStrike Falcon ↔ Cortex XSOAR',
      es: 'CrowdStrike Falcon ↔ Cortex XSOAR',
    },
    tags: ['Python', 'CrowdStrike FQL', 'OAuth2', 'Redis', 'Multi-threading'],
    sections: [
      {
        heading: { en: 'Background', es: 'Contexto' },
        content: {
          en: 'The need to synchronize massive volumes of real-time detection data from CrowdStrike Falcon into a centralized Cortex XSOAR environment.',
          es: 'Necesidad de sincronizar volúmenes masivos de datos de detección en tiempo real desde CrowdStrike Falcon hacia un entorno centralizado de Cortex XSOAR.',
        },
      },
      {
        heading: { en: 'Process', es: 'Proceso' },
        content: {
          en: 'Developed a multi-threaded integration layer using FQL to refine data collection. Utilized OAuth2 for secure authentication and implemented Redis for state fanning. Handled race conditions during incident mirroring.',
          es: 'Desarrollé una capa de integración multi-hilo usando FQL para refinar la recolección de datos. Utilicé OAuth2 para autenticación segura e implementé Redis para gestión de estado. Gestioné condiciones de carrera durante el mirroring de incidentes.',
        },
      },
      {
        heading: { en: 'Challenges', es: 'Desafíos' },
        content: {
          en: 'Race conditions in incident mirroring required careful distributed locking. OAuth2 token refresh under high concurrency demanded a thread-safe renewal mechanism with exponential backoff.',
          es: 'Las condiciones de carrera en el mirroring de incidentes requirieron bloqueo distribuido cuidadoso. La renovación de tokens OAuth2 bajo alta concurrencia demandó un mecanismo thread-safe con backoff exponencial.',
        },
      },
    ],
    outcomes: [
      { metric: 'Real-time', label: { en: 'High-volume event ingestion', es: 'Ingesta de eventos de alto volumen' } },
      { metric: 'OAuth2', label: { en: 'Thread-safe token management', es: 'Gestión de tokens thread-safe' } },
      { metric: 'Mirroring', label: { en: 'Bi-directional incident sync', es: 'Sincronización bidireccional de incidentes' } },
    ],
  },
  {
    id: 'api-boilerplate',
    icon: '⚡',
    title: 'Internal API-First Ecosystem',
    subtitle: {
      en: 'Production-Ready FastAPI Boilerplate',
      es: 'Boilerplate FastAPI Listo para Producción',
    },
    tags: ['FastAPI', 'OpenAPI', 'Repository Pattern', 'DI', 'Alembic'],
    sections: [
      {
        heading: { en: 'Background', es: 'Contexto' },
        content: {
          en: 'Lack of standardization across microservices led to mounting integration debt and slow developer onboarding.',
          es: 'La falta de estandarización entre microservicios generaba deuda de integración creciente y onboarding lento de desarrolladores.',
        },
      },
      {
        heading: { en: 'Process', es: 'Proceso' },
        content: {
          en: 'Architected a production-ready FastAPI boilerplate with Repository Pattern and Dependency Injection. Decoupled data access from business logic, ensuring a scalable and maintainable codebase.',
          es: 'Diseñé un boilerplate de FastAPI listo para producción con Repository Pattern e Inyección de Dependencias. Desacoplé el acceso a datos de la lógica de negocio, asegurando una base de código escalable y mantenible.',
        },
      },
      {
        heading: { en: 'Impact', es: 'Impacto' },
        content: {
          en: 'Adopted as the internal standard for all new Python microservices. Includes auto-generated OpenAPI docs, health checks, structured logging, and CI/CD templates.',
          es: 'Adoptado como el estándar interno para todos los nuevos microservicios Python. Incluye documentación OpenAPI autogenerada, health checks, logging estructurado y plantillas CI/CD.',
        },
      },
    ],
    outcomes: [
      { metric: 'Standard', label: { en: 'Adopted as internal boilerplate', es: 'Adoptado como boilerplate interno' } },
      { metric: 'Modular', label: { en: 'Independent service scaling', es: 'Escalado independiente de servicios' } },
      { metric: 'DI', label: { en: 'Repository Pattern + Dependency Injection', es: 'Repository Pattern + Inyección de Dependencias' } },
    ],
  },
]

export const PERSONAL_PROJECTS: Project[] = [
  {
    id: 'forge-mcp',
    icon: '🔧',
    title: 'Forge MCP',
    subtitle: {
      en: 'AI-Powered Developer Productivity Server',
      es: 'Servidor de Productividad para Desarrolladores con IA',
    },
    tags: ['Python', 'MCP', 'FastMCP', 'LLM', 'GitHub Copilot', 'VS Code', 'uv'],
    sections: [
      {
        heading: { en: 'What is it', es: 'Qué es' },
        content: {
          en: 'A Model Context Protocol (MCP) server that plugs directly into VS Code via GitHub Copilot Agent Mode. It exposes two core tools \u2014 review_pr for senior-level code review and apply_issue for end-to-end GitHub issue implementation \u2014 turning your IDE into an autonomous developer assistant.',
          es: 'Un servidor Model Context Protocol (MCP) que se conecta directamente a VS Code a través de GitHub Copilot Agent Mode. Expone dos herramientas principales \u2014 review_pr para revisión de código a nivel senior y apply_issue para implementación end-to-end de issues de GitHub \u2014 convirtiendo tu IDE en un asistente de desarrollo autónomo.',
        },
      },
      {
        heading: { en: 'How it works', es: 'Cómo funciona' },
        content: {
          en: 'Each tool is prompt-driven: system prompts live in dedicated Markdown files under prompts/, making them easy to customise without touching code. apply_issue fetches issue details via mcp_github_issue_read, creates a branch with gh buddy, proposes an action plan with a mandatory approval gate, implements the solution, self-reviews with review_pr, fixes any findings, and opens a PR automatically.',
          es: 'Cada herramienta está dirigida por prompts: los prompts del sistema residen en archivos Markdown dedicados bajo prompts/, facilitando la personalización sin tocar código. apply_issue obtiene detalles del issue vía mcp_github_issue_read, crea una rama, propone un plan de acción con una puerta de aprobación obligatoria, implementa la solución, se auto-revisa con review_pr, corrige hallazgos y abre un PR automáticamente.',
        },
      },
      {
        heading: { en: 'Review capabilities', es: 'Capacidades de revisión' },
        content: {
          en: 'review_pr produces structured Markdown reviews covering 7 dimensions: logic correctness, software design, security, performance, testing, readability, and integration. Each dimension is rated and includes specific line-level feedback with suggested fixes, making it a true senior-reviewer replacement for solo developers.',
          es: 'review_pr produce revisiones estructuradas en Markdown cubriendo 7 dimensiones: corrección lógica, diseño de software, seguridad, rendimiento, testing, legibilidad e integración. Cada dimensión se califica e incluye feedback específico a nivel de línea con correcciones sugeridas.',
        },
      },
      {
        heading: { en: 'Who is it for', es: 'Para quién es' },
        content: {
          en: 'Solo developers and small teams who want faster, higher-quality code without waiting for human reviewers. It is especially useful for personal projects, open-source maintainers, and anyone who wants a consistent review standard applied to every PR they ship.',
          es: 'Desarrolladores individuales y equipos pequeños que quieren código más rápido y de mayor calidad sin esperar revisores humanos. Es especialmente útil para proyectos personales, mantenedores open-source y cualquiera que quiera un estándar de revisión consistente en cada PR.',
        },
      },
      {
        heading: { en: 'Extensibility', es: 'Extensibilidad' },
        content: {
          en: 'Adding a new tool is a 3-step process: create a Markdown system prompt, write a thin Python module following the existing pattern, and register it with the @mcp.tool() decorator in server.py. The architecture is intentionally minimal \u2014 no frameworks beyond FastMCP \u2014 so the codebase stays small and understandable.',
          es: 'Añadir una nueva herramienta es un proceso de 3 pasos: crear un prompt en Markdown, escribir un módulo Python ligero siguiendo el patrón existente y registrarlo con el decorador @mcp.tool() en server.py. La arquitectura es intencionalmente mínima \u2014 sin frameworks más allá de FastMCP \u2014 para mantener la base de código pequeña y comprensible.',
        },
      },
    ],
    outcomes: [
      { metric: '2', label: { en: 'Core tools (review_pr, apply_issue)', es: 'Herramientas principales (review_pr, apply_issue)' } },
      { metric: '7', label: { en: 'Review dimensions covered', es: 'Dimensiones de revisión cubiertas' } },
      { metric: 'E2E', label: { en: 'Issue \u2192 branch \u2192 implement \u2192 review \u2192 PR', es: 'Issue \u2192 rama \u2192 implementar \u2192 revisar \u2192 PR' } },
      { metric: '3 steps', label: { en: 'To add a new tool', es: 'Para añadir una herramienta nueva' } },
    ],
    github: 'https://github.com/j4ngx/Forge_MCP',
    playground: 'forge',
  },
  {
    id: 'glados-installer',
    icon: '🤖',
    title: 'GLaDOS Installer',
    subtitle: {
      en: 'All-in-One Local AI Assistant Stack for Low-Power Hardware',
      es: 'Stack Completo de Asistente IA Local para Hardware de Baja Potencia',
    },
    tags: ['Bash', 'Docker', 'Ollama', 'Linux', 'Networking', 'Security', 'Whisper', 'TTS'],
    sections: [
      {
        heading: { en: 'What is it', es: 'Qué es' },
        content: {
          en: 'A professional, modular Bash installer that deploys a complete local AI assistant environment on Debian-based systems. It orchestrates 17 independent library modules across 4 phases \u2014 system foundations (networking, swap, GPU), core services (Ollama, OpenClaw), optional features (voice I/O, web search, Telegram), and server hardening (firewall, SSH, health monitoring).',
          es: 'Un instalador modular y profesional en Bash que despliega un entorno completo de asistente IA local en sistemas basados en Debian. Orquesta 17 módulos de biblioteca independientes en 4 fases \u2014 fundamentos del sistema (red, swap, GPU), servicios core (Ollama, OpenClaw), características opcionales (voz I/O, búsqueda web, Telegram) y hardening del servidor (firewall, SSH, monitorización).',
        },
      },
      {
        heading: { en: 'What gets installed', es: 'Qué se instala' },
        content: {
          en: 'Ollama as the local LLM runtime with Meta Llama 3 by default, OpenClaw as the personal AI assistant with gateway and CLI, whisper.cpp for offline speech-to-text, Piper TTS for text-to-speech with multi-voice support, SearXNG as a self-hosted meta-search engine, plus static IP configuration, swap management, GPU acceleration (NVIDIA Container Toolkit and AMD ROCm), UFW firewall, SSH hardening, unattended security updates, cron-based health monitoring, and optional Telegram bot integration.',
          es: 'Ollama como runtime local de LLM con Meta Llama 3 por defecto, OpenClaw como asistente IA personal con gateway y CLI, whisper.cpp para speech-to-text offline, Piper TTS para text-to-speech con soporte multi-voz, SearXNG como motor de metabúsqueda autoalojado, además de configuración de IP estática, gestión de swap, aceleración GPU (NVIDIA Container Toolkit y AMD ROCm), firewall UFW, hardening SSH, actualizaciones de seguridad desatendidas, monitorización vía cron e integración opcional con bot de Telegram.',
        },
      },
      {
        heading: { en: 'Engineering principles', es: 'Principios de ingeniería' },
        content: {
          en: 'Every design decision prioritises reliability: idempotent execution safe to re-run any time, strict error handling with set -Eeuo pipefail and ERR/EXIT trap handlers, lock files to prevent concurrent runs, pre-flight validation of RAM/disk/CPU/network before touching anything, and timestamped logging stripped of ANSI codes for clean storage. The installer supports 30+ CLI flags, a --dry-run mode, --non-interactive mode for CI, and a --status command to check health at a glance.',
          es: 'Cada decisión de diseño prioriza la fiabilidad: ejecución idempotente segura para re-ejecutar en cualquier momento, manejo estricto de errores con set -Eeuo pipefail y manejadores de trap ERR/EXIT, ficheros de bloqueo para prevenir ejecuciones concurrentes, validación previa de RAM/disco/CPU/red, y logging con timestamps sin códigos ANSI. Soporta más de 30 flags CLI, modo --dry-run, modo --non-interactive para CI y comando --status para verificar el estado.',
        },
      },
      {
        heading: { en: 'Who is it for', es: 'Para quién es' },
        content: {
          en: 'Anyone who wants to run a private, offline-capable AI assistant on their own hardware \u2014 hobbyists with Intel N4000 mini-PCs, developers who want a local LLM stack without cloud dependencies, privacy-conscious users, or homelab enthusiasts who want voice control and web search integrated out of the box. It is optimised for low-power x86_64 and ARM64 machines but works on any compatible Debian system.',
          es: 'Cualquiera que quiera ejecutar un asistente IA privado y offline en su propio hardware \u2014 entusiastas con mini-PCs Intel N4000, desarrolladores que quieren un stack LLM local sin dependencias cloud, usuarios preocupados por la privacidad o entusiastas de homelabs que quieren control por voz y búsqueda web integrados. Optimizado para máquinas x86_64 y ARM64 de baja potencia.',
        },
      },
      {
        heading: { en: 'Maintenance & recovery', es: 'Mantenimiento y recuperación' },
        content: {
          en: 'Built-in backup/restore creates timestamped archives of all configuration (OpenClaw, Ollama models, SearXNG, network, SSH, UFW rules, Piper voices, crontab) and can restore with a single command. The uninstall mode removes all GLaDOS components while preserving Docker and system packages. Health monitoring runs every 5 minutes via cron and alerts through Telegram or syslog.',
          es: 'Backup/restauración integrado que crea archivos con timestamp de toda la configuración (OpenClaw, modelos Ollama, SearXNG, red, SSH, reglas UFW, voces Piper, crontab) y puede restaurar con un solo comando. El modo de desinstalación elimina todos los componentes de GLaDOS preservando Docker y paquetes del sistema. La monitorización ejecuta cada 5 minutos vía cron y alerta por Telegram o syslog.',
        },
      },
    ],
    outcomes: [
      { metric: '17', label: { en: 'Independent library modules', es: 'Módulos de biblioteca independientes' } },
      { metric: '14', label: { en: 'Components orchestrated', es: 'Componentes orquestados' } },
      { metric: '30+', label: { en: 'CLI configuration flags', es: 'Flags de configuración CLI' } },
      { metric: '4', label: { en: 'Installation phases', es: 'Fases de instalación' } },
    ],
    github: 'https://github.com/j4ngx/GLaDos-Installer',
    playground: 'glados',
  },
  {
    id: 'mesocycle-planner',
    icon: '🏋️',
    title: 'Mesocycle Planner',
    subtitle: {
      en: 'Full-Stack Gym Training Periodization App',
      es: 'App Full-Stack de Periodización de Entrenamiento',
    },
    tags: ['Python', 'FastAPI', 'SwiftUI', 'MongoDB', 'OpenAPI', 'JWT', 'Hexagonal Architecture'],
    sections: [
      {
        heading: { en: 'What is it', es: 'Qué es' },
        content: {
          en: 'A full-stack training periodization application with a Python backend (FastAPI + MongoDB) and a native iOS client (SwiftUI). It lets users create structured mesocycles, log workouts, track body metrics over time, and get AI-generated training suggestions \u2014 all through 38 REST endpoints defined API-First with OpenAPI.',
          es: 'Una aplicación full-stack de periodización de entrenamiento con backend en Python (FastAPI + MongoDB) y cliente iOS nativo (SwiftUI). Permite crear mesociclos estructurados, registrar entrenamientos, seguir métricas corporales y obtener sugerencias de entrenamiento generadas por IA \u2014 todo a través de 38 endpoints REST definidos API-First con OpenAPI.',
        },
      },
      {
        heading: { en: 'Backend architecture', es: 'Arquitectura backend' },
        content: {
          en: 'Hexagonal Architecture with a clean Domain layer (Mesocycle, Workout, Progress, Exercise entities), Infrastructure layer with MongoDB repositories, and an API layer auto-generated from the OpenAPI spec. JWT authentication, full CRUD for all resources, analytics endpoints, smart logging, and progression recommendations.',
          es: 'Arquitectura Hexagonal con capa de Dominio limpia (entidades Mesocycle, Workout, Progress, Exercise), capa de Infraestructura con repositorios MongoDB y capa API autogenerada desde la especificación OpenAPI. Autenticación JWT, CRUD completo, endpoints de analítica, logging inteligente y recomendaciones de progresión.',
        },
      },
      {
        heading: { en: 'iOS client', es: 'Cliente iOS' },
        content: {
          en: 'Native SwiftUI app following MVVM with Observable services for state management. Five main tabs: Home dashboard with stats, Exercise library with search and filters, Mesocycle management with timeline and progress bars, Workout tracking with completion flow, and Progress charts using the Charts framework. Consistent design system with AppColors, AppTypography, and AppSpacing.',
          es: 'App nativa SwiftUI siguiendo MVVM con servicios Observable para gestión de estado. Cinco pestañas principales: Dashboard con estadísticas, biblioteca de ejercicios con búsqueda y filtros, gestión de mesociclos con línea temporal y barras de progreso, seguimiento de entrenamientos con flujo de completado y gráficos de progreso usando el framework Charts.',
        },
      },
      {
        heading: { en: 'Who is it for', es: 'Para quién es' },
        content: {
          en: 'Gym-goers who want structured, science-based training periodization instead of random workouts. The app handles mesocycle planning (hypertrophy, strength, endurance), deload week scheduling, progressive overload tracking, and body composition analytics \u2014 bridging the gap between a spreadsheet and a personal trainer.',
          es: 'Personas que entrenan en gimnasio y quieren una periodización estructurada y basada en ciencia en lugar de rutinas aleatorias. La app gestiona planificación de mesociclos (hipertrofia, fuerza, resistencia), semanas de descarga, sobrecarga progresiva y analítica de composición corporal.',
        },
      },
    ],
    outcomes: [
      { metric: '38', label: { en: 'API endpoints', es: 'Endpoints de API' } },
      { metric: '2', label: { en: 'Platforms (Backend + iOS)', es: 'Plataformas (Backend + iOS)' } },
      { metric: 'Hex', label: { en: 'Hexagonal Architecture', es: 'Arquitectura Hexagonal' } },
      { metric: 'JWT', label: { en: 'Authentication & authorization', es: 'Autenticación y autorización' } },
    ],
    github: 'https://github.com/j4ngx/mesocycle_planner',
    playground: 'evofit',
  },
  {
    id: 'portfolio',
    icon: '🌐',
    title: 'Developer Portfolio',
    subtitle: {
      en: 'Modern React + Tailwind CSS v4 Single-Page Application',
      es: 'Aplicación SPA Moderna con React + Tailwind CSS v4',
    },
    tags: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite 7', 'GitHub Pages', 'GitHub Actions'],
    sections: [
      {
        heading: { en: 'What is it', es: 'Qué es' },
        content: {
          en: 'A responsive single-page portfolio application built to showcase professional experience, projects, tech stack, education, and certifications. The entire site is data-driven \u2014 all content lives in a single TypeScript file (portfolio.ts), making it trivial to update without touching any component code.',
          es: 'Una aplicación portfolio responsiva de página única para mostrar experiencia profesional, proyectos, stack tecnológico, educación y certificaciones. Todo el sitio está dirigido por datos \u2014 todo el contenido vive en un único archivo TypeScript (portfolio.ts), haciendo trivial la actualización sin tocar código de componentes.',
        },
      },
      {
        heading: { en: 'Tech stack & features', es: 'Stack tecnológico y funcionalidades' },
        content: {
          en: 'Built with Vite 7 for instant HMR and optimised builds, React 19 with functional components and hooks, TypeScript for type safety across all data structures, and Tailwind CSS v4 with a custom dark professional theme. Features include smooth-scroll navigation, staggered fade-in animations on scroll via IntersectionObserver, and an interactive terminal component that simulates a shell with Easter eggs.',
          es: 'Construido con Vite 7 para HMR instantáneo y builds optimizados, React 19 con componentes funcionales y hooks, TypeScript para seguridad de tipos y Tailwind CSS v4 con un tema profesional oscuro personalizado. Incluye navegación con scroll suave, animaciones escalonadas de aparición por scroll vía IntersectionObserver y una terminal interactiva que simula una shell con easter eggs.',
        },
      },
      {
        heading: { en: 'Deployment pipeline', es: 'Pipeline de despliegue' },
        content: {
          en: 'Automated CI/CD via GitHub Actions: every push to main triggers a build with Node 20, runs npm ci for reproducible installs, builds the production bundle, and deploys to GitHub Pages. Branch protection is enforced with required reviews and no force-pushes to main, ensuring the live site always reflects reviewed and approved code.',
          es: 'CI/CD automatizado vía GitHub Actions: cada push a main dispara un build con Node 20, ejecuta npm ci para instalaciones reproducibles, compila el bundle de producción y despliega en GitHub Pages. La protección de rama se aplica con revisiones requeridas y sin force-pushes a main.',
        },
      },
      {
        heading: { en: 'Who is it for', es: 'Para quién es' },
        content: {
          en: 'Developers looking for a clean, modern portfolio template. The data-driven architecture means you can fork it, replace the content in portfolio.ts with your own data, and have a fully personalised portfolio deployed in minutes \u2014 no need to modify React components.',
          es: 'Desarrolladores que buscan una plantilla de portfolio limpia y moderna. La arquitectura dirigida por datos permite hacer fork, reemplazar el contenido en portfolio.ts con tus datos y tener un portfolio completamente personalizado desplegado en minutos \u2014 sin necesidad de modificar componentes React.',
        },
      },
    ],
    outcomes: [
      { metric: '< 2s', label: { en: 'Initial page load', es: 'Carga inicial de página' } },
      { metric: '100%', label: { en: 'Responsive on all devices', es: 'Responsivo en todos los dispositivos' } },
      { metric: 'Auto', label: { en: 'CI/CD deploy on merge to main', es: 'Despliegue CI/CD al mergear a main' } },
      { metric: '1 file', label: { en: 'To customise all content', es: 'Para personalizar todo el contenido' } },
    ],
    github: 'https://github.com/j4ngx/portfolio',
  },
]

/* ------------------------------------------------------------------ */
/*  Education & certifications                                         */
/* ------------------------------------------------------------------ */

export interface Education {
  title: LocalizedText
  institution: string
  period: string
}

export const EDUCATION: Education[] = [
  {
    title: {
      en: 'Higher Technician in Networked Computer Systems Administration (ASIR)',
      es: 'Técnico Superior en Administración de Sistemas Informáticos en Red (ASIR)',
    },
    institution: 'IES Zaidín Vergeles \u2013 Granada, Spain',
    period: 'Sep 2021 \u2013 Aug 2023',
  },
  {
    title: {
      en: 'Software Engineering (ongoing)',
      es: 'Ingeniería Informática (en curso)',
    },
    institution: 'Universidad de Granada \u2013 Granada, Spain',
    period: 'Sep 2017 \u2013 Present',
  },
  {
    title: {
      en: 'Science Bachelor',
      es: 'Bachillerato de Ciencias',
    },
    institution: 'IES Luis Bueno Crespo \u2013 Granada, Spain',
    period: 'Sep 2015 \u2013 Aug 2017',
  },
]

export interface Certification {
  title: string
  year: string
}

export const CERTIFICATIONS: Certification[] = [
  { title: 'Microsoft Certified: Azure Fundamentals (AZ\u2011900)', year: '2025' },
  { title: 'Siemplify Certified SOAR Developer (SCSD)', year: '2022' },
  { title: 'Siemplify Platform Fundamentals \u2013 Version 6+ (SPFv6)', year: '2022' },
  { title: 'Siemplify Certified SOAR Analyst (SCSA)', year: '2022' },
]
