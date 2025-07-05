"use client";
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeatureSelectionLP() {
  return (
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
  );
}
