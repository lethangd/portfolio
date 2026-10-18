const img = (name: string) => `${process.env.PUBLIC_URL}/img/${name}.webp`;

export const profile = {
  name: 'Lê Minh Thắng',
  email: 'lthang.forwork@gmail.com',
  phone: '0834398268',
  phoneDisplay: '0834 398 268',
  github: 'https://github.com/lethangd',
  linkedin: 'https://www.linkedin.com/in/l%C3%AA-th%E1%BA%AFng-249162302/',
  cv: `${process.env.PUBLIC_URL}/Le-Minh-Thang-Fullstack.pdf`,
  portrait: img('portrait'),
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'education', label: 'Education' },
];

export const facts = [
  { k: 'Role', v: 'Fullstack, backend-heavy' },
  { k: 'Experience', v: '3+ years · banking & healthcare' },
  { k: 'Core stack', v: 'Java · Spring Boot · Node.js' },
  { k: 'Based in', v: 'Hà Nội, Việt Nam' },
  { k: 'Status', v: 'Open to new roles' },
];

export const stats = [
  { value: 3, suffix: '+', label: 'Years shipping production systems' },
  { value: 10, suffix: 'k+', label: 'Clinical users on NUHS Care Plan' },
  { value: 20, suffix: '+', label: 'Real freelance projects delivered' },
  { value: 3, suffix: '', label: 'Healthcare orgs on one multi-tenant platform' },
];

export const heroOrbit = {
  outer: [
    { label: 'Java', x: '50%', y: '0%' },
    { label: 'Spring Boot', x: '100%', y: '50%' },
    { label: 'Kafka', x: '50%', y: '100%' },
    { label: 'Oracle', x: '0%', y: '50%' },
  ],
  inner: [
    { label: 'Vue 3', x: '85.36%', y: '14.64%' },
    { label: 'Python', x: '14.64%', y: '85.36%' },
    { label: 'Camunda', x: '14.64%', y: '14.64%' },
  ],
};

/** Every chip on the tech ring names the real work it was used in. */
export const techRing: { label: string; usedAt: string[] }[] = [
  { label: 'Java', usedAt: ['BPM KHDN · MB Bank', 'NUHS Care Plan', 'HMIS · VNPT-IT'] },
  { label: 'Spring Boot', usedAt: ['BPM KHDN · MB Bank', 'NUHS Care Plan'] },
  { label: 'Kafka', usedAt: ['NUHS Care Plan'] },
  { label: 'Camunda', usedAt: ['BPM KHDN · MB Bank'] },
  { label: 'Oracle', usedAt: ['BPM KHDN · MB Bank', 'HMIS · VNPT-IT'] },
  { label: 'PostgreSQL', usedAt: ['Sports Court Booking'] },
  { label: 'Redis', usedAt: ['Savanna', 'Sports Court Booking'] },
  { label: 'RabbitMQ', usedAt: ['Sports Court Booking'] },
  { label: 'Node.js', usedAt: ['Savanna', 'Real-time E-commerce'] },
  { label: 'Fastify', usedAt: ['Savanna'] },
  { label: 'ASP.NET Core', usedAt: ['Sports Court Booking', 'E-commerce Platform', 'Match Maker'] },
  { label: 'C#', usedAt: ['Sports Court Booking', 'Match Maker'] },
  { label: 'TypeScript', usedAt: ['VietNamAI.store'] },
  { label: 'React', usedAt: ['E-commerce Platform', 'Real-time E-commerce'] },
  { label: 'Next.js', usedAt: ['VietNamAI.store'] },
  { label: 'Angular', usedAt: ['BPM KHDN · MB Bank', 'NUHS Care Plan'] },
  { label: 'Vue 3', usedAt: ['Savanna', 'TSL Photobooth'] },
  { label: 'Python', usedAt: ['TSL Photobooth'] },
  { label: 'Docker', usedAt: ['NUHS Care Plan', 'Savanna', 'Sports Court Booking', 'TSL Photobooth'] },
  { label: 'AWS', usedAt: ['Savanna'] },
];

export const pillars = [
  { title: 'Secure by default', body: 'Role-based access, audit trails and permission checks that pass pentest.' },
  { title: 'Fast where it matters', body: 'Query tuning, caching and pagination for high-volume transactional load.' },
  { title: 'Built to change', body: 'Modular services and decision tables, so rules change without a redeploy.' },
];

export interface ExperienceProject {
  title: string;
  context: string;
  points: string[];
  stack: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  short: string;
  current?: boolean;
  projects: ExperienceProject[];
}

/** Newest first, as the cards read; the constellation draws them oldest first. */
export const experiences: ExperienceItem[] = [
  {
    company: 'MB Bank',
    role: 'Fullstack Developer',
    period: 'Jul 2026 — Present',
    short: 'Corporate credit origination & disbursement on Camunda, Oracle and T24.',
    current: true,
    projects: [
      {
        title: 'Corporate Credit Origination & Disbursement Platform (BPM KHDN)',
        context:
          'Workflow-driven credit platform covering the full corporate loan lifecycle — SME, Upper-SME, CIB — from proposal and appraisal to disbursement and T24 booking.',
        points: [
          'Built an automated financial-statement warning engine flagging abnormal cash flow, receivables/payables and YoY trends, cutting manual analysis for credit officers.',
          'Replaced hardcoded validation with DMN decision tables and admin-managed kill-switches, so rules change in production without redeployment.',
          'Integrated core banking (T24) and internal CRM to sync proposal status across cancel / withdraw / reject flows.',
          'Delivered guarantee lifecycle features compatible with both legacy and new data structures; resolved pentest findings with permission checks.',
          'Diagnosed production-critical defects end to end (BPMN, Oracle, Angular), including a silent UI freeze caused by change detection on large dynamic forms.',
        ],
        stack: ['Java', 'Spring Boot', 'Microservices', 'Angular', 'Oracle', 'Camunda BPMN/DMN', 'T24', 'GitLab CI/CD'],
      },
    ],
  },
  {
    company: 'Medicia',
    role: 'Fullstack Developer',
    period: 'May 2024 — Jun 2026',
    short: 'Hospital care plans for NUHS Singapore and a multi-tenant telepharmacy platform.',
    projects: [
      {
        title: 'NUHS Care Plan System',
        context: 'Hospital-wide care plan platform for National University Hospital Singapore, serving 10,000+ clinical users.',
        points: [
          'Designed core backend services for patient care plans, treatments, medications, appointments and symptoms.',
          'Applied Kafka event-driven workflows for eventual consistency, reliability and auditability across services.',
          'Handled high-concurrency booking with transactional validation, locking and conflict handling.',
        ],
        stack: ['Java', 'Spring Boot', 'Kafka', 'SQL', 'REST APIs', 'Docker', 'Angular'],
      },
      {
        title: 'Savanna Healthcare Platform',
        context: 'Multi-tenant telepharmacy & care management platform deployed to 3 healthcare organizations.',
        points: [
          'Architected a modular platform with centralized governance and tenant isolation.',
          'Led the Careplan Portal used daily by pharmacists and healthcare staff.',
          'Introduced Redis caching for high-read datasets, reducing backend load.',
        ],
        stack: ['Node.js (Fastify)', 'Vue.js', 'Redis', 'Docker', 'SQL', 'AWS'],
      },
    ],
  },
  {
    company: 'VNPT-IT',
    role: 'Fresher Java Backend Developer',
    period: 'Jun 2023 — Apr 2024',
    short: 'Pharmacy and vaccination modules of the national hospital information system.',
    projects: [
      {
        title: 'Hospital Management Information System (HMIS)',
        context: 'National-scale HMIS deployed across all hospitals and local health stations nationwide.',
        points: [
          'Engineered core backend modules with Spring Framework and Oracle.',
          'Built the Pharmacy module for inventory, prescriptions and dispensing at scale.',
          'Implemented the Vaccination module for immunization records and schedules.',
        ],
        stack: ['Java', 'Spring Framework', 'Oracle', 'jQuery'],
      },
    ],
  },
];

export interface FeaturedProject {
  slug: string;
  badge: string;
  meta: string;
  title: string;
  desc: string;
  highlights: string[];
  story: string[];
  stack: string[];
  image: string;
  pos: string;
  ratio: string;
  link: string;
  cta: string;
}

export const featured: FeaturedProject[] = [
  {
    slug: 'tsl-photobooth',
    badge: 'Founder',
    meta: '2026 · Side venture · In development',
    title: 'TSL Photobooth',
    desc: 'A self-service photobooth kiosk I’m building as my own startup — touch screen to printed strip with no staff needed. Built on the open-source photobooth-app engine, with a custom kiosk experience on top.',
    highlights: [
      'Touch-first Vietnamese kiosk UI: 3 frame styles, prints in about a minute.',
      'Digital copy delivered to guests by QR code.',
      'VietQR payment flow (SePay / Casso) and a staff admin mode.',
    ],
    story: [
      'The goal: a booth that runs with nobody standing next to it. Guests tap to start, pick one of three frames, pose and get a printed strip in about a minute.',
      'I kept the capture-and-print engine from the open-source photobooth-app and built the kiosk experience guests touch: a Vietnamese, touch-first flow in Vue 3.',
      'Every session ends with a digital copy by QR code; payment runs through VietQR (SePay / Casso), with a PIN-protected staff admin mode.',
    ],
    stack: ['Python', 'Vue 3', 'Docker', 'VietQR'],
    image: img('tsl-photobooth'),
    pos: '62% center',
    ratio: '16 / 9',
    link: 'https://github.com/lethangd/photobooth-app-tsl',
    cta: 'View source',
  },
  {
    slug: 'vietnamai-store',
    badge: 'Live client',
    meta: '2026 · Fullstack · Solo',
    title: 'VietNamAI.store',
    desc: 'Production AI chatbot commerce platform for a real client — from sales pages to the staff back office.',
    highlights: [
      'Sales pages, product catalog and order management.',
      'Role-based staff access and attendance tracking.',
      'CI/CD pipeline shipping straight to production.',
    ],
    story: [
      'Built product catalog management, order tracking, and role-based admin/staff workflows.',
      'Implemented secure API patterns, database policies, authentication, and media storage on Supabase.',
      'Optimized responsive UX for lead conversion with clear CTAs and fast page performance.',
      'Deployed on Vercel with environment-based security, then supported handover for live client usage.',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'CI/CD'],
    image: img('vietnamai'),
    pos: 'top',
    ratio: '16 / 10',
    link: 'https://vietnamai.store',
    cta: 'Visit live site',
  },
  {
    slug: 'sports-court-booking',
    badge: 'Team lead · 5',
    meta: '2024–25 · Microservices',
    title: 'Sports Court Booking',
    desc: 'Booking and management for players, court owners and coaches on a microservices backend.',
    highlights: [
      'Payments, revenue reports and match pairing.',
      'CQRS services talking over RabbitMQ, cached with Redis.',
      'Led a team of five from design to delivery.',
    ],
    story: [
      'Led the team and architected the microservices system end to end.',
      'Developed backend services for court booking, payment management and reporting.',
      'Implemented the API gateway with Clean Architecture, Vertical Slice and CQRS patterns.',
      'Applied OAuth2 for secure authentication and authorization across services.',
    ],
    stack: ['ASP.NET 8', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'CQRS'],
    image: img('scrms'),
    pos: 'top',
    ratio: '16 / 10',
    link: 'https://github.com/SCRMS-FPT',
    cta: 'View source',
  },
];

export const archive = [
  { title: 'E-commerce Platform', period: '10/2024 – 11/2024', stack: 'ASP.NET 6 · React · CQRS', image: img('ecommerce'), link: 'https://github.com/thanhhdhe/ProjectPRN231.git' },
  { title: 'Real-time E-commerce', period: '11/2024 – 12/2024', stack: 'Node.js · Socket.io · MongoDB', image: img('ecommerce'), link: 'https://lethangd.github.io/admin_asm3njs/' },
  { title: 'Match Maker', period: '10/2023 – 11/2023', stack: 'ASP.NET 6 · SignalR', image: img('matchmaker'), link: 'https://gitlab.com/my-swp-group/matchmaker.git' },
  { title: 'Children Care', period: '09/2023 – 11/2023', stack: 'Java Servlet · JDBC', image: img('childrencare'), link: 'https://gitlab.com/my-swp-group/swp391-children-care.git' },
];

export const skills = [
  { title: 'Languages', primary: ['Java', 'TypeScript', 'JavaScript', 'C#'], secondary: ['Python', 'SQL'] },
  { title: 'Backend', primary: ['Spring Boot', 'Node.js', 'ASP.NET Core'], secondary: ['Fastify', 'Express', 'Kafka', 'RabbitMQ', 'Camunda'] },
  { title: 'Frontend', primary: ['React', 'Angular', 'Vue', 'Next.js'], secondary: ['Tailwind', 'Bootstrap'] },
  { title: 'Data', primary: ['Oracle', 'SQL Server', 'PostgreSQL'], secondary: ['MySQL', 'MongoDB', 'Redis', 'Supabase'] },
  { title: 'Platform', primary: ['Docker', 'Git', 'CI/CD'], secondary: ['GitLab CI', 'AWS', 'Vercel', 'Linux'] },
  { title: 'Practice', primary: ['Microservices', 'REST', 'Design patterns'], secondary: ['Clean Architecture', 'CQRS', 'Agile'] },
];

export const education = [
  { period: '2025 — Present', degree: 'Master of Software Engineering', school: 'FSB Institute of Management & Technology' },
  { period: '2021 — 2025', degree: 'B.Sc. Software Engineering', school: 'FPT University · GPA 3.5 / 4' },
  { period: '2023 — 2025', degree: 'Business Certificate', school: 'FUNiX' },
];

export const awards = [
  { year: '2024', title: 'Top 10 Finalist — VPBank Technology Hackathon 2025' },
  { year: '2023', title: 'Techcombank Scholarship for Best Project' },
  { year: '2022', title: 'Academic Scholarship — FPT University' },
];

export const certs = [
  { title: 'Managing an Agile Team', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/WN2ME48XMA8E' },
  { title: 'Agile Meets Design Thinking', year: '2026', url: 'https://www.coursera.org/account/accomplishments/verify/TEZT11I8OL8K' },
  { title: 'Project Management Principles & Practices', year: '2024', url: 'https://coursera.org/share/e65df82224a67bb2616c8e763785974b' },
  { title: 'Academic English: Writing', year: '2024', url: 'https://coursera.org/share/d14f1d9a8e3d6d982113f62e2e1d3a8e' },
  { title: 'Software Development Lifecycle', year: '2023', url: 'https://coursera.org/share/c70a8b9308f0ecd6d345860e3e4a37b2' },
  { title: 'Web Design', year: '2023', url: 'https://coursera.org/share/8b05247d276386ced9e1fb27478cbc58' },
  { title: 'Computer Communications', year: '2022', url: 'https://coursera.org/share/5d2103f79b9fb228110ab22a49001871' },
];
