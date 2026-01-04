<script lang="ts">
	import { Button, Card, Code, Section, Select, toast, ToggleTheme } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import { storeApp } from '$lib/store/store.svelte';
	import { goto } from '$app/navigation';

	const themeTransitionOptions = [
		{ id: 'circle', label: 'Circle' },
		{ id: 'slide', label: 'Slide' },
		{ id: 'fade', label: 'Fade' },
		{ id: 'vertical', label: 'Vertical' },
		{ id: 'none', label: 'None' }
	];

	const pageTransitionOptions = [
		{ id: 'fade', label: 'Fade' },
		{ id: 'slide', label: 'Slide' },
		{ id: 'scale', label: 'Scale' },
		{ id: 'none', label: 'None' }
	];

	const toastPositionOptions = [
		{ id: 'top-left', label: 'Top Left' },
		{ id: 'top-right', label: 'Top Right' },
		{ id: 'bottom-left', label: 'Bottom Left' },
		{ id: 'bottom-right', label: 'Bottom Right' }
	];

	const toastVariantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' }
	];

	let hasProps = $derived(
		[
			storeApp.themeTransition !== 'circle',
			storeApp.pageTransition !== 'fade',
			storeApp.toastPosition !== 'bottom-left',
			storeApp.toastVariant !== 'soft',
			storeApp.toastIcon
		].some(Boolean)
	);

	let code = $derived(() => {
		const lines = [
			`<script lang="ts">`,
			`\timport { Provider } from 'ui-svelte';`,
			`\tlet { children } = $props();`,
			`<\/script>`,
			``,
			`<Provider`,
			storeApp.themeTransition !== 'circle' && `\tthemeTransition="${storeApp.themeTransition}"`,
			storeApp.pageTransition !== 'fade' && `\tpageTransition="${storeApp.pageTransition}"`,
			storeApp.toastPosition !== 'bottom-left' && `\ttoastPosition="${storeApp.toastPosition}"`,
			storeApp.toastVariant !== 'soft' && `\ttoastVariant="${storeApp.toastVariant}"`,
			storeApp.toastIcon && `\ttoastIcon`,
			`>`,
			`\t{@render children()}`,
			`</Provider>`
		].filter(Boolean);

		return lines.join('\n');
	});

	const providerProps = [
		{ prop: 'children', type: 'Snippet', required: true, initial: '' },
		{
			prop: 'themeTransition',
			type: 'circle | slide | fade | vertical | none',
			initial: 'circle'
		},
		{
			prop: 'pageTransition',
			type: 'fade | slide | scale | none',
			initial: 'fade'
		},
		{
			prop: 'toastPosition',
			type: 'top-left | top-right | bottom-left | bottom-right',
			initial: 'bottom-left'
		},
		{ prop: 'toastVariant', type: 'solid | soft', initial: 'soft' },
		{ prop: 'toastIcon', type: 'boolean', initial: 'false' }
	];

	const handleShowToast = () => {
		toast.show({
			title: 'Provider Configuration',
			description: 'Toast is configured through the Provider component.',
			color: 'info',
			duration: 3000,
			position: storeApp.toastPosition,
			variant: storeApp.toastVariant
		});
	};

	const handlePageTransition = () => {
		goto('/docs/starter/install');
		setTimeout(() => {
			goto('/docs/starter/provider');
		}, 500);
	};
</script>

<DocsHeader title="Provider">
	The Provider component is a wrapper that provides global configuration for your application. It
	handles theme transitions, page transitions, and toast notifications.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Theme Transition"
				size="sm"
				options={themeTransitionOptions}
				value={storeApp.themeTransition}
				onchange={(v) => (storeApp.themeTransition = v as any)}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Page Transition"
				size="sm"
				options={pageTransitionOptions}
				value={storeApp.pageTransition}
				onchange={(v) => (storeApp.pageTransition = v as any)}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Toast Position"
				size="sm"
				options={toastPositionOptions}
				value={storeApp.toastPosition}
				onchange={(v) => (storeApp.toastPosition = v as any)}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Toast Variant"
				size="sm"
				options={toastVariantOptions}
				value={storeApp.toastVariant}
				onchange={(v) => (storeApp.toastVariant = v as any)}
			/>
		</div>

		<div class="doc-preview">
			<div class="wrap gap-4 center">
				<div class="stack gap-2 center">
					<p class="text-muted-foreground text-sm">Toggle theme to see transition</p>
					<ToggleTheme />
				</div>
				<Button onclick={handlePageTransition}>Test Page Transition</Button>
				<Button variant="soft" onclick={handleShowToast}>Show Toast</Button>
			</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage</p>
	<Card color="background" variant="outlined">
		<p class="text-muted-foreground mb-4">
			The Provider component should wrap your entire application, typically in your root layout
			file. It automatically handles theme detection, stores preferences in localStorage, and sets
			up the necessary meta viewport tags.
		</p>
		<Code
			lang="svelte"
			code={`<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { Provider } from 'ui-svelte';
	import 'ui-svelte/styles';
	let { children } = $props();
<\/script>

<Provider>
	{@render children()}
</Provider>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Theme Transitions</p>
	<Card color="background" variant="outlined">
		<p class="text-muted-foreground mb-4">
			The Provider supports four different theme transition animations when switching between light
			and dark modes. Try toggling the theme switch above with different transitions selected.
		</p>
		<div class="grid-2 md:grid-4 gap-4">
			{#each themeTransitionOptions as option}
				<Button
					variant={storeApp.themeTransition === option.id ? 'solid' : 'soft'}
					onclick={() => (storeApp.themeTransition = option.id as any)}
				>
					{option.label}
				</Button>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Page Transitions</p>
	<Card color="background" variant="outlined">
		<p class="text-muted-foreground mb-4">
			Page transitions are applied when navigating between routes using the View Transitions API.
			The effect is visible when using SvelteKit's navigation. Click "Test Page Transition" above to
			see the current transition effect.
		</p>
		<div class="grid-2 md:grid-4 gap-4">
			{#each pageTransitionOptions as option}
				<Button
					variant={storeApp.pageTransition === option.id ? 'solid' : 'soft'}
					onclick={() => (storeApp.pageTransition = option.id as any)}
				>
					{option.label}
				</Button>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Features</p>
	<Card color="background" variant="outlined">
		<ul class="stack gap-2 text-muted-foreground">
			<li>
				<strong>Automatic Theme Detection</strong> – Detects user's system preference and stores it in
				localStorage
			</li>
			<li>
				<strong>Theme Transitions</strong> – Smooth animated transitions between light and dark modes
			</li>
			<li>
				<strong>Page Transitions</strong> – View Transitions API integration for navigation effects
			</li>
			<li>
				<strong>Toast Container</strong> – Built-in Toast component with configurable position and styling
			</li>
			<li>
				<strong>Viewport Meta</strong> – Sets recommended viewport settings for mobile compatibility
			</li>
		</ul>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps props={providerProps} />
</Section>
