export type Lang = 'en' | 'de'

export type DiagramKey = 'triage' | 'stock' | 'gateway'

export type SkillGroup = {
  title: string
  items: string[]
}

export type Project = {
  title: string
  context: string
  /** One scannable line — the whole case study in a breath. */
  summary: string
  problem: string
  approach: string
  metrics: { value: string; label: string }[]
  stack: string[]
  /** Which architecture diagram to render inside this card. */
  diagram?: DiagramKey
}

export type ExperienceEntry = {
  role: string
  org: string
  period: string
  location: string
  summary: string
  highlights: string[]
}

export type EducationEntry = {
  title: string
  org: string
  period: string
  description: string
  /** Key into the photo table in Education.tsx. */
  photo?: 'khnure' | 'rbbk'
  /** Describes the photo for search engines and screen readers. */
  photoAlt?: string
}

/** Everything on the page that changes with the selected language. */
export type Content = {
  role: string
  roleLine: string
  tagline: string
  location: string
  status: string

  nav: {
    about: string
    skills: string
    projects: string
    experience: string
    education: string
    contact: string
  }

  sections: {
    about: string
    skills: string
    projects: string
    experience: string
    education: string
    contact: string
  }

  hero: {
    primaryCta: string
    secondaryCta: string
    cvCta: string
    scrollLabel: string
  }

  bio: string[]
  /** Personal aside closing the About section. */
  offTheClock: { label: string; text: string }
  stats: { value: string; label: string }[]
  skillGroups: SkillGroup[]
  spokenLanguages: { name: string; level: string }[]

  projectLabels: {
    problem: string
    approach: string
    more: string
    less: string
    stack: string
    diagramTitle: string
    close: string
    prev: string
    next: string
    dragHint: string
  }
  projects: Project[]

  diagrams: {
    triage: {
      caption: string
      boundary: string
      jira: string
      jiraSub: string
      api: string
      apiSub: string
      llm: string
      llmSub: string[]
      chat: string
      chatSub: string[]
      validate: string
      retry: string
    }
    stock: {
      caption: string
      boundary: string
      ui: string
      uiSub: string
      repo: string
      repoSub: string
      room: string
      roomSub: string
      writes: string
      reads: string
      excel: string
      excelSub: string
      backup: string
      backupSub: string
    }
    gateway: {
      caption: string
      request: string
      requestSub: string
      rateLimit: string
      rateLimitSub: string
      store: string
      storeSub: string
      accepted: string
      event: string
      eventSub: string
      router: string
      routerSub: string[]
      providers: string
      providersSub: string[]
      webhook: string
      states: string
      statesSub: string
    }
  }

  experience: EducationExperienceLabels
  experienceEntries: ExperienceEntry[]
  education: EducationEntry[]

  contact: {
    heading: string
    intro: string
    emailCta: string
    linkedinCta: string
    copy: string
    copied: string
    responseNote: string
  }

  footer: string
  langToggleLabel: string

  /** Browser tab title and meta description. */
  meta: {
    title: string
    description: string
  }
}

type EducationExperienceLabels = {
  expand: string
  collapse: string
}
