import {
  setUpOIDC
} from "@/utils/openid/client";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  // Get code from searchParam
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  // Try to get assess_Token from IBM server, if get code. If success, generate a respond to save the token, else tell user failed
  if (code != null) {
    const url = `${process.env.REDIRECT_URI}?code=${code}`;
    const client = await setUpOIDC();
    const params = client.callbackParams(url);
    const code_verifier = cookies().get('cv')?.value;
    const nonce = cookies().get('nonce')?.value;
    if(code_verifier) {
      const response = await client
      .callback(process.env.REDIRECT_URI, params, {
        nonce,
        code_verifier,
      }).then((userJWT)=>{
            return new Response(JSON.stringify({ success: true }), {
            status: 200, // HTTP status code for success
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": `token=${userJWT.access_token as string};path=/;httponly`,
            },
          });
        })
        .catch((err) => {
          console.log('ERROR', err);
          return new Response(JSON.stringify({ success: false }), {
            status: 401, // HTTP status code for failed
          });
        });
      // prettier-ignore
      return response;
    }
  }
}
