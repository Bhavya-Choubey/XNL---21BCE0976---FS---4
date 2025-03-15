"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 shadow-md p-4 flex justify-between items-center"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FreelanceHub</h1>
      <ThemeToggle />
    </motion.nav>
  );
}
