import type { Content } from './types'
import { personal } from './profile'

export const en: Content = {
  role: 'System Integration Engineer',
  roleLine: 'System Integration · Microsoft Infrastructure · Java / Spring Boot',
  tagline: 'I connect systems, identities and infrastructure so they run reliably together.',
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
    "I'm a system integration engineer who likes systems that stay boring in production: predictable, observable, easy to reason about a year from now. My work is making separate pieces work as one: identities and access in Active Directory and Microsoft Entra, Azure resources, containerized services, and the APIs, webhooks and message flows that connect them.",
    'I know the software side from the inside. At tyntec I built Java and Spring Boot services for telecom messaging, connected 56 upstream providers to one inventory system, and wired Jira, a local language model and Rocket.Chat into one support workflow. That background means I can read the code, the logs and the network, not just the admin console.',
    'The other half of my work is on-prem AI: wiring local language models into real workflows instead of chasing demos, so the savings are real and the data never leaves the building.',
    "Right now I'm freelancing, building a native Android app for warehouse logistics end to end, from requirements through architecture to the Play Store release.",
    'My infrastructure skills are backed by Microsoft Applied Skills credentials for Entra identity, Active Directory Domain Services and Azure administration, plus AWS Cloud Practitioner Essentials.',
    "Dortmund is home at the moment, but I'm very mobile: relocating for the right team is no obstacle, inside Germany or abroad.",
  ],

  offTheClock: {
    label: 'Off the clock',
    text: "I play volleyball: six people who each have to trust the other five. The rest of my free time goes to books, whatever series I'm behind on, and long walks around the city.",
  },

  stats: [
    { value: '2+', label: 'years professional experience' },
    { value: '56', label: 'providers on one inventory system' },
    { value: '18.6k', label: 'customers served by it' },
    { value: '€22k', label: 'saved per year by an AI service I built' },
  ],

  skillGroups: [
    {
      title: 'System Integration',
      items: ['REST & OpenAPI', 'Webhooks', 'SMPP', 'Third-party API integration', 'Jira & Rocket.Chat integration', 'Data migration', 'Legacy system migration'],
    },
    {
      title: 'Infrastructure & Identity',
      items: ['Active Directory (AD DS)', 'Group Policy', 'Microsoft Entra ID', 'Microsoft Azure', 'Virtual machines', 'Networking & storage', 'AWS fundamentals', 'IT security basics'],
    },
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

  credentialsHeading: 'Credentials',
  credentials: [
    {
      title: 'AWS Cloud Practitioner Essentials',
      issuer: 'Amazon Web Services',
      type: 'Course completion',
      summary: 'AWS core services, architecture, security, pricing and support models across the cloud platform.',
      skills: ['AWS', 'Cloud fundamentals', 'Cloud security & billing'],
      href: personal.linkedin,
      action: 'See it on LinkedIn',
      linkIcon: 'linkedin',
    },
    {
      title: 'Develop an agent with integrated tools',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'Building and configuring AI agents with the Microsoft Foundry SDK, built-in toolsets and custom tools.',
      skills: ['AI agents', 'Microsoft Foundry', 'Tool integration'],
      href: 'https://learn.microsoft.com/api/credentials/share/en-us/AndriiTarasov-8792/791317A59CA09393?sharingId=3CBCE2933DC353C5',
      action: 'View credential',
    },
    {
      title: 'Azure management tasks',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'Compute, network and storage tasks across an Azure subscription.',
      skills: ['Azure', 'Virtual machines', 'Networking & storage'],
      href: 'https://learn.microsoft.com/api/credentials/share/en-us/AndriiTarasov-8792/C9D0E1A402FEAC7?sharingId=3CBCE2933DC353C5',
      action: 'View credential',
    },
    {
      title: 'Identities and access with Microsoft Entra',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'Identity and access fundamentals with Microsoft Entra.',
      skills: ['Microsoft Entra', 'Identity & access'],
      href: 'https://learn.microsoft.com/api/credentials/share/en-us/AndriiTarasov-8792/25E2D1948CDA2AD8?sharingId=3CBCE2933DC353C5',
      action: 'View credential',
    },
    {
      title: 'Administer Active Directory Domain Services',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'Domain controllers, AD DS objects, Group Policy and security administration.',
      skills: ['Active Directory', 'Group Policy'],
      href: 'https://learn.microsoft.com/api/credentials/share/en-us/AndriiTarasov-8792/ECD676719B997C0E?sharingId=3CBCE2933DC353C5',
      action: 'View credential',
    },
    {
      title: 'Digitality in vocational education',
      issuer: 'Robert-Bosch-Berufskolleg Dortmund',
      type: 'Additional qualification',
      summary: 'Digital work environments, communication, networks, data protection and information security.',
      skills: ['Digital workflows', 'Networks', 'Information security'],
      href: personal.linkedin,
      action: 'See it on LinkedIn',
      linkIcon: 'linkedin',
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
    github: 'View on GitHub',
    privateRepo: 'Closed-source company project',
    close: 'Close',
    prev: 'Previous project',
    next: 'Next project',
    slider: 'Scroll through the projects',
  },

  projects: [
    {
      title: 'Threadly · Internal Company Messenger',
      context: 'Company messenger · 2026',
      summary:
        'I developed a self-hosted internal messenger for a company, bringing profiles, conversations and team activity into one secure social workspace.',
      problem:
        'The company needed a private place where colleagues could communicate and follow team activity without spreading conversations across external platforms. It had to support real social interaction while keeping deployment, identities and data under the company’s control.',
      approach:
        'I built the complete product with a React and TypeScript client, a Spring Boot REST API and PostgreSQL. The platform covers profiles, posts, replies, reposts, follows, likes, bookmarks, blocks and notifications. Short-lived JWT access tokens are paired with hashed, rotating refresh tokens; replaying an old token revokes the whole session family. Feeds use cursor pagination so new activity cannot create duplicates or gaps, and the client and API ship as one Docker image on one origin for a simple self-hosted deployment. Integration tests run against a real PostgreSQL database with Testcontainers in GitHub Actions.',
      metrics: [
        { value: 'One origin', label: 'client and API deployment' },
        { value: 'Rotating', label: 'secure refresh sessions' },
        { value: 'Cursor-based', label: 'feeds without gaps' },
      ],
      stack: ['Java 21', 'Spring Boot 4.1', 'React 19', 'TypeScript', 'PostgreSQL 17', 'Flyway', 'TanStack Query', 'Docker', 'Testcontainers', 'GitHub Actions'],
      repoUrl: 'https://github.com/ATarasovHub/threadly',
      diagram: 'threadly',
    },
    {
      title: 'On-Prem AI Ticket Triage',
      context: 'tyntec · 2025',
      summary:
        'A local language model reads, summarizes and routes support tickets, saving €22,080 a year without a byte of customer data leaving the network.',
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
      context: 'tyntec · 2024-2026',
      summary:
        'One REST API became the single source of truth for phone-number allocation across 56 providers and 18,600 customers.',
      problem:
        'Number allocation was split between a legacy Java EE tool and manual process. With 56 upstream providers feeding numbers to thousands of customers, nothing authoritative said what was allocated, free, or reserved.',
      approach:
        'I designed and built a REST API owning the whole inventory (allocation, reservation and release) with Flyway-managed schema evolution and a Caffeine cache in front of the hot lookups. Every endpoint is documented through OpenAPI, and the integration suite runs against a real PostgreSQL in Testcontainers on Jenkins, so the tests exercise actual SQL rather than a mock. I also migrated the old Java EE/EJB tool onto this platform with a React frontend.',
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
        'One API contract for six messaging channels, routed by price with automatic fallback, built to answer in milliseconds while delivery happens in the background.',
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
      repoUrl: 'https://github.com/ATarasovHub/messaginggateway',
      diagram: 'gateway',
    },
    {
      title: 'Warehouse Logistics App',
      context: 'Freelance · 2026-present',
      summary:
        'An offline-first Android app for warehouse staff, owned end to end from requirements to the Play Store release.',
      problem:
        'A logistics client needed warehouse staff to record stock movements on the floor, where the network is unreliable and a web app simply stops working.',
      approach:
        'Room/SQLite holds everything on the device with versioned migrations, so an update never costs the user their data. MVVM with Coroutines keeps the UI responsive, and the data leaves the device on demand through Excel export and local backup. I own the whole thing: requirements, architecture, implementation, testing and release.',
      metrics: [
        { value: 'End to end', label: 'sole developer' },
        { value: 'Offline', label: 'first by design' },
      ],
      stack: ['Kotlin', 'MVVM', 'Coroutines', 'Room', 'SQLite', 'Material UI', 'Play Store'],
      repoUrl: 'https://github.com/ATarasovHub/StockKeeper',
      diagram: 'stock',
    },
  ],

  diagrams: {
    triage: {
      caption:
        'Everything inside the dashed boundary runs on company hardware, so no customer data leaves the network.',
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
        'Every write is validated before it reaches the database, and reads flow back as observable streams so the screen updates itself. Nothing needs the network, and data only leaves the device when the user exports it.',
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
        'The caller gets an answer as soon as the message is stored. Delivery starts only after that transaction commits, so a slow provider never blocks the request. A provider callback then moves the message to its final state.',
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
    threadly: {
      caption:
        'The React client, API and database run as one self-hosted system. Authentication is isolated from the social features, while both persist through one controlled PostgreSQL data layer.',
      boundary: 'Company infrastructure',
      client: 'React client',
      clientSub: ['feed · profiles', 'posts · notifications'],
      api: 'Spring Boot API',
      apiSub: ['REST · validation', 'security · rate limiting'],
      auth: 'Session security',
      authSub: ['short-lived JWT', 'rotating refresh cookie'],
      domain: 'Messenger services',
      domainSub: ['posts · replies · follows', 'likes · bookmarks · blocks'],
      database: 'PostgreSQL 17',
      databaseSub: ['Flyway migrations', 'cursor-paged feeds'],
      deployment: 'One Docker image · one origin',
    },
  },

  experience: {
    expand: 'Show details',
    collapse: 'Hide details',
  },

  experienceEntries: [
    {
      role: 'Freelance Fachinformatiker (IT Specialist)',
      org: 'Self-employed',
      period: 'Jun 2026 - present',
      location: 'Dortmund (remote)',
      summary:
        'Delivering an IT solution for a logistics client’s warehouse on my own: from gathering requirements through architecture and data storage to release.',
      highlights: [
        'Gathered requirements with the client and turned them into a solution that works on the warehouse floor without a reliable network',
        'Offline-capable on-device data storage (Room/SQLite) with versioned migrations, so an update never costs users their data',
        'Data exchange with the client’s systems through Excel export, plus local backup and restore onto new devices',
        'Testing and rollout through the Play Store, all under my ownership (Kotlin, MVVM, Coroutines)',
      ],
    },
    {
      role: 'Fachinformatiker (IT Specialist)',
      org: 'tyntec',
      period: 'Aug 2024 - Jun 2026',
      location: 'Germany',
      summary:
        'Integrating systems, interfaces and providers for a global messaging platform, and setting up and running the company’s first on-prem AI services inside the company network.',
      highlights: [
        'Connected Jira, a locally hosted language model (Ollama) and Rocket.Chat into one support workflow via webhooks and a FastAPI service, saving about 7 minutes per ticket, roughly 552 hours and €22,080 a year, paid back in ~6 weeks',
        'Ran the AI services fully on-premises, so no customer data leaves the company network',
        'Connected 56 upstream providers through one central REST API (documented with OpenAPI) to a phone-number inventory serving roughly 18,600 customers',
        'Migrated a legacy Java EE/EJB system to Spring Boot 3 with a new web interface (React, TypeScript)',
        'Contributed to integrating SMS, WhatsApp, RCS, Viber and TTS over SMPP and REST, with least-cost channel routing',
        'Deployed with Docker and Jenkins CI, backed by integration tests against real PostgreSQL databases (Testcontainers)',
      ],
    },
    {
      role: 'University Project',
      org: 'Kharkiv National University of Radio Electronics',
      period: '2024 - 2025',
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
      period: '2024 - 2026',
      description:
        'Dual vocational training in application development: Java, Spring, Docker, Kubernetes, Jenkins and CI/CD, alongside on-the-job work at tyntec.',
      photo: 'rbbk',
      photoAlt:
        'Courtyard of the Robert-Bosch-Berufskolleg vocational college in Dortmund, where Andrii Tarasov trained as an application developer',
    },
    {
      title: 'B.Sc. Automation & Computer-Integrated Technologies',
      org: 'Kharkiv National University of Radio Electronics',
      period: '2021 - 2025',
      description:
        'Foundations in Python, algorithms, databases, object-oriented programming and software engineering.',
      photo: 'khnure',
      photoAlt:
        'Main building of Kharkiv National University of Radio Electronics, where Andrii Tarasov earned his B.Sc.',
    },
  ],

  contact: {
    heading: "Let's talk",
    intro:
      'Open to positions in system integration, IT support and development, and to freelance work. Write to me directly or reach out on LinkedIn; both land with me straight away.',
    emailCta: 'Write me an email',
    linkedinCta: 'Connect on LinkedIn',
    copy: 'Copy address',
    copied: 'Copied',
    responseNote: 'I usually reply within a day.',
  },

  footer: 'Built with React & GSAP',
  langToggleLabel: 'Switch to German',
  themeToggle: {
    toDark: 'Switch to the dark theme',
    toLight: 'Switch to the light theme',
  },

  meta: {
    title: 'Andrii Tarasov | System Integration Engineer',
    description:
      'System integration engineer in Dortmund: Active Directory, Microsoft Entra, Azure, Docker and API integration, backed by hands-on Java and Spring Boot development. Open to system integration and support roles.',
  },
}
