import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fallbackProjects, type PortfolioProject } from "@/data/projects";
import { fallbackExperiences, type PortfolioExperience } from "@/data/experiences";
import { fallbackTechStacks, type PortfolioTechStack } from "@/data/techstack";
import { getAdminSession } from "@/lib/admin-auth";
import { getAdminProjects } from "@/lib/supabase-projects";
import { getAdminExperiences } from "@/lib/supabase-experience";
import { getAdminTechStacks } from "@/lib/supabase-techstack";
import { logoutAdmin } from "./actions";
import ProjectManager from "./ProjectManager";
import ExperienceManager from "./ExperienceManager";
import TechStackManager from "./TechStackManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard Admin | Afif Portofolio",
  description: "Kelola karya, pengalaman kerja, dan keahlian teknologi portofolio Afif.",
};

type AdminPageProps = {
  searchParams?: Promise<{
    error?: string | string[];
    status?: string | string[];
    tab?: string | string[];
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const [rawParams, session] = await Promise.all([
    searchParams,
    getAdminSession(),
  ]);
  const params = rawParams || {};

  // Guard: jika sesi tidak valid, alihkan ke login
  if (!session.isAuthenticated) {
    redirect("/admin/login?error=unauthorized");
  }

  const activeTab = (getParam(params.tab) || "projects").toLowerCase();
  const banner = getBannerMessage(params);

  // Ambil data untuk ketiga modul secara paralel
  const [projectsResult, experiencesResult, techStacksResult] = await Promise.allSettled([
    getAdminProjects(),
    getAdminExperiences(),
    getAdminTechStacks(),
  ]);

  const projects: PortfolioProject[] =
    projectsResult.status === "fulfilled" && projectsResult.value?.length
      ? projectsResult.value
      : fallbackProjects;

  const experiences: PortfolioExperience[] =
    experiencesResult.status === "fulfilled" && experiencesResult.value?.length
      ? experiencesResult.value
      : fallbackExperiences;

  const techStacks: PortfolioTechStack[] =
    techStacksResult.status === "fulfilled" && techStacksResult.value?.length
      ? techStacksResult.value
      : fallbackTechStacks;

  return (
    <main className="min-h-screen bg-[#070708] px-4 py-8 text-white sm:px-6 lg:px-8 font-['Rajdhani',sans-serif]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        {/* Navigation Bar Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-block group">
              <span className="font-['Rajdhani:Bold',sans-serif] text-[28px] font-bold text-white tracking-[0.5px]">
                Afif<span className="text-[#f3500f]">.</span>
              </span>
            </Link>
            <div className="h-6 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-[#1ef482]" />
              <span className="text-xs font-semibold tracking-wide text-white/60">
                Logged in as <strong className="text-white">@{session.username}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Lihat Website
            </Link>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 cursor-pointer"
              >
                <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Keluar
              </button>
            </form>
          </div>
        </header>

        {/* Banner Alert Notifikasi */}
        {banner ? (
          <div className="animate-fadeIn">
            <Banner tone={banner.tone}>{banner.message}</Banner>
          </div>
        ) : null}

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
          <Link
            href="/admin?tab=projects"
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-[#f3500f] text-white shadow-lg shadow-[#f3500f]/25"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            <span>📁</span>
            <span>Portofolio Projects</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeTab === "projects" ? "bg-black/30 text-white" : "bg-white/10 text-white/60"
              }`}
            >
              {projects.length}
            </span>
          </Link>

          <Link
            href="/admin?tab=experiences"
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "experiences"
                ? "bg-[#f3500f] text-white shadow-lg shadow-[#f3500f]/25"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            <span>💼</span>
            <span>Pengalaman Kerja</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeTab === "experiences" ? "bg-black/30 text-white" : "bg-white/10 text-white/60"
              }`}
            >
              {experiences.length}
            </span>
          </Link>

          <Link
            href="/admin?tab=techstack"
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === "techstack"
                ? "bg-[#f3500f] text-white shadow-lg shadow-[#f3500f]/25"
                : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
            }`}
          >
            <span>⚡</span>
            <span>Tech I Work With</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeTab === "techstack" ? "bg-black/30 text-white" : "bg-white/10 text-white/60"
              }`}
            >
              {techStacks.length}
            </span>
          </Link>
        </div>

        {/* Dynamic Metric Overview Cards based on active tab */}
        {renderTabStats(activeTab, projects, experiences, techStacks)}

        {/* Tab Content Manager */}
        {activeTab === "experiences" ? (
          <ExperienceManager experiences={experiences} />
        ) : activeTab === "techstack" ? (
          <TechStackManager techStacks={techStacks} />
        ) : (
          <ProjectManager projects={projects} />
        )}
      </div>
    </main>
  );
}

function renderTabStats(
  activeTab: string,
  projects: PortfolioProject[],
  experiences: PortfolioExperience[],
  techStacks: PortfolioTechStack[],
) {
  if (activeTab === "experiences") {
    const total = experiences.length;
    const active = experiences.filter((e) => e.is_active).length;
    const hidden = experiences.filter((e) => !e.is_active).length;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Pengalaman" value={total} color="white" icon="briefcase" />
        <StatCard title="Aktif di Website" value={active} color="#1ef482" icon="check" />
        <StatCard title="Disembunyikan" value={hidden} color="#f59e0b" icon="eye-off" />
      </div>
    );
  }

  if (activeTab === "techstack") {
    const totalCategories = techStacks.length;
    const totalSkills = techStacks.reduce((sum, t) => sum + t.skills.length, 0);
    const activeCategories = techStacks.filter((t) => t.is_active).length;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Kategori Tech" value={totalCategories} color="white" icon="folder" />
        <StatCard title="Total Skill & Tools" value={totalSkills} color="#38bdf8" icon="code" />
        <StatCard title="Kategori Aktif" value={activeCategories} color="#1ef482" icon="check" />
      </div>
    );
  }

  // Default: projects
  const totalCount = projects.length;
  const featuredCount = projects.filter((p) => p.is_featured).length;
  const draftCount = projects.filter((p) => !p.is_featured).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Total Project" value={totalCount} color="white" icon="layers" />
      <StatCard title="Aktif di Homepage" value={featuredCount} color="#1ef482" icon="check" />
      <StatCard title="Draft / Disembunyikan" value={draftCount} color="#f59e0b" icon="eye-off" />
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
  icon,
}: {
  title: string;
  value: number;
  color: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{title}</p>
        <p className="text-3xl font-extrabold mt-1" style={{ color }}>
          {value}
        </p>
      </div>
      <div className="p-3 rounded-xl bg-white/5 text-white/60">
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon === "check" && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          )}
          {icon === "eye-off" && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
          )}
          {icon === "briefcase" && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          )}
          {icon === "code" && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          )}
          {(icon === "layers" || icon === "folder") && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          )}
        </svg>
      </div>
    </div>
  );
}

function Banner({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "success" | "error" | "info";
}) {
  const styles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    error: "border-red-500/30 bg-red-500/10 text-red-200",
    info: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm flex items-center gap-3 ${styles[tone]}`}>
      <span className="size-2 rounded-full bg-current shrink-0" />
      <span>{children}</span>
    </div>
  );
}

function getBannerMessage(params: Record<string, string | string[] | undefined>) {
  const status = getParam(params.status);
  const error = getParam(params.error);

  if (status) {
    const messages: Record<string, string> = {
      "logged-in": "Selamat datang kembali! Anda berhasil masuk.",
      "logged-out": "Anda telah keluar.",
      created: "Data baru berhasil ditambahkan dan disimpan.",
      updated: "Perubahan data berhasil disimpan.",
      deleted: "Data berhasil dihapus.",
    };

    return { message: messages[status] ?? "Perubahan tersimpan.", tone: "success" as const };
  }

  if (error) {
    const messages: Record<string, string> = {
      "invalid-login": "Kredensial login tidak valid.",
      unauthorized: "Sesi login Anda telah berakhir. Silakan masuk kembali.",
      supabase: "Operasi database gagal. Pastikan tabel di Supabase sudah dibuat.",
      validation: "Harap lengkapi semua data wajib pada formulir.",
    };

    return { message: messages[error] ?? "Terjadi kesalahan.", tone: "error" as const };
  }

  return null;
}

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
