import cron from "node-cron";
import Subscription from "../models/Subscription.model.js";
import sendEmail from "../utils/sendEmail.js";

const runSubscriptionReminder = () => {
  // Runs every day at 9 AM
  cron.schedule("* * * * *", async () => {
    console.log("Running subscription reminder cron...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const subscriptions = await Subscription.find({
      status: "active"
    }).populate("userId", "email name");

    for (const sub of subscriptions) {
      const reminderDate = new Date(sub.renewalDate);
      reminderDate.setDate(
        reminderDate.getDate() - sub.reminderDaysBefore
      );
      reminderDate.setHours(0, 0, 0, 0);

      // Skip if not today
      if (reminderDate.getTime() !== today.getTime()) continue;

      // Skip if already notified today
      if (
        sub.lastNotifiedAt &&
        sub.lastNotifiedAt.toDateString() === today.toDateString()
      )
        continue;

      await sendEmail({
        to: sub.userId.email,
        subject: `Subscription Reminder: ${sub.name}`,
        text: `Hi ${sub.userId.name},

Your subscription "${sub.name}" (${sub.provider || "Service"}) 
will renew on ${sub.renewalDate.toDateString()}.

Amount: ₹${sub.amount}

If you don’t need it, cancel before renewal.

Stay in control of your money 💸
— SubTrack`
      });

      sub.lastNotifiedAt = new Date();
      await sub.save();
    }
  });
};

export default runSubscriptionReminder;