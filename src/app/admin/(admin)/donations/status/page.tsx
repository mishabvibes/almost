// src/app/(admin)/donations/status/page.tsx
"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

// Loading component to display while the main content is loading
function LoadingComponent() {
  return (
    <div className="p-6 flex justify-center items-center min-h-[400px]">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-t-emerald-500 animate-spin"></div>
      </div>
    </div>
  );
}

// The actual content component that uses useSearchParams
function UpdateStatusContent() {
  const searchParams = useSearchParams();
  const donationId = searchParams.get('id') || 'DON-7845';
  
  // State for donation data
  const [donation, setDonation] = useState({
    id: donationId,
    donor: "Ahmed Jaleel",
    email: "ahmed.jaleel@example.com",
    phone: "+91 9876543210",
    amount: "₹5,000",
    type: "Yatheem",
    status: "Pending",
    date: "22 Nov 2023",
    transactionId: "UPI-76543210"
  });
  
  // Form state
  const [newStatus, setNewStatus] = useState(donation.status);
  const [statusNote, setStatusNote] = useState("");
  const [notifyDonor, setNotifyDonor] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Status history mock data
  const statusHistory = [
    { status: "Created", timestamp: "21 Nov 2023, 10:15 AM", note: "Donation received via UPI", user: "System" },
    { status: "Pending", timestamp: "21 Nov 2023, 10:16 AM", note: "Payment verification in progress", user: "System" }
  ];
  
  // Update local state when donation prop changes
  useEffect(() => {
    setNewStatus(donation.status);
  }, [donation]);
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "bg-gray-500/20 text-gray-500";
    
    if (status === "Completed") {
      bgColor = "bg-green-500/20 text-green-500";
    } else if (status === "Pending") {
      bgColor = "bg-amber-500/20 text-amber-500";
    } else if (status === "Failed") {
      bgColor = "bg-red-500/20 text-red-500";
    } else if (status === "Created") {
      bgColor = "bg-blue-500/20 text-blue-500";
    } else if (status === "Refunded") {
      bgColor = "bg-purple-500/20 text-purple-500";
    }
    
    return (
      <span className={`px-3 py-1 rounded-full ${bgColor} text-sm font-medium`}>
        {status}
      </span>
    );
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update donation status
      setDonation(prev => ({
        ...prev,
        status: newStatus
      }));
      
      // Show success message
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with navigation and donation ID */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            Update Donation Status <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">#{donation.id}</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Change the status of this donation and notify the donor
          </p>
        </div>
        
        <Link 
          href="/donations/all" 
          className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300"
        >
          Back to Donations
        </Link>
      </div>
      
      {/* Success message (conditionally rendered) */}
      {showSuccess && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 px-4 py-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium">Status updated successfully!</span>
            {notifyDonor && <span className="ml-2 text-xs">Notification has been sent to the donor.</span>}
          </div>
          <button 
            onClick={() => setShowSuccess(false)}
            className="text-green-800 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation Information */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
            Donation Information
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Donor Name</h4>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{donation.donor}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Contact</h4>
              <p className="text-base text-gray-800 dark:text-white">
                <a href={`mailto:${donation.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{donation.email}</a>
              </p>
              <p className="text-base text-gray-800 dark:text-white mt-1">{donation.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Amount</h4>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{donation.amount}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Type</h4>
              <p className="text-base font-medium text-gray-800 dark:text-white">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-sm">
                  {donation.type}
                </span>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Date</h4>
              <p className="text-base text-gray-800 dark:text-white">{donation.date}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Transaction ID</h4>
              <p className="text-base font-mono text-gray-800 dark:text-white">{donation.transactionId}</p>
            </div>
          </div>
        </div>
        
        {/* Current Status & Update Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
            Current Status
          </h3>
          
          <div className="mb-6">
            <div className="p-4 bg-white/20 dark:bg-gray-800/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <StatusBadge status={donation.status} />
                <span className="text-xs text-gray-500 dark:text-gray-400">Last updated: 21 Nov 2023</span>
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    donation.status === "Completed" 
                      ? "bg-green-500" 
                      : donation.status === "Pending" 
                      ? "bg-amber-500" 
                      : "bg-red-500"
                  }`}
                  style={{ width: donation.status === "Completed" ? "100%" : donation.status === "Pending" ? "50%" : "100%" }}
                ></div>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
            Update Status
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md rounded-lg p-2 text-gray-800 dark:text-gray-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                Status Note (Optional)
              </label>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add an optional note about this status change..."
                className="w-full bg-white/10 backdrop-blur-md rounded-lg p-2 text-gray-800 dark:text-gray-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[80px]"
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyDonor"
                checked={notifyDonor}
                onChange={(e) => setNotifyDonor(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="notifyDonor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Notify donor about this status change
              </label>
            </div>
            
            <div className="flex justify-between pt-4">
              <Link
                href="/donations/all"
                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || newStatus === donation.status}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isSubmitting || newStatus === donation.status
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
                }`}
              >
                {isSubmitting ? "Updating..." : "Update Status"}
              </button>
            </div>
          </form>
        </div>
        
        {/* Status History */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
            Status History
          </h3>
          
          <div className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
            {statusHistory.map((item, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute -left-4 w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
                <div className="flex items-start justify-between mb-1">
                  <StatusBadge status={item.status} />
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{item.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.note}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">By: {item.user}</p>
              </div>
            ))}
            
            {/* Current activity (shown when updating) */}
            {isSubmitting && (
              <div className="mb-4 relative">
                <div className="absolute -left-4 w-3 h-3 rounded-full bg-emerald-500 mt-1.5 animate-pulse"></div>
                <div className="flex items-center mb-1">
                  <StatusBadge status={newStatus} />
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 animate-pulse">Processing...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="mt-6 space-y-2">
            <button className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300 text-center">
              View Donation Details
            </button>
            <button className="w-full px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-all duration-300 text-center">
              Download Statement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export component that wraps the content with Suspense
export default function UpdateStatusPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <UpdateStatusContent />
    </Suspense>
  );
}