import jwt from "jsonwebtoken";

const generateAuthToken = (_id, fullName, email, isAdmin,isSuperAdmin) => {
  return jwt.sign(
    { _id, fullName, email, isAdmin,isSuperAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

export { generateAuthToken };
