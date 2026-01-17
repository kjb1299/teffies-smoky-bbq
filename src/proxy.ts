// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "./middleware/auth-guard";

export async function proxy(request: NextRequest) {
    const authResponse = await authGuard(request);
    return authResponse || NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
