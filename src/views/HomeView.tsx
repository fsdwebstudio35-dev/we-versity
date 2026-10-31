import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Package,
  Smile,
  Star,
  Globe,
  Code2,
  Rocket,
  Shield,
  Users,
  MessageCircle,
  Laptop,
  CheckCircle2,
  ChevronRight, 
  ExternalLink,
  Plus, 
  Minus,
  Award,
  GraduationCap,
  Zap,
  ShoppingBag,
  Layers,
  Smartphone,
  TrendingUp,
  Cpu,
  Puzzle,
  Flame,
  Cloud,
  Languages,
  FileSpreadsheet,
  Store,
  Banknote
} from 'lucide-react';
import { 
  COMPANY_INFO, 
  PORTFOLIO_PROJECTS, 
  TESTIMONIALS, 
  TECH_STACK, 
  FAQS, 
  ServiceItem, 
  PortfolioProject,
  COURSES,
  CourseItem
} from '../data/maatiData';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: (serviceId?: string) => void;
  onSelectService?: (service: ServiceItem) => void;
  onSelectProject: (project: PortfolioProject) => void;
  onSelectCourse: (course: CourseItem) => void;
  currency: 'USD' | 'PKR' | 'GBP';
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onOpenQuoteModal,
  onSelectProject,
  onSelectCourse,
  currency
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState<string>('all');

  const filteredProjects = selectedPortfolioCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedPortfolioCategory);

  const getCoursePrice = (usd: number) => {
    if (currency === 'PKR') {
      return `₨ ${(usd * 280).toLocaleString()}`;
    } else if (currency === 'GBP') {
      return `£ ${Math.round(usd * 0.79).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION MATCHING SCREENSHOT EXACTLY */}
      <section className="relative pt-6 sm:pt-10 pb-12 lg:pb-16 overflow-hidden">
        {/* Soft background ambient gradient */}
        <div className="absolute top-10 right-1/4 w-[500px] h-[380px] bg-purple-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-[350px] h-[300px] bg-indigo-100/40 rounded-full blur-[90px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/90 text-xs sm:text-[13px] font-bold shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
                <span>Software House & Digital Agency • Serving Pakistan & UK Since 2016</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#18113C] tracking-tight leading-[1.12]">
                Websites & Custom Software<br />
                That <span className="text-[#6D28D9]">Mean Business.</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
                We engineer high-performance web applications, bespoke Laravel backends, multi-tenant SaaS platforms, and Flutter mobile apps. Hand-crafted code, zero page-builder bloat, and guaranteed Google Core Web Vitals.
              </p>

              {/* 3 Call to Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                
                {/* 1. Get a Free Project Proposal */}
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-200 fill-purple-200" />
                  <span>Get a Free Project Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 2. View Portfolio */}
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#6D28D9] bg-purple-50 hover:bg-purple-100 border border-purple-200 shadow-xs transition-all flex items-center gap-2"
                >
                  <Package className="w-4 h-4 text-[#6D28D9]" />
                  <span>View Portfolio</span>
                </button>

                {/* 3. Instant Cost Calculator */}
                <button
                  onClick={() => setActiveTab('estimator')}
                  className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Instant Cost Calculator</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-[#6D28D9] font-extrabold text-[10px]">
                    30-sec
                  </span>
                </button>

                {/* 4. WhatsApp Direct */}
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Maati%20Tech,%20I'd%20like%20to%20discuss%20a%20new%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-800 bg-[#E8FAF0] hover:bg-[#D7F5E3] border border-emerald-200/90 transition-all flex items-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>WhatsApp Direct</span>
                </a>

              </div>

            </div>

            {/* Right Column: 3D Illustration & Floating Tech Tags */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              
              {/* Floating Tech Pill Tags Bar */}
              <div className="w-full flex justify-center lg:justify-end mb-4">
                <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-purple-150 shadow-sm text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-blue-600 px-2 py-0.5 rounded-md hover:bg-blue-50">
                    <Globe className="w-3.5 h-3.5 text-blue-500" /> Web Apps
                  </span>
                  <span className="flex items-center gap-1.5 text-red-600 px-2 py-0.5 rounded-md hover:bg-red-50">
                    <Flame className="w-3.5 h-3.5 text-red-500" /> Laravel
                  </span>
                  <span className="flex items-center gap-1.5 text-cyan-600 px-2 py-0.5 rounded-md hover:bg-cyan-50">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-cyan-500 fill-current">
                      <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zm.07 11.285l-6.84 6.843L11.258 22l6.842-6.843-3.715-3.872zm3.628 3.63L21.684 18.6 17.97 22.3l-3.67-3.67 3.713-3.714z" />
                    </svg> Flutter
                  </span>
                  <span className="flex items-center gap-1.5 text-purple-600 px-2 py-0.5 rounded-md hover:bg-purple-50">
                    <Cloud className="w-3.5 h-3.5 text-purple-500" /> SaaS
                  </span>
                </div>
              </div>

              {/* The 3D Tech Illustration from screenshot */}
              <div className="relative w-full max-w-[500px] overflow-visible">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/40 via-indigo-100/30 to-transparent rounded-3xl blur-2xl transform scale-95 -z-10" />
                <img 
                  src="/assets/aistudio/image_03e15199.png" 
                  alt="Websites & Custom Software That Mean Business"
                  className="w-full h-auto object-contain drop-shadow-xl select-none"
                  loading="eager"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS STRIP CONTAINER MATCHING SCREENSHOT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:py-7 sm:px-10 rounded-3xl bg-white border border-purple-150/90 shadow-sm shadow-purple-900/5 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-900/8 transition-all duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
            
            {/* Stat 1: 250+ Delivered Projects */}
            <button 
              onClick={() => setActiveTab('portfolio')}
              className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none p-2 sm:p-2.5 rounded-2xl hover:bg-purple-50/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              title="Click to view all delivered projects in Portfolio"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/25 transition-all duration-300">
                <Package className="w-6 h-6 text-[#6D28D9] group-hover:text-white stroke-[1.8] group-hover:scale-105 transition-all duration-300" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                  250+
                </div>
                <div className="text-xs text-gray-500 font-medium group-hover:text-[#6D28D9] flex items-center gap-1 transition-colors duration-300">
                  <span>Delivered Projects</span>
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </button>

            {/* Stat 2: 99.2% Client Satisfaction */}
            <div className="flex items-center gap-3.5 group p-2 sm:p-2.5 rounded-2xl hover:bg-purple-50/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/25 transition-all duration-300">
                <Smile className="w-6 h-6 text-[#6D28D9] group-hover:text-white stroke-[1.8] group-hover:scale-105 transition-all duration-300" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                  99.2%
                </div>
                <div className="text-xs text-gray-500 font-medium group-hover:text-[#6D28D9] transition-colors duration-300">
                  Client Satisfaction
                </div>
              </div>
            </div>

            {/* Stat 3: 8+ Years of Excellence */}
            <div className="flex items-center gap-3.5 group p-2 sm:p-2.5 rounded-2xl hover:bg-purple-50/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/25 transition-all duration-300">
                <Star className="w-6 h-6 text-[#6D28D9] group-hover:text-white stroke-[1.8] group-hover:scale-105 transition-all duration-300" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                  8+
                </div>
                <div className="text-xs text-gray-500 font-medium group-hover:text-[#6D28D9] transition-colors duration-300">
                  Years of Excellence
                </div>
              </div>
            </div>

            {/* Stat 4: 14+ Countries Served */}
            <div className="flex items-center gap-3.5 group p-2 sm:p-2.5 rounded-2xl hover:bg-purple-50/70 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/25 transition-all duration-300">
                <Globe className="w-6 h-6 text-[#6D28D9] group-hover:text-white stroke-[1.8] group-hover:scale-105 transition-all duration-300" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-display font-extrabold text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                  14+
                </div>
                <div className="text-xs text-gray-500 font-medium group-hover:text-[#6D28D9] transition-colors duration-300">
                  Countries Served
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE WEVERSITY? SECTION MATCHING SCREENSHOT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#6D28D9] block">
            WHY CHOOSE WEVERSITY?
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#18113C] tracking-tight">
            Your Vision. Our Technology.
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            We combine creativity, technology and experience to build digital products that help your business grow, faster and smarter.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Custom Development */}
          <div className="group p-6 rounded-3xl bg-white border border-purple-150/80 shadow-xs hover:border-purple-400 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/25 transition-all duration-300">
              <Code2 className="w-6 h-6 stroke-[2] group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                Custom Development
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 leading-relaxed transition-colors duration-300">
                Tailored solutions for your unique business needs.
              </p>
            </div>
          </div>

          {/* Card 2: High Performance */}
          <div className="group p-6 rounded-3xl bg-white border border-purple-150/80 shadow-xs hover:border-purple-400 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/25 transition-all duration-300">
              <Rocket className="w-6 h-6 stroke-[2] group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                High Performance
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 leading-relaxed transition-colors duration-300">
                Fast, secure and optimized for growth.
              </p>
            </div>
          </div>

          {/* Card 3: Modern Technologies */}
          <div className="group p-6 rounded-3xl bg-white border border-purple-150/80 shadow-xs hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-900/10 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-emerald-600/25 transition-all duration-300">
              <Shield className="w-6 h-6 stroke-[2] group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#18113C] group-hover:text-emerald-700 transition-colors duration-300">
                Modern Technologies
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 leading-relaxed transition-colors duration-300">
                Laravel, Flutter, React and latest tools.
              </p>
            </div>
          </div>

          {/* Card 4: Dedicated Support */}
          <div className="group p-6 rounded-3xl bg-white border border-purple-150/80 shadow-xs hover:border-purple-400 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-4 cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-[#6D28D9] flex items-center justify-center shrink-0 group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/25 transition-all duration-300">
              <Users className="w-6 h-6 stroke-[2] group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                Dedicated Support
              </h3>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 leading-relaxed transition-colors duration-300">
                We're with you, even after delivery.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* COURSES & TRAINING SECTION (EXACT MATCH TO USER SCREENSHOT) */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-4">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9]"></span>
            <span>LEARN WITH WEVERSITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
            Courses &amp; <span className="text-[#6D28D9]">Training</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            Practical, job-ready courses designed to build real-world skills.
          </p>
        </div>

        {/* 4 Course Cards Grid Matching Screenshot Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {COURSES.map((course, idx) => (
            <div 
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className={`group p-6 rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/12 hover:border-purple-400 ${
                idx === 0 
                  ? 'border border-purple-300 shadow-md shadow-purple-900/5' 
                  : 'border border-purple-100/90'
              }`}
            >
              <div className="space-y-4">
                {/* Course Icon Badge */}
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  {course.iconType === 'web' && (
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:text-white transition-all duration-300">
                      <Laptop className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'laravel' && (
                    <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#E11D48] group-hover:bg-[#E11D48] group-hover:border-[#E11D48] group-hover:text-white transition-all duration-300">
                      <Code2 className="w-5 h-5 stroke-[2]" />
                    </div>
                  )}
                  {course.iconType === 'wordpress' && (
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:border-[#2563EB] group-hover:text-white transition-all duration-300">
                      <span className="font-serif font-black text-xl leading-none">W</span>
                    </div>
                  )}
                  {course.iconType === 'flutter' && (
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] group-hover:bg-[#0284C7] group-hover:border-[#0284C7] group-hover:text-white transition-all duration-300">
                      <Smartphone className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'woocommerce' && (
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#7F54B3] group-hover:bg-[#7F54B3] group-hover:border-[#7F54B3] group-hover:text-white transition-all duration-300">
                      <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'ecommerce' && (
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:border-amber-600 group-hover:text-white transition-all duration-300">
                      <Store className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'office' && (
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:border-teal-600 group-hover:text-white transition-all duration-300">
                      <FileSpreadsheet className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'english' && (
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300">
                      <Languages className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'ai' && (
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:border-[#6D28D9] group-hover:text-white transition-all duration-300">
                      <Sparkles className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'seo' && (
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 group-hover:bg-indigo-700 group-hover:border-indigo-700 group-hover:text-white transition-all duration-300">
                      <TrendingUp className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                  {course.iconType === 'finance' && (
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-700 group-hover:border-emerald-700 group-hover:text-white transition-all duration-300">
                      <Banknote className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-1.5 line-clamp-2 leading-relaxed transition-colors duration-300">
                    {course.description}
                  </p>
                </div>

                {/* Skill / Technology Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-100 group-hover:bg-purple-100/70 group-hover:border-purple-200 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row matching image_975cc7ad.png: Starting from + Price + Circle Arrow Button */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Starting from</span>
                  <span className="text-xs font-bold text-[#6D28D9] group-hover:text-[#5B21B6] transition-colors duration-300">{getCoursePrice(course.priceUSD)}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCourse(course);
                  }}
                  className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    idx === 0
                      ? 'bg-[#6D28D9] text-white shadow-xs group-hover:bg-[#5B21B6] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/30'
                      : 'bg-purple-50 text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-purple-600/30'
                  }`}
                  aria-label={`View details for ${course.title}`}
                >
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Meet Our Instructors Teaser Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-150 shadow-xs hover:border-purple-300 hover:shadow-md transition-all">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-[#6D28D9] text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-600/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#18113C]">Want to know who will be teaching you?</div>
              <div className="text-xs text-gray-500">Meet our team of senior software engineers and industry mentors.</div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('teachers')}
            className="px-5 py-2.5 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-2 group transition-all shrink-0"
          >
            <span>Meet Our Teachers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>


      {/* 5. FEATURED PORTFOLIO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">
              Case Studies & Systems
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#18113C] tracking-tight">
              Featured Client Work & Systems
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Explore live platforms, SaaS products, and custom portals engineered by WeVersity across Pakistan, the UK, and international markets.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'saas', label: 'SaaS Platforms' },
              { id: 'web', label: 'Web Portals' },
              { id: 'ecommerce', label: 'E-Commerce' },
              { id: 'enterprise', label: 'Enterprise / ERP' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedPortfolioCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedPortfolioCategory === cat.id
                    ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/20'
                    : 'bg-white border border-purple-100 text-gray-600 hover:text-[#6D28D9]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.slice(0, 6).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer rounded-3xl bg-white border border-purple-100 hover:border-purple-300 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#6D28D9] text-white shadow-xs">
                    {project.categoryLabel}
                  </span>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1 transition-colors z-10"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="absolute bottom-3 left-3 text-xs font-semibold text-white drop-shadow-sm">
                    {project.client} • {project.location}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-display font-bold text-lg text-[#18113C] group-hover:text-[#6D28D9] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between">
                    <span className="text-xs text-gray-600">{project.results[0].label}:</span>
                    <span className="text-sm font-bold text-[#6D28D9]">{project.results[0].metric}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-2">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 hover:underline"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <span className="text-xs font-bold text-[#6D28D9] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Case Study <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Portfolio Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('portfolio')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold text-sm shadow-lg shadow-purple-600/25 hover:shadow-purple-600/35 transition-all group"
          >
            <Package className="w-4 h-4 text-purple-200" />
            <span>View Full Portfolio & Case Studies (12+ Projects)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* 6. FAQS INTERACTIVE SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">Got Questions?</span>
          <h2 className="text-3xl font-display font-bold text-[#18113C]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.slice(0, 4).map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-purple-100 overflow-hidden shadow-xs transition-all hover:border-purple-300 hover:shadow-md"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-[#18113C] hover:text-[#6D28D9] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className="p-1 rounded-lg bg-purple-50 text-[#6D28D9] shrink-0 ml-4 border border-purple-200">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-purple-50 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
