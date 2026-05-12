import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/lib/firebase-admin';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID token' }, { status: 400 });
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    // In a real implementation, we would look up the user in our Postgres DB via Prisma
    // const dbUser = await prisma.user.findUnique({ where: { email: decodedToken.email } });
    // const role = dbUser?.role || 'STUDENT';
    
    // For now, we assume STUDENT role.
    const role = 'STUDENT';

    // Create session (sets the httpOnly cookie)
    await createSession(decodedToken.uid, role, decodedToken.email || '');

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
