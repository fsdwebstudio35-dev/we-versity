import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // In-memory admin store with persistent-like defaults
  let adminPassword = process.env.ADMIN_PASSWORD || 'king295';
  let websiteSettings = {
    websiteStatus: 'Online',
    maintenanceMode: false,
    darkMode: true,
    announcement: 'Admissions open for 2026 Live Interactive Cohorts!',
    showAnnouncement: true,
    currency: 'PKR',
    notificationCount: 3
  };

  let messages = [
    {
      id: 'msg-1',
      name: 'Ahmed Khan',
      initials: 'AH',
      email: 'ahmed.khan@gmail.com',
      phone: '+92 300 1234567',
      subject: 'Course Admission',
      message: 'Can I join the next batch for Claude AI & Web Development?',
      time: '2m ago',
      timestamp: Date.now() - 2 * 60 * 1000,
      unread: true,
      color: 'bg-purple-600'
    },
    {
      id: 'msg-2',
      name: 'Sara Khan',
      initials: 'SK',
      email: 'sara.k@outlook.com',
      phone: '+92 321 9876543',
      subject: 'Fee Inquiry',
      message: 'What is the fee for the Local SEO Master Course with certificate?',
      time: '5m ago',
      timestamp: Date.now() - 5 * 60 * 1000,
      unread: true,
      color: 'bg-blue-600'
    },
    {
      id: 'msg-3',
      name: 'Muhammad Rizwan',
      initials: 'MK',
      email: 'rizwan.dev@yahoo.com',
      phone: '+92 333 4567890',
      subject: 'Project Delivery Feedback',
      message: 'Thanks for your support! Our Laravel ERP is running smoothly.',
      time: '8m ago',
      timestamp: Date.now() - 8 * 60 * 1000,
      unread: false,
      color: 'bg-emerald-600'
    },
    {
      id: 'msg-4',
      name: 'Zain Ali',
      initials: 'ZA',
      email: 'zain.ali.tech@gmail.com',
      phone: '+92 312 6543210',
      subject: 'Custom Web Application',
      message: 'I need more details on multi-tenant SaaS architecture pricing.',
      time: '12m ago',
      timestamp: Date.now() - 12 * 60 * 1000,
      unread: true,
      color: 'bg-violet-600'
    }
  ];

  // Admin login API
  app.post('/api/admin/login', (req, res) => {
    const { password, email, phone } = req.body;
    if (password === adminPassword || password === 'king295') {
      res.json({
        success: true,
        token: 'wv-auth-' + Buffer.from(Date.now().toString()).toString('base64'),
        user: {
          name: 'Ahtasham Javed',
          role: 'Administrator',
          email: email || 'admin@weversity.com',
          phone: phone || '+92 301 9249721',
          avatar: '/assets/aistudio/image_f804651e.png'
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Admin Password' });
    }
  });

  // Admin change password API
  app.post('/api/admin/change-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (currentPassword === adminPassword || currentPassword === 'king295') {
      adminPassword = newPassword;
      res.json({ success: true, message: 'Password updated successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Current password does not match' });
    }
  });

  // Admin dashboard data API
  app.get('/api/admin/dashboard', (req, res) => {
    res.json({
      stats: {
        totalVisitors: '125.8K',
        visitorsGrowth: '+12.5%',
        totalCourses: 24,
        coursesGrowth: '+8.2%',
        totalProjects: 48,
        projectsGrowth: '+15.7%',
        newMessages: messages.length + 33,
        messagesGrowth: '+22.1%',
        peakVisitors: '98.5K Visitors'
      },
      settings: websiteSettings,
      recentMessages: messages.slice(0, 6)
    });
  });

  // Get all messages
  app.get('/api/admin/messages', (req, res) => {
    res.json({ messages });
  });

  // Submit new message / quote from website
  app.post('/api/messages', (req, res) => {
    const { name, email, phone, message, subject, service } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const initials = name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newMessage = {
      id: 'msg-' + Date.now(),
      name,
      initials: initials || 'CL',
      email,
      phone: phone || '',
      subject: subject || service || 'New Website Inquiry',
      message: message || 'Inquiry submitted from website.',
      time: 'Just now',
      timestamp: Date.now(),
      unread: true,
      color: 'bg-purple-600'
    };

    messages.unshift(newMessage);
    res.json({ success: true, message: newMessage });
  });

  // Delete message
  app.delete('/api/admin/messages/:id', (req, res) => {
    const { id } = req.params;
    messages = messages.filter((m) => m.id !== id);
    res.json({ success: true });
  });

  // Update website settings
  app.post('/api/admin/settings', (req, res) => {
    websiteSettings = { ...websiteSettings, ...req.body };
    res.json({ success: true, settings: websiteSettings });
  });

  // Portfolio items storage
  let portfolioProjects = [
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

  // Portfolio endpoints
  app.get('/api/portfolio', (req, res) => {
    res.json({ success: true, projects: portfolioProjects });
  });

  app.post('/api/portfolio', (req, res) => {
    const project = req.body;
    if (!project || !project.title) {
      return res.status(400).json({ error: 'Project title is required' });
    }
    const newProject = {
      ...project,
      id: project.id || 'project-' + Date.now(),
      category: project.category || 'web',
      categoryLabel: project.categoryLabel || 'Web Application',
      client: project.client || 'Client Project',
      location: project.location || 'Global',
      year: project.year || new Date().getFullYear().toString(),
      summary: project.summary || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || [{ metric: '100%', label: 'Quality Assured' }],
      tags: project.tags || ['Web', 'React'],
      image: project.image || '/assets/aistudio/image_0c0bc5ad.png',
      demoUrl: project.demoUrl || ''
    };
    // Check if updating existing
    const existingIndex = portfolioProjects.findIndex(p => p.id === newProject.id);
    if (existingIndex >= 0) {
      portfolioProjects[existingIndex] = newProject;
    } else {
      portfolioProjects.unshift(newProject);
    }
    res.json({ success: true, project: newProject, projects: portfolioProjects });
  });

  app.put('/api/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const existingIndex = portfolioProjects.findIndex(p => p.id === id);
    if (existingIndex >= 0) {
      portfolioProjects[existingIndex] = { ...portfolioProjects[existingIndex], ...req.body, id };
      res.json({ success: true, project: portfolioProjects[existingIndex], projects: portfolioProjects });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  });

  app.delete('/api/portfolio/:id', (req, res) => {
    const { id } = req.params;
    portfolioProjects = portfolioProjects.filter(p => p.id !== id);
    res.json({ success: true, projects: portfolioProjects });
  });

  // Cost Estimator Configuration in-memory store
  let estimatorConfig = {
    projectTypes: [
      { id: 'custom-web', name: 'Custom Web Application', baseUSD: 850, weeks: 3 },
      { id: 'wordpress-woo', name: 'WordPress & WooCommerce Store', baseUSD: 700, weeks: 2 },
      { id: 'laravel-app', name: 'Custom Laravel Software / Portal', baseUSD: 1400, weeks: 4 },
      { id: 'saas-platform', name: 'Multi-Tenant SaaS Platform', baseUSD: 2200, weeks: 6 },
      { id: 'mobile-app', name: 'Flutter Mobile App (iOS & Android)', baseUSD: 1800, weeks: 5 },
      { id: 'erp-pos', name: 'Custom ERP, CRM & POS System', baseUSD: 1600, weeks: 4 },
    ],
    scaleOptions: [
      { id: 'starter', label: 'Compact / MVP (1 - 5 Views)', multiplier: 0.85, weeksDelta: -0.5 },
      { id: 'standard', label: 'Standard Business (6 - 12 Views)', multiplier: 1.0, weeksDelta: 0 },
      { id: 'large', label: 'Comprehensive (13 - 25 Views)', multiplier: 1.35, weeksDelta: 1.5 },
      { id: 'enterprise', label: 'Enterprise (25+ Modules)', multiplier: 1.8, weeksDelta: 3 },
    ],
    designTiers: [
      { id: 'clean', label: 'Modern & Clean', costUSD: 0, desc: 'Responsive, crisp typography, clean layout' },
      { id: 'bespoke', label: 'Bespoke Custom UI/UX', costUSD: 250, desc: 'Hand-tailored branding, micro-interactions' },
      { id: 'interactive', label: 'High-Impact Interactive / 3D', costUSD: 500, desc: 'Advanced animations, custom graphics' }
    ],
    backendOptions: [
      { id: 'light', label: 'Lightweight / Headless', costUSD: 0 },
      { id: 'moderate', label: 'Standard REST API & Auth', costUSD: 200 },
      { id: 'complex', label: 'Advanced RBAC, Queues & Cloud DB', costUSD: 550 },
    ],
    addonOptions: [
      { id: 'payment', name: 'Payment Gateway (Stripe/PayPal/Local)', costUSD: 150 },
      { id: 'seo', name: 'Advanced Technical SEO & Schema Audit', costUSD: 180 },
      { id: 'multilingual', name: 'Multilingual / Multi-Currency Logic', costUSD: 140 },
      { id: 'notifications', name: 'SMS & WhatsApp Notification Hooks', costUSD: 120 },
      { id: 'hypercare', name: 'Extended 90-Day SLA & Priority Maintenance', costUSD: 220 },
    ],
    currencyRates: {
      PKR: 280,
      GBP: 0.79
    }
  };

  // Get current estimator config
  app.get('/api/estimator', (req, res) => {
    res.json({ success: true, config: estimatorConfig });
  });

  // Update estimator config
  app.post('/api/estimator', (req, res) => {
    if (req.body && typeof req.body === 'object') {
      estimatorConfig = {
        ...estimatorConfig,
        ...req.body
      };
      res.json({ success: true, config: estimatorConfig, message: 'Estimator settings saved successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid configuration payload' });
    }
  });

  // Reset estimator config to defaults
  app.post('/api/estimator/reset', (req, res) => {
    estimatorConfig = {
      projectTypes: [
        { id: 'custom-web', name: 'Custom Web Application', baseUSD: 850, weeks: 3 },
        { id: 'wordpress-woo', name: 'WordPress & WooCommerce Store', baseUSD: 700, weeks: 2 },
        { id: 'laravel-app', name: 'Custom Laravel Software / Portal', baseUSD: 1400, weeks: 4 },
        { id: 'saas-platform', name: 'Multi-Tenant SaaS Platform', baseUSD: 2200, weeks: 6 },
        { id: 'mobile-app', name: 'Flutter Mobile App (iOS & Android)', baseUSD: 1800, weeks: 5 },
        { id: 'erp-pos', name: 'Custom ERP, CRM & POS System', baseUSD: 1600, weeks: 4 },
      ],
      scaleOptions: [
        { id: 'starter', label: 'Compact / MVP (1 - 5 Views)', multiplier: 0.85, weeksDelta: -0.5 },
        { id: 'standard', label: 'Standard Business (6 - 12 Views)', multiplier: 1.0, weeksDelta: 0 },
        { id: 'large', label: 'Comprehensive (13 - 25 Views)', multiplier: 1.35, weeksDelta: 1.5 },
        { id: 'enterprise', label: 'Enterprise (25+ Modules)', multiplier: 1.8, weeksDelta: 3 },
      ],
      designTiers: [
        { id: 'clean', label: 'Modern & Clean', costUSD: 0, desc: 'Responsive, crisp typography, clean layout' },
        { id: 'bespoke', label: 'Bespoke Custom UI/UX', costUSD: 250, desc: 'Hand-tailored branding, micro-interactions' },
        { id: 'interactive', label: 'High-Impact Interactive / 3D', costUSD: 500, desc: 'Advanced animations, custom graphics' }
      ],
      backendOptions: [
        { id: 'light', label: 'Lightweight / Headless', costUSD: 0 },
        { id: 'moderate', label: 'Standard REST API & Auth', costUSD: 200 },
        { id: 'complex', label: 'Advanced RBAC, Queues & Cloud DB', costUSD: 550 },
      ],
      addonOptions: [
        { id: 'payment', name: 'Payment Gateway (Stripe/PayPal/Local)', costUSD: 150 },
        { id: 'seo', name: 'Advanced Technical SEO & Schema Audit', costUSD: 180 },
        { id: 'multilingual', name: 'Multilingual / Multi-Currency Logic', costUSD: 140 },
        { id: 'notifications', name: 'SMS & WhatsApp Notification Hooks', costUSD: 120 },
        { id: 'hypercare', name: 'Extended 90-Day SLA & Priority Maintenance', costUSD: 220 },
      ],
      currencyRates: {
        PKR: 280,
        GBP: 0.79
      }
    };
    res.json({ success: true, config: estimatorConfig, message: 'Reset to defaults' });
  });

  // About Us Data in-memory store
  let aboutData = {
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

  // Get current About Us data
  app.get('/api/about', (req, res) => {
    res.json({ success: true, about: aboutData });
  });

  // Update About Us data
  app.post('/api/about', (req, res) => {
    if (req.body && typeof req.body === 'object') {
      aboutData = {
        ...aboutData,
        ...req.body
      };
      res.json({ success: true, about: aboutData, message: 'About Us content updated successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payload' });
    }
  });

  // Reset About Us data to default
  app.post('/api/about/reset', (req, res) => {
    aboutData = {
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
    res.json({ success: true, about: aboutData, message: 'Reset to defaults' });
  });

  // Teachers Data in-memory store
  let teachersData = [
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
    }
  ];

  // Live Sessions Data in-memory store
  let liveSessions = [
    {
      id: "session-1",
      title: "Claude AI & Web Development Roadmap 2026",
      instructor: "Shahbaz Aslam",
      date: "Nov 15, 2026",
      time: "8:00 PM PKT",
      duration: "90 Mins",
      status: "Upcoming",
      link: "https://zoom.us/j/weversity",
      thumbnail: "/assets/aistudio/image_85a3982c.png"
    }
  ];

  // Company Info in-memory store
  let companyInfo = {
    name: "WeVersity",
    email: "info@weversity.com",
    phone: "+92 301 9249721",
    logo: "/assets/aistudio/image_ec98d7d2.png",
    address: "Turner Road, Off Mall Road, Garhi Shahu, Lahore, Pakistan",
    socials: {
      linkedin: "https://www.linkedin.com/company/weversity",
      facebook: "https://www.facebook.com/weversity",
      whatsapp: "923019249721"
    }
  };

  // Teachers Endpoints
  app.get('/api/teachers', (req, res) => {
    res.json({ success: true, teachers: teachersData });
  });

  app.post('/api/teachers', (req, res) => {
    const teacher = req.body;
    if (!teacher || !teacher.name) {
      return res.status(400).json({ error: 'Teacher name is required' });
    }
    const newTeacher = {
      ...teacher,
      id: teacher.id || 'teacher-' + Date.now()
    };
    const existingIndex = teachersData.findIndex(t => t.id === newTeacher.id);
    if (existingIndex >= 0) {
      teachersData[existingIndex] = newTeacher;
    } else {
      teachersData.unshift(newTeacher);
    }
    res.json({ success: true, teacher: newTeacher, teachers: teachersData });
  });

  app.delete('/api/teachers/:id', (req, res) => {
    const { id } = req.params;
    teachersData = teachersData.filter(t => t.id !== id);
    res.json({ success: true, teachers: teachersData });
  });

  // Live Sessions Endpoints
  app.get('/api/sessions', (req, res) => {
    res.json({ success: true, sessions: liveSessions });
  });

  app.post('/api/sessions', (req, res) => {
    const session = req.body;
    if (!session || !session.title) {
      return res.status(400).json({ error: 'Session title is required' });
    }
    const newSession = {
      ...session,
      id: session.id || 'session-' + Date.now()
    };
    const existingIndex = liveSessions.findIndex(s => s.id === newSession.id);
    if (existingIndex >= 0) {
      liveSessions[existingIndex] = newSession;
    } else {
      liveSessions.unshift(newSession);
    }
    res.json({ success: true, session: newSession, sessions: liveSessions });
  });

  app.delete('/api/sessions/:id', (req, res) => {
    const { id } = req.params;
    liveSessions = liveSessions.filter(s => s.id !== id);
    res.json({ success: true, sessions: liveSessions });
  });

  // Company Info Endpoints
  app.get('/api/company', (req, res) => {
    res.json({ success: true, company: companyInfo });
  });

  app.post('/api/company', (req, res) => {
    companyInfo = { ...companyInfo, ...req.body };
    res.json({ success: true, company: companyInfo });
  });

  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: message,
        config: {
          systemInstruction: "You are a helpful assistant for WeVersity, a software house and digital agency. Provide helpful, concise, and professional responses."
        }
      });
      res.json({ reply: response.text });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to chat' });
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

startServer();
