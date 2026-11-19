"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  hasAdminSession,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import {
  createPortfolioProject,
  deletePortfolioProject,
  updatePortfolioProject,
  type PortfolioProjectInput,
} from "@/lib/supabase-projects";
import {
  createPortfolioExperience,
  deletePortfolioExperience,
  updatePortfolioExperience,
  type PortfolioExperienceInput,
} from "@/lib/supabase-experience";
import {
  createPortfolioTechStack,
  deletePortfolioTechStack,
  updatePortfolioTechStack,
  type PortfolioTechStackInput,
} from "@/lib/supabase-techstack";

export async function loginAdmin(formData: FormData) {
  const username = getFormString(formData, "username").trim();
  const password = getFormString(formData, "password");

  if (!username || !password) {
    redirect("/admin/login?error=validation");
  }

  const result = await verifyAdminCredentials(username, password);

  if (!result.success) {
    redirect("/admin/login?error=invalid-login");
  }

  await setAdminSession(result.username);
  redirect("/admin?status=logged-in");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login?status=logged-out");
}

// ==========================================
// 1. PROJECT CRUD ACTIONS
// ==========================================

export async function createProject(formData: FormData) {
  await requireAdminSession();

  const project = parseProjectForm(formData);
  if (!project) {
    redirect("/admin?tab=projects&error=validation");
  }

  let nextPath = "/admin?tab=projects&status=created";

  try {
    await createPortfolioProject(project);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal membuat project.", error);
    nextPath = "/admin?tab=projects&error=supabase";
  }

  redirect(nextPath);
}

export async function updateProject(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");
  const project = parseProjectForm(formData);

  if (!id || !project) {
    redirect("/admin?tab=projects&error=validation");
  }

  let nextPath = "/admin?tab=projects&status=updated";

  try {
    await updatePortfolioProject(id, project);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal memperbarui project.", error);
    nextPath = "/admin?tab=projects&error=supabase";
  }

  redirect(nextPath);
}

export async function deleteProject(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");

  if (!id) {
    redirect("/admin?tab=projects&error=validation");
  }

  let nextPath = "/admin?tab=projects&status=deleted";

  try {
    await deletePortfolioProject(id);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal menghapus project.", error);
    nextPath = "/admin?tab=projects&error=supabase";
  }

  redirect(nextPath);
}

export async function toggleFeaturedProject(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");
  const currentFeatured = formData.get("current_featured") === "true";
  const project = parseProjectForm(formData);

  if (!id || !project) {
    redirect("/admin?tab=projects&error=validation");
  }

  project.is_featured = !currentFeatured;

  let nextPath = "/admin?tab=projects&status=updated";

  try {
    await updatePortfolioProject(id, project);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal mengubah status featured project.", error);
    nextPath = "/admin?tab=projects&error=supabase";
  }

  redirect(nextPath);
}

// ==========================================
// 2. EXPERIENCE CRUD ACTIONS
// ==========================================

export async function createExperience(formData: FormData) {
  await requireAdminSession();

  const exp = parseExperienceForm(formData);
  if (!exp) {
    redirect("/admin?tab=experiences&error=validation");
  }

  let nextPath = "/admin?tab=experiences&status=created";

  try {
    await createPortfolioExperience(exp);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal membuat pengalaman.", error);
    nextPath = "/admin?tab=experiences&error=supabase";
  }

  redirect(nextPath);
}

export async function updateExperience(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");
  const exp = parseExperienceForm(formData);

  if (!id || !exp) {
    redirect("/admin?tab=experiences&error=validation");
  }

  let nextPath = "/admin?tab=experiences&status=updated";

  try {
    await updatePortfolioExperience(id, exp);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal memperbarui pengalaman.", error);
    nextPath = "/admin?tab=experiences&error=supabase";
  }

  redirect(nextPath);
}

export async function deleteExperience(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");

  if (!id) {
    redirect("/admin?tab=experiences&error=validation");
  }

  let nextPath = "/admin?tab=experiences&status=deleted";

  try {
    await deletePortfolioExperience(id);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal menghapus pengalaman.", error);
    nextPath = "/admin?tab=experiences&error=supabase";
  }

  redirect(nextPath);
}

export async function toggleActiveExperience(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");
  const currentActive = formData.get("current_active") === "true";
  const exp = parseExperienceForm(formData);

  if (!id || !exp) {
    redirect("/admin?tab=experiences&error=validation");
  }

  exp.is_active = !currentActive;

  let nextPath = "/admin?tab=experiences&status=updated";

  try {
    await updatePortfolioExperience(id, exp);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal toggle status pengalaman.", error);
    nextPath = "/admin?tab=experiences&error=supabase";
  }

  redirect(nextPath);
}

// ==========================================
// 3. TECH STACK CRUD ACTIONS
// ==========================================

export async function createTechStack(formData: FormData) {
  await requireAdminSession();

  const tech = parseTechStackForm(formData);
  if (!tech) {
    redirect("/admin?tab=techstack&error=validation");
  }

  let nextPath = "/admin?tab=techstack&status=created";

  try {
    await createPortfolioTechStack(tech);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal membuat tech stack.", error);
    nextPath = "/admin?tab=techstack&error=supabase";
  }

  redirect(nextPath);
}

export async function updateTechStack(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");
  const tech = parseTechStackForm(formData);

  if (!id || !tech) {
    redirect("/admin?tab=techstack&error=validation");
  }

  let nextPath = "/admin?tab=techstack&status=updated";

  try {
    await updatePortfolioTechStack(id, tech);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal memperbarui tech stack.", error);
    nextPath = "/admin?tab=techstack&error=supabase";
  }

  redirect(nextPath);
}

export async function deleteTechStack(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");

  if (!id) {
    redirect("/admin?tab=techstack&error=validation");
  }

  let nextPath = "/admin?tab=techstack&status=deleted";

  try {
    await deletePortfolioTechStack(id);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal menghapus tech stack.", error);
    nextPath = "/admin?tab=techstack&error=supabase";
  }

  redirect(nextPath);
}

export async function toggleActiveTechStack(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");
  const currentActive = formData.get("current_active") === "true";
  const tech = parseTechStackForm(formData);

  if (!id || !tech) {
    redirect("/admin?tab=techstack&error=validation");
  }

  tech.is_active = !currentActive;

  let nextPath = "/admin?tab=techstack&status=updated";

  try {
    await updatePortfolioTechStack(id, tech);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal toggle status tech stack.", error);
    nextPath = "/admin?tab=techstack&error=supabase";
  }

  redirect(nextPath);
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

async function requireAdminSession() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login?error=unauthorized");
  }
}

function parseProjectForm(formData: FormData): PortfolioProjectInput | null {
  const title = getFormString(formData, "title");
  const category = getFormString(formData, "category");
  const image = getFormString(formData, "image");
  const date = getFormString(formData, "date");
  const link = getFormString(formData, "link");
  const sortOrder = Number.parseInt(getFormString(formData, "sort_order"), 10);
  const description = getFormString(formData, "description");

  if (!title || !category || !image || !date || !link) {
    return null;
  }

  return {
    title,
    category,
    image,
    date,
    link,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_featured: formData.get("is_featured") === "on" || formData.get("is_featured") === "true",
    description: description || null,
  };
}

function parseExperienceForm(formData: FormData): PortfolioExperienceInput | null {
  const title = getFormString(formData, "title");
  const company = getFormString(formData, "company");
  const date = getFormString(formData, "date");
  const link = getFormString(formData, "link") || "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330";
  const sortOrder = Number.parseInt(getFormString(formData, "sort_order"), 10);

  if (!title || !company || !date) {
    return null;
  }

  return {
    title,
    company,
    date,
    link,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_active: formData.get("is_active") === "on" || formData.get("is_active") === "true",
  };
}

function parseTechStackForm(formData: FormData): PortfolioTechStackInput | null {
  const category = getFormString(formData, "category");
  const skillsRaw = getFormString(formData, "skills");
  const sortOrder = Number.parseInt(getFormString(formData, "sort_order"), 10);

  if (!category || !skillsRaw) {
    return null;
  }

  const skills = skillsRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (skills.length === 0) {
    return null;
  }

  return {
    category: category.toUpperCase(),
    skills,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_active: formData.get("is_active") === "on" || formData.get("is_active") === "true",
  };
}

function getFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function revalidateProjectPages() {
  revalidatePath("/");
  revalidatePath("/admin");
}
