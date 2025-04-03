"use client";

import { useState, useEffect } from "react";
import Image from 'next/image'; 
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/users-section/home/Header";
import HeroSection from "@/components/users-section/home/HeroSection";
import FeaturesSection from "@/components/users-section/home/FeaturesSection";
import AdditionalFeaturesSection from "@/components/users-section/home/AdditionalFeaturesSection";
import TestimonialsSection from "@/components/users-section/home/TestimonialsSection";
import Footer from "@/components/users-section/home/Footer";
import ThemeToggle from "@/components/users-section/home/ThemeToggle";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get theme from localStorage or use default
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    setMounted(true);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Wait until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Theme Toggle Button */}
      <div className="fixed right-4 top-24 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Floating Donation Button (Mobile) */}


      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 z-40 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around px-6">
        <Link href="/" className="flex flex-col items-center justify-center text-purple-600 dark:text-purple-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link href="/receipts" className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-xs mt-1">Receipt</span>
        </Link>
        <div className="w-16"> {/* Placeholder for the floating button */}
          <div className="md:hidden fixed bottom-4 z-30">
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </motion.button>
          </div>
        </div>
        <Link href="/photoframing" className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Photos</span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1">Contact</span>
        </Link>
      </div>

      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AdditionalFeaturesSection />
        <TestimonialsSection />
      </main>
      <Footer />

      {/* Preload particle images */}
      <div className="hidden">
        <Image
          src="/images/particle-1.svg"
          alt=""
          width={100} // Set the width of the image (adjust this based on your requirements)
          height={100} // Set the height of the image (adjust this based on your requirements)
        />
        <Image
          src="/images/particle-2.svg"
          alt=""
          width={100} // Set the width of the image (adjust this based on your requirements)
          height={100} // Set the height of the image (adjust this based on your requirements)
        />
      </div>
    </div>
  );
}