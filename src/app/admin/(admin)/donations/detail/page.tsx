// src/app/(admin)/donations/detail/page.tsx
"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

// Move the main component logic into a separate component
function DonationDetailContent() {
  const searchParams = useSearchParams();
  const donationId = searchParams.get('id') || 'DON-7845';

  // Mock data - in a real app, you would fetch this based on the ID
  const donationData = {
    id: donationId,
    donor: {
      name: "Ahmed Jaleel",
      email: "ahmed.jaleel@example.com",
      phone: "+91 9876543210",
      address: "123 Main Street, Oorkadavu, Malappuram, Kerala",
      previousDonations: 5,
      totalAmount: "₹25,000"
    },
    donation: {
      amount: "₹5,000",
      type: "Yatheem",
      status: "Completed",
      date: "22 Nov 2023",
      time: "14:30:45",
      paymentMethod: "UPI Payment",
      transactionId: "UPI-76543210",
      purpose: "Monthly Yatheem Sponsorship"
    },
    recipient: {
      name: "Ayesha (YAT-234)",
      institution: "Oorkadavu Qasim Musliyar Thahfeezul Quran College",
      program: "Yatheem Sponsorship Program"
    }
  };

  // State for receipt display
  const [showReceipt, setShowReceipt] = useState(false);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "bg-gray-500/20 text-gray-500";

    if (status === "Completed") {
      bgColor = "bg-green-500/20 text-green-500";
    } else if (status === "Pending") {
      bgColor = "bg-amber-500/20 text-amber-500";
    } else if (status === "Failed") {
      bgColor = "bg-red-500/20 text-red-500";
    }

    return (
      <span className={`px-3 py-1 rounded-full ${bgColor} text-sm font-medium`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with navigation and actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            Donation Details <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">#{donationData.id}</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View complete information about this donation
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/donations/all"
            className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300"
          >
            Back to List
          </Link>
          <button
            onClick={() => setShowReceipt(!showReceipt)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-300"
          >
            {showReceipt ? "Hide Receipt" : "View Receipt"}
          </button>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donor Information */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
            Donor Information
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Name</h4>
              <p className="text-lg font-bold text-gray-800 dark:text-white">{donationData.donor.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Email</h4>
              <p className="text-base text-blue-600 dark:text-blue-400 hover:underline">
                <a href={`mailto:${donationData.donor.email}`}>{donationData.donor.email}</a>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Phone</h4>
              <p className="text-base text-gray-800 dark:text-white">{donationData.donor.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Address</h4>
              <p className="text-base text-gray-800 dark:text-white">{donationData.donor.address}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Previous Donations</h4>
              <div className="flex justify-between items-center">
                <p className="text-base text-gray-800 dark:text-white">{donationData.donor.previousDonations} donations</p>
                <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">View History</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Contribution</h4>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{donationData.donor.totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Donation Details */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
            Donation Details
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Amount</h4>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{donationData.donation.amount}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Type</h4>
              <p className="text-base font-medium text-gray-800 dark:text-white">
                <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-sm">
                  {donationData.donation.type}
                </span>
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Status</h4>
              <StatusBadge status={donationData.donation.status} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Date & Time</h4>
              <p className="text-base text-gray-800 dark:text-white">
                {donationData.donation.date} at {donationData.donation.time}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Payment Method</h4>
              <p className="text-base text-gray-800 dark:text-white">{donationData.donation.paymentMethod}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Transaction ID</h4>
              <p className="text-base font-mono text-gray-800 dark:text-white">{donationData.donation.transactionId}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Purpose</h4>
              <p className="text-base text-gray-800 dark:text-white">{donationData.donation.purpose}</p>
            </div>
          </div>
        </div>

        {/* Recipient & Actions */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
              Recipient Information
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Recipient</h4>
                <p className="text-base text-gray-800 dark:text-white">{donationData.recipient.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Institution</h4>
                <p className="text-base text-gray-800 dark:text-white">{donationData.recipient.institution}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Program</h4>
                <p className="text-base text-gray-800 dark:text-white">{donationData.recipient.program}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-white/10">
              Actions
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300 text-center">
                Update Status
              </button>
              <button className="w-full px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-all duration-300 text-center">
                Download Receipt
              </button>
              <button className="w-full px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-all duration-300 text-center">
                Send Receipt to Donor
              </button>
              <button className="w-full px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800/50 transition-all duration-300 text-center">
                Delete Donation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Preview (conditionally rendered) */}
      {showReceipt && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Receipt Preview</h3>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            {/* Organization Logo */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">AIC</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">AIC Amal</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Donation Receipt #{donationData.id}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                  {donationData.donation.status}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {donationData.donation.date}
                </p>
              </div>
            </div>

            {/* Donation Details */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Donation Information</h4>
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Donor</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{donationData.donor.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{donationData.donation.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{donationData.donation.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Transaction ID</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{donationData.donation.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date & Time</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {donationData.donation.date} at {donationData.donation.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Purpose</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{donationData.donation.purpose}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank you message */}
            <div className="text-center mb-6">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Thank you for your generous contribution!
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                AIC Amal Charitable Trust - Your support makes a difference.
              </p>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">QR Code</span>
              </div>
            </div>

            {/* Note */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
              This receipt is electronically generated and is valid without signature.
            </p>
          </div>

          {/* Receipt Actions */}
          <div className="flex justify-center mt-6 space-x-4">
            <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300">
              Print Receipt
            </button>
            <button className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-all duration-300">
              Download PDF
            </button>
            <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300">
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrap the main component in a Suspense boundary
export default function DetailedViewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonationDetailContent />
    </Suspense>
  );
}