import React from 'react';
import { normalizeProjectLink, type PortfolioProject } from '@/data/projects';

/**
 * SelectedWorks Component
 * Menampilkan bagian galeri portofolio proyek unggulan Afif, yang berisi:
 * - Header banner marquee "Selected Project" yang berputar secara infinite.
 * - Grid tumpuk/sticky dari 7 kartu proyek interaktif dengan link eksternal.
 */
function SelectedWorks({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-0 relative shrink-0" data-name="Selected Works">
      <Container4 projects={projects} />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container4({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[850px] relative shrink-0 w-full" data-name="Container">
      <Wrap2 projects={projects} />
      <Dots5 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-l border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Wrap2({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrap">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="content-stretch flex flex-col gap-[40px] sm:gap-[52px] md:gap-[64px] items-center justify-center px-4 sm:px-8 md:px-[48px] py-[50px] sm:py-[70px] md:py-[80px] relative w-full">
          <SelectedWork />
          <Works projects={projects} />
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
    <div className="relative rounded-[18px] sm:rounded-[24px] shrink-0 w-full max-w-[754px] bg-[#0d0d0d] overflow-hidden py-[20px] sm:py-[28px] md:py-[36px] border border-[rgba(255,255,255,0.08)] flex items-center justify-center" data-name="Selected Work">
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
          animation: marquee 14s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-right: 24px;
        }
        @media (min-width: 640px) {
          .marquee-item {
            gap: 48px;
            padding-right: 48px;
          }
        }
      `}</style>
      <div className="overflow-hidden w-full select-none pointer-events-none px-[8px] sm:px-[12px]">
        <div className="marquee-container">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="marquee-item">
              <span className="font-['Rajdhani:Bold',sans-serif] text-[26px] sm:text-[38px] md:text-[48px] font-bold text-white tracking-tight flex items-center uppercase">
                Selected Project
              </span>
              <div className="relative flex items-center justify-center w-[18px] h-[18px] sm:w-[24px] sm:h-[24px] shrink-0">
                <span className="absolute w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] rounded-full bg-[#f3500f]/80 blur-[2px] translate-y-[2px] sm:translate-y-[4px]" />
                <span className="absolute w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] rounded-full bg-white shadow-[0_0_12px_#f3500f]" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[18px] sm:rounded-[24px] shadow-[inset_0px_1px_6px_0px_rgba(255,255,255,0.08)]" />
    </div>
  );
}

function Works({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className="flex flex-col gap-[24px] sm:gap-[32px] items-center w-full max-w-[754px] relative">
      <style>{`
        .sticky-project-card {
          top: var(--card-top-mobile);
        }
        @media (min-width: 640px) {
          .sticky-project-card {
            top: var(--card-top-desktop);
          }
        }
      `}</style>
      {projects.map((project, idx) => (
        <a
          key={project.id || project.title}
          href={normalizeProjectLink(project.link)}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-project-card group relative block w-full h-[350px] sm:h-[420px] md:h-[480px] rounded-[18px] sm:rounded-[24px] overflow-hidden sticky transition-transform duration-500 hover:scale-[1.01]"
          style={{
            ['--card-top-mobile' as string]: `${44 + idx * 12}px`,
            ['--card-top-desktop' as string]: `${60 + idx * 24}px`,
            zIndex: idx + 1,
          }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 bg-[#111]">
            <img
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={project.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          </div>

          {/* Floating Card Overlay */}
          <div className="absolute bottom-[10px] sm:bottom-[16px] left-[10px] sm:left-[16px] right-[10px] sm:right-[16px] z-10 bg-[#0a0a0a]/85 backdrop-blur-[16px] border border-[rgba(255,255,255,0.08)] rounded-[16px] sm:rounded-[24px] p-3 sm:p-4 md:p-[24px] flex flex-row gap-3 sm:gap-[16px] justify-between items-center transition-all duration-300">
            {/* Project Details */}
            <div className="flex flex-col items-start gap-[4px] sm:gap-[6px] min-w-0 flex-1">
              <span className="text-[11px] sm:text-[13px] md:text-[14px] text-[rgba(255,255,255,0.5)] font-['Rajdhani:Medium',sans-serif] uppercase tracking-wider truncate max-w-full">
                {project.category}
              </span>
              <h3 className="font-['Rajdhani:Bold',sans-serif] font-bold text-[17px] sm:text-[22px] md:text-[28px] text-white leading-[22px] sm:leading-[28px] md:leading-[34px] tracking-tight group-hover:text-[#f3500f] transition-colors duration-300 line-clamp-2">
                {project.title}
              </h3>
              <div className="mt-[2px] sm:mt-[4px] inline-block bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-[100px] px-[10px] py-[2px] sm:px-[16px] sm:py-[4px] text-[11px] sm:text-[13px] md:text-[14px] text-[rgba(255,255,255,0.6)] font-['Rajdhani:Medium',sans-serif]">
                {project.date}
              </div>
            </div>

            {/* Launch Arrow Button */}
            <div className="w-[42px] h-[42px] sm:w-[54px] sm:h-[54px] md:w-[68px] md:h-[68px] rounded-[12px] sm:rounded-[18px] border border-[rgba(255,255,255,0.15)] group-hover:border-[#f3500f] flex items-center justify-center transition-all duration-300 shrink-0">
              <svg 
                className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] md:w-[28px] md:h-[28px] text-white group-hover:text-[#f3500f] transition-all duration-300 transform group-hover:translate-x-[4px] group-hover:-translate-y-[4px]" 
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
          <div className="absolute inset-0 pointer-events-none rounded-[18px] sm:rounded-[24px] border border-[rgba(255,255,255,0.1)] group-hover:border-[#f3500f]/30 transition-colors duration-300" />
        </a>
      ))}
    </div>
  );
}

export default SelectedWorks;
