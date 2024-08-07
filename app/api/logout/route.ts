
import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
  const supabase= createClient();
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value;
  const url = new URL(request.url);
  const origin = url.origin;
  
  if(token){
    await setUpOIDC().then((client) => {
      client.revoke(token);
      cookies().delete('cv');
      cookies().delete('token');
      cookies().delete('refresh_token');
    })
  }else{
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if(user){
      await supabase.auth.signOut();
    }
  }
  
  // prettier-ignore
  return  NextResponse.json({ message: "logout" }, {status: 200});
}
