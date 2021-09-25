export type PlaidErrorType =
	| 'INVALID_REQUEST'
	| 'INVALID_RESULT'
	| 'INVALID_INPUT'
	| 'INSTITUTION_ERROR'
	| 'RATE_LIMIT_EXCEEDED'
	| 'API_ERROR'
	| 'ITEM_ERROR'
	| 'ASSET_REPORT_ERROR'
	| 'RECAPTCHA_ERROR'
	| 'OAUTH_ERROR'
	| 'PAYMENT_ERROR'
	| 'BANK_TRANSFER_ERROR';

export type PlaidProduct =
	| 'assets'
	| 'auth'
	| 'balance'
	| 'identity'
	| 'investments'
	| 'liabilities'
	| 'payment_initiation'
	| 'transactions'
	| 'credit_details'
	| 'income'
	| 'income_verification'
	| 'deposit_switch'
	| 'standing_orders';

export type PlaidUpdateType = 'background' | 'user_present_required';

export type PlaidCountryCode = 'US' | 'GB' | 'ES' | 'NL' | 'FR' | 'IE' | 'CA';

export type PlaidHealthStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN';

export type PlaidRefreshInterval = 'NORMAL' | 'DELAYED' | 'STOPPED';

export type PlaidIncidentStatus = 'INVESTIGATING' | 'IDENTIFIED' | 'SCHEDULED' | 'RESOLVED' | 'UNKNOWN';

export type PlaidStandingOrderInterval = 'WEEKLY' | 'MONTHLY';

export type PlaidStatusBreakdown = {
	status: PlaidHealthStatus;
	last_status_change: string;
	breakdown: PlaidPerformanceBreakdown;
};

export type PlaidPerformanceBreakdown = {
	success: number;
	error_plaid: number;
	error_institution: number;
	refresh_interval: PlaidRefreshInterval;
};

export type PlaidCreateTokenResponse = {
	expiration: string;
	link_token: string;
	request_id: string;
};

export type PlaidPublicTokenExchangeResponse = {
	access_token: string;
	item_id: string;
	request_id: string;
};

export type PlaidItemMetadata = {
	item_id: string;
	institution_id: string | null;
	webhook: string | null;
	error: {
		error_type: PlaidErrorType;
		error_code: string;
		error_message: string;
		display_message: string | null;
		request_id: string;
		causes: unknown[]; // This is not applicable to anything in our application.
		status: number | null;
		documentation_url: string;
		suggested_action: string;
	} | null;
	available_products: PlaidProduct[];
	billed_products: PlaidProduct[];
	consent_expiration_time: string | null;
	update_type: PlaidUpdateType;
};

export type PlaidGetItemResponse = {
	item: PlaidItemMetadata;
	status: {
		investments: {
			last_successful_update: string | null;
			last_failed_update: string | null;
		} | null;
		transactions: {
			last_successful_update: string | null;
			last_failed_update: string | null;
		} | null;
		last_webhook: {
			sent_at: string | null;
			code_sent: string | null;
		} | null;
	} | null;
	request_id: string;
};

export type PlaidInstitution = {
	institution_id: string;
	name: string;
	products: PlaidProduct[];
	country_codes: PlaidCountryCode[];
	url: string | null;
	primary_color: string | null;
	logo: string | null;
	routing_numbers: string[] | null;
	oauth: boolean;
	status: {
		item_logins: PlaidStatusBreakdown;
		transactions_updates: PlaidStatusBreakdown;
		auth: PlaidStatusBreakdown;
		balance: PlaidStatusBreakdown;
		identity: PlaidStatusBreakdown;
		investment_updates: PlaidStatusBreakdown;
		liabilities_updates: PlaidStatusBreakdown;
		liabilities: PlaidStatusBreakdown;
		investments: PlaidStatusBreakdown;
		health_incidents:
			| {
					start_date: string;
					end_date: string;
					title: string;
					incident_updates: {
						description: string;
						status: PlaidIncidentStatus;
						updated_date: string;
					}[];
			  }[]
			| null;
	};
	payment_initiation_metadata: {
		supports_international_payments: boolean;
		maximum_payment_amount: Record<string, string>;
		supports_refund_details: boolean;
		standing_order_metadata: {
			supports_standing_order_end_date: boolean;
			supports_standing_order_negative_execution_days: boolean;
			valid_standing_order_intervals: PlaidStandingOrderInterval[];
		} | null;
	} | null;
};

export type PlaidInstitutionByIdResponse = {
	institution: PlaidInstitution;
	request_id: string;
};

export type PlaidGetInstitutionsResponse = {
	institutions: PlaidInstitution[];
	total: number;
	request_id: string;
};

export type PlaidBalances = {
	available: number | null;
	current: number | null;
	limit: number | null;
	iso_currency_code: string | null;
	unofficial_currency_code: string | null;
	last_updated_datetime: string | null;
};

export type PlaidAccountType = 'investment' | 'credit' | 'depository' | 'loan' | 'brokerage' | 'other';

export type PlaidAccountVerificationStatus =
	| 'automatically_verified'
	| 'pending_automatic_verification'
	| 'pending_manual_verification'
	| 'manually_verified'
	| 'verification_expired'
	| 'verification_failed';

export type PlaidAccount = {
	account_id: string;
	balances: PlaidBalances;
	mask: string | null;
	name: string;
	official_name: string;
	type: PlaidAccountType;
	subtype: string | null;
	verification_status: PlaidAccountVerificationStatus;
};

export type PlaidGetTransactionsPayload = {
	access_token: string;
	start_date: string;
	end_date: string;
	options?: {
		account_ids?: string[];
		count?: number;
		offset?: number;
		include_original_description?: boolean;
	};
};

export type PlaidTransactionLocation = {
	address: string | null;
	city: string | null;
	region: string | null;
	postal_code: string | null;
	country: string | null;
	lat: number | null;
	lon: number | null;
	store_number: string | null;
};

export type PlaidPaymentMeta = {
	reference_number: string | null;
	ppd_id: string | null;
	payee: string | null;
	by_order_of: string | null;
	payer: string | null;
	payment_method: string | null;
	payment_processor: string | null;
	reason: string | null;
};

export type PlaidPaymentChannel = 'online' | 'in store' | 'other';

export type PlaidTransactionCode =
	| 'adjustment'
	| 'atm'
	| 'bank charge'
	| 'bill payment'
	| 'cash'
	| 'cashback'
	| 'cheque'
	| 'direct debit'
	| 'interest'
	| 'purchase'
	| 'standing order'
	| 'transfer';

export type PlaidTransaction = {
	/**
	 * @deprecated use the payment_channel field
	 */
	transaction_type: string;
	pending_transaction_id: string | null;
	category_id: string | null;
	category: string[] | null;
	location: PlaidTransactionLocation;
	payment_meta: PlaidPaymentMeta;
	account_owner: string | null;
	name: string;
	original_description: string | null;
	account_id: string;
	amount: number;
	iso_currency_code: string | null;
	unofficial_currency_code: string | null;
	date: string;
	pending: boolean;
	transaction_id: string;
	payment_channel: PlaidPaymentChannel;
	merchant_name: string | null;
	authorized_date: string | null;
	authorized_datetime: string | null;
	datetime: string | null;
	check_number: string | null;
	transaction_code: PlaidTransactionCode | null;
};

export type PlaidGetTransactionsResponse = {
	accounts: PlaidAccount[];
	transactions: PlaidTransaction[];
	total_transactions: number;
	item: PlaidItemMetadata;
	request_id: string;
};

export type PlaidGetAccountsResponse = {
	accounts: PlaidAccount[];
	item: PlaidItemMetadata;
	request_id: string;
};

export type PlaidGetAccountBalancesResponse = PlaidGetAccountsResponse;
