// src/app/campaigns/components/CampaignCounter.tsx
import { motion } from "framer-motion";

interface CampaignCounterProps {
  count: number;
}

export function CampaignCounter({ count }: CampaignCounterProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-10 flex justify-center items-center"
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100">
          <span className="text-purple-900 font-bold text-3xl md:text-4xl">{count}</span>
          <span className="text-indigo-700 text-sm font-medium">Active Campaigns</span>
        </div>
        <div className="hidden md:block h-12 w-px bg-gray-200"></div>
        <div className="hidden md:block">
          <h3 className="text-lg font-semibold text-gray-800">Make an Impact Today</h3>
          <p className="text-gray-600">Browse our campaigns and find ways to contribute</p>
        </div>
      </div>
    </motion.div>
  );
}