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
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section matching Courses Style */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
          <span>EXPERT FACULTY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Mentors &amp; <span className="text-[#6D28D9]">Instructors</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Learn from industry pioneers, senior engineers, and architects who are actively building mission-critical software.
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
            <span>Our Faculty</span>
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
            <span>Live Schedule</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'teachers' ? (
        <>
          {/* 2. Filter & Search Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-purple-150/80 shadow-xs">
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

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search instructors..."
                className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9]"
              />
            </div>
          </div>

          {/* 3. Teachers Grid matching Courses 4-column style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredTeachers.map((teacher, idx) => (
              <div
                key={teacher.id}
                className={`group p-6 rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between relative overflow-hidden border ${
                  idx % 4 === 0 
                    ? 'border-purple-300 shadow-md shadow-purple-900/5' 
                    : 'border-purple-100/90'
                } hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/12 hover:border-purple-400`}
              >
                <div className="space-y-4">
                  {/* Instructor Avatar in square badge style */}
                  <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-[#6D28D9]">
                    <img 
                      src={teacher.avatar} 
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-[#6D28D9] font-bold uppercase tracking-wide mt-0.5">
                      {teacher.role}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-amber-500 text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{teacher.rating} ({teacher.reviewsCount})</span>
                    </div>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-2 line-clamp-3 leading-relaxed transition-colors duration-300">
                      {teacher.bio}
                    </p>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(teacher.skills || []).slice(0, 3).map((skill: string) => (
                      <span
                        key={skill}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-100 group-hover:bg-purple-100/70 group-hover:border-purple-200 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">Expertise</span>
                    <span className="text-xs font-bold text-[#6D28D9] group-hover:text-[#5B21B6] transition-colors duration-300">
                      {teacher.experience}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCourseClick(teacher.primaryCourse)}
                    className="w-9 h-9 rounded-full bg-[#6D28D9] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#5B21B6] group-hover:scale-110 shadow-sm"
                    aria-label="View course"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Live Online Classes Schedule View - Realigned to 4-column grid style */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {sessionsData.map((batch, index) => (
              <div 
                key={index}
                className="group p-6 rounded-3xl bg-white border border-purple-100 transition-all duration-300 flex flex-col justify-between relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/12 hover:border-purple-400 cursor-default"
              >
                <div className="space-y-4">
                  {/* Status Badge in square-ish style */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white transition-all duration-300">
                      <Video className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      batch.seatsLeft.includes('remaining') 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : 'bg-purple-50 text-purple-700 border-purple-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${batch.seatsLeft.includes('remaining') ? 'bg-emerald-500 animate-pulse' : 'bg-purple-500'}`}></span>
                      <span>{batch.seatsLeft}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300 leading-tight">
                      {batch.title}
                    </h3>
                    <p className="text-[10px] font-bold text-[#6D28D9] uppercase tracking-wide mt-1">
                      {batch.level}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-2 line-clamp-3 leading-relaxed transition-colors duration-300">
                      {batch.description}
                    </p>
                  </div>

                  {/* Batch Details Tags */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2 text-[10px] text-gray-600">
                      <Calendar className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span className="truncate">{batch.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-600">
                      <Clock className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>{batch.duration} • Live Zoom</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Row Actions */}
                <div className="pt-5 mt-5 border-t border-gray-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (onOpenQuoteModal) onOpenQuoteModal();
                    }}
                    className="w-full py-2.5 rounded-xl font-bold text-[10px] bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href="https://meet.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl font-bold text-[10px] bg-purple-50 hover:bg-purple-100 text-[#6D28D9] border border-purple-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Demo Link</span>
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
