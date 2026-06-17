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
    <div className="content-stretch flex gap-[10px] items-center justify-center overflow-clip py-[47px] relative shrink-0 w-full" data-name="Social Icons">
      <DivFramer17S7U2ZContainer />
      <DivFramer1Hy288LContainer />
      <DivFramerNua0MhContainer />
      <DivFramer4XdbrdContainer />
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

function DivFramer17S7U2ZContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="div.framer-17s7u2z-container">
      <DarkThemeIcon />
    </div>
  );
}

function DivFramer1Hy288LContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="div.framer-1hy288l-container">
      <DarkThemeIcon1 />
    </div>
  );
}

function DivFramerNua0MhContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="div.framer-nua0mh-container">
      <DarkThemeIcon2 />
    </div>
  );
}

function DivFramer4XdbrdContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="div.framer-4xdbrd-container">
      <DarkThemeIcon3 />
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

function DarkThemeIcon() {
  return (
    <a className="content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[11px] relative rounded-[40px] shrink-0" href="https://x.com/" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2 0 0 2 20 20)'><stop stop-color='rgba(17,17,17,1)' offset='0'/><stop stop-color='rgba(17,17,17,0.71)' offset='0.32703'/><stop stop-color='rgba(17,17,17,0.45)' offset='0.62613'/><stop stop-color='rgba(47,47,47,0.4065)' offset='0.67286'/><stop stop-color='rgba(77,77,77,0.36299)' offset='0.71959'/><stop stop-color='rgba(136,136,136,0.27598)' offset='0.81306'/><stop stop-color='rgba(255,255,255,0.10196)' offset='1'/></radialGradient></defs></svg>\")" }} target="_blank" data-name="DarkTheme Icon">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Component 1">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="1688045918">
            <g id="wBdJ15Yu6" />
            <path d={svgPaths.p3179fc80} id="El8uvQLqv" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d="M8.007 10.092L3.375 15.1875" id="AHSzdg78i" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d="M14.625 2.8125L9.993 7.908" id="h4GjUNYzh" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </a>
  );
}

function DarkThemeIcon1() {
  return (
    <a className="content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[11px] relative rounded-[40px] shrink-0" href="https://dribbble.com/" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2 0 0 2 20 20)'><stop stop-color='rgba(17,17,17,1)' offset='0'/><stop stop-color='rgba(17,17,17,0.71)' offset='0.32703'/><stop stop-color='rgba(17,17,17,0.45)' offset='0.62613'/><stop stop-color='rgba(47,47,47,0.4065)' offset='0.67286'/><stop stop-color='rgba(77,77,77,0.36299)' offset='0.71959'/><stop stop-color='rgba(136,136,136,0.27598)' offset='0.81306'/><stop stop-color='rgba(255,255,255,0.10196)' offset='1'/></radialGradient></defs></svg>\")" }} target="_blank" data-name="DarkTheme Icon">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Component 1">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="284710571">
            <g id="poRFu5DyP" />
            <path d={svgPaths.p18710120} id="Pn8o_iuqT" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p35cf4480} id="MOT7Ok_Z9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p3bf88810} id="uWno1dECK" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p11efb080} id="DGpj3ZHuH" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </a>
  );
}

function DarkThemeIcon2() {
  return (
    <a className="content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[11px] relative rounded-[40px] shrink-0" href="http://instagram.com/" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2 0 0 2 20 20)'><stop stop-color='rgba(17,17,17,1)' offset='0'/><stop stop-color='rgba(17,17,17,0.71)' offset='0.32703'/><stop stop-color='rgba(17,17,17,0.45)' offset='0.62613'/><stop stop-color='rgba(47,47,47,0.4065)' offset='0.67286'/><stop stop-color='rgba(77,77,77,0.36299)' offset='0.71959'/><stop stop-color='rgba(136,136,136,0.27598)' offset='0.81306'/><stop stop-color='rgba(255,255,255,0.10196)' offset='1'/></radialGradient></defs></svg>\")" }} target="_blank" data-name="DarkTheme Icon">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Component 1">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="942143898">
            <g id="SuXKGhab5" />
            <path d={svgPaths.p2db1bf00} id="vvJ8FLDVj" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p10117af0} id="Q3v7fjWhv" stroke="var(--stroke-0, white)" strokeMiterlimit="10" strokeWidth="1.125" />
            <path d={svgPaths.p3a1e0c00} fill="var(--fill-0, white)" id="VxeO4Hprj" />
          </g>
        </svg>
      </div>
    </a>
  );
}

function DarkThemeIcon3() {
  return (
    <a className="content-stretch cursor-pointer flex items-center justify-center overflow-clip p-[11px] relative rounded-[40px] shrink-0" href="https://www.pinterest.com/" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(2 0 0 2 20 20)'><stop stop-color='rgba(17,17,17,1)' offset='0'/><stop stop-color='rgba(17,17,17,0.71)' offset='0.32703'/><stop stop-color='rgba(17,17,17,0.45)' offset='0.62613'/><stop stop-color='rgba(47,47,47,0.4065)' offset='0.67286'/><stop stop-color='rgba(77,77,77,0.36299)' offset='0.71959'/><stop stop-color='rgba(136,136,136,0.27598)' offset='0.81306'/><stop stop-color='rgba(255,255,255,0.10196)' offset='1'/></radialGradient></defs></svg>\")" }} target="_blank" data-name="DarkTheme Icon">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="Component 1">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="4229695659">
            <g id="vIpzzTSnv" />
            <path d="M9 6.1875L6.75 15.75" id="GcJjYkAUd" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p284dc280} id="ySauVeB5F" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </a>
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