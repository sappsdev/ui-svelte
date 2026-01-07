type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536
};

export const useBreakpoint = (breakpoint: Breakpoint) => {
	let isBelow = $state<boolean>(false);
	let isAbove = $state<boolean>(false);
	let currentWidth = $state<number>(0);

	const updateBreakpoint = () => {
		currentWidth = window.innerWidth;
		const breakpointValue = breakpoints[breakpoint];
		isBelow = currentWidth < breakpointValue;
		isAbove = currentWidth >= breakpointValue;
	};

	$effect(() => {
		updateBreakpoint();

		window.addEventListener('resize', updateBreakpoint);

		return () => {
			window.removeEventListener('resize', updateBreakpoint);
		};
	});

	return {
		get isBelow() {
			return isBelow;
		},
		get isAbove() {
			return isAbove;
		},
		get width() {
			return currentWidth;
		},
		get breakpointValue() {
			return breakpoints[breakpoint];
		}
	};
};
