<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select, Tooltip } from 'ui-svelte';
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

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' }
	];

	const positionOptions = [
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'start', label: 'Start' },
		{ id: 'end', label: 'End' }
	];

	let color: any = $state('primary');
	let variant: any = $state('soft');
	let position: any = $state('top');

	let hasProps = $derived(
		[color !== 'primary', variant !== 'soft', position !== 'top'].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Tooltip, Button } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Tooltip`,
			hasProps && `\tlabel="Tooltip text"`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			position !== 'top' && `\tposition="${position}"`,
			hasProps && `>`,
			hasProps && `\t<Button>Hover me</Button>`,
			hasProps && `</Tooltip>`,
			!hasProps && `<Tooltip label="Tooltip text">`,
			!hasProps && `\t<Button>Hover me</Button>`,
			!hasProps && `</Tooltip>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'soft'
		},
		{
			prop: 'position',
			type: 'top | bottom | start | end',
			initial: 'top'
		},
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Tooltip" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/tooltip.md">
	Tooltips display brief, informative messages when users hover over an element.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
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
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Position"
				size="sm"
				options={positionOptions}
				bind:value={position}
			/>
		</div>

		<div class="doc-preview">
			<Tooltip label="This is a tooltip" {color} {variant} {position}>
				<Button>Hover me</Button>
			</Tooltip>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<Tooltip
						label={item.label + ' ' + colorItem.label}
						variant={item.id as any}
						color={colorItem.id as any}
					>
						<Button variant="outlined" color={colorItem.id as any}
							>{item.label + ' ' + colorItem.label}</Button
						>
					</Tooltip>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Positions</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each positionOptions as item}
				<Tooltip label={'Position ' + item.label} position={item.id as any}>
					<Button variant="outlined">{item.label}</Button>
				</Tooltip>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
