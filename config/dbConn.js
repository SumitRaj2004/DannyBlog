import mongoose from "mongoose"
import { config } from "dotenv";
config();

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("succesfully connected to database");
    }catch(err){
        console.log("oops! not connected to database");
    }
}

connectDb();