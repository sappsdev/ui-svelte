<script lang="ts">
	import { Skeleton, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'text', label: 'Text' },
		{ id: 'circular', label: 'Circular' },
		{ id: 'rectangular', label: 'Rectangular' },
		{ id: 'rounded', label: 'Rounded' }
	];

	const animationOptions = [
		{ id: 'wave', label: 'Wave' },
		{ id: 'pulse', label: 'Pulse' },
		{ id: 'none', label: 'None' }
	];

	let variant: any = $state('text');
	let animation: any = $state('wave');
	let width = $state('200px');
	let height = $state('20px');

	let hasProps = $derived(
		[variant !== 'text', animation !== 'wave', width !== '200px', height !== '20px'].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Skeleton } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Skeleton`,
			variant !== 'text' && `\tvariant="${variant}"`,
			animation !== 'wave' && `\tanimation="${animation}"`,
			width !== '200px' && `\twidth="${width}"`,
			height !== '20px' && `\theight="${height}"`,
			hasProps && `/>`,
			!hasProps && `<Skeleton />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'width', type: 'string', initial: '' },
		{ prop: 'height', type: 'string', initial: '' },
		{
			prop: 'variant',
			type: 'text | circular | rectangular | rounded',
			initial: 'text'
		},
		{
			prop: 'animation',
			type: 'wave | pulse | none',
			initial: 'wave'
		},
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Skeleton" llmUrl="https://ui-svelte.sappsdev.com/llm/display/skeleton.md">
	Skeleton displays a placeholder preview of content before the data gets loaded.
</DocsHeader>

<Section>
	<Card>
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Animation"
				size="sm"
				options={animationOptions}
				bind:value={animation}
			/>
		</div>

		<div class="doc-preview">
			<Skeleton
				{variant}
				{animation}
				width={variant === 'circular' ? '64px' : '200px'}
				height={variant === 'circular' ? '64px' : variant === 'text' ? '20px' : '100px'}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants</p>
	<Card>
		<div class="wrap gap-6 center">
			{#each variantOptions as item}
				<div class="column gap-2 items-center">
					<Skeleton
						variant={item.id as any}
						width={item.id === 'circular' ? '64px' : '150px'}
						height={item.id === 'circular' ? '64px' : item.id === 'text' ? '20px' : '80px'}
					/>
					<span class="text-sm text-on-muted">{item.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Animations</p>
	<Card>
		<div class="wrap gap-6 center">
			{#each animationOptions as item}
				<div class="column gap-2 items-center">
					<Skeleton animation={item.id as any} width="150px" height="20px" />
					<span class="text-sm text-on-muted">{item.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Content Placeholder Example</p>
	<Card>
		<div class="flex gap-4 items-start">
			<Skeleton variant="circular" width="48px" height="48px" />
			<div class="column gap-2 flex-1">
				<Skeleton width="40%" height="16px" />
				<Skeleton width="100%" height="12px" />
				<Skeleton width="80%" height="12px" />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Card Placeholder Example</p>
	<Card>
		<div class="column gap-4 max-w-xs">
			<Skeleton variant="rounded" width="100%" height="140px" />
			<div class="column gap-2">
				<Skeleton width="60%" height="20px" />
				<Skeleton width="100%" height="12px" />
				<Skeleton width="100%" height="12px" />
				<Skeleton width="40%" height="12px" />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
