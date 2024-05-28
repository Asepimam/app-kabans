import StagesKanbans from "@/components/project/StagesKanbans";
import { createClient } from "@/utils/supabase/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug);
  const { data: stages } = await supabase
    .from("stages")
    .select("*")
    .eq("project_id", projects![0].id);

  return (
    <>
      <StagesKanbans stages={stages!} />
    </>
  );
}
