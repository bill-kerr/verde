import type { PlaidAccountType, PlaidPaymentChannel } from '$lib/common/types/plaid';
import type { PaymentChannel, UserAccountType } from '@prisma/client';

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

export function plaidPaymentChannelToPaymentChannel(plaidPaymentChannel: PlaidPaymentChannel): PaymentChannel {
	const map: Record<PlaidPaymentChannel, PaymentChannel> = {
		'in store': 'InStore',
		online: 'Online',
		other: 'Other',
	};
	return map[plaidPaymentChannel];
}
