import React from 'react';

const imgProfile = "/assets/foto_page.png";

/**
 * AboutMe Component
 * Menampilkan bagian "Meet Afif" dengan gaya minimalis, bersih, tanpa border eksternal/dot grid.
 * Desain mengikuti screenshot referensi dengan layout dua kolom yang seimbang.
 */
function AboutMe() {
  return (
    <div className="bg-black flex flex-col items-center justify-center py-[100px] w-full relative" data-name="About Me">
      <AboutContent />
    </div>
  );
}

function AboutContent() {
  return (
    <div className="flex flex-col md:flex-row gap-[56px] items-center justify-between w-full max-w-[960px] px-[24px] relative">
      {/* Kolom Kiri: Teks Biografi dan Tag */}
      <div className="flex flex-col flex-1 justify-center gap-[28px]">
        {/* Signature Title */}
        <div>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Mr+De+Haviland&display=swap');
            .meet-signature {
              font-family: 'Mr De Haviland', cursive;
              font-size: 84px;
              color: white;
              line-height: 1.1;
              font-weight: 400;
              margin: 0;
            }
          `}</style>
          <h2 className="meet-signature">Meet Afif</h2>
        </div>

        {/* Paragraf Bio */}
        <p className="font-['Rajdhani:Medium',sans-serif] text-[17px] leading-[28px] text-[#8e8e8f] tracking-wide max-w-[520px]">
          I'm M Afif Uhailal Karomi, a Software Engineer and Full-stack Developer who turns ideas into digital solutions with purpose. For me, development isn't just writing code – it's about crafting experiences that resonate. I fuse bold creativity with thoughtful strategy to spark emotion and connection. Every project I create is driven by passion, clarity, and lasting impact.
        </p>

        {/* Barisan Tags (Gaya Tombol Kotak Gelap) */}
        <div className="flex flex-col gap-[10px] mt-2">
          <div className="flex flex-row gap-[10px] flex-wrap">
            <SkillTag text="Software Engineering" />
            <SkillTag text="Full-stack Development" />
            <SkillTag text="ui/ux Design" />
          </div>
          <div className="flex flex-row gap-[10px] flex-wrap">
            <SkillTag text="Automation & Chatbot" />
            <SkillTag text="IoT Embedded System" />
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Foto Profil (Bentuk Kotak Minimalis & Sedikit Rounded) */}
      <div className="w-full md:w-[400px] shrink-0 aspect-square relative">
        <div className="w-full h-full rounded-[8px] overflow-hidden relative shadow-[0_0_50px_rgba(243,80,15,0.1)]">
          <img 
            src={imgProfile} 
            alt="M Afif Uhailal Karomi" 
            className="w-full h-full object-cover relative z-10"
          />
        </div>
      </div>
    </div>
  );
}

function SkillTag({ text }: { text: string }) {
  return (
    <div className="bg-[#0f0f10] border border-[rgba(255,255,255,0.04)] rounded-[8px] px-[20px] py-[12px] hover:bg-[#151516] hover:border-[#f3500f]/30 transition-all duration-300 cursor-default">
      <span className="font-['Rajdhani:Medium',sans-serif] text-[14px] text-[#a0a0a0] tracking-wider font-semibold">
        {text}
      </span>
    </div>
  );
}

export default AboutMe;