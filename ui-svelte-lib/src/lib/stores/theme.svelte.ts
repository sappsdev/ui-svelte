const THEME_STORAGE_KEY = 'theme-preference';
const DARK_CLASS = 'dark';

let themeState = $state<'light' | 'dark'>('light');
let isDark = $state<boolean>(false);

const getInitialTheme = (): 'light' | 'dark' => {
	if (typeof window === 'undefined') {
		return 'light';
	}

	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
	if (storedTheme === 'dark' || storedTheme === 'light') {
		return storedTheme as 'light' | 'dark';
	}

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}

	return 'light';
};

const initializeTheme = () => {
	const initialTheme = getInitialTheme();
	themeState = initialTheme;
	isDark = initialTheme === 'dark';

	if (typeof window !== 'undefined') {
		const htmlElement = document.documentElement;
		if (isDark) {
			htmlElement.classList.add(DARK_CLASS);
		} else {
			htmlElement.classList.remove(DARK_CLASS);
		}
	}
};

initializeTheme();

const toggleTheme = () => {
	themeState = themeState === 'light' ? 'dark' : 'light';
	isDark = themeState === 'dark';

	const htmlElement = document.documentElement;
	if (isDark) {
		htmlElement.classList.add(DARK_CLASS);
	} else {
		htmlElement.classList.remove(DARK_CLASS);
	}

	if (typeof window !== 'undefined') {
		localStorage.setItem(THEME_STORAGE_KEY, themeState);
	}
};

export const theme = {
	get state() {
		return themeState;
	},

	get isDark() {
		return isDark;
	},
	toggleTheme
};
