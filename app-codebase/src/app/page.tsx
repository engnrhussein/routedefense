"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col relative">
      {/* Full Page Loading Overlay */}
      {formStatus === "loading" && (
        <div className="fixed inset-0 z-[100] bg-[#FDFBF7]/90 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Spinning Circle */}
            <div className="absolute w-24 h-24 border-4 border-[#EBE6DD] border-t-[#E63946] rounded-full animate-spin"></div>
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
      <header className="px-8 py-6 flex items-center justify-between border-b border-black/5 bg-[#F9F6EE] sticky top-0 z-50">
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
        <section className="px-8 py-32 md:py-48 max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-6 text-[#111111]">
            Resolve Your Ticket. <br />
            <span className="text-[#666666] font-medium">Protect Your Record.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#4A4A4A] mb-12 max-w-2xl leading-relaxed">
            An institutional-grade pipeline connecting drivers facing immediate fines 
            with vetted, specialized traffic defense attorneys.
          </p>
          <a href="#submit" className="bg-[#E63946] hover:bg-[#c92d39] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-sm">
            Submit Your Ticket
          </a>
        </section>

        {/* How It Works - 3 Step Grid */}
        <section className="border-t border-black/5 bg-[#F9F6EE] relative">
          <div className="max-w-6xl mx-auto px-8 py-24">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-16 text-center text-[#111111]">
              How RouteDefense Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="border border-[#EBE6DD] p-10 bg-white hover:border-[#D0C9BE] transition-colors duration-300 shadow-sm">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">01 //</span>
                <h3 className="text-xl font-semibold mb-4 text-[#111111]">Upload Citation</h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Securely submit your traffic citation details through our encrypted portal. We analyze the points and potential penalties instantly.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="border border-[#EBE6DD] p-10 bg-white hover:border-[#D0C9BE] transition-colors duration-300 shadow-sm">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">02 //</span>
                <h3 className="text-xl font-semibold mb-4 text-[#111111]">Attorney Match</h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  Our algorithm routes your case to a vetted local defense attorney specializing in your specific violation and jurisdiction.
                </p>
              </div>

              {/* Step 3 */}
              <div className="border border-[#EBE6DD] p-10 bg-white hover:border-[#D0C9BE] transition-colors duration-300 shadow-sm">
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
        <section id="submit" className="border-t border-black/5 bg-[#F9F6EE] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-8 py-24">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-4 text-[#111111]">
                Submit Your Case For Review
              </h2>
              <p className="text-[#666666]">
                Provide your citation details below. A specialized defense attorney in your jurisdiction will contact you within 24 hours.
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 border border-[#EBE6DD] shadow-sm relative">
              {formStatus === "success" ? (
                <div className="text-center py-16 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-[#F9F6EE] rounded-full flex items-center justify-center mx-auto mb-6">
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
                      <input type="text" name="name" id="fullName" required className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Email Address</label>
                      <input type="email" name="email" id="email" required className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Phone Number</label>
                      <input type="tel" name="phone" id="phone" required className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="(800) 555-0199" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="state" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">State of Issue</label>
                      <select name="state" id="state" required className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors appearance-none text-[#1A1A1A] h-[46px] overflow-y-auto">
                        <option value="">Select State</option>
                        <option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="citation" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Citation/Ticket Number</label>
                    <input type="text" name="citation_number" id="citation" required className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="e.g. T12345678" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="details" className="text-xs font-semibold tracking-widest uppercase text-[#4A4A4A]">Incident Details</label>
                    <textarea name="details" id="details" rows={4} required className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors resize-none" placeholder="Briefly describe the violation..."></textarea>
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
      <footer className="border-t border-black/5 bg-[#F9F6EE] px-8 py-12 text-center">
        <p className="text-xs text-[#888888] tracking-widest uppercase">
          &copy; {new Date().getFullYear()} RouteDefense Legal Network. Secure & Confidential.
        </p>
      </footer>
    </div>
  );
}
