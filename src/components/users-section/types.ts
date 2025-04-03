// src/components/users-section/types.ts

export interface DonationType {
  id: number;
  name: string;
}

import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export interface Donation {
  subscriptionId: string;
  name: string;
  phone: string;
  amount: string;
  period: string;
  paymentStatus: string;
  paymentDate: string;
}

export interface Payment {
  _id: string;              // e.g., "67e143d1d47712a48fb950f2"
  amount: number;           // e.g., 2500
  district: string;         // e.g., "Thiruvananthapuram"
  donorId: string;          // e.g., "67e143d1d47712a48fb950ee"
  method: string;           // e.g., "auto"
  name: string;             // e.g., "jazeel"
  panchayat: string;        // e.g., "Chemmaruthy"
  paymentDate: string;      // e.g., "2025-03-24T11:36:49.751Z" (ISO string)
  paymentStatus: string;    // e.g., "paid"
  period: string;           // e.g., "weekly"
  phone: string;            // e.g., "+919961633885"
  razorpayPaymentId: string;// e.g., "pay_QAc5oPfMjQ1jqe"
  razorpaySubscriptionId: string; // e.g., "sub_QAc5ck0ePlvpgm"
  status: string;           // e.g., "active"
  subscriptionId: string;   // e.g., "67e143d1d47712a48fb950f0"
  type: string;             // e.g., "General"
}

// Existing PaymentHistory for comparison
export interface PaymentHistory {
  id: number;
  date: string;
  amount: number;
  donationType: string;
  status: string;
  receiptNo: string;
}

export interface SubscriptionData {
  _id: string;
  donorId: string;
  name: string;
  phone: string;
  email?: string;
  amount: string;
  period: string;
  type: string;
  district?: string;
  panchayat?: string;
  donationType?: string;
  method?: string;
  createdAt?: string;
}

export interface Subscription {
  _id: string;
  razorpaySubscriptionId: string;
  id: number;
  type: "auto" | "manual";
  donationType: string;
  amount: number;
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  phoneNumber: string;
  nextPaymentDue: string;
  createdAt?: string;
  lastPaymentDate?: string;
  status?: "active" | "paused" | "cancelled";
}

export interface User {
  name: string;
  phoneNumber: string;
  email?: string;
  joinedDate: string;
  totalDonations: number;
}

export interface PaymentHistory {
  id: number;
  date: string;
  amount: number;
  donationType: string;
  status: string;
  receiptNo: string;
}

export interface Campaign {
  id: string ;
  title: string;
  description: string;
  raised: number;
  goal: number;
  endDate: string;
  type: "fundraising" | "physical" | "fixedamount";
  image: string;
  isInfinite: boolean;
  area?: number;
  rate?: number;
}

export interface BaseOption {
  duration: string;
  amount: number;
  description: string;
}

export interface EducationOption extends BaseOption {
  withEducation: number;
}

export interface ActiveOption extends BaseOption {
  finalAmount: number;
  includesEducation: boolean;
  withEducation?: number;
}

export const sponsorshipData: Record<string, (BaseOption | EducationOption)[]> = {
  Yatheem: [
    { duration: "One Year", amount: 30000, description: "Provide full annual support for a child in need." },
    { duration: "6 Months", amount: 15000, description: "Half-year support for essential care and education." },
    { duration: "1 Month", amount: 2500, description: "Monthly support to cover basic needs." },
  ],
  Hafiz: [
    { duration: "One Year", amount: 30000, withEducation: 50000, description: "Support the religious education of a student for a full year." },
    { duration: "6 Months", amount: 15000, withEducation: 25000, description: "Half-year support for a Hafiz student's development." },
    { duration: "1 Month", amount: 2500, withEducation: 5000, description: "Monthly sponsorship for Hafiz programs." },
  ],
};

export function hasEducation(option: BaseOption): option is EducationOption {
  return "withEducation" in option;
}

export interface Box {
  id: number;
  serialNumber: string;
  amountDue: number;
  name: string;
  lastPayment: string;
  status: "active" | "pending" | "overdue";
}

export interface UserData {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  lastLogin?: string;
}

// export interface Box {
//   id: string;
//   serialNumber: string;
//   amountDue: number;
//   name: string;
//   totalAmount: number;
//   lastPayment: string;
//   status: "active" | "dead" | "overdue";
// }

export interface Transaction {
  id: string;
  boxId: number;
  boxSerialNumber: string;
  amount: number;
  paymentMethod: "upi" | "card" | "netbanking";
  status: "success" | "pending" | "failed";
  timestamp: string;
}

export interface BoxData {
  _id: string;
  name: string;
  mobileNumber: string;
  district: string;
  panchayath: string;
  amount?: string | number;
  phone?: string;
  boxId?: string;
  type?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
}

export type PaymentMethod = "upi" | "card" | "netbanking";
export type PageState = "verification" | "boxList" | "payment" | "history" | "editProfile";
export type VerificationStep = "phone" | "otp";
export type PaymentStep = "details" | "method" | "processing" | "success";