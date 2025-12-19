<script lang="ts">
	import { Chip, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import { HeartAngleLinearIcon, BalloonLinearIcon } from '$lib/icons';
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
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const propsOptions = [
		{ id: 'startIcon', label: 'Start Icon' },
		{ id: 'endIcon', label: 'End Icon' },
		{ id: 'bothIcons', label: 'Both Icons' },
		{ id: 'closable', label: 'Closable' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let size: any = $state('md');

	let startIcon: any = $state(false);
	let endIcon: any = $state(false);
	let closable = $state(false);

	let hasProps = $derived(
		[color !== 'primary', variant !== 'solid', size !== 'md', startIcon, endIcon, closable].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Chip } from 'ui-svelte';`,
			(startIcon || endIcon) &&
				`\timport { HeartAngleLinearIcon, BalloonLinearIcon } from '$lib/icons';`,
			closable && `\n\tconst handleClose = () => {`,
			closable && `\t\tconsole.log('Chip closed');`,
			closable && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Chip`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			startIcon && `\tstartIcon={HeartAngleLinearIcon}`,
			endIcon && `\tendIcon={BalloonLinearIcon}`,
			closable && `\tonclose={handleClose}`,
			hasProps && `>`,
			hasProps && `\tLabel`,
			hasProps && `</Chip>`,
			!hasProps && `<Chip>Label</Chip>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined',
			initial: 'solid'
		},
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconData', initial: '' },
		{ prop: 'endIcon', type: 'IconData', initial: '' }
	];
</script>

<DocsHeader title="Chip" llmUrl="https://ui-svelte.sappsdev.com/llm/display/chip.md">
	Chips are compact elements that represent an input, attribute, or action.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-3 gap-2">
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
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={startIcon} label="startIcon" />
			<Checkbox bind:checked={endIcon} label="endIcon" />
			<Checkbox bind:checked={closable} label="onclose" />
		</div>

		<div class="doc-preview">
			<Chip
				startIcon={startIcon ? HeartAngleLinearIcon : undefined}
				endIcon={endIcon ? BalloonLinearIcon : undefined}
				onclose={closable ? () => console.log('Chip closed') : undefined}
				{color}
				{variant}
				{size}
			>
				Chip Label
			</Chip>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as color}
					<Chip variant={item.id as any} color={color.id as any}
						>{item.label + ' ' + color.label}</Chip
					>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as size}
					<Chip variant={item.id as any} size={size.id as any}>{item.label + ' ' + size.label}</Chip
					>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Icons</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each propsOptions as prop}
					<Chip
						onclose={prop.id === 'closable' ? () => {} : undefined}
						startIcon={prop.id === 'startIcon' || prop.id === 'bothIcons'
							? HeartAngleLinearIcon
							: undefined}
						endIcon={prop.id === 'endIcon' || prop.id === 'bothIcons'
							? BalloonLinearIcon
							: undefined}
						variant={item.id as any}>{item.label + ' ' + prop.label}</Chip
					>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
