import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-black/5 bg-[#F9F6EE] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="RouteDefense Logo" width={80} height={80} className="w-20 h-20 -my-4" />
          <span className="font-bold tracking-widest text-sm uppercase text-[#1A1A1A]">RouteDefense</span>
        </div>
        <nav>
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
        <section id="submit" className="border-t border-black/5 bg-[#F9F6EE]">
          <div className="max-w-4xl mx-auto px-8 py-24">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-4 text-[#111111]">
                Submit Your Case For Review
              </h2>
              <p className="text-[#666666]">
                Provide your citation details below. A specialized defense attorney in your jurisdiction will contact you within 24 hours.
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 border border-[#EBE6DD] shadow-sm">
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                {/* Web3Forms Access Key - User Must Replace This */}
                <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
                
                {/* Optional: Redirect back to site after submission (you can change this URL) */}
                <input type="hidden" name="redirect" value="https://routedefense.pages.dev" />
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
                    <input type="tel" name="phone" id="phone" required className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors" placeholder="(555) 123-4567" />
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
                  <textarea name="details" id="details" rows={4} className="border border-[#EBE6DD] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#E63946] transition-colors resize-none" placeholder="Briefly describe the violation..."></textarea>
                </div>

                <button type="submit" className="w-full bg-[#111111] hover:bg-[#E63946] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase transition-colors duration-300 mt-4">
                  Request Free Case Evaluation
                </button>
              </form>
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
