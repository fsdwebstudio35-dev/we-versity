import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Star, 
  Users, 
  Award, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight,
  BookOpen,
  Sparkles,
  Video,
  Laptop,
  Wifi,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { TEACHERS, Teacher, COURSES, CourseItem, COMPANY_INFO } from '../data/maatiData';

interface TeachersViewProps {
  onSelectCourse?: (course: CourseItem) => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
  teachers?: any[];
  sessions?: any[];
}

export const TeachersView: React.FC<TeachersViewProps> = ({
  onSelectCourse,
  onOpenQuoteModal,
  teachers,
  sessions
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'teachers' | 'online_classes'>('teachers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Instructors' },
    { id: 'ai', label: 'CEO & Claude AI' },
    { id: 'web', label: 'Web Development' },
    { id: 'seo', label: 'SEO & Growth' },
    { id: 'office', label: 'Editing & Content' },
    { id: 'english', label: 'Spoken English' },
  ];

  const teachersData = teachers && teachers.length > 0 ? teachers : TEACHERS;
  const sessionsData = sessions && sessions.length > 0 ? sessions : [
    {
      id: "batch-1",
      title: "Full-Stack Web Development Live Cohort",
      instructor: "Rehan Ahmad & Zain Tariq",
      schedule: "Mon, Wed, Fri • 8:00 PM - 10:00 PM PKT",
      duration: "4 Weeks",
      level: "Beginner to Advanced",
      seatsLeft: "4 seats remaining",
      description: "Interactive live Zoom sessions with real-time code debugging, git repository reviews, and production project deployment."
    },
    {
      id: "batch-2",
      title: "Claude AI & Prompt Engineering Masterclass",
      instructor: "Shahbaz Aslam (CEO)",
      schedule: "Tue, Thu • 7:00 PM - 9:00 PM PKT",
      duration: "4 Weeks",
      level: "Professionals & Founders",
      seatsLeft: "Enrollment Open",
      description: "Direct mentorship on Anthropic Claude 3.5 Sonnet, workflow automation, Claude Code, and building generative AI tools."
    }
  ];

  const filteredTeachers = teachersData.filter(teacher => {
    const matchesCategory = selectedCategory === 'all' || teacher.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      teacher.name.toLowerCase().includes(query) ||
      teacher.role.toLowerCase().includes(query) ||
      teacher.specialization?.toLowerCase().includes(query) ||
      (teacher.primaryCourse || '').toLowerCase().includes(query) ||
      (teacher.skills || []).some((skill: string) => skill.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const handleCourseClick = (courseTitle: string) => {
    if (!onSelectCourse) return;
    const matched = COURSES.find(c => 
      c.title.toLowerCase().includes(courseTitle.toLowerCase()) ||
      courseTitle.toLowerCase().includes(c.title.toLowerCase())
    );
    if (matched) {
      onSelectCourse(matched);
    } else {
      onSelectCourse(COURSES[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* 1. Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider shadow-xs">
          <GraduationCap className="w-4 h-4 text-[#6D28D9]" />
          <span>Live Online Classes &amp; Expert Mentorship</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Interactive Live Sessions &amp; <span className="text-[#6D28D9]">Expert Faculty</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Join our live interactive online classes or explore our senior software engineering faculty. Learn with real-time screen sharing, code reviews, and direct mentorship.
        </p>

        {/* Sub-tab Switcher */}
        <div className="inline-flex p-1.5 rounded-2xl bg-purple-100/70 border border-purple-200/80 shadow-xs mt-4">
          <button
            onClick={() => setActiveSubTab('teachers')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'teachers'
                ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/25'
                : 'text-gray-700 hover:text-[#6D28D9]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Our Teachers &amp; Faculty</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab('online_classes')}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeSubTab === 'online_classes'
                ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/25'
                : 'text-gray-700 hover:text-[#6D28D9]'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Live Online Classes Schedule</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'teachers' ? (
        <>
          {/* 2. Filter & Search Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-purple-150/80 shadow-xs">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === c.id
                      ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/25 scale-[1.02]'
                      : 'bg-purple-50/60 text-gray-600 hover:text-gray-950 hover:bg-purple-100/60'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teachers by name or skill..."
                className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl pl-9 pr-3.5 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
              />
            </div>
          </div>

          {/* 3. Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="group rounded-3xl bg-white border border-purple-150/90 hover:border-purple-400 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="space-y-5">
                  
                  {/* Top Row: Avatar + Verified Tag + Rating */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-200 group-hover:border-[#6D28D9] shadow-sm transition-colors duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#6D28D9] text-white flex items-center justify-center border-2 border-white shadow-xs" title="Verified Instructor">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-150 group-hover:bg-[#6D28D9] group-hover:text-white group-hover:border-[#6D28D9] transition-all duration-300">
                          {teacher.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{teacher.rating}</span>
                          <span className="text-[10px] text-gray-400 font-normal">({teacher.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-display font-extrabold text-base sm:text-lg text-[#18113C] group-hover:text-[#6D28D9] transition-colors truncate">
                        {teacher.name}
                      </h3>

                      <p className="text-xs font-medium text-purple-700 truncate group-hover:text-purple-900 transition-colors">
                        {teacher.role}
                      </p>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-center group-hover:bg-purple-100/40 group-hover:border-purple-200 transition-all duration-300">
                    <div>
                      <div className="text-[10px] text-gray-400 font-medium">Experience</div>
                      <div className="text-xs font-extrabold text-[#18113C] group-hover:text-[#6D28D9] transition-colors">{teacher.experience}</div>
                    </div>
                    <div className="border-l border-purple-200/60">
                      <div className="text-[10px] text-gray-400 font-medium">Students Mentored</div>
                      <div className="text-xs font-extrabold text-[#6D28D9] group-hover:text-[#5B21B6] transition-colors">{teacher.studentsCount}</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {teacher.bio}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {(teacher.highlights || []).map((h: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(teacher.skills || []).map((skill: string) => (
                      <span
                        key={skill}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 border border-gray-150 group-hover:border-purple-200 group-hover:bg-purple-50 group-hover:text-purple-900 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2">
                    {/* View Course Button */}
                    <button
                      onClick={() => handleCourseClick(teacher.primaryCourse)}
                      className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5 group/btn"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Course</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    {/* Google Meet Chat with Instructor */}
                    <a
                      href="https://meet.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors flex items-center justify-center shrink-0"
                      title="Join Google Meet with this instructor"
                    >
                      <Video className="w-4 h-4 text-blue-600" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Live Online Classes Schedule View */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessionsData.map((batch, index) => (
              <div 
                key={index}
                className="p-8 rounded-3xl bg-white border border-purple-150 hover:border-purple-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{batch.seatsLeft}</span>
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200">
                      {batch.level}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-gray-900">{batch.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{batch.description}</p>

                  <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <GraduationCap className="w-4 h-4 text-[#6D28D9]" />
                      <span>Instructor: <strong className="text-gray-900">{batch.instructor}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-[#6D28D9]" />
                      <span>Schedule: <strong className="text-gray-900">{batch.schedule}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4 text-[#6D28D9]" />
                      <span>Duration: <strong className="text-gray-900">{batch.duration}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (onOpenQuoteModal) onOpenQuoteModal();
                    }}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Enroll in Live Class</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://meet.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl font-bold text-xs bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>Join Meet</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
