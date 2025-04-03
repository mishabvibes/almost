"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowLeft, User, AlertCircle, RefreshCcw, ChevronLeft, ChevronRight,
  Eye, Clock, X,
} from "lucide-react";

export default function SubscriptionDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const donorId = searchParams.get("donorId");
  const subscriptionId = searchParams.get("subscriptionId");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedDonation, setSelectedDonation] = useState(null); // For Eye modal
  const [trackingData, setTrackingData] = useState(null); // For Track modal

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/subscriptions/details?donorId=${donorId}&subscriptionId=${subscriptionId}`);
        if (!response.ok) throw new Error("Failed to fetch subscription details");
        const data = await response.json();
        setSubscription(data.subscription);
        setDonations(data.donations);
        setTotalAmount(data.totalAmount);
      } catch (error) {
        console.error("Error loading details:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    if (donorId && subscriptionId) fetchDetails();
  }, [donorId, subscriptionId]);

  const viewDonationDetails = (donation) => {
    setSelectedDonation(donation);
  };

  const fetchTrackingData = async (donationId) => {
    try {
      const response = await fetch(`/api/donations/${donationId}/tracking`);
      if (!response.ok) throw new Error("Failed to fetch tracking data");
      const data = await response.json();
      setTrackingData(data);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      setError("Failed to fetch tracking data");
    }
  };

  const closeModal = () => {
    setSelectedDonation(null);
    setTrackingData(null);
  };

  const handleCancelManualPayment = async () => {
    toast(
      <div className="text-center p-1">
        <svg className="w-12 h-12 mx-auto text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <h2 className="text-lg font-semibold mb-2">Cancel Subscription?</h2>
        <p className="text-sm text-gray-600 mb-3">This action cannot be undone.</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-1.5 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition-colors"
            disabled={isLoading}
          >
            Keep
          </button>
          <button
            onClick={async () => {
              setIsLoading(true);
              try {
                const response = await fetch(`/api/subscriptions/cancel?subscriptionId=${subscription._id}`, {
                  method: "DELETE",
                });

                if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.error || "Failed to cancel subscription");
                }

                await signOut({ redirect: false });
                router.push("/admin/subscriptions/list");
                toast.success("Subscription canceled successfully");
              } catch (error) {
                console.error("Error canceling subscription:", error);
                toast.error("Failed to cancel subscription");
              } finally {
                setIsLoading(false);
                toast.dismiss();
              }
            }}
            className="px-4 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition-colors flex items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Canceling...
              </>
            ) : "Cancel Subscription"}
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        position: "top-center",
        className: "max-w-xs shadow-lg rounded-lg",
        style: { background: "white" },
      }
    );
  };

  const handleCancelAutoPayment = async () => {
 

    toast(
      <div className="text-center">
        <p className="text-lg font-semibold mb-4">Confirm Auto Payment Cancellation</p>
        <p className="mb-4">Are you certain you wish to cancel your automatic payment? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={async () => {
              setIsLoading(true);
              try {
                const response = await fetch("/api/cancel-subscription", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ subscriptionId: subscription.razorpaySubscriptionId }),
                });

                if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.error || "Unknown error");
                }

                await signOut({ redirect: false });
                router.push("/admin/subscriptions/list");
                toast.success("Auto payment cancelled successfully!", { position: "top-center" });
              } catch (error) {
                console.error("Error cancelling auto payment:", error);
                toast.error(`Failed to cancel subscription: ${error.message || "Unknown error"}`, { position: "top-center" });
              } finally {
                setIsLoading(false);
                toast.dismiss();
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            disabled={isLoading}
          >
            Yes, Cancel
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            disabled={isLoading}
          >
            No, Keep Payment
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        position: "top-center",
        className: "max-w-md",
      }
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDonations = donations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donations.length / itemsPerPage);

  const formatDate = (dateString) => {
    if (typeof window === "undefined") return dateString;
    return new Date(dateString).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-t-emerald-500 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded flex items-center">
          <RefreshCcw className="h-4 w-4 mr-2" /> Retry
        </button>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="flex justify-center items-center h-screen">
        No subscription found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Container */}
      <ToastContainer />

      {/* Enhanced Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border">
        <div className="flex items-center space-x-4">
          <User className="h-6 w-6 text-emerald-500" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Subscription Details</h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mt-1">
              <p><strong>Subscription ID:</strong> {subscription._id || "N/A"}</p>
              {subscription.planId && <p><strong>Plan ID:</strong> {subscription.planId}</p>}
              <p><strong>Name:</strong> {subscription.name || "N/A"}</p>
              <p><strong>Phone:</strong> {subscription.phone || "N/A"}</p>
              <p><strong>Payment Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${subscription.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                  {subscription.paymentStatus || "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Link href="/admin/subscriptions" className="mt-4 md:mt-0 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border hover:bg-gray-100 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Subscriptions
        </Link>
      </div>

      {/* Subscription Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border">
        <h3 className="text-lg font-medium mb-4">Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="text-sm font-medium">Donor ID</label><p>{subscription.donorId || "N/A"}</p></div>
          <div><label className="text-sm font-medium">Name</label><p>{subscription.name || "N/A"}</p></div>
          <div><label className="text-sm font-medium">Phone</label><p>{subscription.phone || "N/A"}</p></div>
          <div><label className="text-sm font-medium">Amount</label><p>₹{(subscription.amount || 0).toLocaleString()}</p></div>
          <div><label className="text-sm font-medium">Period</label><p>{subscription.period || "N/A"}</p></div>
          <div><label className="text-sm font-medium">Method</label><p>{subscription.method || "N/A"}</p></div>
          <div>
            <label className="text-sm font-medium">Payment Status</label>
            <span className={`px-2 py-1 rounded-full text-xs ${subscription.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
              {subscription.paymentStatus || "N/A"}
            </span>
          </div>
          <div><label className="text-sm font-medium">Last Payment</label><p>{subscription.lastPaymentAt ? formatDate(subscription.lastPaymentAt) : "N/A"}</p></div>
          {subscription.method === "auto" && (
            <div><label className="text-sm font-medium">Razorpay Subscription ID</label><p>{subscription.razorpaySubscriptionId || "N/A"}</p></div>
          )}
          {subscription.planId && (
            <div><label className="text-sm font-medium">Plan ID</label><p>{subscription.planId}</p></div>
          )}
        </div>
        <div className="mt-4">
          {subscription.method === "manual" && (
            <button onClick={handleCancelManualPayment} className="px-4 py-2 bg-red-600 text-white rounded flex items-center">
              <X className="h-4 w-4 mr-2" /> Cancel Subscription
            </button>
          )}
          {subscription.method === "auto" && (
            <button onClick={handleCancelAutoPayment} className="px-4 py-2 bg-red-600 text-white rounded flex items-center">
              <X className="h-4 w-4 mr-2" /> Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border">
        <h3 className="text-lg font-medium mb-4">Payment History</h3>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {["ID", "Amount", "Type", "Method", "Status", "Date", "Actions"].map((label) => (
                  <th key={label} className="px-4 py-3 text-left text-xs font-medium uppercase">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentDonations.map((donation) => (
                <tr key={donation._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3 text-sm">{donation._id}</td>
                  <td className="px-4 py-3 text-sm">₹{(donation.amount || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{donation.type || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{donation.method || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${donation.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {donation.paymentStatus || donation.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{donation.createdAt ? formatDate(donation.createdAt) : "N/A"}</td>
                  <td className="px-4 py-3 text-sm flex space-x-2">
                    <button onClick={() => viewDonationDetails(donation)} className="text-blue-500 hover:text-blue-700">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button onClick={() => fetchTrackingData(donation._id)} className="text-emerald-500 hover:text-emerald-700">
                      <Clock className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {donations.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="flex space-x-2">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg disabled:text-gray-300 hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded ${currentPage === pageNum ? "bg-emerald-500 text-white" : "hover:bg-gray-100"}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg disabled:text-gray-300 hover:bg-gray-100">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border">
        <h3 className="text-lg font-medium mb-4">Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="text-sm font-medium">Total Paid</label><p>₹{(totalAmount || 0).toLocaleString()}</p></div>
          <div><label className="text-sm font-medium">Average Payment</label><p>₹{(donations.length ? totalAmount / donations.length : 0).toLocaleString()}</p></div>
          <div><label className="text-sm font-medium">Payment Count</label><p>{donations.length}</p></div>
        </div>
      </div>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">Donation Details</h3>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedDonation._id}</p>
              <p><strong>Amount:</strong> ₹{(selectedDonation.amount || 0).toLocaleString()}</p>
              <p><strong>Type:</strong> {selectedDonation.type || "N/A"}</p>
              <p><strong>Method:</strong> {selectedDonation.method || "N/A"}</p>
              <p><strong>Status:</strong> {selectedDonation.paymentStatus || selectedDonation.status || "N/A"}</p>
              <p><strong>Date:</strong> {selectedDonation.createdAt ? formatDate(selectedDonation.createdAt) : "N/A"}</p>
              {selectedDonation.metadata && (
                <p><strong>Metadata:</strong> {JSON.stringify(selectedDonation.metadata)}</p>
              )}
            </div>
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded flex items-center">
              <X className="h-4 w-4 mr-2" /> Close
            </button>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Payment Tracking Timeline</h3>
            {trackingData.length > 0 ? (
              <ul className="space-y-4">
                {trackingData.map((event, index) => (
                  <li key={index} className="border-l-2 border-emerald-500 pl-4">
                    <p><strong>Event:</strong> {event.event || "N/A"}</p>
                    <p><strong>Status:</strong> {event.status || "N/A"}</p>
                    <p><strong>Timestamp:</strong> {event.timestamp ? formatDate(event.timestamp) : "N/A"}</p>
                    {event.details && <p><strong>Details:</strong> {JSON.stringify(event.details)}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No tracking data available.</p>
            )}
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded flex items-center">
              <X className="h-4 w-4 mr-2" /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}