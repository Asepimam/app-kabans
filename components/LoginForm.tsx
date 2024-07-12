"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { SiIbm } from "react-icons/si";

export const LoginButtons = () => {
  const supabase = createClient();
  const [authURL, setAuthURL] = useState<string>();
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      fetch("/api/auth/authURL", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setAuthURL(data);
        });
    }
    ref.current = true;
  }, [authURL]);

  const loginGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
  };

  const loginIbm = async () => {
    if (authURL) {
      window.location.href = authURL;
    }
  };
  const loginGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      console.error(error);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        type="primary"
        onClick={loginGoogle}
        className="flex items-center gap-2 w-full"
        size="large"
        icon={<FaGoogle />}>
        Login with Google
      </Button>
      <Button
        type="primary"
        onClick={loginGithub}
        size="large"
        className="flex items-center gap-2 w-full"
        icon={<FaGithub />}>
        Login with Github
      </Button>
      <Button
        type="primary"
        onClick={loginIbm}
        size="large"
        className="flex items-center gap-2 w-full"
        icon={<SiIbm />}>
        Login with IBM
      </Button>
    </div>
  );
};
