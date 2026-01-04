<script lang="ts">
	import { Card, Checkbox, Code, Image, Section, Select, TextField } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const aspectOptions = [
		{ id: 'auto', label: 'Auto' },
		{ id: 'horizontal', label: 'Horizontal' },
		{ id: 'vertical', label: 'Vertical' },
		{ id: 'square', label: 'Square' }
	];

	const objectFitOptions = [
		{ id: 'cover', label: 'Cover' },
		{ id: 'contain', label: 'Contain' },
		{ id: 'fill', label: 'Fill' },
		{ id: 'none', label: 'None' }
	];

	const loadingOptions = [
		{ id: 'lazy', label: 'Lazy' },
		{ id: 'eager', label: 'Eager' }
	];

	let imageSrc = $state('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800');
	let alt = $state('Mountain landscape');
	let color: any = $state('primary');
	let aspect: any = $state('auto');
	let objectFit: any = $state('cover');
	let loading: any = $state('lazy');
	let hideControls = $state(false);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Image } from 'ui-svelte';`,
			`<\/script>`
		];

		const componentLines = [
			`<Image`,
			`\tsrc="${imageSrc}"`,
			alt && `\talt="${alt}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			aspect !== 'auto' && `\taspect="${aspect}"`,
			objectFit !== 'cover' && `\tobjectFit="${objectFit}"`,
			loading !== 'lazy' && `\tloading="${loading}"`,
			hideControls && `\thideControls`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'alt', type: 'string', initial: '' },
		{ prop: 'aspect', type: 'auto | horizontal | vertical | square', initial: 'auto' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'objectFit', type: 'cover | contain | fill | none', initial: 'cover' },
		{ prop: 'loading', type: 'lazy | eager', initial: 'lazy' },
		{ prop: 'hideControls', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Image" llmUrl="https://ui-svelte.sappsdev.com/llm/control/image.md">
	An image component with loading states, error handling, and overlay controls for download and
	fullscreen functionality.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Aspect"
				size="sm"
				options={aspectOptions}
				bind:value={aspect}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Object Fit"
				size="sm"
				options={objectFitOptions}
				bind:value={objectFit}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Loading"
				size="sm"
				options={loadingOptions}
				bind:value={loading}
			/>
		</div>
		<div class="wrap gap-2">
			<TextField
				label="Image Source (URL)"
				size="sm"
				bind:value={imageSrc}
				isFloatLabel
				placeholder="Enter image URL"
			/>
			<TextField
				label="Alt Text"
				size="sm"
				bind:value={alt}
				isFloatLabel
				placeholder="Enter alt text"
				rootClass="max-w-xs"
			/>
			<Checkbox label="Hide Controls" bind:checked={hideControls} />
		</div>

		<div class="doc-preview">
			<Image
				src={imageSrc}
				{alt}
				{color}
				{aspect}
				{objectFit}
				{loading}
				{hideControls}
				class="max-w-xs"
			/>
		</div>

		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Aspect Ratios</p>
	<Card color="background" variant="outlined">
		<div class="grid-1 md:grid-4 gap-4">
			{#each aspectOptions as item}
				<div class="col gap-2">
					<p class="text-sm">{item.label}</p>
					<Image
						src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
						alt="Mountain landscape"
						aspect={item.id as any}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Object Fit</p>
	<Card color="background" variant="outlined">
		<div class="grid-1 md:grid-4 gap-4">
			{#each objectFitOptions as item}
				<div class="col gap-2">
					<p class="text-sm">{item.label}</p>
					<Image
						src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
						alt="Mountain landscape"
						aspect="square"
						objectFit={item.id as any}
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
