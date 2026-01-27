import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
      {
            userId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
                  index: true,
            },

            name: {
                  type: String,
                  requried: true,
            },

            amount: {
                  type: Number,
                  required: true,
                  min: 0,
            },

            billingCycle: {
                  type: String,
                  enum: ["monthly", "yearly", "weekly"],
                  required: true,
            },

            renewalDate: {
                  type: Date,
                  required: true,
                  index: true,
            },

            reminderDaysBefore: {
                  type: Number,
                  default: 1,
            },

            lastNotifiedAt: {
                  type: Date,
            },

            status: {
                  type: String,
                  enum: ["active", "cancelled", "paused"],
                  default: "active",
            },

            provider: {
                  type: String,
            },
      },
      { timestamps: true },
);

subscriptionSchema.index({ userId: 1, renewalDate: 1 });

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

export default subscriptionModel;
