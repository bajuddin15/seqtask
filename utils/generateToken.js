import jwt from "jsonwebtoken";
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return token;
};

export { generateToken };
