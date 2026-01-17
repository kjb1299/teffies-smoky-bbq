import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/features/auth/jwt-utils";

export async function authGuard(req: NextRequest) {
    const path = req.nextUrl.pathname;
    
    const isLoginRoute = path === "/system-entry";
    const isResetRoute = path === "/system-entry/reset-password";
    const isAdminRoute = path.startsWith("/dashboard");

    const token = req.cookies.get("admin_session")?.value;
    const session = await decrypt(token);

    if (!session) {
        if (isAdminRoute || isResetRoute) {
            return NextResponse.redirect(new URL("/system-entry", req.nextUrl));
        }
        return null;
    }

    if (session.mustChangePassword) {
        if (!isResetRoute) {
            return NextResponse.redirect(new URL("/system-entry/reset-password", req.nextUrl));
        }
        return null; 
    }

    if (isLoginRoute || isResetRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return null;
}
