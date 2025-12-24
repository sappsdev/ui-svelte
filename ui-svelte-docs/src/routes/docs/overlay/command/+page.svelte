<script lang="ts">
	import {
		Button,
		Card,
		Checkbox,
		Code,
		Command,
		IconButton,
		Section,
		Select,
		useSearch
	} from 'ui-svelte';
	import {
		Search24RegularIcon,
		HomeLinearIcon,
		SettingsLinearIcon,
		UserCircleLinearIcon,
		FileDocumentIcon
	} from '$lib/icons';
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
		{ id: 'soft', label: 'Soft' }
	];

	let color: any = $state('default');
	let variant: any = $state('solid');
	let hideCloseButton = $state(true);

	// Demo search state
	const demoOptions = [
		{
			id: 1,
			label: 'Dashboard',
			description: 'Go to dashboard',
			icon: HomeLinearIcon,
			href: '/docs/overlay/command'
		},
		{
			id: 2,
			label: 'Settings',
			description: 'Manage your settings',
			icon: SettingsLinearIcon,
			href: '/docs/overlay/command'
		},
		{
			id: 3,
			label: 'Profile',
			description: 'View your profile',
			icon: UserCircleLinearIcon,
			href: '/docs/overlay/command'
		},
		{
			id: 4,
			label: 'Documents',
			description: 'Browse documents',
			icon: FileDocumentIcon,
			href: '/docs/overlay/command'
		},
		{ id: 5, label: 'Search Files', description: 'Find files quickly' },
		{ id: 6, label: 'New Project', description: 'Create a new project' },
		{ id: 7, label: 'Team Members', description: 'Manage team' },
		{ id: 8, label: 'Analytics', description: 'View analytics' }
	];

	const search = useSearch({
		options: demoOptions,
		clientSide: true
	});

	// Demo for colors
	const colorSearches = colorOptions.map((c) =>
		useSearch({
			options: demoOptions.slice(0, 4),
			clientSide: true
		})
	);

	// Demo for variants
	const variantSearches = variantOptions.map((v) =>
		useSearch({
			options: demoOptions.slice(0, 4),
			clientSide: true
		})
	);

	// Demo for IconButton trigger
	const iconSearch = useSearch({
		options: demoOptions,
		clientSide: true
	});

	let selectedItem: any = $state(null);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Command, Button, useSearch } from 'ui-svelte';`,
			`\timport { HomeLinearIcon, SettingsLinearIcon } from '$lib/icons';`,
			``,
			`\tconst search = useSearch({`,
			`\t\toptions: [`,
			`\t\t\t{ id: 1, label: 'Dashboard', icon: HomeLinearIcon, href: '/dashboard' },`,
			`\t\t\t{ id: 2, label: 'Settings', icon: SettingsLinearIcon, href: '/settings' }`,
			`\t\t],`,
			`\t\tclientSide: true`,
			`\t});`,
			``,
			`\tconst handleSelect = (item) => {`,
			`\t\tconsole.log('Selected:', item);`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Command`,
			`\t{search}`,
			color !== 'default' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			!hideCloseButton && `\thideCloseButton={false}`,
			`\tplaceholder="Search commands..."`,
			`\tonselect={handleSelect}`,
			`>`,
			`\t{#snippet trigger()}`,
			`\t\t<Button>Open Command</Button>`,
			`\t{/snippet}`,
			`</Command>`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'search', type: 'SearchState', initial: 'required' },
		{ prop: 'open', type: 'boolean', initial: 'false' },
		{ prop: 'placeholder', type: 'string', initial: 'Search...' },
		{ prop: 'emptyText', type: 'string', initial: 'No results found' },
		{ prop: 'loadingText', type: 'string', initial: 'Loading...' },
		{ prop: 'loadingMoreText', type: 'string', initial: 'Loading more...' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger | surface | default',
			initial: 'default'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'solid'
		},
		{ prop: 'hideCloseButton', type: 'boolean', initial: 'true' },
		{ prop: 'onselect', type: '(item: SearchOption) => void', initial: '' },
		{ prop: 'trigger', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Command" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/command.md">
	Command palette component for quick navigation and actions. Uses Modal for overlay, TextField for
	search, and Item for results.
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hideCloseButton} label="Hide Close Button" />
		</div>

		<div class="doc-preview">
			<Command
				{search}
				{color}
				{variant}
				{hideCloseButton}
				placeholder="Search commands..."
				onselect={(item) => (selectedItem = item)}
			>
				{#snippet trigger()}
					<Button>Open Command</Button>
				{/snippet}
			</Command>
			{#if selectedItem}
				<p class="text-sm text-muted mt-2">Selected: {selectedItem.label}</p>
			{/if}
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each variantOptions as item, i}
				<Command
					search={variantSearches[i]}
					variant={item.id as any}
					color="primary"
					placeholder="Search..."
				>
					{#snippet trigger()}
						<Button variant={item.id as any}>{item.label} Command</Button>
					{/snippet}
				</Command>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each colorOptions as item, i}
				<Command search={colorSearches[i]} color={item.id as any} placeholder="Search...">
					{#snippet trigger()}
						<Button color={item.id === 'default' ? 'muted' : (item.id as any)} size="sm">
							{item.label}
						</Button>
					{/snippet}
				</Command>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With IconButton Trigger</p>
	<Card>
		<div class="wrap gap-4 center">
			<Command search={iconSearch} placeholder="Type to search...">
				{#snippet trigger()}
					<IconButton icon={Search24RegularIcon} variant="soft" />
				{/snippet}
			</Command>
			<Command search={iconSearch} color="primary" placeholder="Search anything...">
				{#snippet trigger()}
					<IconButton icon={Search24RegularIcon} color="primary" />
				{/snippet}
			</Command>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Keyboard Navigation</p>
	<Card>
		<div class="col gap-2">
			<p class="card-description">The Command component supports full keyboard navigation:</p>
			<ul class="list-disc pl-6 text-sm text-muted">
				<li><strong>Arrow Down/Up</strong> - Navigate through results</li>
				<li><strong>Enter</strong> - Select focused item</li>
				<li><strong>Escape</strong> - Close the command palette</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
