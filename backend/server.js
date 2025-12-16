import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/connectDB.js";

// routers
import productRouter from "./router/productRouter.js";
import authRouter from "./router/authRouter.js";
import addToCartRouter from "./router/addToCartRouter.js";
import likeRouter from "./router/wishListRouter.js";
import ordersRouter from "./router/ordersRouter.js";
import userAddressRouter from "./router/userAddressRouter.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://vishnu-shankar-ecommerce-fr-git-405a1d-vishnu-shankars-projects.vercel.app/",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json(`Server running on port ${PORT}`);
});

// API routes
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", addToCartRouter);
app.use("/api", likeRouter);
app.use("/api", ordersRouter);
app.use("/api", userAddressRouter);

async function start() {
  await connectDB(process.env.MONGODB_URL);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
