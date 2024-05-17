import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        console.log("DB is connecting...")
        const res = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected: ${res.connection.host}`)
    } catch (error) {
        console.log("server error in connection to mongo", error.message)
        process.exit(1);
    }
}