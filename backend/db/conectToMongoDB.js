import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to momgoDB");
  } catch (e) {
    console.log("Error connection to MongoDB", e.message);
  }
};

export default connectToMongoDB;
