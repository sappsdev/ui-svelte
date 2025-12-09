import { browser } from '$app/environment';

let config = {
	defaultLanguage: 'en',
	availableLanguages: ['en']
};

let currentLanguage = $state<string>(config.defaultLanguage);
let translations = $state({});
let isLoading = $state<boolean>(false);
let isInitialized = $state(false);

export const initLanguage = async (options = {}) => {
	config = {
		defaultLanguage: 'en',
		availableLanguages: ['en', 'es', 'fr'],
		...options
	};

	if (isInitialized) {
		return;
	}

	let targetLanguage = config.defaultLanguage;

	if (browser) {
		const storedLang = localStorage.getItem('language');

		if (storedLang && config.availableLanguages.includes(storedLang)) {
			targetLanguage = storedLang;
		} else {
			const browserLang = navigator.language.split('-')[0];

			if (config.availableLanguages.includes(browserLang)) {
				targetLanguage = browserLang;
			}
		}
	}

	await setLanguage(targetLanguage);
	isInitialized = true;
};

export const setLanguage = async (lang: string) => {
	if (!config.availableLanguages.includes(lang)) {
		console.warn(`Idioma '${lang}' no disponible. Usando: ${config.defaultLanguage}`);
		lang = config.defaultLanguage;
	}

	if (currentLanguage === lang && Object.keys(translations).length > 0) {
		return;
	}

	isLoading = true;

	try {
		const module = await import(`$lib/locales/${lang}.ts`);
		translations = module.default;
		currentLanguage = lang;

		if (browser) {
			localStorage.setItem('language', lang);
			document.documentElement.lang = lang;
		}
	} catch (error) {
		console.error(`Error cargando idioma '${lang}':`, error);

		if (lang !== config.defaultLanguage) {
			await setLanguage(config.defaultLanguage);
			return;
		}
	} finally {
		isLoading = false;
	}
};

export const t = (key: string, params: Record<string, any> = {}): string => {
	if (!translations || Object.keys(translations).length === 0) {
		return '';
	}

	const translation = getNestedTranslation(translations, key);

	if (!translation) {
		return key;
	}
	return interpolate(translation, params);
};

export const plural = (key: string, count: number, params: Record<string, any> = {}): string => {
	const pluralKey = count === 1 ? `${key}.singular` : `${key}.plural`;
	return t(pluralKey, { ...params, count });
};

export const formatDate = (
	date: Date | string | number,
	options: Intl.DateTimeFormatOptions = {}
) => {
	return new Intl.DateTimeFormat(currentLanguage, options).format(new Date(date));
};

export const formatNumber = (number: number, options: Intl.NumberFormatOptions = {}) => {
	return new Intl.NumberFormat(currentLanguage, options).format(number);
};

export const formatCurrency = (
	amount: number,
	currency = 'USD',
	options: Intl.NumberFormatOptions = {}
) => {
	return new Intl.NumberFormat(currentLanguage, {
		style: 'currency',
		currency,
		...options
	}).format(amount);
};

export const getWeekdays = (format: 'short' | 'long' | 'narrow' = 'short') => {
	const weekdays = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(2024, 0, i);
		const weekday = new Intl.DateTimeFormat(currentLanguage, {
			weekday: format
		}).format(date);
		weekdays.push(weekday);
	}
	return weekdays;
};

export const i18n = () => {
	return {
		get language() {
			return currentLanguage;
		},
		get translations() {
			return translations;
		},
		get isLoading() {
			return isLoading;
		},
		get availableLanguages() {
			return config.availableLanguages;
		},
		setLanguage,
		t
	};
};

const getNestedTranslation = (obj: any, key: string): string | undefined => {
	const keys = key.split('.');
	let current = obj;

	for (const k of keys) {
		if (current && typeof current === 'object') {
			current = current[k];
		} else {
			return undefined;
		}
	}

	return typeof current === 'string' ? current : undefined;
};

const interpolate = (text: string, params: Record<string, any>): string => {
	return text.replace(/\{\{(\w+)\}\}/g, (match, param) => {
		return params[param] !== undefined ? params[param] : match;
	});
};
