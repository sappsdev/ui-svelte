<script lang="ts">
	import { AvatarGroup, Card, Checkbox, TextField, Section, Select } from 'ui-svelte';
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
		{ id: 'warning', label: 'Warning' },
		{ id: 'transparent', label: 'Transparent' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	let variant: any = $state('primary');
	let size: any = $state('lg');
	let max: number = $state(4);
	let stacked = $state(true);
	let isBordered = $state(false);

	const sampleItems = [
		{ src: 'https://i.pravatar.cc/150?img=1', name: 'Alice', alt: 'Alice' },
		{ src: 'https://i.pravatar.cc/150?img=2', name: 'Bob', alt: 'Bob' },
		{ src: 'https://i.pravatar.cc/150?img=3', name: 'Carol', alt: 'Carol' },
		{ src: 'https://i.pravatar.cc/150?img=4', name: 'David', alt: 'David' },
		{ src: 'https://i.pravatar.cc/150?img=5', name: 'Eve', alt: 'Eve' },
		{ src: 'https://i.pravatar.cc/150?img=6', name: 'Frank', alt: 'Frank' }
	];

	const nameOnlyItems = [
		{ name: 'Alice Brown' },
		{ name: 'Bob Smith' },
		{ name: 'Carol Davis' },
		{ name: 'David Wilson' },
		{ name: 'Eve Johnson' }
	];

	let hasProps = $derived(
		[variant !== 'primary', size !== 'lg', max !== 4, !stacked, isBordered].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AvatarGroup } from 'ui-svelte';`,
			``,
			`\tconst items = [`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=1', name: 'Alice' },`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=2', name: 'Bob' },`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=3', name: 'Carol' },`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=4', name: 'David' },`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=5', name: 'Eve' },`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=6', name: 'Frank' }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<AvatarGroup`,
			hasProps && `\t{items}`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'lg' && `\tsize="${size}"`,
			max && `\tmax={${max}}`,
			!stacked && `\tstacked={false}`,
			isBordered && `\tisBordered`,
			hasProps && `/>`,
			!hasProps && `<AvatarGroup {items} />`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{
			prop: 'items',
			type: 'AvatarItem[]',
			initial: '[]',
			description: 'Array of avatar items with src, name, alt, href, onclick, target'
		},
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | warning | danger | info | transparent',
			initial: 'primary'
		},
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'lg' },
		{
			prop: 'max',
			type: 'number',
			initial: 'undefined',
			description: 'Maximum number of visible avatars'
		},
		{
			prop: 'stacked',
			type: 'boolean',
			initial: 'true',
			description: 'Display avatars overlapping (stacked) or separated'
		},
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader
	title="Avatar Group"
	llmUrl="https://ui-svelte.sappsdev.com/llm/display/avatar-group.md"
>
	Display a group of avatars with stacked or separated layout.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<AvatarGroup items={sampleItems} {variant} {size} {max} {stacked} {isBordered} />
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<TextField label="Max Visible" size="sm" type="number" bind:value={max} min={1} max={6} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={stacked} label="Stacked" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="flex flex-col gap-6">
		{#snippet header()}
			<h4>Stacked vs Separated</h4>
		{/snippet}
		<div class="flex flex-col gap-4">
			<div>
				<p class="text-sm text-muted-foreground mb-2">Stacked (Overlapping)</p>
				<AvatarGroup items={sampleItems} max={4} stacked={true} />
			</div>
			<div>
				<p class="text-sm text-muted-foreground mb-2">Separated</p>
				<AvatarGroup items={sampleItems} max={4} stacked={false} />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="flex flex-col gap-6">
		{#snippet header()}
			<h4>With Names Only</h4>
		{/snippet}
		<div class="flex flex-wrap gap-4">
			<AvatarGroup items={nameOnlyItems} variant="primary" />
			<AvatarGroup items={nameOnlyItems} variant="secondary" stacked={false} />
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="flex flex-wrap gap-6 items-center">
		{#snippet header()}
			<h4>Different Sizes</h4>
		{/snippet}
		{#each sizeOptions as sizeOpt}
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm text-muted-foreground">{sizeOpt.label}</span>
				<AvatarGroup items={sampleItems.slice(0, 4)} size={sizeOpt.id as any} max={3} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-4 gap-6">
		{#snippet header()}
			<h4>Variants</h4>
		{/snippet}
		{#each variantOptions as variantOpt}
			<div class="flex flex-col items-center gap-2">
				<span class="text-sm text-muted-foreground">{variantOpt.label}</span>
				<AvatarGroup items={nameOnlyItems.slice(0, 4)} variant={variantOpt.id as any} max={3} />
			</div>
		{/each}
	</Card>
</Section>

<DocsProps {props} />
