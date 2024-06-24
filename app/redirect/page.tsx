import { redirect } from "next/navigation";

type Props = {
  searchParams?: {
    code?: string;
  };
};

export default async function AuthRedirectPage({ searchParams }: Props) {
  const code = searchParams?.code;

  if (!code) {
    redirect("/");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth?code=${code}`,
    {
      method: "GET",
    },
  );
  const data = await response.json();

  if (data.success) {
    redirect("/dashboard");
  } else {
    redirect("/");
  }
}
