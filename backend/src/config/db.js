import mongoose from "mongoose";
export const  connectDB=async() => {
    try {
        await mongoose.connect(
            "mongodb+srv://azh_msa:shaheer123@notesapp.qdijtgd.mongodb.net/?appName=notesapp"
        );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB: ",error);
        process.exit(1);
    }
}

