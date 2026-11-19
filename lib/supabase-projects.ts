import {
  fallbackProjects,
  normalizePortfolioProject,
  type PortfolioProject,
} from "@/data/projects";

export type PortfolioProjectInput = {
  title: string;
  category: string;
  image: string;
  date: string;
  link: string;
  sort_order: number;
  is_featured: boolean;
  description: string | null;
};

const PROJECT_COLUMNS = [
  "id",
  "title",
  "category",
  "image",
  "date",
  "link",
  "sort_order",
  "is_featured",
  "description",
  "created_at",
  "updated_at",
].join(",");

let resolvedProjectsTable: string | null = null;

async function getProjectsTable(isAdmin = false): Promise<string> {
  if (resolvedProjectsTable) {
    return resolvedProjectsTable;
  }
  // Cek tabel singular "portfolio_project" terlebih dahulu (sesuai Supabase user), lalu fallback ke "portfolio_projects"
  const candidateTables = ["portfolio_project", "portfolio_projects"];
  for (const table of candidateTables) {
    try {
      await supabaseRequest(`${table}?select=id&limit=1`, { admin: isAdmin });
      resolvedProjectsTable = table;
      return table;
    } catch {
      // Coba variasi nama tabel berikutnya
    }
  }
  return "portfolio_project";
}

type SupabaseRow = Record<string, unknown>;

type SupabaseRequestOptions = {
  admin?: boolean;
  body?: unknown;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  prefer?: string;
};

export function isSupabaseAdminConfigured() {
  return Boolean(getSupabaseUrl() && (getEnvValue("SUPABASE_SERVICE_ROLE_KEY") || getSupabaseReadKey()));
}

export function getSupabaseConfigIssues() {
  const issues: string[] = [];

  if (!getSupabaseUrl()) {
    issues.push("NEXT_PUBLIC_SUPABASE_URL belum diisi.");
  }

  if (!getSupabaseReadKey()) {
    issues.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY belum diisi.");
  }

  return issues;
}

export type AdminUserRecord = {
  id: string;
  username: string;
  password: string;
  created_at?: string;
  updated_at?: string;
};

export async function findAdminUser(username: string): Promise<AdminUserRecord | null> {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }
  // Mencari di portofolio_admin (sesuai database user) atau portfolio_admin
  const tables = ["portofolio_admin", "portfolio_admin"];
  for (const table of tables) {
    try {
      const rows = await supabaseRequest<AdminUserRecord[]>(
        `${table}?username=eq.${encodeURIComponent(username)}&select=id,username,password&limit=1`,
        { admin: true }
      );
      if (rows && rows.length > 0) {
        return rows[0];
      }
    } catch {
      // Coba tabel berikutnya
    }
  }
  return null;
}

export async function getPublishedProjects() {
  if (!isSupabaseReadConfigured()) {
    return fallbackProjects;
  }

  try {
    const tableName = await getProjectsTable(false);
    const rows = await supabaseRequest<SupabaseRow[]>(
      `${tableName}?select=${encodeURIComponent(PROJECT_COLUMNS)}&is_featured=eq.true&order=${encodeURIComponent("sort_order.asc,created_at.desc")}`,
    );
    const projects = rows.map(normalizePortfolioProject).filter(hasProjectContent);

    return projects.length ? projects : fallbackProjects;
  } catch (error) {
    console.error("Gagal mengambil project dari Supabase.", error);
    return fallbackProjects;
  }
}

export async function getAdminProjects() {
  const tableName = await getProjectsTable(true);
  const rows = await supabaseRequest<SupabaseRow[]>(
    `${tableName}?select=${encodeURIComponent(PROJECT_COLUMNS)}&order=${encodeURIComponent("sort_order.asc,created_at.desc")}`,
    { admin: true },
  );

  return rows.map(normalizePortfolioProject);
}

export async function createPortfolioProject(project: PortfolioProjectInput) {
  const tableName = await getProjectsTable(true);
  await supabaseRequest<SupabaseRow[]>(
    tableName,
    {
      admin: true,
      body: normalizeProjectInput(project),
      method: "POST",
      prefer: "return=minimal",
    },
  );
}

export async function updatePortfolioProject(id: string, project: PortfolioProjectInput) {
  const tableName = await getProjectsTable(true);
  await supabaseRequest<SupabaseRow[]>(
    `${tableName}?id=eq.${encodeURIComponent(id)}`,
    {
      admin: true,
      body: normalizeProjectInput(project),
      method: "PATCH",
      prefer: "return=minimal",
    },
  );
}

export async function deletePortfolioProject(id: string) {
  const tableName = await getProjectsTable(true);
  await supabaseRequest<void>(
    `${tableName}?id=eq.${encodeURIComponent(id)}`,
    {
      admin: true,
      method: "DELETE",
      prefer: "return=minimal",
    },
  );
}

function isSupabaseReadConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseReadKey());
}

function getSupabaseUrl() {
  return (getEnvValue("NEXT_PUBLIC_SUPABASE_URL") || getEnvValue("SUPABASE_URL") || "").replace(/\/$/, "");
}

function getSupabaseReadKey() {
  return (
    getEnvValue("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ||
    getEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
    getEnvValue("SUPABASE_SERVICE_ROLE_KEY") ||
    ""
  );
}

function normalizeProjectInput(project: PortfolioProjectInput) {
  return {
    title: project.title,
    category: project.category,
    image: project.image,
    date: project.date,
    link: project.link,
    sort_order: project.sort_order,
    is_featured: project.is_featured,
    description: project.description,
  };
}

function hasProjectContent(project: PortfolioProject) {
  return Boolean(project.title && project.category && project.image && project.link);
}

export async function supabaseRequest<T>(path: string, options: SupabaseRequestOptions = {}) {
  const url = getSupabaseUrl();
  const key = (options.admin ? getEnvValue("SUPABASE_SERVICE_ROLE_KEY") : "") || getSupabaseReadKey();

  if (!url || !key) {
    throw new Error("Konfigurasi Supabase belum lengkap.");
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    method: options.method ?? "GET",
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {}),
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase request gagal (${response.status}): ${detail}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

function getEnvValue(key: string) {
  const value = process.env[key]?.trim();

  if (!value || isPlaceholderValue(value)) {
    return "";
  }

  return value;
}

function isPlaceholderValue(value: string) {
  return (
    value.startsWith("your-") ||
    value.includes("your-project.supabase.co") ||
    value === "change-this-password" ||
    value === "generate-a-long-random-secret"
  );
}
