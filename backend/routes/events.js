import express from "express";
import { getEvents, createEvent, updateEventById, getEventTrends } from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);

router.post("/", createEvent);

router.put("/:id",updateEventById);

router.get("/trends", getEventTrends);

export default router;