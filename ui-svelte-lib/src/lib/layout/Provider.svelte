<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { Toast } from '$lib/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		toastVariant?: 'solid' | 'soft';
		toastIcon?: boolean;
		toastPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		themeTransition?: 'circle' | 'slide' | 'fade' | 'vertical' | 'none';
		pageTransition?: 'fade' | 'slide' | 'scale' | 'none';
	};

	const {
		children,
		toastVariant,
		toastPosition,
		toastIcon,
		themeTransition = 'circle',
		pageTransition = 'fade'
	}: Props = $props();

	onNavigate((navigation) => {
		if (pageTransition === 'none') return;
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.documentElement.classList.add('page-transitioning');
			document.documentElement.setAttribute('data-page-transition', pageTransition);

			const transition = document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});

			transition.finished.finally(() => {
				document.documentElement.classList.remove('page-transitioning');
				document.documentElement.removeAttribute('data-page-transition');
			});
		});
	});
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme-transition', themeTransition);
		}
	});
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover, interactive-widget=resizes-content"
	/>
	<script>
		let themeState = 'light';

		if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
			const storedTheme = localStorage.getItem('theme-preference');
			if (storedTheme) {
				themeState = storedTheme;
			} else {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				themeState = prefersDark ? 'dark' : 'light';
				localStorage.setItem('theme-preference', themeState);
			}

			if (themeState === 'dark' && typeof document !== 'undefined') {
				document.documentElement.classList.add('dark');
			}
		}
	</script>
</svelte:head>

{@render children()}
<Toast position={toastPosition} showIcon={toastIcon} variant={toastVariant} />
