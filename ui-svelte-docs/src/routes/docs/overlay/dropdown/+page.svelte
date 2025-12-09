<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Dropdown, Button, Checkbox, Select } from 'ui-svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const dropdownOptions = [
		{
			id: '1',
			label: 'Profile',
			icon: 'fluent:people-24-regular',
			description: 'View your profile'
		},
		{
			id: '2',
			label: 'Settings',
			icon: 'fluent:settings-24-regular',
			description: 'Manage preferences'
		},
		{
			id: '3',
			label: 'Team',
			icon: 'fluent:people-24-regular',
			description: 'Invite team members'
		},
		{
			id: '4',
			label: 'Billing',
			icon: 'fluent:payment-24-regular',
			description: 'Manage subscription'
		},
		{ id: '5', label: 'Logout', icon: 'fluent:panel-right-contract-24-regular' }
	];

	// Selects
	let variant: any = $state('primary');

	// States
	let withIcon = $state(false);
	let withDescription = $state(false);
	let withAvatar = $state(false);
	let withHeader = $state(false);
	let withFooter = $state(false);
	let withHref = $state(false);

	let buildOptions: any = $derived.by(() => {
		return dropdownOptions.map((option) => ({
			...option,
			description: withDescription ? option.description : undefined,
			icon: withIcon && !withAvatar ? option.icon : undefined,
			src: withAvatar ? `/avatar-${option.id}.jpeg` : undefined,
			href: withHref ? `#${option.label.toLowerCase()}` : undefined
		}));
	});

	let hasProps = $derived(
		[
			variant !== 'primary',
			withIcon,
			withDescription,
			withAvatar,
			withHeader,
			withFooter,
			withHref
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Dropdown, Button } from 'ui-svelte';`,
			`\n\tconst options = [`,
			`\t\t{ id: '1', label: 'Profile'${withIcon && !withAvatar ? ", icon: 'User'" : ''}${withAvatar ? ", src: '/avatar-1.jpeg'" : ''}${withDescription ? ", description: 'View your profile'" : ''}${withHref ? ", href: '#profile'" : ''} },`,
			`\t\t{ id: '2', label: 'Settings'${withIcon && !withAvatar ? ", icon: 'Settings'" : ''}${withAvatar ? ", src: '/avatar-2.jpeg'" : ''}${withDescription ? ", description: 'Manage preferences'" : ''}${withHref ? ", href: '#settings'" : ''} },`,
			`\t\t{ id: '3', label: 'Logout'${withIcon && !withAvatar ? ", icon: 'LogOut'" : ''}${withAvatar ? ", src: '/avatar-3.jpeg'" : ''}${withHref ? ", href: '#logout'" : ''} }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Dropdown`,
			hasProps && `\toptions={options}`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			hasProps && `>`,
			withHeader && `\t{#snippet header()}`,
			withHeader && `\t\t<div class="px-4 py-2 border-b">`,
			withHeader && `\t\t\t<p class="font-semibold">Account</p>`,
			withHeader && `\t\t\t<p class="text-sm text-muted-foreground">user@example.com</p>`,
			withHeader && `\t\t</div>`,
			withHeader && `\t{/snippet}`,
			`\t<Button>Open Menu</Button>`,
			withFooter && `\t{#snippet footer()}`,
			withFooter && `\t\t<div class="px-4 py-2 border-t">`,
			withFooter && `\t\t\t<p class="text-xs text-muted-foreground">Version 1.0.0</p>`,
			withFooter && `\t\t</div>`,
			withFooter && `\t{/snippet}`,
			hasProps && `</Dropdown>`,
			!hasProps && `<Dropdown options={options}>`,
			!hasProps && `\t<Button>Open Menu</Button>`,
			!hasProps && `</Dropdown>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'options', type: 'Option[]', initial: '[]', required: true },
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'variant', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' }
	];

	const optionProps = [
		{ prop: 'id', type: 'string | number', initial: '' },
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '(option: Option) => void', initial: '' }
	];
</script>

{#snippet preview()}
	<Dropdown options={buildOptions} {variant}>
		{#snippet header()}
			{#if withHeader}
				<div class="px-4 py-2 border-b">
					<p class="font-semibold">Account</p>
					<p class="text-sm text-muted-foreground">user@example.com</p>
				</div>
			{/if}
		{/snippet}
		<Button>Open Menu</Button>
		{#snippet footer()}
			{#if withFooter}
				<div class="px-4 py-2 border-t">
					<p class="text-xs text-muted-foreground">Version 1.0.0</p>
				</div>
			{/if}
		{/snippet}
	</Dropdown>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />

	<DocOptions title="Options Content">
		<Checkbox bind:checked={withIcon} label="Icon" />
		<Checkbox bind:checked={withDescription} label="Description" />
		<Checkbox bind:checked={withAvatar} label="Avatar" />
		<Checkbox bind:checked={withHref} label="Links (href)" />
	</DocOptions>

	<DocOptions title="Snippets">
		<Checkbox bind:checked={withHeader} label="Header" />
		<Checkbox bind:checked={withFooter} label="Footer" />
	</DocOptions>
{/snippet}

<DocHeader title="Dropdown">
	Dropdown components display a menu of options when triggered by a button or other element.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Option Type</h3>
	<p>Each option in the options array should follow this structure:</p>
</div>

<DocProps props={optionProps} />

<div class="prose mt-8">
	<h3>Usage Notes</h3>
	<ul>
		<li>
			The <code>children</code> snippet is required and typically contains the trigger element (e.g.,
			a Button).
		</li>
		<li>
			Use the <code>header</code> snippet for displaying user info or context at the top of the dropdown.
		</li>
		<li>
			Use the <code>footer</code> snippet for additional information or actions at the bottom.
		</li>
		<li>
			Options can include icons or avatars (via <code>src</code>), but not both simultaneously.
		</li>
		<li>
			When <code>href</code> is provided, the option will render as a link instead of a button.
		</li>
		<li>Use <code>onclick</code> for custom actions when an option is clicked.</li>
	</ul>
</div>
