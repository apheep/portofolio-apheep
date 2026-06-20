"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import svgPaths from "./svg-cypy3gbpu9";

const imgImage = "/assets/517993743ec5982ed83dc90906a3747c1b3b69c8.png";
const imgComponent1 = "/assets/62028331411efcb879fb4cbe54999eaf8d54fdfa.png";
const imgAvatarImageForCustomerReviews = "/assets/812d29641cac9d59a98c0f079ef2f7bed442f856.png";
const imgAvatarImageForCustomerReviews1 = "/assets/70b04d6f8e89c63713b4fa944c285c3080a07a79.png";
const imgAvatarImageForCustomerReviews2 = "/assets/0289ade6be24866a19cb6827b982b58c9e14ce92.png";
const imgVector = "/assets/3456264c41276d44429be7e94cdc6df6a38425da.png";
const imgUasOb1NbR875Pw2Ij2PGyApbUPng = "/assets/33f00cd97fd863b9a3f6bf01d45cb3f3ddbd8056.png";
const imgHjT6B4UXkJiXQh8RHfnsip03Bf0Jpg = "/assets/5fd70d644268f369d9c20cb12c5373b3bb31f80f.png";
const imgXaE4YrDhL37AuRp07Eft3SFjsG8Jpg = "/assets/baadc6358c04961ae4fc6de7ad69e354140d1bdd.png";
const imgVector1 = "/assets/d9f9568720355fdc861052a77d4db44009512e82.png";
const imgVector2 = "/assets/d3b02b268d4c435d5c2f98bd61e0d6c2fe950600.png";
const imgVector3 = "/assets/ccc1f793e2bb4033dcbed06b622bf18dd2c4156a.png";
const imgProjectWorkImage = "/assets/2e7a9c13b88a19c7831122c18c313c419e0c2e29.png";
const imgJiTnMcenhdHgA9CiPwRc6Oh30KMPng = "/assets/d596a2bcd4b501919b873eb49f8f9039c6e46353.png";
const img1XRxQDpurW1MtmbTg5WRlwF8Mg4Jpg = "/assets/bbf5057955cb40194ec8d0873b0c37047fe86f0a.png";
const imgBackArrow = "/assets/5f4e4dc153e2d14e30c08ca6d93e0a263980666d.png";
const img4TWyntG9MBexWym2WeaAmwxbJuPng = "/assets/8818280ad3c003709554d5032fdb546703dc86ee.png";
const imgTUplq4UIeYepoYzZ8CkXfvNy4SgPng = "/assets/bf79784254e772c9da77b6b4e9652887dc2fb11c.png";
const imgXs2ZbDVjM80Mil9CvILhohW3VMPng = "/assets/1227dbda60e26fdeeef66a3a1017b0fd71da8c26.png";
const imgComponent2 = "/assets/e752e29cee616272dee7944e632bd4f314075d7c.png";
const imgComponent3 = "/assets/3087f3e6140ab8d14b5a362c333444bf130f8348.png";
const imgWpow2IWzFRo5ZYDu1A84FChDTlcPng = "/assets/14ad3da782685656c6cbac7390c8f5b1355f9b88.png";
import { imgSection, imgSection1, imgGroup, imgGroup1, imgGroup2, imgGroup3, imgSection2 } from "./svg-ztomm";

/**
 * ExperienceSection Component
 * Menampilkan bagian riwayat pengalaman kerja Afif secara interaktif, yang berisi:
 * - Paragraf bio singkat dengan efek scroll-linked text highlight (framer-motion).
 * - Daftar kartu pengalaman kerja dengan animasi 3D flip card pada badge tanggal/durasi.
 */
function ExperienceSection() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip w-full px-4 sm:px-6 md:px-0 relative shrink-0" data-name="Experience Section">
      <Container3 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[850px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Wrap1 />
      <Dots4 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-l border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Wrap1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrap">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[56px] items-center justify-center px-4 sm:px-8 md:px-[48px] py-[80px] relative size-full">
          <About />
          <Experiences />
        </div>
      </div>
    </div>
  );
}

function Dots4() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Dots">
      <DotLeft4 />
      <DotRight4 />
    </div>
  );
}

function About() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 w-full" data-name="About">
      <Text />
      <DivFramerP0Ih05Container />
    </div>
  );
}

function DotLeft4() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Left" />;
}

function DotRight4() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Right" />;
}

function Text() {
  return (
    <div className="content-stretch flex flex-col gap-4 overflow-clip relative shrink-0 w-full" data-name="Text">
      <SubTitle />
      <P4 />
    </div>
  );
}

function DivFramerP0Ih05Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.framer-p0ih05-container">
      <P5 />
    </div>
  );
}

function SubTitle() {
  return (
    <div className="content-stretch flex gap-[10px] items-center pt-[3px] relative" data-name="Sub Title">
      <Dot3 />
      <Experience />
    </div>
  );
}

function ScrollHighlightedText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of the biography block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="font-['Rajdhani:Medium',sans-serif] text-[36px] leading-[44px] tracking-[-0.8px] max-w-[750px] flex flex-wrap gap-x-[8px] gap-y-[4px]">
      {words.map((word, i) => {
        // Calculate scroll range for each word
        const start = i / words.length;
        const end = (i + 1.5) / words.length;
        
        // Transform progress to a smooth transition from dark grey to white
        const color = useTransform(
          scrollYProgress, 
          [start, Math.min(end, 1)], 
          ["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 1)"]
        );

        return (
          <motion.span key={i} style={{ color }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

function P4() {
  const bioText = "Every project represents a journey of solving real-world problems through technology, innovation, and continuous learning.";
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p">
      <ScrollHighlightedText text={bioText} />
    </div>
  );
}

function P5() {
  return null;
}

function Dot3() {
  return <div className="bg-[#e0e0e0] relative rounded-[100px] shrink-0 size-[5px]" data-name="Dot" />;
}

function Experience() {
  return (
    <div className="content-stretch flex flex-col items-start relative" data-name="Experience">
      <PFramerText9 />
    </div>
  );
}

function PFramerText9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.framer-text">
      <div className="[word-break:break-word] flex flex-col font-['Rajdhani:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e0e0e0] text-[16px] w-full">
        <p className="leading-[24px]">Experiences</p>
      </div>
    </div>
  );
}

function Experiences() {
  const list = [
    {
      title: "Fullstack Web Developer (Freelance)",
      company: "PT Digilab Mitra Solusi",
      date: "Jan 2026 – Present"
    },{
      title: "Software Engineer (Contract)",
      company: "PT Telekomunikasi Selular (Telkomsel)",
      date: "Dec 2025 – Present"
    },
    {
      title: "Fullstack Web Developer (Internship)",
      company: "PT Telekomunikasi Selular (Telkomsel)",
      date: "Jul 2025 – Dec 2025"
    },
    {
      title: "Software Engineer (Internship)",
      company: "PT. Indosat Ooredoo Hutchison – Region East Java",
      date: "Jan 2025 – Jun 2025"
    }
  ];

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center overflow-clip relative shrink-0 w-full max-w-[754px]" data-name="Experiences">
      {list.map((item, index) => (
        <a 
          key={index}
          href="https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full py-[20px] flex flex-col sm:flex-row gap-4 sm:gap-0 items-start sm:items-center justify-between border-b border-[rgba(255,255,255,0.1)] hover:border-[#f3500f] transition-all duration-300 relative select-none"
        >
          <div className="content-stretch flex flex-col items-start min-w-px relative w-full sm:w-auto">
            <h3 className="font-['Rajdhani:Medium',sans-serif] text-[24px] text-white leading-[30px] group-hover:text-[#f3500f] transition-colors duration-300">
              {item.title}
            </h3>
            <p className="font-['Rajdhani:Regular',sans-serif] text-[16px] text-[rgba(255,255,255,0.6)] mt-1">
              {item.company}
            </p>
          </div>
          
          {/* Card Flip Container */}
          <div className="w-[180px] h-[40px] [perspective:1000px] relative shrink-0">
            <div className="w-full h-full relative transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
              
              {/* Front Face: Date Badge */}
              <div className="absolute inset-0 bg-[rgba(37,37,37,0.5)] px-[20px] py-[6px] rounded-[100px] flex items-center justify-center text-white font-['Rajdhani:Regular',sans-serif] text-[16px] whitespace-nowrap [backface-visibility:hidden]">
                {item.date}
              </div>
              
              {/* Back Face: Visit Experience */}
              <div className="absolute inset-0 bg-[#f3500f] hover:bg-[#d8400a] px-[20px] py-[6px] rounded-[100px] flex items-center justify-center text-white font-['Rajdhani:Medium',sans-serif] text-[16px] whitespace-nowrap [backface-visibility:hidden] [transform:rotateX(180deg)] shadow-[0_0_15px_rgba(243,80,15,0.4)]">
                Visit Experience
              </div>
              
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ExperienceSection;