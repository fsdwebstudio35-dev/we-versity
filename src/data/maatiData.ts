export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tags: string[];
  deliverables: string[];
  technologies: string[];
  idealFor: string;
  startingPrice: string;
  turnaroundTime: string;
  features: { title: string; desc: string }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'saas' | 'ecommerce' | 'web' | 'mobile' | 'enterprise';
  categoryLabel: string;
  client: string;
  location: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  tags: string[];
  image: string;
  demoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  countryCode: string;
  rating: number;
  content: string;
  avatar: string;
  projectType: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  date: string;
  tags: string[];
}

export const COMPANY_INFO = {
  name: "WeVersity",
  legalName: "WeVersity Technologies (Pvt) Ltd",
  tagline: "Websites & Software That Mean Business",
  subtagline: "Empowering businesses worldwide through high-performance web development, custom software engineering, and digital growth.",
  foundedYear: 2016,
  phone: "+92 301 9249721",
  whatsappNumber: "923019249721",
  email: "info@weversity.com",
  secondaryEmail: "info@weversitynologies.pk",
  supportEmail: "support@weversity.com",
  headquarters: {
    title: "Lahore Headquarters",
    address: "Turner Road, Off Mall Road, Garhi Shahu, Lahore, Punjab 54000, Pakistan",
    phone: "+92 301 9249721",
    hours: "Mon - Sat: 9:00 AM - 7:00 PM PKT"
  },
  ukOffice: {
    title: "United Kingdom Liaison",
    address: "Kemp House, 160 City Road, London, EC1V 2NX, United Kingdom",
    phone: "+44 20 8123 7942",
    hours: "Mon - Fri: 9:00 AM - 5:30 PM GMT"
  },
  stats: [
    { value: "250+", label: "Delivered Projects" },
    { value: "99.2%", label: "Client Satisfaction" },
    { value: "8+", label: "Years of Excellence" },
    { value: "14+", label: "Countries Served" }
  ],
  socials: {
    linkedin: "https://www.linkedin.com/company/weversity",
    facebook: "https://www.facebook.com/weversity",
    github: "https://github.com/weversity",
    clutch: "https://clutch.co/profile/maati-technologies"
  }
};

export const TECH_STACK = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Laravel", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Flutter", category: "Mobile" },
  { name: "Node.js", category: "Backend" },
  { name: "WordPress", category: "CMS" },
  { name: "WooCommerce", category: "E-Commerce" },
  { name: "Shopify", category: "E-Commerce" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MySQL", category: "Database" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS Cloud", category: "DevOps" }
];

export const SERVICES: ServiceItem[] = [];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "pizza-express-platform",
    title: "Pizza Express & Food Delivery Web App",
    category: "ecommerce",
    categoryLabel: "Food Ordering & E-Commerce",
    client: "Pizza Express App",
    location: "Live on Vercel",
    year: "2024",
    summary: "High-speed interactive pizza ordering and food delivery web application featuring real-time menu browsing, crust and toppings customizer, and instantaneous checkout.",
    challenge: "Designing an ultra-responsive, mobile-first fast-food ordering system with instantaneous cart feedback, topping selections, and sub-second load times.",
    solution: "Engineered a high-performance modern React and Tailwind CSS web app deployed on Vercel with instant state synchronization, optimized visuals, and streamlined checkout.",
    results: [
      { metric: "100%", label: "Lighthouse Performance" },
      { metric: "<0.8s", label: "Instant Menu Load" },
      { metric: "4.9★", label: "User Satisfaction" }
    ],
    tags: ["React", "Tailwind CSS", "Food Delivery", "E-Commerce", "Vercel"],
    image: "/assets/aistudio/image_0c0bc5ad.png",
    demoUrl: "https://pizza-az2a-i6p.vercel.app/"
  },
  {
    id: "abdullah-developer-portal",
    title: "Abdullah Developer | Creative Portfolio & Showcase",
    category: "web",
    categoryLabel: "High-Performance Web Portal",
    client: "Abdullah Developer",
    location: "Live on Vercel",
    year: "2024",
    summary: "High-end interactive creative director and full-stack developer portfolio showcase featuring dark luxury aesthetic, dynamic project case studies, and fluid responsive interactions.",
    challenge: "Designing an ultra-clean, high-aesthetic developer showcase with rich typography, custom dark-mode styling, sub-second load times, and progressive web app (PWA) readiness.",
    solution: "Engineered a modern React and Tailwind CSS digital showcase deployed on Vercel with optimized typography, service worker caching, and seamless cross-device responsiveness.",
    results: [
      { metric: "100%", label: "Lighthouse Performance" },
      { metric: "<0.6s", label: "Instant Load Speed" },
      { metric: "PWA", label: "Offline-Ready Architecture" }
    ],
    tags: ["React", "Tailwind CSS", "Portfolio", "Dark Mode", "Vercel", "PWA"],
    image: "/assets/aistudio/Screenshot_2026-10-31_102143_c6a481c6.png",
    demoUrl: "https://mustafa-k4nx.vercel.app/"
  },
  {
    id: "fahad-portfolio-webapp",
    title: "Fahad Portfolio & Modern Web Platform",
    category: "web",
    categoryLabel: "High-Performance Web Portal",
    client: "Fahad Developer",
    location: "Live on Vercel",
    year: "2024",
    summary: "A high-speed interactive developer portfolio and web platform featuring modern design aesthetics, responsive component architecture, and fluid transitions.",
    challenge: "Developing a blazing-fast, responsive web portal with modern UI interactions, sub-second initial load, and seamless cross-platform deployment.",
    solution: "Engineered with React and modern Tailwind CSS on Vercel edge infrastructure, ensuring zero latency, optimized assets, and clean modular code.",
    results: [
      { metric: "100%", label: "Lighthouse Performance" },
      { metric: "<0.5s", label: "Fast Page Load" },
      { metric: "100%", label: "Mobile Responsive" }
    ],
    tags: ["React", "Tailwind CSS", "Portfolio", "Web Dev", "Vercel"],
    image: "/assets/aistudio/image_9ff0a784.png",
    demoUrl: "https://fahad-al98.vercel.app/"
  },
  {
    id: "taibe-web-developer-portal",
    title: "~ℳ.𝒯𝒶𝒾𝒷ℯ | Modern Web Platform & Portal",
    category: "web",
    categoryLabel: "High-Performance Web Portal",
    client: "~ℳ.𝒯𝒶𝒾𝒷ℯ",
    location: "Live on Vercel",
    year: "2024",
    summary: "Modern interactive web developer platform and responsive web application engineered by ~ℳ.𝒯𝒶𝒾𝒷ℯ with clean frontend architecture, fluid interactions, and high-performance engineering.",
    challenge: "Developing a high-speed, modern responsive web experience with optimized assets, seamless UI responsiveness, and edge deployment.",
    solution: "Built with React, modern styling, modular component design, and sub-second delivery hosted live on Vercel edge infrastructure.",
    results: [
      { metric: "100%", label: "Lighthouse Performance" },
      { metric: "<0.5s", label: "Page Load Speed" },
      { metric: "100%", label: "Mobile Responsive" }
    ],
    tags: ["React", "Website Development", "Modern UI", "AI Systems", "Vercel"],
    image: "/assets/aistudio/image_03e15199.png",
    demoUrl: "https://web-develpor-lgdu.vercel.app/"
  },
  {
    id: "shahab-web-developer-portal",
    title: "Muhammad Shahab | Modern Web & LinkedIn Platform",
    category: "web",
    categoryLabel: "High-Performance Web Portal",
    client: "By Muhammad Shahab",
    location: "Live on Vercel",
    year: "2024",
    summary: "Modern interactive web developer platform and LinkedIn ecosystem showcase engineered by Muhammad Shahab with clean frontend architecture, fluid interactions, and high-performance engineering.",
    challenge: "Developing a high-speed, modern responsive web experience with optimized assets, seamless UI responsiveness, and edge deployment.",
    solution: "Built with React, modern styling, modular component design, and sub-second delivery hosted live on Vercel edge infrastructure.",
    results: [
      { metric: "100%", label: "Lighthouse Performance" },
      { metric: "<0.5s", label: "Page Load Speed" },
      { metric: "100%", label: "Mobile Responsive" }
    ],
    tags: ["React", "Web Development", "LinkedIn Mastery", "Modern UI", "Vercel"],
    image: "/assets/aistudio/image_03e15199.png",
    demoUrl: "https://abdullah-wab-developer-2cr3.vercel.app/"
  },
  {
    id: "modern-web-developer-tau",
    title: "Modern Web Developer | Interactive Showcase",
    category: "web",
    categoryLabel: "High-Performance Web Portal",
    client: "Tau Developer",
    location: "Live on Vercel",
    year: "2024",
    summary: "Interactive web developer platform and responsive application with clean architecture, fluid animations, and high-performance frontend engineering.",
    challenge: "Developing a blazing-fast, mobile-first portfolio with optimized delivery and modern UI interactions.",
    solution: "Engineered with React and Tailwind CSS on Vercel edge infrastructure, ensuring sub-second load times.",
    results: [
      { metric: "100%", label: "Lighthouse Performance" },
      { metric: "<0.5s", label: "Page Load Speed" },
      { metric: "100%", label: "Mobile Responsive" }
    ],
    tags: ["React", "Web Development", "Modern UI", "Vercel"],
    image: "/assets/aistudio/image_eaa41339.png",
    demoUrl: "https://web-developer-tau-two.vercel.app/"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "James Harrington",
    role: "Managing Director",
    company: "PropertyVault UK",
    location: "London, United Kingdom",
    countryCode: "GB",
    rating: 5,
    content: "WeVersity transformed our online presence completely. Our previous website was sluggish and bloated. The team re-architected everything from scratch — our mobile load speed dropped from 7 seconds to under one second, and our inbound leads skyrocketed. They are true software craftsmen who understand real business outcomes.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    projectType: "Custom Web Application & SEO"
  },
  {
    id: "test-2",
    name: "Hamza Tariq",
    role: "Chief Operating Officer",
    company: "AgriPak Supply Chain",
    location: "Lahore, Pakistan",
    countryCode: "PK",
    rating: 5,
    content: "Working with WeVersity on our multi-branch ERP was the best technology investment we made. Having their engineering team right here in Lahore made communication and on-site training seamless. The software handles 20,000 daily transactions without breaking a sweat.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    projectType: "Enterprise Laravel ERP & Mobile POS"
  },
  {
    id: "test-3",
    name: "Elena Rostova",
    role: "Product Director",
    company: "Apex Digital Cloud",
    location: "Toronto / London",
    countryCode: "CA",
    rating: 5,
    content: "Finding a dev team that genuinely writes clean, unbloated code is rare. WeVersity took our complex web portal blueprint and delivered a modern platform with zero downtime. Transparent, responsive, and exceptionally skilled in modern React and cloud deployment.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    projectType: "Modern Web Platform & Architecture"
  },
  {
    id: "test-4",
    name: "Usman Ghani",
    role: "Managing Director",
    company: "Luxuria Décor",
    location: "Dubai, UAE",
    countryCode: "AE",
    rating: 5,
    content: "Our WooCommerce store was losing customers due to slow checkout times. WeVersity stripped away all the bloated third-party plugins, custom-coded our theme, and implemented lightning-fast payment routing. Our sales increased by over 300% in the first quarter.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    projectType: "Custom WooCommerce Architecture"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why Custom-Coded Websites Beat Heavy Page Builders in 2026",
    slug: "why-custom-code-beats-page-builders",
    excerpt: "Discover why relying on heavy drag-and-drop page builders hurts your Google Core Web Vitals, inflates server expenses, and costs you conversions.",
    category: "Web Engineering",
    readTime: "5 min read",
    date: "March 15, 2026",
    tags: ["Performance", "Web Dev", "Core Web Vitals"],
    author: {
      name: "Rehan Ahmad",
      role: "Lead Web Developer",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181050_3b66291a.png"
    },
    content: [
      "For years, agency teams leaned on heavy visual drag-and-drop website builders like Elementor, Divi, or generic multipurpose themes to rapidly pump out client websites. But as Google tightened its Core Web Vitals criteria in 2024-2026, the cracks in that shortcut approach have widened into canyons.",
      "A typical page builder loads 40 to 60 redundant CSS files, 20+ render-blocking JavaScript files, and bloated inline scripts for simple tasks like displaying a 3-column feature grid. The browser is forced to parse tens of thousands of lines of unnecessary DOM nodes before rendering the first meaningful pixel.",
      "At WeVersity, our engineering thesis is simple: Write clean, purpose-built code. By building with modern frameworks like React, Next.js, or clean semantic PHP templates with Tailwind CSS, we eliminate 90% of payload bloat.",
      "The result? Sub-second loading speeds on 4G cellular connections, 95+ PageSpeed scores on mobile, higher conversion rates, and a resilient digital foundation that never breaks on an unexpected plugin auto-update."
    ]
  },
  {
    id: "blog-2",
    title: "Scaling SaaS MVPs: Single-Tenant vs Multi-Tenant Architecture",
    slug: "scaling-saas-mvps-single-vs-multi-tenant",
    excerpt: "A comprehensive guide on structuring your database, tenant isolation, and billing infrastructure when launching a B2B SaaS platform.",
    category: "Cloud & SaaS",
    readTime: "7 min read",
    date: "February 28, 2026",
    tags: ["SaaS", "Laravel", "Database Architecture"],
    author: {
      name: "Ali Raza",
      role: "CTO & Co-Founder",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },
    content: [
      "One of the earliest architectural dilemmas founders bring to us at WeVersity is whether to adopt a multi-tenant shared database architecture or a database-per-tenant isolation model.",
      "For 90% of early-stage SaaS ventures, shared database multi-tenancy with strict scoped global queries (e.g., using Laravel's tenant scopes) offers the sweet spot between low hosting costs, simplified database migrations, and rapid feature iteration.",
      "However, if your target market is enterprise finance, healthcare, or government entities requiring strict compliance, a dedicated database or schema-per-tenant pattern becomes non-negotiable.",
      "In this breakdown, we detail how we integrate automated Stripe webhooks, Redis job queues, and tenant routing to ensure high throughput and zero data leaks."
    ]
  },
  {
    id: "blog-3",
    title: "The 2026 Local SEO & GEO Blueprint for UK & Pakistani Businesses",
    slug: "local-seo-and-geo-blueprint-2026",
    excerpt: "How to dominate Google's Local 3-Pack and ensure your company is cited by AI search engines like ChatGPT, Gemini, and Perplexity.",
    category: "Digital Marketing",
    readTime: "6 min read",
    date: "January 14, 2026",
    tags: ["Local SEO", "AI Search", "GEO", "Rankings"],
    author: {
      name: "Zohaib Noman",
      role: "Senior SEO Strategist",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_184218_848ffe02.png"
    },
    content: [
      "Search is no longer just ten blue links. In 2026, prospective clients discover your business through Google's AI Overviews, Perplexity citations, and local Map Packs.",
      "To stand out, your website must communicate in machine-readable structured entities. That means deploying comprehensive JSON-LD schemas for your LocalBusiness, Service catalog, reviews, and verified founders.",
      "Furthermore, local citation consistency across British directories (Yell, Thomson Local) and Pakistani business indexes is crucial for geographic authority.",
      "Combine verified reviews with fast-loading location landing pages to secure your spot at the top of local search queries."
    ]
  }
];

export const FAQS = [
  {
    question: "How long has WeVersity been operating and where are you based?",
    answer: "WeVersity was founded in 2016. We operate our core engineering software house on Turner Road in Lahore, Pakistan, with a business liaison and client partnership presence in London, United Kingdom. We serve clients across Pakistan, the UK, Europe, Canada, and the Middle East."
  },
  {
    question: "Do you use ready-made page builders or write custom code?",
    answer: "We strongly champion custom, hand-crafted code. While we develop on popular CMS platforms like WordPress, we build custom lightweight block themes and plugins rather than bloated commercial drag-and-drop builders. For custom web apps, we utilize React, Next.js, and Laravel to deliver sub-second speeds, clean codebases, and zero vendor lock-in."
  },
  {
    question: "Who owns the intellectual property (IP) and source code?",
    answer: "You do — 100%. Upon project completion and final milestone clearance, we hand over full source code repository ownership, database dumps, and deployment credentials. You have complete legal freedom to host, scale, or expand the code wherever you wish."
  },
  {
    question: "How much does a typical project cost with WeVersity?",
    answer: "Our project pricing is transparent and based on scope complexity. Custom business websites generally start around $600 - $1,200. Complex e-commerce stores and custom Laravel applications start around $1,200 - $2,500, while full multi-tenant SaaS platforms and mobile apps range from $1,800 to $5,000+. You can use our interactive Cost Estimator for an instant breakdown!"
  },
  {
    question: "What happens after the website or software is launched?",
    answer: "Every project includes a complimentary 30 to 90-day post-launch warranty and hypercare period covering bug fixes, speed audits, and staff training. We also offer ongoing maintenance, SLA uptime monitoring, server security patching, and SEO growth retainers."
  },
  {
    question: "How do we get started with WeVersity?",
    answer: "Simply submit your inquiry through our online form, reach out on WhatsApp (+92 304 6446 541), or email info@weversity.com. We schedule a free 30-minute discovery call within 24 hours to discuss your requirements, provide architectural advice, and deliver a detailed scope proposal."
  }
];

export interface CourseItem {
  id: string;
  title: string;
  description: string;
  iconType: 'web' | 'laravel' | 'wordpress' | 'flutter' | 'woocommerce' | 'ecommerce' | 'office' | 'english' | 'ai' | 'seo';
  tags: string[];
  priceUSD: number;
  originalPriceUSD: number;
  discountPercent: number;
  duration: string;
  classesFormat: string;
  learningType: string;
  certificate: string;
  access: string;
  image: string;
  badge?: string;
  whatYouLearn: string[];
  features: string[];
}

export const COURSES: CourseItem[] = [
  {
    id: "claude-ai",
    title: "Claude AI Mastery",
    description: "Master Claude AI, advanced prompt engineering, Claude 3.5 Sonnet, AI workflow automation, and enterprise generative AI solutions.",
    iconType: "ai",
    tags: ["Claude AI", "Prompt Engineering", "LLMs", "AI Workflows"],
    priceUSD: 109,
    originalPriceUSD: 169,
    discountPercent: 35,
    duration: "4 Weeks",
    classesFormat: "Live Masterclass & Cohort",
    learningType: "Practical Hands-on Projects",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    badge: "CEO Special",
    image: "/assets/aistudio/course_web_dev.png",
    whatYouLearn: [
      "Master Anthropic Claude 3.5 Sonnet & next-gen AI prompting techniques",
      "Building production apps using Claude Code, Artifacts & API integrations",
      "Context window engineering, system prompting & few-shot reasoning",
      "Automating business workflows, code reviews, and enterprise agents",
      "Hands-on AI mentor sessions led directly by CEO Shahbaz Aslam"
    ],
    features: [
      "4 Weeks Duration",
      "Live Masterclass & Cohort",
      "Enterprise AI Projects",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Learn modern web development from scratch and build real-world projects with HTML, CSS and JavaScript.",
    iconType: "web",
    tags: ["HTML", "CSS", "JavaScript"],
    priceUSD: 99,
    originalPriceUSD: 149,
    discountPercent: 34,
    duration: "4 Weeks",
    classesFormat: "Live Online Classes",
    learningType: "Project Based Learning",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    badge: "Most Popular",
    image: "/assets/aistudio/course_web_dev.png",
    whatYouLearn: [
      "HTML5, CSS3, and modern responsive design",
      "JavaScript (ES6+) and DOM manipulation",
      "Build real-world projects (portfolio, landing page, etc.)",
      "Version control with Git & GitHub",
      "Mentored by senior web experts ~ℳ.𝒯𝒶𝒾𝒷ℯ, Rehan Ahmad & Zain Tariq",
      "Deploy your website online"
    ],
    features: [
      "4 Weeks Duration",
      "Live Online Classes",
      "Project Based Learning",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  },
  {
    id: "ai-for-hr-managers",
    title: "AI for HR and Managers: Hiring, Onboarding, and Compliance",
    description: "Harness modern AI tools to revolutionize hiring pipelines, candidate screening, automated onboarding, and strict HR legal compliance.",
    iconType: "ai",
    tags: ["AI for HR", "Hiring AI", "HR Compliance", "Onboarding Automation"],
    priceUSD: 119,
    originalPriceUSD: 179,
    discountPercent: 33,
    duration: "4 Weeks",
    classesFormat: "Live Masterclass & Practical Cohort",
    learningType: "Practical HR Workflows & AI Case Studies",
    certificate: "Executive HR & AI Certificate",
    access: "Lifetime Access",
    badge: "Executive",
    image: "/assets/aistudio/image_85a3982c.png",
    whatYouLearn: [
      "AI-driven recruitment: automated resume screening and candidate ranking",
      "Drafting hyper-targeted job descriptions and competency frameworks with AI",
      "Designing intelligent automated employee onboarding workflows and chatbots",
      "Ensuring bias mitigation, data privacy, and legal HR compliance in AI systems",
      "Hands-on mentoring led by senior specialist ~ℳ.𝒯𝒶𝒾𝒷ℯ",
      "Executive AI toolkits for people managers and organizational leadership"
    ],
    features: [
      "4 Weeks Duration",
      "Live Masterclass & Case Studies",
      "Ready-to-Use HR AI Prompts & Templates",
      "Executive HR & AI Certificate",
      "Lifetime Access"
    ]
  },
  {
    id: "linkedin-ecosystem-mastery",
    title: "LinkedIn Ecosystem Mastery: Organic & Paid (A to Z)",
    description: "Master high-ticket client acquisition, organic reach algorithms, executive personal branding, and high-ROI LinkedIn advertising.",
    iconType: "ecommerce",
    tags: ["LinkedIn Growth", "Organic Reach", "LinkedIn Ads", "Client Acquisition"],
    priceUSD: 99,
    originalPriceUSD: 159,
    discountPercent: 38,
    duration: "4 Weeks",
    classesFormat: "Live Masterclass & Growth Cohort",
    learningType: "Practical LinkedIn Campaigns & Outbound Funnels",
    certificate: "LinkedIn Ecosystem Mastery Certificate",
    access: "Lifetime Access",
    badge: "Trending",
    image: "/assets/aistudio/image_f804651e.png",
    whatYouLearn: [
      "Magnetic profile architecture: High-converting headline, banner, and featured sections",
      "Organic reach algorithms: Viral hooks, high-engagement carousels, and thought leadership",
      "Cold outreach frameworks & DM scripts to close high-ticket international clients",
      "LinkedIn Ads A to Z: Campaign setup, Matched Audiences, Lead Gen Forms & ROI tracking",
      "Hands-on mentoring led by Muhammad Shahab (By Muhammad Shahab)",
      "Ready-to-use outbound templates, client proposal decks & growth workflows"
    ],
    features: [
      "4 Weeks Duration",
      "Live Masterclass & Cohort",
      "Ready-to-Use Outreach Templates",
      "LinkedIn Ecosystem Mastery Certificate",
      "Lifetime Access"
    ]
  },
  {
    id: "ai-ecommerce-store",
    title: "AI-Powered E-commerce: Launch and Grow an Online Store",
    description: "Master AI-driven e-commerce, automated product research, AI marketing, and intelligent store scaling to launch a profitable online business.",
    iconType: "ecommerce",
    tags: ["AI E-commerce", "Shopify AI", "AI Marketing", "Store Automation"],
    priceUSD: 129,
    originalPriceUSD: 199,
    discountPercent: 35,
    duration: "4 Weeks",
    classesFormat: "Live Masterclass & Practical Cohort",
    learningType: "Practical AI Store Projects",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    badge: "New Launch",
    image: "/assets/aistudio/image_a068702f.png",
    whatYouLearn: [
      "AI-driven product research and competitive market analysis",
      "Building intelligent Shopify & WooCommerce stores with AI automation",
      "AI-powered content creation, product descriptions, and marketing assets",
      "Scaling store operations with AI chatbots and automated fulfillment",
      "Advanced AI advertising strategies for Meta, TikTok, and Google",
      "Hands-on mentoring led by senior strategist Sebastian Bui"
    ],
    features: [
      "4 Weeks Duration",
      "Live Masterclass & Cohort",
      "Practical AI Store Projects",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  },
  {
    id: "local-seo-master",
    title: "Local SEO Master Course",
    description: "Dominate Google's Local 3-Pack, optimize Google Business Profiles, and master technical SEO for regional dominance.",
    iconType: "seo",
    tags: ["Local SEO", "GBP Optimization", "Technical SEO", "Google Maps"],
    priceUSD: 89,
    originalPriceUSD: 139,
    discountPercent: 36,
    duration: "4 Weeks",
    classesFormat: "Live Masterclass & Hands-on Audit",
    learningType: "Practical Local SEO Projects",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    badge: "Bestseller",
    image: "/assets/aistudio/image_d7b57514.png",
    whatYouLearn: [
      "Mastering Google Business Profile (GBP) ranking factors for 2026",
      "Technical Local SEO audits: identifying crawl blocks & indexing issues",
      "NAP consistency & high-authority local citation building",
      "On-page Local SEO: Geo-targeted content & landing page architecture",
      "Review management strategies & localized backlink acquisition",
      "Hands-on mentoring led by Local SEO expert Zohaib Noman"
    ],
    features: [
      "4 Weeks Duration",
      "Live Online Masterclasses",
      "Real-World Audit Projects",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  },
  {
    id: "laravel-php",
    title: "Laravel & PHP",
    description: "Master Laravel and PHP to build powerful web applications with modern tools and best practices.",
    iconType: "laravel",
    tags: ["PHP", "Laravel", "MySQL"],
    priceUSD: 119,
    originalPriceUSD: 179,
    discountPercent: 33,
    duration: "6 Weeks",
    classesFormat: "Live Online Classes",
    learningType: "Project Based Learning",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    badge: "High Demand",
    image: "/assets/aistudio/course_web_dev.png",
    whatYouLearn: [
      "PHP 8 Object-Oriented Programming (OOP) & MVC architecture",
      "Laravel routing, Blade templating, Eloquent ORM & migrations",
      "Authentication, RBAC authorization, and API resource development",
      "Payment gateways (Stripe) & database indexing with MySQL",
      "Deploying Laravel apps to VPS / Cloud Run with Docker"
    ],
    features: [
      "6 Weeks Duration",
      "Live Online Classes",
      "Project Based Learning",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  },
  {
    id: "wordpress-shopify",
    title: "WordPress & Shopify",
    description: "Build and customize WordPress websites and eCommerce stores with WooCommerce and Shopify.",
    iconType: "wordpress",
    tags: ["WordPress", "WooCommerce", "Shopify"],
    priceUSD: 89,
    originalPriceUSD: 139,
    discountPercent: 36,
    duration: "4 Weeks",
    classesFormat: "Live Online Classes",
    learningType: "Project Based Learning",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    image: "/assets/aistudio/course_web_dev.png",
    whatYouLearn: [
      "WordPress CMS setup, theme customization, and plugin management",
      "Custom WooCommerce store architecture & payment gateway setup",
      "Shopify store launch, Liquid fundamentals, and product variants",
      "Speed optimization, caching, and checkout conversion tracking",
      "Client handover, maintenance, and freelancer business guide"
    ],
    features: [
      "4 Weeks Duration",
      "Live Online Classes",
      "Project Based Learning",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  },
  {
    id: "spoken-english",
    title: "Spoken English & Fluency",
    description: "Overcome hesitation and speak English fluently with confidence for job interviews, freelancing, and presentations.",
    iconType: "english",
    tags: ["Fluency", "Pronunciation", "Interviews", "Business English"],
    priceUSD: 59,
    originalPriceUSD: 99,
    discountPercent: 40,
    duration: "4 Weeks",
    classesFormat: "Interactive Speaking Practice",
    learningType: "1-on-1 & Group Speaking",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    badge: "Popular",
    image: "/assets/aistudio/course_web_dev.png",
    whatYouLearn: [
      "Daily conversational speaking practice and pronunciation drills",
      "Overcoming fear and speaking hesitation with live interactive sessions",
      "Essential practical grammar, sentence structure, and active vocabulary",
      "Freelancer client communication, proposal writing, and video call English",
      "Job interview preparation, resume pitch, and answering tricky questions",
      "Public speaking fundamentals, presentation delivery, and accent training"
    ],
    features: [
      "4 Weeks Duration",
      "Live Interactive Speaking",
      "Roleplays & Speech Practice",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  },
  {
    id: "basic-editing-skills",
    title: "Basic Editing Skills",
    description: "Master the fundamentals of video and image editing using modern tools like CapCut, Canva, and Adobe Express for content creation.",
    iconType: "office",
    tags: ["Video Editing", "Canva", "CapCut", "Content Creation"],
    priceUSD: 49,
    originalPriceUSD: 79,
    discountPercent: 38,
    duration: "4 Weeks",
    classesFormat: "Live Online Workshops",
    learningType: "Practical Content Projects",
    certificate: "Certificate of Completion",
    access: "Lifetime Access",
    badge: "New Launch",
    image: "/assets/aistudio/course_web_dev.png",
    whatYouLearn: [
      "Fundamentals of non-linear video editing and timeline management",
      "Color correction, transitions, and audio synchronization for social media",
      "Graphic design basics using Canva and professional layout techniques",
      "Creating high-impact short-form content for TikTok, Reels, and YouTube",
      "Export settings for different platforms and optimized file formats"
    ],
    features: [
      "4 Weeks Duration",
      "Practical Hands-on Projects",
      "Live Feedback Sessions",
      "Certificate of Completion",
      "Lifetime Access"
    ]
  }
];

export interface Teacher {
  id: string;
  name: string;
  role: string;
  specialization: string;
  category: 'all' | 'web' | 'backend' | 'mobile' | 'ecommerce' | 'english' | 'office' | 'ai' | 'seo';
  categoryLabel: string;
  experience: string;
  studentsCount: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  bio: string;
  primaryCourse: string;
  assignedCourses: string[];
  skills: string[];
  highlights: string[];
  socials?: {
    linkedin?: string;
    github?: string;
  };
}

export const TEACHERS: Teacher[] = [
  {
    id: "shahbaz-aslam",
    name: "Shahbaz Aslam",
    role: "CEO & Founder | Lead Claude AI Instructor",
    specialization: "Claude AI, Prompt Engineering & Enterprise Generative AI",
    category: "ai",
    categoryLabel: "CEO & Claude AI",
    experience: "10+ Years",
    studentsCount: "2,500+",
    rating: 5.0,
    reviewsCount: 485,
    avatar: "/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png",
    bio: "Chief Executive Officer & Founder of WeVersity. Industry pioneer in Claude AI architectures, Anthropic LLM prompting, automated development workflows, and enterprise generative AI solutions with 10+ years of tech leadership.",
    primaryCourse: "Claude AI Mastery",
    assignedCourses: ["Claude AI Mastery", "Generative AI Engineering", "AI Productivity for Developers"],
    skills: ["Claude 3.5 Sonnet", "Prompt Engineering", "Anthropic Claude API", "LLM Workflows", "AI Automation", "Enterprise Architecture"],
    highlights: ["CEO & Founder of WeVersity", "10+ Years Tech Leadership & Strategy", "Trained 2,500+ Professionals & Developers"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    id: "rehan-ahmad",
    name: "Rehan Ahmad",
    role: "Lead Web Developer & Instructor",
    specialization: "Modern Web Development, HTML5, CSS3, JavaScript & Responsive Design",
    category: "web",
    categoryLabel: "Web Development",
    experience: "7+ Years",
    studentsCount: "1,500+",
    rating: 4.98,
    reviewsCount: 395,
    avatar: "/assets/aistudio/Screenshot_2026-10-30_181050_3b66291a.png",
    bio: "Senior Web Developer with 7+ years of experience in production web engineering. Specializes in modern responsive web development, HTML5, CSS3, JavaScript, clean code standards, and practical hands-on project mentoring.",
    primaryCourse: "Web Development",
    assignedCourses: ["Web Development", "Modern Frontend Engineering", "Responsive UI & Web Design"],
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Bootstrap", "Git & GitHub", "Responsive Web Design"],
    highlights: ["Senior Web Developer with 7+ Years Experience", "Mentored 1,500+ Web Development Students", "100% Practical Project-Based Teaching"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    id: "zain-tariq",
    name: "Zain Tariq",
    role: "Senior Web Developer & Instructor",
    specialization: "Modern Web Development, HTML5, CSS3, JavaScript & Full-Stack Apps",
    category: "web",
    categoryLabel: "Web Development",
    experience: "6+ Years",
    studentsCount: "1,200+",
    rating: 4.97,
    reviewsCount: 320,
    avatar: "/assets/aistudio/Screenshot_2026-10-30_181903_ee378270.png",
    bio: "Senior Web Developer with 6+ years of hands-on experience building clean, responsive web platforms and dynamic client web apps. Dedicated instructor committed to helping students master modern web development from fundamentals to live deployment.",
    primaryCourse: "Web Development",
    assignedCourses: ["Web Development", "Frontend Web Mastery", "Full-Stack Web Projects"],
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Bootstrap", "Git & GitHub", "REST APIs"],
    highlights: ["Senior Web Developer with 6+ Years Experience", "Mentored 1,200+ Web Development Students", "100% Practical Hands-on Learning"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com"
    }
  },
  {
    id: "m-taibe",
    name: "~ℳ.𝒯𝒶𝒾𝒷ℯ",
    role: "Senior Web Developer & AI Corporate Trainer",
    specialization: "Website Development & AI for HR, Hiring & Compliance",
    category: "web",
    categoryLabel: "Web Dev & HR AI",
    experience: "7+ Years",
    studentsCount: "1,450+",
    rating: 4.99,
    reviewsCount: 380,
    avatar: "/assets/aistudio/image_85a3982c.png",
    bio: "Senior Web Developer and corporate AI trainer specializing in modern responsive website development, frontend architectures, and executive AI training for HR managers (hiring, onboarding, and compliance).",
    primaryCourse: "Website Development & AI for HR",
    assignedCourses: ["Website Development", "AI for HR and Managers: Hiring, Onboarding, and Compliance", "Modern Web Platforms"],
    skills: ["Website Development", "AI for HR", "Hiring Automation", "HR Compliance", "React", "HTML5/CSS3", "JavaScript", "Vercel"],
    highlights: ["Senior Web Developer & AI Corporate Specialist", "Instructor for Website Development & HR AI", "Built and Deployed High-Impact Live Web Portals"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://web-develpor-lgdu.vercel.app/"
    }
  },
  {
    id: "muhammad-shahab",
    name: "Muhammad Shahab",
    role: "LinkedIn Growth Strategist & Web Developer",
    specialization: "LinkedIn Ecosystem Mastery (Organic & Paid) & Modern Web Development",
    category: "ecommerce",
    categoryLabel: "LinkedIn & Growth",
    experience: "6+ Years",
    studentsCount: "1,150+",
    rating: 4.98,
    reviewsCount: 310,
    avatar: "/assets/aistudio/image_f804651e.png",
    bio: "Senior LinkedIn strategist and web developer. Specialist in organic and paid LinkedIn ecosystem growth, high-ticket client acquisition, personal branding, and high-performance modern web platforms.",
    primaryCourse: "LinkedIn Ecosystem Mastery: Organic & Paid (A to Z)",
    assignedCourses: ["LinkedIn Ecosystem Mastery: Organic & Paid (A to Z)", "Web Development", "B2B Client Acquisition"],
    skills: ["LinkedIn Organic Growth", "LinkedIn Ads", "Personal Branding", "High-Ticket Client Acquisition", "Web Development", "Vercel"],
    highlights: ["LinkedIn Growth Strategist & Web Developer", "Instructor for LinkedIn Ecosystem Mastery: Organic & Paid (A to Z)", "Built & Deployed Live Platform on Vercel"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://abdullah-wab-developer-2cr3.vercel.app/"
    }
  },

  {
    id: "zohaib-noman",
    name: "Zohaib Noman",
    role: "Senior SEO Strategist & Local SEO Expert",
    specialization: "Local SEO Master Course & Search Engine Dominance",
    category: "seo",
    categoryLabel: "SEO & Growth",
    experience: "7+ Years",
    studentsCount: "1,350+",
    rating: 4.98,
    reviewsCount: 295,
    avatar: "/assets/aistudio/Screenshot_2026-10-30_184218_848ffe02.png",
    bio: "Senior SEO strategist and Local SEO specialist with 7+ years of experience helping businesses dominate local search results, optimize Google Business Profiles, and implement advanced technical SEO frameworks.",
    primaryCourse: "Local SEO Master Course",
    assignedCourses: ["Local SEO Master Course", "Technical SEO Audits", "Search Engine Optimization"],
    skills: ["Local SEO", "Google Business Profile", "Technical SEO", "SEO Audits", "Keyword Research", "Citation Building"],
    highlights: ["Senior SEO Strategist & Local SEO Expert", "Instructor for Local SEO Master Course", "Ranked 100+ Businesses in Local 3-Pack"],
    socials: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "sebastian-bui",
    name: "Sebastian Bui",
    role: "Senior E-Commerce Strategist & AI Specialist",
    specialization: "AI-Powered E-commerce, Launch and Grow Online Stores",
    category: "ecommerce",
    categoryLabel: "AI E-Commerce",
    experience: "8+ Years",
    studentsCount: "1,800+",
    rating: 4.99,
    reviewsCount: 410,
    avatar: "/assets/aistudio/image_a068702f.png",
    bio: "Senior E-Commerce strategist and AI specialist with 8+ years of experience in building and scaling online stores using intelligent automation, AI-driven marketing, and high-performance e-commerce platforms.",
    primaryCourse: "AI-Powered E-commerce: Launch and Grow an Online Store",
    assignedCourses: ["AI-Powered E-commerce: Launch and Grow an Online Store", "E-Commerce & Dropshipping", "AI Marketing Strategies"],
    skills: ["AI E-commerce", "Shopify AI", "Meta Ads", "Store Automation", "Product Research", "AI Marketing"],
    highlights: ["Senior E-Commerce Strategist & AI Specialist", "Instructor for AI-Powered E-commerce", "Built & Scaled Multiple 7-Figure Online Stores"],
    socials: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "ayesha-noor",
    name: "Ms. Ayesha Noor",
    role: "Senior Corporate Trainer & English Coach",
    specialization: "Spoken English, Fluency & Client Communication",
    category: "english",
    categoryLabel: "Communication & English",
    experience: "6+ Years",
    studentsCount: "2,100+",
    rating: 4.99,
    reviewsCount: 680,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Certified ESL corporate communications trainer. Dedicated to transforming non-native speakers into confident, fluent communicators capable of pitching international clients and excelling in remote interviews.",
    primaryCourse: "Spoken English & Fluency",
    assignedCourses: ["Spoken English & Fluency", "Freelance Communication", "Interview Preparation"],
    skills: ["Public Speaking", "Pronunciation", "Accent Neutralization", "Business English", "Interview Coaching"],
    highlights: ["2,100+ Students Transformed", "Corporate Trainer for Multinational Teams", "Friendly & Supportive Class Environment"],
    socials: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "natasha-arshad",
    name: "Natasha Arshad",
    role: "Senior Content Creator & Editing Specialist",
    specialization: "Video Editing, Digital Content Strategy & Visual Storytelling",
    category: "office",
    categoryLabel: "Editing & Content",
    experience: "7+ Years",
    studentsCount: "1,450+",
    rating: 4.98,
    reviewsCount: 310,
    avatar: "/assets/aistudio/image_46cdf4b9.png",
    bio: "Senior digital content specialist with 7+ years of experience in professional video editing and visual design. Expert in transforming raw footage into high-impact social media assets and corporate presentations.",
    primaryCourse: "Basic Editing Skills",
    assignedCourses: ["Basic Editing Skills", "Social Media Content Strategy", "Digital Design Basics"],
    skills: ["Video Editing", "CapCut", "Canva", "Adobe Express", "Content Strategy", "Visual Storytelling"],
    highlights: ["Senior Editing Specialist with 7+ Years Experience", "Mentored 1,400+ Content Creators", "Expert in Viral Short-Form Content"],
    socials: {
      linkedin: "https://linkedin.com"
    }
  },
];

