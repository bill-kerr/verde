/**
 * Formats the provided amount of currency into a currency string for
 * display. Make sure to only pass amounts as cents in, as it will do
 * the conversion for you.
 * @param amount Amount of currency you'd like formatted (in cents).
 * @returns Formatted currency string.
 */
export function formatCurrency(amount: number): string {
	const formatter = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	return formatter.format(amount / 100);
}
