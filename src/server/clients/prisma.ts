import { PrismaClient } from '@prisma/client';

declare global {
	// eslint-disable-next-line no-var
	var _prisma: PrismaClient;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global._prisma) {
		global._prisma = new PrismaClient();
	}

	prisma = global._prisma;
}

export { prisma };
