// src/app/institutes/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InstituteList from "@/components/users-section/institute/InstituteList";
import type { Institute } from "@/components/users-section/institute/InstituteList";

export default function InstitutesPage() {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitutes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/institutions/fetch', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch institutions');
        }

        const data = await response.json();
        setInstitutes(data);
        console.log(data);
        
      } catch (err) {
        console.error("Error fetching institutes:", err);
        setError('An error occurred while fetching institutes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

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
          
          
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Educational Institutes</h1>
          <p className="text-xl text-indigo-200 max-w-3xl">Browse our partner educational institutes and support their mission to provide quality education.</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-600">
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <InstituteList institutes={institutes} />
          )}
        </div>
      </section>
    </>
  );
}