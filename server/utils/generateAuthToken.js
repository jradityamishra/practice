import jwt from "jsonwebtoken";

const generateAuthToken = (_id, firstName, lastName, email, isAdmin,isSuperAdmin) => {
  return jwt.sign(
    { _id, firstName, lastName, email, isAdmin,isSuperAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "20m" }
  );
};

export { generateAuthToken };
