import type { Content } from './types'

export const en: Content = {
  role: 'Backend Software Developer',
  roleLine: 'Backend Developer · Java / Spring Boot · On-Prem AI',
  tagline: 'I build production systems that save measurable time and money.',
  location: 'Dortmund, Germany',
  status: 'Open to work',

  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Work',
    experience: 'Experience',
    education: 'Education',
    contact: 'Contact',
  },

  sections: {
    about: 'About',
    skills: 'Skills',
    projects: 'Selected Work',
    experience: 'Experience',
    education: 'Education',
    contact: 'Contact',
  },

  hero: {
    primaryCta: 'Get in touch',
    secondaryCta: 'See my work',
    cvCta: 'Download CV',
    scrollLabel: 'Scroll to About',
  },

  bio: [
    "I'm a backend developer who likes systems that stay boring in production — predictable, observable, easy to reason about a year from now. Most of my recent work has been Java and Spring Boot microservices for telecom messaging: inventory systems, routing logic, and the plumbing that keeps millions of messages moving correctly.",
    'The other half of my work is on-prem AI — wiring local language models into real workflows instead of chasing demos, so the savings are real and the data never leaves the building.',
    "Right now I'm freelancing, building a native Android app for warehouse logistics end to end — requirements, architecture, and the Play Store release.",
  ],

  stats: [
    { value: '2+', label: 'years professional experience' },
    { value: '56', label: 'providers on one inventory system' },
    { value: '18.6k', label: 'customers served by it' },
    { value: '€22k', label: 'saved per year by an AI service I built' },
  ],

  skillGroups: [
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
  ],

  spokenLanguages: [
    { name: 'German', level: 'C1' },
    { name: 'English', level: 'B2' },
    { name: 'Russian', level: 'Native' },
    { name: 'Ukrainian', level: 'Native' },
  ],

  projectLabels: {
    problem: 'The problem',
    approach: 'What I built',
    more: 'Read the details',
    less: 'Show less',
    stack: 'Stack',
    diagramTitle: 'How it fits together',
  },

  projects: [
    {
      title: 'On-Prem AI Ticket Triage',
      context: 'tyntec · 2025',
      summary:
        'A local language model reads, summarizes and routes support tickets — saving €22,080 a year without a byte of customer data leaving the network.',
      problem:
        'Support engineers were reading every incoming Jira ticket end to end just to work out what it was about and who should own it. An LLM was the obvious fix, but customer data could not leave the company network, which ruled out every hosted API.',
      approach:
        'FastAPI pulls the ticket and hands it to a local Ollama model for a summary and a classification, validating the response against a strict Pydantic schema and retrying when the model returns something malformed. A Rocket.Chat bot delivers the result where the team already works and drafts a reply, with a `take TICKET-KEY` command to claim the ticket. I chose the model by running a comparison tracked in MLflow and blind-scoring the outputs in Label Studio, rather than going with a hunch.',
      metrics: [
        { value: '€22,080', label: 'saved per year' },
        { value: '~6 weeks', label: 'to pay for itself' },
        { value: '7 min', label: 'saved per ticket' },
      ],
      stack: ['Python', 'FastAPI', 'Ollama', 'Pydantic', 'MLflow', 'Label Studio', 'Rocket.Chat'],
      diagram: 'triage',
    },
    {
      title: 'MSISDN Inventory Platform',
      context: 'tyntec · 2024—2026',
      summary:
        'One REST API became the single source of truth for phone-number allocation across 56 providers and 18,600 customers.',
      problem:
        'Number allocation was split between a legacy Java EE tool and manual process. With 56 upstream providers feeding numbers to thousands of customers, nothing authoritative said what was allocated, free, or reserved.',
      approach:
        'I designed and built a REST API owning the whole inventory — allocation, reservation and release — with Flyway-managed schema evolution and a Caffeine cache in front of the hot lookups. Every endpoint is documented through OpenAPI, and the integration suite runs against a real PostgreSQL in Testcontainers on Jenkins, so the tests exercise actual SQL rather than a mock. I also migrated the old Java EE/EJB tool onto this platform with a React frontend.',
      metrics: [
        { value: '56', label: 'upstream providers' },
        { value: '18,600', label: 'customers served' },
      ],
      stack: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'JPA', 'Flyway', 'Caffeine', 'OpenAPI', 'Testcontainers', 'Jenkins'],
    },
    {
      title: 'Unified Messaging Gateway',
      context: 'Personal project · 2026',
      summary:
        'One API contract for six messaging channels, routed by price with automatic fallback — built to answer in milliseconds while delivery happens in the background.',
      problem:
        'Reaching a customer through SMS, WhatsApp or any other channel means a different protocol, a different failure mode and a different price for each one. Calling providers inline also makes the API only as fast as the slowest one, and a burst of traffic can hammer a single recipient.',
      approach:
        'The request is rate-limited per recipient, persisted as QUEUED and answered with 202 immediately. Delivery is triggered by an event published only after that transaction commits, so a slow provider can never block or roll back the caller. The router sorts enabled channels by price and walks them until one accepts, with an explicit WhatsApp → SMS → Email fallback chain and a cap on attempts. Provider callbacks arrive through a secret-protected webhook and move the message to its final state. Providers sit behind one interface, so a real SDK can replace a mock without touching the routing.',
      metrics: [
        { value: '6', label: 'channels, one contract' },
        { value: '202', label: 'returned before dispatch' },
        { value: 'Price-sorted', label: 'routing with fallback' },
      ],
      stack: ['Java 25', 'Spring Boot 4', 'PostgreSQL', 'Flyway', 'Redis', 'Docker', 'OpenAPI', 'Virtual threads'],
      diagram: 'gateway',
    },
    {
      title: 'Warehouse Logistics App',
      context: 'Freelance · 2026—present',
      summary:
        'An offline-first Android app for warehouse staff, owned end to end from requirements to the Play Store release.',
      problem:
        'A logistics client needed warehouse staff to record stock movements on the floor, where the network is unreliable and a web app simply stops working.',
      approach:
        'Room/SQLite holds everything on the device with versioned migrations, so an update never costs the user their data. MVVM with Coroutines keeps the UI responsive, and the data leaves the device on demand through Excel export and local backup. I own the whole thing — requirements, architecture, implementation, testing and release.',
      metrics: [
        { value: 'End to end', label: 'sole developer' },
        { value: 'Offline', label: 'first by design' },
      ],
      stack: ['Kotlin', 'MVVM', 'Coroutines', 'Room', 'SQLite', 'Material UI', 'Play Store'],
      diagram: 'stock',
    },
  ],

  diagrams: {
    triage: {
      caption:
        'Everything inside the dashed boundary runs on company hardware — no customer data leaves the network.',
      boundary: 'On-premises',
      jira: 'Jira',
      jiraSub: 'webhook on new ticket',
      api: 'FastAPI service',
      apiSub: 'fetch · orchestrate',
      llm: 'Ollama',
      llmSub: ['local LLM', 'summary + classification'],
      chat: 'Rocket.Chat',
      chatSub: ['drafted reply', 'take TICKET-KEY'],
      validate: 'Pydantic schema check',
      retry: 'retry on invalid output',
    },
    stock: {
      caption:
        'Every write is validated before it reaches the database, and reads flow back as observable streams so the screen updates itself. Nothing needs the network — data only leaves the device when the user exports it.',
      boundary: 'On the device',
      ui: 'Fragments + ViewModels',
      uiSub: 'warehouse · product · history · archive',
      repo: 'StockRepository',
      repoSub: 'receipt · sale · write-off · adjustment, guarded by StockMovementValidator',
      room: 'Room DAOs → SQLite',
      roomSub: '5 entities · versioned schema · transactional writes',
      writes: 'writes',
      reads: 'Flow',
      excel: 'Excel export',
      excelSub: 'on demand',
      backup: 'Local backup',
      backupSub: 'restore on a new device',
    },
    gateway: {
      caption:
        'The caller gets an answer as soon as the message is stored. Delivery starts only after that transaction commits, so a slow provider never blocks the request — and a provider callback moves the message to its final state.',
      request: 'POST /messages',
      requestSub: 'one contract, any channel',
      rateLimit: 'Rate limit',
      rateLimitSub: 'per recipient, rolling minute',
      store: 'PostgreSQL',
      storeSub: 'saved as QUEUED',
      accepted: '202 Accepted returned · dispatch starts after commit',
      event: 'Async dispatch',
      eventSub: 'event after commit',
      router: 'ChannelRouter',
      routerSub: ['cheapest enabled first', 'WhatsApp → SMS → Email'],
      providers: 'Provider adapters',
      providersSub: ['SMS · WhatsApp · Telegram', 'Email · RCS · Viber'],
      webhook: 'provider callback → POST /webhooks/messages/{id}/status',
      states: 'QUEUED → SENT',
      statesSub: '→ DELIVERED · FAILED → retry',
    },
  },

  experience: {
    expand: 'Show details',
    collapse: 'Hide details',
  },

  experienceEntries: [
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
        'Built an on-prem AI service (Python, FastAPI, Ollama) that reads, summarizes and classifies Jira tickets — saving roughly 7 minutes per ticket, about 552 hours and €22,080 a year, paid back in ~6 weeks',
        'Shipped a Rocket.Chat support bot that drafts replies with an LLM and routes tickets from a Jira webhook through the AI service',
        'Ran an LLM model-selection experiment tracked in MLflow and blind-evaluated in Label Studio',
        'Designed and built a phone-number inventory REST API (Java 21, Spring Boot 3, PostgreSQL, Flyway, Caffeine, OpenAPI) for 56 providers and roughly 18,600 customers, covered by Testcontainers and Jenkins CI',
        'Migrated a legacy Java EE/EJB numbering tool to Spring Boot 3 with a React 19 + TypeScript frontend',
        'Contributed to an outbound messaging platform unifying SMS, WhatsApp, RCS, Viber and TTS over SMPP and REST, with least-cost channel routing',
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
  ],

  education: [
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
  ],

  contact: {
    heading: "Let's talk",
    intro:
      'Open to backend roles and freelance work. Write to me directly or reach out on LinkedIn — both land with me straight away.',
    emailCta: 'Write me an email',
    linkedinCta: 'Connect on LinkedIn',
    copy: 'Copy address',
    copied: 'Copied',
    responseNote: 'I usually reply within a day.',
  },

  footer: 'Built with React & Framer Motion',
  langToggleLabel: 'Switch to German',

  meta: {
    title: 'Andrii Tarasov — Backend Software Developer',
    description:
      'Backend developer in Dortmund specializing in Java, Spring Boot and on-prem AI. I build production systems that save measurable time and money.',
  },
}
