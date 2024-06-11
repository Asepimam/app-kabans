import { setUpOIDC } from "@/utils/openid/client";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value;
  if(token){
    await setUpOIDC().then((client) => {
      client.revoke(token);
      cookies().delete('cv');
      cookies().delete('token');
    })
  }

  // prettier-ignore
  return new Response(JSON.stringify({ success: true }), {
      status: 302, // HTTP status code for temporary redirection
      headers: {
        "Location": "/",  // The URL to redirect to
        "Content-Type": "application/json",
      },
    });
}
