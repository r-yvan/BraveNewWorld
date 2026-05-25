import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  }
}

export interface AuthPayload extends JwtPayload {
  id: string;
  role: string;
}