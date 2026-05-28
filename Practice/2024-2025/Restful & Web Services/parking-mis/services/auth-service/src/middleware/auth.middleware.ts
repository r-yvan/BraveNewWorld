import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthPayload, AuthRequest } from "../types/auth.types";

export const authenticateUser = (
  request: AuthRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      response
        .status(401)
        .json({ message: "Unauthorized!! No token received" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as AuthPayload;

    request.user = {
      id: decodedPayload.id,
      role: decodedPayload.role,
    };
    next();
  } catch (error) {
    response.status(401).json({ message: "Unauthorized!! Invalid token" });
  }
};
