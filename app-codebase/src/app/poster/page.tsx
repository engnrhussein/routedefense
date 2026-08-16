import Image from "next/image";

export default function Poster() {
  return (
    <div className="min-h-screen bg-[#E8DFD4] flex items-center justify-center print:block print:bg-[#E8DFD4]">
      {/* A4 Container: 210mm x 297mm */}
      <div 
        className="bg-[#E8DFD4] relative flex flex-col justify-between overflow-hidden shadow-2xl print:shadow-none mx-auto"
        style={{ width: '210mm', height: '297mm', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
      >
        {/* Content */}
        <div className="flex-1 flex flex-col px-20 pt-16 pb-24">
          <div className="mb-auto">
            {/* Logo */}
            <div className="flex items-center gap-6 mb-16">
              <img src="/logo.svg" alt="RouteDefense Logo" className="w-16 h-16 opacity-90" />
              <span className="font-bold tracking-[0.3em] text-2xl uppercase text-[#111111]">RouteDefense</span>
            </div>

            {/* Headline */}
            <h1 className="font-[family-name:var(--font-playfair)] text-[5.5rem] font-semibold leading-[1.1] tracking-tight text-[#111111] mb-12">
              Resolve Your Ticket. <br />
              <span className="text-[#E63946] italic">Protect Your Record.</span>
            </h1>
            
            <p className="text-3xl text-[#4A4A4A] max-w-2xl leading-relaxed border-l-[6px] border-[#CFC6B8] pl-8">
              An institutional-grade pipeline connecting drivers facing immediate fines with vetted, specialized traffic defense attorneys.
            </p>
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-auto border-t-[3px] border-[#CFC6B8] pt-16 flex justify-between items-end">
            <div>
              <p className="text-[#E63946] font-bold tracking-[0.2em] uppercase mb-4 text-lg">Secure Case Evaluation At:</p>
              <p className="text-5xl font-[family-name:var(--font-playfair)] text-[#111111] tracking-tight">www.routedefense.com</p>
            </div>
            
            {/* QR Code Placeholder Box */}
            <div className="w-48 h-48 border-4 border-[#111111] p-2 flex items-center justify-center bg-white relative shrink-0">
               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 text-center">
                 <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                 <span className="text-xs font-bold tracking-widest uppercase">Place QR<br/>Code Here</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body, html { margin: 0; padding: 0; background: #E8DFD4 !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}} />
    </div>
  );
}
