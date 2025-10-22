import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/chat", chatRoutes);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack); // prints full error in backend console
  res.status(500).json({ error: err.message, stack: err.stack });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
