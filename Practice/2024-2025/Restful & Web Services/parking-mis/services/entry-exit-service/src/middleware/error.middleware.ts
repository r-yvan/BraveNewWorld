import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error("Error:", error.message || error);
  response.status(error.status || 500).json({
    message: error.message || "Internal server error!!",
  });
};
