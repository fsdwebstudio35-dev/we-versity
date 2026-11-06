import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Award, 
  Code2, 
  Sparkles, 
  Linkedin, 
  Github, 
  ExternalLink, 
  ArrowRight, 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Rocket, 
  HeartHandshake,
  Send,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TEAM_MEMBERS, TeamMember, COMPANY_INFO } from '../data/maatiData';

interface TeamViewProps {
  onOpenQuoteModal: (serviceId?: string) => void;
  setActiveTab?: (tab: string) => void;
  members?: TeamMember[];
}

export const TeamView: React.FC<TeamViewProps> = ({
  onOpenQuoteModal,
  setActiveTab,
  members
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyRole, setApplyRole] = useState('Senior Full-Stack Engineer');
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantPortfolio, setApplicantPortfolio] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const departments = [
    { id: 'all', label: 'All Team Members' },
    { id: 'leadership', label: 'Executive & Leadership' },
    { id: 'engineering', label: 'Full-Stack Engineering' },
    { id: 'ai', label: 'AI & Generative Tech' },
    { id: 'growth', label: 'Growth & SEO' },
    { id: 'design', label: 'Creative & Design' },
  ];

  const teamData = members && members.length > 0 ? members : TEAM_MEMBERS;

  const filteredMembers = teamData.filter(member => {
    const matchesDept = selectedDepartment === 'all' || member.department === selectedDepartment;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      query === '' ||
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.bio.toLowerCase().includes(query) ||
      (member.techStack || []).some(tech => tech.toLowerCase().includes(query));
    return matchesDept && matchesSearch;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setAppliedSuccess(true);
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (err) {
        // ignore
      }
    }, 700);
  };

  const openApplyForRole = (roleTitle: string) => {
    setApplyRole(roleTitle);
    setAppliedSuccess(false);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* 1. Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider shadow-xs">
          <Users className="w-4 h-4 text-[#6D28D9]" />
          <span>The Minds Behind WeVersity</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#18113C] tracking-tight">
          Engineers, Architects &amp; <span className="text-[#6D28D9]">Growth Leaders</span>
        </h1>
        
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Meet our senior software engineers, system architects, and digital strategists based in Lahore and London. We build mission-critical web software, design AI systems, and lead production cohorts.
        </p>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-[#18113C]">25+</div>
            <div className="text-xs text-gray-500 font-medium">Software Craftsmen</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-[#6D28D9]">100%</div>
            <div className="text-xs text-gray-500 font-medium">In-House Engineers</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-[#18113C]">8+ Yrs</div>
            <div className="text-xs text-gray-500 font-medium">Avg Experience</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-center">
            <div className="text-xl sm:text-2xl font-display font-extrabold text-[#6D28D9]">250+</div>
            <div className="text-xs text-gray-500 font-medium">Live Deployments</div>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-purple-150/80 shadow-xs">
        {/* Department Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDepartment === dept.id
                  ? 'bg-[#6D28D9] text-white shadow-md shadow-purple-600/25 scale-[1.02]'
                  : 'bg-purple-50/60 text-gray-600 hover:text-gray-950 hover:bg-purple-100/60'
              }`}
            >
              {dept.label}
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
            placeholder="Search by name, role or tech..."
            className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl pl-9 pr-3.5 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#6D28D9] focus:ring-1 focus:ring-[#6D28D9]"
          />
        </div>
      </div>

      {/* 3. Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="group rounded-3xl bg-white border border-purple-150/90 hover:border-purple-400 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-2xl hover:shadow-purple-900/10 hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="space-y-5">
              {/* Member Head: Avatar + Info */}
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={member.imageUrl || member.avatar}
                    alt={member.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-purple-200 group-hover:border-[#6D28D9] shadow-sm transition-colors duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#6D28D9] text-white flex items-center justify-center border-2 border-white shadow-xs" title="Verified WeVersity Team Member">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="font-semibold text-purple-700">{member.departmentLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{member.experience}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#18113C] group-hover:text-[#6D28D9] transition-colors truncate">
                    {member.name}
                  </h3>

                  <p className="text-xs font-medium text-gray-600 truncate">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {member.bio}
              </p>

              {/* Key Contribution Badge */}
              <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-start gap-2.5 text-xs text-gray-700">
                <Award className="w-4 h-4 text-[#6D28D9] shrink-0 mt-0.5" />
                <span className="leading-snug"><strong>Impact:</strong> {member.keyAchievement}</span>
              </div>

              {/* Tech Stack */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Core Technologies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-50/70 text-purple-900 border border-purple-100 group-hover:border-purple-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenQuoteModal()}
                className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5 group/btn"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Discuss Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors flex items-center justify-center shrink-0"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-[#6D28D9]" />
                </a>
              )}

              {member.socials.portfolio && (
                <a
                  href={member.socials.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-colors flex items-center justify-center shrink-0"
                  title="View Live Portfolio"
                >
                  <ExternalLink className="w-4 h-4 text-[#6D28D9]" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Engineering Principles & Culture */}
      <div className="space-y-8 pt-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6D28D9]">How We Work</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#18113C]">
            Our Engineering Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            We don't outsource or cut corners. Every line of code is produced by dedicated craftsmen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-purple-150 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#18113C]">01. Zero-Bloat Code</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We handcraft modern React, Laravel, and Flutter architectures. No slow drag-and-drop page builders or fragile plugin chains.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-150 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#18113C]">02. Direct Architect Access</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Clients communicate directly with senior software architects and lead engineers, never account middlemen or sales reps.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-150 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#18113C]">03. 100% IP Ownership</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              You own all source code repositories, databases, and deployment keys. Complete intellectual property transfer upon project signoff.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-purple-150 shadow-xs space-y-3 hover:border-purple-300 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#18113C]">04. Production Mentorship</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our engineers don't just build client products; they actively train student cohorts, ensuring our team is always on the cutting edge.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Careers & Join Our Team Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#18103A] via-[#241756] to-[#18103A] text-white relative overflow-hidden shadow-xl border border-purple-800/40 space-y-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/60 text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>We are Hiring in Lahore &amp; Remote</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
            Want to Build Software With Us?
          </h2>
          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
            We are always seeking exceptional full-stack engineers, AI specialists, and UI/UX designers who care about clean code and craftsmanship.
          </p>
        </div>

        {/* Open Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Senior Full-Stack Engineer", type: "Full-Time • Lahore / Hybrid", stack: "Laravel, React, PostgreSQL" },
            { title: "Generative AI & LLM Specialist", type: "Full-Time • Remote / PK", stack: "Claude API, Python, Prompting" },
            { title: "UI/UX Product Designer", type: "Full-Time • Lahore Office", stack: "Figma, Design Systems, Tokens" },
          ].map((role, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-sm text-white">{role.title}</h3>
                <div className="text-xs text-purple-300 mt-1">{role.type}</div>
                <div className="text-[11px] text-purple-400 mt-2 font-mono">{role.stack}</div>
              </div>
              <button
                onClick={() => openApplyForRole(role.title)}
                className="py-2 px-3 rounded-xl bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all flex items-center justify-between"
              >
                <span>Apply for Position</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Quick Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-purple-150 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {appliedSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-gray-950">Application Submitted!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-gray-900">{applicantName}</strong>! Our engineering lead will review your profile for the <strong className="text-[#6D28D9]">{applyRole}</strong> position and reach out at <strong className="text-gray-900">{applicantEmail}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b border-gray-100 pb-4 mb-5">
                  <span className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider block mb-1">Career Opportunity</span>
                  <h3 className="text-xl font-display font-bold text-gray-950">Apply for {applyRole}</h3>
                  <p className="text-xs text-gray-500 mt-1">Submit your details below to connect with our talent team.</p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Asad Ullah"
                      className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Portfolio or GitHub / LinkedIn URL *</label>
                    <input
                      type="url"
                      required
                      value={applicantPortfolio}
                      onChange={(e) => setApplicantPortfolio(e.target.value)}
                      placeholder="https://github.com/yourhandle or portfolio link"
                      className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl px-3.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Brief Introduction &amp; Experience</label>
                    <textarea
                      rows={3}
                      value={applicantCover}
                      onChange={(e) => setApplicantCover(e.target.value)}
                      placeholder="Tell us about the hardest system you built or why you would like to join WeVersity..."
                      className="w-full bg-[#FAF9FD] border border-purple-150 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-[#6D28D9]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isApplying}
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#6D28D9] hover:bg-[#5B21B6] shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    {isApplying ? (
                      <span>Sending Application...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
