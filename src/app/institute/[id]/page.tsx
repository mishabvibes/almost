// src/app/institute/[id]/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import InstituteDetail from "@/components/users-section/institute/InstituteDetail";
import DonationForm from "@/components/users-section/institute/DonationForm";

interface InstituteFact {
  label: string;
  value: string;
}

interface InstituteVideo {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
}

interface InstituteImage {
  id: number;
  title: string;
  src: string;
}

// Define the shape of the institute object
interface Institute {
  _id: string;
  name: string;
  description: string;
  longDescription: string;
  featuredImage: string; // Renamed from mainImage to match API usage
  facts: InstituteFact[];
  videos: InstituteVideo[];
  galleryImages: InstituteImage[];
  location: string;
  established: string;
  category: string;
}

export default function InstituteDetailPage() {
  const params = useParams();
  const instituteId = params.id as string;
  
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch institute data
    const fetchInstitute = async () => {
      setIsLoading(true);
    
      try {
        // In a real app, this would be an API call
        // For now, we'll simulate with mock data

       
        const response = await fetch(`/api/institutions/fetch/${instituteId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch institute');
        }

        const data = await response.json();
        
        // This would be fetched from an API based on the ID
        // const mockInstitute = {
        //   id: instituteId,
        //   name: "St. Mary's Educational Instieeeeeeeeeeeeetute",
        //   description: "A premier educational institution committed to providing quality education and instilling values for over 25 years.",
        //   longDescription: "Our institute has been a beacon of educational excellence since its establishment. We provide quality education to students from all backgrounds, fostering an environment of learning, growth, and character development. With dedicated teachers, modern facilities, and a comprehensive curriculum, we prepare students not just academically but also instill values and skills needed for life.",
        //   mainImage: "/api/placeholder/800/400",
        //   facts: [
        //     { label: "Established", value: "1995" },
        //     { label: "Students", value: "1,200+" },
        //     { label: "Teachers", value: "85" },
        //     { label: "Campus Size", value: "5 Acres" }
        //   ],
        //   videos: [
        //     { id: 1, title: "Campus Tour", url: "https://www.youtube.com/embed/sample1", thumbnail: "/api/placeholder/480/270" },
        //     { id: 2, title: "Student Life", url: "https://www.youtube.com/embed/sample2", thumbnail: "/api/placeholder/480/270" },
        //   ],
        //   galleryImages: [
        //     { id: 1, title: "Main Building", src: "/api/placeholder/400/300" },
        //     { id: 2, title: "Library", src: "/api/placeholder/400/300" },
        //     { id: 3, title: "Classroom", src: "/api/placeholder/400/300" },
        //     { id: 4, title: "Cafeteria", src: "/api/placeholder/400/300" },
        //   ],
        //   location: "123 Education Street, Delhi",
        //   established: "1995",
        //   category: "school"
        // };
        
        setInstitute(data);
      } catch (error) {
        console.error("Error fetching institute details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (instituteId) {
      fetchInstitute();
    }
  }, [instituteId]);

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <Link href="/institute" className="inline-flex items-center text-indigo-200 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Institutes
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            {isLoading ? 'Loading...' : institute?.name}
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl">
            {isLoading ? '' : institute?.description}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Institute Details */}
              <div className="lg:col-span-2">
                <InstituteDetail 
                  id={institute!._id}
                  name={institute!.name}
                  description={institute!.description}
                  longDescription={institute!.longDescription}
                  mainImage={institute!.featuredImage}
                  facts={institute!.facts}
                  videos={institute!.videos}
                  galleryImages={institute!.galleryImages}
                />
              </div>
              
              {/* Donation Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DonationForm 
                  instituteId={institute!._id} 
                  instituteName={institute!.name} 
                />
                
                {/* <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                  <h4 className="text-lg font-bold text-indigo-900 mb-3">Institute Contact</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        <p className="text-gray-800">{institute.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-800">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-800">info@stmarys.example.com</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}