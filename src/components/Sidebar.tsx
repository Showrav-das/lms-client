"use client";

import {
  ClipboardDocumentIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const adminNavigation = [
  {
    name: "Course",
    href: "/dashboard/course",
    icon: ComputerDesktopIcon,
    current: true,
  },
  {
    name: "Module",
    href: "/dashboard/modules",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Lecture",
    href: "/dashboard/lectures",
    icon: ClipboardDocumentIcon,
    current: false,
  },
];
const userNavigation = [
  {
    name: "My Courses",
    href: "/dashboard/course",
    icon: HomeIcon,
    current: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  role: string | null;
}
export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  role,
}: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    router.replace("/signin");
  };
  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out">
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="-m-2.5 p-2.5"
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="size-6 text-white" />
              </button>
            </div>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">LMS System</div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {role === "admin" ? (
                        <div>
                          {adminNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-[#0a598a]"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                    item.current
                                      ? "text-[#0a598a]"
                                      : "text-gray-400 group-hover:text-indigo-600",
                                    "size-6 shrink-0"
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </div>
                      ) : (
                        <div>
                          {userNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-[#0a598a]"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                    item.current
                                      ? "text-[#0a598a]"
                                      : "text-gray-400 group-hover:text-indigo-600",
                                    "size-6 shrink-0"
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </div>
                      )}
                    </ul>
                  </li>
                </ul>
                <div className="my-4">
                  <button
                    onClick={() => handleLogout()}
                    className="px-3 bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Log out
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">LMS System</div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {role === "admin" ? (
                    <div>
                      {adminNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-[#0a598a]"
                                : "text-[#5da5d2] hover:bg-gray-50 hover:text-[#0a598a]",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-[#0a598a]"
                                  : "text-[#5da5d2] group-hover:text-[#0a598a]",
                                "size-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {userNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-[#0a598a]"
                                : "text-[#5da5d2] hover:bg-gray-50 hover:text-[#0a598a]",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-[#0a598a]"
                                  : "text-[#5da5d2] group-hover:text-[#0a598a]",
                                "size-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  )}
                </ul>
              </li>
            </ul>
            <div className="my-4">
              <button
                onClick={() => handleLogout()}
                className="px-3 bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log out
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
