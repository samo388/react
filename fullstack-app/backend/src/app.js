import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

/* =====================
   Middlewares
===================== */
app.use(cors());
app.use(express.json());

/* =====================
   Routes
===================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

app.use("/api/auth", authRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
