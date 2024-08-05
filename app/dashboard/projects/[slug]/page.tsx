import StagesKanbans from "@/components/stages/StagesKanbans";
import { TasksProvider } from "@/utils/contexts/tasksContext";
import { setUpOIDC } from "@/utils/openid/client";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const cookie = await cookies();
  const token = await cookie.get("token")?.value;
  const client = await setUpOIDC();
  const supabase = await createClient();
  let userId: string = "";
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  let profileMatch = {};
  if (token) {
    const { sub } = await client.userinfo(token!);
    profileMatch = { uniq_id: sub };
  } else {
    if (user) {
      profileMatch = { user_id: user.id };
    } else {
      return redirect("/");
    }
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .match(profileMatch)
    .single();
  if (data) {
    userId = data.id;
  }

  return (
    <>
      <TasksProvider idUser={userId}>
        <StagesKanbans slug={params.slug} />
      </TasksProvider>
    </>
  );
}
