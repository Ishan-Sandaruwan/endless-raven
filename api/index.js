import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import customerRoutes from "./routes/customer.routes.js";
import projectRoutes from "./routes/project.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import memberRoutes from "./routes/member.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGODB, connectionParams)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const __dirname = path.resolve();

app.use("/api/customer", customerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/member", memberRoutes);

app.use(express.static(path.join(__dirname, "/my-project/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "my-project", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
