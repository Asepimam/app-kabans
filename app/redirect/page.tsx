"use client";
import React, { useEffect } from "react";

type Props = {
  searchParams?: {
    code?: string;
  };
};

export default function Page(props: Props) {
  const ref = React.useRef(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      const code = props.searchParams?.code;
      const fetchAuth = async () => {
        try {
          const response = await fetch(
            `${window.location.origin}/api/auth?code=${code}`,
            {
              method: "GET",
            },
          );

          if (response.ok) {
            window.location.href = "/dashboard";
          } else {
            console.log("Authorization failed");
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Fetch error:", error);
          window.location.href = "/";
        }
      };
      fetchAuth();
    }
  }, [props.searchParams]);

  return (
    <div className="pt-12 flex justify-center">
      <div className="flex space-x-4">
        <h1 className="text-xl font-semibold animate-pulse">Authorizing...</h1>
      </div>
    </div>
  );
}
