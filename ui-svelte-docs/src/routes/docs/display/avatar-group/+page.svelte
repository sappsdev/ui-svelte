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

	let autoFit = $state(false);
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
		[
			color !== 'primary',
			variant !== 'solid',
			size !== 'md',
			max,
			autoFit,
			isInline,
			isBordered
		].some(Boolean)
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
			autoFit && `\tautoFit`,
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
		{ prop: 'autoFit', type: 'boolean', initial: 'false' },
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
			<Checkbox bind:checked={autoFit} label="Auto Fit" />
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
				{autoFit}
				{isInline}
				{isBordered}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Stacked vs Inline</p>
	<Card color="background" variant="outlined">
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
	<p class="section-subtitle">Max Limit</p>
	<Card color="background" variant="outlined">
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
	<p class="section-subtitle">Auto Fit</p>
	<Card color="background" variant="outlined">
		<p class="text-sm mb-4">
			Use the <code>autoFit</code> prop to automatically show only the avatars that fit in the container.
			Remaining avatars are added to the counter. Resize the container to see it in action.
		</p>
		<div class="wrap gap-8 center">
			<div class="stack gap-2 w-full">
				<div
					class="p-4 bd-default rounded-lg resize-x overflow-auto"
					style="max-width: 300px; min-width: 100px;"
				>
					<AvatarGroup items={sampleItems} autoFit />
				</div>
				<span class="text-sm">↔ Drag to resize</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
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
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
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
	<p class="section-subtitle">With Initials</p>
	<Card color="background" variant="outlined">
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
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">AvatarItem Type</p>
	<DocsProps props={avatarItemProps} />
</Section>
