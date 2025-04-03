import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  channel: { type: String, enum: ["In-App", "SMS", "WhatsApp", "Email"], required: true },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);