import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { isAdminUser } from "@/lib/admin-auth";
import AdminDashboard from "./admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  if (!isAdminUser(user.userId,user.email)) return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><div className="rounded-2xl bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-bold">Admin access required</h1><p className="mt-2 text-slate-600">This bookkeeping workspace is available to the business owner.</p></div></main>;
  return <AdminDashboard />;
}
