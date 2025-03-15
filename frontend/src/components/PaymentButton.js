"use client";

import { useState } from "react";

export default function PaymentButton({ amount, currency }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        body: JSON.stringify({ amount, currency }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error("Payment failed:", error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      disabled={loading}
    >
      {loading ? "Processing..." : `Pay ${amount} ${currency}`}
    </button>
  );
}
