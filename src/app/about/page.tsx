// src/app/about/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Aisha Khan",
      position: "Director",
      bio: "Dr. Khan has over 20 years of experience in community development and education. She leads our organization with passion and vision.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Rahul Sharma",
      position: "Operations Manager",
      bio: "Rahul oversees all day-to-day operations, ensuring that our programs run efficiently and effectively reach those in need.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Priya Patel",
      position: "Education Coordinator",
      bio: "Priya brings 15 years of teaching experience to coordinate our educational initiatives and curriculum development.",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Mohammed Ali",
      position: "Community Outreach",
      bio: "Mohammed works directly with community leaders to identify needs and implement targeted support programs.",
      image: "/api/placeholder/300/300"
    }
  ];

  const milestones = [
    {
      year: "1995",
      title: "Foundation Established",
      description: "Our organization was founded with a mission to uplift communities through education and support."
    },
    {
      year: "2005",
      title: "Educational Institute Opened",
      description: "We launched our flagship educational institute, providing quality education to underprivileged children."
    },
    {
      year: "2012",
      title: "Sponsorship Program Launch",
      description: "Our sponsorship program began, enabling sustained support for orphans and students."
    },
    {
      year: "2018",
      title: "Community Center Completion",
      description: "We completed our first multi-purpose community center serving over 5,000 people annually."
    },
    {
      year: "2022",
      title: "Digital Expansion",
      description: "We embraced digital platforms to expand our reach and simplify the donation process."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center text-indigo-200 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-xl text-indigo-200 max-w-3xl">Learn more about our mission, history, and the people behind our organization.</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="inline-block p-2 px-5 bg-indigo-100 rounded-full text-indigo-800 font-medium text-sm mb-3">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold text-indigo-900 mb-6">Empowering Communities Through Sustainable Initiatives</h2>
              <p className="text-gray-600 mb-4">
                At AIC-Amal, our mission is to provide sustainable support to communities in need, with a focus on education, infrastructure, and social development. We believe in empowering individuals to create long-lasting change.
              </p>
              <p className="text-gray-600 mb-4">
                Founded on the principles of compassion, integrity, and inclusivity, we strive to bridge gaps and create opportunities for those who need it most. Our approach is community-centered, ensuring that all our initiatives are relevant and impactful.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Quality education for all children",
                  "Sustainable community development",
                  "Support for orphans and vulnerable youth",
                  "Essential infrastructure improvement"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
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
                <Image 
                  src="/api/placeholder/600/800" 
                  alt="Our Mission"
                  className="object-cover"
                  fill
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our History Timeline */}
      <section className="py-16 px-6 bg-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block p-2 px-5 bg-purple-100 rounded-full text-purple-800 font-medium text-sm mb-3">
              Our Journey
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Key Milestones in Our History</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Throughout our journey, we&apos;ve achieved significant milestones that have shaped our organization and expanded our impact on the communities we serve.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="md:w-1/2"></div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center z-10 text-lg font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 font-medium rounded-full mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block p-2 px-5 bg-indigo-100 rounded-full text-indigo-800 font-medium text-sm mb-3">
              Our Team
            </div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">The People Behind Our Mission</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated team brings diverse expertise and a shared passion for making a difference in the lives of those we serve.
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
                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
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
                Join Us in Making a Difference
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-indigo-100 max-w-xl"
              >
                Your support enables us to continue our mission and expand our impact. Together, we can create lasting positive change.
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
    </>
  );
}