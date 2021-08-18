import { prisma } from '$lib/server/clients/prisma';

export async function post() {
	const result = await prisma.transactionSchedule.create({
		data: {
			amount: 100,
			description: 'this is a test',
			recurrence: 'hello this is recurrence',
			startDate: new Date(),
			userId: 'hello',
			endDate: new Date(),
		},
	});

	return {
		body: { ...result },
	};
}
