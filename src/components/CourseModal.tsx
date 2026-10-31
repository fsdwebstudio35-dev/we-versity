import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  Clock, 
  Bell, 
  Briefcase, 
  Infinity as InfinityIcon, 
  ArrowRight,
  Download,
  Send,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CourseItem, COMPANY_INFO } from '../data/maatiData';

interface CourseModalProps {
  course: CourseItem | null;
  onClose: () => void;
  currency: 'USD' | 'PKR' | 'GBP';
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  currency
}) => {
  const [enrolled, setEnrolled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEnrollForm, setShowEnrollForm] = useState(false);

  if (!course) return null;

  const formatPrice = (usd: number) => {
    if (currency === 'PKR') {
      return `₨ ${(usd * 280).toLocaleString()}`;
    } else if (currency === 'GBP') {
      return `£ ${Math.round(usd * 0.79).toLocaleString()}`;
    }
    return `$${usd}`;
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEnrolled(true);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (err) {
        // ignore
      }
    }, 700);
  };

  const handleDownloadSyllabus = () => {
    const textContent = `MAATI TECH - COURSE SYLLABUS\n\nCourse: ${course.title}\nDuration: ${course.duration}\nFormat: ${course.classesFormat}\n\nWHAT YOU'LL LEARN:\n${course.whatYouLearn.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}\n\nContact: ${COMPANY_INFO.phone} | ${COMPANY_INFO.email}\nWebsite: https://weversity.com/`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${course.id}-syllabus.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-gray-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white border border-purple-150 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/90 hover:bg-gray-100 text-gray-500 hover:text-gray-900 border border-gray-200 shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {enrolled ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-950">
              Enrollment Confirmed!
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
              Welcome aboard, <strong className="text-gray-900">{name}</strong>! We have registered your seat for <strong className="text-[#6D28D9]">{course.title}</strong>. Our student coordinator will contact you at <strong className="text-gray-900">{email}</strong> and WhatsApp with your class schedule and LMS access details.
            </p>
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 max-w-sm mx-auto text-xs text-gray-700 space-y-1 text-left">
              <div>📅 <strong>Batch:</strong> Upcoming Monday Cohort</div>
              <div>💬 <strong>WhatsApp Support:</strong> {COMPANY_INFO.phone}</div>
              <div>✉️ <strong>Official Email:</strong> {COMPANY_INFO.email}</div>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors"
              >
                Close Window
              </button>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Hi%20Maati%20Tech,%20I%20enrolled%20in%20${encodeURIComponent(course.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-[#E8FAF0] border border-emerald-200 hover:bg-[#D7F5E3] transition-colors"
              >
                Open Student WhatsApp
              </a>
            </div>
          </div>
        ) : showEnrollForm ? (
          /* Enrollment Form View */
          <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <button
                onClick={() => setShowEnrollForm(false)}
                className="text-xs font-bold text-[#6D28D9] hover:underline mb-2 block"
              >
                ← Back to Course Overview
              </button>
              <h3 className="text-2xl font-display font-extrabold text-gray-950">
                Enroll in {course.title}
              </h3>
              <p className="text-xs text-gray-500">
                Fill in your details below to reserve your seat in the live cohort.
              </p>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ali Ahmed"
                  className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                />
              </div>

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-600 block">Total Tuition Fee:</span>
                  <span className="text-xl font-extrabold text-[#6D28D9]">{formatPrice(course.priceUSD)}</span>
                  <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(course.originalPriceUSD)}</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 bg-[#6D28D9] text-white rounded-md">
                  Save {course.discountPercent}%
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Registration...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-purple-200" />
                    <span>Complete Enrollment Now</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Main 2-Column Course Layout Matching Screenshot */
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            
            {/* Left Column */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 border-b md:border-b-0 md:border-r border-gray-100 bg-[#FCFCFD]">
              
              {/* Banner image with Most Popular pill */}
              <div className="relative rounded-2xl overflow-hidden shadow-xs border border-purple-100">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* 3 Metric Pills Row */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-2xl bg-white border border-purple-100 text-center shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto mb-1">
                    <Calendar className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">Duration</div>
                  <div className="text-xs font-extrabold text-[#18113C]">{course.duration}</div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-purple-100 text-center shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto mb-1">
                    <DollarSign className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">Course Fee</div>
                  <div className="text-xs font-extrabold text-[#18113C]">{formatPrice(course.priceUSD)}</div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-purple-100 text-center shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center mx-auto mb-1">
                    <Award className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">Certificate</div>
                  <div className="text-xs font-extrabold text-[#18113C]">Provided</div>
                </div>
              </div>

              {/* What You'll Learn Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-[#18113C]">
                  What You'll Learn
                </h4>
                <div className="space-y-2.5">
                  {course.whatYouLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white">
              <div className="space-y-5">
                
                {/* Course Header */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-purple-50 text-[#6D28D9] border border-purple-200">
                    COURSE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#18113C] tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {course.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Price Box matching screenshot */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-500 font-medium block">Course Fee</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-display font-black text-[#6D28D9]">
                        {formatPrice(course.priceUSD)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(course.originalPriceUSD)}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold text-white bg-[#6D28D9]">
                    Save {course.discountPercent}%
                  </span>
                </div>

                {/* Features List with Icons */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-3 text-xs text-gray-700 font-semibold">
                    <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <span>{course.duration} Duration</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-700 font-semibold">
                    <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
                      <Bell className="w-3.5 h-3.5" />
                    </div>
                    <span>{course.classesFormat}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-700 font-semibold">
                    <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
                      <Briefcase className="w-3.5 h-3.5" />
                    </div>
                    <span>{course.learningType}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-700 font-semibold">
                    <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <span>{course.certificate}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-700 font-semibold">
                    <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6D28D9] flex items-center justify-center shrink-0">
                      <InfinityIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>{course.access}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowEnrollForm(true)}
                  className="w-full py-3.5 rounded-xl font-bold text-xs tracking-wide text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleDownloadSyllabus}
                  className="w-full py-3 rounded-xl font-bold text-xs text-[#6D28D9] bg-white hover:bg-purple-50/60 border border-purple-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-[#6D28D9]" />
                  <span>Download Course Syllabus</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
