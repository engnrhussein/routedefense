import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="RouteDefense Logo" width={32} height={32} className="w-8 h-8" />
          <span className="font-bold tracking-widest text-sm uppercase">RouteDefense</span>
        </div>
        <nav>
          <button className="text-sm font-medium tracking-wide hover:text-gray-300 transition-colors uppercase">
            Lawyer Portal
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-8 py-32 md:py-48 max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-6">
            Resolve Your Ticket. <br />
            <span className="text-gray-400">Protect Your Record.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-light">
            An institutional-grade pipeline connecting drivers facing immediate fines 
            with vetted, specialized traffic defense attorneys.
          </p>
          <button className="bg-[#E63946] hover:bg-[#c92d39] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase transition-all duration-300">
            Submit Your Ticket
          </button>
        </section>

        {/* How It Works - 3 Step Grid */}
        <section className="border-t border-white/10 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto px-8 py-24">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl mb-16 text-center">
              How RouteDefense Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="border border-white/10 p-10 bg-[#111111] hover:border-white/20 transition-colors duration-300">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">01 //</span>
                <h3 className="text-xl font-semibold mb-4">Upload Citation</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Securely submit your traffic citation details through our encrypted portal. We analyze the points and potential penalties instantly.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="border border-white/10 p-10 bg-[#111111] hover:border-white/20 transition-colors duration-300">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">02 //</span>
                <h3 className="text-xl font-semibold mb-4">Attorney Match</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our algorithm routes your case to a vetted local defense attorney specializing in your specific violation and jurisdiction.
                </p>
              </div>

              {/* Step 3 */}
              <div className="border border-white/10 p-10 bg-[#111111] hover:border-white/20 transition-colors duration-300">
                <span className="text-[#E63946] font-mono text-sm tracking-widest block mb-6">03 //</span>
                <h3 className="text-xl font-semibold mb-4">Strategic Defense</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your dedicated counsel executes an immediate defense strategy, protecting your driving record and mitigating fines.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] px-8 py-12 text-center">
        <p className="text-xs text-gray-600 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} RouteDefense Legal Network. Secure & Confidential.
        </p>
      </footer>
    </div>
  );
}
