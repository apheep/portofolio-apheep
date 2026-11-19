import {
  fallbackExperiences,
  normalizePortfolioExperience,
  type PortfolioExperience,
} from "@/data/experiences";
import { supabaseRequest } from "./supabase-projects";

export type PortfolioExperienceInput = {
  title: string;
  company: string;
  date: string;
  link: string;
  sort_order: number;
  is_active: boolean;
};

const EXPERIENCE_COLUMNS = [
  "id",
  "title",
  "company",
  "date",
  "link",
  "sort_order",
  "is_active",
  "created_at",
  "updated_at",
].join(",");

let resolvedExperienceTable: string | null = null;

async function getExperienceTable(isAdmin = false): Promise<string> {
  if (resolvedExperienceTable) {
    return resolvedExperienceTable;
  }
  const candidateTables = [
    "portfolio_experience",
    "portofolio_experience",
    "portfolio_experiences",
    "portofolio_experiences",
  ];
  for (const table of candidateTables) {
    try {
      await supabaseRequest(`${table}?select=id&limit=1`, { admin: isAdmin });
      resolvedExperienceTable = table;
      return table;
    } catch {
      // Coba variasi tabel berikutnya
    }
  }
  return "portfolio_experience";
}

type SupabaseRow = Record<string, unknown>;

export async function getPublishedExperiences(): Promise<PortfolioExperience[]> {
  try {
    const tableName = await getExperienceTable(false);
    const rows = await supabaseRequest<SupabaseRow[]>(
      `${tableName}?select=${encodeURIComponent(EXPERIENCE_COLUMNS)}&is_active=eq.true&order=${encodeURIComponent("sort_order.asc,created_at.desc")}`,
    );

    if (rows && rows.length > 0) {
      return rows.map(normalizePortfolioExperience).filter((e) => Boolean(e.title && e.company));
    }
    return fallbackExperiences;
  } catch (error) {
    console.error("Gagal mengambil pengalaman dari Supabase, menggunakan fallback.", error);
    return fallbackExperiences;
  }
}

export async function getAdminExperiences(): Promise<PortfolioExperience[]> {
  try {
    const tableName = await getExperienceTable(true);
    const rows = await supabaseRequest<SupabaseRow[]>(
      `${tableName}?select=${encodeURIComponent(EXPERIENCE_COLUMNS)}&order=${encodeURIComponent("sort_order.asc,created_at.desc")}`,
      { admin: true },
    );

    if (rows && rows.length > 0) {
      return rows.map(normalizePortfolioExperience);
    }
    return fallbackExperiences;
  } catch (error) {
    console.error("Gagal mengambil data pengalaman untuk admin:", error);
    return fallbackExperiences;
  }
}

export async function createPortfolioExperience(input: PortfolioExperienceInput) {
  const tableName = await getExperienceTable(true);
  await supabaseRequest<SupabaseRow[]>(tableName, {
    admin: true,
    body: {
      title: input.title,
      company: input.company,
      date: input.date,
      link: input.link || "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330",
      sort_order: input.sort_order,
      is_active: input.is_active,
    },
    method: "POST",
    prefer: "return=minimal",
  });
}

export async function updatePortfolioExperience(id: string, input: PortfolioExperienceInput) {
  const tableName = await getExperienceTable(true);
  await supabaseRequest<SupabaseRow[]>(`${tableName}?id=eq.${encodeURIComponent(id)}`, {
    admin: true,
    body: {
      title: input.title,
      company: input.company,
      date: input.date,
      link: input.link || "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330",
      sort_order: input.sort_order,
      is_active: input.is_active,
    },
    method: "PATCH",
    prefer: "return=minimal",
  });
}

export async function deletePortfolioExperience(id: string) {
  const tableName = await getExperienceTable(true);
  await supabaseRequest<void>(`${tableName}?id=eq.${encodeURIComponent(id)}`, {
    admin: true,
    method: "DELETE",
    prefer: "return=minimal",
  });
}
