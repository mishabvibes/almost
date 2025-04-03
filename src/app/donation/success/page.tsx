"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { generatePDF } from "@/lib/receipt-pdf";
import { Download, Home } from "lucide-react";

interface ReceiptData {
  _id: string;
  amount: number;
  name: string;
  phone: string;
  type: string;
  district: string;
  panchayat: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  instituteId?: string;
  createdAt: string;
}

const InstituteSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<ReceiptData | null>(null);
  const [isLoadingPDF, setIsLoadingPDF] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract data from query parameters and format it
  useEffect(() => {
    const donationId = searchParams.get("donationId") || "";
    const amount = Number(searchParams.get("amount") || "0");
    const name = decodeURIComponent(searchParams.get("name") || "");
    const phone = searchParams.get("phone") || "";
    const type = searchParams.get("type") || "";
    const district = searchParams.get("district") || "";
    const panchayat = searchParams.get("panchayat") || "";
    const razorpayPaymentId = searchParams.get("paymentId") || "";
    const razorpayOrderId = searchParams.get("orderId") || "";
    const instituteId = searchParams.get("instituteId") || undefined;

    const receiptData: ReceiptData = {
      _id: donationId,
      amount,
      name,
      phone,
      type,
      district,
      panchayat,
      razorpayPaymentId,
      razorpayOrderId,
      instituteId,
      createdAt: new Date().toISOString(),
    };

    setDetails(receiptData);
  }, [searchParams]);

  // Handle receipt download
  const handleDownloadReceipt = async () => {
    if (!details) return;

    setIsLoadingPDF(true);
    setError(null);

    try {
      await generatePDF(details);
      console.log("Receipt downloaded successfully");
    } catch (err) {
      console.error("Error generating receipt:", err);
      setError("Failed to generate receipt. Please try again.");
    } finally {
      setIsLoadingPDF(false);
    }
  };

  // Handle return to home
  const handleReturnHome = () => {
    router.push('/');
  };

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <p className="text-gray-600 animate-pulse">Loading transaction details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-indigo-100"
      >
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-md">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 text-lg">
            Your {details.type.toLowerCase()} donation of ₹{details.amount.toLocaleString('en-IN')} has been processed successfully.
          </p>
        </div>

        <div className="space-y-4 mb-8 bg-indigo-50 p-6 rounded-xl">
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Name:</span>
            <span className="text-indigo-900 font-semibold">{details.name}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Phone:</span>
            <span className="text-indigo-900 font-semibold">{details.phone}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Payment ID:</span>
            <span className="text-indigo-900 font-semibold">{details.razorpayPaymentId}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span className="font-medium">Location:</span>
            <span className="text-indigo-900 font-semibold">
              {details.panchayat ? `${details.panchayat}, ${details.district}` : details.district}
            </span>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            onClick={handleReturnHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 bg-white text-indigo-600 border border-indigo-600 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </motion.button>

          <motion.button
            onClick={handleDownloadReceipt}
            disabled={isLoadingPDF}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoadingPDF ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Download Receipt</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default InstituteSuccessPage;