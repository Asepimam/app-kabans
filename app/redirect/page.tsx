"use client";

import React, { useEffect } from "react";

type Props = {
  searchParams?: {
    code?: string;
  };
};

export default ({ searchParams }: Props) => {
  const ref = React.useRef(false);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      const url = window.location.href;
      const code = url.split("code=")[1];
      const fetchAuth = async () => {
        try {
          const response = await fetch(`/api/auth?code=${code}`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.success) {
            const verifyResponse = await fetch("/api/verifyUsers", {
              method: "GET",
            });

            const verifyResponseData = await verifyResponse.json();
            if (!verifyResponseData.success) {
              throw new Error(`HTTP error! status: ${verifyResponse.status}`);
            }
            window.location.href = "/dashboard";
          }
        } catch (error) {
          console.error("Fetch error:", error);
          window.location.href = "/";
        }
      };
      fetchAuth();
    }
  }, [searchParams]);

  return (
    <div className="pt-12 flex justify-center">
      <div className="flex space-x-4">
        <h1 className="text-xl font-semibold animate-pulse">Authorizing...</h1>
      </div>
    </div>
  );
};
