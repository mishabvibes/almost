"use client";
import React from "react";

const CampaignProgress = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Campaign Progress</h3>
      <div className="space-y-4">
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-xl">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Dates Challenge</h4>
          <p className="text-lg font-bold text-brand-600 dark:text-white">₹20,000 / ₹50,000</p>
          <div className="w-full bg-gray-200/30 dark:bg-gray-600/30 rounded-full h-2.5 mt-2">
            <div className="bg-green-500/80 h-2.5 rounded-full" style={{ width: "40%" }}></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-md">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">She-Fine Campus Masjid Construction</h4>
          <p className="text-lg font-bold text-brand-600 dark:text-white">₹30,000 / ₹100,000</p>
          <div className="w-full bg-gray-200/30 dark:bg-gray-600/30 rounded-full h-2.5 mt-2">
            <div className="bg-green-500/80 h-2.5 rounded-full" style={{ width: "30%" }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CampaignProgress;