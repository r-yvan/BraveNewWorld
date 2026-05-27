import { Router } from "express";
import { loginUserValidation, registerUserValidation } from "../validations/auth.validation";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUserValidation, registerUser);
router.post("/login", loginUserValidation, loginUser)

export default router;