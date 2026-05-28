import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.error("Error occurred:", error);
  const status = error.status || 500;
  const message = error.message || "Internal server error!!";
  response.status(status).json({ message, error: process.env.NODE_ENV === 'development' ? error : undefined });
};
