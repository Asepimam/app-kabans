import { setUpOIDC } from "@/utils/openid/client";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // Get code from searchParam
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    
    // If code is present, proceed with OIDC callback
    if (code) {
      const url = `${process.env.REDIRECT_URI}?code=${code}`;
      const client = await setUpOIDC();
      const params = client.callbackParams(url);
      
      // Get code_verifier and nonce from cookies
      const code_verifier = cookies().get('cv')?.value;
      const nonce = cookies().get('nonce')?.value;
      
      // Ensure code_verifier is available before proceeding
      if (code_verifier) {
        // Perform OIDC callback
        const userJWT = await client.callback(process.env.REDIRECT_URI, params, {
          nonce,
          code_verifier,
        });

        // Extract access token from userJWT
        const token = userJWT.access_token as string;

        // Get user info using the obtained access token
        const userinfo = await client.userinfo(token);

        // Initialize Supabase client
        const supabase = createClient();

        // Check if user profile already exists in the database
        const { data: profiles } = await supabase
          .from('profiles')
          .select('uniq_id')
          .eq('uniq_id', userinfo.sub)
          .single();

        // If profile does not exist, upsert the profile
        if (!profiles) {
          await supabase.from('profiles').upsert({
            uniq_id: userinfo.sub,
            full_name: userinfo.name,
          });
        }
       
        // Return success response with token in a cookie
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict`,
          },
        });
      }
    }

    // If code_verifier is not available or any other failure, return failure response
    return new Response(JSON.stringify({ success: false }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing OIDC callback:", error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
