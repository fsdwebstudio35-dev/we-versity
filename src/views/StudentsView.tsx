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
  CheckCircle2
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9] animate-pulse"></span>
            <span>WeVersity Community</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
            Our Registered <span className="text-[#6D28D9]">Students</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Meet the talented individuals learning and growing with WeVersity. Our community consists of dedicated learners from around the globe.
          </p>
        </div>

        {/* Students Grid */}
        {students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {students.map((student) => (
              <div 
                key={student.id}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Card Header with Image */}
                <div className="relative h-48 overflow-hidden bg-purple-100">
                  <img 
                    src={student.avatar} 
                    alt={student.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18113C]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm border border-white/20">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span className="text-[10px] font-bold text-gray-800">Student</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      <Globe className="w-3 h-3 text-purple-300" />
                      <span>{student.country}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4 flex-grow flex flex-col">
                  <div 
                    onClick={() => handleCourseClick(student.primaryCourse)}
                    className="cursor-pointer group/title"
                  >
                    <h3 className="font-display font-extrabold text-lg text-[#18113C] group-hover/title:text-[#6D28D9] transition-colors line-clamp-1">
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[#6D28D9] font-bold text-[11px] uppercase tracking-wide group-hover/title:underline decoration-2 underline-offset-4">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{student.primaryCourse}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 flex-grow italic">
                    "{student.bio}"
                  </p>

                  <div className="space-y-2 pt-2 border-t border-gray-50">
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#6D28D9] group-hover:bg-purple-50 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <span className="line-clamp-1 font-medium">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{student.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-amber-600 group-hover:bg-amber-50 transition-colors">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-medium">{student.country}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleCourseClick(student.primaryCourse)}
                      className="w-full py-2.5 rounded-xl border-2 border-purple-50 group-hover:border-[#6D28D9]/20 group-hover:bg-[#6D28D9] flex items-center justify-center gap-2 text-[#6D28D9] group-hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Verified Learner</span>
                    </button>
                  </div>
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
