"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
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

  const countyOptions = useMemo(() => {
    if (!selectedState) return [];
    try {
      const counties = scus.getCountiesByState(selectedState);
      return counties.map((c: string) => ({ value: c, label: c }));
    } catch (e) {
      return [];
    }
  }, [selectedState]);

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
    } catch (error) {
      setFormStatus("error");
    }
  };

  const scrollToSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("submit");
    if (!target) return;
    
    // If on desktop (width >= 768px), fallback to native browser scroll
    // which the user confirmed feels perfect for shorter desktop distances.
    if (window.innerWidth >= 768) {
      target.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // For phones, physical distance is longer due to stacked layout.
    // We enforce a custom 800ms duration with perfectly linear speed.
    const headerOffset = 96; // 80px header + 16px breathing room
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    const duration = 500; 
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Linear easing: perfectly constant speed from start to finish
      const ease = progress;
        
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col relative">
      {/* Full Page Loading Overlay */}
      {formStatus === "loading" && (
        <div className="fixed inset-0 z-[100] bg-[#FDFBF7]/90 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Spinning Circle */}
            <div className="absolute w-24 h-24 border-4 border-[#CFC6B8] border-t-[#E63946] rounded-full animate-spin"></div>
            {/* Skeleton Logo */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -12 224 224" className="w-12 h-12 opacity-80">
              <path d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z" fill="none" stroke="#111111" strokeWidth="24" strokeLinejoin="miter" />
              <path d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200" fill="none" stroke="#111111" strokeWidth="24" strokeLinejoin="miter" />
              <rect x="116" y="150" width="24" height="24" fill="#E63946" />
            </svg>
          </div>
          <p className="mt-8 font-bold tracking-widest text-sm uppercase text-[#1A1A1A] animate-pulse">
            Encrypting & Submitting Case...
          </p>
        </div>
      )}

      {/* Header - Fixed Padding & Sizing */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-black/5 bg-[#E8DFD4] sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="RouteDefense Logo" width={32} height={32} className="w-8 h-8" />
          <span className="font-bold tracking-widest text-sm uppercase text-[#1A1A1A]">RouteDefense</span>
        </Link>
        <nav className="flex items-center">
          <button className="text-sm font-medium tracking-wide text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors uppercase">
            Lawyer Portal
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-8 pt-16 pb-20 md:py-48 max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-6 text-[#111111]">
            Resolve Your Ticket. <br />
            <span className="text-[#666666] font-medium">Protect Your Record.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] mb-12 max-w-2xl leading-relaxed">
            An institutional-grade pipeline connecting drivers facing immediate fines 
            with vetted, specialized traffic defense attorneys.
          </p>
          <button onClick={scrollToSubmit} className="bg-[#E63946] hover:bg-[#c92d39] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-sm">
            Submit Your Ticket
          </button>
        </section>

        {/* How It Works - 3 Step Grid */}
        <section className="border-t border-black/5 bg-[#E8DFD4] relative">
          <div className="max-w-6xl mx-auto px-8 py-24">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-16 text-center text-[#111111]">
              How RouteDefense Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="border border-[#CFC6B8] p-10 bg-white hover:border-[#C4BBAF] transition-colors duration-300 shadow-sm">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">01 //</span>
                <h3 className="text-xl font-semibold mb-4 text-[#111111]">Upload Citation</h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Securely submit your traffic citation details through our encrypted portal. We analyze the points and potential penalties instantly.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="border border-[#CFC6B8] p-10 bg-white hover:border-[#C4BBAF] transition-colors duration-300 shadow-sm">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">02 //</span>
                <h3 className="text-xl font-semibold mb-4 text-[#111111]">Attorney Match</h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Our algorithm routes your case to a vetted local defense attorney specializing in your specific violation and jurisdiction.
                </p>
              </div>

              {/* Step 3 */}
              <div className="border border-[#CFC6B8] p-10 bg-white hover:border-[#C4BBAF] transition-colors duration-300 shadow-sm">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">03 //</span>
                <h3 className="text-xl font-semibold mb-4 text-[#111111]">Strategic Defense</h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Your dedicated counsel executes an immediate defense strategy, protecting your driving record and mitigating fines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ticket Submission Form Section */}
        <section className="border-t border-black/5 bg-[#E8DFD4]">
          <div className="max-w-4xl mx-auto px-8 py-24">
            <div id="submit" className="text-center mb-12 scroll-mt-24">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-4 text-[#111111]">
                Submit Your Case For Review
              </h2>
              <p className="text-[#666666]">
                Provide your citation details below. A specialized defense attorney in your jurisdiction will contact you within 24 hours.
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 border border-[#CFC6B8] shadow-sm relative">
              {formStatus === "success" ? (
                <div className="text-center py-16 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-[#E8DFD4] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-3xl text-[#2A9D8F] mb-4">
                    Case Successfully Submitted
                  </h3>
                  <p className="text-[#4A4A4A] max-w-md mx-auto leading-relaxed">
                    Thank you. Your citation has been securely encrypted and routed. A specialized defense attorney will review your file and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="access_key" value="8afa92c0-e6bd-4cee-a464-ada76b23b0aa" />
                  <input type="hidden" name="subject" value="New RouteDefense Ticket Submission" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="fullName" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Full Name</label>
                      <input type="text" name="name" id="fullName" required className="border border-[#CFC6B8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Phone Number</label>
                      <input type="tel" name="phone" id="phone" required className="border border-[#CFC6B8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="(800) 555-0199" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Email Address</label>
                      <input type="email" name="email" id="email" required className="border border-[#CFC6B8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="john@example.com" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="citation" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Citation/Ticket Number</label>
                      <input type="text" name="citation_number" id="citation" required className="border border-[#CFC6B8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="e.g. T12345678" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="state" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">State of Issue</label>
                      <SearchableSelect 
                        name="state"
                        options={US_STATES} 
                        value={selectedState} 
                        onChange={(val) => {
                          setSelectedState(val);
                          setSelectedCounty("");
                        }} 
                        placeholder="Search State..." 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="county" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">County</label>
                      <SearchableSelect 
                        name="county"
                        options={countyOptions} 
                        value={selectedCounty} 
                        onChange={setSelectedCounty} 
                        placeholder={selectedState ? "Search County..." : "Select a State first"} 
                        disabled={!selectedState}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="details" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Incident Details</label>
                    <textarea name="details" id="details" rows={4} required className="border border-[#CFC6B8] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors resize-none" placeholder="Briefly describe the violation..."></textarea>
                  </div>

                  {formStatus === "error" && (
                    <p className="text-[#E63946] text-sm font-semibold">
                      An error occurred while submitting your case. Please try again.
                    </p>
                  )}

                  <button type="submit" disabled={formStatus === "loading"} className="w-full bg-[#111111] hover:bg-[#E63946] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 mt-4 disabled:opacity-50">
                    Request Free Case Evaluation
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-black/5 bg-[#E8DFD4] px-8 py-12 text-center">
        <p className="text-xs text-[#888888] tracking-widest uppercase">
          &copy; {new Date().getFullYear()} RouteDefense Legal Network. Secure & Confidential.
        </p>
      </footer>
    </div>
  );
}
