export type PortfolioTechStack = {
  id: string;
  category: string;
  skills: string[];
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export const fallbackTechStacks: PortfolioTechStack[] = [
  {
    id: "tech-1",
    category: "LANGUAGES",
    skills: ["PHP", "Python", "JavaScript", "TypeScript"],
    sort_order: 1,
    is_active: true,
  },
  {
    id: "tech-2",
    category: "FRAMEWORKS",
    skills: ["Laravel", "Slim PHP", "FastAPI", "Bootstrap", "Tailwind CSS", "Next JS", "React JS"],
    sort_order: 2,
    is_active: true,
  },
  {
    id: "tech-3",
    category: "INFRASTRUCTURE",
    skills: ["Docker", "Git", "Linux", "Nginx", "VPS", "AWS"],
    sort_order: 3,
    is_active: true,
  },
  {
    id: "tech-4",
    category: "DATABASES",
    skills: ["MySQL", "Supabase", "Firebase"],
    sort_order: 4,
    is_active: true,
  },
  {
    id: "tech-5",
    category: "AI & IOT",
    skills: ["OpenAI API", "Machine Learning", "Deep Learning", "LoRa", "ESP32", "Raspberry Pi"],
    sort_order: 5,
    is_active: true,
  },
  {
    id: "tech-6",
    category: "DESIGN",
    skills: ["Figma", "UI/UX"],
    sort_order: 6,
    is_active: true,
  },
];

export function normalizePortfolioTechStack(row: Record<string, unknown>): PortfolioTechStack {
  let skills: string[] = [];

  if (Array.isArray(row.skills)) {
    skills = row.skills.map(String).map((s) => s.trim()).filter(Boolean);
  } else if (typeof row.skills === "string") {
    // Bisa format array string Postgres "{PHP,Python}" atau comma-separated "PHP, Python"
    const cleaned = row.skills.replace(/^\{|\}$/g, "");
    skills = cleaned
      .split(",")
      .map((s) => s.replace(/^"|"$/g, "").trim())
      .filter(Boolean);
  }

  return {
    id: String(row.id ?? ""),
    category: String(row.category ?? "").trim().toUpperCase(),
    skills,
    sort_order: typeof row.sort_order === "number" ? row.sort_order : Number.parseInt(String(row.sort_order ?? "0"), 10) || 0,
    is_active: row.is_active !== false && row.is_active !== "false",
    created_at: typeof row.created_at === "string" ? row.created_at : undefined,
    updated_at: typeof row.updated_at === "string" ? row.updated_at : undefined,
  };
}
