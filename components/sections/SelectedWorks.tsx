import React from 'react';

/**
 * SelectedWorks Component
 * Menampilkan bagian galeri portofolio proyek unggulan Afif, yang berisi:
 * - Header banner marquee "Selected Project" yang berputar secara infinite.
 * - Grid tumpuk/sticky dari 7 kartu proyek interaktif dengan link eksternal.
 */
function SelectedWorks() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[535px] relative shrink-0" data-name="Selected Works">
      <Container4 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[850px] relative shrink-0 w-full" data-name="Container">
      <Wrap2 />
      <Dots5 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-l border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Wrap2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrap">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center justify-center px-[48px] py-[80px] relative size-full">
          <SelectedWork />
          <Works />
        </div>
      </div>
    </div>
  );
}

function Dots5() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Dots">
      <DotLeft5 />
      <DotRight5 />
    </div>
  );
}

function DotLeft5() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Left" />;
}

function DotRight5() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Right" />;
}

function SelectedWork() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full max-w-[754px] bg-[#0d0d0d] overflow-hidden py-[36px] border border-[rgba(255,255,255,0.08)] flex items-center justify-center" data-name="Selected Work">
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee 12s linear infinite;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 48px;
          padding-right: 48px;
        }
      `}</style>
      <div className="overflow-hidden w-full select-none pointer-events-none px-[12px]">
        <div className="marquee-container">
          <div className="marquee-item">
            <span className="font-['Rajdhani:Bold',sans-serif] text-[48px] font-bold text-white tracking-tight flex items-center uppercase">
              Selected Project
            </span>
            <div className="relative flex items-center justify-center w-[24px] h-[24px] shrink-0">
              <span className="absolute w-[20px] h-[20px] rounded-full bg-[#f3500f]/80 blur-[2px] translate-y-[4px]" />
              <span className="absolute w-[16px] h-[16px] rounded-full bg-white shadow-[0_0_12px_#f3500f]" />
            </div>
          </div>
          <div className="marquee-item">
            <span className="font-['Rajdhani:Bold',sans-serif] text-[48px] font-bold text-white tracking-tight flex items-center uppercase">
              Selected Project
            </span>
            <div className="relative flex items-center justify-center w-[24px] h-[24px] shrink-0">
              <span className="absolute w-[20px] h-[20px] rounded-full bg-[#f3500f]/80 blur-[2px] translate-y-[4px]" />
              <span className="absolute w-[16px] h-[16px] rounded-full bg-white shadow-[0_0_12px_#f3500f]" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[24px] shadow-[inset_0px_1px_6px_0px_rgba(255,255,255,0.08)]" />
    </div>
  );
}

function Works() {
  const projects = [
    {
      title: "Admin Dashboard – Telkomsel",
      category: "Web Application",
      image: "/assets/admin.png",
      date: "Apr 2026",
      link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330"
    },
    {
      title: "IoT Soil Moisture & Fertility Detection System",
      category: "IoT & Embedded System",
      image: "/assets/IoT.png",
      date: "Dec 2025",
      link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330"
    },
    {
      title: "Kuotaumroh – Roaming Data Package E-Commerce Platform",
      category: "E-Commerce Platform",
      image: "/assets/kuotaumroh.id.png",
      date: "jan 2026",
      link: "https://kuotaumroh.id"
    },
    {
      title: "blanjapoin.id – Telkomsel Loyalty Point Redemption Platform",
      category: "Web Platform",
      image: "/assets/blanjapoin.id.png",
      date: "Nov 2025",
      link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330"
    },
    {
      title: "WhatsApp & Telegram Chatbot for BTS Operational Reporting",
      category: "Automation & Chatbot",
      image: "/assets/chatbot.png",
      date: "Mar 2025",
      link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330"
    },
    {
      title: "Dashboard System Information  PT. Indosat Ooredoo Huthison Region East Java",
      category: "Information System",
      image: "/assets/ambara.png",
      date: "jan 2025",
      link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330"
    },
    {
      title: "Wargame – Topup and Voucher games  E-Commerce Platform",
      category: "E-Commerce Platform",
      image: "/assets/wargame.png",
      date: "on going",
      link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330"
    }
  ];

  return (
    <div className="flex flex-col gap-[32px] items-center w-[754px] relative">
      {projects.map((project, idx) => (
        <a
          key={idx}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full h-[480px] rounded-[24px] overflow-hidden sticky transition-transform duration-500 hover:scale-[1.01]"
          style={{
            top: `${60 + idx * 24}px`
          }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 bg-[#111]">
            <img
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={project.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Floating Card Overlay */}
          <div className="absolute bottom-[16px] left-[16px] right-[16px] z-10 bg-[#0a0a0a]/80 backdrop-blur-[16px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-[24px] flex justify-between items-center transition-all duration-300">
            {/* Project Details */}
            <div className="flex flex-col items-start gap-[6px]">
              <span className="text-[14px] text-[rgba(255,255,255,0.5)] font-['Rajdhani:Medium',sans-serif] uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="font-['Rajdhani:Bold',sans-serif] font-bold text-[28px] text-white leading-[34px] tracking-tight group-hover:text-[#f3500f] transition-colors duration-300">
                {project.title}
              </h3>
              <div className="mt-[6px] inline-block bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-[100px] px-[16px] py-[4px] text-[14px] text-[rgba(255,255,255,0.6)] font-['Rajdhani:Medium',sans-serif]">
                {project.date}
              </div>
            </div>

            {/* Launch Arrow Button */}
            <div className="w-[68px] h-[68px] rounded-[18px] border border-[rgba(255,255,255,0.15)] group-hover:border-[#f3500f] flex items-center justify-center transition-all duration-300 shrink-0">
              <svg 
                className="w-[28px] h-[28px] text-white group-hover:text-[#f3500f] transition-all duration-300 transform group-hover:translate-x-[4px] group-hover:-translate-y-[4px]" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </div>

          {/* Inner Border Glow */}
          <div className="absolute inset-0 pointer-events-none rounded-[24px] border border-[rgba(255,255,255,0.1)] group-hover:border-[#f3500f]/30 transition-colors duration-300" />
        </a>
      ))}
    </div>
  );
}

export default SelectedWorks;