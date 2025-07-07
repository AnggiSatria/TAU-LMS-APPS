"use client";

import { useState } from "react";
import { Menu, BookOpen, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useLogout } from "@/shared/lib/services/auth/logout/hooks";
import { Toaster } from "sonner";
import { useReadUserProfile } from "@/shared/lib/services/users/hooks";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/dashboard",
    },
    { name: "My Class", icon: <Users className="w-5 h-5" />, href: "/classes" },
    { name: "Task", icon: <BookOpen className="w-5 h-5" />, href: "/tasks" },
  ];

  const handleNavigateLogout = () => {
    router.push(`/`);
  };

  const activeFilter = {
    search: "",
  };

  const { data: profile } = useReadUserProfile({
    activeFilter: activeFilter,
  });

  const userProfile = profile?.data;

  const { mutations: logoutMutations } = useLogout(handleNavigateLogout);

  const handleLogout = async () => {
    await logoutMutations.mutateAsync();
  };

  return (
    <div
      className={`h-screen bg-white shadow-md ${
        open ? "w-64" : "w-20"
      } transition-all duration-300 flex flex-col`}
    >
      <Toaster position="bottom-right" />
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {open && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo-tau.png"
              alt="Logo Kampus"
              width={32}
              height={32}
            />
            <span className="text-xl font-semibold text-[#0a0a0a]">
              {`${userProfile?.first_name}${" "}${userProfile?.last_name}`}
            </span>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-600 cursor-pointer"
        >
          <Menu className="w-6 h-6 cursor-pointer" />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="mt-4 space-y-1">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2 hover:bg-blue-100 text-gray-700",
                pathname === item.href && "bg-blue-100 font-medium"
              )}
            >
              {item.icon}
              {open && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={clsx(
          "flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition mt-auto w-full cursor-pointer",
          !open && "justify-center"
        )}
      >
        <LogOut className="w-5 h-5" />
        {open && <span>Logout</span>}
      </button>
    </div>
  );
}
