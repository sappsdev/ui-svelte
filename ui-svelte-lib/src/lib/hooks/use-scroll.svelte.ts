export const useScroll = () => {
	let scrollY = $state<number>(0);
	let scrollX = $state<number>(0);
	let isScrolled = $state<boolean>(false);
	let threshold = $state<number>(100);

	const updateScrollPosition = () => {
		scrollY = window.scrollY;
		scrollX = window.scrollX;
		isScrolled = scrollY > threshold;
	};

	const setThreshold = (value: number) => {
		threshold = value;
		isScrolled = scrollY > threshold;
	};

	$effect(() => {
		updateScrollPosition();

		window.addEventListener('scroll', updateScrollPosition);

		return () => {
			window.removeEventListener('scroll', updateScrollPosition);
		};
	});

	return {
		get scrollY() {
			return scrollY;
		},
		get scrollX() {
			return scrollX;
		},
		get isScrolled() {
			return isScrolled;
		},
		setThreshold
	};
};
