type ClickOutsideState = {
	isPointerDown: boolean;
};

type ClickOutsideParams = {
	onClickOutside: (e: Event) => void;
	rootElement?: HTMLElement;
};

const isValidEvent = (event: Event | MouseEvent, node: HTMLElement, rootElement: HTMLElement | Document = document) => {
	if (('button' in event && event.button > 0) || event.defaultPrevented) return false;

	const target = event.target as HTMLElement | null;

	// If the target is no longer in the root element
	if (target && !rootElement.contains(target)) return false;

	return !node.contains(target);
};

export const clickOutside = (node: HTMLElement, params: ClickOutsideParams) => {
	const state: ClickOutsideState = {
		isPointerDown: false,
	};

	const onPointerDown = (e: Event) => {
		if (isValidEvent(e, node)) {
			state.isPointerDown = true;
		}
	};

	const onPointerUp = (e: Event) => {
		if (state.isPointerDown && isValidEvent(e, node)) {
			state.isPointerDown = false;
			params.onClickOutside(e);
		}
	};

	document.addEventListener('mousedown', onPointerDown, true);
	document.addEventListener('mouseup', onPointerUp, true);
	document.addEventListener('touchstart', onPointerDown, true);
	document.addEventListener('touchend', onPointerUp, true);

	return {
		update(newParams: ClickOutsideParams) {
			params = newParams;
		},
		destroy() {
			document.removeEventListener('mousedown', onPointerDown, true);
			document.removeEventListener('mouseup', onPointerUp, true);
			document.removeEventListener('touchstart', onPointerDown, true);
			document.removeEventListener('touchend', onPointerUp, true);
		},
	};
};
