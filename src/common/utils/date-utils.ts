import { format, parse } from 'date-fns';

export function formatDate(date: Date, formatString = 'yyyy-MM-dd'): string {
	return format(date, formatString);
}

export function parseDateString(dateString: string, formatString = 'yyyy-MM-dd'): Date {
	return parse(dateString, formatString, new Date());
}
