"use client";

import React, { useState } from "react";
import { type PortfolioTechStack } from "@/data/techstack";
import {
  createTechStack,
  deleteTechStack,
  toggleActiveTechStack,
  updateTechStack,
} from "./actions";

const CATEGORY_PRESETS = [
  "LANGUAGES",
  "FRAMEWORKS",
  "INFRASTRUCTURE",
  "DATABASES",
  "AI & IOT",
  "DESIGN",
  "TOOLS",
];

type TechStackManagerProps = {
  techStacks: PortfolioTechStack[];
};

export default function TechStackManager({ techStacks }: TechStackManagerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "hidden">("all");
  const [editingTechId, setEditingTechId] = useState<string | null>(null);
  const [showMobileForm, setShowMobileForm] = useState(false);

  const filteredTech = techStacks.filter((item) => {
    const matchesSearch =
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filterActive === "active") return matchesSearch && item.is_active;
    if (filterActive === "hidden") return matchesSearch && !item.is_active;
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
            <span>{showMobileForm ? "Tutup Formulir Tambah Tech Stack" : "+ Tambah Tech Stack Baru"}</span>
          </div>
          <span className="text-xs text-[#f3500f] font-semibold">{showMobileForm ? "▲ Tutup" : "▼ Buka"}</span>
        </button>
      </div>

      {/* Panel Kiri: Form Tambah Kategori & Skills */}
      <div
        className={`${
          showMobileForm ? "block" : "hidden lg:block"
        } rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-4 sm:p-6 shadow-xl lg:sticky lg:top-6`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
          <div className="p-2 rounded-xl bg-[#f3500f]/10 text-[#f3500f]">
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Tambah Tech Stack</h2>
            <p className="text-xs text-white/50">Kelola kelompok teknologi dan keahlian.</p>
          </div>
        </div>

        <CreateTechStackForm />
      </div>

      {/* Panel Kanan: Daftar Tech Stack & CRUD */}
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-3.5 sm:p-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kategori atau nama skill (misal: Python, Docker)..."
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
              Semua ({techStacks.length})
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
              Aktif ({techStacks.filter((t) => t.is_active).length})
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
              Draft ({techStacks.filter((t) => !t.is_active).length})
            </button>
          </div>
        </div>

        {/* List of Tech Stack Cards */}
        {filteredTech.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-white/50">
            <p className="text-sm">Tidak ada kategori teknologi yang cocok.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTech.map((item) => (
              <TechStackCard
                key={item.id}
                item={item}
                isEditing={editingTechId === item.id}
                onStartEdit={() => setEditingTechId(item.id)}
                onCancelEdit={() => setEditingTechId(null)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CreateTechStackForm() {
  const [category, setCategory] = useState("");
  const [skillsInput, setSkillsInput] = useState("");

  const parsedSkills = skillsInput
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <form action={createTechStack} className="flex flex-col gap-4 text-xs font-medium">
      <div>
        <label className="block text-white/70 mb-1.5 font-semibold">
          Nama Kategori <span className="text-[#f3500f]">*</span>
        </label>
        <input
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Contoh: LANGUAGES, FRAMEWORKS"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f] uppercase"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {CATEGORY_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setCategory(preset)}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              + {preset}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-white/70 mb-1.5 font-semibold">
          Daftar Skill / Tools (Pisahkan dengan koma) <span className="text-[#f3500f]">*</span>
        </label>
        <textarea
          name="skills"
          required
          rows={3}
          value={skillsInput}
          onChange={(e) => setSkillsInput(e.target.value)}
          placeholder="Contoh: React, Next.js, TypeScript, Tailwind CSS"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
        />
        {parsedSkills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5 p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-white/40 w-full mb-1">Preview Tag ({parsedSkills.length}):</span>
            {parsedSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#0b0b0c] border border-white/10 rounded-md px-2 py-0.5 text-[11px] text-[#9a9a9f]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-white/70 mb-1.5 font-semibold">Urutan Tampil (Sort Order)</label>
        <input
          type="number"
          name="sort_order"
          defaultValue={1}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder:text-white/30 outline-none focus:border-[#f3500f]"
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="tech_is_active"
          name="is_active"
          defaultChecked
          className="size-4 rounded border-white/20 bg-black/40 text-[#f3500f] focus:ring-0"
        />
        <label htmlFor="tech_is_active" className="text-white/80 cursor-pointer text-xs">
          Tampilkan aktif di homepage
        </label>
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-xl bg-[#f3500f] py-3 text-sm font-bold text-white shadow-lg shadow-[#f3500f]/20 transition hover:bg-[#d8400a] cursor-pointer"
      >
        + Simpan Tech Stack
      </button>
    </form>
  );
}

function TechStackCard({
  item,
  isEditing,
  onStartEdit,
  onCancelEdit,
}: {
  item: PortfolioTechStack;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [skillsText, setSkillsText] = useState(item.skills.join(", "));

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-[#f3500f]/40 bg-[#0d0d0f] p-5 shadow-2xl animate-fadeIn">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <h3 className="text-sm font-bold text-white">Edit Tech Stack #{item.sort_order}</h3>
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-white/50 hover:text-white cursor-pointer"
          >
            Batal ✕
          </button>
        </div>

        <form action={updateTechStack} className="flex flex-col gap-4 text-xs font-medium">
          <input type="hidden" name="id" value={item.id} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/70 mb-1 font-semibold">Kategori</label>
              <input
                name="category"
                required
                defaultValue={item.category}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f] uppercase"
              />
            </div>
            <div>
              <label className="block text-white/70 mb-1 font-semibold">Urutan (Sort Order)</label>
              <input
                type="number"
                name="sort_order"
                defaultValue={item.sort_order}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 mb-1 font-semibold">Skills (Pisahkan dengan koma)</label>
            <textarea
              name="skills"
              required
              rows={3}
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-base sm:text-sm text-white outline-none focus:border-[#f3500f]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`edit_tech_active_${item.id}`}
              name="is_active"
              defaultChecked={item.is_active}
              className="size-4 rounded border-white/20 bg-black/40 text-[#f3500f]"
            />
            <label htmlFor={`edit_tech_active_${item.id}`} className="text-white/80 cursor-pointer text-xs">
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
    <div className="group rounded-2xl border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-xl p-5 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white/40">#{item.sort_order}</span>
          <span className="font-['Rajdhani:SemiBold',sans-serif] text-[13px] text-[#555558] tracking-[0.1em] font-semibold">
            {item.category}
          </span>
          {item.is_active ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1ef482]/10 border border-[#1ef482]/30 text-[#1ef482]">
              Aktif
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300">
              Disembunyikan
            </span>
          )}
        </div>

        {/* Skill Pills preview */}
        <div className="flex flex-wrap gap-2 pt-1">
          {item.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-[#0b0b0c] border border-white/10 rounded-[8px] px-3 py-1 hover:border-[#f3500f]/30 transition-all"
            >
              <span className="text-xs text-[#9a9a9f] font-medium">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
        {/* Toggle Active Button */}
        <form action={toggleActiveTechStack}>
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="current_active" value={String(item.is_active)} />
          <input type="hidden" name="category" value={item.category} />
          <input type="hidden" name="skills" value={item.skills.join(", ")} />
          <input type="hidden" name="sort_order" value={String(item.sort_order)} />
          <button
            type="submit"
            title={item.is_active ? "Sembunyikan dari web" : "Tampilkan di web"}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            {item.is_active ? (
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
          title="Edit kategori & skills"
        >
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>

        {/* Delete Button */}
        {showDeleteConfirm ? (
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-xl p-1 animate-fadeIn">
            <span className="text-[10px] text-red-300 font-semibold px-1">Hapus?</span>
            <form action={deleteTechStack}>
              <input type="hidden" name="id" value={item.id} />
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
            title="Hapus kelompok teknologi ini"
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
