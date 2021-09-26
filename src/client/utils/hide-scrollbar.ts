import { noop } from '$lib/common/utils/noop';

type GapOffset = {
	left: number;
	top: number;
	right: number;
	gap: number;
};

function parse(value: string | null) {
	return parseInt(value || '', 10) || 0;
}

function getOffsets(): Omit<GapOffset, 'gap'> {
	const styles = window.getComputedStyle(document.body);
	const left = parse(styles.marginLeft);
	const top = parse(styles.marginTop);
	const right = parse(styles.marginRight);
	return { left, top, right };
}

function getGapWidth(): GapOffset {
	const offsets = getOffsets();

	const documentWidth = document.documentElement.clientWidth;
	const windowWidth = window.innerWidth;
	const gap = Math.max(0, windowWidth - documentWidth + offsets.right - offsets.left);

	return { ...offsets, gap };
}

function applyStyles({ left, right, top, gap }: GapOffset) {
	const prevPaddingLeft = window.document.body.style.paddingLeft;
	const prevPaddingRight = window.document.body.style.paddingRight;
	const prevPaddingTop = window.document.body.style.paddingTop;
	const prevMarginLeft = window.document.body.style.marginLeft;
	const prevMarginTop = window.document.body.style.marginTop;
	const prevMarginRight = window.document.body.style.marginRight;

	window.document.body.style.overflow = 'hidden';
	window.document.body.style.paddingLeft = `${left}px`;
	window.document.body.style.paddingRight = `${right}px`;
	window.document.body.style.paddingTop = `${top}px`;
	window.document.body.style.marginLeft = '0px';
	window.document.body.style.marginTop = '0px';
	window.document.body.style.marginRight = `${gap}px`;

	return () => {
		window.document.body.style.overflow = '';
		window.document.body.style.paddingLeft = prevPaddingLeft;
		window.document.body.style.paddingRight = prevPaddingRight;
		window.document.body.style.paddingTop = prevPaddingTop;
		window.document.body.style.marginLeft = prevMarginLeft;
		window.document.body.style.marginTop = prevMarginTop;
		window.document.body.style.marginRight = prevMarginRight;
	};
}

export function hideScrollbar(): () => void {
	if (typeof window === 'undefined') {
		return noop;
	}
	const gap = getGapWidth();
	return applyStyles(gap);
}
