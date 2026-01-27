import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import subscriptionRoutes from "./routes/subscription.route.js"

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
      res.status(200).json({ msg: "API calls working fine" });
});

app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

export default app;