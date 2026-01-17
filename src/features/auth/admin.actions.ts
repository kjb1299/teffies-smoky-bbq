"use server";

import * as Sentry from "@sentry/nextjs";
import { redirect } from "next/navigation";
import { loginSchema, AdminLoginState } from "@/features/auth/admin.schemas";
import { getAdminByUsername } from "@/services/user.service";
import bcrypt from "bcryptjs";
import { createAdminSession } from "@/features/auth/session";

export async function adminLoginAction(
  prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  let isSuccess = false;

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

      console.log("DEBUG: Admin found?", !!admin);
if (admin) {
  console.log("DEBUG: admin.passwordHash exists?", !!admin.passwordHash);
  const match = await bcrypt.compare(password, admin.passwordHash);
  console.log("DEBUG: Bcrypt match result:", match);
}

      if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
        Sentry.captureMessage(
          `Failed admin login attempt: ${username}`,
          "warning"
        );
        return { error: "Invalid username or password." };
      }

      await createAdminSession(admin._id.toString());

      isSuccess = true;
      return { error: "" };
    }
  );

  if (isSuccess) {
    redirect("/dashboard");
  }

  return result || { error: "An unexpected error occurred." };
}
