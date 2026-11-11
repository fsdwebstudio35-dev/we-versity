import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Award,
  Globe,
  Star,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CourseItem, COURSES } from '../data/maatiData';

interface Student {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  avatar: string;
  primaryCourse: string;
  bio: string;
}

interface StudentsViewProps {
  students: Student[];
  onSelectCourse: (course: CourseItem) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ students, onSelectCourse }) => {
  const handleCourseClick = (courseTitle: string) => {
    const course = COURSES.find(c => c.title === courseTitle);
    if (course) {
      onSelectCourse(course);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-gray-50/50">
      <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* 1. Header Section matching Courses Style */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
          <span>STUDENT COMMUNITY</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Our Registered <span className="text-[#6D28D9]">Learners</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Meet the talented individuals learning and growing with KMAWD. Our community consists of dedicated learners from around the globe.
        </p>
      </div>

      {/* 2. Students Grid matching Courses 4-column style */}
      {students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {students.map((student, idx) => (
            <div 
              key={student.id}
              className={`group p-6 rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between relative overflow-hidden border ${
                idx % 4 === 0 
                  ? 'border-purple-300 shadow-md shadow-purple-900/5' 
                  : 'border-purple-100/90'
              } hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/12 hover:border-purple-400`}
            >
              <div className="space-y-4">
                {/* Student Avatar in square badge style */}
                <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-[#6D28D9]">
                  <img 
                    src={student.avatar} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-[#18113C] group-hover:text-[#6D28D9] transition-colors duration-300">
                    {student.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-[#6D28D9] font-bold text-[10px] uppercase tracking-wide">
                    <BookOpen className="w-3 h-3" />
                    <span>{student.primaryCourse}</span>
                  </div>
                  <p className="text-xs text-gray-500 group-hover:text-gray-600 mt-2 line-clamp-3 leading-relaxed transition-colors duration-300 italic">
                    "{student.bio}"
                  </p>
                </div>

                {/* Info Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-100">
                    {student.country}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Verified Learner
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 block font-medium">Joined From</span>
                  <span className="text-xs font-bold text-[#6D28D9] group-hover:text-[#5B21B6] transition-colors duration-300">
                    {student.country}
                  </span>
                </div>

                <button
                  onClick={() => handleCourseClick(student.primaryCourse)}
                  className="w-9 h-9 rounded-full bg-[#6D28D9] text-white flex items-center justify-center transition-all duration-300 group-hover:bg-[#5B21B6] group-hover:scale-110 shadow-sm"
                  aria-label="View course"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto text-purple-300">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No students registered yet</h3>
            <p className="text-gray-500">Be the first to join our learning community!</p>
          </div>
        )}

      </div>
    </div>
  );
};
