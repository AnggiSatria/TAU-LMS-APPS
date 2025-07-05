"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({
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
