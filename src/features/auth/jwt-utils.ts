import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

export async function encrypt(payload: { 
    adminId: string; 
    role: string; 
    expiresAt: Date; 
    mustChangePassword?: boolean 
}) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime(payload.expiresAt) 
        .sign(secret);
}

export async function decrypt(token?: string) {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
        return payload;
    } catch {
        return null;
    }
}
