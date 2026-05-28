import prisma from "../config/database";

export interface CreateParkingDto {
  code: string;
  name: string;
  totalSpaces: number;
  location: string;
  chargingFeePerHour: number;
}

export interface UpdateParkingDto {
  name?: string;
  totalSpaces?: number;
  availableSpaces?: number;
  location?: string;
  chargingFeePerHour?: number;
}

export const createParkingService = async (data: CreateParkingDto) => {
  const existing = await prisma.parking.findUnique({
    where: { code: data.code },
  });

  if (existing) throw new Error("Parking with this code already exists");

  const parking = await prisma.parking.create({
    data: {
      ...data,
      availableSpaces: data.totalSpaces,
      totalSpaces: data.totalSpaces,
      chargingFeePerHour: data.chargingFeePerHour,
    },
  });

  return parking;
};

export const getAllParkingsService = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const [parkings, total] = await Promise.all([
    prisma.parking.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.parking.count(),
  ]);

  return {
    data: parkings,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getParkingByIdService = async (id: number) => {
  const parking = await prisma.parking.findUnique({ where: { id } });
  if (!parking) throw new Error("Parking not found");
  return parking;
};

export const getParkingByCodeService = async (code: string) => {
  const parking = await prisma.parking.findUnique({ where: { code } });
  if (!parking) throw new Error("Parking not found");
  return parking;
};

export const updateParkingService = async (id: number, data: UpdateParkingDto) => {
  const parking = await prisma.parking.findUnique({ where: { id } });
  if (!parking) throw new Error("Parking not found");

  if (data.totalSpaces !== undefined) {
    const usedSpaces = parking.totalSpaces - parking.availableSpaces;
    if (data.totalSpaces < usedSpaces) {
      throw new Error("Cannot reduce total spaces below currently occupied spaces");
    }
    data.availableSpaces = data.totalSpaces - usedSpaces;
  }

  const updated = await prisma.parking.update({
    where: { id },
    data,
  });

  return updated;
};

export const deleteParkingService = async (id: number) => {
  const parking = await prisma.parking.findUnique({ where: { id } });
  if (!parking) throw new Error("Parking not found");

  await prisma.parking.delete({ where: { id } });
  return { message: "Parking deleted successfully" };
};
