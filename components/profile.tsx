"use client";
import { useEffect, useState } from "react";
import FormProfile from "./FormProfile";
import Skeleton from "./Skeleton";
interface Profile {
  uniq_id: string;
  user_id: string;
  avatar_url: string;
  email: string;
  full_name: string;
  first_name: string;
  last_name: string;
  birth_date: string;
}
export default function EditProfile(props: { props: Profile }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const { props: profileProps } = props;

  useEffect(() => {
    setProfile(profileProps);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [profileProps]);

  if (loading) {
    return (
      <div className="ml-32">
        <Skeleton />;
      </div>
    );
  }
  return <FormProfile props={profile!} />;
}
