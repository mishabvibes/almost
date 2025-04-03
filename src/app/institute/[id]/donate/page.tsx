// src/app/institute/[id]/donate/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DonationForm from "@/components/users-section/institute/DonationForm";

interface InstituteFact {
  label: string;
  value: string;
}

// Define the shape of the institute object
interface Institute {
  _id: string;
  name: string;
  description: string;
  featuredImage: string;
  location: string;
  facts: InstituteFact[];
}

export default function InstituteDonationPage() {
  const params = useParams();
  const router = useRouter();
  const instituteId = params.id as string;
  
  const [institute, setInstitute] = useState<Institute | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    // Fetch basic institute data
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
        //   name: "St. Mary's Educational Institute",
        //   description: "A premier educational institution committed to providing quality education and instilling values for over 25 years.",
        //   mainImage: "/api/placeholder/800/400",
        //   facts: [
        //     { label: "Established", value: "1995" },
        //     { label: "Students", value: "1,200+" },
        //   ],
        //   location: "123 Education Street, Delhi"
        // };
        console.log(data);
        
        
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

  const handleDonationComplete = () => {
    // Navigate back to institute page after donation is complete
    setTimeout(() => {
      router.push(`/institute/${instituteId}`);
    }, 3000);
  };

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <Link href={`/institute/${instituteId}`} className="inline-flex items-center text-indigo-200 hover:text-white mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Institute
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            {isLoading ? 'Loading...' : `Support ${institute?.name}`}
          </h1>
          <h1>{instituteId}</h1>
          <p className="text-xl text-indigo-200 max-w-3xl">
            Your contribution helps provide quality education and better facilities for students.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Institute Brief */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image 
                    src={institute!.featuredImage} 
                    alt={institute!.name}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3">{institute!.name}</h3>
                  <p className="text-gray-600 mb-4">{institute!.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-gray-800">{institute!.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 mt-4">
                      {institute!.facts.map((fact: InstituteFact, index: number) => (
                        <div key={index} className="bg-indigo-50 p-3 rounded-lg text-center flex-1">
                          <p className="text-lg font-bold text-indigo-800">{fact.value}</p>
                          <p className="text-xs text-indigo-600">{fact.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Donation Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DonationForm 
                  instituteId={institute!._id} 
                  instituteName={institute!.name}
                  onDonationComplete={handleDonationComplete}
                />
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}