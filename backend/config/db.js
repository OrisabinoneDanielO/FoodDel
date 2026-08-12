import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/food-del";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection failed:", error.message);
        process.exit(1);
    }
};

