<script lang="ts">
	import { AvatarGroup, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const maxOptions = [
		{ id: '', label: 'None' },
		{ id: '3', label: '3' },
		{ id: '4', label: '4' },
		{ id: '5', label: '5' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let size: any = $state('md');
	let max: any = $state('');

	let isInline = $state(false);
	let isBordered = $state(false);

	const sampleItems = [
		{ src: 'https://i.pravatar.cc/150?img=1', name: 'Alice' },
		{ src: 'https://i.pravatar.cc/150?img=2', name: 'Bob' },
		{ src: 'https://i.pravatar.cc/150?img=3', name: 'Charlie' },
		{ src: 'https://i.pravatar.cc/150?img=4', name: 'Diana' },
		{ src: 'https://i.pravatar.cc/150?img=5', name: 'Eve' },
		{ src: 'https://i.pravatar.cc/150?img=6', name: 'Frank' }
	];

	const nameItems = [
		{ name: 'Alice Johnson' },
		{ name: 'Bob Smith' },
		{ name: 'Charlie Brown' },
		{ name: 'Diana Prince' },
		{ name: 'Eve Wilson' }
	];

	let hasProps = $derived(
		[color !== 'primary', variant !== 'solid', size !== 'md', max, isInline, isBordered].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AvatarGroup } from 'ui-svelte';`,
			``,
			`\tconst items = [`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=1', name: 'Alice' },`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=2', name: 'Bob' },`,
			`\t\t{ src: 'https://i.pravatar.cc/150?img=3', name: 'Charlie' },`,
			`\t\t// ...more items`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<AvatarGroup`,
			`\t{items}`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			max && `\tmax={${max}}`,
			isInline && `\tisInline`,
			isBordered && `\tisBordered`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'items', type: 'AvatarItem[]', initial: '[]' },
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
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'md' },
		{ prop: 'max', type: 'number', initial: '' },
		{ prop: 'isInline', type: 'boolean', initial: 'false' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const avatarItemProps = [
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'alt', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '() => void', initial: '' },
		{ prop: 'target', type: '_self | _blank | _parent | _top', initial: '' }
	];
</script>

<DocsHeader
	title="Avatar Group"
	llmUrl="https://ui-svelte.sappsdev.com/llm/display/avatar-group.md"
>
	Display multiple avatars in a stacked or inline group with optional overflow counter.
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
				label="Max"
				size="sm"
				options={maxOptions}
				bind:value={max}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={isInline} label="Inline" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
		</div>

		<div class="doc-preview">
			<AvatarGroup
				items={sampleItems}
				{color}
				{variant}
				{size}
				max={max ? parseInt(max) : undefined}
				{isInline}
				{isBordered}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<h4>Stacked vs Inline</h4>
	<Card>
		<p class="text-sm mb-4">
			By default, avatars are stacked with overlap. Use <code>isInline</code> to display them in a row.
		</p>
		<div class="wrap gap-8 center">
			<div class="stack gap-2 center">
				<AvatarGroup items={sampleItems.slice(0, 4)} />
				<span class="text-sm">Stacked (default)</span>
			</div>
			<div class="stack gap-2 center">
				<AvatarGroup items={sampleItems.slice(0, 4)} isInline />
				<span class="text-sm">Inline</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<h4>Max Limit</h4>
	<Card>
		<p class="text-sm mb-4">
			Use the <code>max</code> prop to limit visible avatars and show a counter for remaining items.
		</p>
		<div class="wrap gap-8 center">
			<div class="stack gap-2 center">
				<AvatarGroup items={sampleItems} max={3} />
				<span class="text-sm">max=3</span>
			</div>
			<div class="stack gap-2 center">
				<AvatarGroup items={sampleItems} max={4} />
				<span class="text-sm">max=4</span>
			</div>
			<div class="stack gap-2 center">
				<AvatarGroup items={sampleItems} max={5} />
				<span class="text-sm">max=5</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<h4>Variants & Colors</h4>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as c}
					<AvatarGroup items={nameItems.slice(0, 3)} variant={item.id as any} color={c.id as any} />
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<h4>Sizes</h4>
	<Card>
		<div class="wrap gap-6 center">
			{#each sizeOptions as s}
				<div class="stack gap-2 center">
					<AvatarGroup items={sampleItems.slice(0, 4)} size={s.id as any} />
					<span class="text-sm">{s.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<h4>With Initials</h4>
	<Card>
		<p class="text-sm mb-4">
			Avatars without images display initials from the <code>name</code> prop.
		</p>
		<div class="wrap gap-8 center">
			<AvatarGroup items={nameItems} max={4} />
			<AvatarGroup items={nameItems} max={4} variant="soft" />
		</div>
	</Card>
</Section>

<Section>
	<h4>AvatarGroup Props</h4>
	<DocsProps {props} />
</Section>

<Section>
	<h4>AvatarItem Type</h4>
	<DocsProps props={avatarItemProps} />
</Section>
