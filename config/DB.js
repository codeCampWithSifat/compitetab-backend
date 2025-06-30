import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected To MongoDb succesfuly");
  } catch (error) {
    console.error("Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
