import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/features/auth/jwt-utils";

export async function authGuard(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isLoginRoute = path === "/system-entry";

    const token = req.cookies.get("admin_session")?.value;
    const session = await decrypt(token);

    if (!session && !isLoginRoute) {
        return NextResponse.redirect(new URL("/system-entry", req.nextUrl));
    }

    if (session && isLoginRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return null;
}
