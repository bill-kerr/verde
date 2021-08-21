/**
 * Formats the provided amount of currency into a currency string for
 * display. Make sure to only pass amounts as cents in, as it will do
 * the conversion for you.
 * @param amount Amount of currency you'd like formatted (in cents).
 * @returns Formatted currency string.
 */
export function formatCurrency(
	amount: number,
	options: Partial<{ withSign: 'plus' | 'minus' | 'none' | 'both' }>,
): string {
	const opts = { withSign: 'none', ...options };
	const formatter = Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});
	const plus = (opts.withSign === 'plus' || opts.withSign === 'both') && amount > 0 ? '+' : null;
	const minus = (opts.withSign === 'minus' || opts.withSign === 'both') && amount < 0 ? '-' : null;
	const sign = plus ? plus : minus ? minus : '';
	return `${sign}${formatter.format(amount / 100)}`;
}
