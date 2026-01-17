"use server";

import * as Sentry from "@sentry/nextjs";
import { redirect } from "next/navigation";
import { loginSchema, AdminLoginState } from "@/features/auth/admin.schemas";
import { getAdminByUsername } from "@/services/user.service";
import bcrypt from "bcryptjs";
import { createAdminSession } from "@/features/auth/session";
import User from "@/models/User";

export async function resetPasswordAction(
  prevState: any,
  formData: FormData
): Promise<{ error?: string }> {
  let isSuccess = false;

  const result = await Sentry.withServerActionInstrumentation(
    "reset-password",
    { formData, recordResponse: true },
    async () => {
      const password = formData.get("password") as string;
      const confirm = formData.get("confirmPassword") as string;

      if (!password || password.length < 8) {
        return { error: "Password must be at least 8 characters." };
      }
      if (password !== confirm) {
        return { error: "Passwords do not match." };
      }

      const { decrypt } = await import("@/features/auth/jwt-utils");
      const { cookies } = await import("next/headers");
      const token = (await cookies()).get("admin_session")?.value;
      const session = await decrypt(token);

      if (!session?.adminId) {
        return { error: "Session expired. Please log in again." };
      }

      const hashedPassword = await bcrypt.hash(password, 8);
      await User.findByIdAndUpdate(session.adminId, {
        passwordHash: hashedPassword,
        mustChangePassword: false,
      });

      await createAdminSession(session.adminId as string, false);
      
      isSuccess = true;
      return { error: "" };
    }
  );

  if (isSuccess) {
    redirect("/dashboard");
  }

  return result || { error: "An unexpected error occurred." };
}

export async function adminLoginAction(
  prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  let redirectPath: string | null = null;

  const result = await Sentry.withServerActionInstrumentation(
    "admin-login",
    { formData, recordResponse: true },
    async () => {
      const rawData = Object.fromEntries(formData);
      const validated = loginSchema.safeParse(rawData);
      
      if (!validated.success) {
        return { error: "Invalid username or password." };
      }

      const { username, password } = validated.data;
      const admin = await getAdminByUsername(username);

      if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
        Sentry.captureMessage(`Failed admin login attempt: ${username}`, "warning");
        return { error: "Invalid username or password." };
      }

      if (admin.mustChangePassword) {
        await createAdminSession(admin._id.toString(), true);
        redirectPath = "/system-entry/reset-password";
        return { error: "" };
      }

      await createAdminSession(admin._id.toString(), false);
      redirectPath = "/dashboard";
      return { error: "" };
    }
  );

  if (redirectPath) {
    redirect(redirectPath);
  }

  return result || { error: "An unexpected error occurred." };
}
