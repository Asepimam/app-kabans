import { Button, type MenuProps } from "antd";
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { createClient } from "../supabase/client";

type MenuItem = Required<MenuProps>["items"][number];
const onLogout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return window.location.replace("/");
};

export const MENU_ITEMS: MenuItem[] = [
  {
    key: "Home_sidebar",
    icon: <FaHome />,
    label: (
      <Link href="/dasboard" target="_self" rel="noopener noreferrer">
        Dashboard
      </Link>
    ),
  },
  {
    key: "Projects_sidebar",
    icon: <GoProjectRoadmap />,
    label: (
      <Link href="/dasboard/projects" target="_self" rel="noopener noreferrer">
        Projects
      </Link>
    ),
  },
  {
    key: "Setting_sidebar",
    label: "Settings",
    icon: <IoSettingsOutline />,
    children: [
      {
        key: "Setting_profile",
        label: (
          <Link
            href="/dasboard/setting/profile"
            target="_self"
            rel="noopener noreferrer">
            Profile
          </Link>
        ),
      },
      {
        key: "Setting_logout",
        label: (
          <Button onClick={onLogout} type="primary">
            Logout
          </Button>
        ),
      },
    ],
  },
];
