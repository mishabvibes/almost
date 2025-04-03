// src/app/sponsorship/components/ThankYouModal.tsx
"use client";

import { motion } from "framer-motion";

interface ThankYouModalProps {
  show: boolean;
  onClose: () => void;
}

export const ThankYouModal = ({ show, onClose }: ThankYouModalProps) => {
  if (!show) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Sponsorship Confirmed!</h3>
        <p className="text-gray-600 mb-6">Thank you for your generous commitment. Your sponsorship will make a meaningful difference in someone&apos;s life.</p>
        <button 
          onClick={onClose}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};