<script lang="ts">
	import {
		Avatar,
		Button,
		Card,
		Checkbox,
		Code,
		Dropdown,
		IconButton,
		Section,
		Select
	} from 'ui-svelte';
	import {
		Person24RegularIcon,
		Settings24RegularIcon,
		SignOut24RegularIcon,
		HeartLinearIcon
	} from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	let variant: any = $state('primary');
	let hasHeader = $state(false);
	let hasFooter = $state(false);
	let hasIcons = $state(true);
	let hasDescriptions = $state(false);
	let triggerType: any = $state('button');

	const triggerOptions = [
		{ id: 'button', label: 'Button' },
		{ id: 'avatar', label: 'Avatar' }
	];

	const basicOptions = [
		{ id: 1, label: 'Profile', icon: Person24RegularIcon, href: '/profile' },
		{ id: 2, label: 'Settings', icon: Settings24RegularIcon, href: '/settings' },
		{ id: 3, label: 'Logout', icon: SignOut24RegularIcon, onclick: () => console.log('Logout') }
	];

	const optionsWithDescriptions = [
		{
			id: 1,
			label: 'Profile',
			description: 'View your profile',
			icon: Person24RegularIcon,
			href: '/profile'
		},
		{
			id: 2,
			label: 'Settings',
			description: 'Manage your preferences',
			icon: Settings24RegularIcon,
			href: '/settings'
		},
		{
			id: 3,
			label: 'Logout',
			description: 'Sign out of your account',
			icon: SignOut24RegularIcon,
			onclick: () => console.log('Logout')
		}
	];

	let currentOptions = $derived(hasDescriptions ? optionsWithDescriptions : basicOptions);

	let displayOptions = $derived(
		hasIcons ? currentOptions : currentOptions.map(({ icon, ...rest }) => rest)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Dropdown${triggerType === 'button' ? ', Button' : ', Avatar'} } from 'ui-svelte';`,
			hasIcons && `\timport { PersonIcon, SettingsIcon, LogoutIcon } from '$lib/icons';`,
			``,
			`\tconst options = [`,
			hasIcons && hasDescriptions
				? `\t\t{ id: 1, label: 'Profile', description: 'View your profile', icon: PersonIcon, href: '/profile' },`
				: hasIcons
					? `\t\t{ id: 1, label: 'Profile', icon: PersonIcon, href: '/profile' },`
					: hasDescriptions
						? `\t\t{ id: 1, label: 'Profile', description: 'View your profile', href: '/profile' },`
						: `\t\t{ id: 1, label: 'Profile', href: '/profile' },`,
			hasIcons && hasDescriptions
				? `\t\t{ id: 2, label: 'Settings', description: 'Manage preferences', icon: SettingsIcon, href: '/settings' },`
				: hasIcons
					? `\t\t{ id: 2, label: 'Settings', icon: SettingsIcon, href: '/settings' },`
					: hasDescriptions
						? `\t\t{ id: 2, label: 'Settings', description: 'Manage preferences', href: '/settings' },`
						: `\t\t{ id: 2, label: 'Settings', href: '/settings' },`,
			hasIcons && hasDescriptions
				? `\t\t{ id: 3, label: 'Logout', description: 'Sign out', icon: LogoutIcon, onclick: () => {} }`
				: hasIcons
					? `\t\t{ id: 3, label: 'Logout', icon: LogoutIcon, onclick: () => {} }`
					: hasDescriptions
						? `\t\t{ id: 3, label: 'Logout', description: 'Sign out', onclick: () => {} }`
						: `\t\t{ id: 3, label: 'Logout', onclick: () => {} }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			`<Dropdown`,
			`\t{options}`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			hasHeader && `>`,
			hasHeader && `\t{#snippet header()}`,
			hasHeader && `\t\t<p class="px-2 py-1 text-sm text-on-muted">Account Options</p>`,
			hasHeader && `\t{/snippet}`,
			hasFooter && !hasHeader && `>`,
			hasFooter && `\t{#snippet footer()}`,
			hasFooter && `\t\t<p class="px-2 py-1 text-xs text-on-muted">v1.0.0</p>`,
			hasFooter && `\t{/snippet}`,
			!hasHeader && !hasFooter && `>`,
			triggerType === 'button' ? `\t<Button>Open Menu</Button>` : `\t<Avatar name="John Doe" />`,
			`</Dropdown>`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'options', type: 'Option[]', initial: '[]' },
		{ prop: 'variant', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'children', type: 'Snippet', initial: 'required' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' }
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '' },
		{ prop: 'label', type: 'string', initial: 'required' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(option: Option) => void', initial: '' }
	];
</script>

<DocsHeader title="Dropdown" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/dropdown.md">
	Dropdown displays a list of actions or options triggered by a button or other element.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Dropdown options={displayOptions} {variant}>
			{#snippet header()}
				{#if hasHeader}
					<p class="px-2 py-1 text-sm text-on-muted">Account Options</p>
				{/if}
			{/snippet}
			{#snippet footer()}
				{#if hasFooter}
					<p class="px-2 py-1 text-xs text-on-muted">v1.0.0</p>
				{/if}
			{/snippet}
			{#if triggerType === 'button'}
				<Button>Open Menu</Button>
			{:else}
				<Avatar name="John Doe" />
			{/if}
		</Dropdown>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Trigger Type" size="sm" options={triggerOptions} bind:value={triggerType} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={hasIcons} label="Icons" />
			<Checkbox bind:checked={hasDescriptions} label="Descriptions" />
			<Checkbox bind:checked={hasHeader} label="Header" />
			<Checkbox bind:checked={hasFooter} label="Footer" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-3 center gap-6">
		{#snippet header()}
			<h4>Dropdown Triggers</h4>
		{/snippet}

		<div class="column center gap-2">
			<span class="text-sm text-on-muted">Button Trigger</span>
			<Dropdown options={basicOptions}>
				<Button>Actions</Button>
			</Dropdown>
		</div>

		<div class="column center gap-2">
			<span class="text-sm text-on-muted">Avatar Trigger</span>
			<Dropdown options={basicOptions}>
				<Avatar name="John Doe" />
			</Dropdown>
		</div>

		<div class="column center gap-2">
			<span class="text-sm text-on-muted">Icon Button Trigger</span>
			<Dropdown options={basicOptions}>
				<IconButton variant="ghost" icon={HeartLinearIcon} />
			</Dropdown>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-3 center gap-6">
		{#snippet header()}
			<h4>Dropdown Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			<div class="column center gap-2">
				<span class="text-sm text-on-muted">{item.label}</span>
				<Dropdown options={basicOptions} variant={item.id as any}>
					<Button variant={item.id as any}>{item.label}</Button>
				</Dropdown>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 center gap-6">
		{#snippet header()}
			<h4>Dropdown with Descriptions</h4>
		{/snippet}
		<Dropdown options={optionsWithDescriptions}>
			<Button>User Menu</Button>
		</Dropdown>
		<Dropdown options={optionsWithDescriptions}>
			<Avatar src="https://i.pravatar.cc/150?img=32" name="Jane Smith" />
		</Dropdown>
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 center gap-6">
		{#snippet header()}
			<h4>Dropdown with Header & Footer</h4>
		{/snippet}
		<Dropdown options={basicOptions}>
			{#snippet header()}
				<div class="px-3 py-2 border-b border-muted">
					<p class="font-medium">John Doe</p>
					<p class="text-xs text-on-muted">john@example.com</p>
				</div>
			{/snippet}
			{#snippet footer()}
				<div class="px-3 py-2 border-t border-muted text-xs text-on-muted">App version 1.0.0</div>
			{/snippet}
			<Avatar name="John Doe" />
		</Dropdown>
		<Dropdown options={basicOptions}>
			{#snippet header()}
				<div class="px-3 py-2 border-b border-muted">
					<p class="font-medium">Quick Actions</p>
				</div>
			{/snippet}
			<Button variant="outlined">More Options</Button>
		</Dropdown>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Basic Dropdown with Button -->
<Dropdown {options}>
	<Button>Open Menu</Button>
</Dropdown>

<!-- Dropdown with Avatar Trigger -->
<Dropdown {options}>
	<Avatar name="John Doe" />
</Dropdown>

<!-- Dropdown with Icon Button -->
<Dropdown {options}>
	<Button variant="ghost" startIcon={BellIcon} />
</Dropdown>

<!-- Dropdown with Variants -->
<Dropdown {options} variant="secondary">
	<Button variant="secondary">Secondary</Button>
</Dropdown>

<!-- Dropdown with Header and Footer -->
<Dropdown {options}>
	{#snippet header()}
		<div class="px-3 py-2">
			<p class="font-medium">User Account</p>
		</div>
	{/snippet}
	{#snippet footer()}
		<p class="px-3 py-2 text-xs">v1.0.0</p>
	{/snippet}
	<Avatar name="John Doe" />
</Dropdown>

<!-- Options with Icons and Descriptions -->
const options = [
	{ 
		id: 1, 
		label: 'Profile', 
		description: 'View your profile',
		icon: UserIcon, 
		href: '/profile' 
	},
	{ 
		id: 2, 
		label: 'Settings', 
		description: 'Manage preferences',
		icon: SettingsIcon, 
		onclick: () => openSettings() 
	}
];`}
		/>
	</Card>
</Section>

<DocsProps {props} />

<Section>
	<Card>
		{#snippet header()}
			<h4>Option Object</h4>
		{/snippet}
		<DocsProps props={optionProps} />
	</Card>
</Section>
