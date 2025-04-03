import { NextResponse } from "next/server";

export function getPaymentStatus(period, lastPaymentAt) {
  const now = new Date();
  const lastPaymentDate = new Date(lastPaymentAt);

  if (isNaN(lastPaymentDate.getTime())) return "pending";

  switch (period) {
    case "daily":
      return now.toDateString() === lastPaymentDate.toDateString() ? "paid" : "pending";
    case "weekly":
      const getWeekStart = (date) => {
        const d = new Date(date);
        d.setDate(d.getDate() - d.getDay());
        d.setHours(0, 0, 0, 0);
        return d;
      };
      return getWeekStart(now).getTime() === getWeekStart(lastPaymentDate).getTime() ? "paid" : "pending";
    case "monthly":
      return now.getMonth() === lastPaymentDate.getMonth() && now.getFullYear() === lastPaymentDate.getFullYear() ? "paid" : "pending";
    case "yearly":
      return now.getFullYear() === lastPaymentDate.getFullYear() ? "paid" : "pending";
    default:
      return "pending";
  }
}

export function paymentStatusMiddleware(handler) {
  return async (request, ...args) => {
    const response = await handler(request, ...args);

    if (!response.ok || response.status >= 400) {
      return response;
    }

    const data = await response.json();

    // Handle single subscription case (e.g., /api/subscriptions/details)
    if (data.subscription) {
      const enrichedSubscription = {
        ...data.subscription,
        paymentStatus: getPaymentStatus(data.subscription.period, data.subscription.lastPaymentAt),
      };
      return NextResponse.json({
        ...data,
        subscription: enrichedSubscription,
      });
    }

    // Handle multiple subscriptions case (e.g., /api/subscriptions/all)
    if (data.subscriptions) {
      const enrichedSubscriptions = data.subscriptions.map((sub) => ({
        ...sub,
        paymentStatus: getPaymentStatus(sub.period, sub.lastPaymentAt),
      }));
      return NextResponse.json({
        ...data,
        subscriptions: enrichedSubscriptions,
      });
    }

    // Return unchanged if neither subscription nor subscriptions is present
    return NextResponse.json(data);
  };
}