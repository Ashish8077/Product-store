import express from "express";
import { connectDb } from "./db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, async () => {
  try {
    console.log(`Server started at http://localhost:${PORT}`);
    connectDb();
  } catch (error) {
    console.error("Error connecting to database", error.message);
    process.exit(1);
  }
});
