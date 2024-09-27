import express from "express"
import dotenv from "dotenv"
import connectDB from "./models/connectDB.js"
import routes from "./routes/routes.js";
import cors from "cors"

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());
const port = process.env.PORT || 8001;
connectDB();
app.use("/api", routes);


app.listen(port,()=>{
    console.log("Server running on port:" + port);
})