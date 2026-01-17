import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "./middleware/auth-guard";

export async function proxy(request: NextRequest) {
    const authResponse = await authGuard(request);
    return authResponse || NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};