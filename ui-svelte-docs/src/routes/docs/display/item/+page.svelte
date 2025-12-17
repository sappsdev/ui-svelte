<script lang="ts">
	import { Item, Card, Checkbox, Code, Section, Select, IconButton } from 'ui-svelte';
	import { HeartAngleLinearIcon, PenLinearIcon, TrashLinearIcon } from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'surface', label: 'Surface' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const statusOptions = [
		{ id: '', label: 'None' },
		{ id: 'online', label: 'Online' },
		{ id: 'offline', label: 'Offline' },
		{ id: 'busy', label: 'Busy' },
		{ id: 'away', label: 'Away' }
	];

	let color: any = $state('default');
	let variant: any = $state('ghost');
	let size: any = $state('md');
	let status: any = $state('');

	let hasIcon = $state(false);
	let hasSrc = $state(true);
	let hasDescription = $state(true);
	let hasActions = $state(false);
	let isActive = $state(false);
	let isFocused = $state(false);
	let isDisabled = $state(false);
	let isCompact = $state(false);
	let hasDivider = $state(false);
	let hasShadow = $state(false);
	let isClickable = $state(false);

	let hasProps = $derived(
		[
			color !== 'default',
			variant !== 'ghost',
			size !== 'md',
			status,
			hasIcon,
			hasSrc,
			hasDescription,
			hasActions,
			isActive,
			isFocused,
			isDisabled,
			isCompact,
			hasDivider,
			hasShadow,
			isClickable
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Item } from 'ui-svelte';`,
			hasIcon && `\timport { HeartAngleLinearIcon } from '$lib/icons';`,
			isClickable && `\n\tconst handleClick = (id: string | number) => {`,
			isClickable && `\t\tconsole.log('Item clicked:', id);`,
			isClickable && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Item`,
			`\tid="1"`,
			`\tlabel="Item Label"`,
			hasDescription && `\tdescription="Item description text"`,
			hasIcon && `\ticon={HeartAngleLinearIcon}`,
			hasSrc && `\tsrc="/avatar.jpg"`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			status && `\tstatus="${status}"`,
			isClickable && `\tonclick={handleClick}`,
			isActive && `\tisActive`,
			isFocused && `\tisFocused`,
			isDisabled && `\tisDisabled`,
			isCompact && `\tisCompact`,
			hasDivider && `\thasDivider`,
			hasShadow && `\thasShadow`,
			hasProps && `/>`,
			!hasProps && `<Item id="1" label="Item Label" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'id', type: 'string | number', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'src', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'default'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'ghost'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'status', type: 'online | offline | busy | away', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(id: string | number) => void', initial: '' },
		{ prop: 'isActive', type: 'boolean', initial: 'false' },
		{ prop: 'isFocused', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'isCompact', type: 'boolean', initial: 'false' },
		{ prop: 'hasDivider', type: 'boolean', initial: 'false' },
		{ prop: 'hasShadow', type: 'boolean', initial: 'false' },
		{ prop: 'actions', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Item" llmUrl="https://ui-svelte.sappsdev.com/llm/display/item.md">
	Item component for displaying list items with avatar, icon, label, description, and actions.
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
				label="Status"
				size="sm"
				options={statusOptions}
				bind:value={status}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasIcon} label="Icon" />
			<Checkbox bind:checked={hasSrc} label="Avatar" />
			<Checkbox bind:checked={hasDescription} label="Description" />
			<Checkbox bind:checked={hasActions} label="Actions" />
			<Checkbox bind:checked={isClickable} label="Clickable" />
			<Checkbox bind:checked={isActive} label="Active" />
			<Checkbox bind:checked={isFocused} label="Focused" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
			<Checkbox bind:checked={isCompact} label="Compact" />
			<Checkbox bind:checked={hasDivider} label="Divider" />
			<Checkbox bind:checked={hasShadow} label="Shadow" />
		</div>

		<div class="doc-preview">
			<Item
				id="1"
				label="Item Label"
				description={hasDescription ? 'Item description text' : undefined}
				icon={hasIcon ? HeartAngleLinearIcon : undefined}
				src={hasSrc ? 'https://i.pravatar.cc/150?img=1' : undefined}
				{color}
				{variant}
				{size}
				status={status || undefined}
				onclick={isClickable ? (id) => console.log('Item clicked:', id) : undefined}
				{isActive}
				{isFocused}
				{isDisabled}
				{isCompact}
				{hasDivider}
				{hasShadow}
			>
				{#snippet actions()}
					{#if hasActions}
						<IconButton icon={PenLinearIcon} size="sm" variant="ghost" />
						<IconButton icon={TrashLinearIcon} size="sm" variant="ghost" color="danger" />
					{/if}
				{/snippet}
			</Item>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<h4>Variants & Colors</h4>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<Item
						id={colorItem.id}
						label={item.label + ' ' + colorItem.label}
						variant={item.id as any}
						color={colorItem.id as any}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<h4>Sizes</h4>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as sizeItem}
					<Item
						id={sizeItem.id}
						label={item.label + ' ' + sizeItem.label}
						variant={item.id as any}
						size={sizeItem.id as any}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<h4>With Avatar & Description</h4>
	<Card>
		<div class="col gap-2">
			<Item
				id="1"
				label="John Doe"
				description="Software Engineer"
				src="https://i.pravatar.cc/150?img=1"
				status="online"
			/>
			<Item
				id="2"
				label="Jane Smith"
				description="Product Manager"
				src="https://i.pravatar.cc/150?img=2"
				status="busy"
			/>
			<Item
				id="3"
				label="Bob Johnson"
				description="UX Designer"
				src="https://i.pravatar.cc/150?img=3"
				status="away"
			/>
		</div>
	</Card>
</Section>

<Section>
	<h4>With Icon</h4>
	<Card>
		<div class="col gap-2">
			<Item
				id="1"
				label="Favorites"
				description="View your saved items"
				icon={HeartAngleLinearIcon}
			/>
			<Item
				id="2"
				label="Edit Profile"
				description="Update your information"
				icon={PenLinearIcon}
			/>
		</div>
	</Card>
</Section>

<Section>
	<h4>With Actions</h4>
	<Card>
		<div class="col gap-2">
			<Item
				id="1"
				label="John Doe"
				description="Software Engineer"
				src="https://i.pravatar.cc/150?img=1"
			>
				{#snippet actions()}
					<IconButton icon={PenLinearIcon} size="sm" variant="ghost" />
					<IconButton icon={TrashLinearIcon} size="sm" variant="ghost" color="danger" />
				{/snippet}
			</Item>
			<Item
				id="2"
				label="Jane Smith"
				description="Product Manager"
				src="https://i.pravatar.cc/150?img=2"
			>
				{#snippet actions()}
					<IconButton icon={PenLinearIcon} size="sm" variant="ghost" />
					<IconButton icon={TrashLinearIcon} size="sm" variant="ghost" color="danger" />
				{/snippet}
			</Item>
		</div>
	</Card>
</Section>

<Section>
	<h4>Interactive States</h4>
	<Card>
		<div class="col gap-2">
			<Item
				id="1"
				label="Clickable Item"
				description="Click to trigger action"
				src="https://i.pravatar.cc/150?img=4"
				onclick={(id) => console.log('Clicked:', id)}
			/>
			<Item
				id="2"
				label="Active Item"
				description="Currently selected"
				src="https://i.pravatar.cc/150?img=5"
				isActive
			/>
			<Item
				id="3"
				label="Focused Item"
				description="Has focus state"
				src="https://i.pravatar.cc/150?img=6"
				isFocused
			/>
			<Item
				id="4"
				label="Disabled Item"
				description="Cannot interact"
				src="https://i.pravatar.cc/150?img=7"
				isDisabled
			/>
		</div>
	</Card>
</Section>

<Section>
	<h4>The component accepts the following props:</h4>
	<DocsProps {props} />
</Section>
