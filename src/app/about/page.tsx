// src/app/about/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/users-section/home/ThemeToggle";

export default function AboutPage() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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

  if (!mounted) return null;

  const team = [
    {
      name: "Sheikh Ahmed Qasim",
      position: "Founder & Director",
      bio: "Sheikh Ahmed has dedicated over 25 years to Islamic education and orphan welfare, guiding Akode Islamic Centre with compassion and vision.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Hafiz Ismail",
      position: "Head of Hifz Program",
      bio: "Hafiz Ismail oversees the Quran Memorization program, ensuring students excel in their spiritual and academic journey.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Amina Rahman",
      position: "Coordinator, Daiya Islamic Academy",
      bio: "Amina leads the higher studies program for girls, empowering young women with Islamic and modern education.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Yusuf Khan",
      position: "Community Welfare Manager",
      bio: "Yusuf ensures the well-being of over 450 orphans, coordinating support for their homes and families.",
      image: "/api/placeholder/300/300",
    },
  ];

  const milestones = [
    {
      year: "2000",
      title: "Akode Islamic Centre Founded",
      description: "Established as an educational and cultural hub with a mission to support orphans and promote Islamic learning.",
    },
    {
      year: "2005",
      title: "Hifz Program Launched",
      description: "Oorkadavu Qasim Musliyar Thahfeezul Quran College began, offering Quran memorization to students.",
    },
    {
      year: "2010",
      title: "Orphan Care Initiative",
      description: "Started caring for 450+ orphans, ensuring they live safely with their mothers under AIC's support.",
    },
    {
      year: "2015",
      title: "Expansion of Institutes",
      description: "Added Islamic Da'wa Academy, Daiya Islamic Academy, and AMUP School to enhance educational offerings.",
    },
    {
      year: "2020",
      title: "Cultural and Nursery Programs",
      description: "Introduced Bright Public Nursery School and Ayaadi Life Education to broaden community impact.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Theme Toggle Button */}
      <div className="fixed right-4 top-24 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">About Akode Islamic Centre</h1>
          <p className="text-xl text-indigo-200 max-w-3xl">Discover our mission to educate, uplift orphans, and enrich our community through culture and faith.</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block p-2 px-5 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-800 dark:text-indigo-200 font-medium text-sm mb-3">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-6">Nurturing Education and Orphan Care</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Akode Islamic Centre (AIC) is dedicated to providing exceptional Islamic education and comprehensive care for orphans. As an Educational & Cultural Centre, we operate over five institutes, serving our community with faith-based learning and cultural enrichment.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We proudly support over 450 orphans, ensuring they live safely and happily at home with their mothers. Our holistic approach combines spiritual growth, academic excellence, and community welfare, rooted in Islamic values.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Quran memorization and Islamic education",
                  "Care for 450+ orphans with their families",
                  "Higher studies for boys and girls",
                  "Cultural and primary education programs",
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl">
                <Image src="/api/placeholder/600/800" alt="Our Mission" className="object-cover" fill />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our History Timeline */}
      <section className="py-16 px-6 bg-indigo-50 dark:bg-gray-700">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block p-2 px-5 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-800 dark:text-purple-200 font-medium text-sm mb-3">
              Our Journey
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">Key Milestones of Akode Islamic Centre</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our journey reflects a commitment to education, orphan welfare, and cultural development, impacting thousands of lives.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200 dark:bg-indigo-600"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="md:w-1/2"></div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center z-10 text-lg font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-medium rounded-full mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block p-2 px-5 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-800 dark:text-indigo-200 font-medium text-sm mb-3">
              Our Team
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">The Heart of Akode Islamic Centre</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our team is driven by a passion for Islamic education and orphan care, working tirelessly to serve our community.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image src={member.image} alt={member.name} className="object-cover" fill />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Institutes Section */}
      <section className="py-16 px-6 bg-indigo-50 dark:bg-gray-700">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block p-2 px-5 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-800 dark:text-purple-200 font-medium text-sm mb-3">
              Our Institutes
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-4">Educational Excellence at AIC</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We operate over five institutes, each dedicated to fostering Islamic education, cultural growth, and academic success.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Oorkadavu Qasim Musliyar Thahfeezul Quran College",
                desc: "A premier institute for Quran memorization (Hifz Program).",
              },
              {
                name: "Islamic Da'wa Academy",
                desc: "Higher studies program for boys after completing Hifz.",
              },
              {
                name: "Daiya Islamic Academy",
                desc: "Higher studies program for girls after SSLC.",
              },
              {
                name: "AMUP School",
                desc: "Aided Upper Primary School for foundational education.",
              },
              {
                name: "Bright Public Nursery School",
                desc: "Nursery education with a focus on early development.",
              },
              {
                name: "Ayaadi Life Education",
                desc: "Holistic life skills and Islamic values education.",
              },
            ].map((institute, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mb-2">{institute.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{institute.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-10 md:mb-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-4"
              >
                Support Akode Islamic Centre
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-indigo-100 max-w-xl"
              >
                Your contributions help us educate hundreds of students and care for over 450 orphans. Join us in this noble cause.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/donation"
                className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300"
              >
                Donate Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}