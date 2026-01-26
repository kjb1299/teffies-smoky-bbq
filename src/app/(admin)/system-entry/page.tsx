"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { adminLoginAction } from "@/features/auth/admin.actions";
import { AdminLoginState } from "@/features/auth/admin.schemas";
import { FormCard, FormField, FormButton } from "@/components/ui/forms";

export default function AdminLoginForm() {
  const initialState: AdminLoginState = { error: "" };
  const [state, formAction, isPending] = useActionState(adminLoginAction, initialState);

  return (
    <div className="relative min-h-screen bg-[#1E1E1E] flex items-center justify-center p-6 overflow-hidden">
      <FormCard title="Admin" highlight="Access" icon={Flame}>
        <form action={formAction} className="space-y-6">
          <FormField 
            label="Username" 
            name="username" 
            required 
            placeholder="ADMIN USERNAME" 
          />

          <FormField 
            label="Password" 
            name="password" 
            type="password" 
            required 
            placeholder="••••••••"
            rightElement={
              <Link 
                href="/admin/forgot-password" 
                className="text-[10px] uppercase tracking-tighter text-[#F2442E] hover:text-amber-400 transition-colors font-bold"
              >
                Forgot Password?
              </Link>
            }
          />

          {state?.error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm px-4 py-3 rounded-md text-center font-medium italic">
              {state.error}
            </div>
          )}

          <FormButton type="submit" isPending={isPending}>
            Sign In
          </FormButton>
        </form>
      </FormCard>
    </div>
  );
}
