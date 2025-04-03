"use client";
import React from "react";

const VolunteerActivity = () => {
 return (
   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
     <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Volunteer Activity</h3>
     <div className="space-y-4">
       
       <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
         <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Volunteers</h4>
         <p className="text-2xl font-bold text-brand-600 dark:text-white">50</p>
       </div>

       <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 backdrop-blur-sm p-5 rounded-xl hover:bg-white/30 transition-all duration-300 text-center shadow-lg">
         <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Active Tasks</h4>
         <p className="text-2xl font-bold text-brand-600 dark:text-white">10</p>
       </div>

     </div>
   </div>
 );
};

export default VolunteerActivity;