import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Home as HomeIcon, 
  Phone, 
  User, 
  Mail, 
  Lock, 
  UserPlus, 
  CheckCircle2, 
  Sparkles,
  LogIn,
  Eye,
  EyeOff,
  Globe,
  Image as ImageIcon,
  BookOpen,
  Upload
} from 'lucide-react';
import { COURSES } from '../data/maatiData';

const COUNTRIES = [
  "Pakistan", "United Kingdom", "United States", "Canada", "Australia", 
  "Germany", "France", "United Arab Emirates", "Saudi Arabia", "Qatar", 
  "India", "Bangladesh", "Turkey", "Nigeria", "South Africa"
];

interface SiteLoginGateProps {
  onUnlock: (targetTab?: string, userData?: any) => void;
  isDeviceAuthorized?: boolean;
}

export const SiteLoginGate: React.FC<SiteLoginGateProps> = ({ onUnlock, isDeviceAuthorized }) => {
  const [roleMode, setRoleMode] = useState<'student' | 'teacher'>('student');
  const [authAction, setAuthAction] = useState<'signup' | 'signin'>('signup');
  const [isSkipVisible, setIsSkipVisible] = useState(false);

  // Hidden shortcut to skip: Alt+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        onUnlock('home');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUnlock]);

  // Check if device is authorized to show the explicit Skip button
  useEffect(() => {
    // Only show if the specific skip key is set
    if (localStorage.getItem('kmawd_skip_registration_enabled') === 'true') {
      setIsSkipVisible(true);
    }
  }, []);

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]?.title || '');
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 5-second Splash Screen State
  const [isSplashing, setIsSplashing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (roleMode !== 'teacher' && !password.trim()) {
      setError('Please enter your password');
      return;
    }

    setError('');
    setIsSplashing(true);
    setCountdown(5);
  };

  // 5-second countdown timer for logo splash screen
  useEffect(() => {
    if (!isSplashing) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // 5 seconds completed -> open website to appropriate view
      const fullName = `${firstName} ${lastName}`.trim() || 'Student';
      const userData = {
        name: fullName,
        firstName: firstName || fullName.split(' ')[0],
        lastName: lastName || fullName.split(' ').slice(1).join(' '),
        email,
        phoneNumber,
        fatherName,
        country,
        avatar: imageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        primaryCourse: selectedCourse,
        assignedCourses: [selectedCourse],
        bio: roleMode === 'teacher' ? `Professional instructor for ${selectedCourse}.` : `Enrolled student in ${selectedCourse}.`,
        role: roleMode === 'teacher' ? "Registered Instructor" : "Registered Student",
        specialization: selectedCourse,
        experience: roleMode === 'teacher' ? "New Instructor" : "New Student",
        studentsCount: "0",
        rating: 5.0,
        reviewsCount: 0,
        skills: [selectedCourse, roleMode === 'teacher' ? "Teaching" : "Learning"],
        highlights: [roleMode === 'teacher' ? "Newly Registered KMAWD Instructor" : "Newly Registered KMAWD Student"],
        socials: { linkedin: "https://linkedin.com" },
        isTeacher: roleMode === 'teacher'
      };

      onUnlock(roleMode === 'teacher' ? 'teachers' : 'students', userData);
    }
  }, [isSplashing, countdown, onUnlock, roleMode, firstName, lastName, email, phoneNumber, fatherName, country, imageUrl, selectedCourse]);

  // 5-second Splash Screen View
  if (isSplashing) {
    const progressPercent = ((5 - countdown) / 5) * 100;

    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C081F] text-white overflow-hidden selection:bg-purple-600">
        {/* Background Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6D28D9]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-4 max-w-md w-full">
          
          {/* Animated 5-second KMAWD Logo Badge */}
          <div className="relative">
            {/* Pulsing ring around logo */}
            <div 
              className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#6D28D9] via-pink-500 to-purple-400 opacity-70 blur-md animate-spin" 
              style={{ animationDuration: '6s' }} 
            />
            
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-3 border-4 border-purple-400/80 shadow-2xl shadow-purple-900/60 flex items-center justify-center overflow-hidden transform hover:scale-105 transition-transform">
              <img 
                src="/assets/aistudio/KMAWD_Purple_Education_Tech_Logo_52482d2e.png" 
                alt="KMAWD Logo" 
                className="w-full h-full object-contain animate-bounce"
                style={{ animationDuration: '2s' }}
              />
            </div>
            
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-emerald-500 border-4 border-[#0C081F] flex items-center justify-center text-white shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/90 border border-purple-700/60 text-xs font-bold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>{roleMode === 'teacher' ? 'Teacher Registered' : 'Student Verified'} • Launching Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Welcome to <span className="text-[#A78BFA]">KMAWD</span>
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-xs mx-auto">
              {roleMode === 'teacher' ? 'Accessing Teacher Dashboard...' : 'Opening Student Education Portal...'}
            </p>
          </div>

          {/* 5-Second Animated Progress Bar */}
          <div className="w-full space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-purple-300 font-semibold px-1">
              <span>Opening Website in...</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">{countdown}s</span>
            </div>
            <div className="w-full h-3 bg-purple-950/80 border border-purple-800/60 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-[#6D28D9] via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-linear shadow-lg"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="text-[11px] text-purple-400/80 font-mono tracking-wider">
            KMAWD Learn To Earn
          </div>

        </div>
      </div>
    );
  }

  // Student & Teacher Form View Matching Screenshot
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE7FE] via-[#F4F0FF] to-[#E5DCFE] text-gray-900 flex flex-col items-center justify-center p-3 sm:p-6 font-sans relative overflow-hidden selection:bg-purple-600 selection:text-white">
      
      {/* Outer Card Wrapper matching uploaded image */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-purple-100/80 overflow-hidden relative flex flex-col">
        
        {/* Top Right Student / Teacher Toggle Buttons matching screenshot */}
        <div className="p-4 sm:p-6 pb-0 flex flex-wrap items-center justify-between gap-4">
          {/* Hidden Skip Button: Only shows on User's authorized PC */}
          {isSkipVisible ? (
            <button
              onClick={() => onUnlock('home')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-2 shadow-sm md:hidden"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skip Registration</span>
            </button>
          ) : <div />}

          <div className="bg-[#F0EAFF] p-1 rounded-2xl flex items-center gap-1 border border-purple-200/60 shadow-inner">
            
            {/* Student Toggle Button */}
            <button
              type="button"
              onClick={() => setRoleMode('student')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                roleMode === 'student'
                  ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/30'
                  : 'text-[#6D28D9] hover:bg-purple-100/60'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            {/* Teacher Toggle Button */}
            <button
              type="button"
              onClick={() => setRoleMode('teacher')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                roleMode === 'teacher'
                  ? 'bg-[#6D28D9] text-[#ffffff] shadow-md shadow-purple-600/30'
                  : 'text-[#6D28D9] hover:bg-purple-100/60'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Teacher</span>
            </button>

          </div>
        </div>

        {/* Card Body: 2 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 pt-2 gap-8 items-center">
          
          {/* Left Column: Big KMAWD Logo & Campus Image matching screenshot */}
          <div className="md:col-span-5 flex flex-col items-center justify-between h-full border-r-0 md:border-r border-purple-100 pr-0 md:pr-6 space-y-6">
            
            <div className="flex flex-col items-center text-center pt-2 space-y-2">
              {/* Large KMAWD Logo */}
              <div className="w-40 sm:w-48 h-auto flex items-center justify-center">
                <img 
                  src="/assets/aistudio/KMAWD_Purple_Education_Tech_Logo_52482d2e.png" 
                  alt="KMAWD Learn To Earn" 
                  className="w-full object-contain"
                />
              </div>

              <p className="text-xs text-purple-700 font-semibold pt-1">
                KMAWD Education Portal
              </p>
            </div>

            {/* Campus Background Image matching screenshot bottom */}
            <div className="w-full h-32 sm:h-40 rounded-2xl overflow-hidden border border-purple-200/80 shadow-md relative group">
              <img 
                src="/assets/aistudio/hero_illustration_full.png" 
                alt="KMAWD Campus" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  KMAWD • Excellence in Learning
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Registration / Sign Up Form matching screenshot */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Title Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1F173B] tracking-tight">
                {roleMode === 'student' ? (
                  <>Create <span className="text-[#6D28D9]">Account</span></>
                ) : (
                  <>Teacher <span className="text-[#6D28D9]">Form</span></>
                )}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {roleMode === 'student' 
                  ? 'Fill out your details to enroll as a student' 
                  : 'Submit teacher registration credentials'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  {error}
                </div>
              )}

               {authAction === 'signup' && (
                <>
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#6D28D9]" />
                        <span>First Name</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#6D28D9]" />
                        <span>Last Name</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
                      />
                    </div>
                  </div>

                  {/* Country Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Country</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all cursor-pointer"
                    >
                      {COUNTRIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Phone Number Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Phone Number (Numbers Only)</span>
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, ''); // Numeric only
                        setPhoneNumber(val);
                      }}
                      placeholder="Enter Phone Number"
                      className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
                    />
                  </div>

                  {/* Father Name Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>Father Name</span>
                    </label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="Enter Father Name"
                      className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
                    />
                  </div>
                </>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#6D28D9]" />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
                />
              </div>

              {/* Password Field - Hidden for Teachers */}
              {roleMode !== 'teacher' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#6D28D9]" />
                    <span>Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-700 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {authAction === 'signup' && (
                <>
                  {/* Image URL Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1F173B] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#6D28D9]" />
                        <span>Profile Image</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] font-bold text-[#6D28D9] flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Upload className="w-2.5 h-2.5" />
                        <span>Upload File</span>
                      </button>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Paste URL or click Upload"
                        className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl pl-4 pr-10 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      {imageUrl && (
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full overflow-hidden border border-purple-200">
                          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Selection Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#1F173B] flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span>{roleMode === 'teacher' ? 'Select Your Course' : 'Interested Course'}</span>
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full bg-[#FAF8FF] border border-purple-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all cursor-pointer"
                    >
                      {COURSES.map(course => (
                        <option key={course.id} value={course.title}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {/* Submit Button matching purple pill in screenshot */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-extrabold text-sm text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  {authAction === 'signup' ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>{roleMode === 'teacher' ? 'Register' : 'Sign up'}</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign in to Portal</span>
                    </>
                  )}
                </button>
                
                {/* Skip Registration Button */}
                {isSkipVisible && (
                  <button
                    type="button"
                    onClick={() => onUnlock('home')}
                    className="w-full py-2.5 rounded-2xl font-bold text-xs text-[#6D28D9] bg-purple-50 hover:bg-purple-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Skip Registration</span>
                  </button>
                )}
              </div>

            </form>

            {/* Footer Sign in toggle matching screenshot */}
            <div className="pt-2 text-center text-xs text-gray-600">
              {authAction === 'signup' ? (
                <p>
                  Already a Member?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthAction('signin')}
                    className="font-bold text-[#6D28D9] hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <p>
                  Need an Account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthAction('signup')}
                    className="font-bold text-[#6D28D9] hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </p>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
