// models/Donation.js

// import mongoose from "mongoose";

// const donationSchema = new mongoose.Schema({
//   donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", default: null },
//   subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
//   amount: { type: Number, required: true },
//   type: {
//     type: String,
//     enum: ["General", "Yatheem", "Hafiz", "Building", "Campaign", "Institution", "Box", "Sponsor-Yatheem", "Sponsor-Hafiz"],
//     default: "General",
//   },
//   name: { type: String, default: null },
//   phone: { type: String, default: null },
//   method: { type: String, enum: ["auto", "manual"], required: true, default: "manual" },
//   status: { type: String, enum: ["pending", "completed"], default: "completed" }, // For manual
//   district: { type: String, default: null },
//   panchayat: { type: String, default: null },
//   createdAt: { type: Date, default: Date.now },
//   // Auto-specific fields (optional)
//   razorpaySubscriptionId: { type: String, default: null },
//   razorpayPaymentId: { type: String, default: null },
//   paymentStatus: { type: String, enum: ["paid", "pending", "failed"], default: "paid" }, // For auto
//   paymentDate: { type: Date, default: Date.now },
//   // Other fields from original Donation schema
//   userId: { type: String, default: null },
//   boxId: { type: String, default: null },
//   campaignId: { type: String, default: null },
//   email: { type: String, default: null },
//   instituteId: { type: String, default: null },
//   razorpayOrderId: { type: String, default: null },
// }, { collection: "donations" });

// export default mongoose.models.Donation || mongoose.model("Donation", donationSchema);
import mongoose from "mongoose";
const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["General", "Yatheem", "Hafiz", "Building", "Campaign", "Institution",'Box',"Sponsor-Yatheem","Sponsor-Hafiz"],
    required: true,
  },
  boxId: { type: String, default: null },
  campaignId: { type: String, default: null },
  email:{type:String, default:null},
  instituteId: { type: String, default: null },
  district: { type: String, default: null },
  panchayat: { type: String, default: null },
  email: { type: String, default: null },
  name: { type: String, default: null },
  phone: { type: String, default: null },
  status: { type: String, enum: ["Pending", "Completed"], default: "Completed" },
  razorpayPaymentId: { type: String, default: null },
  razorpayOrderId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.models.Donation || mongoose.model("Donation", donationSchema);

export default Donation;