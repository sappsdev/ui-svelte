export const cn = (...classes: (string | boolean | undefined)[]) => {
	return classes.filter(Boolean).join(' ');
};
