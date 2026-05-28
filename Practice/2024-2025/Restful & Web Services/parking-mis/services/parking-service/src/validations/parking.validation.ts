import { body } from "express-validator";

export const createParkingValidation = [
  body("code").notEmpty().withMessage("Parking code is required"),
  body("name").notEmpty().withMessage("Parking name is required"),
  body("totalSpaces")
    .isInt({ min: 1 })
    .withMessage("Total spaces must be a positive integer"),
  body("location").notEmpty().withMessage("Location is required"),
  body("chargingFeePerHour")
    .isFloat({ min: 0 })
    .withMessage("Charging fee per hour must be a non-negative number"),
];

export const updateParkingValidation = [
  body("name").optional().notEmpty().withMessage("Parking name cannot be empty"),
  body("totalSpaces")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total spaces must be a positive integer"),
  body("location")
    .optional()
    .notEmpty()
    .withMessage("Location cannot be empty"),
  body("chargingFeePerHour")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Charging fee per hour must be a non-negative number"),
];
