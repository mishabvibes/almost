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
    // Store period and lastPaymentAt in request context (we’ll set these in the handler)
    const response = await handler(request, ...args);

    if (!response.ok || response.status >= 400) {
      return response;
    }

    const data = await response.json();
    const { subscriptions, period, lastPaymentAt } = data;

    if (!subscriptions || period === undefined || lastPaymentAt === undefined) {
      return NextResponse.json(data); // Return unchanged if required data is missing
    }

    // Calculate paymentStatus using provided period and lastPaymentAt
    const paymentStatus = getPaymentStatus(period, lastPaymentAt);

    // Enrich the subscriptions with the computed paymentStatus
    const enrichedSubscriptions = subscriptions.map((sub) => ({
      ...sub,
      paymentStatus,
    }));

    return NextResponse.json({
      subscriptions: enrichedSubscriptions,
      period,
      lastPaymentAt,
      paymentStatus,
    });
  };
}