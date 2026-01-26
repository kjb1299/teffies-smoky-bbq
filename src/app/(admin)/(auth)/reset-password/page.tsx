"use client";

import { useActionState } from "react";
import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";
import { resetPasswordAction } from "@/features/auth/admin.actions";
import { FormCard, FormField, FormButton } from "@/components/ui/forms";

export default function ResetPasswordPage() {
  const initialState = { error: "" };
  const [state, formAction, isPending] = useActionState(resetPasswordAction, initialState);

  return (
    <div className="relative min-h-screen bg-[#1E1E1E] flex items-center justify-center p-6 overflow-hidden">
      <FormCard 
        title="Secure" 
        highlight="Your Access" 
        icon={ShieldCheck}
        badgeText="Security Protocol"
      >
        {/* Extra Security Context Message */}
        <p className="text-gray-500 text-[10px] -mt-4 mb-8 text-center uppercase tracking-widest leading-relaxed">
          Please update your temporary credentials <br /> to manage the Pitmaster dashboard.
        </p>

        <form action={formAction} className="space-y-6">
          <FormField 
            label="New Password"
            name="password"
            type="password"
            required
            minLength={12}
            placeholder="MINIMUM 12 CHARACTERS"
          />

          <FormField 
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            required
            placeholder="REPEAT NEW PASSWORD"
          />

          {state?.error && (
            <div className="flex items-center justify-center gap-3 bg-red-500/20 border border-red-500/50 text-red-200 text-sm px-4 py-3 rounded-md italic">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {state.error}
            </div>
          )}

          <FormButton type="submit" isPending={isPending}>
            Update & Sign In
          </FormButton>
        </form>
      </FormCard>
    </div>
  );
}