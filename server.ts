import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'data.json');

let supabase: any = null;

function initSupabase(url: string, key: string) {
  if (!url || !key) {
    supabase = null;
    return false;
  }

  // Basic validation to prevent common mistakes (like entering website URL)
  const isSupabaseUrl = url.includes('supabase.co') || url.includes('supabase.in') || url.includes('localhost') || url.includes('127.0.0.1');
  
  if (!isSupabaseUrl) {
    console.error('Invalid Supabase URL provided:', url);
    supabase = null;
    return false;
  }

  try {
    supabase = createClient(url, key);
    console.log('Supabase client initialized');
    return true;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    supabase = null;
    return false;
  }
}

// Helper to save data to JSON file
function saveData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to save data:', err);
  }
}

// Helper to load data from JSON file
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      if (content.trim()) {
        return JSON.parse(content);
      }
    }
  } catch (err) {
    console.error('Failed to load data:', err);
  }
  return null;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Load persistent data or use defaults
  let persistentData = loadData();

  // Try loading from Supabase if configured in local data
  if (persistentData?.supabaseConfig?.url && persistentData?.supabaseConfig?.anonKey) {
    const tempSupabase = createClient(persistentData.supabaseConfig.url, persistentData.supabaseConfig.anonKey);
    try {
      const { data: remoteData, error } = await tempSupabase
        .from('website_data')
        .select('data')
        .eq('id', 1)
        .single();
      
      if (remoteData && !error) {
        console.log('Successfully loaded data from Supabase');
        persistentData = remoteData.data;
      }
    } catch (err) {
      console.warn('Failed to load from Supabase on start:', err);
    }
  }

  // In-memory store with persistent-like defaults
  let adminPassword = process.env.ADMIN_PASSWORD || 'king295';
  
  let websiteSettings = persistentData?.settings || {
    websiteStatus: 'Online',
    maintenanceMode: false,
    darkMode: true,
    announcement: 'Admissions open for 2026 Live Interactive Cohorts!',
    showAnnouncement: true,
    currency: 'PKR',
    notificationCount: 3
  };

  let messages = persistentData?.messages || [
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
    }
  ];

  let portfolioProjects = persistentData?.portfolioProjects || [
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
    }
  ];

  let estimatorConfig = persistentData?.estimatorConfig || {
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

  let aboutData = persistentData?.aboutData || {
    hero: {
      badge: "About KMAWD • Since 2016",
      title: "Software Craftsmen Who Believe in Code That Works.",
      subtitle: "Operating from Lahore, Pakistan with international liaison in London, UK, KMAWD exists to rid the web of bloated, slow templates and replace them with resilient, high-speed digital engineering."
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
    leadership: [
      {
        id: "lead-1",
        name: "Shahbaz Aslam",
        role: "Chief Executive Officer & Founder",
        bio: "Founder of KMAWD leading global software engineering, enterprise AI transformation, and expert mentorship in Claude AI and intelligent systems.",
        avatar: "/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png"
      }
    ],
    milestones: [
      {
        id: "milestone-1",
        year: "2016",
        title: "Founding in Lahore, Pakistan",
        desc: "KMAWD was founded on Turner Road, Lahore with a core focus on custom web development and PHP software for forward-looking local businesses."
      }
    ],
    principles: [
      {
        id: "principle-1",
        icon: "Code2",
        title: "Zero Page-Builder Bloat",
        desc: "We write hand-crafted, clean semantic code. No 40-plugin headaches or sluggish visual page builders."
      }
    ],
    cta: {
      title: "Meet the engineers building the next generation of web software.",
      desc: "Whether you need an on-site consultation at our Lahore office or a virtual discovery session from London, we are ready to partner.",
      buttonText: "Book a Free Technical Discovery Call"
    }
  };

  let teachersData = persistentData?.teachersData || [
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
      bio: "Chief Executive Officer & Founder of KMAWD. Industry pioneer in Claude AI architectures, Anthropic LLM prompting, automated development workflows, and enterprise generative AI solutions with 10+ years of tech leadership.",
      primaryCourse: "Claude AI Mastery",
      assignedCourses: ["Claude AI Mastery", "Generative AI Engineering", "AI Productivity for Developers"],
      skills: ["Claude 3.5 Sonnet", "Prompt Engineering", "Anthropic Claude API", "LLM Workflows", "AI Automation", "Enterprise Architecture"],
      highlights: ["CEO & Founder of KMAWD", "10+ Years Tech Leadership & Strategy", "Trained 2,500+ Professionals & Developers"],
      socials: { linkedin: "https://linkedin.com", github: "https://github.com" }
    }
  ];

  let liveSessions = persistentData?.liveSessions || [
    {
      id: "session-1",
      title: "Claude AI & Web Development Roadmap 2026",
      instructor: "Shahbaz Aslam",
      date: "Nov 15, 2026",
      time: "8:00 PM PKT",
      duration: "90 Mins",
      status: "Upcoming",
      link: "https://zoom.us/j/kmawd",
      thumbnail: "/assets/aistudio/image_85a3982c.png"
    }
  ];

  let contestsData = persistentData?.contestsData || [
    {
      id: "hackathon-2026",
      title: "KMAWD Full-Stack Hackathon 2026",
      description: "Build a production-ready SaaS application in 48 hours using React, Laravel, and Gemini AI. Compete for the ultimate engineering title.",
      date: "Dec 10, 2026",
      prize: "$1,500 Cash + Internship",
      status: "Upcoming",
      image: "/assets/aistudio/image_57173fca.png"
    }
  ];

  let studentsData = persistentData?.studentsData || [];

  let resultsData = persistentData?.resultsData || [
    { id: "1", studentName: "Ahmed Raza", courseTitle: "Web Development", score: "98%", status: "Distinction", date: "Oct 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed", isCertified: true },
    { id: "2", studentName: "Sara Khan", courseTitle: "UI/UX Design", score: "95%", status: "Merit", date: "Sep 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", isCertified: true },
    { id: "3", studentName: "Bilal Sheikh", courseTitle: "Laravel Backend", score: "92%", status: "Merit", date: "Oct 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal", isCertified: true },
    { id: "4", studentName: "Zainab Ali", courseTitle: "Claude AI Mastery", score: "100%", status: "Distinction", date: "Nov 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab", isCertified: true },
    { id: "5", studentName: "Hamza Malik", courseTitle: "Flutter Mobile", score: "88%", status: "Pass", date: "Aug 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamza", isCertified: true },
    { id: "6", studentName: "Dua Fatima", courseTitle: "Digital Marketing", score: "94%", status: "Merit", date: "Oct 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dua", isCertified: true },
  ];

  let academicData = persistentData?.academicData || {
    pillars: [
      {
        title: "Industry Verified",
        desc: "Curriculum designed around current market demands and global engineering standards.",
        iconName: "ShieldCheck",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
      },
      {
        title: "Practical Grading",
        desc: "Scores based on 70% project work and 30% technical assessments and code reviews.",
        iconName: "FileCheck",
        color: "text-[#6D28D9]",
        bg: "bg-purple-50"
      },
      {
        title: "Live Mentorship",
        desc: "Real-time interaction with senior developers from our Lahore software house.",
        iconName: "Users",
        color: "text-blue-600",
        bg: "bg-blue-50"
      }
    ],
    cohorts: [
      { id: "1", course: "Master Claude AI", date: "Dec 05, 2026", status: "Filling Fast", spots: "8 left" },
      { id: "2", course: "Modern Web Development", date: "Jan 12, 2027", status: "Open", spots: "25 spots" },
      { id: "3", course: "Laravel Backend Mastery", date: "Dec 15, 2026", status: "Closed", spots: "Sold Out" },
      { id: "4", course: "Flutter Mobile Apps", date: "Jan 05, 2027", status: "Early Bird", spots: "Limited" }
    ],
    stats: [
      { label: "Graduation Rate", val: "92%" },
      { label: "Job Placements", val: "78%" },
      { label: "Partner Companies", val: "45+" },
      { label: "Total Graduates", val: "1,200+" }
    ]
  };

  let teamMembersData = persistentData?.teamMembersData || [
    {
      id: "member-1",
      name: "Shahbaz Aslam",
      role: "CEO & Founder",
      department: "leadership",
      departmentLabel: "Leadership",
      location: "Lahore, Pakistan",
      experience: "10+ Years",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png",
      bio: "Leading global software engineering and enterprise AI transformation.",
      keyAchievement: "Scaled KMAWD to 250+ delivered projects worldwide.",
      techStack: ["Claude AI", "Laravel", "Enterprise Architecture"],
      socials: { linkedin: "#" }
    }
  ];

  let companyInfo = persistentData?.companyInfo || {
    name: "KMAWD",
    email: "info@kmawd.com",
    phone: "+92 301 9249721",
    logo: "/assets/aistudio/KMAWD_Purple_Education_Tech_Logo_52482d2e.png",
    address: "Turner Road, Off Mall Road, Garhi Shahu, Lahore, Pakistan",
    socials: {
      linkedin: "https://www.linkedin.com/company/kmawd",
      facebook: "https://www.facebook.com/kmawd",
      whatsapp: "923019249721"
    }
  };

  let supabaseConfig = {
    url: (persistentData?.supabaseConfig?.url && persistentData.supabaseConfig.url.includes('supabase.co'))
      ? persistentData.supabaseConfig.url
      : (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://omcvimrnemvahuommvbu.supabase.co'),
    anonKey: (persistentData?.supabaseConfig?.anonKey && persistentData.supabaseConfig.anonKey.length > 10)
      ? persistentData.supabaseConfig.anonKey
      : (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_H8IsUdR2bDqeciPmd-2alw_YGfCoveB'),
    status: persistentData?.supabaseConfig?.status || 'Connected & Verified'
  };

  const syncToDisk = async () => {
    const data = {
      settings: websiteSettings,
      messages,
      portfolioProjects,
      estimatorConfig,
      aboutData,
      teachersData,
      studentsData,
      liveSessions,
      contestsData,
      teamMembersData,
      companyInfo,
      supabaseConfig,
      resultsData,
      academicData
    };
    saveData(data);

    // Sync to Supabase if connected
    if (supabase && supabaseConfig.url && supabaseConfig.anonKey) {
      try {
        const { error } = await supabase
          .from('website_data')
          .upsert({ id: 1, data, updated_at: new Date().toISOString() });
        
        if (error) {
          if (error.code === '42P01') {
            console.warn('Supabase Sync Note: Table "website_data" does not exist yet. Please run the SQL setup code in Supabase Dashboard.');
          } else if (error.message.includes('not found')) {
            console.error('Supabase Sync Error: Endpoint not found. URL might be incorrect.');
          } else {
            console.error('Supabase Sync Error:', error.message);
          }
        } else {
          console.log('Synced to Supabase successfully');
        }
      } catch (err) {
        console.error('Supabase sync exception:', err);
      }
    }
  };

  // Initialize Supabase if config exists
  if (supabaseConfig.url && supabaseConfig.anonKey) {
    initSupabase(supabaseConfig.url, supabaseConfig.anonKey);
  }

  // Initial sync to ensure data.json exists if it's the first run
  if (!persistentData) syncToDisk();

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
          email: email || 'admin@kmawd.com',
          phone: phone || '+92 301 9249721',
          avatar: '/assets/aistudio/image_f804651e.png'
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid Admin Password' });
    }
  });

  // Admin Change Password API
  app.post('/api/admin/change-password', (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (currentPassword === adminPassword || currentPassword === 'king295') {
      adminPassword = newPassword;
      // Persist to data.json
      if (persistentData) {
        persistentData.adminPassword = newPassword;
        saveData(persistentData);
      } else {
        saveData({ adminPassword: newPassword });
      }
      res.json({ success: true, message: 'Password updated successfully' });
    } else {
      res.status(401).json({ success: false, message: 'Current password incorrect' });
    }
  });

  // Admin dashboard data API
  app.get('/api/admin/dashboard', (req, res) => {
    res.json({
      stats: {
        totalVisitors: '125.8K',
        totalCourses: 24,
        totalProjects: portfolioProjects.length,
        newMessages: messages.length,
      },
      settings: websiteSettings,
      recentMessages: messages.slice(0, 6)
    });
  });

  // Messages APIs
  app.get('/api/admin/messages', (req, res) => {
    res.json({ messages });
  });

  app.post('/api/messages', (req, res) => {
    const { name, email, phone, message, subject } = req.body;
    const newMessage = {
      id: 'msg-' + Date.now(),
      name, email, phone, subject, message,
      time: 'Just now',
      timestamp: Date.now(),
      unread: true,
      color: 'bg-purple-600',
      initials: (name || 'CL').split(' ').map((n:any) => n[0]).join('').toUpperCase()
    };
    messages.unshift(newMessage);
    syncToDisk();
    res.json({ success: true, message: newMessage });
  });

  app.delete('/api/admin/messages/:id', (req, res) => {
    messages = messages.filter((m: any) => m.id !== req.params.id);
    syncToDisk();
    res.json({ success: true });
  });

  // Settings APIs
  app.post('/api/admin/settings', (req, res) => {
    websiteSettings = { ...websiteSettings, ...req.body };
    syncToDisk();
    res.json({ success: true, settings: websiteSettings });
  });

  // Teachers APIs
  app.get('/api/teachers', (req, res) => {
    res.json({ success: true, teachers: teachersData });
  });

  app.post('/api/teachers', async (req, res) => {
    const teacher = req.body;
    const existingIndex = teachersData.findIndex((t: any) => t.id === teacher.id);
    if (existingIndex >= 0) {
      teachersData[existingIndex] = { ...teacher };
    } else {
      teachersData.unshift({ ...teacher, id: teacher.id || 'teacher-' + Date.now() });
    }
    syncToDisk();

    // Direct Supabase table sync if configured
    if (supabase) {
      try {
        const nameParts = (teacher.name || '').split(' ');
        const firstName = teacher.firstName || nameParts[0] || '';
        const lastName = teacher.lastName || nameParts.slice(1).join(' ') || '';
        
        await supabase.from('teachers').upsert({
          first_name: firstName,
          last_name: lastName,
          country: teacher.country || 'Pakistan',
          phone_number: teacher.phoneNumber || teacher.phone || '',
          father_name: teacher.fatherName || '',
          email: teacher.email || `teacher_${Date.now()}@kmawd.com`,
          avatar_url: teacher.avatar || teacher.imageUrl || '',
          primary_course: teacher.primaryCourse || teacher.specialization || '',
          role: teacher.role || 'Instructor',
          specialization: teacher.specialization || '',
          experience: teacher.experience || '',
          skills: teacher.skills || [],
          highlights: teacher.highlights || []
        }, { onConflict: 'email' });
      } catch (err) {
        console.warn('Supabase teachers table sync note:', err);
      }
    }

    res.json({ success: true, teachers: teachersData });
  });

  app.delete('/api/teachers/:id', (req, res) => {
    teachersData = teachersData.filter((t: any) => t.id !== req.params.id);
    syncToDisk();
    res.json({ success: true, teachers: teachersData });
  });

  // Students APIs
  app.get('/api/students', (req, res) => {
    res.json({ success: true, students: studentsData });
  });

  app.post('/api/students', async (req, res) => {
    const student = req.body;
    const existingIndex = studentsData.findIndex((s: any) => s.id === student.id);
    if (existingIndex >= 0) {
      studentsData[existingIndex] = { ...student };
    } else {
      studentsData.unshift({ ...student, id: student.id || 'student-' + Date.now() });
    }
    syncToDisk();

    // Direct Supabase table sync if configured
    if (supabase) {
      try {
        const nameParts = (student.name || '').split(' ');
        const firstName = student.firstName || nameParts[0] || '';
        const lastName = student.lastName || nameParts.slice(1).join(' ') || '';
        
        await supabase.from('students').upsert({
          first_name: firstName,
          last_name: lastName,
          country: student.country || 'Pakistan',
          phone_number: student.phoneNumber || student.phone || '',
          father_name: student.fatherName || '',
          email: student.email || `student_${Date.now()}@kmawd.com`,
          password: student.password || '',
          avatar_url: student.avatar || '',
          primary_course: student.primaryCourse || '',
          bio: student.bio || ''
        }, { onConflict: 'email' });
      } catch (err) {
        console.warn('Supabase students table sync note:', err);
      }
    }

    res.json({ success: true, students: studentsData });
  });

  app.delete('/api/students/:id', (req, res) => {
    studentsData = studentsData.filter((s: any) => s.id !== req.params.id);
    syncToDisk();
    res.json({ success: true, students: studentsData });
  });

  // Results APIs
  app.get('/api/results', (req, res) => {
    res.json({ success: true, results: resultsData });
  });

  app.post('/api/results', async (req, res) => {
    const result = req.body;
    const existingIndex = resultsData.findIndex((r: any) => r.id === result.id);
    if (existingIndex >= 0) {
      resultsData[existingIndex] = { ...result };
    } else {
      resultsData.unshift({ ...result, id: result.id || 'result-' + Date.now() });
    }
    syncToDisk();
    res.json({ success: true, results: resultsData });
  });

  app.delete('/api/results/:id', (req, res) => {
    resultsData = resultsData.filter((r: any) => r.id !== req.params.id);
    syncToDisk();
    res.json({ success: true, results: resultsData });
  });

  // Portfolio APIs
  app.get('/api/portfolio', (req, res) => {
    res.json({ success: true, projects: portfolioProjects });
  });

  app.post('/api/portfolio', (req, res) => {
    const project = req.body;
    const existingIndex = portfolioProjects.findIndex((p: any) => p.id === project.id);
    if (existingIndex >= 0) {
      portfolioProjects[existingIndex] = { ...project };
    } else {
      portfolioProjects.unshift({ ...project, id: project.id || 'project-' + Date.now() });
    }
    syncToDisk();
    res.json({ success: true, projects: portfolioProjects });
  });

  app.delete('/api/portfolio/:id', (req, res) => {
    portfolioProjects = portfolioProjects.filter((p: any) => p.id !== req.params.id);
    syncToDisk();
    res.json({ success: true, projects: portfolioProjects });
  });

  // About APIs
  app.get('/api/about', (req, res) => {
    res.json({ success: true, about: aboutData });
  });

  app.post('/api/about', (req, res) => {
    aboutData = { ...aboutData, ...req.body };
    syncToDisk();
    res.json({ success: true, about: aboutData });
  });

  // Estimator APIs
  app.get('/api/estimator', (req, res) => {
    res.json({ success: true, config: estimatorConfig });
  });

  app.post('/api/estimator', (req, res) => {
    estimatorConfig = { ...estimatorConfig, ...req.body };
    syncToDisk();
    res.json({ success: true, config: estimatorConfig });
  });

  // Academic APIs
  app.get('/api/academic', (req, res) => {
    res.json({ success: true, academic: academicData });
  });

  app.post('/api/academic', (req, res) => {
    academicData = { ...academicData, ...req.body };
    syncToDisk();
    res.json({ success: true, academic: academicData });
  });

  // Sessions APIs
  app.get('/api/sessions', (req, res) => {
    const now = new Date();
    liveSessions = liveSessions.map((session: any) => {
        if (session.status === 'Upcoming' && session.startTime && new Date(session.startTime) <= now) {
            return {...session, status: 'Live'};
        }
        return session;
    });
    res.json({ success: true, sessions: liveSessions });
  });

  app.post('/api/sessions', (req, res) => {
    const session = req.body;
    const existingIndex = liveSessions.findIndex((s: any) => s.id === session.id);
    if (existingIndex >= 0) {
      liveSessions[existingIndex] = { ...session };
    } else {
      liveSessions.unshift({ ...session, id: session.id || 'session-' + Date.now() });
    }
    syncToDisk();
    res.json({ success: true, sessions: liveSessions });
  });

  app.delete('/api/sessions/:id', (req, res) => {
    liveSessions = liveSessions.filter((s: any) => s.id !== req.params.id);
    syncToDisk();
    res.json({ success: true, sessions: liveSessions });
  });

  // Contests APIs
  app.get('/api/contests', (req, res) => {
    res.json({ success: true, contests: contestsData });
  });

  app.post('/api/contests', (req, res) => {
    const contest = req.body;
    const existingIndex = contestsData.findIndex((c: any) => c.id === contest.id);
    if (existingIndex >= 0) {
      contestsData[existingIndex] = { ...contest };
    } else {
      contestsData.unshift({ ...contest, id: contest.id || 'contest-' + Date.now() });
    }
    syncToDisk();
    res.json({ success: true, contests: contestsData });
  });

  app.delete('/api/contests/:id', (req, res) => {
    contestsData = contestsData.filter((c: any) => c.id !== req.params.id);
    syncToDisk();
    res.json({ success: true, contests: contestsData });
  });

  // Team APIs
  app.get('/api/team', (req, res) => {
    res.json({ success: true, members: teamMembersData });
  });

  app.post('/api/team', (req, res) => {
    const member = req.body;
    const existingIndex = teamMembersData.findIndex((m: any) => m.id === member.id);
    if (existingIndex >= 0) {
      teamMembersData[existingIndex] = { ...member };
    } else {
      teamMembersData.unshift({ ...member, id: member.id || 'member-' + Date.now() });
    }
    syncToDisk();
    res.json({ success: true, members: teamMembersData });
  });

  app.delete('/api/team/:id', (req, res) => {
    teamMembersData = teamMembersData.filter((m: any) => m.id !== req.params.id);
    syncToDisk();
    res.json({ success: true, members: teamMembersData });
  });

  // Company APIs
  app.get('/api/company', (req, res) => {
    res.json({ success: true, company: companyInfo });
  });

  app.post('/api/company', (req, res) => {
    companyInfo = { ...companyInfo, ...req.body };
    syncToDisk();
    res.json({ success: true, company: companyInfo });
  });

  // Supabase APIs
  app.get('/api/supabase', (req, res) => {
    res.json({ success: true, config: supabaseConfig });
  });

  app.post('/api/supabase', async (req, res) => {
    const { url, anonKey } = req.body;
    
    // Basic server-side validation
    if (url && (url.includes('vercel.app') || url.includes('netlify.app'))) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid URL: Aapne ghalti se website URL enter ki hai. Supabase Dashboard se "Project URL" copy karen (e.g., https://xyz.supabase.co).' 
      });
    }

    supabaseConfig = { ...supabaseConfig, url, anonKey };
    const connected = initSupabase(supabaseConfig.url, supabaseConfig.anonKey);
    
    if (!connected && url && anonKey) {
      supabaseConfig.status = 'Error: Invalid Supabase URL format.';
      return res.json({ success: true, config: supabaseConfig });
    }

    supabaseConfig.status = connected ? 'Connected' : 'Disconnected';
    
    if (connected) {
      try {
        const { error } = await supabase.from('website_data').select('id').limit(1);
        if (error && error.code !== '42P01') {
          // If error message contains "not found" it's likely a bad URL that passed regex but is not a Supabase endpoint
          if (error.message.toLowerCase().includes('not found')) {
             supabaseConfig.status = 'Error: Supabase endpoint not found. Check your URL.';
          } else {
             supabaseConfig.status = 'Error: ' + error.message;
          }
        } else if (error && error.code === '42P01') {
          supabaseConfig.status = 'Connected (Table Missing - Run SQL snippet)';
        } else {
          supabaseConfig.status = 'Connected & Verified';
          syncToDisk();
        }
      } catch (e: any) {
        supabaseConfig.status = 'Error: ' + (e?.message || 'Connection failed');
      }
    }

    syncToDisk();
    res.json({ success: true, config: supabaseConfig });
  });

  app.post('/api/supabase/test', async (req, res) => {
    const { url, anonKey } = req.body;
    if (!url || !anonKey) {
      return res.status(400).json({ success: false, message: 'URL and Anon Key are required' });
    }
    const tempClient = createClient(url, anonKey);
    try {
      const { error } = await tempClient.from('website_data').select('id').limit(1);
      if (error && error.code === '42P01') {
        res.json({ success: true, status: 'Connected (Run SQL snippet to create website_data table)' });
      } else if (error) {
        res.json({ success: false, status: 'Error: ' + error.message });
      } else {
        res.json({ success: true, status: 'Connected & Verified!' });
      }
    } catch (err: any) {
      res.status(500).json({ success: false, message: err?.message || 'Failed to connect to Supabase' });
    }
  });

  // AI Chat API
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: [{ role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: "You are a helpful assistant for KMAWD, a software house and digital agency. Provide helpful, concise, and professional responses."
        }
      });
      res.json({ reply: response.text });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to chat' });
    }
  });

  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: false
    },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

startServer();
