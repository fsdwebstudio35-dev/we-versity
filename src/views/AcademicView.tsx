import React from 'react';
import { motion, Variants } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Calendar,
  Users,
  Search,
  ArrowRight,
  Sparkles,
  FileCheck,
  Trophy,
  Star
} from 'lucide-react';
import { 
  AcademicData,
  AcademicPillar,
  AcademicCohort
} from '../data/maatiData';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
  }
};

const getIcon = (name: string) => {
  switch (name) {
    case 'ShieldCheck': return ShieldCheck;
    case 'FileCheck': return FileCheck;
    case 'Users': return Users;
    case 'Calendar': return Calendar;
    case 'Trophy': return Trophy;
    case 'Star': return Star;
    case 'Award': return Award;
    case 'GraduationCap': return GraduationCap;
    default: return BookOpen;
  }
};

interface AcademicViewProps {
  data: AcademicData;
  setActiveTab: (tab: string) => void;
  onOpenQuoteModal: (serviceId?: string) => void;
}

export const AcademicView: React.FC<AcademicViewProps> = ({ data, setActiveTab, onOpenQuoteModal }) => {
  return (
    <div className="py-12 sm:py-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Academic Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>KMAWD ACADEMIA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight relative group">
            Academic <span className="text-[#6D28D9] relative inline-block">
              Programs
              <span className="absolute -inset-1 bg-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            </span> & Standards
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Our academic framework is built by industry veterans to ensure every student graduates with production-ready skills and internationally recognized certifications.
          </p>
        </motion.div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.pillars.map((pillar, idx) => {
            const Icon = getIcon(pillar.iconName);
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#18113C] mb-3">{pillar.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Section */}
        <div className="bg-[#18113C] rounded-[40px] p-8 lg:p-12 relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Global Verification System</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                Verify Your KMAWD <br />
                <span className="text-purple-400">Digital Certificate</span>
              </h2>
              <p className="text-purple-200/70 text-sm leading-relaxed max-w-md">
                Every certificate issued by KMAWD contains a unique hash verified on our portal. Employers can instantly check the authenticity of student achievements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Enter Certificate ID..." 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:border-purple-400 transition-all outline-none"
                  />
                </div>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  Verify Now
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl font-black text-purple-400 mb-1">{stat.val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Calendar / Upcoming Cohorts */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold text-[#18113C]">Academic Calendar</h2>
              <p className="text-sm text-gray-500">Upcoming cohort start dates and enrollment deadlines.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.cohorts.map((cohort, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-purple-100 flex items-center justify-between hover:border-purple-300 transition-all shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6D28D9]">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-[#18113C]">{cohort.course}</div>
                    <div className="text-xs text-gray-500 font-medium">Batch Starts: {cohort.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 border ${
                    cohort.status === 'Closed' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    {cohort.status}
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold">{cohort.spots}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-[40px] bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-150 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#18113C]">
            Begin Your Academic Journey
          </h3>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            Join the next generation of software craftsmen. Our admissions team is ready to help you choose the right path.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20 group"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Enroll Now</span>
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-[#6D28D9] bg-white border border-purple-200 hover:bg-purple-50 transition-all flex items-center gap-2 group"
            >
              <span>View Brochure</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

