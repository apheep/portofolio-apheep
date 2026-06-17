import React from 'react';
import svgPaths from "./svg-cypy3gbpu9";
const imgImage = "/assets/517993743ec5982ed83dc90906a3747c1b3b69c8.png";
const imgComponent1 = "/assets/foto_page.png";
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
 * HeroSection Component
 * Menampilkan bagian pembuka portofolio utama (Hero), yang berisi:
 * - Gelombang latar belakang oranye abstrak berputar lambat.
 * - Foto profil Afif yang proporsional dengan sudut rounded border.
 * - Tanda tangan digital bergaya tulisan latin "Afif".
 * - Teks sapaan perkenalan dan profesi ("Software Engineering & Full-stack Developer").
 * - Ikon link media sosial (X, Dribbble, Instagram, Pinterest).
 */
function HeroSection() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip px-[535px] relative shrink-0" data-name="Hero Section">
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <BackgroundFrame />
      <Container1 />
    </div>
  );
}

function BackgroundFrame() {
  return (
    <div className="absolute blur-[0px] content-stretch flex flex-col h-[941px] items-start justify-center left-0 overflow-clip right-0 top-0" data-name="Background Frame">
      <Image />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[850px] min-w-[850px] overflow-clip pt-[80px] relative shrink-0" data-name="Container">
      <Main />
      <Dots2 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-l border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Image() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full overflow-hidden" data-name="image">
      <style>{`
        @keyframes scrollWave {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes organicPulse {
          0%, 100% {
            transform: scale(1.3) translateY(0%) skewY(0deg);
          }
          33% {
            transform: scale(1.35) translateY(-2%) skewY(0.5deg);
          }
          66% {
            transform: scale(1.28) translateY(2%) skewY(-0.5deg);
          }
        }
        .wave-scroll-container {
          display: flex;
          width: 400%;
          height: 100%;
          animation: scrollWave 60s linear infinite;
        }
        .wave-single-wrapper {
          width: 25%;
          height: 100%;
          overflow: hidden;
        }
        .wave-single-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: organicPulse 20s ease-in-out infinite;
          transform-origin: center;
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="wave-scroll-container">
          {/* First symmetric pair (U1) */}
          <div className="wave-single-wrapper">
            <img alt="Orange Wave 1" className="wave-single-image" src={imgImage} />
          </div>
          <div className="wave-single-wrapper" style={{ transform: 'scaleX(-1)' }}>
            <img alt="Orange Wave 2" className="wave-single-image" src={imgImage} />
          </div>
          {/* Second symmetric pair (U2) */}
          <div className="wave-single-wrapper">
            <img alt="Orange Wave 3" className="wave-single-image" src={imgImage} />
          </div>
          <div className="wave-single-wrapper" style={{ transform: 'scaleX(-1)' }}>
            <img alt="Orange Wave 4" className="wave-single-image" src={imgImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip pb-[80px] relative shrink-0 w-full" data-name="Main">
      <Introduction />
      <SocialIcons />
    </div>
  );
}

function Dots2() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Dots">
      <DotLeft2 />
      <DotRight2 />
    </div>
  );
}

function Introduction() {
  return (
    <div className="content-stretch flex flex-col gap-[82px] items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Introduction">
      <HeroSection1 />
      <Content />
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center overflow-clip py-[47px] relative shrink-0 w-full" data-name="Social Icons">
      {/* Instagram */}
      <a 
        href="https://www.instagram.com/afif_karomi?igsh=MWw5eWttMTV0aXVkYQ%3D%3D&utm_source=qr" 
        target="_blank" 
        rel="noreferrer"
        className="content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[12px] relative rounded-[40px] shrink-0 bg-white/5 border border-white/10 hover:border-[#f3500f]/50 hover:bg-[#f3500f]/10 transition-all duration-300"
      >
        <svg className="size-[20px] text-white hover:text-[#f3500f] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      </a>
      
      {/* GitHub */}
      <a 
        href="https://github.com/apheep" 
        target="_blank" 
        rel="noreferrer"
        className="content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[12px] relative rounded-[40px] shrink-0 bg-white/5 border border-white/10 hover:border-[#f3500f]/50 hover:bg-[#f3500f]/10 transition-all duration-300"
      >
        <svg className="size-[20px] text-white hover:text-[#f3500f] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a 
        href="https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
        target="_blank" 
        rel="noreferrer"
        className="content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[12px] relative rounded-[40px] shrink-0 bg-white/5 border border-white/10 hover:border-[#f3500f]/50 hover:bg-[#f3500f]/10 transition-all duration-300"
      >
        <svg className="size-[20px] text-white hover:text-[#f3500f] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </div>
  );
}

function DotLeft2() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Left" />;
}

function DotRight2() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Right" />;
}

function HeroSection1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full" data-name="Hero Section">
      <HeroImage />
      <NameLogo />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Content">
      <DivFramer4Outsv />
      <DivFramerRjdggc />
    </div>
  );
}

function HeroImage() {
  return (
    <div className="content-stretch flex flex-col h-[460px] items-center justify-end min-w-[850px] relative shrink-0 w-[850px]" data-name="Hero Image">
      <PhotoOfJohnJaydenWebDeveloper />
    </div>
  );
}

function NameLogo() {
  return (
    <div className="absolute bottom-[-66px] content-stretch flex h-[133px] items-center justify-center left-[277.98px] w-[304px]" data-name="Name Logo">
      <RjytgkPuTbFjrXmIx6Muq6YbMlySvg />
    </div>
  );
}

function DivFramer4Outsv() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.framer-4outsv">
      <PFramerText2 />
    </div>
  );
}

function DivFramerRjdggc() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="div.framer-rjdggc">
      <PFramerText3 />
    </div>
  );
}

function PhotoOfJohnJaydenWebDeveloper() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-center min-h-px overflow-clip relative w-full" data-name="Photo of John Jayden, web developer">
      <div className="h-[460px] overflow-clip relative shrink-0 w-[436px] rounded-[15px]" data-name="Component 1">
        <img alt="" className="absolute block inset-0 max-w-none size-full object-cover rounded-[15px]" height="460" src={imgComponent1} width="436" />
      </div>
    </div>
  );
}

function RjytgkPuTbFjrXmIx6Muq6YbMlySvg() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-center justify-center min-w-px overflow-clip relative" data-name="rjytgkPUTbFjrXmIX6Muq6ybMLY.svg">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mr+De+Haviland&display=swap');
        .signature-text {
          font-family: 'Mr De Haviland', cursive;
          font-size: 110px;
          color: white;
          line-height: 1;
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
          transform: rotate(-6deg);
        }
      `}</style>
      <div className="flex items-center justify-center w-[304px] h-[132.564px] select-none">
        <span className="signature-text">Afif</span>
      </div>
    </div>
  );
}

function PFramerText2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="p.framer-text">
      <div className="[word-break:break-word] flex flex-col font-['Rajdhani:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-[rgba(255,255,255,0.6)] text-center whitespace-nowrap">
        <p className="text-[20px]">
          <span className="leading-[28px] text-[rgba(255,255,255,0.6)]">{`Hi, I'm `}</span>
          <span className="leading-[28px] text-white">M Afif Uhailal Karomi</span>
          <span className="leading-[28px] text-[rgba(255,255,255,0.6)]">,</span>
        </p>
      </div>
    </div>
  );
}

function PFramerText3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="p.framer-text">
      <div className="[word-break:break-word] flex flex-col font-['Rajdhani:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-[rgba(255,255,255,0.6)] text-center whitespace-nowrap">
        <p className="text-[20px]">
          <span className="leading-[28px] text-[rgba(255,255,255,0.6)]">{`Working as `}</span>
          <span className="leading-[28px] text-white">{`Software Engineering `}</span>
          <span className="leading-[28px] text-[rgba(255,255,255,0.6)]">{`and `}</span>
          <span className="leading-[28px] text-white">Full-stack Developer</span>
        </p>
      </div>
    </div>
  );
}

export default HeroSection;