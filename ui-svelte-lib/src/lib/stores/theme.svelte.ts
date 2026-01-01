const THEME_STORAGE_KEY = 'theme-preference';
const DARK_CLASS = 'dark';

let themeState = $state<'light' | 'dark'>('light');
let isDark = $state<boolean>(false);

const getInitialTheme = (): 'light' | 'dark' => {
	if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
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
	if (typeof document === 'undefined') {
		return;
	}
	
	const initialTheme = getInitialTheme();
	themeState = initialTheme;
	isDark = initialTheme === 'dark';

	const htmlElement = document.documentElement;
	if (isDark) {
		htmlElement.classList.add(DARK_CLASS);
	} else {
		htmlElement.classList.remove(DARK_CLASS);
	}
};

if (typeof document !== 'undefined') {
	initializeTheme();
}

const switchTheme = () => {
	if (typeof document === 'undefined') return;
	
	themeState = themeState === 'light' ? 'dark' : 'light';
	isDark = themeState === 'dark';

	const htmlElement = document.documentElement;
	if (isDark) {
		htmlElement.classList.add(DARK_CLASS);
	} else {
		htmlElement.classList.remove(DARK_CLASS);
	}

	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(THEME_STORAGE_KEY, themeState);
	}
};

const toggleTheme = () => {
	if (typeof document === 'undefined') return;
	
	if (!document.startViewTransition) {
		switchTheme();
	} else {
		document.documentElement.classList.add('theme-transitioning');
		
		const transition = document.startViewTransition(() => {
			themeState = themeState === 'light' ? 'dark' : 'light';
			isDark = themeState === 'dark';

			const htmlElement = document.documentElement;
			if (isDark) {
				htmlElement.classList.add(DARK_CLASS);
			} else {
				htmlElement.classList.remove(DARK_CLASS);
			}

			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(THEME_STORAGE_KEY, themeState);
			}
		});
		
		transition.finished.finally(() => {
			document.documentElement.classList.remove('theme-transitioning');
		});
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