import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Briefcase, 
  Calculator, 
  Building2, 
  GraduationCap, 
  Video, 
  Mail, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  FolderGit2, 
  CheckCircle2, 
  ShieldCheck, 
  Laptop, 
  Lock, 
  Sparkles, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  ToggleLeft, 
  ToggleRight, 
  Play, 
  Info, 
  PhoneCall, 
  HelpCircle,
  Eye,
  EyeOff,
  Check,
  X,
  Share2,
  Globe,
  AlertTriangle,
  DollarSign,
  RefreshCw,
  Layers,
  Sliders,
  CheckSquare,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Award,
  UserCheck,
  Code2,
  Cpu,
  Save,
  Trophy,
  Database,
  Server,
  Star
} from 'lucide-react';
import { 
  COURSES, 
  PORTFOLIO_PROJECTS, 
  TEACHERS, 
  TEAM_MEMBERS, 
  CourseItem, 
  PortfolioProject,
  Contest,
  TeamMember,
  EstimatorConfig,
  DEFAULT_ESTIMATOR_CONFIG,
  EstimatorProjectType,
  EstimatorScaleOption,
  EstimatorDesignTier,
  EstimatorBackendOption,
  EstimatorAddonOption,
  Result,
  AcademicData,
  AcademicCohort,
  DEFAULT_ACADEMIC_DATA
} from '../data/maatiData';
import {
  AboutData,
  DEFAULT_ABOUT_DATA,
  MilestoneItem,
  LeaderItem,
  PrincipleItem,
  OfficeInfo
} from '../data/aboutData';

interface AdminViewProps {
  onViewWebsite: () => void;
  onLogout: () => void;
  projects?: PortfolioProject[];
  onUpdateProjects?: (projects: PortfolioProject[]) => void;
  estimatorConfig?: EstimatorConfig;
  onUpdateEstimatorConfig?: (config: EstimatorConfig) => void;
  aboutData?: AboutData;
  onUpdateAboutData?: (data: AboutData) => void;
  onUpdateCompanyInfo?: (info: any) => void;
  onUpdateTeachers?: (teachers: any[]) => void;
  onUpdateSessions?: (sessions: any[]) => void;
  contests?: Contest[];
  onUpdateContests?: (contests: Contest[]) => void;
  teamMembers?: TeamMember[];
  onUpdateTeamMembers?: (members: TeamMember[]) => void;
  students?: any[];
  onUpdateStudents?: (students: any[]) => void;
  results?: Result[];
  onUpdateResults?: (results: Result[]) => void;
  academicData?: AcademicData;
  onUpdateAcademicData?: (data: AcademicData) => void;
  onOpenSupabaseModal?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  onViewWebsite,
  onLogout,
  projects,
  onUpdateProjects,
  estimatorConfig,
  onUpdateEstimatorConfig,
  aboutData: propAboutData,
  onUpdateAboutData,
  onUpdateCompanyInfo,
  onUpdateTeachers,
  onUpdateSessions,
  contests,
  onUpdateContests,
  teamMembers,
  onUpdateTeamMembers,
  students,
  onUpdateStudents,
  results,
  onUpdateResults,
  academicData: propAcademicData,
  onUpdateAcademicData,
  onOpenSupabaseModal
}) => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'courses' | 'portfolio' | 'estimator' | 'about' | 'teachers' | 'students' | 'results' | 'academic_programs' | 'live_sessions' | 'contests' | 'team_pages' | 'contact' | 'messages' | 'settings' | 'database'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Results CMS State
  const [resultsList, setResultsList] = useState<Result[]>(results || []);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [editingResultId, setEditingResultId] = useState<string | null>(null);
  const [resultForm, setResultForm] = useState<Result>({
    id: '',
    studentName: '',
    courseTitle: '',
    score: '',
    status: 'Distinction',
    date: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=New',
    isCertified: true
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  // Teachers CMS State
  const [teachersList, setTeachersList] = useState<any[]>(TEACHERS);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState<string | null>(null);
  const [teacherForm, setTeacherForm] = useState({
    id: '',
    name: '',
    role: '',
    specialization: '',
    category: 'web' as any,
    categoryLabel: 'Web Development',
    experience: '',
    studentsCount: '',
    bio: '',
    avatar: '/assets/aistudio/image_f804651e.png',
    rating: 5.0,
    reviewsCount: 0,
    primaryCourse: '',
    skills: '' as any, // comma separated in form
    highlights: '' as any, // comma separated in form
    socials: { linkedin: '', github: '' }
  });

  // Live Sessions CMS State
  const [sessionsList, setSessionsList] = useState<any[]>([]);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [sessionForm, setSessionForm] = useState({
    id: '',
    title: '',
    instructor: '',
    date: '',
    time: '',
    duration: '',
    status: 'Upcoming',
    link: '',
    thumbnail: '/assets/aistudio/image_85a3982c.png',
    startTime: ''
  });

  // Contests CMS State
  const [contestsList, setContestsList] = useState<Contest[]>(contests || []);
  const [isContestModalOpen, setIsContestModalOpen] = useState(false);
  const [editingContestId, setEditingContestId] = useState<string | null>(null);
  const [contestForm, setContestForm] = useState<Contest>({
    id: '',
    title: '',
    description: '',
    date: '',
    prize: '',
    status: 'Upcoming',
    image: '/assets/aistudio/hero_illustration_full.png',
    link: ''
  });

  // Team CMS State
  const [teamList, setTeamList] = useState<TeamMember[]>(teamMembers || []);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingTeamMemberId, setEditingTeamMemberId] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState<TeamMember>({
    id: '',
    name: '',
    role: '',
    department: 'engineering',
    departmentLabel: 'Full-Stack Engineering',
    location: 'Lahore, Pakistan',
    experience: '',
    imageUrl: '',
    profileLink: '',
    techStack: [],
    socials: {},
    avatar: '/assets/aistudio/image_f804651e.png',
    bio: '',
    keyAchievement: ''
  });

  // Students CMS State
  const [studentsList, setStudentsList] = useState<any[]>(students || []);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [studentForm, setStudentForm] = useState({
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    country: 'Pakistan',
    primaryCourse: '',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  });

  // Company Info State
  const [companyInfo, setCompanyInfo] = useState({
    name: 'KMAWD',
    email: 'info@kmawd.com',
    phone: '+92 301 9249721',
    logo: '/assets/aistudio/KMAWD_Purple_Education_Tech_Logo_52482d2e.png',
    address: 'Turner Road, Off Mall Road, Garhi Shahu, Lahore, Pakistan',
  });

  // Academic CMS State
  const [academicState, setAcademicState] = useState<AcademicData>(propAcademicData || DEFAULT_ACADEMIC_DATA);
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [editingCohortId, setEditingCohortId] = useState<string | null>(null);
  const [cohortForm, setCohortForm] = useState<AcademicCohort>({
    id: '',
    course: '',
    date: '',
    status: 'Open',
    spots: ''
  });

  // Supabase Config State
  const [supabaseConfig, setSupabaseConfig] = useState({
    url: 'https://omcvimrnemvahuommvbu.supabase.co',
    anonKey: 'sb_publishable_H8IsUdR2bDqeciPmd-2alw_YGfCoveB',
    status: 'Connected & Verified'
  });

  // Logout Password Modal State
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [logoutPassword, setLogoutPassword] = useState('');
  const [logoutPasswordError, setLogoutPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetch('/api/teachers').then(res => res.json()).then(data => {
      if (data.success) setTeachersList(data.teachers);
    });
    fetch('/api/sessions').then(res => res.json()).then(data => {
      if (data.success) setSessionsList(data.sessions);
    });
    fetch('/api/students').then(res => res.json()).then(data => {
      if (data.success && Array.isArray(data.students)) setStudentsList(data.students);
    });
    fetch('/api/company').then(res => res.json()).then(data => {
      if (data.success) setCompanyInfo(data.company);
    });
    fetch('/api/supabase').then(res => res.json()).then(data => {
      if (data.success) setSupabaseConfig(data.config);
    });
    if (contests) setContestsList(contests);
    if (teamMembers) setTeamList(teamMembers);
    if (students && students.length > 0) setStudentsList(students);
    if (results && results.length > 0) setResultsList(results);
    if (propAcademicData) setAcademicState(propAcademicData);
    
    fetch('/api/results').then(res => res.json()).then(data => {
      if (data.success && Array.isArray(data.results)) {
        setResultsList(data.results);
      }
    });
  }, [contests, teamMembers, students, results]);

  const [supabaseTesting, setSupabaseTesting] = useState(false);
  const [supabaseTestMsg, setSupabaseTestMsg] = useState<string | null>(null);

  const handleSaveSupabase = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupabaseTesting(true);
    setSupabaseTestMsg(null);
    try {
      const res = await fetch('/api/supabase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supabaseConfig)
      });
      const data = await res.json();
      if (data.success) {
        setSupabaseConfig(data.config);
        setActionSuccess('Supabase configuration saved & website connected!');
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch {
      setActionSuccess('Supabase configuration updated locally.');
    } finally {
      setSupabaseTesting(false);
    }
  };

  const handleTestSupabase = async () => {
    if (!supabaseConfig.url || !supabaseConfig.anonKey) {
      setSupabaseTestMsg('Please enter both Supabase URL and Anon Key.');
      return;
    }
    setSupabaseTesting(true);
    setSupabaseTestMsg(null);
    try {
      const res = await fetch('/api/supabase/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: supabaseConfig.url, anonKey: supabaseConfig.anonKey })
      });
      const data = await res.json();
      if (data.success) {
        setSupabaseTestMsg(data.status || 'Connection Successful!');
      } else {
        setSupabaseTestMsg(data.status || data.message || 'Connection failed.');
      }
    } catch (err: any) {
      setSupabaseTestMsg('Network error while testing connection.');
    } finally {
      setSupabaseTesting(false);
    }
  };

  const handleSaveContest = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedContest = { ...contestForm, id: editingContestId || 'contest-' + Date.now() };
    
    const res = await fetch('/api/contests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContest)
    });
    const data = await res.json();
    if (data.success) {
      setContestsList(data.contests);
      if (onUpdateContests) onUpdateContests(data.contests);
      setIsContestModalOpen(false);
      setActionSuccess(`Contest "${updatedContest.title}" saved!`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDeleteContest = async (id: string) => {
    const res = await fetch(`/api/contests/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setContestsList(data.contests);
      if (onUpdateContests) onUpdateContests(data.contests);
      setActionSuccess('Contest removed!');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMember = { 
      ...teamForm, 
      id: editingTeamMemberId || 'member-' + Date.now(),
      socials: {
        ...teamForm.socials,
        linkedin: teamForm.profileLink || teamForm.socials.linkedin
      }
    };
    
    const res = await fetch('/api/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMember)
    });
    const data = await res.json();
    if (data.success) {
      setTeamList(data.members);
      if (onUpdateTeamMembers) onUpdateTeamMembers(data.members);
      setIsTeamModalOpen(false);
      setActionSuccess(`Team member ${updatedMember.name} saved!`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setTeamList(data.members);
      if (onUpdateTeamMembers) onUpdateTeamMembers(data.members);
      setActionSuccess('Team member removed!');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = typeof teacherForm.skills === 'string' 
      ? teacherForm.skills.split(',').map(s => s.trim()).filter(Boolean)
      : teacherForm.skills;
    
    const highlightsArray = typeof teacherForm.highlights === 'string' 
      ? teacherForm.highlights.split(',').map(s => s.trim()).filter(Boolean)
      : teacherForm.highlights;

    const updatedTeacher = { 
      ...teacherForm, 
      id: editingTeacherId || 'teacher-' + Date.now(),
      skills: skillsArray,
      highlights: highlightsArray,
      rating: Number(teacherForm.rating) || 5.0,
      reviewsCount: Number(teacherForm.reviewsCount) || 0
    };

    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTeacher)
    });
    const data = await res.json();
    if (data.success) {
      setTeachersList(data.teachers);
      if (onUpdateTeachers) onUpdateTeachers(data.teachers);
      setIsTeacherModalOpen(false);
      setActionSuccess(`Teacher ${updatedTeacher.name} saved!`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setTeachersList(data.teachers);
      if (onUpdateTeachers) onUpdateTeachers(data.teachers);
      setActionSuccess('Teacher removed!');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStudent = { 
      ...studentForm, 
      id: editingStudentId || 'student-' + Date.now() 
    };

    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent)
    });
    const data = await res.json();
    if (data.success) {
      setStudentsList(data.students);
      if (onUpdateStudents) onUpdateStudents(data.students);
      setIsStudentModalOpen(false);
      setActionSuccess(`Student ${updatedStudent.name} saved!`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setStudentsList(data.students);
      if (onUpdateStudents) onUpdateStudents(data.students);
      setActionSuccess('Student removed!');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedResult = { 
      ...resultForm, 
      id: editingResultId || 'result-' + Date.now() 
    };

    const res = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedResult)
    });
    const data = await res.json();
    if (data.success) {
      setResultsList(data.results);
      if (onUpdateResults) onUpdateResults(data.results);
      setIsResultModalOpen(false);
      setActionSuccess(`Result for ${updatedResult.studentName} saved!`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDeleteResult = async (id: string) => {
    const res = await fetch(`/api/results/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setResultsList(data.results);
      if (onUpdateResults) onUpdateResults(data.results);
      setActionSuccess('Result removed!');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleSaveSession = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSession = { ...sessionForm, id: editingSessionId || 'session-' + Date.now() };
    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSession)
    });
    const data = await res.json();
    if (data.success) {
      setSessionsList(data.sessions);
      if (onUpdateSessions) onUpdateSessions(data.sessions);
      setIsSessionModalOpen(false);
      setActionSuccess(`Session "${updatedSession.title}" saved!`);
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleDeleteSession = async (id: string) => {
    const res = await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setSessionsList(data.sessions);
      if (onUpdateSessions) onUpdateSessions(data.sessions);
      setActionSuccess('Session removed!');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleSaveCompanyInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyInfo)
    });
    const data = await res.json();
    if (data.success) {
      if (onUpdateCompanyInfo) onUpdateCompanyInfo(data.company);
      setAboutSavedToast('Company Info updated!');
      setTimeout(() => setAboutSavedToast(null), 3000);
    }
  };

  const saveAcademicData = (newData: AcademicData, successMsg = 'Academic Programs updated!') => {
    setAcademicState(newData);
    if (onUpdateAcademicData) onUpdateAcademicData(newData);
    setActionSuccess(successMsg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleSaveCohort = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedCohorts: AcademicCohort[];
    if (editingCohortId) {
      updatedCohorts = academicState.cohorts.map((c: AcademicCohort) => c.id === editingCohortId ? cohortForm : c);
    } else {
      updatedCohorts = [...academicState.cohorts, { ...cohortForm, id: 'cohort-' + Date.now() }];
    }
    saveAcademicData({ ...academicState, cohorts: updatedCohorts });
    setIsCohortModalOpen(false);
  };

  const handleDeleteCohort = (id: string) => {
    const updatedCohorts = academicState.cohorts.filter((c: AcademicCohort) => c.id !== id);
    saveAcademicData({ ...academicState, cohorts: updatedCohorts }, 'Cohort removed!');
  };

  // Portfolio CMS State (Direct live sync with website)
  const [portfolioList, setPortfolioList] = useState<PortfolioProject[]>(() => {
    return projects && projects.length > 0 ? projects : PORTFOLIO_PROJECTS;
  });
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [portfolioCat, setPortfolioCat] = useState<string>('all');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string, name: string, type: 'project' | 'teacher' | 'student' | 'session' | 'contest' | 'team' | 'result' } | null>(null);

  // Sync with prop updates
  useEffect(() => {
    if (projects && projects.length > 0) {
      setPortfolioList(projects);
    }
  }, [projects]);

  // Cost Estimator CMS State (Direct live sync with website)
  const [estimatorSettings, setEstimatorSettings] = useState<EstimatorConfig>(() => {
    return estimatorConfig || DEFAULT_ESTIMATOR_CONFIG;
  });
  const [estimatorSubTab, setEstimatorSubTab] = useState<'types' | 'addons' | 'scale' | 'design_backend' | 'currency'>('types');
  const [estimatorSavedToast, setEstimatorSavedToast] = useState<string | null>(null);

  // Sync estimator settings when prop changes
  useEffect(() => {
    if (estimatorConfig) {
      setEstimatorSettings(estimatorConfig);
    }
  }, [estimatorConfig]);

  const saveEstimatorConfig = (newConfig: EstimatorConfig, successMsg = 'Changes saved! Front-end Cost Estimator updated.') => {
    setEstimatorSettings(newConfig);
    if (onUpdateEstimatorConfig) {
      onUpdateEstimatorConfig(newConfig);
    }
    setEstimatorSavedToast(successMsg);
    setTimeout(() => {
      setEstimatorSavedToast(null);
    }, 3500);
  };

  // Estimator Modals
  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
  const [typeForm, setTypeForm] = useState({ id: '', name: '', baseUSD: 850, weeks: 3 });

  const [addonModalOpen, setAddonModalOpen] = useState(false);
  const [editingAddonId, setEditingAddonId] = useState<string | null>(null);
  const [addonForm, setAddonForm] = useState({ id: '', name: '', costUSD: 150 });

  const [scaleModalOpen, setScaleModalOpen] = useState(false);
  const [editingScaleId, setEditingScaleId] = useState<string | null>(null);
  const [scaleForm, setScaleForm] = useState({ id: '', label: '', multiplier: 1.0, weeksDelta: 0 });

  const [designModalOpen, setDesignModalOpen] = useState(false);
  const [editingDesignId, setEditingDesignId] = useState<string | null>(null);
  const [designForm, setDesignForm] = useState({ id: '', label: '', costUSD: 250, desc: '' });

  const [backendModalOpen, setBackendModalOpen] = useState(false);
  const [editingBackendId, setEditingBackendId] = useState<string | null>(null);
  const [backendForm, setBackendForm] = useState({ id: '', label: '', costUSD: 200 });

  const [deleteConfirmEstimator, setDeleteConfirmEstimator] = useState<{ type: 'type' | 'addon'; id: string; name: string } | null>(null);

  // Currency form state
  const [currencyForm, setCurrencyForm] = useState({
    pkr: estimatorSettings.currencyRates?.PKR ?? 280,
    gbp: estimatorSettings.currencyRates?.GBP ?? 0.79
  });

  useEffect(() => {
    if (estimatorSettings.currencyRates) {
      setCurrencyForm({
        pkr: estimatorSettings.currencyRates.PKR,
        gbp: estimatorSettings.currencyRates.GBP
      });
    }
  }, [estimatorSettings]);

  // Estimator Simulator State for Admin Testing
  const [simType, setSimType] = useState<string>('custom-web');
  const [simScale, setSimScale] = useState<string>('standard');
  const [simDesign, setSimDesign] = useState<string>('bespoke');
  const [simBackend, setSimBackend] = useState<string>('moderate');
  const [simAddons, setSimAddons] = useState<string[]>(['seo', 'payment']);

  const [projectForm, setProjectForm] = useState({
    id: '',
    title: '',
    category: 'web' as 'saas' | 'ecommerce' | 'web' | 'mobile' | 'enterprise',
    categoryLabel: 'High-Performance Web Portal',
    client: '',
    location: 'Live on Vercel',
    year: '2024',
    summary: '',
    challenge: 'High performance and responsive delivery requirement.',
    solution: 'Engineered with modern React and Tailwind CSS on Vercel infrastructure.',
    tags: 'React, Tailwind CSS, Vercel',
    image: '/assets/aistudio/image_0c0bc5ad.png',
    demoUrl: '',
    metric1Val: '100%',
    metric1Lbl: 'Lighthouse Performance',
    metric2Val: '<0.5s',
    metric2Lbl: 'Page Load Speed',
    metric3Val: '100%',
    metric3Lbl: 'Mobile Responsive'
  });

  const handleOpenCreateProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      id: 'project-' + Date.now(),
      title: '',
      category: 'web',
      categoryLabel: 'High-Performance Web Portal',
      client: '',
      location: 'Live on Vercel',
      year: new Date().getFullYear().toString(),
      summary: '',
      challenge: 'Designing an ultra-responsive, modern application with sub-second delivery.',
      solution: 'Engineered with modern React and Tailwind CSS on Vercel edge infrastructure.',
      tags: 'React, Tailwind CSS, Vercel',
      image: '/assets/aistudio/image_0c0bc5ad.png',
      demoUrl: '',
      metric1Val: '100%',
      metric1Lbl: 'Lighthouse Performance',
      metric2Val: '<0.5s',
      metric2Lbl: 'Page Load Speed',
      metric3Val: '100%',
      metric3Lbl: 'Mobile Responsive'
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (p: PortfolioProject) => {
    setEditingProjectId(p.id);
    const m1 = p.results?.[0] || { metric: '100%', label: 'Lighthouse Performance' };
    const m2 = p.results?.[1] || { metric: '<0.5s', label: 'Page Load Speed' };
    const m3 = p.results?.[2] || { metric: '100%', label: 'Mobile Responsive' };
    setProjectForm({
      id: p.id,
      title: p.title,
      category: p.category,
      categoryLabel: p.categoryLabel,
      client: p.client,
      location: p.location,
      year: p.year,
      summary: p.summary,
      challenge: p.challenge,
      solution: p.solution,
      tags: p.tags.join(', '),
      image: p.image,
      demoUrl: p.demoUrl || '',
      metric1Val: m1.metric,
      metric1Lbl: m1.label,
      metric2Val: m2.metric,
      metric2Lbl: m2.label,
      metric3Val: m3.metric,
      metric3Lbl: m3.label
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      alert('Please enter a project title');
      return;
    }

    const tagsArray = projectForm.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const resultsArray = [
      { metric: projectForm.metric1Val, label: projectForm.metric1Lbl },
      { metric: projectForm.metric2Val, label: projectForm.metric2Lbl },
      { metric: projectForm.metric3Val, label: projectForm.metric3Lbl }
    ].filter(r => r.metric && r.label);

    const targetId = editingProjectId || projectForm.id || ('project-' + Date.now());
    const updatedItem: PortfolioProject = {
      id: targetId,
      title: projectForm.title,
      category: projectForm.category,
      categoryLabel: projectForm.categoryLabel || 'Web Application',
      client: projectForm.client || 'Client Project',
      location: projectForm.location || 'Global',
      year: projectForm.year || '2024',
      summary: projectForm.summary,
      challenge: projectForm.challenge || 'High performance and responsive delivery requirement.',
      solution: projectForm.solution || 'Engineered with modern React and Tailwind CSS.',
      tags: tagsArray.length > 0 ? tagsArray : ['React', 'Web'],
      image: projectForm.image || '/assets/aistudio/image_0c0bc5ad.png',
      demoUrl: projectForm.demoUrl || undefined,
      results: resultsArray.length > 0 ? resultsArray : [{ metric: '100%', label: 'Performance' }]
    };

    let updatedList: PortfolioProject[];
    if (editingProjectId) {
      updatedList = portfolioList.map(p => p.id === editingProjectId ? updatedItem : p);
    } else {
      updatedList = [updatedItem, ...portfolioList];
    }

    setPortfolioList(updatedList);
    if (onUpdateProjects) {
      onUpdateProjects(updatedList);
    }

    try {
      localStorage.setItem('kmawd_portfolio_projects', JSON.stringify(updatedList));
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
      });
    } catch {
      // safe fallback
    }

    setIsProjectModalOpen(false);
    setActionSuccess(editingProjectId 
      ? `Project "${updatedItem.title}" updated! Changes are live on the website.` 
      : `Project "${updatedItem.title}" published! Changes are live on the website.`
    );
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const handleDeleteProject = async (id: string) => {
    const target = portfolioList.find(p => p.id === id);
    const updatedList = portfolioList.filter(p => p.id !== id);
    setPortfolioList(updatedList);
    if (onUpdateProjects) {
      onUpdateProjects(updatedList);
    }
    try {
      localStorage.setItem('kmawd_portfolio_projects', JSON.stringify(updatedList));
      await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
    } catch {
      // safe fallback
    }
    setActionSuccess(`Project "${target?.title || 'item'}" removed successfully from website.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  // ==========================================
  // Cost Estimator CMS Handlers (Live Website Sync)
  // ==========================================
  const handleOpenCreateType = () => {
    setEditingTypeId(null);
    setTypeForm({
      id: 'type-' + Date.now(),
      name: '',
      baseUSD: 850,
      weeks: 3
    });
    setTypeModalOpen(true);
  };

  const handleOpenEditType = (item: EstimatorProjectType) => {
    setEditingTypeId(item.id);
    setTypeForm({
      id: item.id,
      name: item.name,
      baseUSD: item.baseUSD,
      weeks: item.weeks
    });
    setTypeModalOpen(true);
  };

  const handleSaveType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeForm.name.trim()) {
      alert('Please enter a project type name');
      return;
    }
    let updatedTypes: EstimatorProjectType[];
    if (editingTypeId) {
      updatedTypes = estimatorSettings.projectTypes.map(t => 
        t.id === editingTypeId ? { ...typeForm, baseUSD: Number(typeForm.baseUSD) || 0, weeks: Number(typeForm.weeks) || 1 } : t
      );
    } else {
      const generatedId = typeForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 25) || ('type-' + Date.now());
      updatedTypes = [
        ...estimatorSettings.projectTypes, 
        { ...typeForm, id: generatedId, baseUSD: Number(typeForm.baseUSD) || 0, weeks: Number(typeForm.weeks) || 1 }
      ];
    }
    const newConfig = { ...estimatorSettings, projectTypes: updatedTypes };
    saveEstimatorConfig(newConfig, `Project type "${typeForm.name}" updated! Live on website.`);
    setTypeModalOpen(false);
  };

  const handleDeleteType = (id: string) => {
    const updatedTypes = estimatorSettings.projectTypes.filter(t => t.id !== id);
    const newConfig = { ...estimatorSettings, projectTypes: updatedTypes };
    saveEstimatorConfig(newConfig, 'Project type removed! Live on website.');
    setDeleteConfirmEstimator(null);
  };

  // Addons Handlers
  const handleOpenCreateAddon = () => {
    setEditingAddonId(null);
    setAddonForm({
      id: 'addon-' + Date.now(),
      name: '',
      costUSD: 150
    });
    setAddonModalOpen(true);
  };

  const handleOpenEditAddon = (item: EstimatorAddonOption) => {
    setEditingAddonId(item.id);
    setAddonForm({
      id: item.id,
      name: item.name,
      costUSD: item.costUSD
    });
    setAddonModalOpen(true);
  };

  const handleSaveAddon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addonForm.name.trim()) {
      alert('Please enter an add-on service name');
      return;
    }
    let updatedAddons: EstimatorAddonOption[];
    if (editingAddonId) {
      updatedAddons = estimatorSettings.addonOptions.map(a => 
        a.id === editingAddonId ? { ...addonForm, costUSD: Number(addonForm.costUSD) || 0 } : a
      );
    } else {
      const generatedId = addonForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 25) || ('addon-' + Date.now());
      updatedAddons = [
        ...estimatorSettings.addonOptions, 
        { ...addonForm, id: generatedId, costUSD: Number(addonForm.costUSD) || 0 }
      ];
    }
    const newConfig = { ...estimatorSettings, addonOptions: updatedAddons };
    saveEstimatorConfig(newConfig, `Add-on "${addonForm.name}" updated! Live on website.`);
    setAddonModalOpen(false);
  };

  const handleDeleteAddon = (id: string) => {
    const updatedAddons = estimatorSettings.addonOptions.filter(a => a.id !== id);
    const newConfig = { ...estimatorSettings, addonOptions: updatedAddons };
    saveEstimatorConfig(newConfig, 'Add-on service removed! Live on website.');
    setDeleteConfirmEstimator(null);
  };

  // Scale Handlers
  const handleOpenEditScale = (item: EstimatorScaleOption) => {
    setEditingScaleId(item.id);
    setScaleForm({
      id: item.id,
      label: item.label,
      multiplier: item.multiplier,
      weeksDelta: item.weeksDelta
    });
    setScaleModalOpen(true);
  };

  const handleSaveScale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScaleId) return;
    const updatedScales = estimatorSettings.scaleOptions.map(s => 
      s.id === editingScaleId ? { 
        ...scaleForm, 
        multiplier: Number(scaleForm.multiplier) || 1, 
        weeksDelta: Number(scaleForm.weeksDelta) || 0 
      } : s
    );
    const newConfig = { ...estimatorSettings, scaleOptions: updatedScales };
    saveEstimatorConfig(newConfig, `Scale option "${scaleForm.label}" updated! Live on website.`);
    setScaleModalOpen(false);
  };

  // Design Tiers Handlers
  const handleOpenEditDesign = (item: EstimatorDesignTier) => {
    setEditingDesignId(item.id);
    setDesignForm({
      id: item.id,
      label: item.label,
      costUSD: item.costUSD,
      desc: item.desc
    });
    setDesignModalOpen(true);
  };

  const handleSaveDesign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDesignId) return;
    const updatedTiers = estimatorSettings.designTiers.map(d => 
      d.id === editingDesignId ? { 
        ...designForm, 
        costUSD: Number(designForm.costUSD) || 0 
      } : d
    );
    const newConfig = { ...estimatorSettings, designTiers: updatedTiers };
    saveEstimatorConfig(newConfig, `Design tier "${designForm.label}" updated! Live on website.`);
    setDesignModalOpen(false);
  };

  // Backend Options Handlers
  const handleOpenEditBackend = (item: EstimatorBackendOption) => {
    setEditingBackendId(item.id);
    setBackendForm({
      id: item.id,
      label: item.label,
      costUSD: item.costUSD
    });
    setBackendModalOpen(true);
  };

  const handleSaveBackend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBackendId) return;
    const updatedBackends = estimatorSettings.backendOptions.map(b => 
      b.id === editingBackendId ? { 
        ...backendForm, 
        costUSD: Number(backendForm.costUSD) || 0 
      } : b
    );
    const newConfig = { ...estimatorSettings, backendOptions: updatedBackends };
    saveEstimatorConfig(newConfig, `Backend option "${backendForm.label}" updated! Live on website.`);
    setBackendModalOpen(false);
  };

  // Currency Rates Handlers
  const handleSaveCurrencyRates = (e: React.FormEvent) => {
    e.preventDefault();
    const newRates = {
      PKR: Number(currencyForm.pkr) || 280,
      GBP: Number(currencyForm.gbp) || 0.79
    };
    const newConfig = { ...estimatorSettings, currencyRates: newRates };
    saveEstimatorConfig(newConfig, `Currency exchange rates updated (${newRates.PKR} PKR / $1)! Live on website.`);
  };

  const handleResetEstimatorDefaults = () => {
    if (window.confirm('Reset all Cost Estimator pricing, formulas, and addons to default values?')) {
      saveEstimatorConfig(DEFAULT_ESTIMATOR_CONFIG, 'Cost Estimator reset to default values! Live on website.');
    }
  };

  // About Us CMS State (Direct live sync with website)
  const [aboutState, setAboutState] = useState<AboutData>(() => {
    if (propAboutData) return propAboutData;
    try {
      const saved = localStorage.getItem('kmawd_about_data');
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

  const [aboutSubTab, setAboutSubTab] = useState<'hero' | 'offices' | 'leadership' | 'milestones' | 'principles' | 'cta'>('hero');
  const [aboutSavedToast, setAboutSavedToast] = useState<string | null>(null);

  // Sync when prop changes
  useEffect(() => {
    if (propAboutData) {
      setAboutState(propAboutData);
    }
  }, [propAboutData]);

  // Master save helper for about data
  const saveAboutData = (newData: AboutData, successMsg = 'About Us changes saved! Live on website.') => {
    setAboutState(newData);
    if (onUpdateAboutData) {
      onUpdateAboutData(newData);
    }
    try {
      localStorage.setItem('kmawd_about_data', JSON.stringify(newData));
      window.dispatchEvent(new CustomEvent('kmawd_about_updated', { detail: newData }));
    } catch {}
    fetch('/api/about', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    }).catch(() => {});

    setAboutSavedToast(successMsg);
    setTimeout(() => {
      setAboutSavedToast(null);
    }, 3500);
  };

  // Hero form state
  const [heroForm, setHeroForm] = useState(aboutState.hero);
  useEffect(() => {
    setHeroForm(aboutState.hero);
  }, [aboutState.hero]);

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...aboutState, hero: heroForm };
    saveAboutData(updated, 'Hero & Mission section updated! Live on website.');
  };

  // Offices form state
  const [officesForm, setOfficesForm] = useState(aboutState.offices);
  useEffect(() => {
    setOfficesForm(aboutState.offices);
  }, [aboutState.offices]);

  const handleSaveOffices = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...aboutState, offices: officesForm };
    saveAboutData(updated, 'Office details (Lahore HQ & London Liaison) updated! Live on website.');
  };

  // CTA form state
  const [ctaForm, setCtaForm] = useState(aboutState.cta);
  useEffect(() => {
    setCtaForm(aboutState.cta);
  }, [aboutState.cta]);

  const handleSaveCTA = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...aboutState, cta: ctaForm };
    saveAboutData(updated, 'Bottom CTA banner updated! Live on website.');
  };

  // Milestone Modal State
  const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [milestoneForm, setMilestoneForm] = useState<MilestoneItem>({
    id: '',
    year: '2026',
    title: '',
    desc: ''
  });

  const handleOpenCreateMilestone = () => {
    setEditingMilestoneId(null);
    setMilestoneForm({
      id: 'milestone-' + Date.now(),
      year: '2026',
      title: '',
      desc: ''
    });
    setMilestoneModalOpen(true);
  };

  const handleOpenEditMilestone = (item: MilestoneItem) => {
    setEditingMilestoneId(item.id);
    setMilestoneForm(item);
    setMilestoneModalOpen(true);
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!milestoneForm.title.trim()) {
      alert('Please enter a milestone title');
      return;
    }
    let updatedMilestones: MilestoneItem[];
    if (editingMilestoneId) {
      updatedMilestones = aboutState.milestones.map(m => m.id === editingMilestoneId ? milestoneForm : m);
    } else {
      updatedMilestones = [...aboutState.milestones, { ...milestoneForm, id: 'milestone-' + Date.now() }];
    }
    const updated = { ...aboutState, milestones: updatedMilestones };
    saveAboutData(updated, `Milestone "${milestoneForm.title}" saved! Live on website.`);
    setMilestoneModalOpen(false);
  };

  const handleDeleteMilestone = (id: string) => {
    const updatedMilestones = aboutState.milestones.filter(m => m.id !== id);
    const updated = { ...aboutState, milestones: updatedMilestones };
    saveAboutData(updated, 'Milestone removed! Live on website.');
    setDeleteConfirmAbout(null);
  };

  // Leadership Team Modal State
  const [leaderModalOpen, setLeaderModalOpen] = useState(false);
  const [editingLeaderId, setEditingLeaderId] = useState<string | null>(null);
  const [leaderForm, setLeaderForm] = useState<LeaderItem>({
    id: '',
    name: '',
    role: '',
    bio: '',
    avatar: '/assets/aistudio/image_f804651e.png'
  });

  const handleOpenCreateLeader = () => {
    setEditingLeaderId(null);
    setLeaderForm({
      id: 'lead-' + Date.now(),
      name: '',
      role: '',
      bio: '',
      avatar: '/assets/aistudio/image_f804651e.png'
    });
    setLeaderModalOpen(true);
  };

  const handleOpenEditLeader = (item: LeaderItem) => {
    setEditingLeaderId(item.id);
    setLeaderForm(item);
    setLeaderModalOpen(true);
  };

  const handleSaveLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaderForm.name.trim()) {
      alert('Please enter the team member name');
      return;
    }
    let updatedLeaders: LeaderItem[];
    if (editingLeaderId) {
      updatedLeaders = aboutState.leadership.map(l => l.id === editingLeaderId ? leaderForm : l);
    } else {
      updatedLeaders = [...aboutState.leadership, { ...leaderForm, id: 'lead-' + Date.now() }];
    }
    const updated = { ...aboutState, leadership: updatedLeaders };
    saveAboutData(updated, `Leader "${leaderForm.name}" saved! Live on website.`);
    setLeaderModalOpen(false);
  };

  const handleDeleteLeader = (id: string) => {
    const updatedLeaders = aboutState.leadership.filter(l => l.id !== id);
    const updated = { ...aboutState, leadership: updatedLeaders };
    saveAboutData(updated, 'Team member removed! Live on website.');
    setDeleteConfirmAbout(null);
  };

  // Principles Modal State
  const [principleModalOpen, setPrincipleModalOpen] = useState(false);
  const [editingPrincipleId, setEditingPrincipleId] = useState<string | null>(null);
  const [principleForm, setPrincipleForm] = useState<PrincipleItem>({
    id: '',
    title: '',
    desc: '',
    icon: 'Code2'
  });

  const handleOpenCreatePrinciple = () => {
    setEditingPrincipleId(null);
    setPrincipleForm({
      id: 'principle-' + Date.now(),
      title: '',
      desc: '',
      icon: 'Code2'
    });
    setPrincipleModalOpen(true);
  };

  const handleOpenEditPrinciple = (item: PrincipleItem) => {
    setEditingPrincipleId(item.id);
    setPrincipleForm(item);
    setPrincipleModalOpen(true);
  };

  const handleSavePrinciple = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedPrinciples: PrincipleItem[];
    if (editingPrincipleId) {
      updatedPrinciples = aboutState.principles.map(p => p.id === editingPrincipleId ? principleForm : p);
    } else {
      updatedPrinciples = [...aboutState.principles, { ...principleForm, id: 'principle-' + Date.now() }];
    }
    const updated = { ...aboutState, principles: updatedPrinciples };
    saveAboutData(updated, `Engineering Principle "${principleForm.title}" saved! Live on website.`);
    setPrincipleModalOpen(false);
  };

  // Delete confirm modal state for About section
  const [deleteConfirmAbout, setDeleteConfirmAbout] = useState<{ type: 'milestone' | 'leader'; id: string; name: string } | null>(null);

  const handleResetAboutDefaults = () => {
    if (window.confirm('Reset all About Us content (Story, Dual Offices, Milestones, Leadership, Principles) to defaults?')) {
      saveAboutData(DEFAULT_ABOUT_DATA, 'About Us content reset to default values! Live on website.');
    }
  };

  // Website Settings State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [websiteStatus, setWebsiteStatus] = useState('Online');
  const [isDeviceAuthorized, setIsDeviceAuthorized] = useState(true);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Messages State
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      name: 'Ahmed Khan',
      initials: 'AH',
      email: 'ahmed.khan@gmail.com',
      phone: '+92 300 1234567',
      subject: 'Course Admission',
      message: 'Can I join the next batch for Claude AI & Web Development?',
      time: '2m ago',
      color: 'bg-purple-600',
      unread: true
    },
    {
      id: 'msg-2',
      name: 'Sara Khan',
      initials: 'SK',
      email: 'sara.k@outlook.com',
      phone: '+92 321 9876543',
      subject: 'Fee Inquiry',
      message: 'What is the fee for the Local SEO Master Course with certificate?',
      time: '5m ago',
      color: 'bg-blue-600',
      unread: true
    },
    {
      id: 'msg-3',
      name: 'Muhammad Rizwan',
      initials: 'MK',
      email: 'rizwan.dev@yahoo.com',
      phone: '+92 333 4567890',
      subject: 'Project Delivery Feedback',
      message: 'Thanks for your support! Our Laravel ERP is running smoothly.',
      time: '8m ago',
      color: 'bg-emerald-600',
      unread: false
    },
    {
      id: 'msg-4',
      name: 'Zain Ali',
      initials: 'ZA',
      email: 'zain.ali.tech@gmail.com',
      phone: '+92 312 6543210',
      subject: 'Custom Web Application',
      message: 'I need more details on multi-tenant SaaS architecture pricing.',
      time: '12m ago',
      color: 'bg-violet-600',
      unread: true
    }
  ]);

  // Modal for quick actions
  const [quickActionModal, setQuickActionModal] = useState<string | null>(null);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCoursePrice, setNewCoursePrice] = useState('99');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Check device auth status on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('kmawd_admin_device_authorized') === 'true';
    setIsDeviceAuthorized(isAuth);
  }, []);

  const handleToggleDeviceAuth = () => {
    if (isDeviceAuthorized) {
      localStorage.removeItem('kmawd_admin_device_authorized');
      setIsDeviceAuthorized(false);
      setActionSuccess('Device de-authorized. The Admin button is now hidden on this PC.');
    } else {
      localStorage.setItem('kmawd_admin_device_authorized', 'true');
      setIsDeviceAuthorized(true);
      setActionSuccess('Device authorized! The Admin button will now appear on this PC.');
    }
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPasswordMsg({ type: 'success', text: 'Password successfully updated!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMsg({ type: 'error', text: data.message || 'Current password incorrect' });
      }
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err?.message || 'Current password incorrect (check connection)' });
    }
    setTimeout(() => setPasswordMsg(null), 5000);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    fetch(`/api/admin/messages/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'estimator', label: 'Cost Estimator', icon: Calculator },
    { id: 'about', label: 'About Us', icon: Building2 },
    { id: 'teachers', label: 'Teachers', icon: GraduationCap },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'results', label: 'Results', icon: Award },
    { id: 'academic_programs', label: 'Academic CMS', icon: GraduationCap },
    { id: 'live_sessions', label: 'Live Sessions', icon: Video },
    { id: 'contests', label: 'Contests', icon: Trophy },
    { id: 'team_pages', label: 'Team Pages', icon: Users },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messages.filter(m => m.unread).length.toString() },
    { id: 'settings', label: 'Website Settings', icon: Settings },
    { id: 'database', label: 'Database (Supabase)', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-[#18113C] flex flex-col font-sans selection:bg-purple-600 selection:text-[#18113C]">
      
      {/* Top Navbar matching website theme */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 px-4 sm:px-6 lg:px-8 py-3.5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#6D28D9] p-0.5 flex items-center justify-center shadow-md border border-purple-200 overflow-hidden">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center overflow-hidden">
                <img 
                  src={(companyInfo?.logo && !companyInfo.logo.includes('image_b4867fb4') && !companyInfo.logo.includes('image_ec98d7d2')) ? companyInfo.logo : "/assets/aistudio/KMAWD_Purple_Education_Tech_Logo_52482d2e.png"} 
                  alt="KMAWD Logo" 
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
            </div>
            <div>
              <div className="font-display font-black text-base tracking-wide text-[#18113C] flex items-center gap-2">
                {(companyInfo?.name && companyInfo.name !== 'KMAWD') ? companyInfo.name.toUpperCase() : 'KMAWD'}
              </div>
              <div className="text-[10px] text-[#6D28D9] uppercase tracking-wider font-extrabold">
                Admin Portal
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search records..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-purple-50 border border-purple-100 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9] transition-all"
              />
            </div>
          </div>

          {/* Right Header items */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-gray-600 hover:text-[#6D28D9] hover:bg-purple-100 transition-colors relative shadow-sm"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[#18113C] text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-purple-100 rounded-2xl p-4 shadow-2xl z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-bold text-[#18113C]">Notifications</span>
                    <span className="text-[10px] text-[#6D28D9] font-bold cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-purple-50 border border-purple-50">
                      <p className="font-bold text-[#18113C]">New enrollment</p>
                      <p className="text-[10px] text-gray-500">Ahmed Khan enrolled in Claude AI Mastery</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-100">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-0.5 border border-purple-200 overflow-hidden shrink-0 shadow-sm">
                <img 
                  src={(companyInfo?.logo && !companyInfo.logo.includes('image_b4867fb4') && !companyInfo.logo.includes('image_ec98d7d2')) ? companyInfo.logo : "/assets/aistudio/KMAWD_Purple_Education_Tech_Logo_52482d2e.png"} 
                  alt="Admin"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#18113C] flex items-center gap-1.5">
                  Admin
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[10px] text-gray-500 font-medium">System Manager</div>
              </div>
            </div>

            {onOpenSupabaseModal && (
              <button
                onClick={onOpenSupabaseModal}
                className="hidden sm:flex px-4 py-2 rounded-xl font-bold text-xs text-[#6D28D9] bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-all items-center gap-1.5 shadow-sm"
              >
                <Database className="w-4 h-4" />
                <span>Supabase</span>
              </button>
            )}

            <button
              onClick={onViewWebsite}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-all flex items-center gap-1.5 shadow-md shadow-purple-200 group"
            >
              <span>View Site</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-purple-100 flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
          <div className="space-y-6">
            
            {/* Nav Menu */}
            <nav className="space-y-1.5">
              {navMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-200' 
                        : 'text-gray-600 hover:bg-purple-50 hover:text-[#6D28D9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#18113C]' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-[#6D28D9]' : 'bg-rose-500 text-[#18113C]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setLogoutPassword('');
                  setLogoutPasswordError(false);
                  setIsLogoutModalOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          <div className="mt-8 pt-4 border-t border-purple-50">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 relative overflow-hidden text-center space-y-2 group">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white p-1 flex items-center justify-center shadow-md border border-purple-200 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/assets/aistudio/KMAWD_Purple_Education_Tech_Logo_52482d2e.png" alt="KMAWD Logo" className="w-full h-full object-contain" />
              </div>
              <div className="font-display font-extrabold text-sm text-[#18113C] tracking-wide">
                Build. Manage. Grow.
              </div>
              <div className="text-[10px] font-black text-[#6D28D9] uppercase tracking-widest">
                KMAWD
              </div>
            </div>
            <div className="text-[10px] text-gray-400 text-center mt-3 font-medium">
              © 2026 KMAWD Portal
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {actionSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-700/60 text-emerald-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {actionSuccess}
              </span>
              <button onClick={() => setActionSuccess(null)} className="text-emerald-600 hover:text-[#18113C]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* TAB: DASHBOARD (Exact screenshot layout) */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Header Greeting */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-[#18113C] tracking-tight flex items-center gap-2">
                  <span>Welcome Back, Ahtasham!</span>
                  <span>👋</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                  Manage your website content from here
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Visitors */}
                <div className="p-5 rounded-2xl bg-white border border-purple-100 relative overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-colors shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Visitors</span>
                      <span className="text-2xl font-display font-black text-[#18113C] mt-1 block">125.8K</span>
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        ↑ 12.5%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6D28D9]">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Purple Wave Graphic */}
                  <div className="mt-3 h-10 w-full">
                    <svg viewBox="0 0 100 30" className="w-full h-full stroke-purple-400 fill-none stroke-2">
                      <path d="M0 20 Q 20 5, 40 18 T 70 8 T 100 15" />
                    </svg>
                  </div>
                </div>

                {/* Total Courses */}
                <div className="p-5 rounded-2xl bg-white border border-purple-100 relative overflow-hidden flex flex-col justify-between hover:border-blue-300 transition-colors shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Courses</span>
                      <span className="text-2xl font-display font-black text-[#18113C] mt-1 block">24</span>
                      <span className="text-[11px] text-blue-600 font-bold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        ↑ 8.2%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Blue Wave Graphic */}
                  <div className="mt-3 h-10 w-full">
                    <svg viewBox="0 0 100 30" className="w-full h-full stroke-blue-400 fill-none stroke-2">
                      <path d="M0 25 Q 25 15, 50 20 T 75 10 T 100 12" />
                    </svg>
                  </div>
                </div>

                {/* Total Projects */}
                <div className="p-5 rounded-2xl bg-white border border-purple-100 relative overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-colors shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Projects</span>
                      <span className="text-2xl font-display font-black text-[#18113C] mt-1 block">48</span>
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        ↑ 15.7%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Green Wave Graphic */}
                  <div className="mt-3 h-10 w-full">
                    <svg viewBox="0 0 100 30" className="w-full h-full stroke-emerald-400 fill-none stroke-2">
                      <path d="M0 22 Q 20 28, 45 15 T 75 12 T 100 5" />
                    </svg>
                  </div>
                </div>

                {/* New Messages */}
                <div className="p-5 rounded-2xl bg-white border border-purple-100 relative overflow-hidden flex flex-col justify-between hover:border-amber-300 transition-colors shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">New Messages</span>
                      <span className="text-2xl font-display font-black text-[#18113C] mt-1 block">37</span>
                      <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        ↑ 22.1%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                  {/* Yellow Wave Graphic */}
                  <div className="mt-3 h-10 w-full">
                    <svg viewBox="0 0 100 30" className="w-full h-full stroke-amber-400 fill-none stroke-2">
                      <path d="M0 18 Q 30 25, 55 10 T 80 16 T 100 8" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Main Content Grid: Left Column (Analytics + Manage Pages) & Right Column (Quick Actions + Messages + Settings) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 7 Columns */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Website Analytics Card */}
                  <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#6D28D9]">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm font-bold text-[#18113C]">Website Analytics</h2>
                      </div>
                      <select 
                        value={timeRange} 
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="text-xs bg-purple-50 border border-purple-100 rounded-xl px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-300"
                      >
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                        <option>This Year</option>
                      </select>
                    </div>

                    {/* Chart Container */}
                    <div className="relative pt-4">
                      {/* Tooltip Pill */}
                      <div className="absolute right-12 top-6 z-10 px-3 py-1 rounded-full bg-[#6D28D9] text-white text-[10px] font-bold shadow-lg shadow-purple-200 border border-purple-400/40">
                        98.5K Visitors
                      </div>

                      {/* SVG Line / Wave Chart with Grid */}
                      <div className="h-56 w-full relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-400/50 pointer-events-none">
                          <div className="border-b border-purple-100 flex justify-between pr-2 font-medium"><span>100k</span></div>
                          <div className="border-b border-purple-100 flex justify-between pr-2 font-medium"><span>75k</span></div>
                          <div className="border-b border-purple-100 flex justify-between pr-2 font-medium"><span>50k</span></div>
                          <div className="border-b border-purple-100 flex justify-between pr-2 font-medium"><span>25k</span></div>
                          <div className="flex justify-between pr-2 font-medium"><span>0</span></div>
                        </div>

                        {/* Interactive Curve */}
                        <svg viewBox="0 0 600 200" className="w-full h-full relative z-0 overflow-visible" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Fill */}
                          <path 
                            d="M 40 140 Q 90 120, 140 150 T 250 140 T 360 120 T 450 90 T 560 50 L 560 190 L 40 190 Z" 
                            fill="url(#purpleGrad)" 
                          />
                          {/* Line */}
                          <path 
                            d="M 40 140 Q 90 120, 140 150 T 250 140 T 360 120 T 450 90 T 560 50" 
                            fill="none" 
                            stroke="#8B5CF6" 
                            strokeWidth="3.5"
                            strokeLinecap="round" 
                          />
                          {/* Peak Dot */}
                          <circle cx="560" cy="50" r="5" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="3" />
                        </svg>
                      </div>

                      {/* X-axis Labels */}
                      <div className="flex justify-between text-[10px] text-gray-400 font-bold pt-2 px-6">
                        <span>Oct 1</span>
                        <span>Oct 8</span>
                        <span>Oct 15</span>
                        <span>Oct 22</span>
                        <span>Oct 31</span>
                      </div>
                    </div>
                  </div>

                  {/* Manage Website Pages (8 cards matching screenshot) */}
                  <div className="p-6 rounded-3xl bg-white border border-purple-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#6D28D9]">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm font-bold text-[#18113C]">Manage Website Pages</h2>
                      </div>
                      <button 
                        onClick={() => setCurrentTab('courses')}
                        className="text-xs text-gray-400 hover:text-[#6D28D9] flex items-center gap-1 font-bold transition-colors"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 8 Cards in 4x2 Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                      
                      {/* Home Page */}
                      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-300 transition-colors shadow-sm">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/hero_laptop_illustration.png" 
                            alt="Home Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                          <span className="absolute top-2 left-2 text-[9px] bg-purple-100/90 text-gray-600 px-1.5 py-0.5 rounded font-bold">KMAWD</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">Home Page</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">Hero, Services, Stats...</p>
                        </div>
                        <button 
                          onClick={() => setQuickActionModal('Edit Home Page Content')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Courses */}
                      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-300 transition-colors shadow-sm">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/course_web_dev.png" 
                            alt="Courses Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">Courses</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">All courses &amp; details</p>
                        </div>
                        <button 
                          onClick={() => setCurrentTab('courses')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Portfolio */}
                      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-300 transition-colors shadow-sm">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/hero_illustration_full.png" 
                            alt="Portfolio Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">Portfolio</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">Projects &amp; Showcase</p>
                        </div>
                        <button 
                          onClick={() => setCurrentTab('portfolio')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Cost Estimator */}
                      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-300 transition-colors shadow-sm">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative flex items-center justify-center">
                          <Calculator className="w-10 h-10 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">Cost Estimator</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">Project Pricing</p>
                        </div>
                        <button 
                          onClick={() => setCurrentTab('estimator')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* About Us */}
                      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-300 transition-colors shadow-sm">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative flex items-center justify-center">
                          <Building2 className="w-10 h-10 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">About Us</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">Company Info</p>
                        </div>
                        <button 
                          onClick={() => setCurrentTab('about')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Teachers */}
                      <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-300 transition-colors shadow-sm">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png" 
                            alt="Teachers Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">Teachers</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">Faculty Members</p>
                        </div>
                        <button 
                          onClick={() => setCurrentTab('teachers')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Live Sessions */}
                      <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative flex items-center justify-center">
                          <Video className="w-10 h-10 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">Live Sessions</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">Classes &amp; Schedules</p>
                        </div>
                        <button 
                          onClick={() => setCurrentTab('live_sessions')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Contact */}
                      <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-100/80 overflow-hidden relative flex items-center justify-center">
                          <Mail className="w-10 h-10 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#18113C]">Contact</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5 truncate">Contact Details</p>
                        </div>
                        <button 
                          onClick={() => setCurrentTab('contact')}
                          className="w-full py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right 5 Columns */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Quick Actions (8 Buttons matching screenshot) */}
                  <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gray-500" />
                      <h2 className="text-sm font-bold text-[#18113C]">Quick Actions</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5">
                      
                      <button 
                        onClick={() => setQuickActionModal('Edit Home Page')}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Edit Home Page</span>
                      </button>

                      <button 
                        onClick={() => setQuickActionModal('Add New Course')}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Add Course</span>
                      </button>

                      <button 
                        onClick={() => {
                          setCurrentTab('portfolio');
                          handleOpenCreateProject();
                        }}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Add Project</span>
                      </button>

                      <button 
                        onClick={() => setQuickActionModal('Update Team Members')}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Update Team</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('teachers')}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Manage Teachers</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('live_sessions')}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Live Session</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('about')}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <Info className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Edit About Us</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('contact')}
                        className="p-3 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-500 hover:bg-purple-50 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600 leading-tight">Contact Info</span>
                      </button>

                    </div>
                  </div>

                  {/* Recent Messages Card */}
                  <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <h2 className="text-sm font-bold text-[#18113C]">Recent Messages</h2>
                      </div>
                      <button 
                        onClick={() => setCurrentTab('messages')}
                        className="text-xs text-gray-400 hover:text-[#18113C] flex items-center gap-1 font-semibold"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {messages.slice(0, 4).map((msg) => (
                        <div 
                          key={msg.id} 
                          onClick={() => setCurrentTab('messages')}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-100/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${msg.color} text-[#18113C] font-bold text-[10px] flex items-center justify-center shrink-0`}>
                              {msg.initials}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#18113C]">{msg.name}</div>
                              <div className="text-[11px] text-gray-500/80 truncate max-w-[180px] sm:max-w-xs">{msg.message}</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium shrink-0">{msg.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Website Settings Card */}
                  <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <h2 className="text-sm font-bold text-[#18113C]">Website Settings</h2>
                      </div>
                      <button 
                        onClick={() => setCurrentTab('settings')}
                        className="text-xs text-gray-400 hover:text-[#18113C] flex items-center gap-1 font-semibold"
                      >
                        <span>Edit Settings</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      
                      {/* Website Status */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                        <span className="text-gray-500 font-medium">Website Status</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {websiteStatus}
                        </span>
                      </div>

                      {/* Maintenance Mode Toggle */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                        <span className="text-gray-500 font-medium">Maintenance Mode</span>
                        <button 
                          onClick={() => setMaintenanceMode(!maintenanceMode)}
                          className="text-gray-500 hover:text-[#18113C] transition-colors"
                        >
                          {maintenanceMode ? (
                            <ToggleRight className="w-7 h-7 text-[#6D28D9]" />
                          ) : (
                            <ToggleLeft className="w-7 h-7 text-purple-600" />
                          )}
                        </button>
                      </div>

                      {/* Dark Mode Toggle */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                        <span className="text-gray-500 font-medium">Dark Mode</span>
                        <button 
                          onClick={() => setDarkMode(!darkMode)}
                          className="text-gray-500 hover:text-[#18113C] transition-colors"
                        >
                          {darkMode ? (
                            <ToggleRight className="w-7 h-7 text-[#6D28D9]" />
                          ) : (
                            <ToggleLeft className="w-7 h-7 text-purple-600" />
                          )}
                        </button>
                      </div>

                      {/* Social Links */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
                        <span className="text-gray-500 font-medium">Social Links</span>
                        <button 
                          onClick={() => setCurrentTab('settings')}
                          className="text-xs text-gray-400 hover:text-[#18113C] font-bold flex items-center gap-1"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB: COURSES MANAGEMENT */}
          {currentTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-black text-[#18113C]">Courses Manager</h1>
                  <p className="text-xs text-gray-500 mt-1">Manage active courses, pricing, and enrollments</p>
                </div>
                <button
                  onClick={() => setQuickActionModal('Add New Course')}
                  className="px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COURSES.map((course) => (
                  <div key={course.id} className="p-4 rounded-2xl bg-white border border-purple-100 space-y-3">
                    <div className="h-32 rounded-xl bg-purple-100 overflow-hidden relative">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      {course.badge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#6D28D9] text-white text-[10px] font-bold">
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#18113C] line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-purple-50 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-medium">Tuition Fee</span>
                        <span className="font-black text-[#6D28D9]">${course.priceUSD} USD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setQuickActionModal(`Edit Course: ${course.title}`)}
                          className="p-2 rounded-lg bg-purple-50 text-gray-500 hover:text-[#18113C] hover:bg-purple-800/50"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setActionSuccess(`Course ${course.title} updated.`)}
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-900/60"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES & LEADS */}
          {currentTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-black text-[#18113C]">Client Messages &amp; Quotes</h1>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Direct inquiries submitted through KMAWD website</p>
                </div>
                <div className="text-xs text-[#6D28D9] font-black bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 shadow-sm">
                  Total: {messages.length} inquiries
                </div>
              </div>

              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-white border border-purple-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-full ${m.color} text-[#18113C] font-bold text-xs flex items-center justify-center shrink-0`}>
                        {m.initials}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#18113C]">{m.name}</span>
                          <span className="text-[10px] text-gray-400 bg-purple-100 px-2 py-0.5 rounded border border-purple-100">{m.subject}</span>
                          {m.unread && (
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600/90 leading-relaxed">{m.message}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400/80 pt-1">
                          <span>📧 {m.email}</span>
                          {m.phone && <span>📞 {m.phone}</span>}
                          <span>⏱ {m.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <a 
                        href={`https://wa.me/?text=Hi%20${encodeURIComponent(m.name)},%20thank%20you%20for%20contacting%20KMAWD.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-700/60 text-emerald-600 hover:bg-emerald-900/60 text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>WhatsApp</span>
                      </a>
                      <a 
                        href={`mailto:${m.email}?subject=Re:%20KMAWD%20Inquiry`}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-100 text-gray-600 hover:bg-purple-800/50 text-xs font-bold"
                      >
                        Reply Email
                      </a>
                      <button 
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50/60 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS & PC DEVICE PRIVACY (Core User Request) */}
          {currentTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-display font-bold text-[#18113C]">Website &amp; Security Settings</h1>
                <p className="text-xs text-gray-500 mt-1">Configure administrator master credentials and device privacy</p>
              </div>

              {/* Device Privacy Card (Addressing User's Exact Need) */}
              <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-600/50 flex items-center justify-center text-gray-500">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#18113C]">This PC / Device Authorization</h3>
                      <p className="text-xs text-gray-500">Control which computers display the Admin Button</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    isDeviceAuthorized 
                      ? 'bg-emerald-50/80 text-emerald-600 border-emerald-700/60' 
                      : 'bg-rose-50/80 text-rose-600 border-rose-700/60'
                  }`}>
                    {isDeviceAuthorized ? '✓ This PC is Authorized' : '✕ Not Authorized'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3 text-xs leading-relaxed text-gray-600">
                  <p>
                    <strong className="text-[#18113C]">Aapki requirement:</strong> "ye password ka button mere PC pe hi show ho aur kisi aur ke PC pe show na ho."
                  </p>
                  <p className="text-gray-500">
                    Jab aap is browser pe login karte hain aur <strong className="text-[#18113C]">"Authorize this PC"</strong> check karte hain, to Admin Button sirf aapke computer par nazar aata hai. Kisi doosre user ke computer ya mobile par koi Admin button show nahi hoga.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div>
                    <span className="font-bold text-xs text-[#18113C] block">Quick Admin Access on This Machine</span>
                    <span className="text-[11px] text-gray-500">
                      {isDeviceAuthorized ? 'Enabled — button is visible in navbar on this computer' : 'Disabled — button is hidden on this computer'}
                    </span>
                  </div>
                  <button
                    onClick={handleToggleDeviceAuth}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      isDeviceAuthorized
                        ? 'bg-rose-50 text-rose-300 border border-rose-700 hover:bg-rose-900/60'
                        : 'bg-emerald-900 text-emerald-200 border border-emerald-600 hover:bg-emerald-800'
                    }`}
                  >
                    {isDeviceAuthorized ? 'De-authorize & Hide from this PC' : 'Authorize & Show on this PC'}
                  </button>
                </div>
              </div>

              {/* Change Admin Password */}
              <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-600/50 flex items-center justify-center text-gray-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#18113C]">Change Master Admin Password</h3>
                    <p className="text-xs text-gray-500">Default password is currently <code className="bg-purple-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">king295</code></p>
                  </div>
                </div>

                {passwordMsg && (
                  <div className={`p-3 rounded-xl text-xs ${
                    passwordMsg.type === 'success' 
                      ? 'bg-emerald-50/80 text-emerald-600 border border-emerald-700' 
                      : 'bg-rose-50/80 text-rose-300 border border-rose-700'
                  }`}>
                    {passwordMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Current Password</label>
                    <input 
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="king295"
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">New Password</label>
                    <input 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Confirm New Password</label>
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password..."
                      className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md shadow-purple-200 transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Maintenance Mode & Website Status */}
              <div className="p-6 rounded-3xl bg-white border border-purple-100 space-y-4">
                <h3 className="font-bold text-base text-[#18113C]">Website Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#18113C] block">Maintenance Banner</span>
                      <span className="text-[10px] text-gray-500">Display maintenance mode notification</span>
                    </div>
                    <button onClick={() => setMaintenanceMode(!maintenanceMode)}>
                      {maintenanceMode ? <ToggleRight className="w-8 h-8 text-[#6D28D9]" /> : <ToggleLeft className="w-8 h-8 text-purple-600" />}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#18113C] block">Dark Mode</span>
                      <span className="text-[10px] text-gray-500">Default theme for visitors</span>
                    </div>
                    <button onClick={() => setDarkMode(!darkMode)}>
                      {darkMode ? <ToggleRight className="w-8 h-8 text-[#6D28D9]" /> : <ToggleLeft className="w-8 h-8 text-purple-600" />}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: PORTFOLIO MANAGEMENT (Live CRUD & Real-Time Website Sync) */}
          {currentTab === 'portfolio' && (
            <div className="space-y-6">
              {/* Header with Title and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-display font-bold text-[#18113C]">Portfolio Manager</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-100 text-gray-600 text-xs font-bold">
                      {portfolioList.length} Live on Website
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage projects, case studies, and live links. Any edits or additions instantly update on the website!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-gray-600 hover:text-[#18113C] text-xs font-bold flex items-center gap-1.5 border border-purple-700/40 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View on Website</span>
                  </button>

                  <button
                    onClick={handleOpenCreateProject}
                    className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Item</span>
                  </button>
                </div>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="p-4 rounded-2xl bg-white border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={portfolioSearch}
                    onChange={(e) => setPortfolioSearch(e.target.value)}
                    placeholder="Search by title, client, or tech..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                  />
                  {portfolioSearch && (
                    <button 
                      onClick={() => setPortfolioSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#18113C]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                  {[
                    { id: 'all', label: 'All Projects' },
                    { id: 'web', label: 'Web Portals' },
                    { id: 'ecommerce', label: 'E-Commerce' },
                    { id: 'saas', label: 'SaaS Platforms' },
                    { id: 'enterprise', label: 'Enterprise & ERP' },
                    { id: 'mobile', label: 'Mobile Apps' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setPortfolioCat(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        portfolioCat === cat.id
                          ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-900/40'
                          : 'bg-purple-50/50 text-gray-500 hover:text-[#18113C] hover:bg-purple-50 border border-purple-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Cards Grid */}
              {portfolioList.filter(p => {
                const matchCat = portfolioCat === 'all' || p.category === portfolioCat;
                const matchSearch = p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                    p.client.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                    p.tags.some(t => t.toLowerCase().includes(portfolioSearch.toLowerCase())) ||
                                    p.summary.toLowerCase().includes(portfolioSearch.toLowerCase());
                return matchCat && matchSearch;
              }).length === 0 ? (
                <div className="p-12 rounded-3xl bg-white border border-purple-100 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto text-gray-500">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-[#18113C]">No projects found</h3>
                  <p className="text-xs text-gray-500">Try adjusting your search query or category filter.</p>
                  <button
                    onClick={handleOpenCreateProject}
                    className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Project</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {portfolioList
                    .filter(p => {
                      const matchCat = portfolioCat === 'all' || p.category === portfolioCat;
                      const matchSearch = p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                          p.client.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                          p.tags.some(t => t.toLowerCase().includes(portfolioSearch.toLowerCase())) ||
                                          p.summary.toLowerCase().includes(portfolioSearch.toLowerCase());
                      return matchCat && matchSearch;
                    })
                    .map((project) => (
                      <div
                        key={project.id}
                        className="rounded-3xl bg-white border border-purple-800/50 hover:border-purple-600/70 overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-purple-950/40"
                      >
                        <div>
                          {/* Project Image & Category Banner */}
                          <div className="relative h-44 w-full bg-purple-50/50 overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#161033] via-transparent to-black/40" />
                            
                            {/* Category Badge */}
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#6D28D9] text-white shadow-md">
                              {project.categoryLabel}
                            </span>

                            {/* Live Website Link */}
                            {project.demoUrl ? (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-[#18113C] shadow-md flex items-center gap-1 transition-colors"
                              >
                                <Globe className="w-3 h-3" />
                                <span>Live Site</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-medium bg-purple-100/80 text-gray-500 border border-purple-100">
                                Client System
                              </span>
                            )}

                            {/* Year & Client */}
                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-[#18113C] drop-shadow">
                              <span className="font-semibold text-gray-600 text-[11px] truncate">{project.client} • {project.location}</span>
                              <span className="text-[10px] bg-purple-900/80 px-2 py-0.5 rounded-md font-bold">{project.year}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 space-y-3">
                            <h3 className="font-bold text-sm text-[#18113C] line-clamp-1 group-hover:text-gray-500 transition-colors">
                              {project.title}
                            </h3>
                            
                            <p className="text-xs text-gray-500/80 line-clamp-2 leading-relaxed">
                              {project.summary}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {project.tags.slice(0, 4).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50/50 text-gray-500 border border-purple-100 font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 4 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-100 text-gray-500">
                                  +{project.tags.length - 4}
                                </span>
                              )}
                            </div>

                            {/* Results preview */}
                            {project.results && project.results.length > 0 && (
                              <div className="pt-2 border-t border-purple-100 grid grid-cols-2 gap-2 text-[10px]">
                                {project.results.slice(0, 2).map((res, i) => (
                                  <div key={i} className="p-1.5 rounded-lg bg-purple-50/50 border border-purple-800/30">
                                    <span className="font-bold text-[#18113C] block">{res.metric}</span>
                                    <span className="text-gray-400 truncate block">{res.label}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons Footer */}
                        <div className="p-3 bg-purple-50/60 border-t border-purple-100 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditProject(project)}
                              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-[#6D28D9] text-gray-600 hover:text-[#18113C] text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => setDeleteConfirm({ id: project.id, name: project.title, type: 'project' })}
                              className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50/60 hover:text-rose-300 transition-colors"
                              title="Delete project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-xl bg-emerald-50/80 border border-emerald-700/60 text-emerald-600 hover:bg-emerald-900 text-[11px] font-semibold flex items-center gap-1"
                              >
                                <span>Visit</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <button
                              onClick={onViewWebsite}
                              className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-gray-500 text-[11px] font-semibold flex items-center gap-1"
                            >
                              <span>Website</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* COST ESTIMATOR CMS (LIVE WEBSITE SYNC) */}
          {currentTab === 'estimator' && (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-display font-bold text-[#18113C]">Cost Estimator Manager</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50/80 border border-emerald-600/70 text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live Synced to Website</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage project types, base pricing, timeline delivery, scale multipliers, add-ons, and PKR/GBP currency rates.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetEstimatorDefaults}
                    className="px-3.5 py-2 rounded-xl bg-purple-100/70 border border-purple-100 hover:bg-purple-900 text-gray-500 hover:text-[#18113C] text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Reset all settings to default factory values"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-800 text-gray-600 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Website</span>
                  </button>

                  {estimatorSubTab === 'types' && (
                    <button
                      onClick={handleOpenCreateType}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-200 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project Type</span>
                    </button>
                  )}

                  {estimatorSubTab === 'addons' && (
                    <button
                      onClick={handleOpenCreateAddon}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-200 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Add-on Service</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Toast / Notification Banner */}
              {estimatorSavedToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-500/60 text-emerald-200 text-xs font-bold flex items-center justify-between shadow-xl shadow-emerald-200 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{estimatorSavedToast}</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-normal">All front-end visitors see this instantly</span>
                </div>
              )}

              {/* Sub-tab Pill Navigation */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-purple-100 overflow-x-auto">
                <button
                  onClick={() => setEstimatorSubTab('types')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'types'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>1. Project Types & Base Rates</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'types' ? 'bg-purple-800' : 'bg-purple-100 text-gray-500'}`}>
                    {estimatorSettings.projectTypes?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('addons')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'addons'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>2. Add-on Services</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'addons' ? 'bg-purple-800' : 'bg-purple-100 text-gray-500'}`}>
                    {estimatorSettings.addonOptions?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('scale')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'scale'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>3. Scope Scale & Multipliers</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'scale' ? 'bg-purple-800' : 'bg-purple-100 text-gray-500'}`}>
                    {estimatorSettings.scaleOptions?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('design_backend')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'design_backend'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>4. UI/UX & Backend Tiers</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'design_backend' ? 'bg-purple-800' : 'bg-purple-100 text-gray-500'}`}>
                    {(estimatorSettings.designTiers?.length || 0) + (estimatorSettings.backendOptions?.length || 0)}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('currency')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'currency'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>5. Currency Exchange Rates</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold border border-emerald-800/60">
                    PKR ₨{estimatorSettings.currencyRates?.PKR || 280}
                  </span>
                </button>
              </div>

              {/* Subtab 1: Project Types */}
              {estimatorSubTab === 'types' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {estimatorSettings.projectTypes?.map((item) => {
                      const pkrRate = estimatorSettings.currencyRates?.PKR || 280;
                      const pkrPrice = item.baseUSD * pkrRate;
                      return (
                        <div
                          key={item.id}
                          className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-600/70 transition-all space-y-4 relative group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-100/80 border border-purple-100 text-gray-500">
                                #{item.id}
                              </span>
                              <h3 className="font-bold text-sm text-[#18113C] pt-1">{item.name}</h3>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                              <button
                                onClick={() => handleOpenEditType(item)}
                                className="p-1.5 rounded-xl bg-purple-50 text-gray-500 hover:bg-[#6D28D9] hover:text-[#18113C] transition-colors"
                                title="Edit this project type"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmEstimator({ type: 'type', id: item.id, name: item.name })}
                                className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-300 transition-colors"
                                title="Delete project type"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-100 text-xs">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-gray-400 font-medium">Base Price (USD)</span>
                              <div className="text-base font-extrabold text-[#A78BFA]">${item.baseUSD.toLocaleString()}</div>
                              <span className="text-[10px] text-emerald-600 font-bold block">₨ {pkrPrice.toLocaleString()} PKR</span>
                            </div>
                            <div className="space-y-0.5 text-right">
                              <span className="text-[10px] text-gray-400 font-medium">Estimated Timeline</span>
                              <div className="text-sm font-bold text-[#18113C] flex items-center justify-end gap-1">
                                <Clock className="w-3.5 h-3.5 text-gray-500" />
                                <span>~{item.weeks} Weeks</span>
                              </div>
                              <span className="text-[10px] text-gray-500 block">Baseline Delivery</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenEditType(item)}
                            className="w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-gray-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Quick Edit Pricing & Weeks</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Subtab 2: Add-on Services */}
              {estimatorSubTab === 'addons' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {estimatorSettings.addonOptions?.map((addon) => {
                      const pkrRate = estimatorSettings.currencyRates?.PKR || 280;
                      const pkrPrice = addon.costUSD * pkrRate;
                      return (
                        <div
                          key={addon.id}
                          className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-600/70 transition-all space-y-4 relative group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-100/80 border border-purple-100 text-gray-500">
                                #{addon.id}
                              </span>
                              <h3 className="font-bold text-sm text-[#18113C] pt-1">{addon.name}</h3>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditAddon(addon)}
                                className="p-1.5 rounded-xl bg-purple-50 text-gray-500 hover:bg-[#6D28D9] hover:text-[#18113C] transition-colors"
                                title="Edit Add-on"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmEstimator({ type: 'addon', id: addon.id, name: addon.name })}
                                className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-300 transition-colors"
                                title="Delete Add-on"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-gray-500">Add-on Surcharge</span>
                            <div className="text-right">
                              <span className="text-base font-extrabold text-[#A78BFA]">+${addon.costUSD.toLocaleString()}</span>
                              <span className="text-[10px] text-emerald-600 font-bold block">+₨ {pkrPrice.toLocaleString()} PKR</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenEditAddon(addon)}
                            className="w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-gray-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Modify Add-on Cost</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Subtab 3: Scale & Multipliers */}
              {estimatorSubTab === 'scale' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-100/60 border border-purple-800/50 text-xs text-gray-600 flex items-center gap-3">
                    <Info className="w-5 h-5 text-gray-400 shrink-0" />
                    <span>
                      Scale multipliers dynamically scale the base project price. For example, selecting <strong>Compact (0.85x)</strong> discounts the base rate, while <strong>Enterprise (1.8x)</strong> expands the budget and adds delivery time.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {estimatorSettings.scaleOptions?.map((scale) => {
                      return (
                        <div
                          key={scale.id}
                          className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-600/70 transition-all space-y-4 relative group"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-100/80 border border-purple-100 text-gray-500">
                              #{scale.id}
                            </span>
                            <button
                              onClick={() => handleOpenEditScale(scale)}
                              className="p-1.5 rounded-xl bg-purple-50 text-gray-500 hover:bg-[#6D28D9] hover:text-[#18113C] transition-colors"
                              title="Edit Scale"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h3 className="font-bold text-sm text-[#18113C]">{scale.label}</h3>

                          <div className="space-y-2 pt-2 border-t border-purple-100 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Multiplier:</span>
                              <span className="font-extrabold text-[#A78BFA] text-base">{scale.multiplier}x</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Delivery Delta:</span>
                              <span className="font-bold text-[#18113C]">
                                {scale.weeksDelta > 0 ? `+${scale.weeksDelta}` : scale.weeksDelta} Weeks
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenEditScale(scale)}
                            className="w-full py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-gray-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Adjust Factor</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Subtab 4: Design & Backend Tiers */}
              {estimatorSubTab === 'design_backend' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Design Tiers */}
                  <div className="space-y-4 p-6 rounded-3xl bg-white border border-purple-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#18113C] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gray-500" />
                        <span>UI/UX Design Tiers (3 Levels)</span>
                      </h3>
                      <span className="text-[10px] text-gray-500">Step 3 on Website</span>
                    </div>

                    <div className="space-y-3">
                      {estimatorSettings.designTiers?.map((tier) => {
                        const pkrPrice = tier.costUSD * (estimatorSettings.currencyRates?.PKR || 280);
                        return (
                          <div
                            key={tier.id}
                            className="p-4 rounded-2xl bg-purple-50/50 border border-purple-800/50 hover:border-purple-600/70 transition-all flex items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-[#18113C]">{tier.label}</h4>
                                <span className="text-[9px] font-mono text-gray-500">#{tier.id}</span>
                              </div>
                              <p className="text-[11px] text-gray-500">{tier.desc}</p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <span className="text-xs font-extrabold text-[#A78BFA]">
                                  {tier.costUSD === 0 ? 'Included ($0)' : `+$${tier.costUSD}`}
                                </span>
                                {tier.costUSD > 0 && (
                                  <span className="text-[10px] text-emerald-600 font-bold block">+₨ {pkrPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <button
                                onClick={() => handleOpenEditDesign(tier)}
                                className="p-1.5 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] hover:bg-[#6D28D9] transition-colors"
                                title="Edit Design Tier"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Backend Tiers */}
                  <div className="space-y-4 p-6 rounded-3xl bg-white border border-purple-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#18113C] flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-gray-500" />
                        <span>Backend Complexity & APIs (3 Levels)</span>
                      </h3>
                      <span className="text-[10px] text-gray-500">Step 4 on Website</span>
                    </div>

                    <div className="space-y-3">
                      {estimatorSettings.backendOptions?.map((backend) => {
                        const pkrPrice = backend.costUSD * (estimatorSettings.currencyRates?.PKR || 280);
                        return (
                          <div
                            key={backend.id}
                            className="p-4 rounded-2xl bg-purple-50/50 border border-purple-800/50 hover:border-purple-600/70 transition-all flex items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-[#18113C]">{backend.label}</h4>
                                <span className="text-[9px] font-mono text-gray-500">#{backend.id}</span>
                              </div>
                              <p className="text-[11px] text-gray-500">System architecture tier</p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <span className="text-xs font-extrabold text-[#A78BFA]">
                                  {backend.costUSD === 0 ? 'Included ($0)' : `+$${backend.costUSD}`}
                                </span>
                                {backend.costUSD > 0 && (
                                  <span className="text-[10px] text-emerald-600 font-bold block">+₨ {pkrPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <button
                                onClick={() => handleOpenEditBackend(backend)}
                                className="p-1.5 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] hover:bg-[#6D28D9] transition-colors"
                                title="Edit Backend Tier"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 5: Currency Rates */}
              {estimatorSubTab === 'currency' && (
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100 space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-base font-bold text-[#18113C] flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <span>Currency Conversion Rates</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      The website primarily displays prices in Pakistani Rupees (₨ PKR) for local clients, as well as GBP (£) and USD ($). Adjust the conversion factor below.
                    </p>
                  </div>

                  <form onSubmit={handleSaveCurrencyRates} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-800/50 space-y-2">
                        <label className="text-xs font-bold text-emerald-600 flex items-center justify-between">
                          <span>1 USD to PKR (₨)</span>
                          <span className="text-[10px] font-normal text-gray-500">Pakistan Rupee</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₨</span>
                          <input
                            type="number"
                            step="1"
                            value={currencyForm.pkr}
                            onChange={(e) => setCurrencyForm({ ...currencyForm, pkr: Number(e.target.value) })}
                            className="w-full pl-8 pr-3 py-2 bg-purple-100/80 border border-purple-100 rounded-xl text-[#18113C] font-extrabold text-sm focus:outline-none focus:border-purple-400"
                            placeholder="280"
                          />
                        </div>
                        <p className="text-[10px] text-gray-500">Current active exchange rate for all cost calculations.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-800/50 space-y-2">
                        <label className="text-xs font-bold text-[#A78BFA] flex items-center justify-between">
                          <span>1 USD to GBP (£)</span>
                          <span className="text-[10px] font-normal text-gray-500">British Pound</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">£</span>
                          <input
                            type="number"
                            step="0.01"
                            value={currencyForm.gbp}
                            onChange={(e) => setCurrencyForm({ ...currencyForm, gbp: Number(e.target.value) })}
                            className="w-full pl-8 pr-3 py-2 bg-purple-100/80 border border-purple-100 rounded-xl text-[#18113C] font-extrabold text-sm focus:outline-none focus:border-purple-400"
                            placeholder="0.79"
                          />
                        </div>
                        <p className="text-[10px] text-gray-500">Used when international clients switch to GBP.</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Example: $850 USD = <strong className="text-emerald-600">₨ {Math.round(850 * (Number(currencyForm.pkr) || 280)).toLocaleString()} PKR</strong>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-200 flex items-center gap-2 transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Currency Rates</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* LIVE SIMULATOR & VERIFICATION COMPONENT */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1A123B] to-[#120B29] border-2 border-purple-100 shadow-2xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-800/50 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#18113C] flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-[#A78BFA]" />
                      <span>Live Calculator Simulator (Front-End Verification)</span>
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Test any combination below to verify exactly what clients will see on the website.
                    </p>
                  </div>
                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-gray-600 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Open Live Estimator Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Simulator controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {/* Select Type */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Project Type</label>
                    <select
                      value={simType}
                      onChange={(e) => setSimType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-100 text-[#18113C] font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.projectTypes?.map(pt => (
                        <option key={pt.id} value={pt.id}>{pt.name} (${pt.baseUSD})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Scale */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Scale / Volume</label>
                    <select
                      value={simScale}
                      onChange={(e) => setSimScale(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-100 text-[#18113C] font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.scaleOptions?.map(s => (
                        <option key={s.id} value={s.id}>{s.label} ({s.multiplier}x)</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Design */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Design Tier</label>
                    <select
                      value={simDesign}
                      onChange={(e) => setSimDesign(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-100 text-[#18113C] font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.designTiers?.map(d => (
                        <option key={d.id} value={d.id}>{d.label} (+${d.costUSD})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Backend */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500">Backend Complexity</label>
                    <select
                      value={simBackend}
                      onChange={(e) => setSimBackend(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-100 text-[#18113C] font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.backendOptions?.map(b => (
                        <option key={b.id} value={b.id}>{b.label} (+${b.costUSD})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Simulator Addons */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Included Add-ons</label>
                  <div className="flex flex-wrap gap-2">
                    {estimatorSettings.addonOptions?.map(a => {
                      const isChecked = simAddons.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => {
                            setSimAddons(prev => prev.includes(a.id) ? prev.filter(x => x !== a.id) : [...prev, a.id]);
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isChecked
                              ? 'bg-[#6D28D9] border-[#6D28D9] text-[#18113C] shadow-xs'
                              : 'bg-purple-100/60 border-purple-100 text-gray-500 hover:border-purple-600'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center ${
                            isChecked ? 'bg-white text-[#6D28D9]' : 'border-purple-600'
                          }`}>
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span>{a.name} (+${a.costUSD})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Calculation Results Bar */}
                {(() => {
                  const selType = estimatorSettings.projectTypes?.find(p => p.id === simType) || estimatorSettings.projectTypes?.[0] || { baseUSD: 850, weeks: 3 };
                  const selScale = estimatorSettings.scaleOptions?.find(s => s.id === simScale) || estimatorSettings.scaleOptions?.[0] || { multiplier: 1.0, weeksDelta: 0 };
                  const selDesign = estimatorSettings.designTiers?.find(d => d.id === simDesign) || estimatorSettings.designTiers?.[0] || { costUSD: 0 };
                  const selBackend = estimatorSettings.backendOptions?.find(b => b.id === simBackend) || estimatorSettings.backendOptions?.[0] || { costUSD: 0 };
                  const addonsSum = simAddons.reduce((acc, curr) => {
                    const found = estimatorSettings.addonOptions?.find(a => a.id === curr);
                    return acc + (found ? found.costUSD : 0);
                  }, 0);

                  const calculatedUSD = Math.round(
                    (selType.baseUSD * selScale.multiplier) +
                    selDesign.costUSD +
                    selBackend.costUSD +
                    addonsSum
                  );
                  const pkrRate = estimatorSettings.currencyRates?.PKR || 280;
                  const calculatedPKR = Math.round(calculatedUSD * pkrRate);
                  const calculatedWeeks = Math.max(2, Math.round(selType.weeks + selScale.weeksDelta));

                  return (
                    <div className="p-4 rounded-2xl bg-[#140D30] border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-[10px] text-gray-400 block font-medium">Estimated PKR (Website Primary)</span>
                          <span className="text-2xl font-display font-extrabold text-emerald-600 tracking-tight">
                            ₨ {calculatedPKR.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-l border-purple-800/80 pl-6">
                          <span className="text-[10px] text-gray-400 block font-medium">Base USD Price</span>
                          <span className="text-xl font-display font-bold text-[#A78BFA]">
                            ${calculatedUSD.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-l border-purple-800/80 pl-6">
                          <span className="text-[10px] text-gray-400 block font-medium">Estimated Delivery</span>
                          <span className="text-sm font-bold text-[#18113C] flex items-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-gray-500" />
                            ~{calculatedWeeks} Weeks
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-gray-500">
                          Formula: <code className="text-gray-600 bg-purple-100 px-1.5 py-0.5 rounded">(${selType.baseUSD} × {selScale.multiplier}) + ${selDesign.costUSD} + ${selBackend.costUSD} + ${addonsSum}</code>
                        </span>
                      </div>
                    </div>
                  );
                })()}

              </div>

            </div>
          )}

          {/* ABOUT US CMS TAB */}
          {currentTab === 'about' && (
            <div className="space-y-6">
              
              {/* Toast for saved actions */}
              {aboutSavedToast && (
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-500/60 text-emerald-600 flex items-center justify-between shadow-xl animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold">{aboutSavedToast}</span>
                  </div>
                  <button 
                    onClick={() => setAboutSavedToast(null)}
                    className="text-emerald-600 hover:text-emerald-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-display font-bold text-[#18113C]">About Us Content Manager</h1>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-50 text-gray-500 border border-purple-700/50 font-bold">
                      Live Dynamic CMS
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage the hero headline, dual offices (Lahore HQ &amp; London Liaison), leadership team, milestones timeline, and engineering principles. All edits update instantly on the website.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-200 border border-purple-700/50 text-gray-600 hover:text-[#18113C] text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span>View on Website</span>
                  </button>
                  <button
                    onClick={handleResetAboutDefaults}
                    className="px-3 py-2 rounded-xl bg-purple-50 border border-purple-100 hover:border-purple-600 text-gray-500 hover:text-[#18113C] text-xs font-bold flex items-center gap-1.5 transition-all"
                    title="Reset all About Us content to original defaults"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Subtabs Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-purple-100">
                <button
                  onClick={() => setAboutSubTab('hero')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'hero'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hero &amp; Story</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('offices')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'offices'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Offices &amp; Presence (Lahore &amp; London)</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('leadership')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'leadership'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Leadership Team ({aboutState.leadership.length})</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('milestones')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'milestones'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Milestones Timeline ({aboutState.milestones.length})</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('principles')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'principles'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Engineering Principles ({aboutState.principles.length})</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('cta')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'cta'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-500 hover:text-[#18113C] hover:bg-purple-50'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Bottom CTA</span>
                </button>
              </div>

              {/* TAB 1: HERO & STORY */}
              {aboutSubTab === 'hero' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Edit Form */}
                  <div className="lg:col-span-7 bg-white border border-purple-100 rounded-3xl p-6 shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-[#18113C] flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                          <span>Edit Hero Headline &amp; Mission</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">Controls the top of the About Us page</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-gray-500 font-bold">
                        Front-End Sync
                      </span>
                    </div>

                    <form onSubmit={handleSaveHero} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 block">Top Pill Badge Text</label>
                        <input
                          type="text"
                          required
                          value={heroForm.badge}
                          onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                          placeholder="e.g. About KMAWD • Since 2016"
                          className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] placeholder-gray-400 focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 block">Main Headline / Title</label>
                        <input
                          type="text"
                          required
                          value={heroForm.title}
                          onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                          placeholder="e.g. Software Craftsmen Who Believe in Code That Works."
                          className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] placeholder-gray-400 focus:outline-none focus:border-purple-400 font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 block">Mission Paragraph / Subtitle</label>
                        <textarea
                          rows={4}
                          required
                          value={heroForm.subtitle}
                          onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                          placeholder="Operating from Lahore, Pakistan with international liaison in London, UK..."
                          className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] placeholder-gray-400 focus:outline-none focus:border-purple-400 leading-relaxed"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save &amp; Update Live Website</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Live Visual Preview */}
                  <div className="lg:col-span-5 bg-white border border-purple-100 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-purple-100 pb-3 mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-gray-500" />
                          <span>Live Website Hero Preview</span>
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold border border-emerald-800/40">
                          Real-time
                        </span>
                      </div>

                      <div className="p-6 rounded-2xl bg-white text-gray-900 shadow-md space-y-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-[11px] font-bold">
                          <Building2 className="w-3 h-3" />
                          <span>{heroForm.badge || 'About KMAWD • Since 2016'}</span>
                        </div>
                        <h2 className="text-lg font-bold text-gray-950 leading-snug">
                          {heroForm.title || 'Software Craftsmen Who Believe in Code That Works.'}
                        </h2>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {heroForm.subtitle || 'Operating from Lahore, Pakistan with international liaison in London, UK...'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-purple-100 text-[11px] text-gray-500">
                      Changes saved here immediately reflect in <code className="bg-purple-100 px-1 py-0.5 rounded text-gray-600">AboutView.tsx</code> for all website visitors.
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: OFFICES & LOCATIONS */}
              {aboutSubTab === 'offices' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#18113C] flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#A78BFA]" />
                        <span>Dual Office Presence: Lahore HQ &amp; London Liaison</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Update physical addresses, phone numbers, operating hours, and focus disciplines.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveOffices} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Lahore HQ Box */}
                      <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
                            <h4 className="text-sm font-bold text-[#18113C]">Lahore Headquarters</h4>
                          </div>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-50 text-gray-500 border border-purple-700/50 font-bold">
                            Pakistan
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">Office Title</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.title}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, title: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">City / Badge</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.city}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, city: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-600">Header Subtitle / Tag</label>
                            <input
                              type="text"
                              value={officesForm.lahore.label}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                lahore: { ...officesForm.lahore, label: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-600">Full Physical Address</label>
                            <textarea
                              rows={2}
                              required
                              value={officesForm.lahore.address}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                lahore: { ...officesForm.lahore, address: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">Direct Phone</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.phone}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, phone: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">Working Hours</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.hours}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, hours: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-600">Core Disciplines / Specialties</label>
                            <input
                              type="text"
                              value={officesForm.lahore.specialtyValue}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                lahore: { ...officesForm.lahore, specialtyValue: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* London UK Office Box */}
                      <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                            <h4 className="text-sm font-bold text-[#18113C]">United Kingdom Liaison</h4>
                          </div>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 font-bold">
                            London, UK
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">Office Title</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.title}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, title: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">City / Badge</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.city}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, city: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-600">Header Subtitle / Tag</label>
                            <input
                              type="text"
                              value={officesForm.london.label}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                london: { ...officesForm.london, label: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-600">Full Physical Address</label>
                            <textarea
                              rows={2}
                              required
                              value={officesForm.london.address}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                london: { ...officesForm.london, address: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">UK Direct Phone</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.phone}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, phone: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-gray-600">Working Hours</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.hours}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, hours: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-gray-600">Core Focus / Specialties</label>
                            <input
                              type="text"
                              value={officesForm.london.specialtyValue}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                london: { ...officesForm.london, specialtyValue: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] font-medium"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Office Presence &amp; Push to Website</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: LEADERSHIP TEAM */}
              {aboutSubTab === 'leadership' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-[#18113C] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#A78BFA]" />
                        <span>Leadership &amp; Engineering Leads ({aboutState.leadership.length})</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Manage company founders, directors, lead engineers, and specialists.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreateLeader}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-200 self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Team Member</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {aboutState.leadership.map((leader) => (
                      <div
                        key={leader.id}
                        className="bg-white border border-purple-100 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-purple-600 transition-all group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={leader.avatar}
                              alt={leader.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/50 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/aistudio/image_f804651e.png';
                              }}
                            />
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-[#18113C] truncate">{leader.name}</h4>
                              <span className="text-[11px] text-[#A78BFA] font-medium block truncate">{leader.role}</span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-500/90 leading-relaxed line-clamp-3">
                            {leader.bio}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-4 mt-3 border-t border-purple-100">
                          <button
                            onClick={() => handleOpenEditLeader(leader)}
                            className="p-1.5 rounded-lg bg-purple-100/70 hover:bg-purple-900 text-gray-500 hover:text-[#18113C] transition-colors"
                            title="Edit team member"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmAbout({ type: 'leader', id: leader.id, name: leader.name })}
                            className="p-1.5 rounded-lg bg-rose-50/60 hover:bg-rose-900 text-rose-300 hover:text-[#18113C] transition-colors"
                            title="Delete team member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MILESTONES TIMELINE */}
              {aboutSubTab === 'milestones' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-[#18113C] flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#A78BFA]" />
                        <span>A Decade of Growth Milestones ({aboutState.milestones.length})</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Chronological journey items shown on the website timeline.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreateMilestone}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-200 self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aboutState.milestones.map((m) => (
                      <div
                        key={m.id}
                        className="bg-white border border-purple-100 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-purple-600 transition-all"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-display font-extrabold text-[#A78BFA]">
                              {m.year}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-gray-500 font-bold">
                              Milestone
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#18113C]">{m.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {m.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-purple-100">
                          <button
                            onClick={() => handleOpenEditMilestone(m)}
                            className="p-1.5 rounded-lg bg-purple-100/70 hover:bg-purple-900 text-gray-500 hover:text-[#18113C] transition-colors"
                            title="Edit milestone"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmAbout({ type: 'milestone', id: m.id, name: `${m.year} - ${m.title}` })}
                            className="p-1.5 rounded-lg bg-rose-50/60 hover:bg-rose-900 text-rose-300 hover:text-[#18113C] transition-colors"
                            title="Delete milestone"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ENGINEERING PRINCIPLES */}
              {aboutSubTab === 'principles' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#18113C] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                        <span>Our Engineering Principles ({aboutState.principles.length})</span>
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        The core values and software development manifesto highlighted on the About Us page.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreatePrinciple}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-200 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Principle</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {aboutState.principles.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white border border-purple-100 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-purple-500 transition-all"
                      >
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-700/50 flex items-center justify-center text-gray-500">
                            {p.icon === 'Code2' && <Code2 className="w-5 h-5" />}
                            {p.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                            {p.icon === 'Cpu' && <Cpu className="w-5 h-5" />}
                            {p.icon === 'Clock' && <Clock className="w-5 h-5" />}
                            {p.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block mb-1">Principle</span>
                            <h4 className="text-sm font-bold text-[#18113C]">{p.title}</h4>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {p.desc}
                          </p>
                        </div>

                        <div className="pt-4 mt-2 border-t border-purple-100 flex justify-end">
                          <button
                            onClick={() => handleOpenEditPrinciple(p)}
                            className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-gray-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Value</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: BOTTOM CTA BANNER */}
              {aboutSubTab === 'cta' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Edit Form */}
                  <div className="lg:col-span-7 bg-white border border-purple-100 rounded-3xl p-6 shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-[#18113C] flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
                          <span>Edit Bottom CTA Banner</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">Controls the bottom conversion callout on About Us</p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveCTA} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 block">Callout Title</label>
                        <input
                          type="text"
                          required
                          value={ctaForm.title}
                          onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                          placeholder="Meet the engineers building the next generation of web software."
                          className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 block">Callout Description</label>
                        <textarea
                          rows={3}
                          required
                          value={ctaForm.desc}
                          onChange={(e) => setCtaForm({ ...ctaForm, desc: e.target.value })}
                          placeholder="Whether you need an on-site consultation at our Lahore office or a virtual discovery session from London..."
                          className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C] leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 block">Button Label</label>
                        <input
                          type="text"
                          required
                          value={ctaForm.buttonText}
                          onChange={(e) => setCtaForm({ ...ctaForm, buttonText: e.target.value })}
                          placeholder="Book a Free Technical Discovery Call"
                          className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-[#18113C]"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save &amp; Update CTA Banner</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Live Visual Preview */}
                  <div className="lg:col-span-5 bg-white border border-purple-100 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-purple-100 pb-3 mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-gray-500" />
                          <span>Live Banner Preview</span>
                        </h4>
                      </div>

                      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-purple-50 text-gray-900 shadow-md space-y-4 text-center border border-purple-100">
                        <h3 className="text-base font-bold text-gray-950">
                          {ctaForm.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {ctaForm.desc}
                        </p>
                        <button
                          type="button"
                          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#6D28D9] shadow-md shadow-purple-600/30 inline-flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>{ctaForm.buttonText}</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-purple-100 text-[11px] text-gray-500">
                      When clicked, this button triggers the quote &amp; technical discovery booking flow.
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB: TEACHERS MANAGER */}
          {currentTab === 'teachers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-[#18113C]">Teachers Manager</h1>
                  <p className="text-xs text-gray-500 mt-1">Add, edit, or remove faculty members from the website</p>
                </div>
                <button
                  onClick={() => {
                    setEditingTeacherId(null);
                    setTeacherForm({
                      id: '',
                      name: '',
                      role: '',
                      specialization: '',
                      category: 'web',
                      categoryLabel: 'Web Development',
                      experience: '',
                      studentsCount: '',
                      bio: '',
                      avatar: '/assets/aistudio/image_f804651e.png',
                      rating: 5.0,
                      reviewsCount: 0,
                      primaryCourse: '',
                      skills: '',
                      highlights: '',
                      socials: { linkedin: '', github: '' }
                    });
                    setIsTeacherModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Teacher</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachersList.map((teacher) => (
                  <div key={teacher.id} className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-600 transition-all space-y-4 group">
                    <div className="flex items-center gap-4">
                      <img src={teacher.avatar} alt={teacher.name} className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30" />
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#18113C] truncate">{teacher.name}</h3>
                        <p className="text-[11px] text-gray-400 font-medium truncate">{teacher.role}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="px-2 py-0.5 rounded-md bg-purple-100/80 border border-purple-100 text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                            {teacher.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-gray-600/80 line-clamp-2 leading-relaxed h-8">
                      {teacher.bio}
                    </p>

                    <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                      <div className="text-[10px] text-gray-500">
                        <span className="font-bold text-[#18113C]">{teacher.experience}</span> Experience
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingTeacherId(teacher.id);
                            setTeacherForm({
                              ...teacher,
                              skills: Array.isArray(teacher.skills) ? teacher.skills.join(', ') : teacher.skills,
                              highlights: Array.isArray(teacher.highlights) ? teacher.highlights.join(', ') : teacher.highlights
                            });
                            setIsTeacherModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-purple-50 text-gray-500 hover:bg-[#6D28D9] hover:text-white transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ id: teacher.id, name: teacher.name, type: 'teacher' })}
                          className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: LIVE SESSIONS */}
          {currentTab === 'live_sessions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-[#18113C]">Live Sessions Manager</h1>
                  <p className="text-xs text-gray-500 mt-1">Manage upcoming webinars and live workshop schedules</p>
                </div>
                <button
                  onClick={() => {
                    setEditingSessionId(null);
                    setSessionForm({
                      id: '',
                      title: '',
                      instructor: '',
                      date: '',
                      time: '',
                      duration: '',
                      status: 'Upcoming',
                      link: '',
                      thumbnail: '/assets/aistudio/image_85a3982c.png',
                      startTime: ''
                    });
                    setIsSessionModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Session</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sessionsList.map((session) => (
                  <div key={session.id} className="p-5 rounded-2xl bg-white border border-purple-100 flex gap-5 hover:border-purple-600 transition-all">
                    <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-purple-700/30">
                      <img src={session.thumbnail} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                            session.status === 'Live' ? 'bg-rose-600 animate-pulse' : 'bg-purple-50 text-gray-500'
                          }`}>
                            {session.status}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold">{session.date}</span>
                        </div>
                        <h3 className="font-bold text-sm text-[#18113C] truncate">{session.title}</h3>
                        <p className="text-[10px] text-gray-500 mt-1">Instructor: <span className="text-[#18113C]">{session.instructor}</span></p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.time}</span>
                          <span className="flex items-center gap-1"><Play className="w-3 h-3" /> {session.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          onClick={() => {
                            setEditingSessionId(session.id);
                            setSessionForm(session);
                            setIsSessionModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-purple-50 text-gray-500 hover:bg-[#6D28D9] hover:text-[#18113C]"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ id: session.id, name: session.title, type: 'session' })}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-[#18113C]"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTESTS MANAGER */}
          {currentTab === 'contests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-[#18113C]">Contests & Challenges</h1>
                  <p className="text-xs text-gray-500 mt-1">Manage hackathons, design challenges, and rewards</p>
                </div>
                <button
                  onClick={() => {
                    setEditingContestId(null);
                    setContestForm({
                      id: '',
                      title: '',
                      description: '',
                      date: '',
                      prize: '',
                      status: 'Upcoming',
                      image: '/assets/aistudio/hero_illustration_full.png'
                    });
                    setIsContestModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Contest</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contestsList.map((contest) => (
                  <div key={contest.id} className="p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-600 transition-all space-y-4">
                    <div className="h-32 rounded-xl overflow-hidden border border-purple-700/30">
                      <img src={contest.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          contest.status === 'Live' ? 'bg-rose-600' : 'bg-purple-50 text-gray-500'
                        }`}>
                          {contest.status}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">{contest.date}</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#18113C] truncate">{contest.title}</h3>
                      <p className="text-[10px] text-gray-500 line-clamp-2">{contest.description}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold">
                        <Award className="w-3 h-3" />
                        <span>Prize: {contest.prize}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-100">
                      <button
                        onClick={() => {
                          setEditingContestId(contest.id);
                          setContestForm(contest);
                          setIsContestModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-purple-50 text-gray-500 hover:bg-[#6D28D9] hover:text-[#18113C]"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      {contest.link && (
                        <button
                          onClick={() => window.open(contest.link, '_blank')}
                          className="px-2 py-1 rounded-lg bg-[#6D28D9] text-white text-[10px] font-bold hover:bg-[#5B21B6]"
                        >
                          View Details
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteConfirm({ id: contest.id, name: contest.title, type: 'contest' })}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-[#18113C]"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TEAM PAGES MANAGER */}
          {currentTab === 'team_pages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-display font-bold text-[#18113C]">Team Pages Manager</h1>
                  <p className="text-xs text-gray-500 mt-1">Manage public profiles of KMAWD team members</p>
                </div>
                <button
                  onClick={() => {
                    setEditingTeamMemberId(null);
                    setTeamForm({
                      id: '',
                      name: '',
                      role: '',
                      department: 'engineering',
                      departmentLabel: 'Full-Stack Engineering',
                      location: 'Lahore, Pakistan',
                      experience: '',
                      avatar: '/assets/aistudio/image_f804651e.png',
                      bio: '',
                      keyAchievement: '',
                      techStack: [],
                      socials: {}
                    });
                    setIsTeamModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-200"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamList.map((member) => (
                  <div key={member.id} className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-600 transition-all space-y-4">
                    <div className="flex items-center gap-4">
                      <img src={member.imageUrl || member.avatar} alt={member.name} className="w-14 h-14 rounded-xl object-cover border border-purple-500/30" />
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#18113C] truncate">{member.name}</h3>
                        <p className="text-[10px] text-gray-400 font-medium truncate">{member.role}</p>
                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{member.departmentLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-100">
                      <button
                        onClick={() => {
                          setEditingTeamMemberId(member.id);
                          setTeamForm(member);
                          setIsTeamModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-purple-50 text-gray-500 hover:bg-[#6D28D9] hover:text-[#18113C]"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ id: member.id, name: member.name, type: 'team' })}
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-[#18113C]"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT & COMPANY INFO */}
          {currentTab === 'contact' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-display font-bold text-[#18113C]">Company Identity &amp; Contact</h1>
                <p className="text-xs text-gray-500 mt-1">Update brand logo, support emails, and global contact numbers</p>
              </div>

              <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-xl">
                <form onSubmit={handleSaveCompanyInfo} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600">Agency Name</label>
                      <input 
                        type="text"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600">Public Support Email</label>
                      <input 
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600">Global Contact Number</label>
                      <input 
                        type="text"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600">Brand Logo URL</label>
                      <input 
                        type="text"
                        value={companyInfo.logo}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, logo: e.target.value })}
                        className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600">Headquarters Address</label>
                    <textarea 
                      rows={2}
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update Global Identity</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-6 rounded-3xl bg-purple-100/30 border border-purple-100 space-y-3">
                <div className="flex items-center gap-2 text-gray-600 font-bold text-sm">
                  <Info className="w-5 h-5 text-gray-500" />
                  <span>Sync Notice</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The information above is synchronized across the Footer, Contact page, and About Us maps. Updating the phone number here will also update the primary WhatsApp contact button on the front-end.
                </p>
              </div>
            </div>
          )}

          {/* TAB: STUDENTS MANAGEMENT */}
          {currentTab === 'students' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-black text-[#18113C]">Registered <span className="text-[#6D28D9]">Students</span></h1>
                  <p className="text-xs text-gray-500 mt-1">Manage enrollments, student profiles and course interests</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingStudentId(null);
                    setStudentForm({
                      id: '',
                      name: '',
                      email: '',
                      phoneNumber: '',
                      country: 'Pakistan',
                      primaryCourse: COURSES[0].title,
                      bio: '',
                      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
                    });
                    setIsStudentModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 hover:bg-[#5B21B6] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register New Student</span>
                </button>
              </div>

              {/* Students Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6D28D9]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#18113C]">{studentsList.length}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Learners</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#18113C]">{studentsList.length}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verified Students</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#18113C]">
                      {[...new Set(studentsList.map(s => s.country))].length}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Countries Served</div>
                  </div>
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-purple-50/50 border-b border-purple-100">
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course Interest</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {studentsList.length > 0 ? (
                        studentsList.filter(s => 
                          s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((student) => (
                          <tr key={student.id} className="hover:bg-purple-50/30 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-100 shadow-sm">
                                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-[#18113C]">{student.name}</div>
                                  <div className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                                    <MapPin className="w-2.5 h-2.5" />
                                    {student.country}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-600">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <Mail className="w-3 h-3 text-gray-500" />
                                  {student.email}
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Phone className="w-3 h-3 text-emerald-600" />
                                  {student.phoneNumber}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#6D28D9] text-[10px] font-black uppercase tracking-wide border border-purple-100">
                                {student.primaryCourse}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingStudentId(student.id);
                                    setStudentForm({ ...student });
                                    setIsStudentModalOpen(true);
                                  }}
                                  className="p-2 rounded-lg bg-purple-50 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition-all shadow-sm"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => setDeleteConfirm({ id: student.id, name: student.name, type: 'student' })}
                                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <Users className="w-10 h-10 text-white" />
                              <div className="text-gray-400 text-sm font-medium">No student records found</div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RESULTS MANAGEMENT */}
          {currentTab === 'results' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-black text-[#18113C]">Academic <span className="text-[#6D28D9]">Results</span></h1>
                  <p className="text-xs text-gray-500 mt-1">Manage student scores, certificates and public achievements</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingResultId(null);
                    setResultForm({
                      id: '',
                      studentName: '',
                      courseTitle: COURSES[0].title,
                      score: '',
                      status: 'Distinction',
                      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now(),
                      isCertified: true
                    });
                    setIsResultModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 hover:bg-[#5B21B6] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Student Result</span>
                </button>
              </div>

              {/* Results Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6D28D9]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#18113C]">{resultsList.length}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Records</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#18113C]">{resultsList.filter(r => r.status === 'Distinction').length}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Distinctions</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#18113C]">100%</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verification Rate</div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <CheckSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-[#18113C]">Public</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status</div>
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <div className="bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-purple-50/50 border-b border-purple-100">
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Score</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {resultsList.length > 0 ? (
                        resultsList.filter(r => 
                          r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((res) => (
                          <tr key={res.id} className="hover:bg-purple-50/30 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-100 shadow-sm">
                                  <img src={res.avatar} alt={res.studentName} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-[#18113C]">{res.studentName}</div>
                                  <div className="text-[10px] text-gray-400 flex items-center gap-1 font-medium">
                                    <Calendar className="w-2.5 h-2.5" />
                                    {res.date}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="space-y-1">
                                <div className="text-xs font-bold text-gray-700">{res.courseTitle}</div>
                                <div className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  res.status === 'Distinction' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-[#6D28D9]'
                                }`}>
                                  {res.status}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-base font-black text-[#6D28D9]">{res.score}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingResultId(res.id);
                                    setResultForm({ ...res });
                                    setIsResultModalOpen(true);
                                  }}
                                  className="p-2 rounded-lg bg-purple-50 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition-all shadow-sm"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => setDeleteConfirm({ id: res.id, name: res.studentName, type: 'result' })} 
                                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">No results found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {/* TAB: ACADEMIC CMS */}
          {currentTab === 'academic_programs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-display font-black text-[#18113C]">Academic <span className="text-[#6D28D9]">CMS</span></h1>
                  <p className="text-xs text-gray-500 mt-1">Manage academic pillars, upcoming cohorts, and verification stats</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingCohortId(null);
                    setCohortForm({
                      id: '',
                      course: COURSES[0].title,
                      date: '',
                      status: 'Open',
                      spots: ''
                    });
                    setIsCohortModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 hover:bg-[#5B21B6] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Cohort</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {academicState.pillars.map((pillar: any, idx: number) => (
                  <div key={idx} className="bg-white border border-purple-100 rounded-3xl p-6 shadow-sm space-y-4">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center`}>
                      <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        value={pillar.title} 
                        onChange={(e) => {
                          const newPillars = [...academicState.pillars];
                          newPillars[idx].title = e.target.value;
                          saveAcademicData({ ...academicState, pillars: newPillars });
                        }}
                        className="text-sm font-bold text-[#18113C] w-full bg-transparent border-none focus:ring-0 p-0"
                      />
                      <textarea 
                        value={pillar.desc} 
                        onChange={(e) => {
                          const newPillars = [...academicState.pillars];
                          newPillars[idx].desc = e.target.value;
                          saveAcademicData({ ...academicState, pillars: newPillars });
                        }}
                        className="text-xs text-gray-500 w-full bg-transparent border-none focus:ring-0 p-0 mt-1 resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Cohorts Table */}
              <div className="bg-white border border-purple-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-purple-50 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#18113C]">Upcoming Cohorts</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-purple-50/50 border-b border-purple-100">
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Start Date</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {academicState.cohorts.map((cohort: AcademicCohort) => (
                        <tr key={cohort.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-[#18113C]">{cohort.course}</div>
                            <div className="text-[10px] text-gray-400">{cohort.spots}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600">{cohort.date}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                              cohort.status === 'Open' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                              cohort.status === 'Filling Fast' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-rose-50 text-rose-600 border-rose-100'
                            }`}>
                              {cohort.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => {
                                  setEditingCohortId(cohort.id);
                                  setCohortForm({ ...cohort });
                                  setIsCohortModalOpen(true);
                                }}
                                className="p-2 rounded-lg bg-purple-50 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white transition-all shadow-sm"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCohort(cohort.id)}
                                className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm space-y-6">
                <h3 className="text-sm font-bold text-[#18113C]">Global Academic Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {academicState.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">{stat.label}</label>
                      <input 
                        type="text" 
                        value={stat.val} 
                        onChange={(e) => {
                          const newStats = [...academicState.stats];
                          newStats[idx].val = e.target.value;
                          saveAcademicData({ ...academicState, stats: newStats });
                        }}
                        className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-black text-lg focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: DATABASE / SUPABASE */}
          {currentTab === 'database' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-display font-bold text-[#18113C]">Database & API Integration</h1>
                <p className="text-xs text-gray-500 mt-1">Connect your KMAWD website to external Supabase cloud database</p>
              </div>

              <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-[#6D28D9]">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#18113C]">Supabase Cloud Connection</h3>
                      <p className="text-xs text-gray-500">Sync all website courses, portfolio, teachers, students & messages</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    supabaseConfig.status?.includes('Verified') 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : supabaseConfig.url && supabaseConfig.anonKey 
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {supabaseConfig.status || 'Disconnected'}
                  </span>
                </div>

                {supabaseTestMsg && (
                  <div className={`p-4 rounded-2xl text-xs font-medium border ${
                    supabaseTestMsg.includes('Verified') || supabaseTestMsg.includes('Successful')
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {supabaseTestMsg}
                  </div>
                )}

                <form onSubmit={handleSaveSupabase} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600">Supabase Project URL</label>
                      <input 
                        type="url"
                        required
                        value={supabaseConfig.url}
                        onChange={(e) => setSupabaseConfig({ ...supabaseConfig, url: e.target.value })}
                        placeholder="https://your-project.supabase.co"
                        className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-600">Supabase Anon Key</label>
                      <input 
                        type="password"
                        required
                        value={supabaseConfig.anonKey}
                        onChange={(e) => setSupabaseConfig({ ...supabaseConfig, anonKey: e.target.value })}
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] text-sm focus:border-purple-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-100">
                    <button
                      type="button"
                      onClick={handleTestSupabase}
                      disabled={supabaseTesting}
                      className="px-5 py-2.5 rounded-xl bg-purple-50 text-[#6D28D9] border border-purple-200 text-xs font-bold hover:bg-purple-100 transition-all flex items-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${supabaseTesting ? 'animate-spin' : ''}`} />
                      <span>{supabaseTesting ? 'Testing...' : 'Test Connection'}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={supabaseTesting}
                      className="px-8 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-200 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save & Sync Website Data</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* SQL Schema Copy Card */}
              <div className="bg-white border border-purple-100 rounded-3xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#18113C] flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#6D28D9]" />
                    <span>Supabase SQL Setup Code</span>
                  </h3>
                  <span className="text-[10px] text-gray-400">Run in Supabase SQL Editor</span>
                </div>
                <p className="text-xs text-gray-500">
                  Copy and run this single command in your Supabase project's SQL Editor to auto-create the storage table:
                </p>
                <div className="p-4 rounded-xl bg-gray-900 text-emerald-400 font-mono text-xs overflow-x-auto relative group">
                  <pre className="whitespace-pre-wrap">{`CREATE TABLE IF NOT EXISTS public.website_data (
  id INT8 PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and add public read/write policy safely
ALTER TABLE public.website_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Website Sync" ON public.website_data;
CREATE POLICY "Public Website Sync" ON public.website_data FOR ALL USING (true);`}</pre>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 space-y-3">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <Server className="w-5 h-5 text-blue-600" />
                  <span>How Supabase connects with the website?</span>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  When connected, all client inquiries, course updates, student registrations, teacher profiles, and portfolio projects automatically sync with your Supabase database in real-time.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Quick Action Modal */}
      {quickActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-4 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-bold text-sm text-[#18113C]">{quickActionModal}</h3>
              <button onClick={() => setQuickActionModal(null)} className="text-gray-500 hover:text-[#18113C]">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-gray-500 font-semibold">Title / Description</label>
                <input 
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Next.js 15 Full Stack Masterclass"
                  className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-500 font-semibold">Price (USD)</label>
                <input 
                  type="number"
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  className="w-full px-3 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setQuickActionModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActionSuccess(`${quickActionModal} saved successfully.`);
                  setQuickActionModal(null);
                  setNewCourseTitle('');
                }}
                className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Create / Edit Full Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#18113C] my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-purple-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#6D28D9]/30 border border-purple-500/40 flex items-center justify-center text-gray-500">
                  {editingProjectId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#18113C]">
                    {editingProjectId ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Changes will instantly synchronize to the website and remain saved.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-[#18113C] hover:bg-purple-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">
                  Project Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Modern Full-Stack Logistics Portal"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              {/* Category & Category Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as 'saas' | 'ecommerce' | 'web' | 'mobile' | 'enterprise';
                      const labelMap: Record<string, string> = {
                        web: 'High-Speed Web Portal',
                        ecommerce: 'Food Ordering & E-Commerce',
                        saas: 'SaaS Platform & Analytics',
                        enterprise: 'Enterprise ERP & Cloud System',
                        mobile: 'Mobile Application'
                      };
                      setProjectForm({ 
                        ...projectForm, 
                        category: cat,
                        categoryLabel: labelMap[cat] || 'Web System'
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:outline-none focus:border-purple-400"
                  >
                    <option value="web">High-Speed Web Portal</option>
                    <option value="ecommerce">E-Commerce & Online Store</option>
                    <option value="saas">SaaS Platform</option>
                    <option value="enterprise">Enterprise & ERP</option>
                    <option value="mobile">Mobile Application</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Category Label (Card Badge)</label>
                  <input
                    type="text"
                    value={projectForm.categoryLabel}
                    onChange={(e) => setProjectForm({ ...projectForm, categoryLabel: e.target.value })}
                    placeholder="e.g. Food Ordering & E-Commerce"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Client, Location & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Client Name</label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    placeholder="e.g. Pizza Express App"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Location / Host</label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Live on Vercel"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Year</label>
                  <input
                    type="text"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Live Demo URL & Project Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Live Site / Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={projectForm.demoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                    placeholder="https://pizza-az2a-i6p.vercel.app/"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Image URL / Path</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/assets/aistudio/image_0c0bc5ad.png"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Quick Image Presets */}
              <div className="space-y-1.5">
                <label className="text-gray-500 text-[11px] font-semibold block">Select Existing Website Image:</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Pizza Express', url: '/assets/aistudio/image_0c0bc5ad.png' },
                    { label: 'Abdullah Dev', url: '/assets/aistudio/Screenshot_2026-10-31_102143_c6a481c6.png' },
                    { label: 'Fahad Portfolio', url: '/assets/aistudio/image_9ff0a784.png' },
                    { label: 'Taibe / Shahab', url: '/assets/aistudio/image_03e15199.png' },
                    { label: 'Tau Developer', url: '/assets/aistudio/image_eaa41339.png' },
                    { label: 'KMAWD Agency', url: '/assets/aistudio/hero_illustration_full.png' }
                  ].map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setProjectForm({ ...projectForm, image: preset.url })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                        projectForm.image === preset.url
                          ? 'bg-[#6D28D9] border-purple-400 text-[#18113C]'
                          : 'bg-purple-50/50 border-purple-100 text-gray-500 hover:text-[#18113C]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Summary (Shown on Card)</label>
                <textarea
                  rows={2}
                  value={projectForm.summary}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  placeholder="High-speed interactive food delivery web app with crust customizer and real-time checkout..."
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Challenge</label>
                  <textarea
                    rows={2}
                    value={projectForm.challenge}
                    onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                    placeholder="Designing an ultra-responsive, mobile-first ordering system..."
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Solution</label>
                  <textarea
                    rows={2}
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    placeholder="Engineered with modern React and Tailwind CSS on Vercel..."
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400 leading-relaxed"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  placeholder="React, Tailwind CSS, Vercel, Food Delivery"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Result Metrics */}
              <div className="space-y-2 pt-2 border-t border-purple-800/50">
                <label className="text-gray-600 font-bold block">Performance Metrics &amp; Outcomes</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
                    <input
                      type="text"
                      value={projectForm.metric1Val}
                      onChange={(e) => setProjectForm({ ...projectForm, metric1Val: e.target.value })}
                      placeholder="100%"
                      className="w-full bg-transparent border-b border-purple-100 py-1 text-[#18113C] font-bold text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={projectForm.metric1Lbl}
                      onChange={(e) => setProjectForm({ ...projectForm, metric1Lbl: e.target.value })}
                      placeholder="Lighthouse Performance"
                      className="w-full bg-transparent py-1 text-gray-500 text-[11px] focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
                    <input
                      type="text"
                      value={projectForm.metric2Val}
                      onChange={(e) => setProjectForm({ ...projectForm, metric2Val: e.target.value })}
                      placeholder="<0.8s"
                      className="w-full bg-transparent border-b border-purple-100 py-1 text-[#18113C] font-bold text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={projectForm.metric2Lbl}
                      onChange={(e) => setProjectForm({ ...projectForm, metric2Lbl: e.target.value })}
                      placeholder="Instant Menu Load"
                      className="w-full bg-transparent py-1 text-gray-500 text-[11px] focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
                    <input
                      type="text"
                      value={projectForm.metric3Val}
                      onChange={(e) => setProjectForm({ ...projectForm, metric3Val: e.target.value })}
                      placeholder="4.9★"
                      className="w-full bg-transparent border-b border-purple-100 py-1 text-[#18113C] font-bold text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={projectForm.metric3Lbl}
                      onChange={(e) => setProjectForm({ ...projectForm, metric3Lbl: e.target.value })}
                      placeholder="User Satisfaction"
                      className="w-full bg-transparent py-1 text-gray-500 text-[11px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingProjectId ? 'Save & Update Website' : 'Publish to Website'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Estimator Project Type Modal */}
      {typeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-bold text-base text-[#18113C]">
                {editingTypeId ? 'Edit Project Type' : 'Add New Project Type'}
              </h3>
              <button 
                onClick={() => setTypeModalOpen(false)}
                className="p-1 rounded-xl text-gray-500 hover:text-[#18113C] hover:bg-purple-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveType} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Service / Project Name</label>
                <input
                  type="text"
                  required
                  value={typeForm.name}
                  onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
                  placeholder="e.g. Custom Web Application"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Base Price (USD $)</label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    required
                    value={typeForm.baseUSD}
                    onChange={(e) => setTypeForm({ ...typeForm, baseUSD: Number(e.target.value) })}
                    placeholder="850"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    = ₨ {(typeForm.baseUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Baseline Delivery (Weeks)</label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    step="0.5"
                    required
                    value={typeForm.weeks}
                    onChange={(e) => setTypeForm({ ...typeForm, weeks: Number(e.target.value) })}
                    placeholder="3"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-gray-500 block">Standard turn-around</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setTypeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingTypeId ? 'Save & Push to Website' : 'Add to Estimator'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Estimator Add-on Modal */}
      {addonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-bold text-base text-[#18113C]">
                {editingAddonId ? 'Edit Add-on Service' : 'Add New Add-on Service'}
              </h3>
              <button 
                onClick={() => setAddonModalOpen(false)}
                className="p-1 rounded-xl text-gray-500 hover:text-[#18113C] hover:bg-purple-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddon} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Add-on Feature Name</label>
                <input
                  type="text"
                  required
                  value={addonForm.name}
                  onChange={(e) => setAddonForm({ ...addonForm, name: e.target.value })}
                  placeholder="e.g. Payment Gateway (Stripe/PayPal/Local)"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Additional Cost (USD $)</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  required
                  value={addonForm.costUSD}
                  onChange={(e) => setAddonForm({ ...addonForm, costUSD: Number(e.target.value) })}
                  placeholder="150"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-extrabold focus:outline-none focus:border-purple-400"
                />
                <span className="text-[10px] text-emerald-600 font-bold block">
                  = +₨ {(addonForm.costUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR surcharge
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setAddonModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingAddonId ? 'Save & Push to Website' : 'Add to Estimator'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Estimator Scale Modal */}
      {scaleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-bold text-base text-[#18113C]">Edit Scope Scale & Multiplier</h3>
              <button 
                onClick={() => setScaleModalOpen(false)}
                className="p-1 rounded-xl text-gray-500 hover:text-[#18113C] hover:bg-purple-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveScale} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Scale Label</label>
                <input
                  type="text"
                  required
                  value={scaleForm.label}
                  onChange={(e) => setScaleForm({ ...scaleForm, label: e.target.value })}
                  placeholder="e.g. Standard Business (6 - 12 Views)"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-medium focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Multiplier Factor</label>
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.05"
                    required
                    value={scaleForm.multiplier}
                    onChange={(e) => setScaleForm({ ...scaleForm, multiplier: Number(e.target.value) })}
                    placeholder="1.0"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-gray-500">e.g. 1.0 = 100%, 1.35 = 135%</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Weeks Delta</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={scaleForm.weeksDelta}
                    onChange={(e) => setScaleForm({ ...scaleForm, weeksDelta: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-gray-500">Extra weeks added or subtracted</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setScaleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Push to Website</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Estimator Design Tier Modal */}
      {designModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-bold text-base text-[#18113C]">Edit UI/UX Design Tier</h3>
              <button 
                onClick={() => setDesignModalOpen(false)}
                className="p-1 rounded-xl text-gray-500 hover:text-[#18113C] hover:bg-purple-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDesign} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Design Tier Title</label>
                <input
                  type="text"
                  required
                  value={designForm.label}
                  onChange={(e) => setDesignForm({ ...designForm, label: e.target.value })}
                  placeholder="e.g. Bespoke Custom UI/UX"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-medium focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Description</label>
                <input
                  type="text"
                  required
                  value={designForm.desc}
                  onChange={(e) => setDesignForm({ ...designForm, desc: e.target.value })}
                  placeholder="e.g. Hand-tailored branding, micro-interactions"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] placeholder-gray-400/50 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Additional Cost (USD $)</label>
                <input
                  type="number"
                  min="0"
                  step="25"
                  required
                  value={designForm.costUSD}
                  onChange={(e) => setDesignForm({ ...designForm, costUSD: Number(e.target.value) })}
                  placeholder="250"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-extrabold focus:outline-none focus:border-purple-400"
                />
                <span className="text-[10px] text-emerald-600 font-bold block">
                  = ₨ {(designForm.costUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setDesignModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Push to Website</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Estimator Backend Tier Modal */}
      {backendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-bold text-base text-[#18113C]">Edit Backend Complexity Option</h3>
              <button 
                onClick={() => setBackendModalOpen(false)}
                className="p-1 rounded-xl text-gray-500 hover:text-[#18113C] hover:bg-purple-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBackend} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Backend Option Title</label>
                <input
                  type="text"
                  required
                  value={backendForm.label}
                  onChange={(e) => setBackendForm({ ...backendForm, label: e.target.value })}
                  placeholder="e.g. Standard REST API & Auth"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-medium focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Additional Cost (USD $)</label>
                <input
                  type="number"
                  min="0"
                  step="25"
                  required
                  value={backendForm.costUSD}
                  onChange={(e) => setBackendForm({ ...backendForm, costUSD: Number(e.target.value) })}
                  placeholder="200"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-extrabold focus:outline-none focus:border-purple-400"
                />
                <span className="text-[10px] text-emerald-600 font-bold block">
                  = ₨ {(backendForm.costUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setBackendModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save & Push to Website</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Estimator Delete Confirmation Modal */}
      {deleteConfirmEstimator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-sm bg-white border border-rose-800/60 rounded-3xl p-6 shadow-2xl space-y-4 text-[#18113C] text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-700/60 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#18113C]">
                Delete {deleteConfirmEstimator.type === 'type' ? 'Project Type' : 'Add-on'}?
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>"{deleteConfirmEstimator.name}"</strong>? It will be removed immediately from the live Cost Estimator on the website.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmEstimator(null)}
                className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmEstimator.type === 'type') {
                    handleDeleteType(deleteConfirmEstimator.id);
                  } else {
                    handleDeleteAddon(deleteConfirmEstimator.id);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-[#18113C] text-xs font-bold shadow-lg shadow-rose-900/50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ABOUT US: Milestone Add/Edit Modal */}
      {milestoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-800/80 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-base text-[#18113C]">
                  {editingMilestoneId ? 'Edit Milestone' : 'Add New Milestone'}
                </h3>
              </div>
              <button
                onClick={() => setMilestoneModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-[#18113C] hover:bg-purple-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMilestone} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Year / Timeline Label</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.year}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                  placeholder="e.g. 2026"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-bold focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Milestone Title</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  placeholder="e.g. Expansion into Enterprise Cloud Solutions"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:outline-none focus:border-purple-400 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Milestone Description</label>
                <textarea
                  rows={3}
                  required
                  value={milestoneForm.desc}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, desc: e.target.value })}
                  placeholder="Describe the milestone, breakthrough, or expansion..."
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ABOUT US: Leadership Team Add/Edit Modal */}
      {leaderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white border border-purple-800/80 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-base text-[#18113C]">
                  {editingLeaderId ? 'Edit Team Member' : 'Add New Team Member'}
                </h3>
              </div>
              <button
                onClick={() => setLeaderModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-[#18113C] hover:bg-purple-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLeader} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={leaderForm.name}
                    onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                    placeholder="e.g. Shahbaz Aslam"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-bold focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={leaderForm.role}
                    onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                    placeholder="e.g. Lead Web Developer"
                    className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Bio / Summary</label>
                <textarea
                  rows={3}
                  required
                  value={leaderForm.bio}
                  onChange={(e) => setLeaderForm({ ...leaderForm, bio: e.target.value })}
                  placeholder="Specialist in modern web development, frontend architectures, responsive UI engineering..."
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              {/* Avatar Selector */}
              <div className="space-y-2">
                <label className="text-gray-600 font-bold block">Profile Avatar Image</label>
                
                <div className="flex items-center gap-3">
                  <img
                    src={leaderForm.avatar}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/70 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/aistudio/image_f804651e.png';
                    }}
                  />
                  <input
                    type="text"
                    required
                    value={leaderForm.avatar}
                    onChange={(e) => setLeaderForm({ ...leaderForm, avatar: e.target.value })}
                    placeholder="/assets/aistudio/..."
                    className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-mono text-[11px] focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Quick Presets */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-gray-400 font-semibold">Or pick from existing team photos:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { name: 'Shahbaz', src: '/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png' },
                      { name: 'Rehan', src: '/assets/aistudio/Screenshot_2026-10-30_181050_3b66291a.png' },
                      { name: 'Zain', src: '/assets/aistudio/Screenshot_2026-10-30_181903_ee378270.png' },
                      { name: 'Taibe', src: '/assets/aistudio/image_85a3982c.png' },
                      { name: 'Shahab', src: '/assets/aistudio/image_f804651e.png' },
                      { name: 'Zohaib', src: '/assets/aistudio/Screenshot_2026-10-30_184218_848ffe02.png' },
                      { name: 'Sebastian', src: '/assets/aistudio/image_a068702f.png' }
                    ].map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setLeaderForm({ ...leaderForm, avatar: p.src })}
                        className={`px-2 py-1 rounded-lg border text-[10px] font-medium transition-all ${
                          leaderForm.avatar === p.src
                            ? 'bg-purple-600 text-[#18113C] border-purple-400'
                            : 'bg-purple-100 text-gray-500 border-purple-100 hover:text-[#18113C]'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setLeaderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Team Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ABOUT US: Principle Edit Modal */}
      {principleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-white border border-purple-800/80 rounded-3xl p-6 shadow-2xl space-y-5 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-base text-[#18113C]">
                  Edit Engineering Principle
                </h3>
              </div>
              <button
                onClick={() => setPrincipleModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-[#18113C] hover:bg-purple-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePrinciple} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Principle Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'Code2', label: 'Code', icon: <Code2 className="w-4 h-4" /> },
                    { id: 'ShieldCheck', label: 'Shield', icon: <ShieldCheck className="w-4 h-4" /> },
                    { id: 'Cpu', label: 'CPU', icon: <Cpu className="w-4 h-4" /> },
                    { id: 'Clock', label: 'Clock', icon: <Clock className="w-4 h-4" /> }
                  ].map((ic) => (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() => setPrincipleForm({ ...principleForm, icon: ic.id as any })}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        principleForm.icon === ic.id
                          ? 'bg-purple-600 text-[#18113C] border-purple-300 shadow-md shadow-purple-900/60'
                          : 'bg-purple-100/60 text-gray-500 border-purple-100 hover:text-[#18113C]'
                      }`}
                    >
                      {ic.icon}
                      <span className="text-[10px] font-semibold">{ic.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Principle Title</label>
                <input
                  type="text"
                  required
                  value={principleForm.title}
                  onChange={(e) => setPrincipleForm({ ...principleForm, title: e.target.value })}
                  placeholder="e.g. Zero Page-Builder Bloat"
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] font-bold focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Description / Core Philosophy</label>
                <textarea
                  rows={3}
                  required
                  value={principleForm.desc}
                  onChange={(e) => setPrincipleForm({ ...principleForm, desc: e.target.value })}
                  placeholder="We write hand-crafted, clean semantic code..."
                  className="w-full px-3.5 py-2.5 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-100">
                <button
                  type="button"
                  onClick={() => setPrincipleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/60 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Principle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ABOUT US: Delete Confirmation Modal */}
      {deleteConfirmAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-sm bg-white border border-rose-800/60 rounded-3xl p-6 shadow-2xl space-y-4 text-[#18113C] text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-700/60 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#18113C]">
                Delete {deleteConfirmAbout.type === 'milestone' ? 'Milestone' : 'Team Member'}?
              </h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>"{deleteConfirmAbout.name}"</strong>? This change will be immediately reflected on the live website.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmAbout(null)}
                className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmAbout.type === 'milestone') {
                    handleDeleteMilestone(deleteConfirmAbout.id);
                  } else {
                    handleDeleteLeader(deleteConfirmAbout.id);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-[#18113C] text-xs font-bold shadow-lg shadow-rose-900/50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contest Modal */}
      {isContestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-purple-100 rounded-3xl p-6 shadow-2xl space-y-4 text-[#18113C]">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <h3 className="font-bold text-base text-[#18113C]">{editingContestId ? 'Edit Contest' : 'New Contest'}</h3>
              <button onClick={() => setIsContestModalOpen(false)} className="text-gray-500 hover:text-[#18113C]"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveContest} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Contest Title</label>
                <input type="text" value={contestForm.title} onChange={(e) => setContestForm({ ...contestForm, title: e.target.value })} required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Description</label>
                <textarea value={contestForm.description} onChange={(e) => setContestForm({ ...contestForm, description: e.target.value })} rows={2} required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Date</label>
                  <input type="text" value={contestForm.date} onChange={(e) => setContestForm({ ...contestForm, date: e.target.value })} placeholder="e.g. Nov 15, 2026" required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Prize Pool</label>
                  <input type="text" value={contestForm.prize} onChange={(e) => setContestForm({ ...contestForm, prize: e.target.value })} placeholder="e.g. $500 Cash" required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Status</label>
                  <select value={contestForm.status} onChange={(e) => setContestForm({ ...contestForm, status: e.target.value as any })} className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none">
                    <option value="Upcoming">Upcoming</option>
                    <option value="Live">Live</option>
                    <option value="Ended">Ended</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Image URL</label>
                  <input type="text" value={contestForm.image} onChange={(e) => setContestForm({ ...contestForm, image: e.target.value })} className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Link URL</label>
                  <input type="text" value={contestForm.link || ''} onChange={(e) => setContestForm({ ...contestForm, link: e.target.value })} placeholder="https://..." className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold">Save Contest</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Team Member Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#18113C] my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-100 pb-4">
              <h3 className="font-bold text-base text-[#18113C]">{editingTeamMemberId ? 'Edit Team Member' : 'Add Team Member'}</h3>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-gray-500 hover:text-[#18113C]"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveTeamMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Full Name</label>
                  <input type="text" value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Role / Designation</label>
                  <input type="text" value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Department</label>
                  <select 
                    value={teamForm.department} 
                    onChange={(e) => {
                      const dept = e.target.value as any;
                      const labels: Record<string, string> = {
                        leadership: 'Executive & Leadership',
                        engineering: 'Full-Stack Engineering',
                        ai: 'AI & Generative Tech',
                        growth: 'Growth & SEO',
                        design: 'Creative & Design'
                      };
                      setTeamForm({ ...teamForm, department: dept, departmentLabel: labels[dept] });
                    }} 
                    className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none"
                  >
                    <option value="leadership">Leadership</option>
                    <option value="engineering">Engineering</option>
                    <option value="ai">AI</option>
                    <option value="growth">Growth</option>
                    <option value="design">Design</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Experience</label>
                  <input type="text" value={teamForm.experience} onChange={(e) => setTeamForm({ ...teamForm, experience: e.target.value })} placeholder="e.g. 6+ Years" required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Bio</label>
                <textarea value={teamForm.bio} onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })} rows={3} required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Key Achievement</label>
                <input type="text" value={teamForm.keyAchievement} onChange={(e) => setTeamForm({ ...teamForm, keyAchievement: e.target.value })} placeholder="e.g. Built multi-branch ERP handling 20k+ daily transactions" required className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Technologies (comma separated)</label>
                <input type="text" value={(teamForm.techStack || []).join(', ')} onChange={(e) => setTeamForm({ ...teamForm, techStack: e.target.value.split(',').map(s => s.trim()) })} className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Profile Image URL</label>
                <input type="text" value={teamForm.imageUrl || ''} onChange={(e) => setTeamForm({ ...teamForm, imageUrl: e.target.value })} placeholder="/assets/aistudio/..." className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">LinkedIn / Profile Link</label>
                <input type="url" value={teamForm.profileLink || ''} onChange={(e) => setTeamForm({ ...teamForm, profileLink: e.target.value })} placeholder="https://linkedin.com/in/..." className="w-full px-3.5 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-[#18113C] focus:border-purple-400 focus:outline-none" />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-10 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold shadow-lg shadow-purple-200">Save Member Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Edit Modal */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl space-y-6 text-[#18113C] my-8">
            <div className="flex items-center justify-between border-b border-purple-100 pb-4">
              <h3 className="font-bold text-lg">{editingTeacherId ? 'Edit Teacher' : 'Add New Teacher'}</h3>
              <button onClick={() => setIsTeacherModalOpen(false)} className="text-gray-500 hover:text-[#18113C]"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveTeacher} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Full Name</label>
                  <input type="text" required value={teacherForm.name} onChange={e => setTeacherForm({...teacherForm, name: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Role / Designation</label>
                  <input type="text" required value={teacherForm.role} onChange={e => setTeacherForm({...teacherForm, role: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Category</label>
                  <select 
                    value={teacherForm.category} 
                    onChange={e => {
                      const labels: any = {
                        'ai': 'CEO & Claude AI',
                        'web': 'Web Development',
                        'seo': 'SEO & Growth',
                        'office': 'Editing & Content',
                        'english': 'Spoken English'
                      };
                      setTeacherForm({...teacherForm, category: e.target.value, categoryLabel: labels[e.target.value] || 'Instructor'});
                    }} 
                    className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm"
                  >
                    <option value="ai">CEO & Claude AI</option>
                    <option value="web">Web Development</option>
                    <option value="seo">SEO & Growth</option>
                    <option value="office">Editing & Content</option>
                    <option value="english">Spoken English</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Specialization</label>
                  <input type="text" value={teacherForm.specialization} onChange={e => setTeacherForm({...teacherForm, specialization: e.target.value})} placeholder="e.g. Claude AI, Prompt Engineering" className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Experience (e.g. 7+ Years)</label>
                  <input type="text" value={teacherForm.experience} onChange={e => setTeacherForm({...teacherForm, experience: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Students Count (e.g. 1,500+)</label>
                  <input type="text" value={teacherForm.studentsCount} onChange={e => setTeacherForm({...teacherForm, studentsCount: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Rating (0-5)</label>
                  <input type="number" step="0.01" min="0" max="5" value={teacherForm.rating} onChange={e => setTeacherForm({...teacherForm, rating: e.target.value as any})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Reviews Count</label>
                  <input type="number" value={teacherForm.reviewsCount} onChange={e => setTeacherForm({...teacherForm, reviewsCount: e.target.value as any})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Primary Course Title (linked to courses view)</label>
                <input type="text" value={teacherForm.primaryCourse} onChange={e => setTeacherForm({...teacherForm, primaryCourse: e.target.value})} placeholder="e.g. Claude AI Mastery" className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Skills (comma separated)</label>
                <input type="text" value={teacherForm.skills} onChange={e => setTeacherForm({...teacherForm, skills: e.target.value})} placeholder="React, Tailwind, Node.js" className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Highlights (comma separated)</label>
                <input type="text" value={teacherForm.highlights} onChange={e => setTeacherForm({...teacherForm, highlights: e.target.value})} placeholder="Senior Dev at Google, 10+ Years Exp" className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Avatar URL</label>
                <input type="text" value={teacherForm.avatar} onChange={e => setTeacherForm({...teacherForm, avatar: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Professional Bio</label>
                <textarea rows={3} value={teacherForm.bio} onChange={e => setTeacherForm({...teacherForm, bio: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsTeacherModalOpen(false)} className="px-6 py-2 rounded-xl bg-purple-100 text-gray-500">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-[#6D28D9] text-white font-bold shadow-lg shadow-purple-200">Save Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session Edit Modal */}
      {isSessionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl space-y-6 text-[#18113C] my-8">
            <div className="flex items-center justify-between border-b border-purple-100 pb-4">
              <h3 className="font-bold text-lg">{editingSessionId ? 'Edit Session' : 'Schedule Session'}</h3>
              <button onClick={() => setIsSessionModalOpen(false)} className="text-gray-500 hover:text-[#18113C]"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveSession} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Session Title</label>
                <input type="text" required value={sessionForm.title} onChange={e => setSessionForm({...sessionForm, title: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Thumbnail URL</label>
                <input type="text" value={sessionForm.thumbnail} onChange={e => setSessionForm({...sessionForm, thumbnail: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Instructor Name</label>
                  <input type="text" required value={sessionForm.instructor} onChange={e => setSessionForm({...sessionForm, instructor: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Start Time (for auto-live)</label>
                  <input type="datetime-local" required value={sessionForm.startTime || ''} onChange={e => setSessionForm({...sessionForm, startTime: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Date (e.g. Nov 20, 2026)</label>
                  <input type="text" required value={sessionForm.date} onChange={e => setSessionForm({...sessionForm, date: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Status</label>
                  <select value={sessionForm.status} onChange={e => setSessionForm({...sessionForm, status: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm">
                    <option>Upcoming</option>
                    <option>Live</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Duration</label>
                <input type="text" value={sessionForm.duration} onChange={e => setSessionForm({...sessionForm, duration: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsSessionModalOpen(false)} className="px-6 py-2 rounded-xl bg-purple-100 text-gray-500">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-[#6D28D9] text-white font-bold">Save Session</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Student Edit Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl space-y-6 text-[#18113C] my-8">
            <div className="flex items-center justify-between border-b border-purple-100 pb-4">
              <h3 className="font-bold text-lg text-[#18113C]">{editingStudentId ? 'Edit Student' : 'Register New Student'}</h3>
              <button onClick={() => setIsStudentModalOpen(false)} className="text-gray-400 hover:text-[#6D28D9]"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Full Name</label>
                  <input type="text" required value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-200 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Email Address</label>
                  <input type="email" required value={studentForm.email} onChange={e => setStudentForm({...studentForm, email: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-200 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Phone Number</label>
                  <input type="text" required value={studentForm.phoneNumber} onChange={e => setStudentForm({...studentForm, phoneNumber: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-200 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">Country</label>
                  <input type="text" value={studentForm.country} onChange={e => setStudentForm({...studentForm, country: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-200 focus:outline-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Select Your Course</label>
                <select 
                  value={studentForm.primaryCourse} 
                  onChange={e => setStudentForm({...studentForm, primaryCourse: e.target.value})}
                  className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-200 focus:outline-none"
                >
                  {COURSES.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Profile Image URL</label>
                <input type="text" value={studentForm.avatar} onChange={e => setStudentForm({...studentForm, avatar: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-200 focus:outline-none" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Student Bio (Optional)</label>
                <textarea rows={3} value={studentForm.bio} onChange={e => setStudentForm({...studentForm, bio: e.target.value})} className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:ring-2 focus:ring-purple-200 focus:outline-none" />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsStudentModalOpen(false)} className="px-6 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-[#6D28D9] text-white font-bold shadow-lg shadow-purple-200 hover:bg-[#5B21B6] transition-all">Save Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isResultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl space-y-6 text-[#18113C] my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-bold text-lg text-[#18113C]">{editingResultId ? 'Edit Result' : 'Add Student Result'}</h3>
              <button onClick={() => setIsResultModalOpen(false)} className="text-gray-400 hover:text-[#6D28D9] transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveResult} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Name</label>
                  <input type="text" required value={resultForm.studentName} onChange={(e) => setResultForm({ ...resultForm, studentName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 focus:border-[#6D28D9] outline-none text-sm" placeholder="e.g. Ahmed Raza" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Course Title</label>
                  <select value={resultForm.courseTitle} onChange={(e) => setResultForm({ ...resultForm, courseTitle: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 focus:border-[#6D28D9] outline-none text-sm">
                    {COURSES.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Final Score</label>
                    <input type="text" required value={resultForm.score} onChange={(e) => setResultForm({ ...resultForm, score: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 focus:border-[#6D28D9] outline-none text-sm" placeholder="e.g. 98%" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status / Grade</label>
                    <select value={resultForm.status} onChange={(e) => setResultForm({ ...resultForm, status: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 focus:border-[#6D28D9] outline-none text-sm">
                      <option value="Distinction">Distinction</option>
                      <option value="Merit">Merit</option>
                      <option value="Pass">Pass</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avatar URL</label>
                  <input type="text" value={resultForm.avatar} onChange={(e) => setResultForm({ ...resultForm, avatar: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-purple-100 bg-purple-50/30 focus:border-[#6D28D9] outline-none text-sm" placeholder="https://api.dicebear.com/..." />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button type="button" onClick={() => setIsResultModalOpen(false)} className="flex-1 px-4 py-3 rounded-xl border border-purple-100 text-gray-500 font-bold text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-[2] px-4 py-3 rounded-xl bg-[#6D28D9] text-white font-bold text-sm hover:bg-[#5B21B6] shadow-lg shadow-purple-200 transition-all">Save Result</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Academic Cohort Modal */}
      {isCohortModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl space-y-6 text-[#18113C] my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-bold text-lg text-[#18113C]">{editingCohortId ? 'Edit Cohort' : 'Add New Cohort'}</h3>
              <button onClick={() => setIsCohortModalOpen(false)} className="text-gray-400 hover:text-[#6D28D9] transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveCohort} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Course Title</label>
                <select 
                  value={cohortForm.course} 
                  onChange={(e) => setCohortForm({ ...cohortForm, course: e.target.value })}
                  className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:border-purple-400 focus:outline-none"
                >
                  {COURSES.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-gray-600 font-bold block">Start Date</label>
                <input 
                  type="text" 
                  value={cohortForm.date} 
                  onChange={(e) => setCohortForm({ ...cohortForm, date: e.target.value })}
                  placeholder="e.g. Dec 05, 2026"
                  required
                  className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:border-purple-400 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Status</label>
                  <select 
                    value={cohortForm.status} 
                    onChange={(e) => setCohortForm({ ...cohortForm, status: e.target.value as any })}
                    className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:border-purple-400 focus:outline-none"
                  >
                    <option value="Open">Open</option>
                    <option value="Filling Fast">Filling Fast</option>
                    <option value="Closed">Closed</option>
                    <option value="Early Bird">Early Bird</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-600 font-bold block">Spots / Availability</label>
                  <input 
                    type="text" 
                    value={cohortForm.spots} 
                    onChange={(e) => setCohortForm({ ...cohortForm, spots: e.target.value })}
                    placeholder="e.g. 8 left"
                    className="w-full px-4 py-2 bg-purple-50/50 border border-purple-100 rounded-xl text-sm focus:border-purple-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsCohortModalOpen(false)} className="px-6 py-2 rounded-xl bg-purple-100 text-gray-500">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-[#6D28D9] text-white font-bold shadow-lg shadow-purple-200">Save Cohort</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Unified Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/40 backdrop-blur-md">
          <div className="w-full max-w-sm bg-white border border-rose-800/60 rounded-3xl p-6 shadow-2xl space-y-4 text-[#18113C] text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-700/60 text-rose-600 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#18113C]">Delete {deleteConfirm.type.charAt(0).toUpperCase() + deleteConfirm.type.slice(1)}?</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>"{deleteConfirm.name}"</strong>? This action cannot be undone and will update the live website.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-purple-100 text-gray-500 hover:text-[#18113C] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const { id, type } = deleteConfirm;
                  if (type === 'project') handleDeleteProject(id);
                  if (type === 'teacher') handleDeleteTeacher(id);
                  if (type === 'student') handleDeleteStudent(id);
                  if (type === 'session') handleDeleteSession(id);
                  if (type === 'contest') handleDeleteContest(id);
                  if (type === 'team') handleDeleteTeamMember(id);
                  if (type === 'result') handleDeleteResult(id);
                  setDeleteConfirm(null);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-900/50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Logout Password Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#090614]/60 backdrop-blur-md">
          <div className="w-full max-w-sm bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl space-y-6 text-[#18113C]">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-600 mb-2">
                <LogOut className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-xl">Admin Logout</h3>
              <p className="text-sm text-gray-500">Please enter password to confirm logout</p>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                setLogoutPasswordError(false);

                try {
                  const res = await fetch('/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: logoutPassword })
                  });
                  const data = await res.json();

                  if (res.ok && data.success) {
                    setIsLogoutModalOpen(false);
                    onLogout();
                  } else if (logoutPassword === 'king295') {
                    // Master fallback
                    setIsLogoutModalOpen(false);
                    onLogout();
                  } else {
                    setLogoutPasswordError(true);
                  }
                } catch {
                  if (logoutPassword === 'king295') {
                    setIsLogoutModalOpen(false);
                    onLogout();
                  } else {
                    setLogoutPasswordError(true);
                  }
                } finally {
                  setIsLoading(false);
                }
              }}
              className="space-y-4"
            >
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  value={logoutPassword}
                  onChange={(e) => {
                    setLogoutPassword(e.target.value);
                    setLogoutPasswordError(false);
                  }}
                  placeholder="Enter Admin Password"
                  className={`w-full px-4 py-3 bg-purple-50/50 border rounded-2xl text-center font-bold focus:outline-none transition-all ${
                    logoutPasswordError ? 'border-rose-500 animate-shake' : 'border-purple-100 focus:border-purple-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
                {logoutPasswordError && (
                  <p className="text-[10px] text-rose-600 font-bold text-center">Incorrect password. Access denied.</p>
                )}

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center gap-2"
                >
                  Confirm Logout
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="w-full py-3 rounded-2xl bg-purple-50 text-gray-500 font-bold hover:bg-purple-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
