import { type MenuProps } from "antd";
import Link from "next/link";

import { FaHome } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoLogOutOutline, IoPerson, IoSettingsOutline } from "react-icons/io5";

type MenuItem = Required<MenuProps>["items"][number];

const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  await fetch("/api/logout", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Logout failed", error);
    });
};

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
        icon: <IoPerson />,
        label: (
          <Link
            href="/dashboard/settings/profile"
            target="_self"
            rel="noopener noreferrer">
            Profile
          </Link>
        ),
      },
    ],
  },
  {
    key: "logout",
    label: (
      <button
        className="w-full h-full flex justify-start items-center gap-2"
        onClick={handleClick}>
        <IoLogOutOutline className="w-4 h-4" />{" "}
        <span className="ml-2">Logout</span>
      </button>
    ),
  },
];
