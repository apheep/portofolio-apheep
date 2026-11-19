export type PortfolioExperience = {
  id: string;
  title: string;
  company: string;
  date: string;
  link: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export const fallbackExperiences: PortfolioExperience[] = [
  {
    id: "exp-1",
    title: "Fullstack Web Developer (Freelance)",
    company: "PT Digilab Mitra Solusi",
    date: "Jan 2026 – Present",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "exp-2",
    title: "Software Engineer (Contract)",
    company: "PT Telekomunikasi Selular (Telkomsel)",
    date: "Dec 2025 – Present",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "exp-3",
    title: "Fullstack Web Developer (Internship)",
    company: "PT Telekomunikasi Selular (Telkomsel)",
    date: "Jul 2025 – Dec 2025",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "exp-4",
    title: "Software Engineer (Internship)",
    company: "PT. Indosat Ooredoo Hutchison – Region East Java",
    date: "Jan 2025 – Jun 2025",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    sort_order: 4,
    is_active: true,
  },
];

export function normalizePortfolioExperience(row: Record<string, unknown>): PortfolioExperience {
  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? "").trim(),
    company: String(row.company ?? "").trim(),
    date: String(row.date ?? "").trim(),
    link: String(row.link ?? "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330").trim(),
    sort_order: typeof row.sort_order === "number" ? row.sort_order : Number.parseInt(String(row.sort_order ?? "0"), 10) || 0,
    is_active: row.is_active !== false && row.is_active !== "false",
    created_at: typeof row.created_at === "string" ? row.created_at : undefined,
    updated_at: typeof row.updated_at === "string" ? row.updated_at : undefined,
  };
}
