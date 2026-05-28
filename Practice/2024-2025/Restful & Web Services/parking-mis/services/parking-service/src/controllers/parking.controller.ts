import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createParkingService,
  getAllParkingsService,
  getParkingByIdService,
  updateParkingService,
  deleteParkingService,
} from "../services/parking.service";

export const createParking = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({ errors: errors.array() });
      return;
    }

    const parking = await createParkingService(request.body);
    response.status(201).json({ message: "Parking registered successfully", parking });
  } catch (error: any) {
    if (error.message === "Parking with this code already exists") {
      response.status(409).json({ message: error.message });
      return;
    }
    console.error("Create parking error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getAllParkings = async (request: Request, response: Response) => {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const result = await getAllParkingsService(page, limit);
    response.status(200).json(result);
  } catch (error: any) {
    console.error("Get all parkings error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getParkingById = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(400).json({ message: "Invalid parking ID" });
      return;
    }
    const parking = await getParkingByIdService(id);
    response.status(200).json(parking);
  } catch (error: any) {
    if (error.message === "Parking not found") {
      response.status(404).json({ message: error.message });
      return;
    }
    console.error("Get parking error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const updateParking = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({ errors: errors.array() });
      return;
    }

    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(400).json({ message: "Invalid parking ID" });
      return;
    }

    const parking = await updateParkingService(id, request.body);
    response.status(200).json({ message: "Parking updated successfully", parking });
  } catch (error: any) {
    if (error.message === "Parking not found") {
      response.status(404).json({ message: error.message });
      return;
    }
    console.error("Update parking error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const deleteParking = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(400).json({ message: "Invalid parking ID" });
      return;
    }
    const result = await deleteParkingService(id);
    response.status(200).json(result);
  } catch (error: any) {
    if (error.message === "Parking not found") {
      response.status(404).json({ message: error.message });
      return;
    }
    console.error("Delete parking error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};
