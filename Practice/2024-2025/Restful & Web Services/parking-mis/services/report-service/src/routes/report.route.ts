import { Router } from "express";
import { getOutgoingCarsReport, getEnteredCarsReport } from "../controllers/report.controller";
import { dateRangeValidation } from "../validations/report.validation";
import { authenticateUser, authorizeAdmin } from "../middleware/auth.middleware";

const router = Router();

// Only admin can view reports
router.get("/outgoing", authenticateUser, authorizeAdmin, dateRangeValidation, getOutgoingCarsReport);
router.get("/entered", authenticateUser, authorizeAdmin, dateRangeValidation, getEnteredCarsReport);

export default router;
