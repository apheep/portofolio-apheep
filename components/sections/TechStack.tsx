import React from 'react';

/**
 * TechStack Component
 * Menampilkan seksi keahlian teknis (bahasa, framework, infrastruktur, database, dll)
 * dengan gaya layout baris yang rapi sesuai screenshot referensi.
 */
function TechStack() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip px-[535px] relative shrink-0" data-name="Tech Stack">
      <Container10 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[850px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Wrap5 />
      <Dots8 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-l border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Wrap5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrap">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-start justify-center px-[48px] py-[80px] relative size-full">
          {/* Section Title */}
          <h2 className="font-['Rajdhani:Bold',sans-serif] font-bold text-[36px] text-white tracking-wide">
            Tech I work with
          </h2>
          
          {/* Tech Stack List */}
          <div className="flex flex-col gap-[36px] w-[754px] relative">
            <TechRow 
              category="LANGUAGES" 
              skills={["PHP", "Python", "JavaScript", "TypeScript"]} 
            />
            <TechRow 
              category="FRAMEWORKS" 
              skills={["Laravel", "Slim PHP", "FastAPI", "Bootstrap", "Tailwind CSS", "Next JS", "React JS"]} 
            />
            <TechRow 
              category="INFRASTRUCTURE" 
              skills={["Docker", "Git", "Linux", "Nginx", "VPS", "AWS"]} 
            />
            <TechRow 
              category="DATABASES" 
              skills={["MySQL", "Supabase", "Firebase"]} 
            />
            <TechRow 
              category="AI & IOT" 
              skills={["OpenAI API", "Machine Learning", "Deep Learning", "LoRa", "ESP32", "Raspberry Pi"]} 
            />
            <TechRow 
              category="DESIGN" 
              skills={["Figma", "UI/UX"]} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Dots8() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Dots">
      <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Left" />
      <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Right" />
    </div>
  );
}

function TechRow({ category, skills }: { category: string; skills: string[] }) {
  return (
    <div className="flex flex-row items-start justify-between w-full relative gap-[24px]">
      {/* Category Name */}
      <div className="w-[180px] shrink-0 pt-[8px]">
        <span className="font-['Rajdhani:SemiBold',sans-serif] text-[13px] text-[#555558] tracking-[0.1em] font-semibold">
          {category}
        </span>
      </div>
      
      {/* Skills Tags */}
      <div className="flex flex-row flex-wrap gap-[10px] flex-1">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="bg-[#0b0b0c] border border-[rgba(255,255,255,0.04)] rounded-[8px] px-[18px] py-[9px] hover:bg-[#121213] hover:border-[#f3500f]/30 transition-all duration-300 cursor-default"
          >
            <span className="font-['Rajdhani:Medium',sans-serif] text-[15px] text-[#9a9a9f]">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechStack;