/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { QuoteModal } from './components/QuoteModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ArticleModal } from './components/ArticleModal';
import { Laptop, Code2, Smartphone, ArrowRight, ShoppingBag, Store, FileSpreadsheet, Languages, Sparkles } from 'lucide-react';
import { CourseModal } from './components/CourseModal';
import { ChatBot } from './components/ChatBot';
import { AdminLoginModal } from './components/AdminLoginModal';
import { SiteLoginGate } from './components/SiteLoginGate';
import { SupabaseConnectModal } from './components/SupabaseConnectModal';

import { HomeView } from './views/HomeView';
import { PortfolioView } from './views/PortfolioView';
import { EstimatorView } from './views/EstimatorView';
import { AboutView } from './views/AboutView';
import { TeachersView } from './views/TeachersView';
import { TeamView } from './views/TeamView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';
import { ContestsView } from './views/ContestsView';
import { StudentsView } from './views/StudentsView';

import { ServiceItem, PortfolioProject, BlogPost, CourseItem, Contest, TeamMember, COURSES, PORTFOLIO_PROJECTS, TEACHERS, TEAM_MEMBERS, CONTESTS, EstimatorConfig, DEFAULT_ESTIMATOR_CONFIG } from './data/maatiData';
import { AboutData, DEFAULT_ABOUT_DATA } from './data/aboutData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currency, setCurrency] = useState<'USD' | 'PKR' | 'GBP'>('PKR');

  // Admin and Device Authorization state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isDeviceAuthorized, setIsDeviceAuthorized] = useState<boolean>(() => {
    return localStorage.getItem('weversity_admin_device_authorized') === 'true';
  });

  // Dynamic Portfolio Projects State (synchronized across website and admin)
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem('weversity_portfolio_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return PORTFOLIO_PROJECTS;
  });

  // Dynamic Cost Estimator Configuration (synchronized across website and admin)
  const [estimatorConfig, setEstimatorConfig] = useState<EstimatorConfig>(() => {
    try {
      const saved = localStorage.getItem('weversity_estimator_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.projectTypes) && parsed.projectTypes.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_ESTIMATOR_CONFIG;
  });

  // Dynamic About Us Data (synchronized across website and admin)
  const [aboutData, setAboutData] = useState<AboutData>(() => {
    try {
      const saved = localStorage.getItem('weversity_about_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.hero && parsed.milestones && parsed.leadership) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_ABOUT_DATA;
  });

  // Dynamic Company Info
  const [companyInfo, setCompanyInfo] = useState({
    name: "WeVersity",
    email: "info@weversity.com",
    phone: "+92 301 9249721",
    logo: "/assets/aistudio/image_ec98d7d2.png",
    address: "Turner Road, Off Mall Road, Garhi Shahu, Lahore, Pakistan",
  });

  const [teachers, setTeachers] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('weversity_teachers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return TEACHERS;
  });
  const [sessions, setSessions] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('weversity_sessions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [contests, setContests] = useState<Contest[]>(() => {
    try {
      const saved = localStorage.getItem('weversity_contests');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return CONTESTS;
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('weversity_team_members');
      if (saved) return JSON.parse(saved);
    } catch {}
    return TEAM_MEMBERS;
  });
  const [students, setStudents] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('weversity_students');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const handleUpdateProjects = (newProjects: PortfolioProject[]) => {
    setPortfolioProjects(newProjects);
    try {
      localStorage.setItem('weversity_portfolio_projects', JSON.stringify(newProjects));
    } catch {
      // ignore
    }
  };

  const handleUpdateTeachers = (newTeachers: any[]) => {
    setTeachers(newTeachers);
    try {
      localStorage.setItem('weversity_teachers', JSON.stringify(newTeachers));
    } catch {}
  };

  const handleUpdateStudents = (newStudents: any[]) => {
    setStudents(newStudents);
    try {
      localStorage.setItem('weversity_students', JSON.stringify(newStudents));
    } catch {}
  };

  const handleUpdateSessions = (newSessions: any[]) => {
    setSessions(newSessions);
    try {
      localStorage.setItem('weversity_sessions', JSON.stringify(newSessions));
    } catch {}
  };

  const handleUpdateContests = (newContests: Contest[]) => {
    setContests(newContests);
    try {
      localStorage.setItem('weversity_contests', JSON.stringify(newContests));
    } catch {}
  };

  const handleUpdateTeamMembers = (newMembers: TeamMember[]) => {
    setTeamMembers(newMembers);
    try {
      localStorage.setItem('weversity_team_members', JSON.stringify(newMembers));
    } catch {}
  };

  const handleUpdateEstimatorConfig = (newConfig: EstimatorConfig) => {
    setEstimatorConfig(newConfig);
    try {
      localStorage.setItem('weversity_estimator_config', JSON.stringify(newConfig));
    } catch {
      // ignore
    }
    fetch('/api/estimator', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newConfig)
    }).catch(() => {});
  };

  const handleUpdateAboutData = (newAbout: AboutData) => {
    setAboutData(newAbout);
    try {
      localStorage.setItem('weversity_about_data', JSON.stringify(newAbout));
      window.dispatchEvent(new CustomEvent('weversity_about_updated', { detail: newAbout }));
    } catch {
      // ignore
    }
    fetch('/api/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAbout)
    }).catch(() => {});
  };

  const handleUpdateCompanyInfo = (newInfo: any) => {
    setCompanyInfo(newInfo);
    try {
      localStorage.setItem('weversity_company_info', JSON.stringify(newInfo));
    } catch {}
  };

  // Sync with backend API on mount
  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.projects)) {
          handleUpdateProjects(data.projects);
        }
      })
      .catch(() => {});

    fetch('/api/estimator')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.config) {
          handleUpdateEstimatorConfig(data.config);
        }
      })
      .catch(() => {});

    fetch('/api/about')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.about) {
          handleUpdateAboutData(data.about);
        }
      })
      .catch(() => {});

    fetch('/api/company')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.company) {
          handleUpdateCompanyInfo(data.company);
        }
      })
      .catch(() => {});

    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.teachers)) {
          handleUpdateTeachers(data.teachers);
        }
      })
      .catch(() => {});

    fetch('/api/sessions')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.sessions)) {
          handleUpdateSessions(data.sessions);
        }
      })
      .catch(() => {});

    fetch('/api/contests')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.contests)) {
          handleUpdateContests(data.contests);
        }
      })
      .catch(() => {});

    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.members)) {
          handleUpdateTeamMembers(data.members);
        }
      })
      .catch(() => {});

    fetch('/api/students')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.students)) {
          handleUpdateStudents(data.students);
        }
      })
      .catch(() => {});
  }, []);

  // Modals state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [quoteServiceId, setQuoteServiceId] = useState<string | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handle ESC key to close open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsQuoteModalOpen(false);
        setIsSupabaseModalOpen(false);
        setSelectedProject(null);
        setSelectedArticle(null);
        setSelectedCourse(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenQuoteModal = (serviceId?: string) => {
    setQuoteServiceId(serviceId);
    setIsQuoteModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setActiveTab('home');
  };

  const handleSelectProject = (project: PortfolioProject) => {
    setSelectedProject(project);
  };

  const handleSelectArticle = (article: BlogPost) => {
    setSelectedArticle(article);
  };

  // Handle Ctrl+Shift+A hotkey & hash for hidden admin portal
  useEffect(() => {
    const handleAdminHotKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminLoginOpen(true);
      }
    };
    window.addEventListener('keydown', handleAdminHotKey);

    if (window.location.hash === '#admin') {
      setIsAdminLoginOpen(true);
    }

    return () => window.removeEventListener('keydown', handleAdminHotKey);
  }, []);

  // Site Login Gate state
  const [isSiteUnlocked, setIsSiteUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('weversity_site_unlocked') === 'true';
  });

  if (!isSiteUnlocked) {
    return (
      <SiteLoginGate
        onUnlock={(targetTab, userData) => {
          sessionStorage.setItem('weversity_site_unlocked', 'true');
          
          if (userData) {
            const newUser = {
              ...userData,
              id: `${userData.isTeacher ? 'teacher' : 'student'}-${Date.now()}`
            };

            if (userData.isTeacher) {
              const updatedTeachers = [newUser, ...teachers];
              handleUpdateTeachers(updatedTeachers);
              
              // Also sync to backend
              fetch('/api/teachers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
              }).catch(() => {});
            } else {
              const updatedStudents = [newUser, ...students];
              handleUpdateStudents(updatedStudents);
              
              // Also sync to backend
              fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
              }).catch(() => {});
            }
          }

          if (targetTab) {
            setActiveTab(targetTab);
          }
          setIsSiteUnlocked(true);
        }}
      />
    );
  }

  if (isAdminOpen) {
    return (
      <AdminView
        onViewWebsite={() => setIsAdminOpen(false)}
        onLogout={() => {
          setIsAdminOpen(false);
          localStorage.removeItem('weversity_admin_auth');
        }}
        projects={portfolioProjects}
        onUpdateProjects={handleUpdateProjects}
        estimatorConfig={estimatorConfig}
        onUpdateEstimatorConfig={handleUpdateEstimatorConfig}
        aboutData={aboutData}
        onUpdateAboutData={handleUpdateAboutData}
        onUpdateCompanyInfo={handleUpdateCompanyInfo}
        onUpdateTeachers={handleUpdateTeachers}
        onUpdateSessions={handleUpdateSessions}
        contests={contests}
        onUpdateContests={handleUpdateContests}
        teamMembers={teamMembers}
        onUpdateTeamMembers={handleUpdateTeamMembers}
        onUpdateStudents={handleUpdateStudents}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9FD] text-gray-900 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-950">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={handleOpenQuoteModal}
        onSelectService={handleSelectService}
        currency={currency}
        setCurrency={setCurrency}
        isDeviceAuthorized={isDeviceAuthorized}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPanel={() => setIsAdminOpen(true)}
        companyInfo={companyInfo}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onOpenQuoteModal={handleOpenQuoteModal}
            onSelectService={handleSelectService}
            onSelectProject={handleSelectProject}
            onSelectCourse={(course) => setSelectedCourse(course)}
            currency={currency}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            onOpenAdminPanel={() => setIsAdminOpen(true)}
            isDeviceAuthorized={isDeviceAuthorized}
            projects={portfolioProjects}
            companyInfo={companyInfo}
            onLogout={() => {
              sessionStorage.removeItem('weversity_site_unlocked');
              setIsSiteUnlocked(false);
            }}
          />
        )}

        {activeTab === 'courses' && (
          <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
                <span>LEARN WITH WEVERSITY</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
                Courses &amp; <span className="text-[#6D28D9]">Training</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Practical, job-ready courses designed by senior software engineers. Gain real skills, build production-level portfolios, and get certified.
              </p>
            </div>

            {/* Courses Grid Matching Screenshot Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {COURSES.map((course, idx) => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
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

                  {/* Bottom Row: Starting from + Price + Circle Arrow Button */}
                  <div className="pt-5 mt-5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Starting from</span>
                      <span className="text-xs font-bold text-[#6D28D9] group-hover:text-[#5B21B6] transition-colors duration-300">
                        {currency === 'PKR' ? `₨ ${(course.priceUSD * 280).toLocaleString()}` : currency === 'GBP' ? `£ ${Math.round(course.priceUSD * 0.79)}` : `$${course.priceUSD}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourse(course);
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

            {/* Training Guarantees Strip */}
            <div className="p-8 rounded-3xl bg-white border border-purple-150 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-1">
                <div className="text-lg font-bold text-[#18113C]">100% Practical &amp; Live</div>
                <div className="text-xs text-gray-500">No pre-recorded fluff. Live interactive cohorts with code reviews.</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-[#18113C]">Verified Certificate</div>
                <div className="text-xs text-gray-500">Official WeVersity verifiable certificate &amp; LinkedIn endorsement.</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-[#18113C]">Internship Placement</div>
                <div className="text-xs text-gray-500">Top performers qualify for paid internships at WeVersity software house.</div>
              </div>
            </div>
          </div>
        )}



        {activeTab === 'portfolio' && (
          <PortfolioView
            onSelectProject={handleSelectProject}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
            projects={portfolioProjects}
          />
        )}

        {activeTab === 'estimator' && (
          <EstimatorView
            onOpenQuoteModal={handleOpenQuoteModal}
            currency={currency}
            setCurrency={setCurrency}
            config={estimatorConfig}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onOpenQuoteModal={() => handleOpenQuoteModal()}
            setActiveTab={setActiveTab}
            aboutData={aboutData}
          />
        )}

        {activeTab === 'team' && (
          <TeamView
            onOpenQuoteModal={handleOpenQuoteModal}
            setActiveTab={setActiveTab}
            members={teamMembers}
          />
        )}

        {activeTab === 'contests' && (
          <ContestsView
            contests={contests}
          />
        )}

        {(activeTab === 'teachers' || activeTab === 'blog') && (
          <TeachersView
            onSelectCourse={(course) => setSelectedCourse(course)}
            onOpenQuoteModal={handleOpenQuoteModal}
            teachers={teachers}
            sessions={sessions}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView currency={currency} companyInfo={companyInfo} />
        )}

        {activeTab === 'students' && (
          <StudentsView 
            students={students} 
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onSelectService={handleSelectService}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        companyInfo={companyInfo}
      />

      {/* Scroll to Top floating button */}
      <ScrollToTopButton />

      {/* Floating WhatsApp trigger with direct connection */}
      <WhatsAppFloatingButton />
      <ChatBot />

      {/* Interactive Modals */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        currency={currency}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialServiceId={quoteServiceId}
        currency={currency}
      />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Admin Login Modal (Accessible via Ctrl+Shift+A, Logo Double-Click, or on Authorized PCs) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(remember) => {
          if (remember) {
            setIsDeviceAuthorized(true);
          }
          setIsAdminOpen(true);
          setIsAdminLoginOpen(false);
        }}
      />

      {/* Supabase Direct Credentials & Connection Modal */}
      <SupabaseConnectModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />

    </div>
  );
}
