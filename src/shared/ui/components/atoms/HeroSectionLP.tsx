"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSectionLP() {
  return (
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
        href="/choose-register"
        className="px-6 py-3 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
        whileHover={{ scale: 1.05 }}
      >
        Get Started
      </motion.a>
    </motion.section>
  );
}
