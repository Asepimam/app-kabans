import { LoginButtons } from "@/components/LoginForm";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login(req: Request) {
  const supabase = createClient();
  const token = cookies().get("token")?.value;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = await fetch(`${baseUrl}/api/auth/authURL`, {
    method: "POST",
  });
  const authURL = await router.json();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && !token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-slate-700">
            Login
          </h1>
          <LoginButtons IbmUrl={authURL} />
        </div>
      </div>
    );
  }

  return redirect("/dashboard");
}
