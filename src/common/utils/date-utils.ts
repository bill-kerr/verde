import { format } from 'date-fns';

export function formatDate(date: Date, formatString = 'yyyy-MM-dd'): string {
	return format(date, formatString);
}
