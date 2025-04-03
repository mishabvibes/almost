// src/app/sponsorship/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Import components
import { PageHeader } from "@/components/users-section/sponsorship/PageHeader";
import { ThankYouModal } from "@/components/users-section/sponsorship/ThankYouModal";
import { SponsorshipForm } from "@/components/users-section/sponsorship/SponsorshipForm";
import { SponsorshipSelector } from "@/components/users-section/sponsorship/SponsorshipSelector";

// Import types and data
import { BaseOption, EducationOption, ActiveOption, hasEducation } from "@/components/users-section/types";
import { sponsorshipData } from "@/components/users-section/types";

export default function SponsorshipPage() {
  const [activeProgram, setActiveProgram] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<ActiveOption | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSponsor = (type: string, option: BaseOption | EducationOption, withEducation: boolean = false) => {
    const finalAmount = withEducation && hasEducation(option) ? option.withEducation : option.amount;
    
    setActiveProgram(type);
    
    // Create an object that satisfies the ActiveOption interface
    const activeOpt: ActiveOption = {
      ...option,
      finalAmount,
      includesEducation: withEducation,
    };
    
    setActiveOption(activeOpt);
  };

  const handleBackToSelection = () => {
    setActiveProgram(null);
    setActiveOption(null);
  };

  const handleSubmitSuccess = () => {
    setShowThankYou(true);
    
    // Reset form after delay
    setTimeout(() => {
      setShowThankYou(false);
      setActiveProgram(null);
      setActiveOption(null);
    }, 3000);
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
  };

  return (
    <>
      {/* Page Header Component */}
      <PageHeader 
        title="Sponsorship Programs" 
        description="Provide sustained support through our sponsorship programs. Your regular contributions create stability and lasting change."
      />

      <section className="py-16 px-6 bg-indigo-50">
        <div className="container mx-auto max-w-6xl">
          {/* Thank You Modal Component */}
          <AnimatePresence>
            <ThankYouModal 
              show={showThankYou} 
              onClose={handleCloseThankYou} 
            />
          </AnimatePresence>
          
          {/* Conditional Rendering based on selection state */}
          {activeProgram && activeOption ? (
            <SponsorshipForm
              activeProgram={activeProgram}
              activeOption={activeOption}
              onBack={handleBackToSelection}
              onSubmitSuccess={handleSubmitSuccess}
            />
          ) : (
            <SponsorshipSelector 
              sponsorships={sponsorshipData}
              onSelect={handleSponsor}
            />
          )}
        </div>
      </section>
    </>
  );
}