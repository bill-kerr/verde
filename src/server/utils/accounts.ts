import type { PlaidAccountType } from '$lib/common/types/plaid';
import type { UserAccountType } from '@prisma/client';

export function plaidAccountTypeToUserAccountType(plaidType: PlaidAccountType): UserAccountType {
	const map: Record<PlaidAccountType, UserAccountType> = {
		brokerage: 'Brokerage',
		credit: 'Credit',
		depository: 'Depository',
		investment: 'Investment',
		loan: 'Loan',
		other: 'Other',
	};
	return map[plaidType];
}
