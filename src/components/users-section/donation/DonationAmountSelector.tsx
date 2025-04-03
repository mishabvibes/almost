// src/components/donation/DonationAmountSelector.tsx
"use client";

import { motion } from "framer-motion";

interface DonationAmountSelectorProps {
  donationAmounts: number[];
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
}

const DonationAmountSelector = ({
  donationAmounts,
  selectedAmount,
  onSelectAmount
}: DonationAmountSelectorProps) => {
  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      onSelectAmount(Number(value));
    } else {
      onSelectAmount(0);
    }
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-2xl shadow-lg"
      variants={itemVariants}
    >
      <h3 className="text-2xl font-bold text-indigo-900 mb-6">Select Amount</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {donationAmounts.map((amount) => (
          <motion.button
            key={amount}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-r ${
              selectedAmount === amount 
                ? "from-indigo-600 to-purple-600 text-white" 
                : "from-indigo-50 to-indigo-100 text-indigo-700 hover:from-indigo-100 hover:to-indigo-200"
            } text-xl font-bold px-6 py-5 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center`}
            onClick={() => onSelectAmount(amount)}
            type="button"
          >
            ₹ {amount.toLocaleString()}
          </motion.button>
        ))}
      </div>
      <div className="relative">
        <input
          type="number"
          placeholder="Enter Custom Amount"
          className="w-full p-4 pl-8 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          onChange={handleCustomAmountChange}
          min="1"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 font-medium">₹</span>
      </div>
    </motion.div>
  );
};

export default DonationAmountSelector;