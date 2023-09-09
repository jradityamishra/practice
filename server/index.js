import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connection from "./database/db.js";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/apiRoutes.js";

// CONFIG ENV
dotenv.config();

const PORT = process.env.PORT || 8000;

// REST OBJECT
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// DATABASE CONNECTION
connection();

// REST API
app.get("/", async (req, res, next) => {
  res.json({ message: "API running" });
});

app.use("/api", apiRoutes);

// MIDDLEWAREs TO HANDLE ERRORS
app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`.bgBlue.white);
});
