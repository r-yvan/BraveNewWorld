import prisma from "../config/database";

export interface RegisterCarEntryDto {
  plateNumber: string;
  parkingCode: string;
}

export const registerCarEntryService = async (data: RegisterCarEntryDto) => {
  // Check if car is already parked (no exit yet)
  const alreadyParked = await prisma.carEntry.findFirst({
    where: {
      plateNumber: data.plateNumber,
      exitDateTime: null,
    },
  });

  if (alreadyParked) {
    throw new Error("This car is already parked and has not exited yet");
  }

  const carEntry = await prisma.carEntry.create({
    data: {
      plateNumber: data.plateNumber,
      parkingCode: data.parkingCode,
      entryDateTime: new Date(),
      exitDateTime: null,
      chargedAmount: 0,
    },
  });

  return carEntry;
};

export const registerCarExitService = async (id: number, chargingFeePerHour: number) => {
  const carEntry = await prisma.carEntry.findUnique({ where: { id } });

  if (!carEntry) throw new Error("Car entry not found");
  if (carEntry.exitDateTime) throw new Error("Car has already exited");

  const exitDateTime = new Date();
  const entryDateTime = new Date(carEntry.entryDateTime);

  // Calculate duration in hours
  const durationMs = exitDateTime.getTime() - entryDateTime.getTime();
  const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)); // Round up to nearest hour

  const chargedAmount = durationHours * chargingFeePerHour;

  const updatedEntry = await prisma.carEntry.update({
    where: { id },
    data: {
      exitDateTime,
      chargedAmount,
    },
  });

  return {
    ...updatedEntry,
    durationHours,
    chargingFeePerHour,
    bill: {
      plateNumber: updatedEntry.plateNumber,
      parkingCode: updatedEntry.parkingCode,
      entryDateTime: updatedEntry.entryDateTime,
      exitDateTime: updatedEntry.exitDateTime,
      durationHours,
      chargingFeePerHour,
      totalAmount: chargedAmount,
    },
  };
};

export const getTicketService = async (id: number) => {
  const carEntry = await prisma.carEntry.findUnique({ where: { id } });
  if (!carEntry) throw new Error("Car entry not found");

  return {
    ticketNumber: carEntry.ticketNumber,
    plateNumber: carEntry.plateNumber,
    parkingCode: carEntry.parkingCode,
    entryDateTime: carEntry.entryDateTime,
    status: carEntry.exitDateTime ? "EXITED" : "PARKED",
  };
};

export const getAllCarEntriesService = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const [entries, total] = await Promise.all([
    prisma.carEntry.findMany({
      skip,
      take: limit,
      orderBy: { entryDateTime: "desc" },
    }),
    prisma.carEntry.count(),
  ]);

  return {
    data: entries,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCarEntryByIdService = async (id: number) => {
  const entry = await prisma.carEntry.findUnique({ where: { id } });
  if (!entry) throw new Error("Car entry not found");
  return entry;
};

export const getActiveEntriesService = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const [entries, total] = await Promise.all([
    prisma.carEntry.findMany({
      where: { exitDateTime: null },
      skip,
      take: limit,
      orderBy: { entryDateTime: "desc" },
    }),
    prisma.carEntry.count({ where: { exitDateTime: null } }),
  ]);

  return {
    data: entries,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
