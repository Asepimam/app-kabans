import StagesKanbans from "@/components/stages/StagesKanbans";
import { TasksProvider } from "@/utils/contexts/tasksContext";
import { setUpOIDC } from "@/utils/openid/client";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { slug: string } }) {
  const cookie = await cookies();
  const token = await cookie.get("token")?.value;
  const client = await setUpOIDC();
  const supabase = await createClient();
  let userId: string = "";
  let matchProfile = {};
  if (!token) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (user) {
      matchProfile = { user_id: user.id };
    }
    console.error("Error in Dashboard function:", userError);
  }
  if (token) {
    const { sub } = await client.userinfo(token!);
    matchProfile = { uniq_id: sub };
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .match(matchProfile)
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
