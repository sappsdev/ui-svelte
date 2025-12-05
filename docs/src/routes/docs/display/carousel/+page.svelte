<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Carousel, Checkbox, Select } from 'ui-svelte';

	const variantOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const orientationOptions = [
		{ id: 'horizontal', label: 'Horizontal' },
		{ id: 'vertical', label: 'Vertical' }
	];

	const indicatorTypeOptions = [
		{ id: 'bar', label: 'Bar' },
		{ id: 'dot', label: 'Dot' }
	];

	// Selects
	let variant: any = $state('default');
	let size: any = $state('md');
	let orientation: any = $state('horizontal');
	let indicatorType: any = $state('dot');

	// States
	let autoplay = $state(false);
	let loop = $state(true);
	let showControls = $state(true);
	let showIndicators = $state(true);
	let showNavigation = $state(false);
	let showCounter = $state(false);

	// Autoplay interval (in milliseconds)
	let autoplayInterval = $state(3000);

	let hasProps = $derived(
		[
			variant !== 'default',
			size !== 'md',
			orientation !== 'horizontal',
			indicatorType !== 'dot',
			autoplay,
			autoplayInterval !== 3000,
			!loop,
			!showControls,
			!showIndicators,
			showNavigation,
			showCounter
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Carousel } from 'ui-svelte';`,
			`<\/script>`,
			`\n{#snippet slide1()}`,
			`\t<div class="flex h-64 items-center justify-center bg-blue-100 rounded-lg">`,
			`\t\t<div class="text-center">`,
			`\t\t\t<h3 class="text-2xl font-bold text-blue-900">Slide 1</h3>`,
			`\t\t\t<p class="text-blue-700">First carousel slide</p>`,
			`\t\t</div>`,
			`\t</div>`,
			`{/snippet}`,
			`\n{#snippet slide2()}`,
			`\t<div class="flex h-64 items-center justify-center bg-purple-100 rounded-lg">`,
			`\t\t<div class="text-center">`,
			`\t\t\t<h3 class="text-2xl font-bold text-purple-900">Slide 2</h3>`,
			`\t\t\t<p class="text-purple-700">Second carousel slide</p>`,
			`\t\t</div>`,
			`\t</div>`,
			`{/snippet}`,
			`\n{#snippet slide3()}`,
			`\t<div class="flex h-64 items-center justify-center bg-green-100 rounded-lg">`,
			`\t\t<div class="text-center">`,
			`\t\t\t<h3 class="text-2xl font-bold text-green-900">Slide 3</h3>`,
			`\t\t\t<p class="text-green-700">Third carousel slide</p>`,
			`\t\t</div>`,
			`\t</div>`,
			`{/snippet}`,
			`\n<script lang="ts">`,
			`\tconst slides = [`,
			`\t\t{ id: '1', content: slide1 },`,
			`\t\t{ id: '2', content: slide2 },`,
			`\t\t{ id: '3', content: slide3 }`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			`\n`,
			hasProps && `<Carousel`,
			hasProps && `\tslides={slides}`,
			variant !== 'default' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			orientation !== 'horizontal' && `\torientation="${orientation}"`,
			indicatorType !== 'dot' && `\tindicatorType="${indicatorType}"`,
			autoplay && `\tautoplay`,
			autoplay && autoplayInterval !== 3000 && `\tautoplayInterval={${autoplayInterval}}`,
			!loop && `\tloop={false}`,
			!showControls && `\tshowControls={false}`,
			!showIndicators && `\tshowIndicators={false}`,
			showNavigation && `\tshowNavigation`,
			showCounter && `\tshowCounter`,
			hasProps && `/>`,
			!hasProps && `<Carousel slides={slides} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'slides', type: 'Slide[]', initial: '[]', required: true },
		{ prop: 'autoplay', type: 'boolean', initial: 'false' },
		{ prop: 'autoplayInterval', type: 'number', initial: '3000' },
		{ prop: 'loop', type: 'boolean', initial: 'true' },
		{ prop: 'showControls', type: 'boolean', initial: 'true' },
		{ prop: 'showIndicators', type: 'boolean', initial: 'true' },
		{ prop: 'showNavigation', type: 'boolean', initial: 'false' },
		{ prop: 'showCounter', type: 'boolean', initial: 'false' },
		{ prop: 'orientation', type: 'horizontal | vertical', initial: 'horizontal' },
		{ prop: 'variant', type: 'primary | secondary | muted | default', initial: 'default' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'indicatorType', type: 'bar | dot', initial: 'dot' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'slideClass', type: 'string', initial: '' },
		{ prop: 'onSlideChange', type: '(index: number) => void', initial: '' }
	];

	const slideProps = [
		{ prop: 'id', type: 'string | number', initial: '', required: true },
		{ prop: 'content', type: 'Snippet | string', initial: '', required: true }
	];
</script>

{#snippet slide1()}
	<div class="flex h-64 items-center justify-center bg-blue-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-blue-900">Slide 1</h3>
			<p class="text-blue-700">First carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet slide2()}
	<div class="flex h-64 items-center justify-center bg-purple-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-purple-900">Slide 2</h3>
			<p class="text-purple-700">Second carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet slide3()}
	<div class="flex h-64 items-center justify-center bg-green-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-green-900">Slide 3</h3>
			<p class="text-green-700">Third carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet slide4()}
	<div class="flex h-64 items-center justify-center bg-orange-100 rounded-lg">
		<div class="text-center">
			<h3 class="text-2xl font-bold text-orange-900">Slide 4</h3>
			<p class="text-orange-700">Fourth carousel slide</p>
		</div>
	</div>
{/snippet}

{#snippet preview()}
	<Carousel
		slides={[
			{ id: '1', content: slide1 },
			{ id: '2', content: slide2 },
			{ id: '3', content: slide3 },
			{ id: '4', content: slide4 }
		]}
		{variant}
		{size}
		{orientation}
		{indicatorType}
		{autoplay}
		{autoplayInterval}
		{loop}
		{showControls}
		{showIndicators}
		{showNavigation}
		{showCounter}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
	<Select label="Orientation" size="sm" options={orientationOptions} bind:value={orientation} />
	<Select
		label="Indicator Type"
		size="sm"
		options={indicatorTypeOptions}
		bind:value={indicatorType}
	/>

	<DocOptions title="Behavior">
		<Checkbox bind:checked={autoplay} label="Autoplay" />
		<Checkbox bind:checked={loop} label="Loop" />
	</DocOptions>

	<DocOptions title="Visibility">
		<Checkbox bind:checked={showControls} label="Show Controls" />
		<Checkbox bind:checked={showIndicators} label="Show Indicators" />
		<Checkbox bind:checked={showNavigation} label="Show Navigation" />
		<Checkbox bind:checked={showCounter} label="Show Counter" />
	</DocOptions>
{/snippet}

<DocHeader title="Carousel">
	Carousel components allow users to cycle through a collection of slides or content panels.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Slide Type</h3>
	<p>Each slide in the slides array should follow this structure:</p>
</div>

<DocProps props={slideProps} />
