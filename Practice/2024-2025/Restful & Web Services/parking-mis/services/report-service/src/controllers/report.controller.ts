import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getOutgoingCarsReportService, getEnteredCarsReportService } from "../services/report.service";

export const getOutgoingCarsReport = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({ errors: errors.array() });
      return;
    }

    const { startDate, endDate } = request.query as { startDate: string; endDate: string };
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const report = await getOutgoingCarsReportService(startDate, endDate, page, limit);
    response.status(200).json(report);
  } catch (error: any) {
    console.error("Outgoing cars report error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getEnteredCarsReport = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(400).json({ errors: errors.array() });
      return;
    }

    const { startDate, endDate } = request.query as { startDate: string; endDate: string };
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 10;

    const report = await getEnteredCarsReportService(startDate, endDate, page, limit);
    response.status(200).json(report);
  } catch (error: any) {
    console.error("Entered cars report error:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};
