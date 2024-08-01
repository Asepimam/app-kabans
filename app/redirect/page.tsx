"use client";

import React, { useEffect } from "react";

export default function Page({ params }: { params: { code: string } }) {
  const ref = React.useRef(false);

  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("searchParams:", params);
    console.log("router.query:", params.code);
  }, [params]);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      const code = params?.code;
      console.log(code);
      if (!code) {
        window.location.href = "/";
      }
      const fetchAuth = async () => {
        try {
          const response = await fetch(`/api/auth?code=${code}`, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);

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
  }, [params]);

  return (
    <div className="pt-12 flex justify-center">
      <div className="flex space-x-4">
        <h1 className="text-xl font-semibold animate-pulse">Authorizing...</h1>
      </div>
    </div>
  );
}
