export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  link: string;
  sort_order: number;
  is_featured: boolean;
  description: string | null;
  created_at?: string;
  updated_at?: string;
};

type ProjectRow = Record<string, unknown>;

const fallbackProjectData = [
  {
    id: "admin-dashboard-telkomsel",
    title: "Admin Dashboard - Telkomsel",
    category: "Web Application",
    image: "/assets/admin.png",
    date: "Apr 2026",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330",
  },
  {
    id: "iot-soil-moisture",
    title: "IoT Soil Moisture & Fertility Detection System",
    category: "IoT & Embedded System",
    image: "/assets/IoT.png",
    date: "Dec 2025",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330",
  },
  {
    id: "kuotaumroh",
    title: "Kuotaumroh - Roaming Data Package E-Commerce Platform",
    category: "E-Commerce Platform",
    image: "/assets/kuotaumroh.id.png",
    date: "Jan 2026",
    link: "https://kuotaumroh.id",
  },
  {
    id: "blanjapoin",
    title: "blanjapoin.id - Telkomsel Loyalty Point Redemption Platform",
    category: "Web Platform",
    image: "/assets/blanjapoin.id.png",
    date: "Nov 2025",
    link: "https://blanjapoin.id",
  },
  {
    id: "chatbot-reporting",
    title: "WhatsApp & Telegram Chatbot for BTS Operational Reporting",
    category: "Automation & Chatbot",
    image: "/assets/chatbot.png",
    date: "Mar 2025",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330",
  },
  {
    id: "ambara-dashboard",
    title: "Dashboard System Information PT. Indosat Ooredoo Huthison Region East Java",
    category: "Information System",
    image: "/assets/ambara.png",
    date: "Jan 2025",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330",
  },
  {
    id: "wargame",
    title: "Wargame - Topup and Voucher games E-Commerce Platform",
    category: "E-Commerce Platform",
    image: "/assets/wargame.png",
    date: "On going",
    link: "https://www.linkedin.com/in/m-afif-uhailal-karomi-490787330",
  },
];

export const fallbackProjects: PortfolioProject[] = fallbackProjectData.map(
  (project, index) => ({
    ...project,
    sort_order: index + 1,
    is_featured: true,
    description: null,
  }),
);

export function normalizeProjectLink(link: string) {
  if (!link) {
    return "#";
  }

  if (/^https?:\/\//i.test(link)) {
    return link;
  }

  return `https://${link}`;
}

export function normalizePortfolioProject(row: ProjectRow): PortfolioProject {
  return {
    id: toStringValue(row.id),
    title: toStringValue(row.title),
    category: toStringValue(row.category),
    image: toStringValue(row.image),
    date: toStringValue(row.date),
    link: toStringValue(row.link),
    sort_order: toNumberValue(row.sort_order),
    is_featured: row.is_featured !== false,
    description: toNullableString(row.description),
    created_at: toOptionalString(row.created_at),
    updated_at: toOptionalString(row.updated_at),
  };
}

function toStringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toOptionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function toNullableString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function toNumberValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}
