import { Issuer, generators } from "openid-client";

export async function setUpOIDC() {
  let tenantURL = process.env.TENANT_URL;

  if(tenantURL?.endsWith('/')) {
    tenantURL = `${tenantURL}oidc/endpoint/default/.well-known/openid-configuration`
  } else {
    tenantURL = `${tenantURL}/oidc/endpoint/default/.well-known/openid-configuration`
  }
  const issuer = await Issuer.discover(tenantURL);
  return new issuer.Client({
    client_id: process.env.CLIENT_ID as string,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: process.env.RESPONSE_TYPE,
    client_secret: process.env.CLIENT_SECRET,
  });
}

export const nonce = generators.nonce();
