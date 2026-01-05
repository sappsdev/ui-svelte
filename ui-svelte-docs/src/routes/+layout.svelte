<script lang="ts">
	import { Provider } from 'ui-svelte';
	import '@fontsource-variable/montserrat';
	import '../app.css';
	import { storeApp } from '$lib/store/store.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const title = 'UiSvelte - Modern Svelte 5 Component Library';
	const description =
		'A comprehensive Svelte 5 component library with 70+ components. Zero runtime overhead, TypeScript-first, AI-ready documentation. Build beautiful web apps faster.';

	let url = $derived(page.url.origin + page.url.pathname);
	const image = 'https://ui-svelte.sappsdev.com/og.jpg';
	const keywords =
		'Svelte, Svelte 5, UI components, component library, TypeScript, web development, frontend, UI kit';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'UiSvelte',
		url: 'https://ui-svelte.sappsdev.com',
		description: description,
		author: {
			'@type': 'Person',
			name: 'SappsDev',
			url: 'https://github.com/sappsdev/ui-svelte'
		},
		keywords: keywords
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content="SappsDev" />
	<meta name="robots" content="index, follow" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="UiSvelte" />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:creator" content="@sappsdev" />

	<link rel="canonical" href={url} />

	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>

<Provider
	toastPosition={storeApp.toastPosition}
	toastIcon={storeApp.toastIcon}
	toastVariant={storeApp.toastVariant}
	themeTransition={storeApp.themeTransition}
	pageTransition={storeApp.pageTransition}
>
	{@render children()}
</Provider>
