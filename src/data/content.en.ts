import type { Content } from './types'

export const en: Content = {
  role: 'Backend Software Developer',
  tagline: 'Building reliable backend systems and putting AI to work where it actually saves time.',
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
    scrollLabel: 'Scroll to About',
  },

  bio: [
    "I'm a backend developer who likes systems that stay boring in production — predictable, observable, easy to reason about a year from now. Most of my recent work has been Java and Spring Boot microservices for telecom messaging: inventory systems, routing logic, and the unglamorous plumbing that keeps millions of messages moving correctly.",
    'The other half of my work is on-prem AI — wiring local LLMs into real workflows instead of chasing demos. I built a ticket-triage service that reads and classifies support tickets automatically, saving the team real hours every week without sending a single byte of data off-premises.',
    "Right now I'm freelancing, building a native Android app for warehouse logistics from the ground up — requirements, architecture, and the Play Store release, end to end.",
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
  },

  projects: [
    {
      title: 'On-Prem AI Ticket Triage',
      context: 'tyntec · 2025',
      problem:
        'Support engineers were reading every incoming Jira ticket end to end just to work out what it was about and who should own it. The obvious fix was an LLM, but customer data could not leave the company network, which ruled out every hosted API.',
      approach:
        'I built a service that runs the model entirely on our own hardware: FastAPI pulls the ticket, hands it to a local Ollama model for a summary and a classification, and validates the response against a strict Pydantic schema — retrying when the model returns something malformed. A Rocket.Chat bot puts the result where the team already works and drafts a reply, with a `take TICKET-KEY` command to claim the ticket. To pick the model I ran a comparison tracked in MLflow and blind-scored the outputs in Label Studio, rather than going with a hunch.',
      metrics: [
        { value: '€22,080', label: 'saved per year' },
        { value: '~6 weeks', label: 'to pay for itself' },
        { value: '7 min', label: 'saved per ticket' },
      ],
      stack: ['Python', 'FastAPI', 'Ollama', 'Pydantic', 'MLflow', 'Label Studio', 'Rocket.Chat'],
    },
    {
      title: 'MSISDN Inventory Platform',
      context: 'tyntec · 2024—2026',
      problem:
        'Phone number allocation was spread across a legacy Java EE tool and manual process. With 56 upstream providers feeding numbers to thousands of customers, there was no single source of truth for what was allocated, free, or reserved.',
      approach:
        'I designed and built a REST API that owns the whole inventory: allocation, reservation and release, with Flyway-managed schema evolution and a Caffeine cache in front of the hot lookups. Every endpoint is documented through OpenAPI, and the integration suite runs against a real PostgreSQL in Testcontainers on Jenkins — so the tests exercise actual SQL rather than a mock. I also migrated the old Java EE/EJB tool onto this platform with a React frontend.',
      metrics: [
        { value: '56', label: 'upstream providers' },
        { value: '18,600', label: 'customers served' },
      ],
      stack: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'JPA', 'Flyway', 'Caffeine', 'OpenAPI', 'Testcontainers', 'Jenkins'],
    },
    {
      title: 'Unified Outbound Messaging',
      context: 'tyntec · 2025—2026',
      problem:
        'Reaching a customer meant choosing a channel by hand, and every channel spoke a different protocol. Cost per message varied widely between routes, with nothing systematically picking the cheapest viable one.',
      approach:
        'I contributed to a platform that puts SMS, WhatsApp, RCS, Viber and text-to-speech behind one interface, speaking SMPP and REST underneath. Messages are classified on the way in, and a routing layer picks the least-cost channel that can actually deliver to that recipient.',
      metrics: [{ value: '5', label: 'channels behind one API' }],
      stack: ['Java', 'Spring Boot', 'SMPP', 'REST', 'Least-cost routing'],
    },
    {
      title: 'Warehouse Logistics App',
      context: 'Freelance · 2026—present',
      problem:
        'A logistics client needed their warehouse staff to record stock movements on the floor, where the network is unreliable and a web app simply stops working.',
      approach:
        'A native Android app built local-first: Room/SQLite holds everything on the device with versioned migrations, so an update never costs the user their data. MVVM with Coroutines keeps the UI responsive, and the data leaves the device on demand through Excel export and local backup. I own the whole thing — requirements, architecture, implementation, testing and the Play Store release.',
      metrics: [
        { value: 'End to end', label: 'sole developer' },
        { value: 'Offline', label: 'first by design' },
      ],
      stack: ['Kotlin', 'MVVM', 'Coroutines', 'Room', 'SQLite', 'Material UI', 'Play Store'],
    },
  ],

  experience: [
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
      "Open to new backend roles and freelance work. The fastest way to reach me is directly — pick whatever's easiest for you.",
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'What would you like to talk about?',
    submit: 'Send message',
    mailSubject: (name: string) => `Portfolio contact from ${name || 'a visitor'}`,
    mailReplyTo: 'Reply to',
  },

  footer: 'Built with React & Framer Motion',
  langToggleLabel: 'Switch to German',

  meta: {
    title: 'Andrii Tarasov — Backend Software Developer',
    description:
      'Backend software developer specializing in Java, Spring Boot and on-prem AI/LLM integration. Based in Dortmund, Germany.',
  },
}
