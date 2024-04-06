import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";

// import all routes
import authRoutes from "./routes/auth.route.js";
import { upload } from "./middlewares/multer.middleware.js";
import { uploadDocument } from "./utils/uploadDocument.js";
import { isAdmin, validateToken } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);

app.post("/api/v1/upload", upload.single("file"), uploadDocument);
app.post("/api/v1/approve", validateToken, isAdmin, approveDocument);

// Initializing PORT and make an express server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
  });
});
