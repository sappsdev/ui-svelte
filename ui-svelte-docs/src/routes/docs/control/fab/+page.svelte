<script lang="ts">
	import { Fab, Card, Checkbox, Code, Section, Select, type FabAction } from 'ui-svelte';
	import { Camera24RegularIcon, Send24RegularIcon, HeartAngleLinearIcon } from '$lib/icons';
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

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const positionOptions = [
		{ id: 'bottom-right', label: 'Bottom Right' },
		{ id: 'bottom-left', label: 'Bottom Left' },
		{ id: 'top-right', label: 'Top Right' },
		{ id: 'top-left', label: 'Top Left' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let size: any = $state('lg');
	let position: any = $state('bottom-right');
	let hasActions = $state(false);

	const actions: FabAction[] = [
		{ icon: Camera24RegularIcon, label: 'Camera', color: 'muted' },
		{ icon: Send24RegularIcon, label: 'Send', color: 'muted' },
		{ icon: HeartAngleLinearIcon, label: 'Like', color: 'danger' }
	];

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'solid',
			size !== 'lg',
			position !== 'bottom-right',
			hasActions
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Fab${hasActions ? ', type FabAction' : ''} } from 'ui-svelte';`,
			hasActions && `\timport { Camera24RegularIcon, Send24RegularIcon } from '$lib/icons';`,
			hasActions && ``,
			hasActions && `\tconst actions: FabAction[] = [`,
			hasActions && `\t\t{ icon: Camera24RegularIcon, label: 'Camera' },`,
			hasActions && `\t\t{ icon: Send24RegularIcon, label: 'Send' }`,
			hasActions && `\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Fab`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			size !== 'lg' && `\tsize="${size}"`,
			position !== 'bottom-right' && `\tposition="${position}"`,
			hasActions && `\t{actions}`,
			hasProps && `/>`,
			!hasProps && `<Fab />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'onclick', type: '() => void', initial: '' },
		{
			prop: 'position',
			type: 'top-left | top-right | bottom-left | bottom-right',
			initial: 'bottom-right'
		},
		{ prop: 'icon', type: 'IconData', initial: 'Add24RegularIcon' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'solid'
		},
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'lg' },
		{ prop: 'actions', type: 'FabAction[]', initial: '[]' },
		{ prop: 'isBlock', type: 'boolean', initial: 'false' },
		{ prop: 'offsetX', type: 'string', initial: '1rem' },
		{ prop: 'offsetY', type: 'string', initial: '1rem' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' }
	];

	const actionProps = [
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: ''
		},
		{ prop: 'onclick', type: '() => void', initial: '' }
	];
</script>

<DocsHeader title="Fab" llmUrl="https://ui-svelte.sappsdev.com/llm/control/fab.md">
	Floating Action Button for primary actions. Supports expandable action menus.
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
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
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
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasActions} label="With Actions" />
		</div>

		<div class="doc-preview" style="height: 300px; position: relative;">
			<Fab {color} {variant} {size} {position} actions={hasActions ? actions : []} isBlock />
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Positions</p>
	<Card>
		<div class="doc-preview" style="height: 300px; position: relative;">
			{#each positionOptions as pos}
				<Fab position={pos.id as any} color="primary" isBlock />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors & Variants</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each variantOptions as variantItem}
				{#each colorOptions as colorItem}
					<div class="relative" style="width: 56px; height: 56px;">
						<Fab variant={variantItem.id as any} color={colorItem.id as any} size="lg" isBlock />
					</div>
				{/each}
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		<div class="wrap gap-6 center">
			{#each sizeOptions as sizeItem}
				<div class="relative" style="width: 56px; height: 56px;">
					<Fab size={sizeItem.id as any} isBlock />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Actions</p>
	<Card>
		<div class="doc-preview" style="height: 350px; position: relative;">
			<Fab {actions} position="bottom-right" isBlock />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">FabAction Type</p>
	<DocsProps props={actionProps} />
</Section>
