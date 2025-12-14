export const popover = (node: HTMLElement): { destroy: () => void } => {
	const targetEl = document.body;
	node.id = 'popover';
	targetEl?.appendChild(node);

	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	if (scrollbarWidth > 0) {
		document.body.style.paddingRight = `${scrollbarWidth}px`;
	}
	document.body.style.overflow = 'hidden';

	return {
		destroy() {
			node.remove();
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
		}
	};
};
