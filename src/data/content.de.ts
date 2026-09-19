import type { Content } from './types'
import { personal } from './profile'

export const de: Content = {
  role: 'Softwareentwickler · Java & Spring Boot',
  roleLine: 'Softwareentwickler · Java & Spring Boot',
  tagline: 'Ich entwickle Backend-Systeme und REST-APIs – mit Erfahrung in Systemintegration und IT-Betrieb.',
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
    'Ich bin Fachinformatiker für Anwendungsentwicklung mit zwei Jahren Berufserfahrung. Mein Schwerpunkt liegt auf Java, Spring Boot und PostgreSQL. Dazu bringe ich praktische Erfahrung in der Systemintegration und im Betrieb von Windows- und Linux-Umgebungen mit.',
    'Bei tyntec habe ich eine Bestands-API für 56 Provider und rund 18.600 Kunden entwickelt, ein Java-EE-System auf Spring Boot 3 migriert und einen lokalen KI-Dienst zur Ticketbearbeitung umgesetzt. Die Ergebnisse dieser Arbeit finden Sie in den Projekten.',
    'Aktuell entwickle ich freiberuflich ein Lagerverwaltungssystem für einen Logistikkunden: eine Android-App mit Kotlin und ein Spring-Boot-Backend. Von den Anforderungen über Datenbank und Tests bis zur Bereitstellung verantworte ich die Umsetzung selbst.',
    'Ich habe einen Bachelorabschluss und eine verkürzte IHK-Ausbildung. Microsoft-Applied-Skills-Nachweise ergänzen meine praktische Erfahrung. Ich lebe in Dortmund und bin für eine passende Stelle innerhalb Deutschlands oder ins Ausland umzugsbereit.',
  ],

  offTheClock: {
    label: 'Nach Feierabend',
    text: 'Ich spiele Volleyball: sechs Leute, von denen jeder den anderen fünf vertrauen muss. Die übrige freie Zeit gehört Büchern, irgendeiner Serie, bei der ich hinterherhinke, und langen Spaziergängen durch die Stadt.',
  },

  stats: [
    { value: '2+', label: 'Jahre Berufserfahrung' },
    { value: '56', label: 'Provider in einem Bestandssystem' },
    { value: '18.600', label: 'Kunden darüber versorgt' },
    { value: '22 T€', label: 'jährlich durch einen KI-Dienst gespart' },
  ],

  skillGroups: [
    {
      title: 'Java & Backend',
      summary: 'Bestands-API, Legacy-Migration und eigene Anwendungen mit relationalen Datenbanken und Integrationstests.',
      items: ['Java', 'Spring Boot', 'REST & OpenAPI', 'Spring Data JPA', 'Hibernate', 'PostgreSQL', 'Flyway', 'Testcontainers'],
    },
    {
      title: 'Web & Android',
      summary: 'React-Oberflächen für Webanwendungen und eine offline-fähige Android-App für einen Logistikkunden.',
      items: ['React', 'TypeScript', 'JavaScript', 'TanStack Query', 'Kotlin', 'Android · MVVM · Room', 'SQLite'],
    },
    {
      title: 'Integration & Automatisierung',
      summary: 'Schnittstellen zwischen Diensten und lokale KI zur Bearbeitung von Support-Tickets bei tyntec.',
      items: ['Python', 'FastAPI', 'REST-Schnittstellen', 'Webhooks', 'SMPP', 'Ollama', 'n8n'],
    },
    {
      title: 'Tests & Bereitstellung',
      summary: 'Automatisierte Builds und Tests, containerisierte Anwendungen und versionierte Datenbankmigrationen.',
      items: ['Git', 'GitHub Actions', 'Jenkins', 'Docker', 'Gradle', 'Maven', 'SQL', 'Bash'],
    },
    {
      title: 'Systemintegration & Betrieb',
      summary: 'Praktische Erfahrung mit Serveradministration, Benutzerrechten und Unterstützung im internen IT-Betrieb.',
      items: ['Windows Server', 'Linux', 'Active Directory', 'Microsoft Entra ID', 'Microsoft 365', 'Gruppenrichtlinien', 'VMware', 'Hyper-V'],
    },
    {
      title: 'Cloud & Infrastruktur-Grundlagen',
      summary: 'Ausbildung und Weiterbildung in Netzwerken und Infrastruktur, ergänzt durch Microsoft Applied Skills und einen AWS-Kursabschluss.',
      items: ['Microsoft Azure', 'AWS-Grundlagen', 'TCP/IP', 'DNS & DHCP', 'Kubernetes', 'Monitoring', 'Storage & Backup', 'ITIL-Serviceprozesse'],
    },
  ],

  credentialsHeading: 'Zertifikate',
  credentials: [
    {
      title: 'AWS Cloud Practitioner Essentials',
      issuer: 'Amazon Web Services',
      type: 'Kursabschluss',
      summary: 'AWS-Kerndienste, Architektur, Sicherheit sowie Preis- und Supportmodelle der Cloud-Plattform.',
      skills: ['AWS', 'Cloud-Grundlagen', 'Cloud-Sicherheit & Abrechnung'],
      href: personal.linkedin,
      action: 'Auf LinkedIn ansehen',
      linkIcon: 'linkedin',
    },
    {
      title: 'Agenten mit integrierten Tools entwickeln',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'KI-Agenten mit dem Microsoft-Foundry-SDK bauen und konfigurieren, mit integrierten und eigenen Tools.',
      skills: ['KI-Agenten', 'Microsoft Foundry', 'Tool-Integration'],
      href: 'https://learn.microsoft.com/api/credentials/share/de-de/AndriiTarasov-8792/791317A59CA09393?sharingId=3CBCE2933DC353C5',
      action: 'Nachweis ansehen',
    },
    {
      title: 'Azure-Verwaltungsaufgaben',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'Compute-, Netzwerk- und Storage-Aufgaben in einem Azure-Abonnement.',
      skills: ['Azure', 'Virtuelle Maschinen', 'Netzwerk & Storage'],
      href: 'https://learn.microsoft.com/api/credentials/share/de-de/AndriiTarasov-8792/C9D0E1A402FEAC7?sharingId=3CBCE2933DC353C5',
      action: 'Nachweis ansehen',
    },
    {
      title: 'Identitäten und Zugriff mit Microsoft Entra',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'Grundlagen zu Identitäten und Zugriff mit Microsoft Entra.',
      skills: ['Microsoft Entra', 'Identität & Zugriff'],
      href: 'https://learn.microsoft.com/api/credentials/share/de-de/AndriiTarasov-8792/25E2D1948CDA2AD8?sharingId=3CBCE2933DC353C5',
      action: 'Nachweis ansehen',
    },
    {
      title: 'Active Directory Domain Services administrieren',
      issuer: 'Microsoft',
      type: 'Applied Skills',
      summary: 'Domänencontroller, AD-DS-Objekte, Gruppenrichtlinien und Sicherheitsverwaltung.',
      skills: ['Active Directory', 'Gruppenrichtlinien'],
      href: 'https://learn.microsoft.com/api/credentials/share/de-de/AndriiTarasov-8792/ECD676719B997C0E?sharingId=3CBCE2933DC353C5',
      action: 'Nachweis ansehen',
    },
    {
      title: 'Digitalität in der beruflichen Bildung',
      issuer: 'Robert-Bosch-Berufskolleg Dortmund',
      type: 'Zusatzqualifikation',
      summary: 'Digitale Arbeitsumgebungen, Kommunikation, Netzwerke, Datenschutz und Informationssicherheit.',
      skills: ['Digitale Arbeitswelt', 'Netzwerke', 'Informationssicherheit'],
      href: personal.linkedin,
      action: 'Auf LinkedIn ansehen',
      linkIcon: 'linkedin',
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
    github: 'Auf GitHub ansehen',
    privateRepo: 'Nicht öffentliches Unternehmensprojekt',
    close: 'Schließen',
    prev: 'Vorheriges Projekt',
    next: 'Nächstes Projekt',
    slider: 'Durch die Projekte blättern',
  },

  projects: [
    {
      title: 'Threadly · Interner Unternehmens-Messenger',
      context: 'Unternehmens-Messenger · 2026',
      summary:
        'Ich habe einen selbst gehosteten internen Messenger für ein Unternehmen entwickelt, der Profile, Gespräche und Teamaktivitäten in einem sicheren sozialen Arbeitsbereich bündelt.',
      problem:
        'Das Unternehmen brauchte einen privaten Ort, an dem Kollegen kommunizieren und Teamaktivitäten verfolgen können, ohne Gespräche über externe Plattformen zu verteilen. Die Lösung sollte echte soziale Interaktion ermöglichen und zugleich Bereitstellung, Identitäten und Daten unter der Kontrolle des Unternehmens halten.',
      approach:
        'Ich habe das gesamte Produkt mit einem React-/TypeScript-Client, einer Spring-Boot-REST-API und PostgreSQL umgesetzt. Die Plattform umfasst Profile, Beiträge, Antworten, Reposts, Follows, Likes, Lesezeichen, Blockierungen und Benachrichtigungen. Kurzlebige JWT-Access-Tokens werden mit gehashten, rotierenden Refresh-Tokens kombiniert; die Wiederverwendung eines alten Tokens widerruft die gesamte Sitzungsfamilie. Feeds verwenden Cursor-Paginierung, damit neue Aktivitäten weder Duplikate noch Lücken erzeugen. Client und API werden als ein Docker-Image unter einer Origin ausgeliefert und lassen sich dadurch einfach selbst hosten. Integrationstests laufen mit Testcontainers gegen eine echte PostgreSQL-Datenbank in GitHub Actions.',
      metrics: [
        { value: 'Eine Origin', label: 'Client und API gemeinsam' },
        { value: 'Rotierend', label: 'sichere Refresh-Sitzungen' },
        { value: 'Cursor-basiert', label: 'Feeds ohne Lücken' },
      ],
      stack: ['Java 21', 'Spring Boot 4.1', 'React 19', 'TypeScript', 'PostgreSQL 17', 'Flyway', 'TanStack Query', 'Docker', 'Testcontainers', 'GitHub Actions'],
      repoUrl: 'https://github.com/ATarasovHub/threadly',
      diagram: 'threadly',
    },
    {
      title: 'On-Premises-KI zur Ticket-Triage',
      context: 'tyntec · 2025',
      summary:
        'Ein lokales Sprachmodell liest, fasst zusammen und verteilt Support-Tickets und spart so 22.080 € im Jahr, ohne dass ein Byte Kundendaten das Netz verlässt.',
      problem:
        'Die Support-Kollegen lasen jedes eingehende Jira-Ticket vollständig durch, nur um herauszufinden, worum es ging und wer zuständig war. Ein Sprachmodell lag als Lösung nahe, doch Kundendaten durften das Firmennetz nicht verlassen, womit jede gehostete API ausschied.',
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
      context: 'tyntec · 2024-2026',
      summary:
        'Eine REST-API wurde zur verlässlichen Quelle für die Rufnummernvergabe über 56 Provider und 18.600 Kunden hinweg.',
      problem:
        'Die Vergabe von Rufnummern verteilte sich auf ein veraltetes Java-EE-Werkzeug und manuelle Abläufe. Bei 56 vorgelagerten Providern, die Nummern für Tausende Kunden lieferten, gab es keine verlässliche Quelle dafür, was vergeben, frei oder reserviert war.',
      approach:
        'Ich habe eine REST-API entworfen und gebaut, die den gesamten Bestand verwaltet (Vergabe, Reservierung und Freigabe), mit Flyway für die Schema-Evolution und einem Caffeine-Cache vor den häufigen Abfragen. Jeder Endpunkt ist über OpenAPI dokumentiert, und die Integrationstests laufen auf Jenkins gegen eine echte PostgreSQL in Testcontainers, prüfen also tatsächliches SQL statt eines Mocks. Zusätzlich habe ich das alte Java-EE/EJB-Werkzeug auf diese Plattform migriert und ein React-Frontend dafür gebaut.',
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
        'Ein API-Vertrag für sechs Kanäle, nach Preis geroutet mit automatischem Ausweichen: Die Antwort kommt in Millisekunden, zugestellt wird im Hintergrund.',
      problem:
        'Einen Kunden über SMS, WhatsApp oder einen anderen Kanal zu erreichen bedeutet für jeden Kanal ein eigenes Protokoll, ein eigenes Fehlerverhalten und einen eigenen Preis. Ruft man die Anbieter direkt im Request auf, ist die API zudem nur so schnell wie der langsamste von ihnen, und eine Lastspitze trifft ungebremst denselben Empfänger.',
      approach:
        'Die Anfrage wird pro Empfänger begrenzt, als QUEUED gespeichert und sofort mit 202 beantwortet. Die Zustellung startet über ein Ereignis, das erst nach dem Commit der Transaktion veröffentlicht wird. Ein langsamer Anbieter kann den Aufrufer damit weder blockieren noch zurückrollen. Der Router sortiert die aktiven Kanäle nach Preis und arbeitet sie ab, bis einer annimmt, mit einer ausdrücklichen Kette WhatsApp → SMS → E-Mail und einer Obergrenze für Versuche. Rückmeldungen der Anbieter kommen über einen per Secret geschützten Webhook und setzen den Endzustand. Alle Anbieter liegen hinter einer Schnittstelle, sodass ein echtes SDK ein Mock ersetzen kann, ohne das Routing anzufassen.',
      metrics: [
        { value: '6', label: 'Kanäle, ein Vertrag' },
        { value: '202', label: 'Antwort vor der Zustellung' },
        { value: 'Preis-sortiert', label: 'Routing mit Ausweichkette' },
      ],
      stack: ['Java 25', 'Spring Boot 4', 'PostgreSQL', 'Flyway', 'Redis', 'Docker', 'OpenAPI', 'Virtual Threads'],
      repoUrl: 'https://github.com/ATarasovHub/messaginggateway',
      diagram: 'gateway',
    },
    {
      title: 'App für die Lagerlogistik',
      context: 'Freiberuflich · seit 2026',
      summary:
        'Eine offline-taugliche Android-App für Lagerpersonal, durchgängig in Eigenregie von den Anforderungen bis zum Play-Store-Release.',
      problem:
        'Ein Logistikkunde brauchte eine Lösung, mit der das Lagerpersonal Warenbewegungen direkt vor Ort erfassen kann, also dort, wo das Netz unzuverlässig ist und eine Web-Anwendung schlicht stehen bleibt.',
      approach:
        'Room/SQLite hält alle Daten mit versionierten Migrationen auf dem Gerät, sodass ein Update den Nutzer nie seine Daten kostet. MVVM mit Coroutines hält die Oberfläche flüssig, und die Daten verlassen das Gerät bei Bedarf über Excel-Export und lokale Sicherung. Das Projekt liegt vollständig in meiner Hand: Anforderungen, Architektur, Umsetzung, Tests und Veröffentlichung.',
      metrics: [
        { value: 'Durchgängig', label: 'alleinverantwortlich' },
        { value: 'Offline', label: 'von Grund auf ausgelegt' },
      ],
      stack: ['Kotlin', 'MVVM', 'Coroutines', 'Room', 'SQLite', 'Material UI', 'Play Store'],
      repoUrl: 'https://github.com/ATarasovHub/StockKeeper',
      diagram: 'stock',
    },
  ],

  diagrams: {
    triage: {
      caption:
        'Alles innerhalb der gestrichelten Grenze läuft auf firmeneigener Hardware, keine Kundendaten verlassen das Netz.',
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
        'Jeder Schreibvorgang wird geprüft, bevor er die Datenbank erreicht; Lesevorgänge kommen als beobachtbare Ströme zurück, sodass sich die Oberfläche selbst aktualisiert. Nichts davon braucht Netz, die Daten verlassen das Gerät nur, wenn der Nutzer sie exportiert.',
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
        'Der Aufrufer erhält eine Antwort, sobald die Nachricht gespeichert ist. Die Zustellung beginnt erst nach dem Commit dieser Transaktion, sodass ein langsamer Anbieter den Request nie blockiert. Ein Rückruf des Anbieters setzt anschließend den Endzustand.',
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
    threadly: {
      caption:
        'React-Client, API und Datenbank laufen als ein selbst gehostetes System. Die Authentifizierung ist von den sozialen Funktionen getrennt; beide speichern über eine kontrollierte PostgreSQL-Datenschicht.',
      boundary: 'Unternehmensinfrastruktur',
      client: 'React-Client',
      clientSub: ['Feed · Profile', 'Beiträge · Benachrichtigungen'],
      api: 'Spring-Boot-API',
      apiSub: ['REST · Validierung', 'Security · Ratenbegrenzung'],
      auth: 'Sitzungssicherheit',
      authSub: ['kurzlebiges JWT', 'rotierendes Refresh-Cookie'],
      domain: 'Messenger-Dienste',
      domainSub: ['Beiträge · Antworten · Follows', 'Likes · Lesezeichen · Blocks'],
      database: 'PostgreSQL 17',
      databaseSub: ['Flyway-Migrationen', 'Cursor-paginierte Feeds'],
      deployment: 'Ein Docker-Image · eine Origin',
    },
  },

  experience: {
    expand: 'Details anzeigen',
    collapse: 'Details ausblenden',
  },

  experienceEntries: [
    {
      role: 'Freiberuflicher Fachinformatiker (Entwicklung & Betrieb)',
      org: 'Selbstständig',
      period: 'seit Juni 2026',
      location: 'Dortmund (remote)',
      summary:
        'Kundenprojekt Logistik: eigenverantwortliche Entwicklung und Inbetriebnahme eines Lagerverwaltungssystems, von den Anforderungen bis zum Betrieb.',
      highlights: [
        'Lagerverwaltungslösung aus Android-Client (Kotlin) und Serveranwendung (Spring Boot 3, PostgreSQL)',
        'Einrichtung von Datenbank, Datensicherung und versionierter Datenbankmigration',
        'Offline-fähig im Lager, mit Excel-Export sowie lokaler Sicherung und Wiederherstellung auf neuen Geräten',
        'Anforderungsaufnahme mit dem Kunden, Tests und Rollout über den Play Store in eigener Verantwortung',
      ],
    },
    {
      role: 'Fachinformatiker',
      org: 'tyntec GmbH',
      period: 'Aug. 2024 - Juni 2026',
      location: 'Deutschland',
      summary:
        'Anwendungsentwicklung und Systemintegration für eine weltweite Messaging-Plattform, dazu Administration und Support der internen IT-Umgebung.',
      highlights: [
        'Entwicklung einer zentralen Rufnummerninventar-Schnittstelle (Java 21, Spring Boot 3, PostgreSQL, OpenAPI) für 56 Anbieter und rund 18.600 Kunden weltweit',
        'Administration und Support der internen IT-Umgebung: Benutzer- und Rechteverwaltung in Active Directory und Microsoft 365, Betreuung von Windows- und Linux-Servern sowie Unterstützung der Kolleginnen und Kollegen im laufenden Betrieb',
        'Aufbau eines On-Premises-Dienstes zur automatisierten Ticketvorsortierung (Python, FastAPI, Ollama) auf eigener Hardware, ohne Abfluss von Daten nach außen: rund 7 Minuten weniger Aufwand pro Ticket, etwa 552 Stunden und 22.080 € Einsparung pro Jahr bei rund 6 Wochen Amortisation',
        'Integration mehrerer Systeme zu einem durchgehenden Prozess: Jira-Webhooks, interner KI-Dienst und Rocket.Chat über einen Routing-Dienst gekoppelt, inklusive automatischer Antwortentwürfe und Ticketzuweisung im Chat',
        'Ablösung einer Altanwendung (Java EE/EJB) durch Spring Boot 3 und React 19, inklusive Datenmigration und verbesserter Wartbarkeit',
        'Bereitstellung und Betrieb der Dienste in Containern mit Docker und Kubernetes, automatisierte Builds und Integrationstests (Testcontainers) über Jenkins CI',
        'Mitarbeit an einer Messaging-Plattform (SMS, WhatsApp, RCS, Viber, TTS) mit Anbindung externer Anbieter über SMPP und REST',
      ],
    },
    {
      role: 'Studienprojekt',
      org: 'Nationale Universität für Radioelektronik Charkiw',
      period: '2024 - 2025',
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
      period: '2024 - 2026',
      description:
        'Duale IHK-Ausbildung begleitend zur praktischen Arbeit bei tyntec, wegen guter Leistungen in Betrieb und Berufsschule um ein Jahr verkürzt. Inhalte unter anderem objektorientierte Softwareentwicklung mit Java, Datenbanken und SQL, Netzwerke, Serverbetrieb, Storage und Backup, ITIL-Serviceprozesse, Virtualisierung, Docker, Kubernetes und CI/CD.',
      photo: 'rbbk',
      photoAlt:
        'Innenhof des Robert-Bosch-Berufskollegs in Dortmund, wo Andrii Tarasov seine Ausbildung zum Fachinformatiker absolvierte',
    },
    {
      title: 'B.Sc. Automatisierung und computerintegrierte Technologien',
      org: 'Nationale Universität für Radioelektronik Charkiw',
      period: '2021 - 2025',
      description:
        'Grundlagen in Python, Algorithmen, Datenbanken, objektorientierter Programmierung und Software-Engineering, dazu Computernetzwerke, Betriebssysteme, Serveradministration und Industrienetzwerke in der Automatisierung.',
      photo: 'khnure',
      photoAlt:
        'Hauptgebäude der Nationalen Universität für Radioelektronik Charkiw, wo Andrii Tarasov seinen B.Sc. erwarb',
    },
  ],

  contact: {
    heading: 'Sprechen wir',
    intro:
      'Ich suche eine Stelle in der Softwareentwicklung mit Java und Spring Boot. Auch Aufgaben an der Schnittstelle zu Systemintegration und IT-Betrieb interessieren mich. Für freiberufliche Projekte bin ich ebenfalls offen. Schreiben Sie mir per E-Mail oder auf LinkedIn.',
    emailCta: 'E-Mail schreiben',
    linkedinCta: 'Auf LinkedIn vernetzen',
    copy: 'Adresse kopieren',
    copied: 'Kopiert',
    responseNote: 'Ich antworte in der Regel innerhalb eines Tages.',
  },

  footer: 'Erstellt mit React & GSAP',
  langToggleLabel: 'Zu Englisch wechseln',
  themeToggle: {
    toDark: 'Zum dunklen Design wechseln',
    toLight: 'Zum hellen Design wechseln',
  },

  meta: {
    title: 'Andrii Tarasov | Java & Spring Boot Entwickler',
    description:
      'Java- und Spring-Boot-Entwickler in Dortmund mit Erfahrung in Systemintegration. Projekte, Berufserfahrung und Lebenslauf. Offen für Angebote und umzugsbereit.',
  },
}
