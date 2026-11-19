"use client";

import React, { useState } from "react";
import { type PortfolioProject, normalizeProjectLink } from "@/data/projects";
import { createProject, deleteProject, toggleFeaturedProject, updateProject } from "./actions";

const CATEGORY_PRESETS = [
  "Web Application",
  "E-Commerce Platform",
  "IoT & Embedded System",
  "Automation & Chatbot",
  "Information System",
  "Mobile Application",
];

type ProjectManagerProps = {
  projects: PortfolioProject[];
};

export default function ProjectManager({ projects }: ProjectManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "hidden">("all");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [showMobileForm, setShowMobileForm] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterFeatured === "featured") return matchesSearch && project.is_featured;
    if (filterFeatured === "hidden") return matchesSearch && !project.is_featured;
    return matchesSearch;
  });

  return (
    <div className="grid gap-6 lg:gap-8 lg:grid-cols-[380px_1fr] items-start">
      {/* Tombol Toggle Form di Layar Mobile */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setShowMobileForm(!showMobileForm)}
          className="w-full flex items-center justify-between rounded-2xl border border-[#f3500f]/30 bg-[#f3500f]/10 p-3.5 sm:p-4 text-white font-bold text-sm transition hover:bg-[#f3500f]/15 cursor-pointer shadow-lg shadow-[#f3500f]/10"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#f3500f] text-white">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span>{showMobileForm ? "Tutup Formulir Tambah Project" : "+ Tambah Project Baru"}</span>
          </div>
          <span className="text-xs text-[#f3500f] font-semibold">{showMobileForm ? "▲ Tutup" : "▼ Buka"}</span>
        </button>
      </div>

      {/* Panel Kiri: Form Tambah Project Baru */}
      <div
        className={`${
          showMobileForm ? "block" : "hidden lg:block"
        } rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-4 sm:p-6 shadow-xl lg:sticky lg:top-6`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
          <div className="p-2 rounded-xl bg-[#f3500f]/10 text-[#f3500f]">
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Tambah Project Baru</h2>
            <p className="text-xs text-white/50">Lengkapi formulir untuk menambah karya portofolio.</p>
          </div>
        </div>

        <CreateProjectForm />
      </div>

      {/* Panel Kanan: Daftar Project & Manajemen CRUD */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-3.5 sm:p-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul atau kategori project..."
              className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
            />
            <svg className="absolute left-3.5 top-3.5 size-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
            <button
              type="button"
              onClick={() => setFilterFeatured("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                filterFeatured === "all"
                  ? "bg-[#f3500f] text-white"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              Semua ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterFeatured("featured")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                filterFeatured === "featured"
                  ? "bg-[#1ef482]/20 border border-[#1ef482]/40 text-[#1ef482]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              Featured ({projects.filter((p) => p.is_featured).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterFeatured("hidden")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                filterFeatured === "hidden"
                  ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              Draft ({projects.filter((p) => !p.is_featured).length})
            </button>
          </div>
        </div>

        {/* List of Projects */}
        <div className="flex flex-col gap-4">
          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#0d0d0f]/60 p-12 text-center text-white/50">
              <svg className="size-12 mx-auto mb-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-base font-semibold text-white/80">Tidak ada project yang sesuai</p>
              <p className="text-xs text-white/40 mt-1">Coba ubah kata kunci pencarian atau tambahkan project baru.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id || project.title}
                project={project}
                isEditing={editingProjectId === project.id}
                onToggleEdit={() =>
                  setEditingProjectId(editingProjectId === project.id ? null : project.id)
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CreateProjectForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Web Application");

  return (
    <form action={createProject} className="flex flex-col gap-4">
      {/* Judul */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Judul Project <span className="text-[#f3500f]">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="Contoh: Platform E-Commerce Kuota"
          className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/25 outline-none focus:border-[#f3500f]"
        />
      </div>

      {/* Kategori & Preset */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Kategori <span className="text-[#f3500f]">*</span>
        </label>
        <input
          name="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          placeholder="Pilih atau ketik kategori"
          className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
        />
        <div className="flex flex-wrap gap-1.5 mt-1">
          {CATEGORY_PRESETS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`text-[11px] px-2 py-0.5 rounded-md border transition-all ${
                category === cat
                  ? "bg-[#f3500f]/20 border-[#f3500f] text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tanggal & Urutan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Tanggal / Status <span className="text-[#f3500f]">*</span>
          </label>
          <input
            name="date"
            type="text"
            required
            defaultValue="Apr 2026"
            placeholder="e.g. Apr 2026 / On going"
            className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Urutan Tampil
          </label>
          <input
            name="sort_order"
            type="number"
            defaultValue={1}
            min={0}
            className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
          />
        </div>
      </div>

      {/* URL Gambar + Live Preview */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
          URL Gambar Thumbnail <span className="text-[#f3500f]">*</span>
        </label>
        <input
          name="image"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          placeholder="e.g. /assets/admin.png atau URL luar"
          className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/25 outline-none focus:border-[#f3500f]"
        />
        {imageUrl ? (
          <div className="mt-1 h-32 rounded-xl overflow-hidden border border-white/10 bg-black/50 relative">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        ) : null}
      </div>

      {/* Link Eksternal */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Link Project <span className="text-[#f3500f]">*</span>
        </label>
        <input
          name="link"
          type="text"
          required
          placeholder="e.g. https://kuotaumroh.id atau LinkedIn"
          className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/25 outline-none focus:border-[#f3500f]"
        />
      </div>

      {/* Deskripsi */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
          Deskripsi Ringkas (Opsional)
        </label>
        <textarea
          name="description"
          rows={2}
          placeholder="Catatan atau deskripsi singkat..."
          className="rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-base sm:text-sm text-white placeholder:text-white/25 outline-none focus:border-[#f3500f] resize-y"
        />
      </div>

      {/* Checkbox Featured */}
      <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:bg-white/[0.06] transition-colors">
        <input
          name="is_featured"
          type="checkbox"
          defaultChecked={true}
          className="size-4 accent-[#f3500f] rounded cursor-pointer"
        />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white">Tampilkan di Halaman Utama (Featured)</span>
          <span className="text-[11px] text-white/50">Project akan langsung muncul di Selected Works.</span>
        </div>
      </label>

      {/* Tombol Simpan */}
      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#f3500f] to-[#e04305] py-3 text-sm font-bold text-white shadow-lg shadow-[#f3500f]/20 transition-all hover:brightness-110 active:scale-[0.99] cursor-pointer"
      >
        Tambah Project
      </button>
    </form>
  );
}

function ProjectCard({
  project,
  isEditing,
  onToggleEdit,
}: {
  project: PortfolioProject;
  isEditing: boolean;
  onToggleEdit: () => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20">
      {/* Header Bar Project */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Thumbnail & Detail Singkat */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="size-16 sm:size-20 rounded-xl overflow-hidden border border-white/10 bg-black shrink-0 relative">
            <img src={project.image} alt={project.title} className="size-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#f3500f] bg-[#f3500f]/10 px-2 py-0.5 rounded-md border border-[#f3500f]/20">
                {project.category}
              </span>
              <span className="text-xs text-white/40">#{project.sort_order}</span>
              {project.is_featured ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1ef482] bg-[#1ef482]/10 px-2 py-0.5 rounded-md border border-[#1ef482]/20">
                  <span className="size-1.5 rounded-full bg-[#1ef482]" />
                  Active
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  Hidden
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-white truncate max-w-full">{project.title}</h3>
            <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
              <span>{project.date}</span>
              <span>•</span>
              <a
                href={normalizeProjectLink(project.link)}
                target="_blank"
                rel="noreferrer"
                className="text-[#f3500f] hover:underline truncate max-w-[200px]"
              >
                {project.link}
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          {/* Quick Toggle Featured */}
          <form action={toggleFeaturedProject}>
            <input type="hidden" name="id" value={project.id} />
            <input type="hidden" name="title" value={project.title} />
            <input type="hidden" name="category" value={project.category} />
            <input type="hidden" name="image" value={project.image} />
            <input type="hidden" name="date" value={project.date} />
            <input type="hidden" name="link" value={project.link} />
            <input type="hidden" name="sort_order" value={String(project.sort_order)} />
            <input type="hidden" name="description" value={project.description ?? ""} />
            <input type="hidden" name="current_featured" value={String(project.is_featured)} />
            <button
              type="submit"
              title={project.is_featured ? "Sembunyikan dari Homepage" : "Tampilkan di Homepage"}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                project.is_featured
                  ? "bg-[#1ef482]/10 border-[#1ef482]/30 text-[#1ef482] hover:bg-[#1ef482]/20"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white"
              }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </form>

          {/* Edit Button */}
          <button
            type="button"
            onClick={onToggleEdit}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isEditing
                ? "bg-white text-black border-white"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          >
            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            {isEditing ? "Tutup" : "Edit"}
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-colors"
            title="Hapus Project"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal / Inline warning */}
      {showDeleteConfirm ? (
        <div className="bg-red-950/40 border-t border-red-500/20 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2 text-red-200 text-xs">
            <svg className="size-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Yakin ingin menghapus project <strong>"{project.title}"</strong> secara permanen?</span>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/70 hover:text-white"
            >
              Batal
            </button>
            <form action={deleteProject}>
              <input type="hidden" name="id" value={project.id} />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-red-600 text-xs font-bold text-white hover:bg-red-700"
              >
                Hapus Sekarang
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {/* Inline Edit Form */}
      {isEditing ? (
        <div className="border-t border-white/10 bg-black/40 p-4 sm:p-6 animate-fadeIn">
          <EditProjectForm project={project} onCancel={onToggleEdit} />
        </div>
      ) : null}
    </div>
  );
}

function EditProjectForm({
  project,
  onCancel,
}: {
  project: PortfolioProject;
  onCancel: () => void;
}) {
  const [imageUrl, setImageUrl] = useState(project.image);
  const [category, setCategory] = useState(project.category);

  return (
    <form action={updateProject} className="flex flex-col gap-4">
      <input type="hidden" name="id" value={project.id} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Judul */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-white/70">Judul Project</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={project.title}
            className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
          />
        </div>

        {/* Kategori */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-white/70">Kategori</label>
          <input
            name="category"
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
          />
        </div>

        {/* Tanggal */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-white/70">Tanggal</label>
          <input
            name="date"
            type="text"
            required
            defaultValue={project.date}
            className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
          />
        </div>

        {/* Urutan */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-white/70">Urutan Tampil (Sort Order)</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={project.sort_order}
            className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
          />
        </div>
      </div>

      {/* URL Gambar */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-white/70">URL Gambar</label>
        <div className="flex gap-3 items-center">
          <input
            name="image"
            type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
          />
          {imageUrl ? (
            <div className="size-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
              <img src={imageUrl} alt="" className="size-full object-cover" />
            </div>
          ) : null}
        </div>
      </div>

      {/* Link External */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-white/70">Link Project</label>
        <input
          name="link"
          type="text"
          required
          defaultValue={project.link}
          className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
        />
      </div>

      {/* Deskripsi */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-white/70">Deskripsi</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={project.description ?? ""}
          className="rounded-xl border border-white/10 bg-black/60 px-3.5 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f] resize-y"
        />
      </div>

      {/* Checkbox Featured */}
      <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer">
        <input
          name="is_featured"
          type="checkbox"
          defaultChecked={project.is_featured}
          className="size-4 accent-[#f3500f] rounded cursor-pointer"
        />
        <span className="text-xs font-semibold text-white">Tampilkan di Halaman Utama (Featured)</span>
      </label>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-white/70 hover:text-white"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-[#f3500f] text-xs font-bold text-white hover:bg-[#d9470d] transition-colors"
        >
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}
