import express from "express";
import { createVoice, getVoices } from "../controllers/voiceController.js";

const router = express.Router();

router.post("/", createVoice);
router.get("/", getVoices);

export default router;