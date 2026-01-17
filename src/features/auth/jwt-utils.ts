import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!);

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('8h')
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
