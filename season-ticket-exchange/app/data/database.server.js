import { PrismaClient } from "@prisma/client";

/**
 * @type PrismaClient
 */
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  // development mode and does not create new db connections on hot reload of app
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma };

// .server in the file name right before extension tells remix to only run this on server (backend code bundle)
