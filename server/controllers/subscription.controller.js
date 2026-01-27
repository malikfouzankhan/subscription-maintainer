import Subscription from "../models/Subscription.model.js";

export const createSubscription = async (req, res) => {
      try {
            const subscription = new Subscription({
                  ...req.body,
                  userId: req.user._id,
            });

            await subscription.save();

            res.status(201).json({
                  success: true,
                  message: "Subscription created successfully",
                  subscription,
            });
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
};

export const getSubscriptions = async (req, res) => {
      try {
            const subs = await Subscription.find({ userId: req.user._id });
            res.json({
                  success: true,
                  message: "All subscriptions fetched successfully",
                  subs,
            });
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

export const deleteSubscription = async (req, res) => {
      try {
            const sub = await Subscription.findOne({
                  _id: req.params.id,
                  userId: req.user._id,
            });

            if (!sub) {
                  return res.status(404).json({
                        success: true,
                        message: "Subscription not found",
                  });
            }

            await sub.deleteOne();
            res.json({ message: "Subscription deleted" });
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
};