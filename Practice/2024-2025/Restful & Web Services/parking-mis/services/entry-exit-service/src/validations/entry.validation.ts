import { body } from "express-validator";

export const registerCarEntryValidation = [
  body("plateNumber").notEmpty().withMessage("Plate number is required"),
  body("parkingCode").notEmpty().withMessage("Parking code is required"),
];
