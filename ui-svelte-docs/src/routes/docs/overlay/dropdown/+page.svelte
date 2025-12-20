<script lang="ts">
	import { Dropdown, Button, Card, Checkbox, Code, Section, Select, Avatar } from 'ui-svelte';
	import { UserCircleLinearIcon } from '$lib/icons';
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

	const options = [
		{ id: 1, label: 'Profile', icon: UserCircleLinearIcon },
		{ id: 2, label: 'Settings', description: 'Manage your account' },
		{ id: 3, label: 'Logout', href: '#' }
	];

	let color: any = $state('primary');
	let showHeader = $state(false);
	let showFooter = $state(false);

	let hasProps = $derived([color !== 'primary'].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Dropdown, Button } from 'ui-svelte';`,
			`\timport { UserCircleLinearIcon } from '$lib/icons';`,
			``,
			`\tconst options = [`,
			`\t\t{ id: 1, label: 'Profile', icon: UserCircleLinearIcon },`,
			`\t\t{ id: 2, label: 'Settings', description: 'Manage your account' },`,
			`\t\t{ id: 3, label: 'Logout', href: '#' }`,
			`\t];`,
			`<\/script>`,
			``
		].filter(Boolean);

		const componentLines = [
			`<Dropdown`,
			`\t{options}`,
			color !== 'primary' && `\tcolor="${color}"`,
			`>`,
			`\t{#snippet header()}`,
			`\t\t<div class="p-2 border-b font-medium">My Account</div>`,
			`\t{/snippet}`,
			`\t{#snippet footer()}`,
			`\t\t<div class="p-2 border-t text-xs text-center text-muted-foreground">Version 1.0.0</div>`,
			`\t{/snippet}`,
			`\t<Button>Open Menu</Button>`,
			`</Dropdown>`
		];

		// Filter lines based on active props for cleaner code snippet
		const filteredComponentLines = [
			`<Dropdown`,
			`\t{options}`,
			color !== 'primary' && `\tcolor="${color}"`,
			`>`,
			showHeader && `\t{#snippet header()}`,
			showHeader && `\t\t<div class="p-2 border-b font-medium">My Account</div>`,
			showHeader && `\t{/snippet}`,
			`\t<Button>Open Menu</Button>`,
			showFooter && `\t{#snippet footer()}`,
			showFooter &&
				`\t\t<div class="p-2 border-t text-xs text-center text-muted-foreground">Version 1.0.0</div>`,
			showFooter && `\t{/snippet}`,
			`</Dropdown>`
		].filter(Boolean);

		return [...scriptLines, ...filteredComponentLines].join('\n');
	});

	const props = [
		{ prop: 'options', type: 'Option[]', initial: '[]' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' }
	];
</script>

<DocsHeader title="Dropdown" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/dropdown.md">
	Dropdowns display a list of actions or options to a user.
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
			<Checkbox bind:checked={showHeader} label="Header" />
			<Checkbox bind:checked={showFooter} label="Footer" />
		</div>

		<div class="doc-preview h-64 flex items-start justify-center">
			<Dropdown {options} {color}>
				{#snippet header()}
					{#if showHeader}
						<div class="p-2 border-b font-medium">My Account</div>
					{/if}
				{/snippet}
				<Button>Open Menu</Button>
				{#snippet footer()}
					{#if showFooter}
						<div class="p-2 border-t text-xs text-center text-muted-foreground">Version 1.0.0</div>
					{/if}
				{/snippet}
			</Dropdown>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="wrap gap-4 center h-64">
			{#each colorOptions as item}
				<Dropdown {options} color={item.id as any}>
					<Button color={item.id as any}>{item.label}</Button>
				</Dropdown>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Avatar Trigger</p>
	<Card>
		<div class="wrap gap-8 center h-64">
			<Dropdown {options} color="primary">
				<Avatar name="John Doe" size="md" />
			</Dropdown>
			<Dropdown {options} color="secondary">
				<Avatar src="https://i.pravatar.cc/150?img=3" alt="User" size="md" status="online" />
			</Dropdown>
			<Dropdown {options} color="success">
				<Avatar name="Jane Smith" size="lg" variant="soft" color="success" isBordered />
			</Dropdown>
		</div>
		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { Dropdown, Avatar } from 'ui-svelte';
	import { UserCircleLinearIcon } from '$lib/icons';

	const options = [
		{ id: 1, label: 'Profile', icon: UserCircleLinearIcon },
		{ id: 2, label: 'Settings', description: 'Manage your account' },
		{ id: 3, label: 'Logout', href: '#' }
	];
<\/script>

<!-- Initials Avatar -->
<Dropdown {options}>
	<Avatar name="John Doe" />
</Dropdown>

<!-- Image Avatar with Status -->
<Dropdown {options}>
	<Avatar src="/user.jpg" alt="User" status="online" />
</Dropdown>

<!-- Styled Avatar -->
<Dropdown {options} color="success">
	<Avatar name="Jane Smith" size="lg" variant="soft" color="success" isBordered />
</Dropdown>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
