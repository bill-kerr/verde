import { browser } from '$app/env';
import { Focus, focusElement, focusIn, FocusResult } from '$lib/client/utils/focus';
import { Keys } from '$lib/client/utils/keyboard';

export type FocusTrapOptions = {
	restoreFocus: boolean;
	initialFocus?: HTMLElement;
};

const defaultOptions: FocusTrapOptions = {
	restoreFocus: true,
};

export function focusTrap(container: HTMLElement, options: Partial<FocusTrapOptions> = {}) {
	const { restoreFocus, initialFocus } = { ...defaultOptions, ...options };

	const restoreElement = browser ? (document.activeElement as HTMLElement) : null;
	let previousActiveElement: HTMLElement | null = null;

	// TODO: make initialFocus work
	if (focusIn(container, Focus.First) === FocusResult.Error) {
		console.warn('There is no focusable element inside the focus trap.');
	}

	const onKeydown = (event: KeyboardEvent) => {
		if (event.key !== Keys.Tab) return;
		event.preventDefault();
		if (focusIn(container, event.shiftKey ? Focus.Previous : Focus.Next) === FocusResult.Success) {
			previousActiveElement = document.activeElement as HTMLElement;
		}
	};
	window.addEventListener('keydown', onKeydown, true);

	return {
		destroy() {
			if (restoreFocus) {
				focusElement(restoreElement);
			}
			window.removeEventListener('keydown', onKeydown, true);
		},
	};
}
