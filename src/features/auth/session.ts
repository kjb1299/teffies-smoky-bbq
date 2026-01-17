"use server";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { encrypt } from './jwt-utils';

export async function createAdminSession(adminId: string) {
    const duration = 8 * 60 * 60 * 1000; 
    const expiresAt = new Date(Date.now() + duration);
    
    const session = await encrypt({ adminId, role: 'admin', expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('admin_session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'strict', 
        path: '/',
    });
}

export async function deleteAdminSession() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    
    redirect('/system-entry'); 
}
