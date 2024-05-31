import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import taskManagerRoutes from "./routes/taskManagerRoutes";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/tasks", taskManagerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
