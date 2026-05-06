"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage({ text: error.message, type: "error" });
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage({ text: error.message, type: "error" });
        setLoading(false);
      } else {
        setMessage({
          text: "Check your email to confirm your account.",
          type: "success",
        });
        setLoading(false);
      }
    }
  }

  const labelClass =
    "block text-[12px] font-semibold tracking-widest uppercase leading-none text-on-surface-variant mb-[8px]";
  const inputClass =
    "w-full bg-transparent border-b border-[0.5px] border-black py-[8px] focus:ring-0 focus:outline-none placeholder:text-outline text-[16px] leading-[1.6]";

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="mb-[48px]">
          <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h2>
          <p className="text-[16px] text-on-surface-variant mt-[8px]">
            {mode === "login"
              ? "Access your property wishlist"
              : "Start tracking your rental search"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[0.5px] border-[#e5e5e5] p-[24px] space-y-[24px]"
        >
          {message && (
            <div
              className={`p-[16px] text-[14px] ${
                message.type === "error"
                  ? "bg-error-container text-on-error-container"
                  : "bg-secondary-container text-on-secondary-container"
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <label className={labelClass}>Email</label>
            <input
              required
              type="email"
              className={inputClass}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              required
              type="password"
              className={inputClass}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 text-[12px] font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-[24px] text-center">
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setMessage(null);
            }}
            className="text-[14px] text-on-surface-variant hover:text-black transition-colors underline"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
