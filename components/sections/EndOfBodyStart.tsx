import React from 'react';
import Desktop from './Desktop';
import BackgroundVideo from './BackgroundVideo';
import HeroSection from './HeroSection';
import ExperienceSection from './ExperienceSection';
import SelectedWorks from './SelectedWorks';
import MyServices from './MyServices';
import AboutMe from './AboutMe';
import TechStack from './TechStack';
import Partner from './Partner';
import Testimonials from './Testimonials';
import Awards from './Awards';
import WorkProcess from './WorkProcess';
import PricingSection from './PricingSection';
import Faq from './Faq';
import ContactForWork from './ContactForWork';
import Desktop12 from './Desktop12';

export default function EndOfBodyStart() {
  return (
    <div className="bg-black content-stretch flex flex-col items-center relative size-full" data-name="End of bodyStart">
      {/* 1. Header / Navigation Bar (Menampilkan nama logo, status ketersediaan project, dan lokasi) */}
      <Desktop />

      {/* 2. Background Video (Video oranye abstrak yang berjalan di latar belakang halaman) */}
      <BackgroundVideo />

      {/* 3. Hero Section (Bagian utama perkenalan diri, foto profil, tanda tangan 'Afif', dan link social media) */}
      <HeroSection />

      {/* 4. About Me (Penjelasan biodata dan cerita singkat tentang Afif) */}
      <AboutMe />

      {/* 5. Experience Section (Riwayat pengalaman kerja interaktif dengan hover flip card ke LinkedIn) */}
      <ExperienceSection />

      {/* 6. Selected Works (Galeri proyek unggulan dengan running text 'Selected Project' dan kartu detail proyek) */}
      <SelectedWorks />

      {/* 7. My Services (Daftar layanan jasa/keahlian yang ditawarkan - saat ini dinonaktifkan) */}
      {/* <MyServices /> */}

      {/* 8. Tech Stack (Daftar teknologi/bahasa pemrograman/alat yang dikuasai) */}
      <TechStack />

      {/* 9. Partner (Logo/daftar perusahaan mitra yang pernah bekerja sama) */}
      {/* <Partner /> */}

      {/* 10. Testimonials (Ulasan/saran/rekomendasi positif dari klien atau pengguna) */}
      {/* <Testimonials /> */}

      {/* 11. Awards (Daftar pencapaian atau penghargaan yang pernah diraih) */}
      {/* <Awards /> */}

      {/* 12. Work Process (Alur kerja sistematis dari tahap diskusi hingga launching project) */}
      {/* <WorkProcess /> */}

      {/* 13. Pricing Section (Daftar harga/paket layanan yang ditawarkan) */}
      {/* <PricingSection /> */}

      {/* 14. FAQ (Pertanyaan yang sering ditanyakan beserta jawabannya) */}
      {/* <Faq /> */}

      {/* 15. Contact For Work (Formulir/bagian penutup untuk mengajak klien berkolaborasi dan menghubungi Afif) */}
      {/* <ContactForWork /> */}

      {/* 16. Footer (Navigasi penutup halaman, link legalitas, dan copyright) */}
      <Desktop12 />
    </div>
  );
}