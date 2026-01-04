<script lang="ts">
	import { ToggleGroup, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import {
		LayoutDashboardIcon,
		LayoutLeftIcon,
		List24RegularIcon,
		ChartLinearIcon
	} from '$lib/icons';
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
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const defaultItems = [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' }
	];

	const iconItems = [
		{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
		{ id: 'layout', label: 'Layout', icon: LayoutLeftIcon },
		{ id: 'list', label: 'List', icon: List24RegularIcon },
		{ id: 'chart', label: 'Chart', icon: ChartLinearIcon }
	];

	let color: any = $state('muted');
	let variant: any = $state('soft');
	let size: any = $state('md');
	let value = $state('option1');

	let isWide = $state(false);
	let isVertical = $state(false);
	let isDisabled = $state(false);
	let showIcons = $state(false);

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'soft',
			size !== 'md',
			isWide,
			isVertical,
			isDisabled,
			showIcons
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ToggleGroup } from 'ui-svelte';`,
			showIcons &&
				`\timport { LayoutDashboardIcon, LayoutLeftIcon, List24RegularIcon, ChartLinearIcon } from '$lib/icons';`,
			``,
			showIcons
				? `\tconst items = [
\t\t{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
\t\t{ id: 'layout', label: 'Layout', icon: LayoutLeftIcon },
\t\t{ id: 'list', label: 'List', icon: List24RegularIcon },
\t\t{ id: 'chart', label: 'Chart', icon: ChartLinearIcon }
\t];`
				: `\tconst items = [
\t\t{ id: 'option1', label: 'Option 1' },
\t\t{ id: 'option2', label: 'Option 2' },
\t\t{ id: 'option3', label: 'Option 3' }
\t];`,
			``,
			`\tlet value = $state('${showIcons ? 'dashboard' : 'option1'}');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ToggleGroup`,
			hasProps && `\t{items}`,
			hasProps && `\tbind:value`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			isWide && `\tisWide`,
			isVertical && `\tisVertical`,
			isDisabled && `\tisDisabled`,
			hasProps && `/>`,
			!hasProps && `<ToggleGroup {items} bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'ToggleGroupItem[]', initial: '[]' },
		{ prop: 'value', type: 'string', initial: 'items[0]?.id' },
		{ prop: 'onchange', type: '(value: string) => void', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'soft'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isVertical', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' }
	];

	const itemProps = [
		{ prop: 'id', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' }
	];
</script>

<DocsHeader title="ToggleGroup" llmUrl="https://ui-svelte.sappsdev.com/llm/control/toggle-group.md">
	Toggle groups allow users to select a single option from a set of related options.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showIcons} label="With Icons" />
			<Checkbox bind:checked={isWide} label="Wide" />
			<Checkbox bind:checked={isVertical} label="Vertical" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
		</div>

		<div class="doc-preview">
			<ToggleGroup
				items={showIcons ? iconItems : defaultItems}
				bind:value
				{color}
				{variant}
				{size}
				{isWide}
				{isVertical}
				{isDisabled}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<ToggleGroup
						items={[
							{ id: 'a', label: 'A' },
							{ id: 'b', label: 'B' },
							{ id: 'c', label: 'C' }
						]}
						variant={item.id as any}
						color={colorItem.id as any}
						size="sm"
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					<ToggleGroup
						items={[
							{ id: 'a', label: item.label },
							{ id: 'b', label: sizeItem.label }
						]}
						variant={item.id as any}
						size={sizeItem.id as any}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Icons</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				<ToggleGroup items={iconItems} variant={item.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Vertical Layout</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each variantOptions as item}
				<ToggleGroup
					items={[
						{ id: 'a', label: 'Option A' },
						{ id: 'b', label: 'Option B' },
						{ id: 'c', label: 'Option C' }
					]}
					variant={item.id as any}
					isVertical
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Wide Layout</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<ToggleGroup
				items={[
					{ id: 'a', label: 'Option A' },
					{ id: 'b', label: 'Option B' },
					{ id: 'c', label: 'Option C' }
				]}
				variant={item.id as any}
				isWide
			/>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">ToggleGroupItem Type</p>
	<DocsProps props={itemProps} />
</Section>
