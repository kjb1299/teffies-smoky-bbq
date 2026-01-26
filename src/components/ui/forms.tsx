import React from "react";
import { LucideIcon } from "lucide-react";

// 1. The Glass Container
export function FormCard({ 
  children, 
  title, 
  highlight, 
  icon: Icon,
  badgeText = "Secure Terminal"
}: { 
  children: React.ReactNode; 
  title: string; 
  highlight?: string;
  icon?: LucideIcon;
  badgeText?: string;
}) {
  return (
    <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/20 p-10 rounded-xl shadow-2xl">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          {Icon && <Icon className="w-5 h-5 text-[#F2442E]" />}
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">
            {badgeText}
          </span>
        </div>
        <h2 className="font-zilla text-3xl uppercase tracking-wider text-white">
          {title} <span className="text-[#F2442E]">{highlight}</span>
        </h2>
        <div className="h-1 w-20 bg-[#F2442E] mt-4 rounded-full" />
      </div>
      {children}
      <div className="mt-10 text-center border-t border-white/10 pt-6">
        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
          Property of Teffie's BBQ • Warren, MI
        </p>
      </div>
    </div>
  );
}

// 2. The Industrial Input
export function FormField({ 
  label, 
  rightElement, 
  ...props 
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; rightElement?: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center ml-1">
        <label className="block text-xs font-bold uppercase tracking-widest text-white/60">
          {label}
        </label>
        {rightElement}
      </div>
      <input
        {...props}
        className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#F2442E] transition-all placeholder:text-gray-700"
      />
    </div>
  );
}

// 3. The BBQ Button
export function FormButton({ isPending, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isPending?: boolean }) {
  return (
    <button
      {...props}
      disabled={isPending || props.disabled}
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
      ) : children}
    </button>
  );
}
