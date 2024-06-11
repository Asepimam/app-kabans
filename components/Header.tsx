"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "antd";

export default function Header() {
  const supabase = createClient();
  const onStarterClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "/login";
    } else {
      window.location.href = "/dashboard";
    }
  };
  return (
    <div className="flex flex-col gap-16 items-center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}>
        <h3 className="text-3xl font-bold text-center">
          Manage Your Tasks, Schedules and Projects Easier Only With Kabans
        </h3>
        <span className="text-center text-gray-500 mt-2">
          Join us and start managing your tasks effectively.
        </span>
        <Button
          size="large"
          type="primary"
          style={{
            marginTop: "20px",
            boxShadow: "0 3px 1px 0 rgba(0, 0, 0, 0.2)",
          }}
          onClick={onStarterClick}>
          Get Started
        </Button>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
