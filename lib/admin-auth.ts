import { getChatGPTUser } from "@/app/chatgpt-auth";

// The Site owner account is the only bookkeeping administrator.
const OWNER_USER_ID = "d0694732-ebec-4068-8b04-43a8417fd345";
const OWNER_EMAIL = "nockmaina@gmail.com";

export function isAdminUser(userId: string | null | undefined, email?: string | null) {
  return userId === OWNER_USER_ID || email?.toLowerCase() === OWNER_EMAIL || (process.env.NODE_ENV !== "production" && userId === "local_seedy");
}

export async function isAdminRequest() {
  const user = await getChatGPTUser();
  return isAdminUser(user?.userId,user?.email);
}

export const forbidden = () => Response.json({ error: "Admin access required." }, { status: 403 });
