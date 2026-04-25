import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const colors = [
    { hex_code: '#FF0000', r_value: 255, g_value: 0, b_value: 0, name: 'Red' },
    { hex_code: '#00FF00', r_value: 0, g_value: 255, b_value: 0, name: 'Green' },
    { hex_code: '#0000FF', r_value: 0, g_value: 0, b_value: 255, name: 'Blue' },
    { hex_code: '#FFFF00', r_value: 255, g_value: 255, b_value: 0, name: 'Yellow' },
    { hex_code: '#FF00FF', r_value: 255, g_value: 0, b_value: 255, name: 'Magenta' },
    { hex_code: '#00FFFF', r_value: 0, g_value: 255, b_value: 255, name: 'Cyan' },
    { hex_code: '#FFFFFF', r_value: 255, g_value: 255, b_value: 255, name: 'White' },
    { hex_code: '#000000', r_value: 0, g_value: 0, b_value: 0, name: 'Black' },
    { hex_code: '#808080', r_value: 128, g_value: 128, b_value: 128, name: 'Gray' },
    { hex_code: '#FFA500', r_value: 255, g_value: 165, b_value: 0, name: 'Orange' },
    { hex_code: '#800080', r_value: 128, g_value: 0, b_value: 128, name: 'Purple' },
    { hex_code: '#A52A2A', r_value: 165, g_value: 42, b_value: 42, name: 'Brown' }
  ];

  for (const colorData of colors) {
    await prisma.color.upsert({
      where: { hex_code: colorData.hex_code },
      update: {},
      create: colorData,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });