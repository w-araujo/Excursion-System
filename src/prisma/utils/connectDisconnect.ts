import { prisma } from "./client";

const connectPrisma = async () => {
  await prisma.$connect();
};

const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

export { connectPrisma, disconnectPrisma };
