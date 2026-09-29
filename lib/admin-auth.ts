import { env } from "cloudflare:workers";
import { headers } from "next/headers";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { getChatGPTUser } from "@/app/chatgpt-auth";

// ChatGPT Sites supplies a separate, dispatch-verified identity.
const OWNER_USER_ID = "d0694732-ebec-4068-8b04-43a8417fd345";
const OWNER_EMAIL = "nockmaina@gmail.com";
const CLOUDFLARE_HOSTS = new Set(["annercreatives.co.ke", "www.annercreatives.co.ke", "anner-creatives.annercreativeske.workers.dev"]);
const accessKeys = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

type AdminAccessEnv = {
  ADMIN_ACCESS_TEAM_DOMAIN?: string;
  ADMIN_ACCESS_AUDIENCE?: string;
  ADMIN_EMAIL?: string;
};

function accessConfig() {
  return env as unknown as AdminAccessEnv;
}

export async function usesCloudflareAccess() {
  const config = accessConfig();
  const host = (await headers()).get("host")?.split(":")[0]?.toLowerCase();
  if (process.env.NODE_ENV !== "production" && (host === "localhost" || host === "127.0.0.1")) return false;
  return Boolean(config.ADMIN_ACCESS_TEAM_DOMAIN || config.ADMIN_ACCESS_AUDIENCE || config.ADMIN_EMAIL || (host && CLOUDFLARE_HOSTS.has(host)));
}

export function isAdminUser(userId: string | null | undefined, email?: string | null) {
  return userId === OWNER_USER_ID || email?.toLowerCase() === OWNER_EMAIL || (process.env.NODE_ENV !== "production" && userId === "local_seedy");
}

export async function isAdminRequest() {
  if (await usesCloudflareAccess()) {
    const { ADMIN_ACCESS_TEAM_DOMAIN: teamDomain, ADMIN_ACCESS_AUDIENCE: audience, ADMIN_EMAIL: email } = accessConfig();
    const token = (await headers()).get("cf-access-jwt-assertion");
    if (!teamDomain || !audience || !email || !token) return false;
    try {
      let jwks = accessKeys.get(teamDomain);
      if (!jwks) {
        jwks = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`));
        accessKeys.set(teamDomain, jwks);
      }
      const { payload } = await jwtVerify(token, jwks, { issuer: teamDomain, audience });
      return typeof payload.email === "string" && payload.email.toLowerCase() === email.toLowerCase();
    } catch {
      return false;
    }
  }
  const user = await getChatGPTUser();
  return isAdminUser(user?.userId,user?.email);
}

export const forbidden = () => Response.json({ error: "Admin access required." }, { status: 403 });
