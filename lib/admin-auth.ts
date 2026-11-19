import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { findAdminUser } from "./supabase-projects";

const ADMIN_COOKIE_NAME = "portfolio_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 jam

export function isAdminAuthConfigured() {
  return Boolean(getEnvValue("ADMIN_SESSION_SECRET") || getEnvValue("ADMIN_PASSWORD"));
}

export function getAdminAuthConfigIssues() {
  const issues: string[] = [];

  if (!getEnvValue("ADMIN_SESSION_SECRET")) {
    issues.push("ADMIN_SESSION_SECRET belum diisi di environment.");
  }

  return issues;
}

/**
 * Memverifikasi kredensial username dan password admin dari database Supabase (tabel portfolio_admin)
 * dengan fallback ke environment jika database belum diatur.
 */
export async function verifyAdminCredentials(
  usernameInput: string,
  passwordInput: string,
): Promise<{ success: boolean; username: string }> {
  const username = usernameInput.trim();
  const password = passwordInput.trim();

  if (!username || !password) {
    return { success: false, username: "" };
  }

  // 1. Cek dari database Supabase (tabel portfolio_admin)
  try {
    const dbUser = await findAdminUser(username);
    if (dbUser && dbUser.password) {
      const isMatch = checkPasswordMatch(password, dbUser.password);
      if (isMatch) {
        return { success: true, username: dbUser.username };
      }
    }
  } catch (err) {
    console.error("Gagal memeriksa user dari Supabase:", err);
  }

  // 2. Fallback ke kredensial env jika tabel database belum dibuat / offline
  const envPassword = getEnvValue("ADMIN_PASSWORD");
  const isDefaultUser =
    username.toLowerCase() === "apip" ||
    username.toLowerCase() === "afif" ||
    username.toLowerCase() === "admin";

  if (isDefaultUser && envPassword && safeEqual(password, envPassword)) {
    return { success: true, username: "afif" };
  }

  // 3. Fallback dev mode jika env belum diisi dan password default afif123
  if (isDefaultUser && !envPassword && password === "afif123") {
    return { success: true, username: "afif" };
  }

  return { success: false, username: "" };
}

/**
 * Mendapatkan detail sesi admin yang aktif saat ini
 */
export async function getAdminSession(): Promise<{ isAuthenticated: boolean; username: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const result = verifySessionToken(token);

  return {
    isAuthenticated: result.valid,
    username: result.username ?? "afif",
  };
}

/**
 * Memeriksa apakah request saat ini memiliki sesi admin valid
 */
export async function hasAdminSession(): Promise<boolean> {
  const session = await getAdminSession();
  return session.isAuthenticated;
}

/**
 * Menyimpan sesi login admin ke dalam cookie terenkripsi
 */
export async function setAdminSession(username: string = "afif") {
  const cookieStore = await cookies();
  const token = createSessionToken(username);

  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Menghapus sesi login admin (logout)
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: ADMIN_COOKIE_NAME,
    path: "/",
  });
}

function createSessionToken(username: string) {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${username}:${expiresAt}`;

  return `${payload}.${signPayload(payload)}`;
}

export function verifySessionToken(token?: string): { valid: boolean; username?: string } {
  if (!token) {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payload, signature] = parts;
  if (!payload || !signature) {
    return { valid: false };
  }

  const [username, expiresAtStr] = payload.split(":");
  const expiresAt = Number.parseInt(expiresAtStr || "0", 10);

  if (!username || !Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return { valid: false };
  }

  const expectedSignature = signPayload(payload);
  if (!safeEqual(signature, expectedSignature)) {
    return { valid: false };
  }

  return { valid: true, username };
}

function signPayload(payload: string) {
  const secret = getEnvValue("ADMIN_SESSION_SECRET") || "portfolio-admin-secret-session-key";
  return createHmac("sha256", secret)
    .update(`portfolio-admin:${payload}`)
    .digest("hex");
}

function checkPasswordMatch(inputPassword: string, storedPassword: string): boolean {
  // Dukungan untuk format salted hash "salt:hash"
  if (storedPassword.includes(":")) {
    const [salt, hash] = storedPassword.split(":");
    if (salt && hash) {
      try {
        const inputHash = scryptSync(inputPassword, salt, 64).toString("hex");
        return safeEqual(inputHash, hash);
      } catch {
        // Fallback jika scrypt gagal
      }
    }
  }

  // Dukungan untuk plaintext (misal data seed awal dari Supabase)
  return safeEqual(inputPassword, storedPassword);
}

function safeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
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
    value === "change-this-password" ||
    value === "generate-a-long-random-secret"
  );
}
