import tippy from 'tippy.js/headless';
import type { Props as TippyProps } from 'tippy.js/headless';
import clsx from 'clsx';

export type UseTooltipProps = {
	content: string;
	class?: string;
};

export const tooltip = (el: Element, { content, class: klass }: UseTooltipProps): { destroy: () => void } => {
	const props: Partial<TippyProps> = {
		allowHTML: false,
		content,
		render: (instance) => {
			const popper = document.createElement('div');
			const box = document.createElement('div');
			const arrow = document.createElement('span');

			popper.appendChild(box);
			box.textContent = instance.props.content.toString();
			box.appendChild(arrow);

			popper.className = 'tippy-tooltip';
			box.className = clsx('relative p-1.5 bg-gray-900 text-white text-xs rounded', klass);
			arrow.className = 'tippy-arrow';

			const onUpdate = (prevProps: TippyProps, nextProps: TippyProps) => {
				if (prevProps.content !== nextProps.content) {
					box.textContent = nextProps.content.toString();
				}
			};

			return {
				popper,
				onUpdate,
			};
		},
	};

	const tippyInstance = tippy(el, props);

	return {
		destroy() {
			tippyInstance.destroy();
		},
	};
};
