"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Scale, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  X, 
  MapPin, 
  Phone, 
  FileCheck2, 
  AlertTriangle, 
  Gavel, 
  Lock, 
  ShieldAlert,
  Car,
  ChevronRight,
  Sparkles,
  Award,
  Layers
} from "lucide-react";
// @ts-expect-error missing types
import scus from "state-counties-us";
import SearchableSelect from "@/components/SearchableSelect";

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("how-it-works");
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const countyOptions = useMemo(() => {
    if (!selectedState) return [];
    try {
      const counties = scus.getCountiesByState(selectedState);
      return counties.map((c: string) => ({ value: c, label: c }));
    } catch {
      return [];
    }
  }, [selectedState]);

  // Active section tracking on scroll
  useEffect(() => {
    const sectionIds = ["how-it-works", "guidance", "specialties", "coverage", "submit-section"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth slide navigation handler
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    const headerOffset = 84;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    setActiveSection(sectionId);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const stages = [
    {
      num: "01",
      title: "Immediate Roadside Protocol",
      badge: "Crucial First Step",
      icon: ShieldAlert,
      shortDesc: "Sign to acknowledge receipt, never argue, and never admit guilt on the record.",
      details: [
        "Signing the citation is solely an acknowledgement of receipt, NOT an admission of fault.",
        "Do not offer roadside admissions or excuses; bodycam recordings are requested by prosecutors.",
        "Politely request the officer's measurement method (Radar, Lidar Laser, Visual Pacing, or Aircraft)."
      ]
    },
    {
      num: "02",
      title: "Photograph & Docket Capture",
      badge: "Evidence Integrity",
      icon: FileCheck2,
      shortDesc: "Capture high-resolution photos of the citation ticket, court dates, and road conditions.",
      details: [
        "Take clear photos of the ticket number, charging statute, county, and court appearance deadline.",
        "Note weather conditions, traffic density, and construction zone signage positions immediately.",
        "Do not rush to pay the court fine online — paying automatically triggers license points and insurance surcharges."
      ]
    },
    {
      num: "03",
      title: "Encrypted Portal Upload",
      badge: "Automated Routing",
      icon: UploadCloud,
      shortDesc: "Transmit your citation to RouteDefense for instant jurisdictional mapping and statute review.",
      details: [
        "Our intake algorithm parses the violation code against county court precedents across 3,143 counties.",
        "Your file is routed exclusively to verified defense counsel who regularly practice in that courthouse.",
        "Receive a customized defense analysis identifying calibration flaws or dismissal opportunities within 24 hours."
      ]
    },
    {
      num: "04",
      title: "Court Appearance & Defense",
      badge: "Zero-Point Goal",
      icon: Gavel,
      shortDesc: "Your attorney appears on your behalf to negotiate dismissals, reductions, and clean records.",
      details: [
        "In over 90% of traffic proceedings, your attorney appears in court on your behalf with no client presence needed.",
        "Counsel files formal discovery motions requesting radar calibration logs and officer training certificates.",
        "Cases are aggressively resolved via complete statutory dismissal or converted into non-moving equipment violations."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-[family-name:var(--font-geist-sans)] selection:bg-[#E63946] selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* Full Page Loading Animation Overlay (Preserved exactly as requested) */}
      {formStatus === "loading" && (
        <div className="fixed inset-0 z-[100] bg-[#FAFAFA]/95 backdrop-blur-md flex flex-col items-center justify-center p-6">
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-28 h-28 border-4 border-[#E5E7EB] border-t-[#E63946] rounded-full animate-spin"></div>
            <div className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 224 224" className="w-12 h-12 opacity-90">
                <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#111111" strokeWidth="24" strokeLinejoin="miter" />
                <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#111111" strokeWidth="24" strokeLinejoin="miter" />
                <rect x="116" y="150" width="24" height="24" fill="#E63946" />
              </svg>
            </div>
          </div>
          <p className="font-bold tracking-[0.2em] text-sm uppercase text-[#111111] animate-pulse">
            Encrypting & Submitting Case...
          </p>
          <p className="text-xs text-[#666666] tracking-wider uppercase mt-2">
            Routing to verified jurisdiction counsel
          </p>
        </div>
      )}

      {/* Navigation Bar - Frosted Glass with Interactive Slide Scrolling & Active Underline Highlight */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-9 h-9 relative group-hover:scale-105 transition-transform duration-300">
              <Image src="/logo.svg" alt="RouteDefense Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-lg md:text-xl tracking-tight text-[#111111]">
                ROUTEDEFENSE
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#E63946] uppercase mt-0.5">
                Premium Legal Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Active Highlights & Smooth Slide */}
          <div className="hidden lg:flex items-center gap-10 text-xs font-bold tracking-widest uppercase">
            
            <a 
              href="#how-it-works"
              onClick={(e) => scrollToSection(e, "how-it-works")}
              className={`relative py-1 transition-colors duration-200 ${
                activeSection === "how-it-works" ? "text-[#E63946]" : "text-[#4A4A4A] hover:text-[#111111]"
              }`}
            >
              How It Works
              {activeSection === "how-it-works" && (
                <motion.span 
                  layoutId="activeNavUnderline" 
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E63946]" 
                />
              )}
            </a>

            <a 
              href="#guidance"
              onClick={(e) => scrollToSection(e, "guidance")}
              className={`relative py-1 transition-colors duration-200 ${
                activeSection === "guidance" ? "text-[#E63946]" : "text-[#4A4A4A] hover:text-[#111111]"
              }`}
            >
              Driver Guidance
              {activeSection === "guidance" && (
                <motion.span 
                  layoutId="activeNavUnderline" 
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E63946]" 
                />
              )}
            </a>

            <a 
              href="#specialties"
              onClick={(e) => scrollToSection(e, "specialties")}
              className={`relative py-1 transition-colors duration-200 ${
                activeSection === "specialties" ? "text-[#E63946]" : "text-[#4A4A4A] hover:text-[#111111]"
              }`}
            >
              Legal Specialties
              {activeSection === "specialties" && (
                <motion.span 
                  layoutId="activeNavUnderline" 
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E63946]" 
                />
              )}
            </a>

            <a 
              href="#coverage"
              onClick={(e) => scrollToSection(e, "coverage")}
              className={`relative py-1 transition-colors duration-200 ${
                activeSection === "coverage" ? "text-[#E63946]" : "text-[#4A4A4A] hover:text-[#111111]"
              }`}
            >
              50-State Coverage
              {activeSection === "coverage" && (
                <motion.span 
                  layoutId="activeNavUnderline" 
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-[#E63946]" 
                />
              )}
            </a>

          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => scrollToSection(e, "submit-section")} 
              className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#111111] text-white px-5 md:px-7 py-3 text-xs font-bold tracking-widest uppercase transition-colors duration-300 shadow-xs"
            >
              <span>Submit Ticket</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* HERO SECTION: Tightened padding, crisp architectural slate/white contrast */}
        <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 px-6 lg:px-12 overflow-hidden bg-[#FAFAFA]">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E63946]/5 rounded-full blur-[130px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-slate-200/50 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

          <div className="max-w-[1600px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Bold Editorial Headline */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="lg:col-span-7 flex flex-col items-start"
              >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-[#E5E7EB] bg-white rounded-full text-xs font-bold tracking-wider uppercase text-[#111111] mb-6 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse"></span>
                  Institutional Traffic Defense Network
                </div>

                <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#111111] leading-[1.02] tracking-tight mb-6">
                  Defend your record. <br />
                  <span className="text-[#888888] font-normal italic">Dismiss your citation.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[#4A4A4A] font-light leading-relaxed max-w-2xl mb-8">
                  RouteDefense connects drivers facing immediate fines, court summons, and insurance hikes with vetted, specialized traffic defense attorneys across all 50 states and 3,143 counties.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
                  <button 
                    onClick={(e) => scrollToSection(e, "submit-section")}
                    className="inline-flex items-center justify-center gap-3 bg-[#E63946] hover:bg-[#111111] text-white px-8 py-4 font-bold tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 shadow-sm"
                  >
                    <span>Request Free Case Evaluation</span>
                    <ArrowUpRight size={16} />
                  </button>
                  <button 
                    onClick={(e) => scrollToSection(e, "how-it-works")}
                    className="inline-flex items-center justify-center gap-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white px-8 py-4 font-bold tracking-widest uppercase text-xs sm:text-sm transition-all duration-300 bg-white"
                  >
                    <span>Explore How It Works</span>
                  </button>
                </div>

                {/* Trust Metrics Strip */}
                <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E5E7EB] w-full max-w-xl">
                  <div>
                    <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#111111]">98.4%</div>
                    <div className="text-[11px] font-semibold tracking-wider text-[#666666] uppercase mt-1">Resolution Rate</div>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#111111]">50</div>
                    <div className="text-[11px] font-semibold tracking-wider text-[#666666] uppercase mt-1">States Covered</div>
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-[#111111]">$0</div>
                    <div className="text-[11px] font-semibold tracking-wider text-[#666666] uppercase mt-1">Upfront Evaluation</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Commercial Photograph Hero Showcase (Realistic photo preserved) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="lg:col-span-5 relative"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xl bg-white">
                  <Image 
                    src="/images/ticket-handover.jpg" 
                    alt="Driver receiving a traffic citation roadside"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Warning Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-lg flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#E63946]/10 flex items-center justify-center shrink-0">
                      <ShieldAlert className="text-[#E63946] w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">Do Not Pay Without Legal Review</h4>
                      <p className="text-[11px] text-[#555555] leading-snug">Paying admits guilt, triggers DMV points, and raises insurance rates for 3–5 years.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* HOW IT WORKS: High-End Vector/Interactive 4-Stage Resolution Engine (Replaces the cartoonish cut-off image) */}
        <section id="how-it-works" className="py-24 px-6 lg:px-12 bg-white border-t border-b border-[#E5E7EB] scroll-mt-20">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-[#E63946] font-bold text-xs tracking-[0.25em] uppercase block mb-3">
                  System Architecture & Process
                </span>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-[#111111] leading-tight">
                  How RouteDefense resolves your ticket.
                </h2>
                <div className="w-16 h-1 bg-[#E63946] mt-4 mb-4"></div>
                <p className="text-[#555555] text-base font-light leading-relaxed">
                  A calibrated, 4-stage institutional pipeline engineered to protect your license, challenge municipal evidentiary burdens, and eliminate courtroom appearances.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#777777]">
                <Layers size={16} className="text-[#E63946]" />
                <span>Interactive 4-Stage Workflow</span>
              </div>
            </div>

            {/* Stage Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stages.map((stage, idx) => {
                const IconComponent = stage.icon;
                const isSelected = selectedStage === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedStage(idx)}
                    className={`cursor-pointer border p-6 transition-all duration-300 relative ${
                      isSelected 
                        ? 'border-[#111111] bg-[#FAFAFA] shadow-md ring-1 ring-[#111111]' 
                        : 'border-[#E5E7EB] bg-white hover:border-[#111111]/50'
                    }`}
                  >
                    {/* Active accent top bar */}
                    {isSelected && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E63946]"></div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#E63946] tracking-widest">
                        STAGE {stage.num} //
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#111111] text-white' : 'bg-slate-100 text-[#555555]'
                      }`}>
                        <IconComponent size={16} />
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-[#111111] uppercase tracking-wide mb-2">
                      {stage.title}
                    </h3>
                    
                    <p className="text-xs text-[#666666] leading-relaxed">
                      {stage.shortDesc}
                    </p>

                    <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#E63946] uppercase tracking-wider">
                      <span>{isSelected ? "Inspecting Protocol" : "Click to Inspect"}</span>
                      <ChevronRight size={13} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Deep Stage Inspection Panel */}
            <div className="border border-[#E5E7EB] bg-[#FAFAFA] p-8 md:p-12 relative overflow-hidden">
              <div className="max-w-4xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5E7EB] text-[11px] font-bold tracking-wider uppercase text-[#E63946] mb-4">
                  <Award size={14} />
                  {stages[selectedStage].badge}
                </div>

                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-[#111111] mb-6">
                  Stage {stages[selectedStage].num}: {stages[selectedStage].title}
                </h3>

                <div className="space-y-4">
                  {stages[selectedStage].details.map((point, i) => (
                    <div key={i} className="flex items-start gap-4 text-sm text-[#333333]">
                      <div className="w-2 h-2 rounded-full bg-[#E63946] mt-2 shrink-0"></div>
                      <p className="leading-relaxed font-light">{point}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-[#777777] font-medium uppercase tracking-wider">
                    Protocol active across all 3,143 US county municipal courts
                  </p>
                  <button 
                    onClick={(e) => scrollToSection(e, "submit-section")}
                    className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#E63946] text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    <span>Upload Citation For Stage 03</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* DRIVER GUIDANCE: Critical Roadside Rules & What To Do */}
        <section id="guidance" className="py-24 px-6 lg:px-12 bg-[#FAFAFA] scroll-mt-20">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="max-w-3xl mb-16">
              <span className="text-[#E63946] font-bold text-xs tracking-[0.25em] uppercase block mb-3">
                Driver Defense Rules
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-[#111111] leading-tight mb-6">
                Critical rules every driver must know.
              </h2>
              <div className="w-16 h-1 bg-[#E63946] mb-6"></div>
              <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed">
                The municipal traffic court system relies on uninformed drivers who simply pay citations without realizing the consequences. Here is what you must understand before taking action.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white border border-[#E5E7EB] p-8 hover:border-[#111111] transition-all duration-300 shadow-xs">
                <div className="w-12 h-12 bg-[#E63946]/10 text-[#E63946] flex items-center justify-center rounded-full mb-6">
                  <AlertTriangle size={22} />
                </div>
                <h3 className="font-bold text-base text-[#111111] uppercase tracking-wide mb-3">
                  Paying the Fine is a Guilty Plea
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                  When you pay the ticket online or mail a check, you legally waive your right to a trial and plead guilty. The conviction is reported to the state DMV, points are added, and auto insurers raise rates for 3 to 5 years.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-[#E5E7EB] p-8 hover:border-[#111111] transition-all duration-300 shadow-xs">
                <div className="w-12 h-12 bg-[#E63946]/10 text-[#E63946] flex items-center justify-center rounded-full mb-6">
                  <FileText size={22} />
                </div>
                <h3 className="font-bold text-base text-[#111111] uppercase tracking-wide mb-3">
                  Speed Radar Must Be Verified
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                  Police speed measurement devices (Lidar, Radar, Vascar) require strict daily calibration tests with certified tuning forks. If an issuing agency fails to produce calibration logs upon defense request, the case can be thrown out.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-[#E5E7EB] p-8 hover:border-[#111111] transition-all duration-300 shadow-xs">
                <div className="w-12 h-12 bg-[#E63946]/10 text-[#E63946] flex items-center justify-center rounded-full mb-6">
                  <Scale size={22} />
                </div>
                <h3 className="font-bold text-base text-[#111111] uppercase tracking-wide mb-3">
                  You Don't Have to Appear in Court
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                  Most drivers dread spending hours in court. When you retain affiliated defense counsel through RouteDefense, your attorney files an Entry of Appearance and represents you in docket hearings while you continue working.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* LEGAL SPECIALTIES: Institutional Capabilities with Attorney Review Photo */}
        <section id="specialties" className="py-24 px-6 lg:px-12 bg-white border-t border-b border-[#E5E7EB] scroll-mt-20">
          <div className="max-w-[1600px] mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Text & Feature Capabilities */}
              <div className="lg:col-span-7">
                <span className="text-[#E63946] font-bold text-xs tracking-[0.25em] uppercase block mb-3">
                  Defense Specialties
                </span>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-[#111111] leading-tight mb-6">
                  Engineered for strict statutory defense.
                </h2>
                <div className="w-16 h-1 bg-[#E63946] mb-8"></div>
                <p className="text-[#555555] text-base md:text-lg mb-10 leading-relaxed font-light">
                  Traffic defense is not guesswork—it is rigorous procedural scrutiny. Our network of attorneys audits speed measurement equipment calibrations, constitutional traffic stops, and officer evidentiary burdens.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  
                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#E63946] mt-2 shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-[#111111] mb-1">
                        Speeding & Radar/Lidar Defense
                      </h3>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Challenging calibration logs, tuning fork tests, visual pacing errors, and speed trap statutory thresholds.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#E63946] mt-2 shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-[#111111] mb-1">
                        Commercial Drivers & CDL Defense
                      </h3>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Protecting professional livelihoods, PSP scores, and FMCSA safety points for commercial haulers and operators.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#E63946] mt-2 shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-[#111111] mb-1">
                        Reckless Driving & High Speed
                      </h3>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Converting serious misdemeanor criminal traffic charges into non-moving equipment infractions with zero license points.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#E63946] mt-2 shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-wider text-[#111111] mb-1">
                        Automated Camera & Red Light Citations
                      </h3>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Demanding proof of driver identity, yellow light timing minimums, and strict maintenance certification.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Commercial Photograph Showcase: Attorney Review (Preserved as requested) */}
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xl bg-white">
                <Image 
                  src="/images/attorney-review.jpg" 
                  alt="Elite defense attorney reviewing citation docket at executive desk"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] tracking-widest uppercase font-bold text-[#E63946]">Verified Network</p>
                      <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">County-Specific Defense Counsel</h4>
                    </div>
                    <Scale className="text-[#111111] w-5 h-5" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 50-STATE COVERAGE HIGHLIGHT */}
        <section id="coverage" className="py-20 px-6 lg:px-12 bg-[#FAFAFA] scroll-mt-20">
          <div className="max-w-[1600px] mx-auto text-center">
            <span className="text-[#E63946] font-bold text-xs tracking-[0.25em] uppercase block mb-3">
              Nationwide Jurisdiction
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] mb-6">
              Complete coverage across 50 States & 3,143 Counties.
            </h2>
            <p className="text-base text-[#555555] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Traffic court procedures vary dramatically between municipal jurisdictions. RouteDefense automatically routes your file to counsel licensed and seasoned in your specific courthouse.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#E5E7EB] bg-white text-xs font-bold tracking-widest uppercase text-[#111111] shadow-xs">
              <MapPin size={16} className="text-[#E63946]" />
              Select your State and County in the intake portal below
            </div>
          </div>
        </section>

        {/* TICKET SUBMISSION PORTAL: Next-Level Form with Document Upload & Cascading Inventory */}
        <section id="submit-section" className="py-24 px-6 lg:px-12 bg-white border-t border-[#E5E7EB] scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-12">
              <span className="text-[#E63946] font-bold text-xs tracking-[0.25em] uppercase block mb-3">
                Encrypted Intake Portal
              </span>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#111111]">
                Submit Your Ticket for Review
              </h2>
              <p className="text-sm md:text-base text-[#666666] max-w-xl mx-auto leading-relaxed">
                Provide your citation details and upload a photo or PDF of your ticket. A vetted defense attorney in your county will evaluate your options within 24 hours.
              </p>
            </div>

            <div className="bg-[#FAFAFA] p-8 sm:p-12 border border-[#E5E7EB] shadow-sm relative">
              
              {/* SUCCESS CONFIRMATION STATE */}
              {formStatus === "success" ? (
                <div className="text-center py-16 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-[#111111] mb-4">
                    Case Successfully Submitted
                  </h3>
                  <div className="w-12 h-1 bg-emerald-500 mx-auto mb-6"></div>
                  <p className="text-[#4A4A4A] max-w-md mx-auto leading-relaxed text-sm mb-8">
                    Your citation details and uploaded documents have been securely encrypted and routed. A specialized defense attorney assigned to your jurisdiction will contact you shortly.
                  </p>
                  <button 
                    onClick={() => { setFormStatus("idle"); setSelectedFile(null); }}
                    className="inline-flex items-center gap-2 border border-[#111111] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#111111] hover:bg-[#111111] hover:text-white transition-colors bg-white"
                  >
                    Submit Another Citation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Web3Forms Configuration */}
                  <input type="hidden" name="access_key" value="8afa92c0-e6bd-4cee-a464-ada76b23b0aa" />
                  <input type="hidden" name="subject" value="New RouteDefense Ticket & Document Submission" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                  {/* Personal Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="fullName" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                        Full Legal Name
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        id="fullName" 
                        required 
                        className="border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#E63946] transition-colors" 
                        placeholder="Driver as stated on ticket" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        required 
                        className="border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#E63946] transition-colors" 
                        placeholder="(800) 555-0199" 
                      />
                    </div>
                  </div>

                  {/* Email & Citation Number */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        required 
                        className="border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#E63946] transition-colors" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="citation" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                        Citation / Ticket Number
                      </label>
                      <input 
                        type="text" 
                        name="citation_number" 
                        id="citation" 
                        required 
                        className="border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#E63946] transition-colors" 
                        placeholder="e.g. TR-2026-98124" 
                      />
                    </div>
                  </div>

                  {/* Cascading State & County Selection (Preserved Inventory) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="state" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                        State of Issue
                      </label>
                      <SearchableSelect 
                        name="state"
                        options={US_STATES} 
                        value={selectedState} 
                        onChange={(val) => {
                          setSelectedState(val);
                          setSelectedCounty("");
                        }} 
                        placeholder="Search & Select State..." 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="county" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                        County Jurisdiction
                      </label>
                      <SearchableSelect 
                        name="county"
                        options={countyOptions} 
                        value={selectedCounty} 
                        onChange={setSelectedCounty} 
                        placeholder={selectedState ? "Search & Select County..." : "Select a State first"} 
                        disabled={!selectedState}
                      />
                    </div>
                  </div>

                  {/* Violation Type */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="violationType" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                      Primary Violation Type
                    </label>
                    <select 
                      name="violation_type" 
                      id="violationType" 
                      required 
                      className="border border-[#E5E7EB] bg-white px-4 py-3.5 text-sm focus:outline-none focus:border-[#E63946] transition-colors text-[#111111]"
                    >
                      <option value="">Select Category...</option>
                      <option value="Speeding">Speeding Violation</option>
                      <option value="CDL Commercial">Commercial Driver / CDL Infraction</option>
                      <option value="Reckless Driving">Reckless Driving / Careless Driving</option>
                      <option value="Red Light / Camera">Red Light or Automated Camera Citation</option>
                      <option value="Suspended License">Suspended License / Registration Issue</option>
                      <option value="Failure to Obey / Stop">Stop Sign or Traffic Control Device</option>
                      <option value="Other">Other Moving / Non-Moving Violation</option>
                    </select>
                  </div>

                  {/* DOCUMENT UPLOAD */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                      Attach Citation or Court Notice (PDF, JPG, PNG)
                    </label>
                    
                    <input 
                      type="file" 
                      name="attachment" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden" 
                    />

                    {!selectedFile ? (
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed ${isDragging ? 'border-[#E63946] bg-[#E63946]/5' : 'border-[#E5E7EB] hover:border-[#111111] bg-white'} p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3`}
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-50 border border-[#E5E7EB] flex items-center justify-center shadow-xs">
                          <UploadCloud className="text-[#E63946] w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                            Click to upload or drag & drop file
                          </p>
                          <p className="text-[11px] text-[#777777] mt-0.5">
                            Front/back photos of traffic ticket or court summons (Max 10MB)
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-[#E5E7EB] bg-white p-4 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText className="text-[#E63946] w-6 h-6 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-bold text-[#111111] truncate">{selectedFile.name}</p>
                            <p className="text-[10px] text-[#666666]">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for secure upload
                            </p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={removeFile}
                          className="p-1.5 hover:bg-slate-100 text-[#666666] hover:text-[#E63946] transition-colors"
                          title="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Incident Details */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="details" className="text-xs font-bold tracking-widest uppercase text-[#4A4A4A]">
                      Incident Details & Court Notes
                    </label>
                    <textarea 
                      name="details" 
                      id="details" 
                      rows={3} 
                      required 
                      className="border border-[#E5E7EB] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors resize-none" 
                      placeholder="Include posted speed vs. alleged speed, weather conditions, or prior offenses..."
                    ></textarea>
                  </div>

                  {formStatus === "error" && (
                    <div className="p-4 border border-[#E63946]/30 bg-[#E63946]/5 text-[#E63946] text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle size={16} />
                      <span>An error occurred while transmitting your case. Please check your connection and try again.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={formStatus === "loading"} 
                    className="w-full bg-[#111111] hover:bg-[#E63946] text-white py-5 text-xs sm:text-sm font-bold tracking-widest uppercase transition-colors duration-300 mt-4 disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Lock size={15} />
                    <span>Request Free Case Evaluation · Encrypted Intake</span>
                  </button>

                  <p className="text-[10px] text-center text-[#777777] tracking-wider uppercase mt-3">
                    Submitting this form does not create an attorney-client relationship until formal engagement is confirmed.
                  </p>
                </form>
              )}

            </div>
          </div>
        </section>

      </main>

      {/* RICH INSTITUTIONAL FOOTER with same-tab docsroute links */}
      <footer className="bg-[#111111] text-white pt-20 pb-12 px-6 lg:px-12 border-t border-black">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
            
            {/* Branding Column */}
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-8 h-8 relative">
                  <Image src="/logo.svg" alt="RouteDefense Logo" fill className="object-contain brightness-0 invert" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-lg tracking-tight text-white">ROUTEDEFENSE</span>
                  <span className="text-[8px] font-bold tracking-[0.25em] text-[#E63946] uppercase mt-0.5">
                    Premium Legal Network
                  </span>
                </div>
              </div>
              <p className="text-white/60 text-xs font-light leading-relaxed mb-6">
                Institutional-grade legal network delivering strategic traffic citation defense and driver record protection across all US jurisdictions.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/5 text-[10px] font-bold tracking-wider uppercase text-white/80">
                <ShieldCheck size={14} className="text-[#E63946]" />
                Bar Compliant Intake Protocol
              </div>
            </div>

            {/* Practice Areas */}
            <div>
              <h4 className="font-bold text-xs tracking-widest uppercase mb-6 text-white/90 flex items-center gap-2">
                <Gavel size={15} className="text-[#E63946]" /> Defense Specialties
              </h4>
              <ul className="space-y-3 text-xs text-white/60 font-light">
                <li><a href="#specialties" onClick={(e) => scrollToSection(e, "specialties")} className="hover:text-white transition-colors">Speeding & Radar Calibration Audits</a></li>
                <li><a href="#specialties" onClick={(e) => scrollToSection(e, "specialties")} className="hover:text-white transition-colors">Commercial Drivers & CDL Violations</a></li>
                <li><a href="#specialties" onClick={(e) => scrollToSection(e, "specialties")} className="hover:text-white transition-colors">Reckless Driving & High-Speed Docket</a></li>
                <li><a href="#specialties" onClick={(e) => scrollToSection(e, "specialties")} className="hover:text-white transition-colors">Automated Red Light & Speed Cameras</a></li>
                <li><a href="#specialties" onClick={(e) => scrollToSection(e, "specialties")} className="hover:text-white transition-colors">Suspended License Reinstatement</a></li>
              </ul>
            </div>

            {/* Nationwide Headquarters & Jurisdiction */}
            <div>
              <h4 className="font-bold text-xs tracking-widest uppercase mb-6 text-white/90 flex items-center gap-2">
                <MapPin size={15} className="text-[#E63946]" /> Jurisdiction
              </h4>
              <p className="text-white/60 text-xs leading-relaxed font-light mb-4">
                Operating nationwide with affiliated licensed counsel in:
              </p>
              <div className="border border-white/10 bg-white/5 p-4 text-xs text-white/80 font-mono">
                <p className="font-bold text-white">50 US STATES</p>
                <p className="text-white/60 text-[11px] mt-1">3,143 County Municipal Courts</p>
              </div>
            </div>

            {/* Rapid Contact & Legal Docs (SAME TAB LINKS) */}
            <div>
              <h4 className="font-bold text-xs tracking-widest uppercase mb-6 text-white/90 flex items-center gap-2">
                <Phone size={15} className="text-[#E63946]" /> Legal Intake & Docs
              </h4>
              <ul className="space-y-3 text-xs text-white/60 font-light mb-6">
                <li><strong className="text-white">Emergency Hotline:</strong> (800) 555-0199</li>
                <li><strong className="text-white">Case Docket Email:</strong> cases@routedefensegroup.com</li>
                <li>
                  <strong className="text-white">Legal Docs Portal:</strong>{" "}
                  <a href="https://docs.routedefensegroup.com" className="text-[#E63946] hover:underline">
                    docs.routedefensegroup.com
                  </a>
                </li>
              </ul>
              <button 
                onClick={(e) => scrollToSection(e, "submit-section")}
                className="w-full bg-[#E63946] hover:bg-white hover:text-[#111111] text-white py-3 text-xs font-bold tracking-widest uppercase transition-colors duration-300"
              >
                Upload Citation Now
              </button>
            </div>

          </div>

          {/* Bottom Copyright & Legal Disclaimer (Same tab links for Privacy & Terms) */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium tracking-widest text-white/40 uppercase gap-4">
            <p>&copy; {new Date().getFullYear()} RouteDefense Group. All rights reserved.</p>
            
            <div className="flex gap-6 text-white/60">
              <a href="https://docs.routedefensegroup.com/privacy/" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="https://docs.routedefensegroup.com/terms/" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="https://docs.routedefensegroup.com/" className="hover:text-white transition-colors">
                Compliance Hub
              </a>
            </div>

            <p className="text-center md:text-right normal-case tracking-normal text-white/40 text-[10px] max-w-md">
              Attorney Advertising. RouteDefense Group is a legal technology and routing network. Prior results do not guarantee a similar outcome.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
