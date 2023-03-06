import express, {Application} from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';

const app:Application = express();
app.use(express.json());
app.use(cors())


import musicsRoutes from "./routes/musicRoutes";
// route 
app.use("/api/", musicsRoutes);



const PORT:string|undefined = process.env.PORT;
const mongo_url:string|undefined = process.env.MONGODB_URL;

const startServer = async () => {
    try {
        console.log(mongo_url!)
        await mongoose.connect(mongo_url!);
        console.log("Connected to db ✅");
        app.listen(PORT, ()=>{
            console.log(`Application listening at port ${PORT}`);
        });
    } catch (error) {
        console.log("Failed to connect to the db ❌");
        console.log(error);
    }
}

startServer();
