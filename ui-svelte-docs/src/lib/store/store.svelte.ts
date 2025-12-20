type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

let toastPositionValue = $state<ToastPosition>('bottom-left');
let toastIconValue = $state(false);
let toastVariantValue = $state('soft');

let mainElement = $state<HTMLDivElement>();

let themeColors = $state({
	primary: 'oklch(54.6% 0.245 262.881)',
	onPrimary: 'oklch(93.2% 0.032 255.585)',
	secondary: 'oklch(59.2% 0.249 0.584)',
	onSecondary: 'oklch(94.8% 0.028 342.258)',
	muted: 'oklch(87.2% 0.01 258.338)',
	onMuted: 'oklch(37.2% 0.044 257.287)',
	background: 'oklch(98.5% 0.002 247.839)',
	onBackground: 'oklch(21% 0.034 264.665)',
	success: 'oklch(62.7% 0.194 149.214)',
	onSuccess: 'oklch(96.2% 0.044 156.743)',
	info: 'oklch(58.8% 0.158 241.966)',
	onInfo: 'oklch(95.1% 0.026 236.824)',
	warning: 'oklch(68.1% 0.162 75.834)',
	onWarning: 'oklch(97.3% 0.071 103.193)',
	danger: 'oklch(57.7% 0.245 27.325)',
	onDanger: 'oklch(93.6% 0.032 17.717)',
	surface: 'oklch(96.7% 0.003 264.542)',
	onSurface: 'oklch(27.9% 0.041 260.031)'
});

let darkThemeColors = $state({
	muted: 'oklch(37.3% 0.034 259.733)',
	onMuted: 'oklch(87.2% 0.01 258.338)',
	background: 'oklch(13% 0.028 261.692)',
	onBackground: 'oklch(96.7% 0.003 264.542)',
	surface: 'oklch(21% 0.034 264.665)',
	onSurface: 'oklch(92.8% 0.006 264.531)'
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
