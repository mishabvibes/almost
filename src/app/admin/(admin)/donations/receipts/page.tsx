// src/app/(admin)/donations/receipts/page.tsx
"use client";
import React, { useState } from "react";

export default function GenerateReceiptsPage() {
  // States for filters and search
  const [searchText, setSearchText] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [selectedDonations, setSelectedDonations] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);

  // Mock donation data for the table
  const donations = [
    {
      id: "DON-7845",
      donor: "Ahmed Jaleel",
      amount: "₹5,000",
      type: "Yatheem",
      status: "Completed",
      date: "2023-11-22",
      receipt_generated: true,
      email: "ahmed@example.com"
    },
    {
      id: "DON-7844",
      donor: "Fatima Salim",
      amount: "₹3,000",
      type: "General",
      status: "Completed",
      date: "2023-11-20",
      receipt_generated: false,
      email: "fatima@example.com"
    },
    {
      id: "DON-7843",
      donor: "Mohammed Rafi",
      amount: "₹10,000",
      type: "Building",
      status: "Completed",
      date: "2023-11-18",
      receipt_generated: true,
      email: "rafi@example.com"
    },
    {
      id: "DON-7842",
      donor: "Zainab Basheer",
      amount: "₹2,500",
      type: "Hafiz",
      status: "Completed",
      date: "2023-11-15",
      receipt_generated: false,
      email: "zainab@example.com"
    },
    {
      id: "DON-7841",
      donor: "Hamza Kareem",
      amount: "₹7,500",
      type: "Yatheem",
      status: "Completed",
      date: "2023-11-10",
      receipt_generated: true,
      email: "hamza@example.com"
    }
  ];

  // Receipt preview component
  const ReceiptPreview = ({ donation }: { donation: typeof donations[0] }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-lg w-full max-w-md mx-auto">
        {/* Organization Logo */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">AIC</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">AIC Amal</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Donation Receipt #{donation.id}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
              {donation.status}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {donation.date}
            </p>
          </div>
        </div>
        
        {/* Donor & Donation Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Donor</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{donation.donor}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{donation.amount}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{donation.type}</p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{donation.email}</p>
          </div>
        </div>
        
        {/* Thank You Message */}
        <div className="text-center border-t border-gray-100 dark:border-gray-700 pt-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Thank you for your generous contribution!
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            AIC Amal Charitable Trust - Your support makes a difference.
          </p>
        </div>
      </div>
    );
  };
  
  // Toggle selection for a donation
  const toggleSelect = (id: string) => {
    if (selectedDonations.includes(id)) {
      setSelectedDonations(selectedDonations.filter(donId => donId !== id));
    } else {
      setSelectedDonations([...selectedDonations, id]);
    }
  };
  
  // Toggle all donations
  const toggleSelectAll = () => {
    if (selectedDonations.length === donations.length) {
      setSelectedDonations([]);
    } else {
      setSelectedDonations(donations.map(d => d.id));
    }
  };
  
  // Generate receipts for selected donations
  const generateReceipts = () => {
    // In a real application, this would call an API
    alert(`Generating receipts for ${selectedDonations.length} donations in ${selectedFormat.toUpperCase()} format`);
  };
  
  // Show receipt preview
  const showReceiptPreview = (id: string) => {
    setCurrentPreview(id);
    setShowPreview(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Generate Receipts</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create and manage donation receipts for your donors
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={generateReceipts}
            disabled={selectedDonations.length === 0}
            className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedDonations.length > 0 
                ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600" 
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Generate Selected ({selectedDonations.length})
          </button>
        </div>
      </div>
      
      {/* Filters and options */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by donor name or ID..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Format</label>
            <select 
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 w-full bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-800 dark:text-gray-200"
            >
              <option value="pdf">PDF</option>
              <option value="image">Image</option>
              <option value="excel">Excel (Multiple)</option>
            </select>
          </div>
          
          <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300">
            Apply Filters
          </button>
        </div>
      </div>
      
      {/* Donations Table */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tl-lg">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      onChange={toggleSelectAll}
                      checked={selectedDonations.length === donations.length && donations.length > 0}
                    />
                  </div>
                </th>
                <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Donor Name
                </th>
                <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Receipt Status
                </th>
                <th className="sticky top-0 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md p-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr 
                  key={donation.id} 
                  className={`hover:bg-white/5 dark:hover:bg-gray-800/50 backdrop-blur-md transition-all ${
                    index % 2 === 0 ? 'bg-white/2' : 'bg-white/5 dark:bg-gray-800/20'
                  }`}
                >
                  <td className="p-3 border-b border-white/10">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      checked={selectedDonations.includes(donation.id)}
                      onChange={() => toggleSelect(donation.id)}
                    />
                  </td>
                  <td className="p-3 text-sm font-medium text-gray-900 dark:text-white border-b border-white/10">
                    {donation.id}
                  </td>
                  <td className="p-3 border-b border-white/10">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {donation.donor}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {donation.email}
                    </div>
                  </td>
                  <td className="p-3 text-sm font-bold text-emerald-600 dark:text-emerald-400 border-b border-white/10">
                    {donation.amount}
                  </td>
                  <td className="p-3 text-sm text-gray-500 dark:text-gray-400 border-b border-white/10">
                    {donation.date}
                  </td>
                  <td className="p-3 border-b border-white/10">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      donation.receipt_generated 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {donation.receipt_generated ? 'Generated' : 'Not Generated'}
                    </span>
                  </td>
                  <td className="p-3 border-b border-white/10">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => showReceiptPreview(donation.id)}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                      >
                        Preview
                      </button>
                      <button className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors">
                        Download
                      </button>
                      <button className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-lg text-xs font-medium hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
                        Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {donations.length === 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500 dark:text-gray-400">No donations found matching your filters.</p>
          </div>
        )}
      </div>
      
      {/* Receipt preview modal */}
      {showPreview && currentPreview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Receipt Preview</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <ReceiptPreview donation={donations.find(d => d.id === currentPreview)!} />
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg text-sm font-medium hover:from-emerald-600 hover:to-green-600 transition-all duration-300">
                Generate & Download
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
                Send to Donor
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Bulk actions toolbar (fixed at bottom when selections exist) */}
      {selectedDonations.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full shadow-xl px-6 py-3 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 z-40">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {selectedDonations.length} selected
          </span>
          <div className="h-6 border-r border-gray-300 dark:border-gray-600"></div>
          <button className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
            Generate All
          </button>
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            Email All
          </button>
          <button 
            onClick={() => setSelectedDonations([])}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}