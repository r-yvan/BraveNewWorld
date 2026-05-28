import prisma from "../config/database";

export const getOutgoingCarsReportService = async (startDate: string, endDate: string, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const [entries, total] = await Promise.all([
    prisma.carEntry.findMany({
      where: {
        exitDateTime: {
          gte: start,
          lte: end,
        },
      },
      skip,
      take: limit,
      orderBy: { exitDateTime: "desc" },
    }),
    prisma.carEntry.count({
      where: {
        exitDateTime: {
          gte: start,
          lte: end,
        },
      },
    }),
  ]);

  const totalAmount = await prisma.carEntry.aggregate({
    where: {
      exitDateTime: {
        gte: start,
        lte: end,
      },
    },
    _sum: {
      chargedAmount: true,
    },
  });

  return {
    data: entries,
    summary: {
      totalCarsExited: total,
      totalAmountCharged: totalAmount._sum.chargedAmount || 0,
    },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getEnteredCarsReportService = async (startDate: string, endDate: string, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  const start = new Date(startDate);
  const end = new Date(endDate);

  const [entries, total] = await Promise.all([
    prisma.carEntry.findMany({
      where: {
        entryDateTime: {
          gte: start,
          lte: end,
        },
      },
      skip,
      take: limit,
      orderBy: { entryDateTime: "desc" },
    }),
    prisma.carEntry.count({
      where: {
        entryDateTime: {
          gte: start,
          lte: end,
        },
      },
    }),
  ]);

  return {
    data: entries,
    summary: {
      totalCarsEntered: total,
    },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
