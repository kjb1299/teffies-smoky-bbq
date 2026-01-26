"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { adminLoginAction } from "@/features/auth/admin.actions";
import { AdminLoginState } from "@/features/auth/admin.schemas";

export default function AdminLoginForm() {
  const initialState: AdminLoginState = { error: "" };
  const [state, formAction, isPending] = useActionState(adminLoginAction, initialState);

  return (
    <div className="relative min-h-screen bg-[#1E1E1E] flex items-center justify-center p-6 overflow-hidden">
      
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/20 p-10 rounded-xl shadow-2xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-[#F2442E]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
              Secure Terminal
            </span>
          </div>

          <h2 className="font-zilla text-3xl uppercase tracking-wider text-white">
            Admin <span className="text-[#F2442E]">Access</span>
          </h2>
          <div className="h-1 w-20 bg-[#F2442E] mt-4 rounded-full" />
        </div>

        <form action={formAction} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-2 ml-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F2442E] transition-all placeholder:text-gray-700"
              placeholder="ADMIN USERNAME"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2 ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-white/60">
                Password
              </label>
              <Link 
                href="/admin/forgot-password" 
                className="text-[10px] uppercase tracking-tighter text-[#F2442E] hover:text-amber-400 transition-colors font-bold"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F2442E] transition-all placeholder:text-gray-700"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm px-4 py-3 rounded-md text-center font-medium italic">
              {state.error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#F2442E] text-white py-4 rounded-md font-bold shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-lg disabled:opacity-50"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Accent */}
        <div className="mt-10 text-center border-t border-white/10 pt-6">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
            Property of Teffie's BBQ • Warren, MI
          </p>
        </div>
      </div>
    </div>
  );
}
