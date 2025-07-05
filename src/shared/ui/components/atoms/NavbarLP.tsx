"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavbarLP() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md">
      <div className="flex items-center gap-4">
        <Link className="" href="/">
          <Image
            src="/assets/images/logo-tau.jpeg"
            alt="Campus Logo"
            className="h-10 w-10"
            width={40}
            height={40}
          />
        </Link>

        <span className="text-xl font-bold">TAU LMS</span>
      </div>
      <a
        href="/login"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Login
      </a>
    </nav>
  );
}
