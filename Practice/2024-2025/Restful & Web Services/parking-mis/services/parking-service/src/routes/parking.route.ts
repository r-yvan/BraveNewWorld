import { Router } from "express";
import {
  createParking,
  getAllParkings,
  getParkingById,
  updateParking,
  deleteParking,
} from "../controllers/parking.controller";
import {
  createParkingValidation,
  updateParkingValidation,
} from "../validations/parking.validation";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public: view available parking (attendants/drivers)
router.get("/", authenticateUser, getAllParkings);
router.get("/:id", authenticateUser, getParkingById);

// Admin only: manage parking
router.post("/", authenticateUser, authorizeAdmin, createParkingValidation, createParking);
router.put("/:id", authenticateUser, authorizeAdmin, updateParkingValidation, updateParking);
router.delete("/:id", authenticateUser, authorizeAdmin, deleteParking);

export default router;
