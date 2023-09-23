import express from "express";
import userRoutes from "../routes/userRoutes.js";
const app = express();
import jwt from "jsonwebtoken";
import votingRoutes from "./votingRoutes.js"
// Sign out controller
app.get("/logout", (req, res) => {
  return res.clearCookie("access_token").send("access token cleared");
});
app.get("/get-token", (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    return res.json({
      isAdmin: decoded.isAdmin,
      isSuperAdmin: decoded.isSuperAdmin,
      token: decoded,
    });
  } catch (err) {
    console.log(err)
    return res.status(401).send("Unauthorized. Invalid Token");
  }
});
app.use("/vote", votingRoutes);
app.use("/users", userRoutes);

export default app;
