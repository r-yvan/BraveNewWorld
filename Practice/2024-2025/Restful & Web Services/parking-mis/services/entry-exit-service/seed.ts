import prisma from './src/config/database';

async function main() {
  console.log("Seeding car entries...");
  
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
  const oneHourAgo = new Date(Date.now() - 1 * 60 * 60 * 1000);
  const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);

  await prisma.carEntry.create({
    data: {
      plateNumber: 'RAB 123 A',
      parkingCode: 'P-001',
      entryDateTime: twoHoursAgo,
      ticketNumber: 'TKT-001',
    },
  });

  await prisma.carEntry.create({
    data: {
      plateNumber: 'RAB 456 B',
      parkingCode: 'P-001',
      entryDateTime: oneHourAgo,
      ticketNumber: 'TKT-002',
    },
  });

  await prisma.carEntry.create({
    data: {
      plateNumber: 'RAB 789 C',
      parkingCode: 'P-002',
      entryDateTime: fourHoursAgo,
      exitDateTime: oneHourAgo,
      chargedAmount: 900,
      ticketNumber: 'TKT-003',
    },
  });

  console.log("Car entries seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
