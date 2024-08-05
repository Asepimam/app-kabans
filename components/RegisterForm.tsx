"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";

export const RegisterButton = () => {
  const supabase = createClient();
  const [authURL, setAuthURL] = useState<string>();
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      const fetchAuth = async () => {
        const response = await fetch("/api/authURL", {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => {
            setAuthURL(data);
          });
      };
      fetchAuth();
    }
  }, []);
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
        size="large">
        <div className="flex items-center justify-center gap-2.5">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          Login with Google
        </div>
      </Button>
      <Button
        type="primary"
        onClick={loginGithub}
        size="large"
        className="flex items-center gap-2 w-full">
        <div className="flex items-center justify-center gap-2.5">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 30 30">
            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
          </svg>
          Login with Github
        </div>
      </Button>
      <Button
        type="primary"
        href={authURL}
        size="large"
        className="flex items-center gap-2 w-full">
        <div className="flex items-center justify-center gap-2.5">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 50 50">
            <path d="M 0 14.007813 L 9.734375 14.007813 L 9.734375 15.378906 L 0 15.378906 Z M 21.589844 14.007813 L 11.128906 14.007813 L 11.128906 15.378906 L 25.074219 15.378906 L 24.855469 15.167969 L 24.574219 14.964844 L 24.28125 14.761719 L 23.960938 14.59375 L 23.644531 14.441406 L 23.324219 14.3125 L 22.980469 14.199219 L 22.632813 14.125 L 22.292969 14.0625 L 21.953125 14.007813 Z M 27.816406 14.007813 L 27.816406 15.378906 L 36.214844 15.378906 L 35.730469 14.007813 Z M 42.160156 14.007813 L 41.675781 15.378906 L 50 15.378906 L 50 14.007813 Z M 0 16.675781 L 0 18.023438 L 9.734375 18.023438 L 9.734375 16.675781 Z M 2.78125 19.316406 L 2.78125 20.695313 L 6.941406 20.695313 L 6.941406 19.316406 Z M 2.78125 21.96875 L 2.78125 23.351563 L 6.941406 23.351563 L 6.941406 21.96875 Z M 26.058594 16.675781 L 11.128906 16.675781 L 11.128906 18.023438 L 26.578125 18.023438 L 26.414063 17.480469 L 26.285156 17.125 L 26.132813 16.804688 Z M 13.910156 19.316406 L 13.910156 20.695313 L 18.066406 20.695313 L 18.066406 19.316406 Z M 26.707031 19.316406 L 22.253906 19.316406 L 22.253906 20.695313 L 26.480469 20.695313 L 26.519531 20.578125 L 26.601563 20.238281 L 26.65625 19.890625 L 26.695313 19.535156 Z M 25.890625 21.96875 L 13.910156 21.96875 L 13.910156 23.351563 L 24.574219 23.351563 L 24.808594 23.195313 L 25.074219 22.964844 L 25.316406 22.710938 L 25.542969 22.445313 L 25.761719 22.164063 Z M 27.816406 16.675781 L 27.816406 18.023438 L 37.144531 18.023438 L 36.660156 16.675781 Z M 50 16.675781 L 41.226563 16.675781 L 40.757813 18.023438 L 50 18.023438 Z M 30.601563 19.316406 L 30.601563 20.695313 L 38.0625 20.695313 L 37.578125 19.316406 Z M 47.289063 19.316406 L 40.296875 19.316406 L 39.820313 20.695313 L 47.289063 20.695313 Z M 35.210938 23.347656 L 42.695313 23.347656 L 43.117188 22.121094 L 43.117188 23.347656 L 47.289063 23.347656 L 47.289063 21.96875 L 39.378906 21.96875 L 38.945313 23.195313 L 38.511719 21.96875 L 30.601563 21.96875 L 30.601563 23.347656 L 34.773438 23.347656 L 34.773438 22.113281 Z M 0 32.601563 L 0 33.992188 L 9.734375 33.992188 L 9.734375 32.601563 Z M 0 29.929688 L 0 31.320313 L 9.734375 31.320313 L 9.734375 29.929688 Z M 2.78125 24.636719 L 2.78125 26.003906 L 6.941406 26.003906 L 6.941406 24.636719 Z M 2.78125 27.289063 L 2.78125 28.667969 L 6.941406 28.667969 L 6.941406 27.289063 Z M 24.574219 24.636719 L 13.910156 24.636719 L 13.910156 26.003906 L 25.890625 26.003906 L 25.761719 25.839844 L 25.542969 25.558594 L 25.316406 25.289063 L 25.074219 25.03125 L 24.804688 24.804688 Z M 13.910156 27.289063 L 13.910156 28.667969 L 18.066406 28.667969 L 18.066406 27.289063 Z M 26.480469 27.289063 L 22.253906 27.289063 L 22.253906 28.667969 L 26.707031 28.667969 L 26.699219 28.460938 L 26.65625 28.105469 L 26.605469 27.765625 L 26.519531 27.421875 Z M 26.578125 29.929688 L 11.128906 29.929688 L 11.128906 31.320313 L 26.058594 31.320313 L 26.132813 31.199219 L 26.285156 30.875 L 26.414063 30.542969 L 26.519531 30.210938 Z M 25.074219 32.601563 L 11.128906 32.601563 L 11.128906 33.992188 L 21.539063 33.992188 L 21.898438 33.976563 L 22.253906 33.9375 L 22.585938 33.875 L 22.929688 33.800781 L 23.277344 33.679688 L 23.59375 33.558594 L 23.914063 33.402344 L 24.234375 33.234375 L 24.523438 33.042969 L 24.808594 32.824219 Z M 30.601563 24.636719 L 30.601563 26.003906 L 34.773438 26.003906 L 34.773438 24.636719 Z M 41.765625 26.003906 L 42.246094 24.636719 L 35.640625 24.636719 L 36.109375 26.003906 Z M 43.117188 24.636719 L 43.117188 26.003906 L 47.289063 26.003906 L 47.289063 24.636719 Z M 30.601563 27.289063 L 30.601563 28.667969 L 34.773438 28.667969 L 34.773438 27.289063 Z M 41.34375 27.289063 L 36.546875 27.289063 L 37.019531 28.667969 L 40.871094 28.667969 Z M 43.117188 27.289063 L 43.117188 28.667969 L 47.289063 28.667969 L 47.289063 27.289063 Z M 27.816406 29.929688 L 27.816406 31.320313 L 34.773438 31.320313 L 34.773438 29.929688 Z M 40.433594 29.929688 L 37.449219 29.929688 L 37.925781 31.320313 L 39.964844 31.320313 Z M 43.117188 29.929688 L 43.117188 31.320313 L 50 31.320313 L 50 29.929688 Z M 27.816406 32.601563 L 27.816406 33.992188 L 34.773438 33.992188 L 34.773438 32.601563 Z M 43.117188 32.601563 L 43.117188 33.992188 L 50 33.992188 L 50 32.601563 Z M 39.042969 33.992188 L 39.519531 32.605469 L 38.371094 32.605469 L 38.839844 33.992188 Z"></path>
          </svg>
          Login with IBM
        </div>
      </Button>
    </div>
  );
};
