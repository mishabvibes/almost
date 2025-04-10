"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subscriptionId = searchParams.get("subscriptionId");
  const planId = searchParams.get("planId");
  const period = searchParams.get("period");
  const callbackUrl = searchParams.get("callbackUrl");
  const amount = searchParams.get("amount");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");
  const district = searchParams.get("district");
  const panchayat = searchParams.get("panchayat");
  const donationId = searchParams.get("donationId");

  useEffect(() => {
    // Load Razorpay SDK
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => initiatePayment();
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
        alert("Failed to load payment gateway. Please try again later.");
      };
      document.body.appendChild(script);
    };

    const initiatePayment = () => {
      if (!subscriptionId || !amount || !callbackUrl) {
        console.error("Missing required parameters:", { subscriptionId, amount, callbackUrl });
        alert("Missing payment details. Please try again.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public key in .env
        amount: Number(amount) * 100, // Convert to paise
        currency: "INR",
        name: "Amal AIC",
        description: `Initial payment for subscription ${subscriptionId}`,
        subscription_id: subscriptionId,
        handler: async function (response) {
          // Payment success callback
          try {
            const razorpayPaymentId = response.razorpay_payment_id;
            const razorpaySubscriptionId = subscriptionId; // Use the subscriptionId from query params

            const apiResponse = await axios.post(
              "/api/update-subscription-status",
              {
                razorpaySubscriptionId,
                name,
                amount,
                phoneNumber: phone,
                district,
                type: "General",
                method: "auto",
                planId,
                email,
                panchayat,
                period,
                razorpay_payment_id: razorpayPaymentId,
                status: "active",
              },
              {
                headers: {
                  "x-api-key": "9a4f2c8d7e1b5f3a9c2d8e7f1b4a5c3d",
                },
              }
            );

            const { data } = apiResponse;

            const queryParams = new URLSearchParams({
              razorpaySubscriptionId,
              name,
              amount,
              phone,
              district: encodeURIComponent(district || ""),
              type: "General",
              method: "auto",
              planId,
              email: email || "",
              panchayat: encodeURIComponent(panchayat || ""),
              period,
              razorpayPaymentId: razorpayPaymentId || "",
              status: "active",
              subscriptionId: data.subscriptionId || "",
              donationId: data.donationId || "",
            }).toString();

            const validCallbackUrl = callbackUrl.startsWith("http") || callbackUrl.startsWith("yourapp://") 
              ? callbackUrl 
              : "yourapp://payment-callback"; // Fallback to a default scheme
            const callbackUrlWithQuery = `${validCallbackUrl}?${queryParams}`;

            console.log("Redirecting to:", callbackUrlWithQuery);
            window.open(callbackUrlWithQuery, '_self');
            alert("Payment successful! Redirecting...");
          } catch (error) {
            console.error("Payment error:", error.response?.status, error.response?.data);
            alert(`Payment failed: ${error.response?.data?.error || "Please try again later."}`);
          }
        },
        prefill: {
          name,
          contact: phone,
          email: email || "default@example.com",
        },
        theme: { color: "#10B981" },
        modal: {
          confirm_close: true, // Prompt user if they try to close the payment modal
          escape: true, // Allow escape key to close
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error.description);
        alert(`Payment failed: ${response.error.description}. Please try again.`);
      });
      rzp.open();
    };

    loadRazorpay();
  }, [subscriptionId, amount, name, phone, district, panchayat, donationId, callbackUrl]);

  return (
    <div>
      <p>Processing payment...</p>
    </div>
  );
}