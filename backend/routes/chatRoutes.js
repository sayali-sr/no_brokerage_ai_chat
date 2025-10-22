import express from "express";
import { handleUserQuery } from "../services/dbService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await handleUserQuery(message);
    res.json(response);
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
