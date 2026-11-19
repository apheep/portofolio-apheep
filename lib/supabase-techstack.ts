import {
  fallbackTechStacks,
  normalizePortfolioTechStack,
  type PortfolioTechStack,
} from "@/data/techstack";
import { supabaseRequest } from "./supabase-projects";

export type PortfolioTechStackInput = {
  category: string;
  skills: string[];
  sort_order: number;
  is_active: boolean;
};

const TECH_COLUMNS = [
  "id",
  "category",
  "skills",
  "sort_order",
  "is_active",
  "created_at",
  "updated_at",
].join(",");

let resolvedTechTable: string | null = null;

async function getTechTable(isAdmin = false): Promise<string> {
  if (resolvedTechTable) {
    return resolvedTechTable;
  }
  const candidateTables = [
    "portfolio_tech_stack",
    "portofolio_tech_stack",
    "portfolio_tech_stacks",
    "portofolio_tech_stacks",
  ];
  for (const table of candidateTables) {
    try {
      await supabaseRequest(`${table}?select=id&limit=1`, { admin: isAdmin });
      resolvedTechTable = table;
      return table;
    } catch {
      // Coba tabel berikutnya
    }
  }
  return "portfolio_tech_stack";
}

type SupabaseRow = Record<string, unknown>;

export async function getPublishedTechStacks(): Promise<PortfolioTechStack[]> {
  try {
    const tableName = await getTechTable(false);
    const rows = await supabaseRequest<SupabaseRow[]>(
      `${tableName}?select=${encodeURIComponent(TECH_COLUMNS)}&is_active=eq.true&order=${encodeURIComponent("sort_order.asc,created_at.asc")}`,
    );

    if (rows && rows.length > 0) {
      return rows.map(normalizePortfolioTechStack).filter((t) => Boolean(t.category && t.skills.length > 0));
    }
    return fallbackTechStacks;
  } catch (error) {
    console.error("Gagal mengambil tech stack dari Supabase, menggunakan fallback.", error);
    return fallbackTechStacks;
  }
}

export async function getAdminTechStacks(): Promise<PortfolioTechStack[]> {
  try {
    const tableName = await getTechTable(true);
    const rows = await supabaseRequest<SupabaseRow[]>(
      `${tableName}?select=${encodeURIComponent(TECH_COLUMNS)}&order=${encodeURIComponent("sort_order.asc,created_at.asc")}`,
      { admin: true },
    );

    if (rows && rows.length > 0) {
      return rows.map(normalizePortfolioTechStack);
    }
    return fallbackTechStacks;
  } catch (error) {
    console.error("Gagal mengambil data tech stack untuk admin:", error);
    return fallbackTechStacks;
  }
}

export async function createPortfolioTechStack(input: PortfolioTechStackInput) {
  const tableName = await getTechTable(true);
  await supabaseRequest<SupabaseRow[]>(tableName, {
    admin: true,
    body: {
      category: input.category.toUpperCase(),
      skills: input.skills,
      sort_order: input.sort_order,
      is_active: input.is_active,
    },
    method: "POST",
    prefer: "return=minimal",
  });
}

export async function updatePortfolioTechStack(id: string, input: PortfolioTechStackInput) {
  const tableName = await getTechTable(true);
  await supabaseRequest<SupabaseRow[]>(`${tableName}?id=eq.${encodeURIComponent(id)}`, {
    admin: true,
    body: {
      category: input.category.toUpperCase(),
      skills: input.skills,
      sort_order: input.sort_order,
      is_active: input.is_active,
    },
    method: "PATCH",
    prefer: "return=minimal",
  });
}

export async function deletePortfolioTechStack(id: string) {
  const tableName = await getTechTable(true);
  await supabaseRequest<void>(`${tableName}?id=eq.${encodeURIComponent(id)}`, {
    admin: true,
    method: "DELETE",
    prefer: "return=minimal",
  });
}
