"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavbarLP() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 shadow-md bg-blue-700">
      <div className="flex items-center gap-4">
        <Link className="" href="/">
          <Image
            src="/assets/images/logotauwhite.png"
            alt="Campus Logo"
            className="h-fit w-fit"
            width={150}
            height={100}
          />
        </Link>
      </div>
      <a
        href="/login"
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
      >
        Login
      </a>
    </nav>
  );
}
