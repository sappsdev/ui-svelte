<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Checkbox, Select, ToggleGroup } from 'ui-svelte';
	import { HeartLinearIcon, StarsMinimalisticLinearIcon, BalloonLinearIcon } from '$lib/icons';

	const variantOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'outlined', label: 'Outlined' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let variant: any = $state('default');
	let size: any = $state('md');

	let isWide = $state(false);
	let isVertical = $state(false);
	let isDisabled = $state(false);
	let showIcons = $state(false);

	let selectedValue = $state('option1');

	const baseItems = [
		{ id: 'option1', label: 'Option 1' },
		{ id: 'option2', label: 'Option 2' },
		{ id: 'option3', label: 'Option 3' }
	];

	const iconItems = [
		{ id: 'option1', label: 'Hearts', icon: HeartLinearIcon },
		{ id: 'option2', label: 'Stars', icon: StarsMinimalisticLinearIcon },
		{ id: 'option3', label: 'Balloon', icon: BalloonLinearIcon }
	];

	let items = $derived(showIcons ? iconItems : baseItems);

	let hasProps = $derived(
		[variant !== 'default', size !== 'md', isWide, isVertical, isDisabled, showIcons].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ToggleGroup } from 'ui-svelte';`,
			showIcons &&
				`\timport { HeartLinearIcon, StarsMinimalisticLinearIcon, BalloonLinearIcon } from '$lib/icons';`,
			``,
			`\tlet value = $state('option1');`,
			``,
			showIcons
				? `\tconst items = [
\t\t{ id: 'option1', label: 'Hearts', icon: HeartLinearIcon },
\t\t{ id: 'option2', label: 'Stars', icon: StarsMinimalisticLinearIcon },
\t\t{ id: 'option3', label: 'Balloon', icon: BalloonLinearIcon }
\t];`
				: `\tconst items = [
\t\t{ id: 'option1', label: 'Option 1' },
\t\t{ id: 'option2', label: 'Option 2' },
\t\t{ id: 'option3', label: 'Option 3' }
\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ToggleGroup`,
			hasProps && `\t{items}`,
			hasProps && `\tbind:value`,
			variant !== 'default' && `\tvariant="${variant}"`,
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
		{ prop: 'value', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: string) => void', initial: '' },
		{
			prop: 'variant',
			type: 'default | primary | secondary | outlined',
			initial: 'default'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isVertical', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<ToggleGroup
		{items}
		bind:value={selectedValue}
		{variant}
		{size}
		{isWide}
		{isVertical}
		{isDisabled}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Props">
		<Checkbox bind:checked={showIcons} label="Icons" />
		<Checkbox bind:checked={isWide} label="Wide" />
		<Checkbox bind:checked={isVertical} label="Vertical" />
		<Checkbox bind:checked={isDisabled} label="Disabled" />
	</DocOptions>
{/snippet}

<DocHeader title="ToggleGroup">
	A set of buttons that behave like a single selection control, allowing users to toggle between
	options.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
