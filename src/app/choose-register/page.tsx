"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function RegisterTypePage() {
  const router = useRouter();

  const options = [
    {
      role: "Student",
      description: "Register as a student to join class",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-300",
      path: "/register?role=student",
      icon: "🎓",
    },
    {
      role: "Teacher",
      description: "Register as a teacher and create learning materials.",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      path: "/register?role=teacher",
      icon: "📚",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      {/* Logo kampus */}

      <Link href="/">
        <Image
          src="/assets/images/logo-tau.png"
          alt="Campus Logo"
          width={100}
          height={100}
          className="mb-8"
        />
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Choose Register As
      </h1>

      {/* Card Pilihan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {options.map((option) => (
          <motion.div
            key={option.role}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push(option.path)}
            className={`p-6 rounded-2xl shadow-lg cursor-pointer border ${option.bgColor} ${option.borderColor} transition`}
          >
            {/* Sub Card */}
            <div className="bg-white w-14 h-14 flex items-center justify-center rounded-xl mb-4 shadow-md text-3xl">
              {option.icon}
            </div>

            {/* Isi Card */}
            <h2 className="text-xl font-semibold text-gray-800">
              {option.role}
            </h2>
            <p className="text-gray-600 mt-2">{option.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
