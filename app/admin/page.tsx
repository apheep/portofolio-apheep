import type { Metadata } from "next";
import Link from "next/link";
import { fallbackProjects, normalizeProjectLink, type PortfolioProject } from "@/data/projects";
import {
  getAdminAuthConfigIssues,
  hasAdminSession,
  isAdminAuthConfigured,
} from "@/lib/admin-auth";
import {
  getAdminProjects,
  getSupabaseConfigIssues,
  isSupabaseAdminConfigured,
} from "@/lib/supabase-projects";
import { createProject, deleteProject, loginAdmin, logoutAdmin, updateProject } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Portofolio",
  description: "Kelola konten project portofolio.",
};

type AdminPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const [params, isLoggedIn] = await Promise.all([
    searchParams ?? Promise.resolve({}),
    hasAdminSession(),
  ]);
  const banner = getBannerMessage(params);
  const authIssues = getAdminAuthConfigIssues();
  const supabaseIssues = getSupabaseConfigIssues();
  const isConfigured = isAdminAuthConfigured() && isSupabaseAdminConfigured();

  if (!isConfigured) {
    return <SetupRequired issues={[...authIssues, ...supabaseIssues]} />;
  }

  if (!isLoggedIn) {
    return <LoginView banner={banner} />;
  }

  let projects: PortfolioProject[] = [];
  let loadError: string | null = null;

  try {
    projects = await getAdminProjects();
  } catch (error) {
    console.error("Gagal memuat project admin.", error);
    loadError = "Project belum bisa dimuat dari Supabase.";
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#f3500f]">
              Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal">Kelola Portofolio</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Tambah, edit, urutkan, tampilkan, atau hapus project yang muncul di halaman utama.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/35 hover:text-white"
            >
              Lihat Website
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-lg border border-[#f3500f]/50 bg-[#f3500f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d9470d]"
              >
                Keluar
              </button>
            </form>
          </div>
        </header>

        {banner ? <Banner tone={banner.tone}>{banner.message}</Banner> : null}
        {loadError ? <Banner tone="error">{loadError}</Banner> : null}

        <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <CreateProjectPanel />
          <ProjectList projects={projects} />
        </section>
      </div>
    </main>
  );
}

function SetupRequired({ issues }: { issues: string[] }) {
  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl rounded-lg border border-white/10 bg-white/[0.04] p-6">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#f3500f]">
          Setup Admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-normal">Konfigurasi belum lengkap</h1>
        <ul className="mt-5 space-y-3 text-sm text-white/70">
          {issues.map((issue) => (
            <li key={issue} className="rounded-lg border border-white/10 bg-black/30 px-4 py-3">
              {issue}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-6 text-white/55">
          Isi env sesuai <code className="text-white">.env.example</code>, jalankan SQL di
          <code className="text-white"> supabase/schema.sql</code>, lalu restart dev server.
        </p>
      </div>
    </main>
  );
}

function LoginView({
  banner,
}: {
  banner: { message: string; tone: "success" | "error" } | null;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#f3500f]">
          Admin
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-normal">Masuk Admin</h1>
        <p className="mt-2 text-sm leading-6 text-white/60">
          Gunakan password admin dari environment untuk mengelola data project.
        </p>
        {banner ? (
          <div className="mt-5">
            <Banner tone={banner.tone}>{banner.message}</Banner>
          </div>
        ) : null}
        <form action={loginAdmin} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-white/75">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-[#f3500f]"
              placeholder="Masukkan password admin"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-[#f3500f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d9470d]"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}

function CreateProjectPanel() {
  return (
    <section className="h-fit rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold tracking-normal">Tambah Project</h2>
      <ProjectFields
        action={createProject}
        submitLabel="Tambah Project"
        project={{
          ...fallbackProjects[0],
          id: "",
          title: "",
          category: "",
          image: "",
          date: "",
          link: "",
          sort_order: 1,
          is_featured: true,
          description: null,
        }}
      />
    </section>
  );
}

function ProjectList({ projects }: { projects: PortfolioProject[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-lg font-semibold tracking-normal">Daftar Project</h2>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/55">
          {projects.length} item
        </span>
      </div>

      <div className="divide-y divide-white/10">
        {projects.length ? (
          projects.map((project) => <ProjectItem key={project.id} project={project} />)
        ) : (
          <p className="px-5 py-10 text-sm text-white/55">Belum ada project di Supabase.</p>
        )}
      </div>
    </section>
  );
}

function ProjectItem({ project }: { project: PortfolioProject }) {
  return (
    <div className="grid gap-5 px-5 py-5 xl:grid-cols-[180px_1fr]">
      <a
        href={normalizeProjectLink(project.link)}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg border border-white/10 bg-black/30"
      >
        <img src={project.image} alt={project.title} className="aspect-[4/3] w-full object-cover" />
      </a>

      <ProjectFields action={updateProject} submitLabel="Simpan" project={project} allowDelete />
    </div>
  );
}

function ProjectFields({
  action,
  allowDelete = false,
  project,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  allowDelete?: boolean;
  project: PortfolioProject;
  submitLabel: string;
}) {
  return (
    <form action={action} className="grid gap-4">
      {project.id ? <input type="hidden" name="id" value={project.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Judul" name="title" defaultValue={project.title} required />
        <TextField label="Kategori" name="category" defaultValue={project.category} required />
        <TextField label="Tanggal" name="date" defaultValue={project.date} required />
        <TextField
          label="Urutan"
          name="sort_order"
          type="number"
          defaultValue={String(project.sort_order)}
        />
      </div>
      <TextField label="URL Gambar" name="image" defaultValue={project.image} required />
      <TextField label="Link Project" name="link" defaultValue={project.link} required />
      <label className="flex flex-col gap-2 text-sm font-medium text-white/70">
        Deskripsi
        <textarea
          name="description"
          defaultValue={project.description ?? ""}
          rows={3}
          className="resize-y rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#f3500f]"
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="inline-flex items-center gap-3 text-sm font-medium text-white/75">
          <input
            name="is_featured"
            type="checkbox"
            defaultChecked={project.is_featured}
            className="size-4 accent-[#f3500f]"
          />
          Tampilkan di halaman utama
        </label>
        <div className="flex gap-3">
          {allowDelete ? (
            <button
              type="submit"
              formAction={deleteProject}
              className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-500/10"
            >
              Hapus
            </button>
          ) : null}
          <button
            type="submit"
            className="rounded-lg bg-[#f3500f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#d9470d]"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

function TextField({
  defaultValue,
  label,
  name,
  required = false,
  type = "text",
}: {
  defaultValue: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-white/70">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="rounded-lg border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#f3500f]"
      />
    </label>
  );
}

function Banner({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "success" | "error";
}) {
  const toneClass =
    tone === "success"
      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
      : "border-red-500/30 bg-red-500/10 text-red-100";

  return <div className={`rounded-lg border px-4 py-3 text-sm ${toneClass}`}>{children}</div>;
}

function getBannerMessage(params: Record<string, string | string[] | undefined>) {
  const status = getParam(params.status);
  const error = getParam(params.error);

  if (status) {
    const messages: Record<string, string> = {
      "logged-in": "Berhasil masuk.",
      "logged-out": "Berhasil keluar.",
      created: "Project berhasil ditambahkan.",
      updated: "Project berhasil diperbarui.",
      deleted: "Project berhasil dihapus.",
    };

    return { message: messages[status] ?? "Perubahan tersimpan.", tone: "success" as const };
  }

  if (error) {
    const messages: Record<string, string> = {
      "invalid-login": "Password admin tidak valid.",
      unauthorized: "Sesi admin habis. Silakan masuk lagi.",
      supabase: "Operasi Supabase gagal. Cek env, tabel, dan RLS policy.",
      validation: "Lengkapi semua field wajib sebelum menyimpan.",
    };

    return { message: messages[error] ?? "Terjadi kesalahan.", tone: "error" as const };
  }

  return null;
}

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
