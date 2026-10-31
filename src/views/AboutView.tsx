import React from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Code2, 
  Sparkles, 
  Clock, 
  Cpu
} from 'lucide-react';
import { COMPANY_INFO } from '../data/maatiData';

interface AboutViewProps {
  onOpenQuoteModal: () => void;
  setActiveTab: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenQuoteModal
}) => {
  const milestones = [
    {
      year: "2016",
      title: "Founding in Lahore, Pakistan",
      desc: "WeVersity was founded on Turner Road, Lahore with a core focus on custom web development and PHP software for forward-looking local businesses."
    },
    {
      year: "2018",
      title: "Expansion into Laravel & E-Commerce",
      desc: "Scaled our engineering department to deliver enterprise Laravel portals and high-performance WooCommerce architectures with sub-second speeds."
    },
    {
      year: "2020",
      title: "UK Operations & Cross-Border Delivery",
      desc: "Opened our London liaison office to serve British and European clients with dedicated compliance and agile project management."
    },
    {
      year: "2022",
      title: "Multi-Tenant SaaS & Flutter Mobile",
      desc: "Pioneered multi-tenant cloud architectures and cross-platform mobile apps for fast-growth startups across healthcare, logistics, and fintech."
    },
    {
      year: "2024",
      title: "200+ Projects & Global Recognition",
      desc: "Surpassed 200 delivered platforms worldwide with a verified 5.0 rating on Clutch and continuous engineering partnerships."
    },
    {
      year: "2026",
      title: "Generative Search & Enterprise Scalability",
      desc: "Empowering businesses with modern full-stack web applications, AI-ready structured knowledge bases (GEO), and ultra-resilient software systems."
    }
  ];

  const leadership = [
    {
      name: "Shahbaz Aslam",
      role: "Chief Executive Officer & Founder",
      bio: "Founder of WeVersity leading global software engineering, enterprise AI transformation, and expert mentorship in Claude AI and intelligent systems.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png"
    },
    {
      name: "Rehan Ahmad",
      role: "Lead Web Developer",
      bio: "Specialist in modern web development, frontend architectures, responsive UI engineering, and sub-second Core Web Vitals optimization.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181050_3b66291a.png"
    },
    {
      name: "Zain Tariq",
      role: "Senior Web Developer & Instructor",
      bio: "6+ years crafting high-performance web applications, modern responsive UI systems, and mentoring next-generation developers in web engineering.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_181903_ee378270.png"
    },
    {
      name: "~ℳ.𝒯𝒶𝒾𝒷ℯ",
      role: "Senior Web Developer & AI Corporate Trainer",
      bio: "Specializing in website development and executive AI training for HR managers (hiring, onboarding, and compliance).",
      avatar: "/assets/aistudio/image_85a3982c.png"
    },
    {
      name: "Muhammad Shahab",
      role: "LinkedIn Growth Strategist & Web Developer",
      bio: "Specialist in LinkedIn Ecosystem Mastery (Organic & Paid growth, high-ticket client acquisition) and modern responsive web systems.",
      avatar: "/assets/aistudio/image_f804651e.png"
    },

    {
      name: "Zohaib Noman",
      role: "Senior SEO Strategist & Local SEO Expert",
      bio: "7+ years helping businesses dominate local search results and optimize Google Business Profiles for regional dominance.",
      avatar: "/assets/aistudio/Screenshot_2026-10-30_184218_848ffe02.png"
    },
    {
      name: "Sebastian Bui",
      role: "Senior E-Commerce Strategist & AI Specialist",
      bio: "8+ years scaling online stores with intelligent automation, AI-driven marketing, and high-performance e-commerce platforms.",
      avatar: "/assets/aistudio/image_a068702f.png"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold">
          <Building2 className="w-3.5 h-3.5" />
          <span>About WeVersity • Since 2016</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-gray-950 tracking-tight">
          Software Craftsmen Who Believe in Code That Works.
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Operating from Lahore, Pakistan with international liaison in London, UK, WeVersity exists to rid the web of bloated, slow templates and replace them with resilient, high-speed digital engineering.
        </p>
      </div>

      {/* Dual Office Presence Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lahore HQ */}
        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-6 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 transition-all">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9] flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> Principal Engineering Hub
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 font-bold">
              Lahore, Pakistan
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-display font-bold text-gray-900">{COMPANY_INFO.headquarters.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {COMPANY_INFO.headquarters.address}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs">
            <div className="text-gray-600">Direct Contact: <strong className="text-gray-900">{COMPANY_INFO.phone}</strong></div>
            <div className="text-gray-600">Working Hours: <strong className="text-gray-900">{COMPANY_INFO.headquarters.hours}</strong></div>
            <div className="text-gray-600">Core Disciplines: <strong className="text-[#6D28D9]">Full-Stack Laravel, React, Flutter, Database Architecture</strong></div>
          </div>
        </div>

        {/* London Office */}
        <div className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-6 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-purple-300 transition-all">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> European Client Liaison
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
              London, United Kingdom
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-display font-bold text-gray-900">{COMPANY_INFO.ukOffice.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {COMPANY_INFO.ukOffice.address}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2 text-xs">
            <div className="text-gray-600">UK Direct Line: <strong className="text-gray-900">{COMPANY_INFO.ukOffice.phone}</strong></div>
            <div className="text-gray-600">Working Hours: <strong className="text-gray-900">{COMPANY_INFO.ukOffice.hours}</strong></div>
            <div className="text-gray-600">Core Focus: <strong className="text-indigo-700">Strategic Partnerships, Product Discovery, UK Regulatory Standards</strong></div>
          </div>
        </div>

      </div>

      {/* Core Engineering Manifesto / Values */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">What Drives Us</span>
          <h2 className="text-3xl font-display font-bold text-gray-950">Our Engineering Principles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Code2 className="w-5 h-5" />,
              title: "Zero Page-Builder Bloat",
              desc: "We write hand-crafted, clean semantic code. No 40-plugin headaches or sluggish visual page builders."
            },
            {
              icon: <ShieldCheck className="w-5 h-5" />,
              title: "100% Client IP Ownership",
              desc: "You own all code repositories, database schemas, and digital assets. No vendor lock-in or licensing traps."
            },
            {
              icon: <Cpu className="w-5 h-5" />,
              title: "Performance by Default",
              desc: "Sub-second load times and 95+ Core Web Vitals scores built into every page layout and backend query."
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "Transparent Sprints",
              desc: "Weekly staging demos, continuous communication, and clear milestone deliverables with zero surprises."
            }
          ].map((v, i) => (
            <div key={i} className="group p-6 rounded-3xl bg-white border border-purple-100 space-y-3 shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white transition-all duration-300">
                {v.icon}
              </div>
              <h4 className="font-bold text-gray-900 text-base">{v.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline of Milestones */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">A Decade of Growth</span>
          <h2 className="text-3xl font-display font-bold text-gray-950">Our Journey (2016 - 2026)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white border border-purple-100 space-y-3 relative hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 shadow-sm transition-all"
            >
              <span className="text-2xl font-display font-extrabold text-[#6D28D9] block">
                {m.year}
              </span>
              <h4 className="text-base font-bold text-gray-900">{m.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">The Architects</span>
          <h2 className="text-3xl font-display font-bold text-gray-950">Leadership & Engineering Leads</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((lead, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-purple-100 space-y-4 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-purple-400 transition-all">
              <img
                src={lead.avatar}
                alt={lead.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-purple-200"
              />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-gray-900">{lead.name}</h4>
                <div className="text-xs font-bold text-[#6D28D9]">{lead.role}</div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {lead.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-150 text-center space-y-6 shadow-sm">
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-950">
          Meet the engineers building the next generation of web software.
        </h3>
        <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">
          Whether you need an on-site consultation at our Lahore office or a virtual discovery session from London, we are ready to partner.
        </p>
        <button
          onClick={onOpenQuoteModal}
          className="px-8 py-3.5 rounded-xl font-bold text-xs tracking-wide text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-all inline-flex items-center gap-2 shadow-md shadow-purple-600/25"
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>Book a Free Technical Discovery Call</span>
        </button>
      </div>

    </div>
  );
};
