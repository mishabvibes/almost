// src/app/payment/page.js
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios  from "axios";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const subscriptionId = searchParams.get("subscriptionId");
  const planId = searchParams.get("planId");
  const period = searchParams.get("period");
  const callbackUrl =searchParams.get("callbackUrl")
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
      document.body.appendChild(script);
    };

    const initiatePayment = () => {
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
            const response = await axios.post("/api/update-subscription-status", {
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
              razorpayOrderId: razorpayOrderId, // Assuming these are defined
              razorpay_payment_id: razorpayPaymentId,
              status: "active",
            }, {
              headers: {
                "x-api-key": "9a4f2c8d7e1b5f3a9c2d8e7f1b4a5c3d",
              },
            });
          
            // Axios resolves only for 2xx, so if we’re here, it’s OK
            const { data } = response;

            const queryParams = new URLSearchParams({
              razorpaySubscriptionId,
              name,
              amount,
              phone: phone,
              district: encodeURIComponent(district), // Encode to handle special characters
              type: "General",
              method: "auto",
              planId,
              email: email || "", // Handle undefined/null email
              panchayat: encodeURIComponent(panchayat),
              period,
              razorpayOrderId: razorpayOrderId || "",
              razorpayPaymentId: razorpayPaymentId || "",
              status: "active",
              // Add response data if available
              subscriptionId: data.subscriptionId || "", // From API response
              donationId: data.donationId || "", // From API response
            }).toString();
          
            const callbackUrlWithQuery = `${callbackUrl}?${queryParams}`;
          
            console.log("Redirecting to:", callbackUrl);
            window.open(callbackUrlWithQuery, '_self');
            
            console.log("Success:", data);
          } catch (error) {
            console.error("Error:", error.response?.status, error.response?.data);
          }
                  
                   


                   
          // Update subscription status via API
        //   const res = await fetch("/api/subscriptions/update", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(paymentData),
        //   });

        //   if (res.ok) {
        //     // Redirect back to app
        //     const redirectParams = new URLSearchParams({
        //       success: "true",
        //       subscriptionId,
        //       razorpayPaymentId: response.razorpay_payment_id,
        //       amount,
        //       name,
        //       phone,
        //       district,
        //       panchayat,
        //     });
        //     window.location.href = `yourapp://payment-success?${redirectParams.toString()}`;
        //   } else {
        //     alert("Failed to activate subscription");
        //   }
        },
        prefill: {
          name,
          contact: phone,
          email: "default@example.com",
        },
        theme: { color: "#10B981" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    loadRazorpay();
  }, [subscriptionId, amount, name, phone, district, panchayat, donationId]);

  return (
    <div>
     
    </div>
  );
}