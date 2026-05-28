import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  registerCarEntryService,
  registerCarExitService,
  getTicketService,
  getAllCarEntriesService,
  getCarEntryByIdService,
  getActiveEntriesService,
} from "../services/entry.service";

export const registerCarEntry = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({ errors: errors.array() });
      return;
    }

    const entry = await registerCarEntryService(request.body);
    
    // Return with ticket
    const ticket = {
      ticketNumber: entry.ticketNumber,
      plateNumber: entry.plateNumber,
      parkingCode: entry.parkingCode,
      entryDateTime: entry.entryDateTime,
      status: "PARKED",
    };

    response.status(201).json({
      message: "Car entry registered successfully",
      entry,
      ticket,
    });
  } catch (error: any) {
    if (error.message === "This car is already parked and has not exited yet") {
      response.status(409).json({ message: error.message });
      return;
    }
    console.error("Register car entry error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const registerCarExit = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(400).json({ message: "Invalid entry ID" });
      return;
    }

    const { chargingFeePerHour } = request.body;
    if (!chargingFeePerHour || chargingFeePerHour <= 0) {
      response.status(400).json({ message: "Valid charging fee per hour is required" });
      return;
    }

    const result = await registerCarExitService(id, chargingFeePerHour);
    response.status(200).json({
      message: "Car exit registered successfully",
      ...result,
    });
  } catch (error: any) {
    if (error.message === "Car entry not found") {
      response.status(404).json({ message: error.message });
      return;
    }
    if (error.message === "Car has already exited") {
      response.status(409).json({ message: error.message });
      return;
    }
    console.error("Register car exit error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getTicket = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(400).json({ message: "Invalid entry ID" });
      return;
    }

    const ticket = await getTicketService(id);
    response.status(200).json(ticket);
  } catch (error: any) {
    if (error.message === "Car entry not found") {
      response.status(404).json({ message: error.message });
      return;
    }
    console.error("Get ticket error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCarEntries = async (request: Request, response: Response) => {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const result = await getAllCarEntriesService(page, limit);
    response.status(200).json(result);
  } catch (error: any) {
    console.error("Get all entries error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getCarEntryById = async (request: Request, response: Response) => {
  try {
    const id = parseInt(request.params.id);
    if (isNaN(id)) {
      response.status(400).json({ message: "Invalid entry ID" });
      return;
    }

    const entry = await getCarEntryByIdService(id);
    response.status(200).json(entry);
  } catch (error: any) {
    if (error.message === "Car entry not found") {
      response.status(404).json({ message: error.message });
      return;
    }
    console.error("Get entry error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getActiveEntries = async (request: Request, response: Response) => {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;
    const result = await getActiveEntriesService(page, limit);
    response.status(200).json(result);
  } catch (error: any) {
    console.error("Get active entries error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};
