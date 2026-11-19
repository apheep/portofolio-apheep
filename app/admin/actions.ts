"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  hasAdminSession,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  createPortfolioProject,
  deletePortfolioProject,
  updatePortfolioProject,
  type PortfolioProjectInput,
} from "@/lib/supabase-projects";

export async function loginAdmin(formData: FormData) {
  const password = getFormString(formData, "password");

  if (!verifyAdminPassword(password)) {
    redirect("/admin?error=invalid-login");
  }

  await setAdminSession();
  redirect("/admin?status=logged-in");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin?status=logged-out");
}

export async function createProject(formData: FormData) {
  await requireAdminSession();

  const project = parseProjectForm(formData);
  if (!project) {
    redirect("/admin?error=validation");
  }

  let nextPath = "/admin?status=created";

  try {
    await createPortfolioProject(project);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal membuat project.", error);
    nextPath = "/admin?error=supabase";
  }

  redirect(nextPath);
}

export async function updateProject(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");
  const project = parseProjectForm(formData);

  if (!id || !project) {
    redirect("/admin?error=validation");
  }

  let nextPath = "/admin?status=updated";

  try {
    await updatePortfolioProject(id, project);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal memperbarui project.", error);
    nextPath = "/admin?error=supabase";
  }

  redirect(nextPath);
}

export async function deleteProject(formData: FormData) {
  await requireAdminSession();

  const id = getFormString(formData, "id");

  if (!id) {
    redirect("/admin?error=validation");
  }

  let nextPath = "/admin?status=deleted";

  try {
    await deletePortfolioProject(id);
    revalidateProjectPages();
  } catch (error) {
    console.error("Gagal menghapus project.", error);
    nextPath = "/admin?error=supabase";
  }

  redirect(nextPath);
}

async function requireAdminSession() {
  if (!(await hasAdminSession())) {
    redirect("/admin?error=unauthorized");
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
    is_featured: formData.get("is_featured") === "on",
    description: description || null,
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
