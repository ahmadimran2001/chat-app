// usimg modules in package.json in type
import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/conectToMongoDB.js";
//using routes
import authRoutes from "./routes/auth.routes.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("HELLO WORLD!!");
});
//,iddle ware for routes
app.use("/api/auth", authRoutes);
connectToMongoDB();
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
