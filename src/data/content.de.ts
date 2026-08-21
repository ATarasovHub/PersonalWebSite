import type { Content } from './types'

export const de: Content = {
  role: 'Backend-Softwareentwickler',
  roleLine: 'Backend-Entwickler · Java / Spring Boot · On-Premises-KI',
  tagline: 'Ich baue Produktivsysteme, die messbar Zeit und Geld sparen.',
  location: 'Dortmund, Deutschland',
  status: 'Offen für Angebote',

  nav: {
    about: 'Über mich',
    skills: 'Kenntnisse',
    projects: 'Projekte',
    experience: 'Erfahrung',
    education: 'Ausbildung',
    contact: 'Kontakt',
  },

  sections: {
    about: 'Über mich',
    skills: 'Kenntnisse',
    projects: 'Ausgewählte Projekte',
    experience: 'Berufserfahrung',
    education: 'Ausbildung',
    contact: 'Kontakt',
  },

  hero: {
    primaryCta: 'Kontakt aufnehmen',
    secondaryCta: 'Projekte ansehen',
    cvCta: 'Lebenslauf herunterladen',
    scrollLabel: 'Zu Über mich scrollen',
  },

  bio: [
    'Ich bin Backend-Entwickler und mag Systeme, die im Produktivbetrieb langweilig bleiben – vorhersehbar, beobachtbar und auch in einem Jahr noch nachvollziehbar. Meine Arbeit der letzten Jahre bestand vor allem aus Java- und Spring-Boot-Microservices für Telekommunikations-Messaging: Bestandssysteme, Routing-Logik und die Infrastruktur, die dafür sorgt, dass Millionen Nachrichten korrekt ankommen.',
    'Die andere Hälfte meiner Arbeit ist On-Premises-KI – lokale Sprachmodelle in echte Arbeitsabläufe einbinden, statt Demos hinterherzulaufen. So ist die Ersparnis real und die Daten verlassen das Haus nicht.',
    'Derzeit arbeite ich freiberuflich und entwickle eine native Android-App für die Lagerlogistik durchgängig selbst – von der Anforderungsanalyse über die Architektur bis zum Release im Play Store.',
  ],

  stats: [
    { value: '2+', label: 'Jahre Berufserfahrung' },
    { value: '56', label: 'Provider in einem Bestandssystem' },
    { value: '18.600', label: 'Kunden darüber versorgt' },
    { value: '22 T€', label: 'jährlich durch einen KI-Dienst gespart' },
  ],

  skillGroups: [
    {
      title: 'Sprachen',
      items: ['Java 17/21', 'Kotlin', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
    },
    {
      title: 'Backend',
      items: ['Spring Boot 3', 'Spring Data JPA', 'FastAPI', 'Hibernate', 'Flyway', 'MapStruct', 'REST', 'OpenAPI'],
    },
    {
      title: 'KI / LLM',
      items: ['Ollama', 'On-Premises-LLM-Integration', 'Prompt Engineering', 'MLflow', 'Label Studio'],
    },
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'Material UI', 'Radix UI', 'Tailwind CSS', 'React Query'],
    },
    {
      title: 'Daten',
      items: ['PostgreSQL', 'SQLite', 'Caffeine Cache', 'Drizzle ORM'],
    },
    {
      title: 'DevOps & Werkzeuge',
      items: ['Docker', 'Kubernetes', 'Jenkins CI', 'Gradle', 'Maven', 'Git', 'Testcontainers', 'Jira'],
    },
    {
      title: 'Außerdem',
      items: ['Blender (3D-Modellierung & Animation)', 'AutoCAD'],
    },
  ],

  spokenLanguages: [
    { name: 'Deutsch', level: 'C1' },
    { name: 'Englisch', level: 'B2' },
    { name: 'Russisch', level: 'Muttersprache' },
    { name: 'Ukrainisch', level: 'Muttersprache' },
  ],

  projectLabels: {
    problem: 'Die Ausgangslage',
    approach: 'Was ich gebaut habe',
    more: 'Details lesen',
    less: 'Weniger anzeigen',
    stack: 'Technologien',
    diagramTitle: 'So greift es ineinander',
    close: 'Schließen',
    prev: 'Vorheriges Projekt',
    next: 'Nächstes Projekt',
    slider: 'Durch die Projekte blättern',
  },

  projects: [
    {
      title: 'On-Premises-KI zur Ticket-Triage',
      context: 'tyntec · 2025',
      summary:
        'Ein lokales Sprachmodell liest, fasst zusammen und verteilt Support-Tickets – 22.080 € Ersparnis im Jahr, ohne dass ein Byte Kundendaten das Netz verlässt.',
      problem:
        'Die Support-Kollegen lasen jedes eingehende Jira-Ticket vollständig durch, nur um herauszufinden, worum es ging und wer zuständig war. Ein Sprachmodell lag als Lösung nahe, doch Kundendaten durften das Firmennetz nicht verlassen – womit jede gehostete API ausschied.',
      approach:
        'FastAPI holt das Ticket und übergibt es einem lokalen Ollama-Modell für Zusammenfassung und Klassifizierung, prüft die Antwort gegen ein striktes Pydantic-Schema und wiederholt die Anfrage, wenn das Modell etwas Fehlerhaftes liefert. Ein Rocket.Chat-Bot bringt das Ergebnis dorthin, wo das Team ohnehin arbeitet, und entwirft eine Antwort; mit dem Befehl `take TICKET-KEY` übernimmt man das Ticket. Das Modell habe ich über einen in MLflow protokollierten Vergleich mit blinder Bewertung in Label Studio ausgewählt, statt nach Bauchgefühl zu entscheiden.',
      metrics: [
        { value: '22.080 €', label: 'Ersparnis pro Jahr' },
        { value: '~6 Wochen', label: 'bis zur Amortisation' },
        { value: '7 Min.', label: 'gespart pro Ticket' },
      ],
      stack: ['Python', 'FastAPI', 'Ollama', 'Pydantic', 'MLflow', 'Label Studio', 'Rocket.Chat'],
      diagram: 'triage',
    },
    {
      title: 'MSISDN-Bestandsplattform',
      context: 'tyntec · 2024—2026',
      summary:
        'Eine REST-API wurde zur verlässlichen Quelle für die Rufnummernvergabe über 56 Provider und 18.600 Kunden hinweg.',
      problem:
        'Die Vergabe von Rufnummern verteilte sich auf ein veraltetes Java-EE-Werkzeug und manuelle Abläufe. Bei 56 vorgelagerten Providern, die Nummern für Tausende Kunden lieferten, gab es keine verlässliche Quelle dafür, was vergeben, frei oder reserviert war.',
      approach:
        'Ich habe eine REST-API entworfen und gebaut, die den gesamten Bestand verwaltet – Vergabe, Reservierung und Freigabe – mit Flyway für die Schema-Evolution und einem Caffeine-Cache vor den häufigen Abfragen. Jeder Endpunkt ist über OpenAPI dokumentiert, und die Integrationstests laufen auf Jenkins gegen eine echte PostgreSQL in Testcontainers, prüfen also tatsächliches SQL statt eines Mocks. Zusätzlich habe ich das alte Java-EE/EJB-Werkzeug auf diese Plattform migriert und ein React-Frontend dafür gebaut.',
      metrics: [
        { value: '56', label: 'vorgelagerte Provider' },
        { value: '18.600', label: 'versorgte Kunden' },
      ],
      stack: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'JPA', 'Flyway', 'Caffeine', 'OpenAPI', 'Testcontainers', 'Jenkins'],
    },
    {
      title: 'Einheitliches Messaging-Gateway',
      context: 'Eigenes Projekt · 2026',
      summary:
        'Ein API-Vertrag für sechs Kanäle, nach Preis geroutet mit automatischem Ausweichen – die Antwort kommt in Millisekunden, zugestellt wird im Hintergrund.',
      problem:
        'Einen Kunden über SMS, WhatsApp oder einen anderen Kanal zu erreichen bedeutet für jeden Kanal ein eigenes Protokoll, ein eigenes Fehlerverhalten und einen eigenen Preis. Ruft man die Anbieter direkt im Request auf, ist die API zudem nur so schnell wie der langsamste von ihnen, und eine Lastspitze trifft ungebremst denselben Empfänger.',
      approach:
        'Die Anfrage wird pro Empfänger begrenzt, als QUEUED gespeichert und sofort mit 202 beantwortet. Die Zustellung startet über ein Ereignis, das erst nach dem Commit der Transaktion veröffentlicht wird – ein langsamer Anbieter kann den Aufrufer damit weder blockieren noch zurückrollen. Der Router sortiert die aktiven Kanäle nach Preis und arbeitet sie ab, bis einer annimmt, mit einer ausdrücklichen Kette WhatsApp → SMS → E-Mail und einer Obergrenze für Versuche. Rückmeldungen der Anbieter kommen über einen per Secret geschützten Webhook und setzen den Endzustand. Alle Anbieter liegen hinter einer Schnittstelle, sodass ein echtes SDK ein Mock ersetzen kann, ohne das Routing anzufassen.',
      metrics: [
        { value: '6', label: 'Kanäle, ein Vertrag' },
        { value: '202', label: 'Antwort vor der Zustellung' },
        { value: 'Preis-sortiert', label: 'Routing mit Ausweichkette' },
      ],
      stack: ['Java 25', 'Spring Boot 4', 'PostgreSQL', 'Flyway', 'Redis', 'Docker', 'OpenAPI', 'Virtual Threads'],
      diagram: 'gateway',
    },
    {
      title: 'App für die Lagerlogistik',
      context: 'Freiberuflich · seit 2026',
      summary:
        'Eine offline-taugliche Android-App für Lagerpersonal, durchgängig in Eigenregie von den Anforderungen bis zum Play-Store-Release.',
      problem:
        'Ein Logistikkunde brauchte eine Lösung, mit der das Lagerpersonal Warenbewegungen direkt vor Ort erfassen kann – dort, wo das Netz unzuverlässig ist und eine Web-Anwendung schlicht stehen bleibt.',
      approach:
        'Room/SQLite hält alle Daten mit versionierten Migrationen auf dem Gerät, sodass ein Update den Nutzer nie seine Daten kostet. MVVM mit Coroutines hält die Oberfläche flüssig, und die Daten verlassen das Gerät bei Bedarf über Excel-Export und lokale Sicherung. Das Projekt liegt vollständig in meiner Hand – Anforderungen, Architektur, Umsetzung, Tests und Veröffentlichung.',
      metrics: [
        { value: 'Durchgängig', label: 'alleinverantwortlich' },
        { value: 'Offline', label: 'von Grund auf ausgelegt' },
      ],
      stack: ['Kotlin', 'MVVM', 'Coroutines', 'Room', 'SQLite', 'Material UI', 'Play Store'],
      diagram: 'stock',
    },
  ],

  diagrams: {
    triage: {
      caption:
        'Alles innerhalb der gestrichelten Grenze läuft auf firmeneigener Hardware – keine Kundendaten verlassen das Netz.',
      boundary: 'On-Premises',
      jira: 'Jira',
      jiraSub: 'Webhook bei neuem Ticket',
      api: 'FastAPI-Dienst',
      apiSub: 'abrufen · orchestrieren',
      llm: 'Ollama',
      llmSub: ['lokales LLM', 'Zusammenfassung + Klasse'],
      chat: 'Rocket.Chat',
      chatSub: ['Antwortentwurf', 'take TICKET-KEY'],
      validate: 'Pydantic-Schemaprüfung',
      retry: 'Wiederholung bei ungültiger Ausgabe',
    },
    stock: {
      caption:
        'Jeder Schreibvorgang wird geprüft, bevor er die Datenbank erreicht; Lesevorgänge kommen als beobachtbare Ströme zurück, sodass sich die Oberfläche selbst aktualisiert. Nichts davon braucht Netz – die Daten verlassen das Gerät nur, wenn der Nutzer sie exportiert.',
      boundary: 'Auf dem Gerät',
      ui: 'Fragments + ViewModels',
      uiSub: 'Lager · Artikel · Historie · Archiv',
      repo: 'StockRepository',
      repoSub: 'Zugang · Verkauf · Abschreibung · Korrektur, geprüft vom StockMovementValidator',
      room: 'Room-DAOs → SQLite',
      roomSub: '5 Entitäten · versioniertes Schema · transaktionale Schreibvorgänge',
      writes: 'schreiben',
      reads: 'Flow',
      excel: 'Excel-Export',
      excelSub: 'bei Bedarf',
      backup: 'Lokale Sicherung',
      backupSub: 'Wiederherstellung auf neuem Gerät',
    },
    gateway: {
      caption:
        'Der Aufrufer erhält eine Antwort, sobald die Nachricht gespeichert ist. Die Zustellung beginnt erst nach dem Commit dieser Transaktion, sodass ein langsamer Anbieter den Request nie blockiert – ein Rückruf des Anbieters setzt anschließend den Endzustand.',
      request: 'POST /messages',
      requestSub: 'ein Vertrag, jeder Kanal',
      rateLimit: 'Ratenbegrenzung',
      rateLimitSub: 'pro Empfänger, je Minute',
      store: 'PostgreSQL',
      storeSub: 'gespeichert als QUEUED',
      accepted: '202 Accepted zurück · Versand nach dem Commit',
      event: 'Asynchroner Versand',
      eventSub: 'Ereignis nach dem Commit',
      router: 'ChannelRouter',
      routerSub: ['günstigster Kanal zuerst', 'WhatsApp → SMS → E-Mail'],
      providers: 'Anbieter-Adapter',
      providersSub: ['SMS · WhatsApp · Telegram', 'E-Mail · RCS · Viber'],
      webhook: 'Rückruf des Anbieters → POST /webhooks/messages/{id}/status',
      states: 'QUEUED → SENT',
      statesSub: '→ DELIVERED · FAILED → erneut',
    },
  },

  experience: {
    expand: 'Details anzeigen',
    collapse: 'Details ausblenden',
  },

  experienceEntries: [
    {
      role: 'Freiberuflicher Softwareentwickler',
      org: 'Selbstständig',
      period: 'seit Juni 2026',
      location: 'Dortmund (remote)',
      summary:
        'Entwicklung einer nativen Android-App für einen Logistikkunden von Grund auf – von den Anforderungen bis zum Release im Play Store in eigener Verantwortung.',
      highlights: [
        'Kotlin-App mit MVVM-Architektur, durchgängig mit ViewModels und Coroutines',
        'Local-First-Datenschicht auf Room/SQLite mit versionierten Migrationen',
        'Oberflächen mit Material UI, Excel-Export und lokale Sicherung für den Einsatz im Lager ohne verlässliches Netz',
        'Volle Verantwortung: Anforderungsaufnahme, Architektur, Umsetzung, Tests und Veröffentlichung',
      ],
    },
    {
      role: 'Softwareentwickler',
      org: 'tyntec',
      period: 'Aug. 2024 — Juni 2026',
      location: 'Deutschland',
      summary:
        'Backend-Entwicklung mit Java und Spring Boot für eine weltweite Messaging-Plattform, dazu Aufbau und Einführung der ersten On-Premises-KI-Werkzeuge im Team.',
      highlights: [
        'Aufbau eines On-Premises-KI-Dienstes (Python, FastAPI, Ollama), der Jira-Tickets liest, zusammenfasst und klassifiziert – rund 7 Minuten Ersparnis pro Ticket, etwa 552 Stunden und 22.080 € pro Jahr, amortisiert in rund 6 Wochen',
        'Entwicklung eines Rocket.Chat-Support-Bots, der Antworten per Sprachmodell entwirft und Tickets über einen Jira-Webhook durch den KI-Dienst leitet',
        'Durchführung eines Modellvergleichs, protokolliert in MLflow und blind bewertet in Label Studio',
        'Entwurf und Umsetzung einer REST-API zur Rufnummernverwaltung (Java 21, Spring Boot 3, PostgreSQL, Flyway, Caffeine, OpenAPI) für 56 Provider und rund 18.600 Kunden, abgesichert durch Testcontainers und Jenkins CI',
        'Migration eines veralteten Java-EE/EJB-Werkzeugs auf Spring Boot 3 mit einem Frontend in React 19 und TypeScript',
        'Mitarbeit an einer Versandplattform, die SMS, WhatsApp, RCS, Viber und TTS über SMPP und REST vereint, samt Least-Cost-Routing',
      ],
    },
    {
      role: 'Studienprojekt',
      org: 'Nationale Universität für Radioelektronik Charkiw',
      period: '2024 — 2025',
      location: 'Charkiw, Ukraine',
      summary:
        'Entwurf einer automatisierten elektropneumatischen Steuerung für eine Fertigungslinie im Rahmen des Studiums.',
      highlights: [
        'Analyse des Automatisierungssystems und Entwurf der strukturellen Steuerungslösung',
        'Modellierung und Animation der pneumatischen Komponenten in Blender zur Überprüfung des Entwurfs',
      ],
    },
  ],

  education: [
    {
      title: 'Fachinformatiker für Anwendungsentwicklung',
      org: 'Robert-Bosch-Berufskolleg der Stadt Dortmund',
      period: '2024 — 2026',
      description:
        'Duale Ausbildung in der Anwendungsentwicklung – Java, Spring, Docker, Kubernetes, Jenkins und CI/CD, begleitend zur praktischen Arbeit bei tyntec.',
    },
    {
      title: 'B.Sc. Automatisierung und computerintegrierte Technologien',
      org: 'Nationale Universität für Radioelektronik Charkiw',
      period: '2021 — 2025',
      description:
        'Grundlagen in Python, Algorithmen, Datenbanken, objektorientierter Programmierung und Software-Engineering.',
    },
  ],

  contact: {
    heading: 'Sprechen wir',
    intro:
      'Ich bin offen für Backend-Positionen und freiberufliche Projekte. Schreiben Sie mir direkt oder melden Sie sich über LinkedIn – beides erreicht mich sofort.',
    emailCta: 'E-Mail schreiben',
    linkedinCta: 'Auf LinkedIn vernetzen',
    copy: 'Adresse kopieren',
    copied: 'Kopiert',
    responseNote: 'Ich antworte in der Regel innerhalb eines Tages.',
  },

  footer: 'Erstellt mit React & Framer Motion',
  langToggleLabel: 'Zu Englisch wechseln',

  meta: {
    title: 'Andrii Tarasov — Backend-Softwareentwickler',
    description:
      'Backend-Entwickler in Dortmund mit Schwerpunkt auf Java, Spring Boot und On-Premises-KI. Ich baue Produktivsysteme, die messbar Zeit und Geld sparen.',
  },
}
