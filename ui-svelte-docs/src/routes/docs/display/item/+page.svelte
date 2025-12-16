<script lang="ts">
	import { Card, Code, Item, Section, Select, Checkbox, IconButton, Badge } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import {
		Person24RegularIcon,
		LineHorizontal324RegularIcon,
		Heart24RegularIcon,
		Settings24RegularIcon,
		Search24RegularIcon
	} from '$lib/icons';

	const variantOptions = [
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' }
	];

	let variant: any = $state('ghost');
	let size: any = $state('md');
	let isActive = $state(false);
	let isDisabled = $state(false);
	let isCompact = $state(false);
	let hasDivider = $state(false);
	let hasShadow = $state(false);
	let isSolid = $state(false);

	let code = $derived(() => {
		const props = [];
		props.push(`label="John Doe"`);
		props.push(`description="Software Engineer"`);
		props.push(`src="/avatar.jpg"`);
		if (variant !== 'ghost') props.push(`variant="${variant}"`);
		if (size !== 'md') props.push(`size="${size}"`);
		if (isActive) props.push('isActive');
		if (isDisabled) props.push('isDisabled');
		if (isCompact) props.push('isCompact');
		if (hasDivider) props.push('hasDivider');
		if (hasShadow) props.push('hasShadow');
		if (isSolid) props.push('isSolid');

		return `<Item\n\t${props.join('\n\t')}\n/>`;
	});

	const props = [
		{
			name: 'id',
			type: 'string | number',
			default: '-',
			description: 'Unique identifier, required for onclick'
		},
		{ name: 'label', type: 'string', default: '-', description: 'Primary text label' },
		{
			name: 'description',
			type: 'string',
			default: '-',
			description: 'Secondary description text'
		},
		{ name: 'icon', type: 'IconData', default: '-', description: 'Icon to display on the left' },
		{ name: 'src', type: 'string', default: '-', description: 'Avatar image source URL' },
		{
			name: 'variant',
			type: "'ghost' | 'outlined' | 'surface' | 'primary' | 'secondary' | 'muted'",
			default: "'ghost'",
			description: 'Visual style variant'
		},
		{ name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the item' },
		{
			name: 'status',
			type: "'online' | 'offline' | 'busy' | 'away'",
			default: '-',
			description: 'Status indicator for avatar'
		},
		{ name: 'href', type: 'string', default: '-', description: 'Link URL, renders as anchor' },
		{ name: 'isDisabled', type: 'boolean', default: 'false', description: 'Disables interaction' },
		{ name: 'isActive', type: 'boolean', default: 'false', description: 'Active/selected state' },
		{ name: 'isFocused', type: 'boolean', default: 'false', description: 'Focused state styling' },
		{ name: 'isCompact', type: 'boolean', default: 'false', description: 'Reduces padding' },
		{ name: 'hasDivider', type: 'boolean', default: 'false', description: 'Shows bottom border' },
		{ name: 'hasShadow', type: 'boolean', default: 'false', description: 'Adds shadow effect' },
		{
			name: 'isSolid',
			type: 'boolean',
			default: 'false',
			description: 'Solid background on active'
		},
		{ name: 'onclick', type: '(id) => void', default: '-', description: 'Click handler callback' },
		{ name: 'actions', type: 'Snippet', default: '-', description: 'Slot for action buttons' },
		{ name: 'class', type: 'string', default: '-', description: 'Additional CSS classes' }
	];
</script>

<DocsHeader title="Item">
	A versatile list item component for displaying content with optional avatar, icon, description,
	and action buttons. Supports multiple variants, sizes, and interactive states.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<div class="column gap-2 w-full">
			<Item
				label="John Doe"
				description="Software Engineer"
				src="https://i.pravatar.cc/150?img=1"
				{variant}
				{size}
				{isActive}
				{isDisabled}
				{isCompact}
				{hasDivider}
				{hasShadow}
				{isSolid}
			/>
			<Item
				label="Jane Smith"
				description="Product Designer"
				src="https://i.pravatar.cc/150?img=2"
				{variant}
				{size}
				{isActive}
				{isDisabled}
				{isCompact}
				{hasDivider}
				{hasShadow}
				{isSolid}
			/>
			<Item
				label="Mike Johnson"
				description="Engineering Lead"
				src="https://i.pravatar.cc/150?img=3"
				{variant}
				{size}
				{isActive}
				{isDisabled}
				{isCompact}
				{hasShadow}
				{isSolid}
			/>
		</div>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={isActive} label="Active" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
			<Checkbox bind:checked={isCompact} label="Compact" />
			<Checkbox bind:checked={hasDivider} label="Divider" />
			<Checkbox bind:checked={hasShadow} label="Shadow" />
			<Checkbox bind:checked={isSolid} label="Solid" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- With Icon -->
	<Card>
		{#snippet header()}
			<h4>With Icon</h4>
		{/snippet}
		<Item label="Notifications" description="Manage alerts" icon={Settings24RegularIcon} />
		{#snippet footer()}
			<code class="text-xs">icon=&#123;Settings24RegularIcon&#125;</code>
		{/snippet}
	</Card>

	<!-- With Avatar -->
	<Card>
		{#snippet header()}
			<h4>With Avatar</h4>
		{/snippet}
		<Item
			label="John Doe"
			description="Online"
			src="https://i.pravatar.cc/150?img=1"
			status="online"
		/>
		{#snippet footer()}
			<code class="text-xs">src="..." status="online"</code>
		{/snippet}
	</Card>

	<!-- With Actions -->
	<Card>
		{#snippet header()}
			<h4>With Actions</h4>
		{/snippet}
		<Item label="Jane Smith" description="Designer" src="https://i.pravatar.cc/150?img=2">
			{#snippet actions()}
				<IconButton icon={LineHorizontal324RegularIcon} size="sm" variant="ghost" />
			{/snippet}
		</Item>
		{#snippet footer()}
			<code class="text-xs">&#123;#snippet actions()&#125;</code>
		{/snippet}
	</Card>

	<!-- Interactive -->
	<Card>
		{#snippet header()}
			<h4>Interactive (Link)</h4>
		{/snippet}
		<Item label="View Profile" description="Go to user page" icon={Person24RegularIcon} href="#" />
		{#snippet footer()}
			<code class="text-xs">href="#"</code>
		{/snippet}
	</Card>

	<!-- Active State -->
	<Card>
		{#snippet header()}
			<h4>Active State</h4>
		{/snippet}
		<Item
			label="Selected Item"
			description="Currently active"
			icon={Heart24RegularIcon}
			variant="primary"
			isActive
		/>
		{#snippet footer()}
			<code class="text-xs">variant="primary" isActive</code>
		{/snippet}
	</Card>

	<!-- Compact -->
	<Card>
		{#snippet header()}
			<h4>Compact Mode</h4>
		{/snippet}
		<Item label="Compact Item" description="Less padding" icon={Search24RegularIcon} isCompact />
		{#snippet footer()}
			<code class="text-xs">isCompact</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Props</h4>
		{/snippet}
		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Prop</th>
						<th class="text-left p-3 font-semibold">Type</th>
						<th class="text-left p-3 font-semibold">Default</th>
						<th class="text-left p-3 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each props as prop}
						<tr class="border-b border-muted-100">
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.name}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.default}</code></td>
							<td class="p-3 text-sm">{prop.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Interactive Items:</strong> Provide either
					<code class="px-1 py-0.5 bg-blue rounded">href</code>
					or <code class="px-1 py-0.5 bg-blue rounded">onclick</code> to make items clickable
				</li>
				<li>
					<strong>Lists:</strong> Use <code class="px-1 py-0.5 bg-blue rounded">hasDivider</code> for
					traditional list styling with separators
				</li>
				<li>
					<strong>Active States:</strong> Combine
					<code class="px-1 py-0.5 bg-blue rounded">variant</code>
					with
					<code class="px-1 py-0.5 bg-blue rounded">isActive</code> for selection indicators
				</li>
				<li>
					<strong>Actions Slot:</strong> Use the actions snippet to add buttons, badges, or other controls
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<script>
	import { Item, IconButton } from 'ui-svelte';
	import { Person24RegularIcon, LineHorizontal324RegularIcon } from '$lib/icons';
<\/script>

<!-- Basic Item -->
<Item label="John Doe" description="Software Engineer" />

<!-- With Avatar and Status -->
<Item
	label="Jane Smith"
	description="Online"
	src="/avatar.jpg"
	status="online"
/>

<!-- With Icon -->
<Item label="Settings" description="Manage preferences" icon={Person24RegularIcon} />

<!-- Interactive Link -->
<Item label="View Profile" href="/profile" icon={Person24RegularIcon} />

<!-- With Click Handler -->
<Item
	id="user-1"
	label="Select User"
	onclick={(id) => console.log('Selected:', id)}
/>

<!-- With Actions -->
<Item label="User Name" description="Role">
	{#snippet actions()}
		<IconButton icon={LineHorizontal324RegularIcon} size="sm" />
	{/snippet}
</Item>

<!-- Active State with Variant -->
<Item
	label="Selected Item"
	variant="primary"
	isActive
	isSolid
/>`}
		/>
	</Card>
</Section>
