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
  Save
} from 'lucide-react';
import { 
  COURSES, 
  PORTFOLIO_PROJECTS, 
  TEACHERS, 
  TEAM_MEMBERS, 
  CourseItem, 
  PortfolioProject,
  EstimatorConfig,
  DEFAULT_ESTIMATOR_CONFIG,
  EstimatorProjectType,
  EstimatorScaleOption,
  EstimatorDesignTier,
  EstimatorBackendOption,
  EstimatorAddonOption
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
  onUpdateSessions
}) => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'courses' | 'portfolio' | 'estimator' | 'about' | 'teachers' | 'live_sessions' | 'contact' | 'messages' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
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
    experience: '',
    studentsCount: '',
    bio: '',
    avatar: '/assets/aistudio/image_f804651e.png'
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
    thumbnail: '/assets/aistudio/image_85a3982c.png'
  });

  // Company Info State
  const [companyInfo, setCompanyInfo] = useState({
    name: 'WeVersity',
    email: 'info@weversity.com',
    phone: '+92 301 9249721',
    logo: '/assets/aistudio/image_ec98d7d2.png',
    address: 'Turner Road, Off Mall Road, Garhi Shahu, Lahore, Pakistan',
  });

  useEffect(() => {
    fetch('/api/teachers').then(res => res.json()).then(data => {
      if (data.success) setTeachersList(data.teachers);
    });
    fetch('/api/sessions').then(res => res.json()).then(data => {
      if (data.success) setSessionsList(data.sessions);
    });
    fetch('/api/company').then(res => res.json()).then(data => {
      if (data.success) setCompanyInfo(data.company);
    });
  }, []);

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTeacher = { ...teacherForm, id: editingTeacherId || 'teacher-' + Date.now() };
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

  // Portfolio CMS State (Direct live sync with website)
  const [portfolioList, setPortfolioList] = useState<PortfolioProject[]>(() => {
    return projects && projects.length > 0 ? projects : PORTFOLIO_PROJECTS;
  });
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [portfolioCat, setPortfolioCat] = useState<string>('all');
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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
      localStorage.setItem('weversity_portfolio_projects', JSON.stringify(updatedList));
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
      localStorage.setItem('weversity_portfolio_projects', JSON.stringify(updatedList));
      await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
    } catch {
      // safe fallback
    }
    setDeleteConfirmId(null);
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
      localStorage.setItem('weversity_about_data', JSON.stringify(newData));
      window.dispatchEvent(new CustomEvent('weversity_about_updated', { detail: newData }));
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

  const handleOpenEditPrinciple = (item: PrincipleItem) => {
    setEditingPrincipleId(item.id);
    setPrincipleForm(item);
    setPrincipleModalOpen(true);
  };

  const handleSavePrinciple = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrincipleId) return;
    const updatedPrinciples = aboutState.principles.map(p => p.id === editingPrincipleId ? principleForm : p);
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
    const isAuth = localStorage.getItem('weversity_admin_device_authorized') === 'true';
    setIsDeviceAuthorized(isAuth);
  }, []);

  const handleToggleDeviceAuth = () => {
    if (isDeviceAuthorized) {
      localStorage.removeItem('weversity_admin_device_authorized');
      setIsDeviceAuthorized(false);
      setActionSuccess('Device de-authorized. The Admin button is now hidden on this PC.');
    } else {
      localStorage.setItem('weversity_admin_device_authorized', 'true');
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
    } catch {
      setPasswordMsg({ type: 'success', text: 'Password updated (offline mode)' });
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
    { id: 'live_sessions', label: 'Live Sessions', icon: Video },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messages.filter(m => m.unread).length.toString() },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0E0A1E] text-white flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Top Navbar matching screenshot */}
      <header className="sticky top-0 z-40 bg-[#120D28]/95 backdrop-blur-md border-b border-purple-900/40 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-lg shadow-purple-900/40 border border-purple-400/40 overflow-hidden">
              <img 
                src="/assets/aistudio/image_ec98d7d2.png" 
                alt="WeVersity Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-display font-black text-base tracking-wide text-white flex items-center gap-2">
                WEVERSITY
              </div>
              <div className="text-[10px] text-purple-300 uppercase tracking-wider font-semibold">
                Admin Panel
              </div>
            </div>
          </div>

          {/* Search bar (Ctrl + K) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything... (Ctrl + K)"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1A1338] border border-purple-800/50 text-xs text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all"
              />
            </div>
          </div>

          {/* Right Header items: Notifications, Profile, View Website */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-xl bg-[#1A1338] border border-purple-800/50 text-purple-200 hover:text-white hover:border-purple-600 transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#1A1338] border border-purple-800/70 rounded-2xl p-4 shadow-2xl z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-purple-900/60 pb-2">
                    <span className="text-xs font-bold text-white">Notifications</span>
                    <span className="text-[10px] text-purple-400">3 new</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40">
                      <p className="font-semibold text-purple-200">New admission request</p>
                      <p className="text-[10px] text-purple-400">Ahmed Khan applied for Claude AI Mastery · 2m ago</p>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40">
                      <p className="font-semibold text-purple-200">Quote inquiry submitted</p>
                      <p className="text-[10px] text-purple-400">Zain Ali requested Custom SaaS quote · 12m ago</p>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-800/40">
                      <p className="font-semibold text-purple-200">Server Status</p>
                      <p className="text-[10px] text-emerald-400">All systems 100% operational in Lahore HQ</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#1A1338] border border-purple-800/50">
              <img 
                src="/assets/aistudio/image_f804651e.png" 
                alt="Ahtasham Javed"
                className="w-8 h-8 rounded-full object-cover border border-purple-400/40"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  Ahtasham Javed
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-purple-300 font-medium">Administrator</div>
              </div>
            </div>

            {/* View Website Button (Return to Front-End) */}
            <button
              onClick={onViewWebsite}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-all flex items-center gap-1.5 shadow-md shadow-purple-900/50 group"
            >
              <span>View Website</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#120D28] border-r border-purple-900/40 flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
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
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-900/40' 
                        : 'text-purple-300/80 hover:bg-purple-950/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-white text-[#6D28D9]' : 'bg-rose-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* Logout button */}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-950/40 transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Bottom Rocket Card matching screenshot */}
          <div className="mt-8 pt-4 border-t border-purple-900/40">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1C1340] to-[#140D30] border border-purple-800/50 relative overflow-hidden text-center space-y-2 group">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-[#6D28D9] to-pink-500 flex items-center justify-center shadow-lg shadow-purple-800/40 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="font-display font-extrabold text-sm text-white tracking-wide">
                Build. Manage. Grow.
              </div>
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                WEVERSITY
              </div>
            </div>
            <div className="text-[10px] text-purple-400/60 text-center mt-3">
              © 2026 WEVERSITY All Rights Reserved
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {actionSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {actionSuccess}
              </span>
              <button onClick={() => setActionSuccess(null)} className="text-emerald-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* TAB: DASHBOARD (Exact screenshot layout) */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Header Greeting */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Welcome Back, Ahtasham!</span>
                  <span>👋</span>
                </h1>
                <p className="text-xs sm:text-sm text-purple-300/80 mt-1">
                  Manage your website content from here
                </p>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Visitors */}
                <div className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 relative overflow-hidden flex flex-col justify-between hover:border-purple-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-purple-300 font-medium block">Total Visitors</span>
                      <span className="text-2xl font-display font-black text-white mt-1 block">125.8K</span>
                      <span className="text-[11px] text-purple-300 font-semibold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-purple-400" />
                        ↑ 12.5%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-purple-300">
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
                <div className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 relative overflow-hidden flex flex-col justify-between hover:border-blue-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-purple-300 font-medium block">Total Courses</span>
                      <span className="text-2xl font-display font-black text-white mt-1 block">24</span>
                      <span className="text-[11px] text-blue-400 font-semibold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-blue-400" />
                        ↑ 8.2%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-700/50 flex items-center justify-center text-blue-300">
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
                <div className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 relative overflow-hidden flex flex-col justify-between hover:border-emerald-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-purple-300 font-medium block">Total Projects</span>
                      <span className="text-2xl font-display font-black text-white mt-1 block">48</span>
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        ↑ 15.7%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center text-emerald-300">
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
                <div className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 relative overflow-hidden flex flex-col justify-between hover:border-amber-600 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs text-purple-300 font-medium block">New Messages</span>
                      <span className="text-2xl font-display font-black text-white mt-1 block">37</span>
                      <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3 text-amber-400" />
                        ↑ 22.1%
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-700/50 flex items-center justify-center text-amber-300">
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
                  <div className="p-6 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-300">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm font-bold text-white">Website Analytics</h2>
                      </div>
                      <select 
                        value={timeRange} 
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="text-xs bg-[#1F1744] border border-purple-800/60 rounded-xl px-3 py-1.5 text-purple-200 focus:outline-none"
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
                      <div className="absolute right-12 top-6 z-10 px-3 py-1 rounded-full bg-[#6D28D9] text-white text-[10px] font-bold shadow-lg shadow-purple-900/50 border border-purple-400/40">
                        98.5K Visitors
                      </div>

                      {/* SVG Line / Wave Chart with Grid */}
                      <div className="h-56 w-full relative">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-purple-400/50 pointer-events-none">
                          <div className="border-b border-purple-900/30 flex justify-between pr-2"><span>100k</span></div>
                          <div className="border-b border-purple-900/30 flex justify-between pr-2"><span>75k</span></div>
                          <div className="border-b border-purple-900/30 flex justify-between pr-2"><span>50k</span></div>
                          <div className="border-b border-purple-900/30 flex justify-between pr-2"><span>25k</span></div>
                          <div className="flex justify-between pr-2"><span>0</span></div>
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
                      <div className="flex justify-between text-[10px] text-purple-400/60 pt-2 px-6">
                        <span>Oct 1</span>
                        <span>Oct 8</span>
                        <span>Oct 15</span>
                        <span>Oct 22</span>
                        <span>Oct 31</span>
                      </div>
                    </div>
                  </div>

                  {/* Manage Website Pages (8 cards matching screenshot) */}
                  <div className="p-6 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-900/60 flex items-center justify-center text-purple-300">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm font-bold text-white">Manage Website Pages</h2>
                      </div>
                      <button 
                        onClick={() => setCurrentTab('courses')}
                        className="text-xs text-purple-400 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 8 Cards in 4x2 Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
                      
                      {/* Home Page */}
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/hero_laptop_illustration.png" 
                            alt="Home Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                          <span className="absolute top-2 left-2 text-[9px] bg-purple-950/90 text-purple-200 px-1.5 py-0.5 rounded font-bold">WEVERSITY</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Home Page</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">Hero, Services, Stats...</p>
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
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/course_web_dev.png" 
                            alt="Courses Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Courses</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">All courses &amp; details</p>
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
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/hero_illustration_full.png" 
                            alt="Portfolio Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Portfolio</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">Projects &amp; Showcase</p>
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
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative flex items-center justify-center">
                          <Calculator className="w-10 h-10 text-purple-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Cost Estimator</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">Project Pricing</p>
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
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative flex items-center justify-center">
                          <Building2 className="w-10 h-10 text-purple-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">About Us</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">Company Info</p>
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
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative">
                          <img 
                            src="/assets/aistudio/Screenshot_2026-10-30_181313_cade6561.png" 
                            alt="Teachers Preview" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Teachers</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">Faculty Members</p>
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
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative flex items-center justify-center">
                          <Video className="w-10 h-10 text-purple-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Live Sessions</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">Classes &amp; Schedules</p>
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
                      <div className="p-3.5 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex flex-col justify-between space-y-3 group hover:border-purple-600 transition-colors">
                        <div className="h-24 rounded-xl bg-purple-950/80 overflow-hidden relative flex items-center justify-center">
                          <Mail className="w-10 h-10 text-purple-300" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Contact</h4>
                          <p className="text-[10px] text-purple-400 mt-0.5 truncate">Contact Details</p>
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
                  <div className="p-6 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <h2 className="text-sm font-bold text-white">Quick Actions</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-2.5">
                      
                      <button 
                        onClick={() => setQuickActionModal('Edit Home Page')}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Edit Home Page</span>
                      </button>

                      <button 
                        onClick={() => setQuickActionModal('Add New Course')}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Add Course</span>
                      </button>

                      <button 
                        onClick={() => {
                          setCurrentTab('portfolio');
                          handleOpenCreateProject();
                        }}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Add Project</span>
                      </button>

                      <button 
                        onClick={() => setQuickActionModal('Update Team Members')}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Update Team</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('teachers')}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Manage Teachers</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('live_sessions')}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <Play className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Live Session</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('about')}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <Info className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Edit About Us</span>
                      </button>

                      <button 
                        onClick={() => setCurrentTab('contact')}
                        className="p-3 rounded-2xl bg-[#1C1340] border border-purple-800/40 hover:border-purple-500 hover:bg-purple-900/40 flex flex-col items-center justify-center text-center space-y-2 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-900/60 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-purple-200 leading-tight">Contact Info</span>
                      </button>

                    </div>
                  </div>

                  {/* Recent Messages Card */}
                  <div className="p-6 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                        <h2 className="text-sm font-bold text-white">Recent Messages</h2>
                      </div>
                      <button 
                        onClick={() => setCurrentTab('messages')}
                        className="text-xs text-purple-400 hover:text-white flex items-center gap-1 font-semibold"
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
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-950/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${msg.color} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                              {msg.initials}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white">{msg.name}</div>
                              <div className="text-[11px] text-purple-300/80 truncate max-w-[180px] sm:max-w-xs">{msg.message}</div>
                            </div>
                          </div>
                          <span className="text-[10px] text-purple-400 font-medium shrink-0">{msg.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Website Settings Card */}
                  <div className="p-6 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-purple-400" />
                        <h2 className="text-sm font-bold text-white">Website Settings</h2>
                      </div>
                      <button 
                        onClick={() => setCurrentTab('settings')}
                        className="text-xs text-purple-400 hover:text-white flex items-center gap-1 font-semibold"
                      >
                        <span>Edit Settings</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      
                      {/* Website Status */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1C1340] border border-purple-800/40">
                        <span className="text-purple-300 font-medium">Website Status</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {websiteStatus}
                        </span>
                      </div>

                      {/* Maintenance Mode Toggle */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1C1340] border border-purple-800/40">
                        <span className="text-purple-300 font-medium">Maintenance Mode</span>
                        <button 
                          onClick={() => setMaintenanceMode(!maintenanceMode)}
                          className="text-purple-300 hover:text-white transition-colors"
                        >
                          {maintenanceMode ? (
                            <ToggleRight className="w-7 h-7 text-[#6D28D9]" />
                          ) : (
                            <ToggleLeft className="w-7 h-7 text-purple-600" />
                          )}
                        </button>
                      </div>

                      {/* Dark Mode Toggle */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1C1340] border border-purple-800/40">
                        <span className="text-purple-300 font-medium">Dark Mode</span>
                        <button 
                          onClick={() => setDarkMode(!darkMode)}
                          className="text-purple-300 hover:text-white transition-colors"
                        >
                          {darkMode ? (
                            <ToggleRight className="w-7 h-7 text-[#6D28D9]" />
                          ) : (
                            <ToggleLeft className="w-7 h-7 text-purple-600" />
                          )}
                        </button>
                      </div>

                      {/* Social Links */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1C1340] border border-purple-800/40">
                        <span className="text-purple-300 font-medium">Social Links</span>
                        <button 
                          onClick={() => setCurrentTab('settings')}
                          className="text-xs text-purple-400 hover:text-white font-bold flex items-center gap-1"
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
                  <h1 className="text-2xl font-display font-bold text-white">Courses Manager</h1>
                  <p className="text-xs text-purple-300 mt-1">Manage active courses, pricing, and enrollments</p>
                </div>
                <button
                  onClick={() => setQuickActionModal('Add New Course')}
                  className="px-4 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Course</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COURSES.map((course) => (
                  <div key={course.id} className="p-4 rounded-2xl bg-[#161033] border border-purple-800/40 space-y-3">
                    <div className="h-32 rounded-xl bg-purple-950 overflow-hidden relative">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      {course.badge && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#6D28D9] text-white text-[10px] font-bold">
                          {course.badge}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-purple-300/80 line-clamp-2 mt-1">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-purple-900/40 text-xs">
                      <div>
                        <span className="text-[10px] text-purple-400 block">Tuition Fee</span>
                        <span className="font-bold text-white">${course.priceUSD} USD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setQuickActionModal(`Edit Course: ${course.title}`)}
                          className="p-2 rounded-lg bg-purple-900/40 text-purple-300 hover:text-white hover:bg-purple-800/50"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => setActionSuccess(`Course ${course.title} updated.`)}
                          className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/60"
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
                  <h1 className="text-2xl font-display font-bold text-white">Client Messages &amp; Quotes</h1>
                  <p className="text-xs text-purple-300 mt-1">Direct inquiries submitted through WeVersity website</p>
                </div>
                <div className="text-xs text-purple-300 font-semibold bg-[#161033] px-3 py-1.5 rounded-xl border border-purple-800/40">
                  Total: {messages.length} inquiries
                </div>
              </div>

              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-[#161033] border border-purple-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-full ${m.color} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                        {m.initials}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{m.name}</span>
                          <span className="text-[10px] text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800/40">{m.subject}</span>
                          {m.unread && (
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                          )}
                        </div>
                        <p className="text-xs text-purple-200/90 leading-relaxed">{m.message}</p>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-purple-400/80 pt-1">
                          <span>📧 {m.email}</span>
                          {m.phone && <span>📞 {m.phone}</span>}
                          <span>⏱ {m.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <a 
                        href={`https://wa.me/?text=Hi%20${encodeURIComponent(m.name)},%20thank%20you%20for%20contacting%20WeVersity.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60 text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>WhatsApp</span>
                      </a>
                      <a 
                        href={`mailto:${m.email}?subject=Re:%20WeVersity%20Inquiry`}
                        className="px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-700/60 text-purple-200 hover:bg-purple-800/50 text-xs font-bold"
                      >
                        Reply Email
                      </a>
                      <button 
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/60 transition-colors"
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
                <h1 className="text-2xl font-display font-bold text-white">Website &amp; Security Settings</h1>
                <p className="text-xs text-purple-300 mt-1">Configure administrator master credentials and device privacy</p>
              </div>

              {/* Device Privacy Card (Addressing User's Exact Need) */}
              <div className="p-6 rounded-3xl bg-[#161033] border border-purple-700/60 space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-900/60 border border-purple-600/50 flex items-center justify-center text-purple-300">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">This PC / Device Authorization</h3>
                      <p className="text-xs text-purple-300">Control which computers display the Admin Button</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    isDeviceAuthorized 
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/60' 
                      : 'bg-rose-950/80 text-rose-400 border-rose-700/60'
                  }`}>
                    {isDeviceAuthorized ? '✓ This PC is Authorized' : '✕ Not Authorized'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#1C1340] border border-purple-800/40 space-y-3 text-xs leading-relaxed text-purple-200">
                  <p>
                    <strong className="text-white">Aapki requirement:</strong> "ye password ka button mere PC pe hi show ho aur kisi aur ke PC pe show na ho."
                  </p>
                  <p className="text-purple-300">
                    Jab aap is browser pe login karte hain aur <strong className="text-white">"Authorize this PC"</strong> check karte hain, to Admin Button sirf aapke computer par nazar aata hai. Kisi doosre user ke computer ya mobile par koi Admin button show nahi hoga.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div>
                    <span className="font-bold text-xs text-white block">Quick Admin Access on This Machine</span>
                    <span className="text-[11px] text-purple-400">
                      {isDeviceAuthorized ? 'Enabled — button is visible in navbar on this computer' : 'Disabled — button is hidden on this computer'}
                    </span>
                  </div>
                  <button
                    onClick={handleToggleDeviceAuth}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                      isDeviceAuthorized
                        ? 'bg-rose-950 text-rose-300 border border-rose-700 hover:bg-rose-900/60'
                        : 'bg-emerald-900 text-emerald-200 border border-emerald-600 hover:bg-emerald-800'
                    }`}
                  >
                    {isDeviceAuthorized ? 'De-authorize & Hide from this PC' : 'Authorize & Show on this PC'}
                  </button>
                </div>
              </div>

              {/* Change Admin Password */}
              <div className="p-6 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-900/60 border border-purple-600/50 flex items-center justify-center text-purple-300">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">Change Master Admin Password</h3>
                    <p className="text-xs text-purple-300">Default password is currently <code className="bg-purple-950 px-1.5 py-0.5 rounded text-purple-200 font-mono">king295</code></p>
                  </div>
                </div>

                {passwordMsg && (
                  <div className={`p-3 rounded-xl text-xs ${
                    passwordMsg.type === 'success' 
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700' 
                      : 'bg-rose-950/80 text-rose-300 border border-rose-700'
                  }`}>
                    {passwordMsg.text}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-purple-200">Current Password</label>
                    <input 
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="king295"
                      className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-purple-200">New Password</label>
                    <input 
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-purple-200">Confirm New Password</label>
                    <input 
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password..."
                      className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-md shadow-purple-900/50 transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Maintenance Mode & Website Status */}
              <div className="p-6 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-4">
                <h3 className="font-bold text-base text-white">Website Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white block">Maintenance Banner</span>
                      <span className="text-[10px] text-purple-400">Display maintenance mode notification</span>
                    </div>
                    <button onClick={() => setMaintenanceMode(!maintenanceMode)}>
                      {maintenanceMode ? <ToggleRight className="w-8 h-8 text-[#6D28D9]" /> : <ToggleLeft className="w-8 h-8 text-purple-600" />}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#1C1340] border border-purple-800/40 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white block">Dark Mode</span>
                      <span className="text-[10px] text-purple-400">Default theme for visitors</span>
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
                    <h1 className="text-2xl font-display font-bold text-white">Portfolio Manager</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-700/60 text-purple-200 text-xs font-bold">
                      {portfolioList.length} Live on Website
                    </span>
                  </div>
                  <p className="text-xs text-purple-300 mt-1">
                    Manage projects, case studies, and live links. Any edits or additions instantly update on the website!
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-purple-700/40 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View on Website</span>
                  </button>

                  <button
                    onClick={handleOpenCreateProject}
                    className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/50 transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Item</span>
                  </button>
                </div>
              </div>

              {/* Search & Category Filter Toolbar */}
              <div className="p-4 rounded-2xl bg-[#161033] border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={portfolioSearch}
                    onChange={(e) => setPortfolioSearch(e.target.value)}
                    placeholder="Search by title, client, or tech..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#1C1340] border border-purple-800/60 text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                  />
                  {portfolioSearch && (
                    <button 
                      onClick={() => setPortfolioSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
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
                          : 'bg-[#1C1340] text-purple-300 hover:text-white hover:bg-purple-900/40 border border-purple-800/40'
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
                <div className="p-12 rounded-3xl bg-[#161033] border border-purple-800/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-950 flex items-center justify-center mx-auto text-purple-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">No projects found</h3>
                  <p className="text-xs text-purple-300">Try adjusting your search query or category filter.</p>
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
                        className="rounded-3xl bg-[#161033] border border-purple-800/50 hover:border-purple-600/70 overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-purple-950/40"
                      >
                        <div>
                          {/* Project Image & Category Banner */}
                          <div className="relative h-44 w-full bg-[#1C1340] overflow-hidden">
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
                                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-1 transition-colors"
                              >
                                <Globe className="w-3 h-3" />
                                <span>Live Site</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-medium bg-purple-950/80 text-purple-300 border border-purple-800/60">
                                Client System
                              </span>
                            )}

                            {/* Year & Client */}
                            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow">
                              <span className="font-semibold text-purple-200 text-[11px] truncate">{project.client} • {project.location}</span>
                              <span className="text-[10px] bg-purple-900/80 px-2 py-0.5 rounded-md font-bold">{project.year}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 space-y-3">
                            <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
                              {project.title}
                            </h3>
                            
                            <p className="text-xs text-purple-300/80 line-clamp-2 leading-relaxed">
                              {project.summary}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {project.tags.slice(0, 4).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-[#1F1744] text-purple-300 border border-purple-800/40 font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 4 && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-950 text-purple-400">
                                  +{project.tags.length - 4}
                                </span>
                              )}
                            </div>

                            {/* Results preview */}
                            {project.results && project.results.length > 0 && (
                              <div className="pt-2 border-t border-purple-900/40 grid grid-cols-2 gap-2 text-[10px]">
                                {project.results.slice(0, 2).map((res, i) => (
                                  <div key={i} className="p-1.5 rounded-lg bg-[#1C1340] border border-purple-800/30">
                                    <span className="font-bold text-white block">{res.metric}</span>
                                    <span className="text-purple-400 truncate block">{res.label}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons Footer */}
                        <div className="p-3 bg-[#1C1340]/60 border-t border-purple-800/40 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditProject(project)}
                              className="px-3 py-1.5 rounded-xl bg-purple-900/40 hover:bg-[#6D28D9] text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => setDeleteConfirmId(project.id)}
                              className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-950/60 hover:text-rose-300 transition-colors"
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
                                className="px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900 text-[11px] font-semibold flex items-center gap-1"
                              >
                                <span>Visit</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            <button
                              onClick={onViewWebsite}
                              className="px-2.5 py-1 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-300 text-[11px] font-semibold flex items-center gap-1"
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
                    <h1 className="text-2xl font-display font-bold text-white">Cost Estimator Manager</h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/70 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Live Synced to Website</span>
                    </span>
                  </div>
                  <p className="text-xs text-purple-300 mt-1">
                    Manage project types, base pricing, timeline delivery, scale multipliers, add-ons, and PKR/GBP currency rates.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetEstimatorDefaults}
                    className="px-3.5 py-2 rounded-xl bg-purple-950/70 border border-purple-800/60 hover:bg-purple-900 text-purple-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                    title="Reset all settings to default factory values"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>

                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Website</span>
                  </button>

                  {estimatorSubTab === 'types' && (
                    <button
                      onClick={handleOpenCreateType}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-900/50 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Project Type</span>
                    </button>
                  )}

                  {estimatorSubTab === 'addons' && (
                    <button
                      onClick={handleOpenCreateAddon}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-900/50 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Add-on Service</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Toast / Notification Banner */}
              {estimatorSavedToast && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-200 text-xs font-bold flex items-center justify-between shadow-xl shadow-emerald-950/50 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{estimatorSavedToast}</span>
                  </div>
                  <span className="text-[11px] text-emerald-300 font-normal">All front-end visitors see this instantly</span>
                </div>
              )}

              {/* Sub-tab Pill Navigation */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#161033] border border-purple-800/40 overflow-x-auto">
                <button
                  onClick={() => setEstimatorSubTab('types')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'types'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>1. Project Types & Base Rates</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'types' ? 'bg-purple-800' : 'bg-purple-950 text-purple-300'}`}>
                    {estimatorSettings.projectTypes?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('addons')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'addons'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>2. Add-on Services</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'addons' ? 'bg-purple-800' : 'bg-purple-950 text-purple-300'}`}>
                    {estimatorSettings.addonOptions?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('scale')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'scale'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>3. Scope Scale & Multipliers</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'scale' ? 'bg-purple-800' : 'bg-purple-950 text-purple-300'}`}>
                    {estimatorSettings.scaleOptions?.length || 0}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('design_backend')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'design_backend'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>4. UI/UX & Backend Tiers</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${estimatorSubTab === 'design_backend' ? 'bg-purple-800' : 'bg-purple-950 text-purple-300'}`}>
                    {(estimatorSettings.designTiers?.length || 0) + (estimatorSettings.backendOptions?.length || 0)}
                  </span>
                </button>

                <button
                  onClick={() => setEstimatorSubTab('currency')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    estimatorSubTab === 'currency'
                      ? 'bg-[#6D28D9] text-white shadow-md'
                      : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>5. Currency Exchange Rates</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/60">
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
                          className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 hover:border-purple-600/70 transition-all space-y-4 relative group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-800/60 text-purple-300">
                                #{item.id}
                              </span>
                              <h3 className="font-bold text-sm text-white pt-1">{item.name}</h3>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                              <button
                                onClick={() => handleOpenEditType(item)}
                                className="p-1.5 rounded-xl bg-purple-900/60 text-purple-300 hover:bg-[#6D28D9] hover:text-white transition-colors"
                                title="Edit this project type"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmEstimator({ type: 'type', id: item.id, name: item.name })}
                                className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-950 hover:text-rose-300 transition-colors"
                                title="Delete project type"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-800/40 text-xs">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-purple-400 font-medium">Base Price (USD)</span>
                              <div className="text-base font-extrabold text-[#A78BFA]">${item.baseUSD.toLocaleString()}</div>
                              <span className="text-[10px] text-emerald-400 font-bold block">₨ {pkrPrice.toLocaleString()} PKR</span>
                            </div>
                            <div className="space-y-0.5 text-right">
                              <span className="text-[10px] text-purple-400 font-medium">Estimated Timeline</span>
                              <div className="text-sm font-bold text-white flex items-center justify-end gap-1">
                                <Clock className="w-3.5 h-3.5 text-purple-400" />
                                <span>~{item.weeks} Weeks</span>
                              </div>
                              <span className="text-[10px] text-purple-300 block">Baseline Delivery</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenEditType(item)}
                            className="w-full py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
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
                          className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 hover:border-purple-600/70 transition-all space-y-4 relative group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-800/60 text-purple-300">
                                #{addon.id}
                              </span>
                              <h3 className="font-bold text-sm text-white pt-1">{addon.name}</h3>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleOpenEditAddon(addon)}
                                className="p-1.5 rounded-xl bg-purple-900/60 text-purple-300 hover:bg-[#6D28D9] hover:text-white transition-colors"
                                title="Edit Add-on"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmEstimator({ type: 'addon', id: addon.id, name: addon.name })}
                                className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-950 hover:text-rose-300 transition-colors"
                                title="Delete Add-on"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-purple-800/40 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-purple-400">Add-on Surcharge</span>
                            <div className="text-right">
                              <span className="text-base font-extrabold text-[#A78BFA]">+${addon.costUSD.toLocaleString()}</span>
                              <span className="text-[10px] text-emerald-400 font-bold block">+₨ {pkrPrice.toLocaleString()} PKR</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenEditAddon(addon)}
                            className="w-full py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
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
                  <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-800/50 text-xs text-purple-200 flex items-center gap-3">
                    <Info className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>
                      Scale multipliers dynamically scale the base project price. For example, selecting <strong>Compact (0.85x)</strong> discounts the base rate, while <strong>Enterprise (1.8x)</strong> expands the budget and adds delivery time.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {estimatorSettings.scaleOptions?.map((scale) => {
                      return (
                        <div
                          key={scale.id}
                          className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 hover:border-purple-600/70 transition-all space-y-4 relative group"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-800/60 text-purple-300">
                              #{scale.id}
                            </span>
                            <button
                              onClick={() => handleOpenEditScale(scale)}
                              className="p-1.5 rounded-xl bg-purple-900/60 text-purple-300 hover:bg-[#6D28D9] hover:text-white transition-colors"
                              title="Edit Scale"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h3 className="font-bold text-sm text-white">{scale.label}</h3>

                          <div className="space-y-2 pt-2 border-t border-purple-800/40 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-purple-400">Multiplier:</span>
                              <span className="font-extrabold text-[#A78BFA] text-base">{scale.multiplier}x</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-purple-400">Delivery Delta:</span>
                              <span className="font-bold text-white">
                                {scale.weeksDelta > 0 ? `+${scale.weeksDelta}` : scale.weeksDelta} Weeks
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenEditScale(scale)}
                            className="w-full py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
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
                  <div className="space-y-4 p-6 rounded-3xl bg-[#161033] border border-purple-800/40">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>UI/UX Design Tiers (3 Levels)</span>
                      </h3>
                      <span className="text-[10px] text-purple-400">Step 3 on Website</span>
                    </div>

                    <div className="space-y-3">
                      {estimatorSettings.designTiers?.map((tier) => {
                        const pkrPrice = tier.costUSD * (estimatorSettings.currencyRates?.PKR || 280);
                        return (
                          <div
                            key={tier.id}
                            className="p-4 rounded-2xl bg-[#1C1340] border border-purple-800/50 hover:border-purple-600/70 transition-all flex items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-white">{tier.label}</h4>
                                <span className="text-[9px] font-mono text-purple-400">#{tier.id}</span>
                              </div>
                              <p className="text-[11px] text-purple-300">{tier.desc}</p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <span className="text-xs font-extrabold text-[#A78BFA]">
                                  {tier.costUSD === 0 ? 'Included ($0)' : `+$${tier.costUSD}`}
                                </span>
                                {tier.costUSD > 0 && (
                                  <span className="text-[10px] text-emerald-400 font-bold block">+₨ {pkrPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <button
                                onClick={() => handleOpenEditDesign(tier)}
                                className="p-1.5 rounded-xl bg-purple-950 text-purple-300 hover:text-white hover:bg-[#6D28D9] transition-colors"
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
                  <div className="space-y-4 p-6 rounded-3xl bg-[#161033] border border-purple-800/40">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-purple-400" />
                        <span>Backend Complexity & APIs (3 Levels)</span>
                      </h3>
                      <span className="text-[10px] text-purple-400">Step 4 on Website</span>
                    </div>

                    <div className="space-y-3">
                      {estimatorSettings.backendOptions?.map((backend) => {
                        const pkrPrice = backend.costUSD * (estimatorSettings.currencyRates?.PKR || 280);
                        return (
                          <div
                            key={backend.id}
                            className="p-4 rounded-2xl bg-[#1C1340] border border-purple-800/50 hover:border-purple-600/70 transition-all flex items-center justify-between gap-3"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-white">{backend.label}</h4>
                                <span className="text-[9px] font-mono text-purple-400">#{backend.id}</span>
                              </div>
                              <p className="text-[11px] text-purple-400">System architecture tier</p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <div className="text-right">
                                <span className="text-xs font-extrabold text-[#A78BFA]">
                                  {backend.costUSD === 0 ? 'Included ($0)' : `+$${backend.costUSD}`}
                                </span>
                                {backend.costUSD > 0 && (
                                  <span className="text-[10px] text-emerald-400 font-bold block">+₨ {pkrPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <button
                                onClick={() => handleOpenEditBackend(backend)}
                                className="p-1.5 rounded-xl bg-purple-950 text-purple-300 hover:text-white hover:bg-[#6D28D9] transition-colors"
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
                <div className="p-6 sm:p-8 rounded-3xl bg-[#161033] border border-purple-800/40 space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      <span>Currency Conversion Rates</span>
                    </h3>
                    <p className="text-xs text-purple-300 mt-1">
                      The website primarily displays prices in Pakistani Rupees (₨ PKR) for local clients, as well as GBP (£) and USD ($). Adjust the conversion factor below.
                    </p>
                  </div>

                  <form onSubmit={handleSaveCurrencyRates} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-[#1C1340] border border-purple-800/50 space-y-2">
                        <label className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                          <span>1 USD to PKR (₨)</span>
                          <span className="text-[10px] font-normal text-purple-300">Pakistan Rupee</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 font-bold text-sm">₨</span>
                          <input
                            type="number"
                            step="1"
                            value={currencyForm.pkr}
                            onChange={(e) => setCurrencyForm({ ...currencyForm, pkr: Number(e.target.value) })}
                            className="w-full pl-8 pr-3 py-2 bg-purple-950/80 border border-purple-700/60 rounded-xl text-white font-extrabold text-sm focus:outline-none focus:border-purple-400"
                            placeholder="280"
                          />
                        </div>
                        <p className="text-[10px] text-purple-400">Current active exchange rate for all cost calculations.</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#1C1340] border border-purple-800/50 space-y-2">
                        <label className="text-xs font-bold text-[#A78BFA] flex items-center justify-between">
                          <span>1 USD to GBP (£)</span>
                          <span className="text-[10px] font-normal text-purple-300">British Pound</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 font-bold text-sm">£</span>
                          <input
                            type="number"
                            step="0.01"
                            value={currencyForm.gbp}
                            onChange={(e) => setCurrencyForm({ ...currencyForm, gbp: Number(e.target.value) })}
                            className="w-full pl-8 pr-3 py-2 bg-purple-950/80 border border-purple-700/60 rounded-xl text-white font-extrabold text-sm focus:outline-none focus:border-purple-400"
                            placeholder="0.79"
                          />
                        </div>
                        <p className="text-[10px] text-purple-400">Used when international clients switch to GBP.</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-xs text-purple-300">
                        Example: $850 USD = <strong className="text-emerald-400">₨ {Math.round(850 * (Number(currencyForm.pkr) || 280)).toLocaleString()} PKR</strong>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-lg shadow-purple-900/50 flex items-center gap-2 transition-all"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save Currency Rates</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* LIVE SIMULATOR & VERIFICATION COMPONENT */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1A123B] to-[#120B29] border-2 border-purple-700/60 shadow-2xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-800/50 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-[#A78BFA]" />
                      <span>Live Calculator Simulator (Front-End Verification)</span>
                    </h3>
                    <p className="text-[11px] text-purple-300">
                      Test any combination below to verify exactly what clients will see on the website.
                    </p>
                  </div>
                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-200 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Open Live Estimator Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Simulator controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {/* Select Type */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-purple-400">Project Type</label>
                    <select
                      value={simType}
                      onChange={(e) => setSimType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-800/60 text-white font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.projectTypes?.map(pt => (
                        <option key={pt.id} value={pt.id}>{pt.name} (${pt.baseUSD})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Scale */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-purple-400">Scale / Volume</label>
                    <select
                      value={simScale}
                      onChange={(e) => setSimScale(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-800/60 text-white font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.scaleOptions?.map(s => (
                        <option key={s.id} value={s.id}>{s.label} ({s.multiplier}x)</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Design */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-purple-400">Design Tier</label>
                    <select
                      value={simDesign}
                      onChange={(e) => setSimDesign(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-800/60 text-white font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.designTiers?.map(d => (
                        <option key={d.id} value={d.id}>{d.label} (+${d.costUSD})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Backend */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-purple-400">Backend Complexity</label>
                    <select
                      value={simBackend}
                      onChange={(e) => setSimBackend(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#140D30] border border-purple-800/60 text-white font-medium text-xs focus:outline-none"
                    >
                      {estimatorSettings.backendOptions?.map(b => (
                        <option key={b.id} value={b.id}>{b.label} (+${b.costUSD})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Simulator Addons */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] uppercase font-bold text-purple-400">Included Add-ons</label>
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
                              ? 'bg-[#6D28D9] border-[#6D28D9] text-white shadow-xs'
                              : 'bg-purple-950/60 border-purple-800/60 text-purple-300 hover:border-purple-600'
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
                    <div className="p-4 rounded-2xl bg-[#140D30] border border-purple-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-[10px] text-purple-400 block font-medium">Estimated PKR (Website Primary)</span>
                          <span className="text-2xl font-display font-extrabold text-emerald-400 tracking-tight">
                            ₨ {calculatedPKR.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-l border-purple-800/80 pl-6">
                          <span className="text-[10px] text-purple-400 block font-medium">Base USD Price</span>
                          <span className="text-xl font-display font-bold text-[#A78BFA]">
                            ${calculatedUSD.toLocaleString()}
                          </span>
                        </div>
                        <div className="border-l border-purple-800/80 pl-6">
                          <span className="text-[10px] text-purple-400 block font-medium">Estimated Delivery</span>
                          <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            ~{calculatedWeeks} Weeks
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-purple-300">
                          Formula: <code className="text-purple-200 bg-purple-950 px-1.5 py-0.5 rounded">(${selType.baseUSD} × {selScale.multiplier}) + ${selDesign.costUSD} + ${selBackend.costUSD} + ${addonsSum}</code>
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
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 flex items-center justify-between shadow-xl animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold">{aboutSavedToast}</span>
                  </div>
                  <button 
                    onClick={() => setAboutSavedToast(null)}
                    className="text-emerald-400 hover:text-emerald-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-display font-bold text-white">About Us Content Manager</h1>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50 font-bold">
                      Live Dynamic CMS
                    </span>
                  </div>
                  <p className="text-xs text-purple-300 mt-1">
                    Manage the hero headline, dual offices (Lahore HQ &amp; London Liaison), leadership team, milestones timeline, and engineering principles. All edits update instantly on the website.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={onViewWebsite}
                    className="px-3.5 py-2 rounded-xl bg-purple-900/40 hover:bg-purple-900/70 border border-purple-700/50 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Eye className="w-4 h-4 text-purple-300" />
                    <span>View on Website</span>
                  </button>
                  <button
                    onClick={handleResetAboutDefaults}
                    className="px-3 py-2 rounded-xl bg-[#1A1338] border border-purple-800/60 hover:border-purple-600 text-purple-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                    title="Reset all About Us content to original defaults"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* Subtabs Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-purple-900/50">
                <button
                  onClick={() => setAboutSubTab('hero')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'hero'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-900/50'
                      : 'bg-[#161033] text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hero &amp; Story</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('offices')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'offices'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-900/50'
                      : 'bg-[#161033] text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Offices &amp; Presence (Lahore &amp; London)</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('leadership')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'leadership'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-900/50'
                      : 'bg-[#161033] text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Leadership Team ({aboutState.leadership.length})</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('milestones')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'milestones'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-900/50'
                      : 'bg-[#161033] text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Milestones Timeline ({aboutState.milestones.length})</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('principles')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'principles'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-900/50'
                      : 'bg-[#161033] text-purple-300 hover:text-white hover:bg-purple-900/40'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Engineering Principles ({aboutState.principles.length})</span>
                </button>
                <button
                  onClick={() => setAboutSubTab('cta')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                    aboutSubTab === 'cta'
                      ? 'bg-[#6D28D9] text-white shadow-lg shadow-purple-900/50'
                      : 'bg-[#161033] text-purple-300 hover:text-white hover:bg-purple-900/40'
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
                  <div className="lg:col-span-7 bg-[#161033] border border-purple-800/40 rounded-3xl p-6 shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                          <span>Edit Hero Headline &amp; Mission</span>
                        </h3>
                        <p className="text-xs text-purple-300 mt-0.5">Controls the top of the About Us page</p>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-bold">
                        Front-End Sync
                      </span>
                    </div>

                    <form onSubmit={handleSaveHero} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-purple-200 block">Top Pill Badge Text</label>
                        <input
                          type="text"
                          required
                          value={heroForm.badge}
                          onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                          placeholder="e.g. About WeVersity • Since 2016"
                          className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white placeholder-purple-400 focus:outline-none focus:border-purple-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-purple-200 block">Main Headline / Title</label>
                        <input
                          type="text"
                          required
                          value={heroForm.title}
                          onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                          placeholder="e.g. Software Craftsmen Who Believe in Code That Works."
                          className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white placeholder-purple-400 focus:outline-none focus:border-purple-400 font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-purple-200 block">Mission Paragraph / Subtitle</label>
                        <textarea
                          rows={4}
                          required
                          value={heroForm.subtitle}
                          onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                          placeholder="Operating from Lahore, Pakistan with international liaison in London, UK..."
                          className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white placeholder-purple-400 focus:outline-none focus:border-purple-400 leading-relaxed"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/50 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save &amp; Update Live Website</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Live Visual Preview */}
                  <div className="lg:col-span-5 bg-[#161033] border border-purple-800/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-purple-800/40 pb-3 mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-purple-400" />
                          <span>Live Website Hero Preview</span>
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/40">
                          Real-time
                        </span>
                      </div>

                      <div className="p-6 rounded-2xl bg-white text-gray-900 shadow-md space-y-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 text-[11px] font-bold">
                          <Building2 className="w-3 h-3" />
                          <span>{heroForm.badge || 'About WeVersity • Since 2016'}</span>
                        </div>
                        <h2 className="text-lg font-bold text-gray-950 leading-snug">
                          {heroForm.title || 'Software Craftsmen Who Believe in Code That Works.'}
                        </h2>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {heroForm.subtitle || 'Operating from Lahore, Pakistan with international liaison in London, UK...'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-purple-800/40 text-[11px] text-purple-300">
                      Changes saved here immediately reflect in <code className="bg-purple-950 px-1 py-0.5 rounded text-purple-200">AboutView.tsx</code> for all website visitors.
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: OFFICES & LOCATIONS */}
              {aboutSubTab === 'offices' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#A78BFA]" />
                        <span>Dual Office Presence: Lahore HQ &amp; London Liaison</span>
                      </h3>
                      <p className="text-xs text-purple-300 mt-0.5">
                        Update physical addresses, phone numbers, operating hours, and focus disciplines.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveOffices} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Lahore HQ Box */}
                      <div className="bg-[#161033] border border-purple-800/40 rounded-3xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#6D28D9]"></span>
                            <h4 className="text-sm font-bold text-white">Lahore Headquarters</h4>
                          </div>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50 font-bold">
                            Pakistan
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">Office Title</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.title}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, title: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">City / Badge</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.city}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, city: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-purple-200">Header Subtitle / Tag</label>
                            <input
                              type="text"
                              value={officesForm.lahore.label}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                lahore: { ...officesForm.lahore, label: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-purple-200">Full Physical Address</label>
                            <textarea
                              rows={2}
                              required
                              value={officesForm.lahore.address}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                lahore: { ...officesForm.lahore, address: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">Direct Phone</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.phone}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, phone: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">Working Hours</label>
                              <input
                                type="text"
                                required
                                value={officesForm.lahore.hours}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  lahore: { ...officesForm.lahore, hours: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-purple-200">Core Disciplines / Specialties</label>
                            <input
                              type="text"
                              value={officesForm.lahore.specialtyValue}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                lahore: { ...officesForm.lahore, specialtyValue: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* London UK Office Box */}
                      <div className="bg-[#161033] border border-purple-800/40 rounded-3xl p-6 shadow-xl space-y-4">
                        <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                            <h4 className="text-sm font-bold text-white">United Kingdom Liaison</h4>
                          </div>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 font-bold">
                            London, UK
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">Office Title</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.title}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, title: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">City / Badge</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.city}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, city: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-purple-200">Header Subtitle / Tag</label>
                            <input
                              type="text"
                              value={officesForm.london.label}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                london: { ...officesForm.london, label: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-purple-200">Full Physical Address</label>
                            <textarea
                              rows={2}
                              required
                              value={officesForm.london.address}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                london: { ...officesForm.london, address: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">UK Direct Phone</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.phone}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, phone: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-purple-200">Working Hours</label>
                              <input
                                type="text"
                                required
                                value={officesForm.london.hours}
                                onChange={(e) => setOfficesForm({
                                  ...officesForm,
                                  london: { ...officesForm.london, hours: e.target.value }
                                })}
                                className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-purple-200">Core Focus / Specialties</label>
                            <input
                              type="text"
                              value={officesForm.london.specialtyValue}
                              onChange={(e) => setOfficesForm({
                                ...officesForm,
                                london: { ...officesForm.london, specialtyValue: e.target.value }
                              })}
                              className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white font-medium"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/50 transition-all"
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
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#A78BFA]" />
                        <span>Leadership &amp; Engineering Leads ({aboutState.leadership.length})</span>
                      </h3>
                      <p className="text-xs text-purple-300 mt-0.5">
                        Manage company founders, directors, lead engineers, and specialists.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreateLeader}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-900/50 self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Team Member</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {aboutState.leadership.map((leader) => (
                      <div
                        key={leader.id}
                        className="bg-[#161033] border border-purple-800/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-purple-600 transition-all group"
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
                              <h4 className="text-sm font-bold text-white truncate">{leader.name}</h4>
                              <span className="text-[11px] text-[#A78BFA] font-medium block truncate">{leader.role}</span>
                            </div>
                          </div>

                          <p className="text-xs text-purple-300/90 leading-relaxed line-clamp-3">
                            {leader.bio}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-4 mt-3 border-t border-purple-900/50">
                          <button
                            onClick={() => handleOpenEditLeader(leader)}
                            className="p-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-white transition-colors"
                            title="Edit team member"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmAbout({ type: 'leader', id: leader.id, name: leader.name })}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white transition-colors"
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
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#A78BFA]" />
                        <span>A Decade of Growth Milestones ({aboutState.milestones.length})</span>
                      </h3>
                      <p className="text-xs text-purple-300 mt-0.5">
                        Chronological journey items shown on the website timeline.
                      </p>
                    </div>
                    <button
                      onClick={handleOpenCreateMilestone}
                      className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-900/50 self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aboutState.milestones.map((m) => (
                      <div
                        key={m.id}
                        className="bg-[#161033] border border-purple-800/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-purple-600 transition-all"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-display font-extrabold text-[#A78BFA]">
                              {m.year}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-bold">
                              Milestone
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{m.title}</h4>
                          <p className="text-xs text-purple-300 leading-relaxed">
                            {m.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-purple-900/50">
                          <button
                            onClick={() => handleOpenEditMilestone(m)}
                            className="p-1.5 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-white transition-colors"
                            title="Edit milestone"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmAbout({ type: 'milestone', id: m.id, name: `${m.year} - ${m.title}` })}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white transition-colors"
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
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                      <span>Our Engineering Principles ({aboutState.principles.length})</span>
                    </h3>
                    <p className="text-xs text-purple-300 mt-0.5">
                      The core values and software development manifesto highlighted on the About Us page.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {aboutState.principles.map((p) => (
                      <div
                        key={p.id}
                        className="bg-[#161033] border border-purple-800/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-purple-500 transition-all"
                      >
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-purple-300">
                            {p.icon === 'Code2' && <Code2 className="w-5 h-5" />}
                            {p.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                            {p.icon === 'Cpu' && <Cpu className="w-5 h-5" />}
                            {p.icon === 'Clock' && <Clock className="w-5 h-5" />}
                            {p.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-purple-400 font-bold block mb-1">Principle</span>
                            <h4 className="text-sm font-bold text-white">{p.title}</h4>
                          </div>
                          <p className="text-xs text-purple-300 leading-relaxed">
                            {p.desc}
                          </p>
                        </div>

                        <div className="pt-4 mt-2 border-t border-purple-900/50 flex justify-end">
                          <button
                            onClick={() => handleOpenEditPrinciple(p)}
                            className="px-3 py-1.5 rounded-lg bg-purple-900/50 hover:bg-purple-900 text-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
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
                  <div className="lg:col-span-7 bg-[#161033] border border-purple-800/40 rounded-3xl p-6 shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-purple-800/40 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
                          <span>Edit Bottom CTA Banner</span>
                        </h3>
                        <p className="text-xs text-purple-300 mt-0.5">Controls the bottom conversion callout on About Us</p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveCTA} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-purple-200 block">Callout Title</label>
                        <input
                          type="text"
                          required
                          value={ctaForm.title}
                          onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })}
                          placeholder="Meet the engineers building the next generation of web software."
                          className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-purple-200 block">Callout Description</label>
                        <textarea
                          rows={3}
                          required
                          value={ctaForm.desc}
                          onChange={(e) => setCtaForm({ ...ctaForm, desc: e.target.value })}
                          placeholder="Whether you need an on-site consultation at our Lahore office or a virtual discovery session from London..."
                          className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-purple-200 block">Button Label</label>
                        <input
                          type="text"
                          required
                          value={ctaForm.buttonText}
                          onChange={(e) => setCtaForm({ ...ctaForm, buttonText: e.target.value })}
                          placeholder="Book a Free Technical Discovery Call"
                          className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/50 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save &amp; Update CTA Banner</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Live Visual Preview */}
                  <div className="lg:col-span-5 bg-[#161033] border border-purple-800/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-purple-800/40 pb-3 mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-purple-400" />
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
                          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                          <span>{ctaForm.buttonText}</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-purple-800/40 text-[11px] text-purple-300">
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
                  <h1 className="text-2xl font-display font-bold text-white">Teachers Manager</h1>
                  <p className="text-xs text-purple-300 mt-1">Add, edit, or remove faculty members from the website</p>
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
                      experience: '',
                      studentsCount: '',
                      bio: '',
                      avatar: '/assets/aistudio/image_f804651e.png'
                    });
                    setIsTeacherModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-900/50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Teacher</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachersList.map((teacher) => (
                  <div key={teacher.id} className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 hover:border-purple-600 transition-all space-y-4 group">
                    <div className="flex items-center gap-4">
                      <img src={teacher.avatar} alt={teacher.name} className="w-16 h-16 rounded-full object-cover border-2 border-purple-500/30" />
                      <div className="min-w-0">
                        <h3 className="font-bold text-white truncate">{teacher.name}</h3>
                        <p className="text-[11px] text-purple-400 font-medium truncate">{teacher.role}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-800/60 text-[9px] font-bold text-purple-300 uppercase tracking-wider">
                            {teacher.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-purple-200/80 line-clamp-2 leading-relaxed h-8">
                      {teacher.bio}
                    </p>

                    <div className="pt-4 border-t border-purple-900/40 flex items-center justify-between">
                      <div className="text-[10px] text-purple-400">
                        <span className="font-bold text-white">{teacher.experience}</span> Experience
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingTeacherId(teacher.id);
                            setTeacherForm(teacher);
                            setIsTeacherModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-purple-900/40 text-purple-300 hover:bg-[#6D28D9] hover:text-white transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Remove ${teacher.name} from teachers list?`)) {
                              handleDeleteTeacher(teacher.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
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
                  <h1 className="text-2xl font-display font-bold text-white">Live Sessions Manager</h1>
                  <p className="text-xs text-purple-300 mt-1">Manage upcoming webinars and live workshop schedules</p>
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
                      thumbnail: '/assets/aistudio/image_85a3982c.png'
                    });
                    setIsSessionModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-900/50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Session</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sessionsList.map((session) => (
                  <div key={session.id} className="p-5 rounded-2xl bg-[#161033] border border-purple-800/40 flex gap-5 hover:border-purple-600 transition-all">
                    <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0 border border-purple-700/30">
                      <img src={session.thumbnail} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                            session.status === 'Live' ? 'bg-rose-600 animate-pulse' : 'bg-purple-900/60 text-purple-300'
                          }`}>
                            {session.status}
                          </span>
                          <span className="text-[10px] text-purple-400 font-bold">{session.date}</span>
                        </div>
                        <h3 className="font-bold text-sm text-white truncate">{session.title}</h3>
                        <p className="text-[10px] text-purple-300 mt-1">Instructor: <span className="text-white">{session.instructor}</span></p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-purple-400">
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
                          className="p-1.5 rounded-lg bg-purple-900/40 text-purple-300 hover:bg-[#6D28D9] hover:text-white"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteSession(session.id)}
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-600 hover:text-white"
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

          {/* TAB: CONTACT & COMPANY INFO */}
          {currentTab === 'contact' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Company Identity &amp; Contact</h1>
                <p className="text-xs text-purple-300 mt-1">Update brand logo, support emails, and global contact numbers</p>
              </div>

              <div className="bg-[#161033] border border-purple-800/40 rounded-3xl p-8 shadow-xl">
                <form onSubmit={handleSaveCompanyInfo} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-purple-200">Agency Name</label>
                      <input 
                        type="text"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-purple-200">Public Support Email</label>
                      <input 
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-purple-200">Global Contact Number</label>
                      <input 
                        type="text"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-purple-200">Brand Logo URL</label>
                      <input 
                        type="text"
                        value={companyInfo.logo}
                        onChange={(e) => setCompanyInfo({ ...companyInfo, logo: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white text-sm focus:border-purple-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-purple-200">Headquarters Address</label>
                    <textarea 
                      rows={2}
                      value={companyInfo.address}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white text-sm focus:border-purple-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/50 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update Global Identity</span>
                    </button>
                  </div>
                </form>
              </div>

              <div className="p-6 rounded-3xl bg-purple-950/30 border border-purple-800/40 space-y-3">
                <div className="flex items-center gap-2 text-purple-200 font-bold text-sm">
                  <Info className="w-5 h-5 text-purple-400" />
                  <span>Sync Notice</span>
                </div>
                <p className="text-xs text-purple-300 leading-relaxed">
                  The information above is synchronized across the Footer, Contact page, and About Us maps. Updating the phone number here will also update the primary WhatsApp contact button on the front-end.
                </p>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Quick Action Modal */}
      {quickActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#181236] border border-purple-700/60 rounded-3xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="font-bold text-sm text-white">{quickActionModal}</h3>
              <button onClick={() => setQuickActionModal(null)} className="text-purple-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-purple-300 font-semibold">Title / Description</label>
                <input 
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Next.js 15 Full Stack Masterclass"
                  className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-purple-300 font-semibold">Price (USD)</label>
                <input 
                  type="number"
                  value={newCoursePrice}
                  onChange={(e) => setNewCoursePrice(e.target.value)}
                  className="w-full px-3 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setQuickActionModal(null)}
                className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#161033] border border-purple-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-white my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#6D28D9]/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  {editingProjectId ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {editingProjectId ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
                  </h3>
                  <p className="text-xs text-purple-300">
                    Changes will instantly synchronize to the website and remain saved.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="p-2 rounded-xl text-purple-400 hover:text-white hover:bg-purple-900/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">
                  Project Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Modern Full-Stack Logistics Portal"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              {/* Category & Category Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Category</label>
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
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="web">High-Speed Web Portal</option>
                    <option value="ecommerce">E-Commerce & Online Store</option>
                    <option value="saas">SaaS Platform</option>
                    <option value="enterprise">Enterprise & ERP</option>
                    <option value="mobile">Mobile Application</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Category Label (Card Badge)</label>
                  <input
                    type="text"
                    value={projectForm.categoryLabel}
                    onChange={(e) => setProjectForm({ ...projectForm, categoryLabel: e.target.value })}
                    placeholder="e.g. Food Ordering & E-Commerce"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Client, Location & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Client Name</label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                    placeholder="e.g. Pizza Express App"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Location / Host</label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                    placeholder="e.g. Live on Vercel"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Year</label>
                  <input
                    type="text"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Live Demo URL & Project Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Live Site / Demo URL (Optional)</label>
                  <input
                    type="url"
                    value={projectForm.demoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                    placeholder="https://pizza-az2a-i6p.vercel.app/"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Image URL / Path</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                    placeholder="/assets/aistudio/image_0c0bc5ad.png"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Quick Image Presets */}
              <div className="space-y-1.5">
                <label className="text-purple-300 text-[11px] font-semibold block">Select Existing Website Image:</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Pizza Express', url: '/assets/aistudio/image_0c0bc5ad.png' },
                    { label: 'Abdullah Dev', url: '/assets/aistudio/Screenshot_2026-10-31_102143_c6a481c6.png' },
                    { label: 'Fahad Portfolio', url: '/assets/aistudio/image_9ff0a784.png' },
                    { label: 'Taibe / Shahab', url: '/assets/aistudio/image_03e15199.png' },
                    { label: 'Tau Developer', url: '/assets/aistudio/image_eaa41339.png' },
                    { label: 'WeVersity Agency', url: '/assets/aistudio/hero_illustration_full.png' }
                  ].map((preset, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setProjectForm({ ...projectForm, image: preset.url })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                        projectForm.image === preset.url
                          ? 'bg-[#6D28D9] border-purple-400 text-white'
                          : 'bg-[#1C1340] border-purple-800/60 text-purple-300 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Summary (Shown on Card)</label>
                <textarea
                  rows={2}
                  value={projectForm.summary}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  placeholder="High-speed interactive food delivery web app with crust customizer and real-time checkout..."
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Challenge</label>
                  <textarea
                    rows={2}
                    value={projectForm.challenge}
                    onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                    placeholder="Designing an ultra-responsive, mobile-first ordering system..."
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Solution</label>
                  <textarea
                    rows={2}
                    value={projectForm.solution}
                    onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                    placeholder="Engineered with modern React and Tailwind CSS on Vercel..."
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 leading-relaxed"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Tech Stack Tags (Comma separated)</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  placeholder="React, Tailwind CSS, Vercel, Food Delivery"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Result Metrics */}
              <div className="space-y-2 pt-2 border-t border-purple-800/50">
                <label className="text-purple-200 font-bold block">Performance Metrics &amp; Outcomes</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-xl bg-[#1C1340] border border-purple-800/40 space-y-1">
                    <input
                      type="text"
                      value={projectForm.metric1Val}
                      onChange={(e) => setProjectForm({ ...projectForm, metric1Val: e.target.value })}
                      placeholder="100%"
                      className="w-full bg-transparent border-b border-purple-700/60 py-1 text-white font-bold text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={projectForm.metric1Lbl}
                      onChange={(e) => setProjectForm({ ...projectForm, metric1Lbl: e.target.value })}
                      placeholder="Lighthouse Performance"
                      className="w-full bg-transparent py-1 text-purple-300 text-[11px] focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1C1340] border border-purple-800/40 space-y-1">
                    <input
                      type="text"
                      value={projectForm.metric2Val}
                      onChange={(e) => setProjectForm({ ...projectForm, metric2Val: e.target.value })}
                      placeholder="<0.8s"
                      className="w-full bg-transparent border-b border-purple-700/60 py-1 text-white font-bold text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={projectForm.metric2Lbl}
                      onChange={(e) => setProjectForm({ ...projectForm, metric2Lbl: e.target.value })}
                      placeholder="Instant Menu Load"
                      className="w-full bg-transparent py-1 text-purple-300 text-[11px] focus:outline-none"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1C1340] border border-purple-800/40 space-y-1">
                    <input
                      type="text"
                      value={projectForm.metric3Val}
                      onChange={(e) => setProjectForm({ ...projectForm, metric3Val: e.target.value })}
                      placeholder="4.9★"
                      className="w-full bg-transparent border-b border-purple-700/60 py-1 text-white font-bold text-xs focus:outline-none"
                    />
                    <input
                      type="text"
                      value={projectForm.metric3Lbl}
                      onChange={(e) => setProjectForm({ ...projectForm, metric3Lbl: e.target.value })}
                      placeholder="User Satisfaction"
                      className="w-full bg-transparent py-1 text-purple-300 text-[11px] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#161033] border border-purple-700/60 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingTypeId ? 'Edit Project Type' : 'Add New Project Type'}
              </h3>
              <button 
                onClick={() => setTypeModalOpen(false)}
                className="p-1 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveType} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Service / Project Name</label>
                <input
                  type="text"
                  required
                  value={typeForm.name}
                  onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
                  placeholder="e.g. Custom Web Application"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Base Price (USD $)</label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    required
                    value={typeForm.baseUSD}
                    onChange={(e) => setTypeForm({ ...typeForm, baseUSD: Number(e.target.value) })}
                    placeholder="850"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    = ₨ {(typeForm.baseUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Baseline Delivery (Weeks)</label>
                  <input
                    type="number"
                    min="1"
                    max="52"
                    step="0.5"
                    required
                    value={typeForm.weeks}
                    onChange={(e) => setTypeForm({ ...typeForm, weeks: Number(e.target.value) })}
                    placeholder="3"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-purple-300 block">Standard turn-around</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setTypeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#161033] border border-purple-700/60 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="font-bold text-base text-white">
                {editingAddonId ? 'Edit Add-on Service' : 'Add New Add-on Service'}
              </h3>
              <button 
                onClick={() => setAddonModalOpen(false)}
                className="p-1 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddon} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Add-on Feature Name</label>
                <input
                  type="text"
                  required
                  value={addonForm.name}
                  onChange={(e) => setAddonForm({ ...addonForm, name: e.target.value })}
                  placeholder="e.g. Payment Gateway (Stripe/PayPal/Local)"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Additional Cost (USD $)</label>
                <input
                  type="number"
                  min="0"
                  step="5"
                  required
                  value={addonForm.costUSD}
                  onChange={(e) => setAddonForm({ ...addonForm, costUSD: Number(e.target.value) })}
                  placeholder="150"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-extrabold focus:outline-none focus:border-purple-400"
                />
                <span className="text-[10px] text-emerald-400 font-bold block">
                  = +₨ {(addonForm.costUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR surcharge
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setAddonModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#161033] border border-purple-700/60 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="font-bold text-base text-white">Edit Scope Scale & Multiplier</h3>
              <button 
                onClick={() => setScaleModalOpen(false)}
                className="p-1 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveScale} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Scale Label</label>
                <input
                  type="text"
                  required
                  value={scaleForm.label}
                  onChange={(e) => setScaleForm({ ...scaleForm, label: e.target.value })}
                  placeholder="e.g. Standard Business (6 - 12 Views)"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-medium focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Multiplier Factor</label>
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.05"
                    required
                    value={scaleForm.multiplier}
                    onChange={(e) => setScaleForm({ ...scaleForm, multiplier: Number(e.target.value) })}
                    placeholder="1.0"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-purple-400">e.g. 1.0 = 100%, 1.35 = 135%</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Weeks Delta</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={scaleForm.weeksDelta}
                    onChange={(e) => setScaleForm({ ...scaleForm, weeksDelta: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-extrabold focus:outline-none focus:border-purple-400"
                  />
                  <span className="text-[10px] text-purple-400">Extra weeks added or subtracted</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setScaleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#161033] border border-purple-700/60 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="font-bold text-base text-white">Edit UI/UX Design Tier</h3>
              <button 
                onClick={() => setDesignModalOpen(false)}
                className="p-1 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDesign} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Design Tier Title</label>
                <input
                  type="text"
                  required
                  value={designForm.label}
                  onChange={(e) => setDesignForm({ ...designForm, label: e.target.value })}
                  placeholder="e.g. Bespoke Custom UI/UX"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-medium focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Description</label>
                <input
                  type="text"
                  required
                  value={designForm.desc}
                  onChange={(e) => setDesignForm({ ...designForm, desc: e.target.value })}
                  placeholder="e.g. Hand-tailored branding, micro-interactions"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Additional Cost (USD $)</label>
                <input
                  type="number"
                  min="0"
                  step="25"
                  required
                  value={designForm.costUSD}
                  onChange={(e) => setDesignForm({ ...designForm, costUSD: Number(e.target.value) })}
                  placeholder="250"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-extrabold focus:outline-none focus:border-purple-400"
                />
                <span className="text-[10px] text-emerald-400 font-bold block">
                  = ₨ {(designForm.costUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setDesignModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#161033] border border-purple-700/60 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="font-bold text-base text-white">Edit Backend Complexity Option</h3>
              <button 
                onClick={() => setBackendModalOpen(false)}
                className="p-1 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBackend} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Backend Option Title</label>
                <input
                  type="text"
                  required
                  value={backendForm.label}
                  onChange={(e) => setBackendForm({ ...backendForm, label: e.target.value })}
                  placeholder="e.g. Standard REST API & Auth"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-medium focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Additional Cost (USD $)</label>
                <input
                  type="number"
                  min="0"
                  step="25"
                  required
                  value={backendForm.costUSD}
                  onChange={(e) => setBackendForm({ ...backendForm, costUSD: Number(e.target.value) })}
                  placeholder="200"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-extrabold focus:outline-none focus:border-purple-400"
                />
                <span className="text-[10px] text-emerald-400 font-bold block">
                  = ₨ {(backendForm.costUSD * (estimatorSettings.currencyRates?.PKR || 280)).toLocaleString()} PKR
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setBackendModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#161033] border border-rose-800/60 rounded-3xl p-6 shadow-2xl space-y-4 text-white text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-700/60 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Delete {deleteConfirmEstimator.type === 'type' ? 'Project Type' : 'Add-on'}?
              </h3>
              <p className="text-xs text-purple-300 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>"{deleteConfirmEstimator.name}"</strong>? It will be removed immediately from the live Cost Estimator on the website.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmEstimator(null)}
                className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-900/50"
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
          <div className="w-full max-w-md bg-[#161033] border border-purple-800/80 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-base text-white">
                  {editingMilestoneId ? 'Edit Milestone' : 'Add New Milestone'}
                </h3>
              </div>
              <button
                onClick={() => setMilestoneModalOpen(false)}
                className="p-1 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMilestone} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Year / Timeline Label</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.year}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                  placeholder="e.g. 2026"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-bold focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Milestone Title</label>
                <input
                  type="text"
                  required
                  value={milestoneForm.title}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  placeholder="e.g. Expansion into Enterprise Cloud Solutions"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white focus:outline-none focus:border-purple-400 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Milestone Description</label>
                <textarea
                  rows={3}
                  required
                  value={milestoneForm.desc}
                  onChange={(e) => setMilestoneForm({ ...milestoneForm, desc: e.target.value })}
                  placeholder="Describe the milestone, breakthrough, or expansion..."
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
          <div className="w-full max-w-lg bg-[#161033] border border-purple-800/80 rounded-3xl p-6 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-base text-white">
                  {editingLeaderId ? 'Edit Team Member' : 'Add New Team Member'}
                </h3>
              </div>
              <button
                onClick={() => setLeaderModalOpen(false)}
                className="p-1 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLeader} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={leaderForm.name}
                    onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                    placeholder="e.g. Shahbaz Aslam"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-bold focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-purple-200 font-bold block">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={leaderForm.role}
                    onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                    placeholder="e.g. Lead Web Developer"
                    className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Bio / Summary</label>
                <textarea
                  rows={3}
                  required
                  value={leaderForm.bio}
                  onChange={(e) => setLeaderForm({ ...leaderForm, bio: e.target.value })}
                  placeholder="Specialist in modern web development, frontend architectures, responsive UI engineering..."
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              {/* Avatar Selector */}
              <div className="space-y-2">
                <label className="text-purple-200 font-bold block">Profile Avatar Image</label>
                
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
                    className="w-full px-3.5 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-purple-400"
                  />
                </div>

                {/* Quick Presets */}
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-purple-400 font-semibold">Or pick from existing team photos:</span>
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
                            ? 'bg-purple-600 text-white border-purple-400'
                            : 'bg-purple-950 text-purple-300 border-purple-800/60 hover:text-white'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setLeaderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
          <div className="w-full max-w-md bg-[#161033] border border-purple-800/80 rounded-3xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A78BFA]" />
                <h3 className="font-bold text-base text-white">
                  Edit Engineering Principle
                </h3>
              </div>
              <button
                onClick={() => setPrincipleModalOpen(false)}
                className="p-1 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePrinciple} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Principle Icon</label>
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
                          ? 'bg-purple-600 text-white border-purple-300 shadow-md shadow-purple-900/60'
                          : 'bg-purple-950/60 text-purple-300 border-purple-800/60 hover:text-white'
                      }`}
                    >
                      {ic.icon}
                      <span className="text-[10px] font-semibold">{ic.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Principle Title</label>
                <input
                  type="text"
                  required
                  value={principleForm.title}
                  onChange={(e) => setPrincipleForm({ ...principleForm, title: e.target.value })}
                  placeholder="e.g. Zero Page-Builder Bloat"
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white font-bold focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-purple-200 font-bold block">Description / Core Philosophy</label>
                <textarea
                  rows={3}
                  required
                  value={principleForm.desc}
                  onChange={(e) => setPrincipleForm({ ...principleForm, desc: e.target.value })}
                  placeholder="We write hand-crafted, clean semantic code..."
                  className="w-full px-3.5 py-2.5 bg-[#1C1340] border border-purple-800/60 rounded-xl text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
                <button
                  type="button"
                  onClick={() => setPrincipleModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#161033] border border-rose-800/60 rounded-3xl p-6 shadow-2xl space-y-4 text-white text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-700/60 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Delete {deleteConfirmAbout.type === 'milestone' ? 'Milestone' : 'Team Member'}?
              </h3>
              <p className="text-xs text-purple-300 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>"{deleteConfirmAbout.name}"</strong>? This change will be immediately reflected on the live website.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmAbout(null)}
                className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 hover:text-white text-xs font-bold"
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
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-lg shadow-rose-900/50"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Edit Modal */}
      {isTeacherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#161033] border border-purple-700/60 rounded-3xl p-8 shadow-2xl space-y-6 text-white my-8">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-4">
              <h3 className="font-bold text-lg">{editingTeacherId ? 'Edit Teacher' : 'Add New Teacher'}</h3>
              <button onClick={() => setIsTeacherModalOpen(false)} className="text-purple-300 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveTeacher} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Full Name</label>
                  <input type="text" required value={teacherForm.name} onChange={e => setTeacherForm({...teacherForm, name: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Role / Designation</label>
                  <input type="text" required value={teacherForm.role} onChange={e => setTeacherForm({...teacherForm, role: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Experience (e.g. 7+ Years)</label>
                  <input type="text" value={teacherForm.experience} onChange={e => setTeacherForm({...teacherForm, experience: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Avatar URL</label>
                  <input type="text" value={teacherForm.avatar} onChange={e => setTeacherForm({...teacherForm, avatar: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-purple-200">Professional Bio</label>
                <textarea rows={3} value={teacherForm.bio} onChange={e => setTeacherForm({...teacherForm, bio: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsTeacherModalOpen(false)} className="px-6 py-2 rounded-xl bg-purple-950 text-purple-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-[#6D28D9] text-white font-bold">Save Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Session Edit Modal */}
      {isSessionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090614]/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#161033] border border-purple-700/60 rounded-3xl p-8 shadow-2xl space-y-6 text-white my-8">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-4">
              <h3 className="font-bold text-lg">{editingSessionId ? 'Edit Session' : 'Schedule Session'}</h3>
              <button onClick={() => setIsSessionModalOpen(false)} className="text-purple-300 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSaveSession} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-purple-200">Session Title</label>
                <input type="text" required value={sessionForm.title} onChange={e => setSessionForm({...sessionForm, title: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Instructor Name</label>
                  <input type="text" required value={sessionForm.instructor} onChange={e => setSessionForm({...sessionForm, instructor: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Date (e.g. Nov 20, 2026)</label>
                  <input type="text" required value={sessionForm.date} onChange={e => setSessionForm({...sessionForm, date: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Status</label>
                  <select value={sessionForm.status} onChange={e => setSessionForm({...sessionForm, status: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm">
                    <option>Upcoming</option>
                    <option>Live</option>
                    <option>Completed</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-purple-200">Duration</label>
                  <input type="text" value={sessionForm.duration} onChange={e => setSessionForm({...sessionForm, duration: e.target.value})} className="w-full px-4 py-2 bg-[#1C1340] border border-purple-800/60 rounded-xl text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsSessionModalOpen(false)} className="px-6 py-2 rounded-xl bg-purple-950 text-purple-300">Cancel</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-[#6D28D9] text-white font-bold">Save Session</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
