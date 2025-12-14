<script lang="ts">
	import { Chip, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import {
		HeartAngleLinearIcon,
		DownloadLinearIcon,
		TrashLinearIcon,
		Settings24RegularIcon,
		Search24RegularIcon,
		Heart24RegularIcon,
		BalloonLinearIcon
	} from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let variant: any = $state('primary');
	let size: any = $state('sm');

	let startIcon: any = $state(false);
	let endIcon: any = $state(false);

	let hasShadow = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[variant !== 'primary', size !== 'sm', startIcon, endIcon, hasShadow, isSolid].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Chip } from 'ui-svelte';`,
			(startIcon || endIcon) &&
				`\timport { HeartAngleLinearIcon, BalloonLinearIcon } from '$lib/icons';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Chip`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'sm' && `\tsize="${size}"`,
			startIcon && `\tstartIcon={HeartAngleLinearIcon}`,
			endIcon && `\tendIcon={BalloonLinearIcon}`,
			hasShadow && `\thasShadow`,
			isSolid && `\tisSolid`,
			hasProps && `>`,
			hasProps && `\tLabel`,
			hasProps && `</Chip>`,
			!hasProps && `<Chip>Label</Chip>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'onclose', type: '() => void', initial: '' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'sm' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconData', initial: '' },
		{ prop: 'endIcon', type: 'IconData', initial: '' },
		{ prop: 'hasShadow', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="Chip" llmUrl="https://ui-svelte.sappsdev.com/llm/display/chip.md">
	Chips are compact elements that represent an input, attribute, or action.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Chip
			startIcon={startIcon ? HeartAngleLinearIcon : undefined}
			endIcon={endIcon ? BalloonLinearIcon : undefined}
			{variant}
			{size}
			{hasShadow}
			{isSolid}
		>
			Chip Label
		</Chip>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={startIcon} label="startIcon" />
			<Checkbox bind:checked={endIcon} label="endIcon" />
			<Checkbox bind:checked={hasShadow} label="Shadow" />
			<Checkbox bind:checked={isSolid} label="Solid" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-7 center">
		{#snippet header()}
			<h4>Chip Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			<Chip variant={item.id as any}>{item.label}</Chip>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-7 center">
		{#snippet header()}
			<h4>Chip Solid</h4>
		{/snippet}
		{#each variantOptions as item}
			<Chip variant={item.id as any} isSolid>{item.label}</Chip>
		{/each}
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<!-- Status chips -->
	<Chip variant="success" startIcon={Heart24RegularIcon} isSolid>Completed</Chip>
	<Chip variant="warning" startIcon={Settings24RegularIcon} isSolid>Pending</Chip>
	<Chip variant="danger" startIcon={TrashLinearIcon} isSolid>Failed</Chip>
	<Chip variant="info" startIcon={Search24RegularIcon} isSolid>In Progress</Chip>

	<!-- Category chips -->
	<Chip variant="primary">Technology</Chip>
	<Chip variant="secondary">Design</Chip>
	<Chip variant="muted">General</Chip>

	<!-- Size variations -->
	<div class="flex gap-2 items-center">
		<Chip variant="primary" size="sm">SM</Chip>
		<Chip variant="primary" size="md">MD</Chip>
		<Chip variant="primary" size="lg">LG</Chip>
	</div>

	<!-- With shadow -->
	<Chip variant="primary" hasShadow>With Shadow</Chip>
	<Chip variant="success" hasShadow isSolid>Shadow Solid</Chip>

	<!-- With icons -->
	<Chip variant="primary" startIcon={HeartAngleLinearIcon}>Favorites</Chip>
	<Chip variant="info" endIcon={DownloadLinearIcon}>Featured</Chip>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Basic Chip -->
<Chip>Label</Chip>

<!-- Chip with Variant -->
<Chip variant="success">Completed</Chip>

<!-- Solid Chip -->
<Chip variant="danger" isSolid>Error</Chip>

<!-- Chip with Icons -->
<Chip variant="primary" startIcon={HeartIcon}>
	Favorites
</Chip>

<!-- Chip with Shadow -->
<Chip variant="info" hasShadow>
	Featured
</Chip>

<!-- Chip Sizes -->
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>

<!-- Closable Chip -->
<Chip onclose={() => handleClose()}>
	Removable
</Chip>`}
		/>
	</Card>
</Section>

<DocsProps {props} />
