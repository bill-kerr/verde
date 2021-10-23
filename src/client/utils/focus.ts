/**
 * This file is more or less a copy+paste of HeadlessUI's implementation
 * of focus management. Credit goes here:
 *
 * https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/utils/focus-management.ts
 */

const focusableSelector = [
	'[contentEditable=true]',
	'[tabindex]',
	'a[href]',
	'area[href]',
	'button:not([disabled])',
	'iframe',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
]
	.map((selector) => `${selector}:not([tabindex='-1'])`)
	.join(',');

export enum Focus {
	First,
	Previous,
	Next,
	Last,
}

export enum FocusResult {
	Error,
	Overflow,
	Success,
	Underflow,
}

enum Direction {
	Previous = -1,
	Next = 1,
}

type FocusOptions = {
	wrapAround: boolean;
	noScroll: boolean;
};

const defaultOptions: FocusOptions = {
	wrapAround: true,
	noScroll: false,
};

export function getFocusableElements(container: HTMLElement | null = document.body) {
	if (!container) {
		return [];
	}
	return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));
}

export function focusElement(element: HTMLElement | null) {
	element?.focus({ preventScroll: true });
}

export function focusIn(container: HTMLElement | HTMLElement[], focus: Focus, options: Partial<FocusOptions> = {}) {
	const { wrapAround, noScroll } = { ...defaultOptions, ...options };

	const elements = Array.isArray(container) ? container : getFocusableElements(container);
	const active = document.activeElement as HTMLElement;

	const direction = focus === Focus.First || Focus.Next ? Direction.Next : Direction.Previous;

	const startIndex = getStartIndex(focus, elements, active);

	const focusOptions = noScroll ? { preventScroll: true } : {};

	let offset = 0;
	let next: HTMLElement | undefined = undefined;
	const total = elements.length;
	do {
		if (offset >= total || offset + total <= 0) return FocusResult.Error;

		let nextIdx = startIndex + offset;

		if (wrapAround) {
			nextIdx = (nextIdx + total) % total;
		} else {
			if (nextIdx < 0) return FocusResult.Underflow;
			if (nextIdx >= total) return FocusResult.Overflow;
		}

		next = elements[nextIdx];
		next?.focus(focusOptions);

		offset += direction;
	} while (next !== document.activeElement);

	if (!next.hasAttribute('tabindex')) next.setAttribute('tabindex', '0');

	return FocusResult.Success;
}

function getStartIndex(focus: Focus, elements: HTMLElement[], active: HTMLElement) {
	if (focus === Focus.First) {
		return 0;
	}

	if (focus === Focus.Previous) {
		return Math.max(0, elements.indexOf(active)) - 1;
	}

	if (focus === Focus.Next) {
		return Math.max(0, elements.indexOf(active)) + 1;
	}

	if (focus === Focus.Last) {
		return elements.length - 1;
	}

	throw new Error('focus was ill-defined');
}
