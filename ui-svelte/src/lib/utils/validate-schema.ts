import type { ValidationRules } from '$lib/hooks/use-form.svelte.js';

const REGEX_CACHE = {
	email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
	phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
	alphanumeric: /^[a-zA-Z0-9]+$/,
	numeric: /^[0-9]+$/,
	alpha: /^[a-zA-Z]+$/,
	creditCard:
		/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
	date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
} as const;

const isStrongPassword = (password: string): boolean => {
	return (
		password.length >= 8 &&
		/[a-z]/.test(password) &&
		/[A-Z]/.test(password) &&
		/[0-9]/.test(password) &&
		/[^a-zA-Z0-9]/.test(password)
	);
};

const countWords = (text: string): number => {
	return text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
};

const extractNumber = (rule: string): number => {
	const match = rule.match(/:(\d+)$/);
	return match ? parseInt(match[1]!, 10) : 0;
};

const extractValue = (rule: string): string => {
	const colonIndex = rule.indexOf(':');
	return colonIndex !== -1 ? rule.slice(colonIndex + 1) : '';
};

export const validateSchema = (
	body: Record<string, any>,
	rules: ValidationRules
): Record<string, string> => {
	const errors: Record<string, string> = {};

	for (const [field, fieldRules] of Object.entries(rules)) {
		const value = body[field];
		const strValue = value?.toString() ?? '';

		for (const { rule, message } of fieldRules) {
			let isInvalid = false;

			if (rule === 'required') {
				isInvalid = !value || strValue.trim() === '';
			} else if (rule === 'email' && value) {
				isInvalid = !REGEX_CACHE.email.test(strValue);
			} else if (rule.startsWith('min:') && value) {
				isInvalid = strValue.length < extractNumber(rule);
			} else if (rule.startsWith('max:') && value) {
				isInvalid = strValue.length > extractNumber(rule);
			} else if (rule === 'url' && value) {
				isInvalid = !REGEX_CACHE.url.test(strValue);
			} else if (rule === 'phone' && value) {
				isInvalid = !REGEX_CACHE.phone.test(strValue);
			} else if (rule.startsWith('pattern:') && value) {
				const pattern = extractValue(rule);
				isInvalid = !new RegExp(pattern).test(strValue);
			} else if (rule === 'alphanumeric' && value) {
				isInvalid = !REGEX_CACHE.alphanumeric.test(strValue);
			} else if (rule === 'numeric' && value) {
				isInvalid = !REGEX_CACHE.numeric.test(strValue);
			} else if (rule === 'alpha' && value) {
				isInvalid = !REGEX_CACHE.alpha.test(strValue);
			} else if (rule.startsWith('matches:') && value) {
				const matchField = extractValue(rule);
				isInvalid = strValue !== body[matchField]?.toString();
			} else if (rule === 'strongPassword' && value) {
				isInvalid = !isStrongPassword(strValue);
			} else if (rule === 'creditCard' && value) {
				const cleaned = strValue.replace(/\s/g, '');
				isInvalid = !REGEX_CACHE.creditCard.test(cleaned);
			} else if (rule === 'date' && value) {
				isInvalid = !REGEX_CACHE.date.test(strValue) || isNaN(Date.parse(strValue));
			} else if (rule.startsWith('minWords:') && value) {
				isInvalid = countWords(strValue) < extractNumber(rule);
			} else if (rule.startsWith('maxWords:') && value) {
				isInvalid = countWords(strValue) > extractNumber(rule);
			}

			if (isInvalid) {
				errors[field] = message;
				break;
			}
		}
	}

	return errors;
};
