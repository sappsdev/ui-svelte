<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { Toast } from '$lib/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		toastSolid?: boolean;
		toastIcon?: boolean;
		toastPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	};

	const { children, toastSolid, toastPosition, toastIcon }: Props = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content"
	/>
	<script>
		let themeState = 'light';

		if (typeof window !== 'undefined' && localStorage) {
			const storedTheme = localStorage.getItem('theme-preference');
			if (storedTheme) {
				themeState = storedTheme;
			} else {
				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				themeState = prefersDark ? '' : 'light';
				localStorage.setItem('theme-preference', themeState);
			}
		}

		if (themeState === 'dark') {
			document.documentElement.classList.add('dark');
		}
	</script>
</svelte:head>

{@render children()}
<Toast position={toastPosition} showIcon={toastIcon} isSolid={toastSolid} />
