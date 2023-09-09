import express from "express";
import userRoutes from "../routes/userRoutes.js"; 
const app = express();

// Sign out controller
app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});

app.use("/users", userRoutes);

export default app; 
