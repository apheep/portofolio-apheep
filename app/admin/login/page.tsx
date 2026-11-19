import type { Metadata } from "next";
import Link from "next/link";
import { loginAdmin } from "../actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login Admin | Afif Portofolio",
  description: "Masuk ke panel kontrol portofolio.",
};

type LoginPageProps = {
  searchParams?: Promise<{ error?: string | string[]; status?: string | string[]; [key: string]: string | string[] | undefined }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) || {};
  const errorKey = getParam(params.error);
  const statusKey = getParam(params.status);

  const errorMessages: Record<string, string> = {
    "invalid-login": "Username atau password salah. Silakan periksa kembali.",
    unauthorized: "Akses dibatasi. Silakan masuk terlebih dahulu.",
    validation: "Harap isi username dan password Anda.",
    "session-expired": "Sesi Anda telah berakhir. Silakan masuk kembali.",
  };

  const statusMessages: Record<string, string> = {
    "logged-out": "Anda telah berhasil keluar.",
  };

  const errorMessage = errorKey ? errorMessages[errorKey] ?? "Terjadi kesalahan saat masuk." : null;
  const statusMessage = statusKey ? statusMessages[statusKey] ?? null : null;

  return (
    <main className="min-h-screen bg-[#070708] flex items-center justify-center px-4 py-12 relative overflow-hidden text-white font-['Rajdhani',sans-serif]">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f3500f]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="inline-block group mb-3">
            <span className="font-['Rajdhani:Bold',sans-serif] text-[34px] font-bold text-white tracking-[1px] group-hover:text-[#f3500f] transition-colors">
              Afif<span className="text-[#f3500f]">.</span>
            </span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-[#f3500f] mb-3">
            <span className="size-2 rounded-full bg-[#1ef482] animate-pulse" />
            Admin Guard
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Panel Kontrol Portofolio</h1>
          <p className="text-sm text-white/50 mt-1">Masuk untuk mengelola project dan konten portofolio.</p>
        </div>

        {/* Card Login */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0f]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80">
          {errorMessage ? (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 flex items-start gap-3">
              <svg className="size-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          ) : null}

          {statusMessage ? (
            <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 flex items-start gap-3">
              <svg className="size-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{statusMessage}</span>
            </div>
          ) : null}

          <form action={loginAdmin} className="flex flex-col gap-5">
            {/* Field Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide text-white/70">
                Username
              </label>
              <div className="relative">
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  defaultValue="apip"
                  placeholder="Masukkan username"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 pl-11 text-sm text-white placeholder:text-white/25 outline-none transition duration-200 focus:border-[#f3500f] focus:bg-black/60 focus:ring-1 focus:ring-[#f3500f]"
                />
                <svg className="absolute left-3.5 top-3.5 size-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Field Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold tracking-wide text-white/70">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 pl-11 text-sm text-white placeholder:text-white/25 outline-none transition duration-200 focus:border-[#f3500f] focus:bg-black/60 focus:ring-1 focus:ring-[#f3500f]"
                />
                <svg className="absolute left-3.5 top-3.5 size-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#f3500f] to-[#e04305] py-3.5 text-base font-bold text-white shadow-lg shadow-[#f3500f]/20 transition-all duration-300 hover:shadow-[#f3500f]/40 hover:brightness-110 active:scale-[0.99] cursor-pointer"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </main>
  );
}

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
