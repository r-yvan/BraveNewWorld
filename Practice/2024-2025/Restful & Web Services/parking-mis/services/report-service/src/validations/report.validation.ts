import { query } from "express-validator";

export const dateRangeValidation = [
  query("startDate").notEmpty().withMessage("Start date is required").isISO8601().withMessage("Start date must be a valid ISO 8601 date"),
  query("endDate").notEmpty().withMessage("End date is required").isISO8601().withMessage("End date must be a valid ISO 8601 date"),
];
