import express from "express"
import colors from "colors";
import dotenv from "dotenv"
import connection from "./database/db.js";
import adhardetailRoutes from "./routes/adhardetailRoute.js"
//CONFIG ENV
dotenv.config();
const PORT=process.env.PORT||8000;

//REST OBJECT
const app=express();

//MIDDLEWARE
app.use(express.json());

//RSET API
app.use('/api/v1/adhar',adhardetailRoutes);

//DATABASE CONNECTION
connection()
app.listen(PORT,()=>{
    console.log(`server Running on PORT ${PORT}`.bgBlue.white)
})