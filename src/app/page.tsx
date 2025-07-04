// app/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
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

      {/* Hero Section */}
      <motion.section
        className="text-center py-20 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        variants={fadeInUp}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to TAU LMS APP
        </motion.h1>
        <motion.p className="text-lg md:text-xl mb-6" variants={fadeInUp}>
          A modern Learning Management System for better education experience.
        </motion.p>
        <motion.a
          href="/register"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.a>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <FeatureCard
              title={
                index === 0
                  ? "Manage Courses"
                  : index === 1
                  ? "Track Progress"
                  : "Assignment & Quiz"
              }
              description={
                index === 0
                  ? "Create, organize, and manage your class materials efficiently."
                  : index === 1
                  ? "Monitor student performance and progress in real time."
                  : "Create tasks, assignments, and quizzes with automated grading."
              }
            />
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <motion.section
        className="text-center py-20 bg-gray-100 px-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Start using LMS Campus Today
        </h2>
        <p className="text-lg mb-6">
          Empower your learning experience, wherever you are.
        </p>
        <motion.a
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Create Your Account
        </motion.a>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} LMS Campus. All rights reserved.
      </footer>
    </main>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
