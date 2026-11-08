"use client";

import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  FileText,
  Upload,
  CheckCircle2,
  X,
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
  { value: "WY", label: "Wyoming" },
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitPortalRef = useRef<HTMLDivElement>(null);

  const formatPhoneNumber = (value: string): string => {
    let digits = value.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("1")) {
      digits = digits.slice(1);
    }
    digits = digits.slice(0, 10);

    if (digits.length === 0) return "";
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const countyOptions = useMemo(() => {
    if (!selectedState) return [];
    try {
      const counties = scus.getCountiesByState(selectedState);
      return counties.map((c: string) => ({ value: c, label: c }));
    } catch {
      return [];
    }
  }, [selectedState]);

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

  useEffect(() => {
    if (formStatus === "success" && submitPortalRef.current) {
      const targetY =
        submitPortalRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        104;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  }, [formStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/routedefense@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        }
      );

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-rdink font-sans selection:bg-rdaccent selection:text-white">
      {/* Navigation (KV Freight clean fixed bar) */}
      <nav className="fixed top-0 w-full z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-rdink/5">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg
              className="w-8 md:w-10 h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-12 -12 224 224"
              aria-hidden="true"
            >
              <path
                d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z"
                fill="none"
                stroke="#111111"
                strokeWidth="24"
                strokeLinejoin="miter"
              />
              <path
                d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200"
                fill="none"
                stroke="#111111"
                strokeWidth="24"
                strokeLinejoin="miter"
              />
              <rect x="116" y="150" width="24" height="24" fill="#e63946" />
            </svg>
            <div className="font-heading font-bold text-xl tracking-wide text-rdink flex flex-col justify-center leading-none mt-0.5">
              <span>ROUTEDEFENSE</span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase text-rdink/70">
            <a
              href="#services"
              className="hover:text-rdaccent transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#how-it-works"
              className="hover:text-rdaccent transition-colors"
            >
              Driver Protocol
            </a>
            <a
              href="#submit-case"
              className="hover:text-rdaccent transition-colors"
            >
              Submit Case
            </a>
            <a href="#contact" className="hover:text-rdaccent transition-colors">
              Contact
            </a>
          </div>

          <a
            href="#submit-case"
            className="md:hidden text-xs font-bold uppercase tracking-widest text-rdaccent"
          >
            Submit Ticket
          </a>
        </div>
      </nav>

      {/* Hero Section (KV Freight split layout + subtle accent washes) */}
      <section className="relative pt-32 pb-20 md:pt-40 lg:pt-28 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rdaccent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rdink/5 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl w-full"
          >
            <p className="font-heading text-rdaccent font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6">
              Nationwide Legal Network
            </p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-rdink leading-[1.05] tracking-tight mb-8">
              Defend your record. <br />
              <span className="text-rdink/40">Dismiss your citation.</span>
            </h1>
            <p className="text-lg md:text-2xl text-rdink/70 font-light leading-relaxed max-w-2xl mb-12">
              RouteDefense Group connects drivers facing citations, points, and
              court summons with specialized traffic counsel across all 50
              states.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#submit-case"
                className="inline-flex items-center justify-center gap-2 bg-rdaccent text-white px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-rdink transition-colors duration-300"
              >
                Submit Your Ticket <ArrowUpRight size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-rdink text-white border border-rdink px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-rdink/90 transition-colors duration-300"
              >
                Our Capabilities
              </a>
            </div>
          </motion.div>

          {/* Stacked Crest Emblem (Desktop Only, mirrors KV Freight hero emblem) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:flex justify-end w-full max-w-lg opacity-90 xl:mr-12"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 540"
              className="w-full h-auto"
              aria-hidden="true"
            >
              <g transform="translate(230, 28) scale(1.7)">
                <path
                  d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="22"
                  strokeLinejoin="miter"
                />
                <path
                  d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200"
                  fill="none"
                  stroke="#111111"
                  strokeWidth="22"
                  strokeLinejoin="miter"
                />
                <rect x="116" y="150" width="24" height="24" fill="#e63946" />
              </g>
              <text
                x="400"
                y="475"
                textAnchor="middle"
                fontFamily="'Montserrat', 'Inter', sans-serif"
                fontWeight="800"
                fontSize="62"
                fill="#111111"
                letterSpacing="10"
              >
                ROUTEDEFENSE
              </text>
              <text
                x="400"
                y="524"
                textAnchor="middle"
                fontFamily="'Montserrat', 'Inter', sans-serif"
                fontWeight="700"
                fontSize="26"
                letterSpacing="14"
              >
                <tspan fill="#111111">GROUP </tspan>
                <tspan fill="#e63946">LLC</tspan>
              </text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Approach / Capabilities Section (Exact KV Freight white split) */}
      <section id="services" className="py-24 bg-white px-6 scroll-mt-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-rdink mb-6">
                Engineered for <br />
                decisive resolution.
              </h2>
              <div className="w-20 h-1 bg-rdaccent mb-8" />
              <p className="text-rdink/70 text-lg mb-8 leading-relaxed font-light">
                Paying a ticket online is a permanent guilty plea that triggers
                DMV points and higher premiums. RouteDefense connects your case
                with vetted traffic counsel in all 3,143 US counties so
                hearings and evidentiary challenges are handled for you.
              </p>

              <ul className="space-y-4">
                {[
                  "Speeding, radar & lidar calibration defense",
                  "Commercial driver & CDL / PSP protection",
                  "Zero upfront fee for case evaluation",
                  "Courtroom appearances across all 50 states",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-rdink font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-rdaccent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] w-full bg-rdink/5 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/attorney-review.jpg"
                alt="Traffic defense attorney reviewing court citation docket"
                fill
                className="object-cover object-center opacity-95"
              />
              <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Driver Guidance Section (#how-it-works — Exact KV Freight 2-column split) */}
      <section
        id="how-it-works"
        className="py-24 px-6 bg-[#fafafa] border-t border-rdink/5 scroll-mt-20"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] w-full bg-rdink/5 rounded-2xl overflow-hidden order-2 lg:order-1"
            >
              <Image
                src="/images/guidance-illustration.jpg"
                alt="Traffic citation review and defense workflow"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-rdink mb-6">
                What to do after <br />
                receiving a ticket.
              </h2>
              <div className="w-20 h-1 bg-rdaccent mb-8" />
              <p className="text-rdink/70 text-lg mb-8 leading-relaxed font-light">
                Most drivers make the irreversible mistake of paying the court
                fine online, which legally enters a permanent guilty plea.
                Before taking action, follow these steps to protect your record.
              </p>

              <ul className="space-y-5">
                {[
                  {
                    title: "Stay calm and don't argue roadside.",
                    desc: "Signing the citation is not an admission of guilt—it only acknowledges receipt. Remain polite with the issuing officer.",
                  },
                  {
                    title: "Don't pay the fine online.",
                    desc: "Paying waives your defense and triggers DMV points. Photograph the full ticket showing the statute, county, and court deadline.",
                  },
                  {
                    title: "Upload your citation for review.",
                    desc: "Submit your ticket below so we can match your case with counsel who regularly practices in that specific county court.",
                  },
                  {
                    title: "Let your attorney handle the court date.",
                    desc: "In most traffic hearings, your lawyer appears on your behalf so you don't have to take time off work or step inside a courthouse.",
                  },
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-rdaccent mt-2.5 shrink-0" />
                    <div>
                      <h3 className="text-rdink font-medium text-base mb-0.5">
                        {step.title}
                      </h3>
                      <p className="text-rdink/70 text-sm leading-relaxed font-light">
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Evaluation Portal (#submit-case — Clean KV Freight Minimalism) */}
      <section
        id="submit-case"
        className="py-24 px-6 bg-white border-t border-rdink/5 scroll-mt-20"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <p className="font-heading text-rdaccent font-bold tracking-[0.2em] uppercase text-xs mb-4">
                Case Evaluation
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-rdink mb-6">
                Submit your citation <br />
                for review.
              </h2>
              <div className="w-20 h-1 bg-rdaccent mb-8" />
              <p className="text-rdink/70 text-lg font-light leading-relaxed mb-10">
                Attach a photo or PDF of your ticket and select the state and
                county where it was issued. A vetted defense attorney will
                review your options within 24 hours.
              </p>

              <div className="border-t border-rdink/10 pt-6 space-y-3 text-sm text-rdink/70 font-light">
                <p>
                  <strong className="font-semibold text-rdink">
                    Evaluation:
                  </strong>{" "}
                  $0 upfront review
                </p>
                <p>
                  <strong className="font-semibold text-rdink">
                    Coverage:
                  </strong>{" "}
                  50 States · 3,143 County Courts
                </p>
                <p>
                  <strong className="font-semibold text-rdink">
                    Direct Line:
                  </strong>{" "}
                  <a
                    href="tel:+16202140989"
                    className="hover:text-rdaccent transition-colors"
                  >
                    (620) 214-0989
                  </a>
                </p>
              </div>
            </div>

            <div
              ref={submitPortalRef}
              className="lg:col-span-7 bg-[#fafafa] border border-rdink/10 p-6 sm:p-10 rounded-2xl"
            >
              {formStatus === "success" ? (
                <div
                  className="py-14 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2
                    size={40}
                    className="text-rdink mx-auto mb-5"
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-rdink mb-3">
                    Case Submitted
                  </h3>
                  <div className="w-12 h-1 bg-rdaccent mx-auto mb-5" />
                  <p className="text-rdink/70 max-w-md mx-auto text-sm leading-relaxed font-light mb-8">
                    Your citation details have been routed for attorney review.
                    Expect direct contact regarding your county docket shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus("idle");
                      setSelectedFile(null);
                      setPhoneNumber("");
                      setSelectedState("");
                      setSelectedCounty("");
                    }}
                    className="inline-flex items-center justify-center border border-rdink px-6 py-3 text-xs font-bold uppercase tracking-widest text-rdink hover:bg-rdink hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Citation
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  action="https://formsubmit.co/routedefense@gmail.com"
                  method="POST"
                  encType="multipart/form-data"
                  className="space-y-6"
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="New RouteDefense Citation & Document Submission"
                  />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="text"
                    name="_honey"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fullName"
                        className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                      >
                        Full Legal Name{" "}
                        <span className="text-rdaccent" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="Driver Full Name"
                        id="fullName"
                        required
                        autoComplete="name"
                        className="rd-field border border-rdink/15 bg-white px-4 py-3 text-base sm:text-sm text-rdink focus:outline-none focus:border-rdaccent transition-colors"
                        placeholder="Driver as stated on ticket"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phone"
                        className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                      >
                        Phone Number{" "}
                        <span className="text-rdaccent" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="tel"
                        name="Phone Number"
                        id="phone"
                        required
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={14}
                        pattern="^\(\d{3}\) \d{3}-\d{4}$"
                        title="Please enter a valid 10-digit US phone number: (XXX) XXX-XXXX"
                        inputMode="numeric"
                        autoComplete="tel"
                        className="rd-field border border-rdink/15 bg-white px-4 py-3 text-base sm:text-sm text-rdink focus:outline-none focus:border-rdaccent transition-colors"
                        placeholder="(620) 214-0989"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                      >
                        Email Address{" "}
                        <span className="text-rdaccent" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        name="Email Address"
                        id="email"
                        required
                        autoComplete="email"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        className="rd-field border border-rdink/15 bg-white px-4 py-3 text-base sm:text-sm text-rdink focus:outline-none focus:border-rdaccent transition-colors"
                        placeholder="driver@example.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="citation"
                        className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                      >
                        Citation Number{" "}
                        <span className="text-rdaccent" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        name="Citation Number"
                        id="citation"
                        required
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        className="rd-field border border-rdink/15 bg-white px-4 py-3 text-base sm:text-sm text-rdink focus:outline-none focus:border-rdaccent transition-colors"
                        placeholder="e.g. TR-2026-98124"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="stateSelect"
                        className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                      >
                        State of Issue
                      </label>
                      <SearchableSelect
                        id="stateSelect"
                        name="State of Issue"
                        options={US_STATES}
                        value={selectedState}
                        onChange={(val) => {
                          setSelectedState(val);
                          setSelectedCounty("");
                        }}
                        placeholder="Search state..."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="countySelect"
                        className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                      >
                        County Jurisdiction
                      </label>
                      <SearchableSelect
                        id="countySelect"
                        name="County Jurisdiction"
                        options={countyOptions}
                        value={selectedCounty}
                        onChange={setSelectedCounty}
                        placeholder={
                          selectedState
                            ? "Search county..."
                            : "Select a state first"
                        }
                        disabled={!selectedState}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="violationType"
                      className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                    >
                      Primary Violation{" "}
                      <span className="text-rdaccent" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <select
                      name="Violation Category"
                      id="violationType"
                      required
                      className="rd-field border border-rdink/15 bg-white px-4 py-3 text-base sm:text-sm text-rdink focus:outline-none focus:border-rdaccent transition-colors"
                    >
                      <option value="">Select category...</option>
                      <option value="Speeding">Speeding Violation</option>
                      <option value="CDL Commercial">
                        Commercial Driver / CDL Infraction
                      </option>
                      <option value="Reckless Driving">
                        Reckless / Careless Driving
                      </option>
                      <option value="Red Light / Camera">
                        Red Light or Automated Camera
                      </option>
                      <option value="Suspended License">
                        Suspended License / Registration
                      </option>
                      <option value="Failure to Obey / Stop">
                        Stop Sign / Traffic Control Device
                      </option>
                      <option value="Other">Other Violation</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="citationFile"
                      className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                    >
                      Citation Photo or PDF
                    </label>
                    <input
                      id="citationFile"
                      type="file"
                      name="attachment"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="sr-only"
                    />

                    {!selectedFile ? (
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                      >
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-full border border-dashed ${
                            isDragging
                              ? "border-rdaccent bg-rdaccent/5"
                              : "border-rdink/20 hover:border-rdink bg-[#fafafa]"
                          } px-5 py-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2`}
                        >
                          <Upload
                            size={18}
                            className="text-rdaccent"
                            aria-hidden="true"
                          />
                          <span className="text-xs font-bold uppercase tracking-widest text-rdink">
                            Upload or drag citation file
                          </span>
                          <span className="text-xs text-rdink/50 font-light">
                            PDF, JPG, or PNG up to 10 MB
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div className="border border-rdink/15 bg-[#fafafa] px-4 py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText
                            size={18}
                            className="text-rdaccent shrink-0"
                            aria-hidden="true"
                          />
                          <div className="truncate">
                            <p className="text-sm font-medium text-rdink truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-rdink/50">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1.5 text-rdink/50 hover:text-rdaccent transition-colors shrink-0 cursor-pointer"
                          aria-label="Remove attached file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="details"
                      className="text-xs font-semibold uppercase tracking-widest text-rdink/70"
                    >
                      Incident Details{" "}
                      <span className="text-rdaccent" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      name="Incident Details & Notes"
                      id="details"
                      rows={3}
                      required
                      className="rd-field border border-rdink/15 bg-white px-4 py-3 text-base sm:text-sm text-rdink focus:outline-none focus:border-rdaccent transition-colors resize-y"
                      placeholder="Posted speed vs. alleged speed, road conditions, or court deadline..."
                    />
                  </div>

                  {formStatus === "error" && (
                    <p
                      role="alert"
                      aria-live="polite"
                      className="border border-rdaccent/30 bg-rdaccent/5 px-4 py-3 text-xs font-semibold text-rdaccent"
                    >
                      Unable to submit your citation right now. Please try again
                      or call (620) 214-0989.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full bg-rdaccent hover:bg-rdink text-white py-4 px-8 font-bold tracking-widest uppercase text-sm transition-colors duration-300 disabled:opacity-60 cursor-pointer"
                  >
                    {formStatus === "loading"
                      ? "Submitting Citation..."
                      : "Request Case Evaluation"}
                  </button>

                  <p className="text-xs text-rdink/50 font-light">
                    Submission does not form an attorney-client relationship
                    until engagement is confirmed.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Footer Section (Exact KV Freight dark footer blueprint) */}
      <section id="contact" className="pt-24 pb-12 px-6 bg-rdink text-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8 border-b border-white/10 pb-8">
            {/* Branding Column */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <svg
                    className="w-8 md:w-10 h-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-12 -12 224 224"
                    aria-hidden="true"
                  >
                    <path
                      d="M 0 200 L 0 0 L 100 0 L 200 100 L 200 200 Z"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="24"
                      strokeLinejoin="miter"
                    />
                    <path
                      d="M 60 200 L 60 60 L 100 60 L 140 100 L 140 200"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="24"
                      strokeLinejoin="miter"
                    />
                    <rect
                      x="116"
                      y="150"
                      width="24"
                      height="24"
                      fill="#e63946"
                    />
                  </svg>
                  <div className="font-heading font-bold text-xl tracking-wide text-white flex flex-col justify-center leading-none mt-0.5">
                    <span>ROUTEDEFENSE</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Dedicated traffic defense and attorney routing engineered to
                  protect your driving record and commercial standing across
                  all US jurisdictions.
                </p>
              </div>
            </div>

            {/* Headquarters Column */}
            <div className="lg:col-start-3 md:pl-16 lg:pl-0">
              <h4 className="font-heading text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2 text-white/90">
                <MapPin size={16} className="text-rdaccent" /> Headquarters
              </h4>
              <p className="text-white/60 text-sm leading-relaxed font-light">
                3601 E McDowell Rd
                <br />
                Apt 2027
                <br />
                Phoenix, AZ 85008
              </p>
            </div>

            {/* Contact & Legal Docs Column */}
            <div>
              <h4 className="font-heading text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2 text-white/90">
                <Phone size={16} className="text-rdaccent" /> Contact
              </h4>
              <ul className="space-y-4 text-white/60 text-sm font-light">
                <li>
                  <strong className="text-white">P:</strong>{" "}
                  <a
                    href="tel:+16202140989"
                    className="hover:text-rdaccent transition-colors"
                  >
                    (620) 214-0989
                  </a>
                </li>
                <li>
                  <strong className="text-white">E:</strong>{" "}
                  <a
                    href="mailto:cases@routedefensegroup.com"
                    className="hover:text-rdaccent transition-colors"
                  >
                    cases@routedefensegroup.com
                  </a>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="font-heading text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-2 text-white/90">
                  <FileText size={16} className="text-rdaccent" /> Compliance
                </h4>
                <ul className="space-y-2 text-white/60 text-sm font-light">
                  <li>
                    <a
                      href="https://docs.routedefensegroup.com/"
                      className="hover:text-rdaccent transition-colors"
                    >
                      docs.routedefensegroup.com
                    </a>
                  </li>
                  <li>Bar-compliant case routing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium tracking-widest text-white/40 uppercase gap-4 mt-8">
            <p>
              &copy; {new Date().getFullYear()} RouteDefense Group. All rights
              reserved. Attorney Advertising.
            </p>
            <div className="flex gap-6">
              <a
                href="https://docs.routedefensegroup.com/privacy/"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy
              </a>
              <a
                href="https://docs.routedefensegroup.com/terms/"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
