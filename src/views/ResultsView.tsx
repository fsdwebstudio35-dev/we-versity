import React from 'react';
import { motion, Variants } from 'motion/react';
import { 
  Award, 
  CheckCircle2, 
  Trophy, 
  Star, 
  Search, 
  ArrowRight,
  Calendar,
  BookOpen
} from 'lucide-react';
import { Result } from '../data/maatiData';

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
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

interface ResultsViewProps {
  results: Result[];
  setActiveTab: (tab: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ results, setActiveTab }) => {
  return (
    <div className="py-12 sm:py-20 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>ACADEMIC EXCELLENCE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight relative group">
              Student <span className="text-[#6D28D9] relative inline-block">
                Results
                <span className="absolute -inset-1 bg-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
              </span> & Achievements
            </h1>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Celebrating the hard work and success of our dedicated learners. Browse certified course results and top performers across all cohorts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={() => setActiveTab('academic')}
              className="px-6 py-2.5 rounded-full bg-[#6D28D9] text-white text-sm font-bold shadow-lg shadow-purple-600/25 hover:bg-[#5B21B6] transition-all flex items-center gap-2.5 group cursor-pointer"
            >
              <Award className="w-4 h-4 text-purple-200 group-hover:scale-110 transition-transform" />
              <span>Academic</span>
            </button>
          </motion.div>
        </div>

        {/* Search & Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-2xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center gap-4"
        >
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search student name or roll number..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-purple-300 focus:ring-0 text-sm transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select className="flex-grow md:w-48 px-4 py-2.5 rounded-xl border border-gray-100 text-sm focus:border-purple-300 outline-none">
              <option>All Courses</option>
              <option>Web Development</option>
              <option>Laravel Backend</option>
              <option>UI/UX Design</option>
              <option>Claude AI Mastery</option>
            </select>
          </div>
        </motion.div>

        {/* Results Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {results.map((res) => (
            <motion.div 
              key={res.id}
              variants={itemVariants}
              className="group p-6 rounded-3xl bg-white border border-purple-100 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl border-2 border-purple-50 overflow-hidden group-hover:border-purple-300 transition-colors bg-purple-50">
                    <img src={res.avatar} alt={res.studentName} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-[#6D28D9] group-hover:scale-110 transition-transform origin-right">
                      {res.score}
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                      res.status === 'Distinction' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-purple-50 text-purple-700 border-purple-100'
                    }`}>
                      {res.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-[#18113C] group-hover:text-[#6D28D9] transition-colors">
                    {res.studentName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{res.courseTitle}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[10px] font-medium text-gray-500">{res.date}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-600">Certified</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-purple-100 border border-white flex items-center justify-center text-[10px] font-bold text-purple-600 shadow-sm">
                    <Trophy className="w-3 h-3" />
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTab('contact')}
                  className="text-[11px] font-bold text-[#6D28D9] flex items-center gap-1 group/btn hover:underline transition-all cursor-pointer"
                >
                  View Certificate <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Global Statistics Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-[#18113C] text-white overflow-hidden relative shadow-xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -ml-24 -mb-24" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-black text-purple-400">94%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Avg. Score</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-purple-400">1.2k+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Graduates</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-purple-400">450+</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Distinctions</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-purple-400">100%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Verified</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
