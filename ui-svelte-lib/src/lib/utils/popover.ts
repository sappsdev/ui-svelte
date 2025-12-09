export const popover = (node: HTMLElement): { destroy: () => void } => {
	const targetEl = document.body;
	const hadScroll = document.documentElement.scrollHeight > window.innerHeight;
	node.id = 'popover';
	targetEl?.appendChild(node);
	if (hadScroll) {
		targetEl.classList.add('had-scroll');
	}
	return {
		destroy() {
			if (hadScroll) {
				targetEl.classList.remove('had-scroll');
			}
			node.remove();
		}
	};
};
