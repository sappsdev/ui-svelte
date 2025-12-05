type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

let toastPositionValue = $state<ToastPosition>('bottom-left');
let toastIconValue = $state(false);
let toastSolidValue = $state(true);

let themeColors = $state({
	primary: 'oklch(54.6% 0.245 262.881)',
	onPrimary: 'oklch(93.2% 0.032 255.585)',
	secondary: 'oklch(60% 0.118 184.704)',
	onSecondary: 'oklch(95.3% 0.051 180.801)',
	muted: 'oklch(87.2% 0.01 258.338)',
	onMuted: 'oklch(37.2% 0.044 257.287)',
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

export const storeApp = {
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
	get toastSolid() {
		return toastSolidValue;
	},
	set toastSolid(value: boolean) {
		toastSolidValue = value;
	},
	get themeColors() {
		return themeColors;
	},
	setThemeColor(colorName: keyof typeof themeColors, value: string) {
		themeColors[colorName] = value;
	}
};
