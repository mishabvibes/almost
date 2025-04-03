"use client";
import React from "react";
import { useState, useEffect } from "react";

const DonationMetrics = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    thisMonthDonations: 0,
    todayDonations: 0,
    weekDonations: 0,
    generalTotal: 0,
    yatheemTotal: 0,
    hafizTotal: 0,
    buildingTotal: 0,
    subscribersDonorCount:0,      // Count of donors assigned to subscribers
    totalVolunteers: 0,        // Total count of volunteers
    activeCampaigns: 0, 
  });

  // Time period selector state
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  useEffect(() => {
    async function fetchDonations() {
      try {
        const response = await fetch("/api/find_total");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching donation stats:", error);
      }
    }
    fetchDonations();
  }, []);

  // Get the appropriate donation amount based on selected period
  const getDonationByPeriod = () => {
    switch (selectedPeriod) {
      case "today":
        return stats.todayDonations;
      case "week":
        return stats.weekDonations || 0;
      case "month":
        return stats.thisMonthDonations;
      default:
        return stats.todayDonations;
    }
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Donation Metrics</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Donations</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">₹{stats.totalDonations}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Active Campaigns</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">{stats.activeCampaigns}</p>
        </div>
        
        {/* Time-based donation metrics card with period selector */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Donations</h4>
            <div className="flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 text-xs">
              <button 
                onClick={() => setSelectedPeriod("today")}
                className={`px-2 py-1 ${selectedPeriod === "today" ? "bg-brand-600 text-white" : "bg-white/30 dark:bg-gray-800/30 text-gray-600 dark:text-gray-300"}`}
              >
                Today
              </button>
              <button 
                onClick={() => setSelectedPeriod("week")}
                className={`px-2 py-1 ${selectedPeriod === "week" ? "bg-brand-600 text-white" : "bg-white/30 dark:bg-gray-800/30 text-gray-600 dark:text-gray-300"}`}
              >
                7 Days
              </button>
              <button 
                onClick={() => setSelectedPeriod("month")}
                className={`px-2 py-1 ${selectedPeriod === "month" ? "bg-brand-600 text-white" : "bg-white/30 dark:bg-gray-800/30 text-gray-600 dark:text-gray-300"}`}
              >
                Month
              </button>
            </div>
          </div>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">₹{getDonationByPeriod()}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">General Total</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">₹{stats.generalTotal || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Yatheem Total</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">₹{stats.yatheemTotal || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Hafiz Total</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">₹{stats.hafizTotal || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Building Total</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">₹{stats.buildingTotal || 0}</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Recurring Donors</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">{stats.subscribersDonorCount}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
          <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Volunteers</h4>
          <p className="text-2xl font-bold text-brand-600 dark:text-white">{stats.totalVolunteers}</p>
        </div>
      </div>
    </div>
  );
};

export default DonationMetrics;