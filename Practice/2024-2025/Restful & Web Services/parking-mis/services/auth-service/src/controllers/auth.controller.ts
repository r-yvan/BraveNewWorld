import { User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../config/database";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { loginUserService, registerUserService } from "../services/auth.service";
import { validationResult } from "express-validator";

export const registerUser = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
       response.status(400).json({ errors: errors.array() });
       return;
    }

    const user = await registerUserService(request.body);
    response.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
}

export const loginUser = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
       response.status(400).json({ errors: errors.array() });
       return ;
    }

    const token = await loginUserService(request.body);
    response.status(200).json({ message: "Login went successful!!", token });
  } catch (error) {
    response.status(500).json({ message: "Internal server error" });
  }
}