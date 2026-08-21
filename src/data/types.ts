export type Lang = 'en' | 'de'

export type SkillGroup = {
  title: string
  items: string[]
}

export type Project = {
  title: string
  context: string
  problem: string
  approach: string
  metrics: { value: string; label: string }[]
  stack: string[]
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
}

/** Everything on the page that changes with the selected language. */
export type Content = {
  role: string
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
    scrollLabel: string
  }

  bio: string[]
  stats: { value: string; label: string }[]
  skillGroups: SkillGroup[]
  spokenLanguages: { name: string; level: string }[]

  projectLabels: {
    problem: string
    approach: string
  }
  projects: Project[]

  experience: ExperienceEntry[]
  education: EducationEntry[]

  contact: {
    heading: string
    intro: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    mailSubject: (name: string) => string
    mailReplyTo: string
  }

  footer: string
  langToggleLabel: string

  /** Browser tab title and meta description. */
  meta: {
    title: string
    description: string
  }
}
