import React from 'react';
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
 * Desktop (Header / Navbar) Component
 * Menampilkan baris navigasi utama di bagian atas halaman portofolio,
 * termasuk Logo, Status Ketersediaan Kerja, dan Lokasi Geografis.
 */
function Desktop() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 w-full" data-name="Desktop">
      <Container />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

/**
 * Container pembatas lebar konten navbar agar sejajar rapi (max-width 850px)
 */
function Container() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[850px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Dots />
      <SubContainer />
      <Dots1 />
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.1)] border-l border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

/**
 * Titik dekorasi pembatas atas
 */
function Dots() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Dots">
      <DotLeft />
      <DotRight />
    </div>
  );
}

/**
 * Wrapper konten navbar yang menampung Logo, Status, dan Lokasi secara horizontal
 */
function SubContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Sub Container">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col sm:flex-row gap-4 sm:gap-[20px] md:gap-[135.1px] items-center justify-between px-6 md:px-[67.6px] py-[17px] relative size-full w-full">
          <Logo />
          <BoxStatus />
          <DivFramerVjfmzb />
        </div>
      </div>
    </div>
  );
}

/**
 * Titik dekorasi pembatas bawah
 */
function Dots1() {
  return (
    <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-name="Dots">
      <DotLeft1 />
      <DotRight1 />
    </div>
  );
}

function DotLeft() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Left" />;
}

function DotRight() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Right" />;
}

/**
 * Logo teks nama brand portofolio ("Afif")
 */
function Logo() {
  return (
    <a className="content-stretch cursor-pointer flex items-center justify-start relative shrink-0" href="https://portofolio-afif.framer.website/#home" target="_blank" data-name="Logo">
      <span className="font-['Rajdhani:Bold',sans-serif] text-[22px] font-bold text-white tracking-[0.5px]">
        Afif
      </span>
    </a>
  );
}

/**
 * Capsule Box Status Ketersediaan Kerja (menampilkan dot hijau aktif)
 */
function BoxStatus() {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] content-stretch flex gap-[12px] items-center justify-center overflow-clip px-[24px] py-[10px] relative rounded-[1000px] shrink-0" data-name="Box Status">
      <Dot />
      <DivFramerP8Bons />
      <div className="absolute inset-0 rounded-[1000px]" data-name="::after">
        <div aria-hidden className="absolute border border-[rgba(255,255,255,0.15)] border-solid inset-0 pointer-events-none rounded-[1000px]" />
      </div>
    </div>
  );
}

function DivFramerVjfmzb() {
  return (
    <div className="content-stretch flex flex-col items-center sm:items-end relative shrink-0 w-auto" data-name="div.framer-vjfmzb">
      <PFramerText1 />
    </div>
  );
}

function DotLeft1() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Left" />;
}

function DotRight1() {
  return <div className="bg-[#808080] relative shrink-0 size-[6px]" data-name="Dot Right" />;
}

/**
 * Dot hijau penanda status aktif / online
 */
function Dot() {
  return <div className="bg-[#1ef482] relative rounded-[5px] shrink-0 size-[10px]" data-name="Dot" />;
}

function DivFramerP8Bons() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[147px]" data-name="div.framer-p8bons">
      <PFramerText />
    </div>
  );
}

/**
 * Teks lokasi geografis (Surabaya, Jawa Timur - INDONESIA)
 */
function PFramerText1() {
  return (
    <div className="content-stretch flex flex-col items-center sm:items-end relative shrink-0 w-full" data-name="p.framer-text">
      <div className="[word-break:break-word] flex flex-col font-['Rajdhani:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center sm:text-right text-white">
        <p className="leading-[24px] mb-0 whitespace-nowrap">Surabaya, Jawa Timur</p>
        <p className="leading-[24px] whitespace-nowrap">INDONESIA</p>
      </div>
    </div>
  );
}

/**
 * Teks ketersediaan di dalam capsule status ("Available for Projects")
 */
function PFramerText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="p.framer-text">
      <div className="[word-break:break-word] flex flex-col font-['Rajdhani:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-[rgba(255,255,255,0.6)] whitespace-nowrap">
        <p className="text-[16px]">
          <span className="leading-[24px] text-[rgba(255,255,255,0.6)]">{`Available for `}</span>
          <span className="leading-[24px] text-white">Projects</span>
        </p>
      </div>
    </div>
  );
}

export default Desktop;