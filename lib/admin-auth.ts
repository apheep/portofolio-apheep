import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "portfolio_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function isAdminAuthConfigured() {
  return Boolean(getEnvValue("ADMIN_PASSWORD") && getEnvValue("ADMIN_SESSION_SECRET"));
}

export function getAdminAuthConfigIssues() {
  const issues: string[] = [];

  if (!getEnvValue("ADMIN_PASSWORD")) {
    issues.push("ADMIN_PASSWORD belum diisi.");
  }

  if (!getEnvValue("ADMIN_SESSION_SECRET")) {
    issues.push("ADMIN_SESSION_SECRET belum diisi.");
  }

  return issues;
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = getEnvValue("ADMIN_PASSWORD");

  if (!expectedPassword) {
    return false;
  }

  return safeEqual(password, expectedPassword);
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  return verifySessionToken(token);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  const token = createSessionToken();

  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

function createSessionToken() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);

  return `${payload}.${signPayload(payload)}`;
}

function verifySessionToken(token?: string) {
  if (!token || !getEnvValue("ADMIN_SESSION_SECRET")) {
    return false;
  }

  const [payload, signature] = token.split(".");
  const expiresAt = Number.parseInt(payload, 10);

  if (!payload || !signature || !Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }

  return safeEqual(signature, signPayload(payload));
}

function signPayload(payload: string) {
  return createHmac("sha256", getEnvValue("ADMIN_SESSION_SECRET"))
    .update(`portfolio-admin:${payload}`)
    .digest("hex");
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
