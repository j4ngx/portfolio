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
  github: 'https://github.com/joseng2709',
  linkedin: 'https://linkedin.com/in/joseng2709',
  available: true,
} as const

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
}

export const PROJECTS: Project[] = [
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
      { metric: '70%', label: 'Reduction in manual triage time' },
      { metric: '~1.2s', label: 'Average RAG response latency' },
      { metric: '3x', label: 'Analyst throughput increase' },
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
      { metric: '100k+', label: 'Events/hour with zero loss' },
      { metric: '<200ms', label: 'Incident ingestion latency' },
      { metric: '0', label: 'Data loss in production' },
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
      { metric: '40%', label: 'Faster developer onboarding' },
      { metric: 'Modular', label: 'Independent service scaling' },
      { metric: '12+', label: 'Services built on boilerplate' },
    ],
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
