"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CTASelectionLP() {
  return (
    <motion.section
      className="text-center py-20 bg-gray-100 px-8"
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">Start using LMS Campus Today</h2>
      <p className="text-lg mb-6">
        Empower your learning experience, wherever you are.
      </p>
      <motion.a
        href="/choose-register"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        whileHover={{ scale: 1.05 }}
      >
        Create Your Account
      </motion.a>
    </motion.section>
  );
}
