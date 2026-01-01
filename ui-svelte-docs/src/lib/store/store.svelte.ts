type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type ThemeTransition = 'circle' | 'slide' | 'fade' | 'vertical' | 'none';
type PageTransition = 'fade' | 'slide' | 'scale' | 'none';

let toastPositionValue = $state<ToastPosition>('bottom-left');
let toastIconValue = $state(false);
let toastVariantValue = $state<'soft' | 'solid'>('soft');
let themeTransitionValue = $state<ThemeTransition>('circle');
let pageTransitionValue = $state<PageTransition>('fade');

let mainElement = $state<HTMLDivElement>();

let themeColors = $state({
	onDark: 'oklch(97% 0.01 90)',
	onLight: 'oklch(25% 0.01 30)',
	primary: 'oklch(75% 0.15 145)',
	softPrimary: 'oklch(95% 0.05 145)',
	secondary: 'oklch(28.42% 0.0467 259.99)',
	softSecondary: 'oklch(92% 0.005 30)',
	muted: 'oklch(87.2% 0.01 258.338)',
	softMuted: 'oklch(94% 0.005 258.338)',
	background: 'oklch(96% 0.005 85)',
	surface: 'oklch(98% 0.003 85)',
	success: 'oklch(62.7% 0.194 149.214)',
	softSuccess: 'oklch(95% 0.06 149.214)',
	info: 'oklch(58.8% 0.158 241.966)',
	softInfo: 'oklch(95% 0.05 241.966)',
	warning: 'oklch(68.1% 0.162 75.834)',
	softWarning: 'oklch(96% 0.05 75.834)',
	danger: 'oklch(57.7% 0.245 27.325)',
	softDanger: 'oklch(95% 0.07 27.325)'
});

let darkThemeColors = $state({
	secondary: 'oklch(97% 0.01 90)',
	softSecondary: 'oklch(28% 0.015 259.99)',
	muted: 'oklch(37.3% 0.034 259.733)',
	softMuted: 'oklch(28% 0.02 259.733)',
	background: 'oklch(13% 0.028 261.692)',
	surface: 'oklch(21% 0.034 264.665)'
});

export const storeApp = {
	get mainElement() {
		return mainElement as HTMLDivElement;
	},
	set mainElement(value: HTMLDivElement) {
		mainElement = value;
	},
	get toastPosition() {
		return toastPositionValue;
	},
	set toastPosition(value: ToastPosition) {
		toastPositionValue = value;
	},
	get toastIcon() {
		return toastIconValue;
	},
	set toastIcon(value: boolean) {
		toastIconValue = value;
	},
	get toastVariant() {
		return toastVariantValue;
	},
	set toastVariant(value: 'soft' | 'solid') {
		toastVariantValue = value;
	},
	get themeTransition() {
		return themeTransitionValue;
	},
	set themeTransition(value: ThemeTransition) {
		themeTransitionValue = value;
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme-transition', value);
		}
	},
	get pageTransition() {
		return pageTransitionValue;
	},
	set pageTransition(value: PageTransition) {
		pageTransitionValue = value;
	},
	get themeColors() {
		return themeColors;
	},
	setThemeColor(colorName: keyof typeof themeColors, value: string) {
		themeColors[colorName] = value;
	},
	get darkThemeColors() {
		return darkThemeColors;
	},
	setDarkThemeColor(colorName: keyof typeof darkThemeColors, value: string) {
		darkThemeColors[colorName] = value;
	}
};
