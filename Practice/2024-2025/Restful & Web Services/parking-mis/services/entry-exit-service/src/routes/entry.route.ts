import { Router } from "express";
import {
  registerCarEntry,
  registerCarExit,
  getTicket,
  getAllCarEntries,
  getCarEntryById,
  getActiveEntries,
} from "../controllers/entry.controller";
import { registerCarEntryValidation } from "../validations/entry.validation";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

// All routes require authentication
router.get("/", authenticateUser, getAllCarEntries);
router.get("/active", authenticateUser, getActiveEntries);
router.get("/:id", authenticateUser, getCarEntryById);
router.get("/:id/ticket", authenticateUser, getTicket);
router.post("/", authenticateUser, registerCarEntryValidation, registerCarEntry);
router.put("/:id/exit", authenticateUser, registerCarExit);

export default router;
