import prisma from './src/config/database';

async function main() {
  console.log("Seeding parkings...");
  
  await prisma.parking.upsert({
    where: { code: 'P-001' },
    update: {},
    create: {
      code: 'P-001',
      name: 'Kigali City Tower Parking',
      availableSpaces: 80,
      totalSpaces: 100,
      location: 'Kigali Downtown',
      chargingFeePerHour: 500,
    },
  });

  await prisma.parking.upsert({
    where: { code: 'P-002' },
    update: {},
    create: {
      code: 'P-002',
      name: 'CHUK Main Parking',
      availableSpaces: 15,
      totalSpaces: 50,
      location: 'Kigali City Center',
      chargingFeePerHour: 300,
    },
  });

  console.log("Parkings seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
