<script lang="ts">
	import { Button, Card, Checkbox, Code, Command, Section, Select, useSearch } from 'ui-svelte';
	import {
		HomeLinearIcon,
		SettingsLinearIcon,
		UserCircleLinearIcon,
		FileDocumentIcon,
		Search24RegularIcon,
		Rocket24RegularIcon,
		Person24RegularIcon,
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

	let color: any = $state('muted');
	let disableOverlayClose = $state(false);
	let disableGlobalShortcut = $state(false);
	let showFooter = $state(true);

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
		{ id: 5, label: 'Search Files', description: 'Find files quickly', icon: Search24RegularIcon },
		{ id: 6, label: 'New Project', description: 'Create a new project', icon: Rocket24RegularIcon },
		{ id: 7, label: 'Team Members', description: 'Manage team', icon: Person24RegularIcon },
		{ id: 8, label: 'Analytics', description: 'View analytics', icon: ChartLinearIcon }
	];

	const search = useSearch({
		options: demoOptions,
		clientSide: true
	});

	const colorSearch = useSearch({
		options: demoOptions.slice(0, 4),
		clientSide: true
	});

	const groupSearch = useSearch({
		options: demoOptions,
		clientSide: true
	});

	const demoGroups = [
		{
			label: 'Pages',
			icon: HomeLinearIcon,
			options: demoOptions.slice(0, 4)
		},
		{
			label: 'Actions',
			icon: Rocket24RegularIcon,
			options: demoOptions.slice(4)
		}
	];

	let open = $state(false);
	let openColors = $state(false);
	let openGroups = $state(false);

	let selectedColor: any = $state('muted');
	let selectedItem: any = $state(null);

	const handleOpenColor = (colorId: string) => {
		selectedColor = colorId;
		openColors = true;
	};

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
			`\tlet open = $state(false);`,
			``,
			`\tconst handleSelect = (item) => {`,
			`\t\tconsole.log('Selected:', item);`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Button onclick={() => (open = true)}>Open Command</Button>`,
			``,
			`<Command`,
			`\tbind:open`,
			`\t{search}`,
			color !== 'muted' && `\tcolor="${color}"`,
			disableOverlayClose && `\tdisableOverlayClose`,
			disableGlobalShortcut && `\tdisableGlobalShortcut`,
			!showFooter && `\tshowFooter={false}`,
			`\tlabels={{ placeholder: 'Search commands...' }}`,
			`\tonselect={handleSelect}`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'search', type: 'SearchState', initial: 'required' },
		{ prop: 'open', type: 'boolean', initial: 'false' },
		{ prop: 'labels', type: 'CommandLabels', initial: '{}' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger',
			initial: 'muted'
		},
		{ prop: 'disableOverlayClose', type: 'boolean', initial: 'false' },
		{ prop: 'disableGlobalShortcut', type: 'boolean', initial: 'false' },
		{ prop: 'shortcut', type: 'string', initial: 'k' },
		{ prop: 'showFooter', type: 'boolean', initial: 'true' },
		{ prop: 'groups', type: 'CommandGroup[]', initial: '' },
		{ prop: 'onselect', type: '(item: SearchOption) => void', initial: '' },
		{ prop: 'onclose', type: '() => void', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Command" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/command.md">
	Command palette component for quick navigation and actions. Opens via state binding like Modal.
	Supports grouped options, global keyboard shortcuts (Cmd/Ctrl+K), and infinite scroll loading.
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={disableOverlayClose} label="Disable Overlay Close" />
			<Checkbox bind:checked={disableGlobalShortcut} label="Disable Global Shortcut" />
			<Checkbox bind:checked={showFooter} label="Show Footer" />
		</div>

		<div class="doc-preview">
			<Button onclick={() => (open = true)}>Open Command</Button>
			<Command
				bind:open
				{search}
				{color}
				{disableOverlayClose}
				{disableGlobalShortcut}
				{showFooter}
				labels={{ placeholder: 'Search commands...' }}
				onselect={(item) => (selectedItem = item)}
			/>
			{#if selectedItem}
				<p class="text-sm mt-2">Selected: {selectedItem.label}</p>
			{/if}
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each colorOptions as item}
				<Button color={item.id as any} size="sm" onclick={() => handleOpenColor(item.id)}>
					{item.label}
				</Button>
			{/each}
		</div>
		<Command
			bind:open={openColors}
			search={colorSearch}
			color={selectedColor}
			labels={{ placeholder: 'Search...' }}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Groups</p>
	<Card>
		<div class="col gap-4">
			<p class="card-description">
				Use the <code>groups</code> prop to organize options into labeled categories. Items without icons
				automatically display a bullet dot and hover indicator for better visual feedback.
			</p>
			<div class="wrap gap-4 center">
				<Button onclick={() => (openGroups = true)}>Open Grouped Command</Button>
			</div>
			<Command
				bind:open={openGroups}
				search={groupSearch}
				groups={demoGroups}
				labels={{ placeholder: 'Search pages and actions...' }}
			/>
			<Code
				lang="svelte"
				code={`<Command
  bind:open
  {search}
  groups={[
    { label: 'Pages', icon: HomeLinearIcon, options: [...] },
    { label: 'Actions', icon: RocketIcon, options: [...] }
  ]}
  labels={{ placeholder: 'Search...' }}
/>`}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Keyboard Navigation</p>
	<Card>
		<div class="col gap-2">
			<p class="card-description">The Command component supports full keyboard navigation:</p>
			<ul class="list-disc pl-6 text-sm">
				<li><strong>Cmd/Ctrl + K</strong> - Toggle command palette (global shortcut)</li>
				<li><strong>Arrow Down/Up</strong> - Navigate through results</li>
				<li><strong>Enter</strong> - Select focused item</li>
				<li><strong>Escape</strong> - Close the command palette</li>
			</ul>
			<p class="card-description mt-4">
				The global shortcut can be customized via the <code>shortcut</code> prop or disabled with
				<code>disableGlobalShortcut</code>.
			</p>
			<Code
				lang="svelte"
				code={`<!-- Custom shortcut: Cmd/Ctrl + P -->
<Command
  bind:open
  {search}
  shortcut="p"
/>

<!-- Disable global shortcut -->
<Command
  bind:open
  {search}
  disableGlobalShortcut
/>`}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
