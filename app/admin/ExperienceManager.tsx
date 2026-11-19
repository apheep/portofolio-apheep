"use client";

import React, { useState } from "react";
import { type PortfolioExperience } from "@/data/experiences";
import {
  createExperience,
  deleteExperience,
  toggleActiveExperience,
  updateExperience,
} from "./actions";

type ExperienceManagerProps = {
  experiences: PortfolioExperience[];
};

export default function ExperienceManager({ experiences }: ExperienceManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "hidden">("all");
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [showMobileForm, setShowMobileForm] = useState(false);

  const filteredExperiences = experiences.filter((exp) => {
    const matchesSearch =
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.date.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterActive === "active") return matchesSearch && exp.is_active;
    if (filterActive === "hidden") return matchesSearch && !exp.is_active;
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
            <span>{showMobileForm ? "Tutup Formulir Tambah Pengalaman" : "+ Tambah Pengalaman Baru"}</span>
          </div>
          <span className="text-xs text-[#f3500f] font-semibold">{showMobileForm ? "▲ Tutup" : "▼ Buka"}</span>
        </button>
      </div>

      {/* Panel Kiri: Form Tambah Pengalaman Baru */}
      <div
        className={`${
          showMobileForm ? "block" : "hidden lg:block"
        } rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-4 sm:p-6 shadow-xl lg:sticky lg:top-6`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
          <div className="p-2 rounded-xl bg-[#f3500f]/10 text-[#f3500f]">
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Tambah Pengalaman Baru</h2>
            <p className="text-xs text-white/50">Lengkapi data riwayat karir/magang Anda.</p>
          </div>
        </div>

        <CreateExperienceForm />
      </div>

      {/* Panel Kanan: Daftar Pengalaman & CRUD */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-3.5 sm:p-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari posisi, perusahaan, atau periode..."
              className="w-full rounded-xl border border-white/10 bg-black/40 pl-10 pr-4 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
            />
            <svg className="absolute left-3.5 top-3.5 size-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
            <button
              type="button"
              onClick={() => setFilterActive("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                filterActive === "all"
                  ? "bg-[#f3500f] text-white"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              Semua ({experiences.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterActive("active")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                filterActive === "active"
                  ? "bg-[#1ef482]/20 border border-[#1ef482]/40 text-[#1ef482]"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              Aktif ({experiences.filter((e) => e.is_active).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterActive("hidden")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                filterActive === "hidden"
                  ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                  : "bg-white/5 text-white/60 hover:text-white border border-white/10"
              }`}
            >
              Draft ({experiences.filter((e) => !e.is_active).length})
            </button>
          </div>
        </div>

        {/* List of Experience Cards */}
        {filteredExperiences.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-white/50">
            <p className="text-sm">Tidak ada data pengalaman yang sesuai kriteria pencarian.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredExperiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isEditing={editingExpId === exp.id}
                onStartEdit={() => setEditingExpId(exp.id)}
                onCancelEdit={() => setEditingExpId(null)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CreateExperienceForm() {
  return (
    <form action={createExperience} className="flex flex-col gap-4 text-xs font-medium">
      <div>
        <label className="block text-white/70 mb-1.5 font-semibold">
          Posisi / Jabatan Pekerjaan <span className="text-[#f3500f]">*</span>
        </label>
        <input
          name="title"
          required
          placeholder="Contoh: Fullstack Web Developer (Freelance)"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
        />
      </div>

      <div>
        <label className="block text-white/70 mb-1.5 font-semibold">
          Nama Perusahaan / Organisasi <span className="text-[#f3500f]">*</span>
        </label>
        <input
          name="company"
          required
          placeholder="Contoh: PT Digilab Mitra Solusi"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-white/70 mb-1.5 font-semibold">
            Periode / Tanggal <span className="text-[#f3500f]">*</span>
          </label>
          <input
            name="date"
            required
            placeholder="Jan 2026 – Present"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
          />
        </div>

        <div>
          <label className="block text-white/70 mb-1.5 font-semibold">Urutan Tampil</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={1}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
          />
        </div>
      </div>

      <div>
        <label className="block text-white/70 mb-1.5 font-semibold">Link LinkedIn / Portofolio</label>
        <input
          name="link"
          defaultValue="https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="exp_is_active"
          name="is_active"
          defaultChecked
          className="size-4 rounded border-white/20 bg-black/40 text-[#f3500f] focus:ring-0"
        />
        <label htmlFor="exp_is_active" className="text-white/80 cursor-pointer text-xs">
          Tampilkan aktif di halaman utama
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-[#f3500f] py-3 text-sm font-bold text-white shadow-lg shadow-[#f3500f]/20 transition hover:bg-[#d8400a] cursor-pointer"
      >
        + Simpan Pengalaman
      </button>
    </form>
  );
}

function ExperienceCard({
  experience,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: {
  experience: PortfolioExperience;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-[#f3500f]/40 bg-[#0d0d0f] p-5 shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <h3 className="text-sm font-bold text-white">Edit Pengalaman</h3>
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-white/50 hover:text-white cursor-pointer"
          >
            Batal ✕
          </button>
        </div>

        <form action={updateExperience} className="flex flex-col gap-4 text-xs font-medium">
          <input type="hidden" name="id" value={experience.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 mb-1 font-semibold">Posisi</label>
              <input
                name="title"
                required
                defaultValue={experience.title}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 font-semibold">Perusahaan</label>
              <input
                name="company"
                required
                defaultValue={experience.company}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-white/70 mb-1 font-semibold">Periode</label>
              <input
                name="date"
                required
                defaultValue={experience.date}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 font-semibold">Urutan</label>
              <input
                type="number"
                name="sort_order"
                defaultValue={experience.sort_order}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 font-semibold">Link</label>
              <input
                name="link"
                defaultValue={experience.link}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`edit_active_${experience.id}`}
              name="is_active"
              defaultChecked={experience.is_active}
              className="size-4 rounded border-white/20 bg-black/40 text-[#f3500f]"
            />
            <label htmlFor={`edit_active_${experience.id}`} className="text-white/80 cursor-pointer text-xs">
              Tampilkan aktif di halaman utama
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-white/70 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#f3500f] text-xs font-bold text-white hover:bg-[#d8400a]"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-5 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white/40">#{experience.sort_order}</span>
          <h3 className="text-base font-bold text-white group-hover:text-[#f3500f] transition-colors">
            {experience.title}
          </h3>
          {experience.is_active ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1ef482]/10 border border-[#1ef482]/30 text-[#1ef482]">
              Aktif
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
              Disembunyikan
            </span>
          )}
        </div>
        <p className="text-xs text-white/70">{experience.company}</p>
        <span className="inline-block mt-1 text-[11px] text-white/50 bg-white/5 rounded-md px-2.5 py-1 w-fit">
          📅 {experience.date}
        </span>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        {/* Toggle Active Button */}
        <form action={toggleActiveExperience}>
          <input type="hidden" name="id" value={experience.id} />
          <input type="hidden" name="current_active" value={String(experience.is_active)} />
          <input type="hidden" name="title" value={experience.title} />
          <input type="hidden" name="company" value={experience.company} />
          <input type="hidden" name="date" value={experience.date} />
          <input type="hidden" name="link" value={experience.link} />
          <input type="hidden" name="sort_order" value={String(experience.sort_order)} />
          <button
            type="submit"
            title={experience.is_active ? "Sembunyikan dari web" : "Tampilkan di web"}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            {experience.is_active ? (
              <svg className="size-4 text-[#1ef482]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="size-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            )}
          </button>
        </form>

        {/* Edit Button */}
        <button
          type="button"
          onClick={onStartEdit}
          className="p-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
          title="Edit data pengalaman"
        >
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* Delete Button */}
        {showDeleteConfirm ? (
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-xl p-1 animate-fadeIn">
            <span className="text-[10px] text-red-300 font-semibold px-1">Hapus?</span>
            <form action={deleteExperience}>
              <input type="hidden" name="id" value={experience.id} />
              <button
                type="submit"
                className="px-2 py-1 rounded-lg bg-red-600 text-[10px] font-bold text-white hover:bg-red-700 cursor-pointer"
              >
                Ya
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-2 py-1 rounded-lg bg-white/10 text-[10px] text-white/70 hover:text-white cursor-pointer"
            >
              Tidak
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="p-2 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 hover:bg-red-500/20 transition cursor-pointer"
            title="Hapus pengalaman"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
