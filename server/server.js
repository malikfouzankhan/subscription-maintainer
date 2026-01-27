import "./db/dbConnect.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import runSubscriptionReminder from "./cron/reminder.js";

const port = process.env.PORT;

runSubscriptionReminder();

app.listen(port, () => {
      console.log(`Server is up and running at: http://localhost:${port}`);
});