// usimg modules in package.json in type
import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/conectToMongoDB.js";
import cookieParser from "cookie-parser";
//using routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//middleware for routes
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// app.use(express.json("")); //to parse the incomming requests with json payload from req.body

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server running on port ${PORT}`);
});
