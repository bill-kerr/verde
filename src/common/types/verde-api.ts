import type { Transaction, UserAccount } from '@prisma/client';

export type VerdeGetTransactionsResponse = Transaction[];

export type VerdeGetAccountBalanceResponse = { accountId: UserAccount['id']; currentBalance: number };
