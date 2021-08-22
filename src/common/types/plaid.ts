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

export type PlaidGetItemResponse = {
	item: {
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

export type PlaidInstitutionByIdResponse = {
	institution: {
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
	request_id: string;
};
