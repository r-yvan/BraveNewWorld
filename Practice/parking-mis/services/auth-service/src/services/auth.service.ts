import prisma from "../config/database";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { generateToken } from "../utils/generateToken";

export const registerUserService = async (data: RegisterUserDto): Promise<User> => {
  const { email, password } = data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) throw new Error("User with this email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const loginUserService = async (data: LoginUserDto): Promise<String> => {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) 
    throw new Error("Invalid credentials!!");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) 
    throw new Error("Invalid email or password");

  const token = generateToken(user.id, user.role);
  return token;
};
