import { setUpOIDC } from '@/utils/openid/client';
import { NextRequest, NextResponse } from 'next/server';

// API handler function
export async function POST(req: NextRequest) {
  try {
    const client = await setUpOIDC();
    const body = await req.json();
    // Mengambil refresh token dari body request
    const { refresh_token } = body;
    console.log(refresh_token);

    if (!refresh_token) {
      return NextResponse.json({ error: 'Refresh token not found' }, { status: 400 });
    }

    // Melakukan refresh token
    const {access_token} =await client.refresh(refresh_token);
    

    return new Response(JSON.stringify({ success:true }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=${access_token}; HttpOnly; Secure; SameSite=None; Path=/;`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
