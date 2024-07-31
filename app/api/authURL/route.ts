import { nonce, setUpOIDC } from "@/utils/openid/client";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import { generators } from "openid-client";


const codeVerifier = generators.codeVerifier();
const codeChallenge = generators.codeChallenge(codeVerifier);

//route for return URL
export async function POST(){
    const cookieStore = cookies()
    cookieStore.set({name: 'cv', value: codeVerifier, httpOnly: true});
    cookieStore.set('nonce', nonce);

    const client = await setUpOIDC();
    // create a Authorization URL
    const authorizationUrl = client.authorizationUrl({
    scope: "openid",
    nonce: cookieStore.get('nonce')?.value,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return NextResponse.json(authorizationUrl);
}