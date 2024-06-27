import { type MenuProps } from "antd";
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

type MenuItem = Required<MenuProps>["items"][number];

export const MENU_ITEMS: MenuItem[] = [
  {
    key: "Home_sidebar",
    icon: <FaHome />,
    label: (
      <Link href="/dashboard" target="_self" rel="noopener noreferrer">
        Dashboard
      </Link>
    ),
  },
  {
    key: "Projects_sidebar",
    icon: <GoProjectRoadmap />,
    label: (
      <Link href="/dashboard/projects" target="_self" rel="noopener noreferrer">
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
            href="/dashboard/settings/profile"
            target="_self"
            rel="noopener noreferrer">
            Profile
          </Link>
        ),
      },
      {
        key: "Setting_logout",
        label: (
          <Link href="/api/logout" target="_self" rel="noopener noreferrer">
            Logout
          </Link>
        ),
      },
    ],
  },
];
