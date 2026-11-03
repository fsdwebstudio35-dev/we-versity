export interface OfficeInfo {
  label: string;
  city: string;
  title: string;
  address: string;
  phone: string;
  hours: string;
  specialtyLabel: string;
  specialtyValue: string;
}

export interface PrincipleItem {
  id: string;
  title: string;
  desc: string;
  icon: 'Code2' | 'ShieldCheck' | 'Cpu' | 'Clock' | 'Sparkles';
}

export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  desc: string;
}

export interface LeaderItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface AboutData {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  offices: {
    lahore: OfficeInfo;
    london: OfficeInfo;
  };
  principles: PrincipleItem[];
  milestones: MilestoneItem[];
  leadership: LeaderItem[];
  cta: {
    title: string;
    desc: string;
    buttonText: string;
  };
}

export const DEFAULT_ABOUT_DATA: AboutData = {
  hero: {
    badge: "About WeVersity • Since 2016",
    title: "Software Craftsmen Who Believe in Code That Works.",
    subtitle: "Operating from Lahore, Pakistan with international liaison in London, UK, WeVersity exists to rid the web of bloated, slow templates and replace them with resilient, high-speed digital engineering."
  },
  offices: {
    lahore: {
      label: "Principal Engineering Hub",
      city: "Lahore, Pakistan",
      title: "Lahore Headquarters",
      address: "Turner Road, Off Mall Road, Garhi Shahu, Lahore, Punjab 54000, Pakistan",
      phone: "+92 301 9249721",
      hours: "Mon - Sat: 9:00 AM - 7:00 PM PKT",
      specialtyLabel: "Core Disciplines",
      specialtyValue: "Full-Stack Laravel, React, Flutter, Database Architecture"
    },
    london: {
      label: "European Client Liaison",
      city: "London, United Kingdom",
      title: "United Kingdom Liaison",
      address: "Kemp House, 160 City Road, London, EC1V 2NX, United Kingdom",
      phone: "+44 20 8123 7942",
      hours: "Mon - Fri: 9:00 AM - 5:30 PM GMT",
      specialtyLabel: "Core Focus",
      specialtyValue: "Strategic Partnerships, Product Discovery, UK Regulatory Standards"
    }
  },
  principles: [
    {
      id: "principle-1",
      icon: "Code2",
      title: "Zero Page-Builder Bloat",
      desc: "We write hand-crafted, clean semantic code. No 40-plugin headaches or sluggish visual page builders."
    },
    {
      id: "principle-2",
      icon: "ShieldCheck",
      title: "100% Client IP Ownership",
      desc: "You own all code repositories, database schemas, and digital assets. No vendor lock-in or licensing traps."
    },
    {
      id: "principle-3",
      icon: "Cpu",
      title: "Performance by Default",
      desc: "Sub-second load times and 95+ Core Web Vitals scores built into every page layout and backend query."
    },
    {
      id: "principle-4",
      icon: "Clock",
      title: "Transparent Sprints",
      desc: "Weekly staging demos, continuous communication, and clear milestone deliverables with zero surprises."
    }
  ],
  milestones: [
    {
      id: "milestone-1",
      year: "2016",
      title: "Founding in Lahore, Pakistan",
      desc: "WeVersity was founded on Turner Road, Lahore with a core focus on custom web development and PHP software for forward-looking local businesses."
    },
    {
      id: "milestone-2",
      year: "2018",
      title: "Expansion into Laravel & E-Commerce",
      desc: "Scaled our engineering department to deliver enterprise Laravel portals and high-performance WooCommerce architectures with sub-second speeds."
    },
    {
      id: "milestone-3",
      year: "2020",
      title: "UK Operations & Cross-Border Delivery",
      desc: "Opened our London liaison office to serve British and European clients with dedicated compliance and agile project management."
    },
    {
      id: "milestone-4",
      year: "2022",
      title: "Multi-Tenant SaaS & Flutter Mobile",
      desc: "Pioneered multi-tenant cloud architectures and cross-platform mobile apps for fast-growth startups across healthcare, logistics, and fintech."
    },
    {
      id: "milestone-5",
      year: "2024",
      title: "200+ Projects & Global Recognition",
      desc: "Surpassed 200 delivered platforms worldwide with a verified 5.0 rating on Clutch and continuous engineering partnerships."
    },
    {
      id: "milestone-6",
      year: "2026",
      title: "Generative Search & Enterprise Scalability",
      desc: "Empowering businesses with modern full-stack web applications, AI-ready structured knowledge bases (GEO), and ultra-resilient software systems."
    }
  ],
  leadership: [
    {
      id: "lead-1",
      name: "Shahbaz Aslam",
      role: "Chief Executive Officer & Founder",
      bio: "Founder of WeVersity leading global software engineering, enterprise AI transformation, and expert mentorship in Claude AI and intelligent systems.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png"
    },
    {
      id: "lead-2",
      name: "Rehan Ahmad",
      role: "Lead Web Developer",
      bio: "Specialist in modern web development, frontend architectures, responsive UI engineering, and sub-second Core Web Vitals optimization.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181050_3b66291a.png"
    },
    {
      id: "lead-3",
      name: "Zain Tariq",
      role: "Senior Web Developer & Instructor",
      bio: "6+ years crafting high-performance web applications, modern responsive UI systems, and mentoring next-generation developers in web engineering.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181903_ee378270.png"
    },
    {
      id: "lead-4",
      name: "~ℳ.𝒯𝒶𝒾𝒷ℯ",
      role: "Senior Web Developer & AI Corporate Trainer",
      bio: "Specializing in website development and executive AI training for HR managers (hiring, onboarding, and compliance).",
      avatar: "/assets/aistudio/image_85a3982c.png"
    },
    {
      id: "lead-5",
      name: "Muhammad Shahab",
      role: "LinkedIn Growth Strategist & Web Developer",
      bio: "Specialist in LinkedIn Ecosystem Mastery (Organic & Paid growth, high-ticket client acquisition) and modern responsive web systems.",
      avatar: "/assets/aistudio/image_f804651e.png"
    },
    {
      id: "lead-6",
      name: "Zohaib Noman",
      role: "Senior SEO Strategist & Local SEO Expert",
      bio: "7+ years helping businesses dominate local search results and optimize Google Business Profiles for regional dominance.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_184218_848ffe02.png"
    },
    {
      id: "lead-7",
      name: "Sebastian Bui",
      role: "Senior E-Commerce Strategist & AI Specialist",
      bio: "8+ years scaling online stores with intelligent automation, AI-driven marketing, and high-performance e-commerce platforms.",
      avatar: "/assets/aistudio/image_a068702f.png"
    }
  ],
  cta: {
    title: "Meet the engineers building the next generation of web software.",
    desc: "Whether you need an on-site consultation at our Lahore office or a virtual discovery session from London, we are ready to partner.",
    buttonText: "Book a Free Technical Discovery Call"
  }
};
