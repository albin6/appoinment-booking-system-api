import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import appointmentRouter from "./routes/appoinmentsRoutes.js";

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGIN,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Body Parsing
app.use(express.json({ limit: "10kb" }));

// Sample Route
app.get("/", (req, res) => {
  res.json("Spa Appointment Booking System API is running!");
});

app.use("/appointments", appointmentRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://127.0.0.1:${PORT}`)
);
