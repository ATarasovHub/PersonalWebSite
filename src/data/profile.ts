export const personal = {
  name: 'Andrii Tarasov',
  role: 'Backend Software Developer',
  tagline: 'Building reliable backend systems and putting AI to work where it actually saves time.',
  location: 'Dortmund, Germany',
  phone: '+49 162 700 6705',
  phoneHref: 'tel:+491627006705',
  email: 'tarasovandri10@gmail.com',
  linkedin: 'https://linkedin.com/in/tarasovandri',
  linkedinLabel: 'linkedin.com/in/tarasovandri',
}

export const bio = [
  "I'm a backend developer who likes systems that stay boring in production — predictable, observable, easy to reason about a year from now. Most of my recent work has been Java and Spring Boot microservices for telecom messaging: inventory systems, routing logic, and the unglamorous plumbing that keeps millions of messages moving correctly.",
  "The other half of my work is on-prem AI — wiring local LLMs into real workflows instead of chasing demos. I built a ticket-triage service that reads and classifies support tickets automatically, saving the team real hours every week without sending a single byte of data off-premises.",
  "Right now I'm freelancing, building a native Android app for warehouse logistics from the ground up — requirements, architecture, and the Play Store release, end to end.",
]

export const stats = [
  { value: '2+', label: 'years professional experience' },
  { value: '56', label: 'providers on one inventory system' },
  { value: '18.6k', label: 'customers served by it' },
  { value: '€22k', label: 'saved per year by an AI service I built' },
]

export type SkillGroup = {
  title: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Java 17/21', 'Kotlin', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: 'Backend',
    items: ['Spring Boot 3', 'Spring Data JPA', 'FastAPI', 'Hibernate', 'Flyway', 'MapStruct', 'REST', 'OpenAPI'],
  },
  {
    title: 'AI / LLM',
    items: ['Ollama', 'On-prem LLM integration', 'Prompt engineering', 'MLflow', 'Label Studio'],
  },
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Material UI', 'Radix UI', 'Tailwind CSS', 'React Query'],
  },
  {
    title: 'Data',
    items: ['PostgreSQL', 'SQLite', 'Caffeine Cache', 'Drizzle ORM'],
  },
  {
    title: 'DevOps & Tools',
    items: ['Docker', 'Kubernetes', 'Jenkins CI', 'Gradle', 'Maven', 'Git', 'Testcontainers', 'Jira'],
  },
  {
    title: 'Also',
    items: ['Blender (3D modeling & animation)', 'AutoCAD'],
  },
]

export const languages = [
  { name: 'German', level: 'C1' },
  { name: 'English', level: 'B2' },
  { name: 'Russian', level: 'Native' },
  { name: 'Ukrainian', level: 'Native' },
]

export type ExperienceEntry = {
  role: string
  org: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Freelance Software Developer',
    org: 'Self-employed',
    period: 'Jun 2026 — present',
    location: 'Dortmund (remote)',
    summary:
      'Building a native Android app for a logistics client from scratch, owning everything from requirements to the Play Store release.',
    highlights: [
      'Kotlin app with an MVVM architecture, ViewModels and Coroutines throughout',
      'Local-first data layer on Room/SQLite with versioned migrations',
      'Material UI screens, Excel export, and local backup for offline-friendly warehouse use',
      'Full ownership: requirements gathering, architecture, implementation, testing, and release',
    ],
  },
  {
    role: 'Software Developer',
    org: 'tyntec',
    period: 'Aug 2024 — Jun 2026',
    location: 'Germany',
    summary:
      'Java/Spring Boot backend work for a global messaging platform, plus building and shipping the team’s first on-prem AI tools.',
    highlights: [
      'Built an on-prem AI service (Python, FastAPI, Ollama) that reads, summarizes and classifies Jira tickets — saving roughly 7 minutes per ticket, about 552 hours and €22,080 a year, paid back in ~6 weeks, with all data staying on-prem and strict Pydantic schema validation with retries',
      'Shipped a Rocket.Chat support bot that drafts replies with an LLM, detects self-assignment, and routes tickets from a Jira webhook through the AI service via a simple `take TICKET-KEY` command',
      'Ran an LLM model-selection experiment for ticket summarization, tracked in MLflow and blind-evaluated in Label Studio',
      'Designed and built a phone-number inventory REST API (Java 21, Spring Boot 3, PostgreSQL, JPA, Flyway, Caffeine, OpenAPI) managing MSISDN allocation for 56 providers and roughly 18,600 customers, covered by Testcontainers integration tests and Jenkins CI',
      'Migrated a legacy Java EE/EJB numbering tool to Spring Boot 3 with a React 19 + TypeScript frontend',
      'Contributed to a new outbound messaging platform unifying SMS, WhatsApp, RCS, Viber and TTS over SMPP and REST, including message classification and least-cost channel routing',
    ],
  },
  {
    role: 'University Project',
    org: 'Kharkiv National University of Radio Electronics',
    period: '2024 — 2025',
    location: 'Kharkiv, Ukraine',
    summary:
      'Designed an automated electropneumatic control system for a production line as part of my degree.',
    highlights: [
      'Analyzed the automation system and designed the structural control solution',
      'Modeled and animated the pneumatic components in Blender to validate the design',
    ],
  },
]

export type EducationEntry = {
  title: string
  org: string
  period: string
  description: string
}

export const education: EducationEntry[] = [
  {
    title: 'Fachinformatiker für Anwendungsentwicklung',
    org: 'Robert-Bosch-Berufskolleg der Stadt Dortmund',
    period: '2024 — 2026',
    description:
      'Dual vocational training in application development — Java, Spring, Docker, Kubernetes, Jenkins and CI/CD, alongside on-the-job work at tyntec.',
  },
  {
    title: 'B.Sc. Automation & Computer-Integrated Technologies',
    org: 'Kharkiv National University of Radio Electronics',
    period: '2021 — 2025',
    description:
      'Foundations in Python, algorithms, databases, object-oriented programming and software engineering.',
  },
]
