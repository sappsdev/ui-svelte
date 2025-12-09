<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, Item } from 'ui-svelte';

	const variantOptions = [
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const statusOptions = [
		{ id: 'online', label: 'Online' },
		{ id: 'offline', label: 'Offline' },
		{ id: 'busy', label: 'Busy' },
		{ id: 'away', label: 'Away' }
	];

	// Selects
	let variant: any = $state('ghost');
	let size: any = $state('md');
	let status: any = $state('');

	// Props
	let label = $state('John Doe');
	let description = $state('');
	let icon = $state('');
	let href = $state('');

	// States
	let withAvatar = $state(false);
	let withDescription = $state(false);
	let withIcon = $state(false);
	let withStatus = $state(false);
	let withHref = $state(false);
	let isDisabled = $state(false);
	let isActive = $state(false);
	let isCompact = $state(false);
	let hasDivider = $state(false);
	let hasShadow = $state(false);
	let isSolid = $state(false);
	let withActions = $state(false);

	let hasProps = $derived(
		[
			variant !== 'ghost',
			size !== 'md',
			description,
			icon,
			withAvatar,
			status,
			href,
			isDisabled,
			isActive,
			isCompact,
			hasDivider,
			hasShadow,
			isSolid,
			withActions
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Item } from 'ui-svelte';`,
			withActions && `\timport { Button } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Item`,
			hasProps && `\tlabel="${label}"`,
			withDescription && description && `\tdescription="${description}"`,
			withIcon && icon && `\ticon="${icon}"`,
			withAvatar && `\tsrc="/avatar-1.jpeg"`,
			variant !== 'ghost' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			withStatus && status && `\tstatus="${status}"`,
			withHref && href && `\thref="${href}"`,
			isDisabled && `\tisDisabled`,
			isActive && `\tisActive`,
			isCompact && `\tisCompact`,
			hasDivider && `\thasDivider`,
			hasShadow && `\thasShadow`,
			isSolid && `\tisSolid`,
			withActions && `\tonclick={(id) => console.log('Clicked:', id)}`,
			hasProps && !withActions && `/>`,
			withActions && `>`,
			withActions && `\t{#snippet actions()}`,
			withActions && `\t\t<Button variant="ghost" size="sm">Edit</Button>`,
			withActions && `\t\t<Button variant="ghost" size="sm">Delete</Button>`,
			withActions && `\t{/snippet}`,
			withActions && `</Item>`,
			!hasProps && `<Item label="${label}" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'id', type: 'string | number', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'src', type: 'string', initial: '' },
		{
			prop: 'variant',
			type: 'ghost | outline | surface | primary | secondary | soft',
			initial: 'ghost'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'status', type: 'online | offline | busy | away', initial: '' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'isActive', type: 'boolean', initial: 'false' },
		{ prop: 'isCompact', type: 'boolean', initial: 'false' },
		{ prop: 'hasDivider', type: 'boolean', initial: 'false' },
		{ prop: 'hasShadow', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' },
		{ prop: 'onclick', type: '(id: string | number) => void', initial: '' },
		{ prop: 'actions', type: 'Snippet', initial: '' }
	];
</script>

{#snippet actions()}
	<button>Edit</button>
	<button>Delete</button>
{/snippet}

{#snippet preview()}
	<Item
		{label}
		description={withDescription && description ? description : undefined}
		icon={withIcon && icon ? icon : undefined}
		src={withAvatar ? '/avatar-1.jpeg' : undefined}
		{variant}
		{size}
		{isSolid}
		status={withStatus && status ? status : undefined}
		href={withHref && href ? href : undefined}
		{isDisabled}
		{isActive}
		{isCompact}
		{hasDivider}
		{hasShadow}
		actions={withActions ? actions : undefined}
		onclick={withActions ? (id) => console.log('Clicked:', id) : undefined}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />

	<DocOptions title="Visual Elements">
		<Checkbox
			bind:checked={withAvatar}
			onchange={(v) => {
				if (v) withIcon = false;
			}}
			label="Avatar"
		/>
		<Checkbox
			bind:checked={withIcon}
			onchange={(v) => {
				if (v) {
					withAvatar = false;
					icon = 'user';
				} else {
					icon = '';
				}
			}}
			label="Icon"
		/>
		<Checkbox
			bind:checked={withDescription}
			onchange={(v) => (v ? (description = 'Designer at Company') : (description = ''))}
			label="Description"
		/>
		<Checkbox
			bind:checked={withStatus}
			onchange={(v) => (v ? (status = 'online') : (status = ''))}
			label="Status"
		/>
	</DocOptions>

	<DocOptions title="Status">
		{#if withStatus}
			<Select label="Status" size="sm" options={statusOptions} bind:value={status} />
		{/if}
	</DocOptions>

	<DocOptions title="Behavior">
		<Checkbox
			bind:checked={withHref}
			onchange={(v) => (v ? (href = '/profile') : (href = ''))}
			label="Link (href)"
		/>
		<Checkbox bind:checked={withActions} label="Actions Snippet" />
		<Checkbox bind:checked={isDisabled} label="Disabled" />
		<Checkbox bind:checked={isActive} label="Selected" />
	</DocOptions>

	<DocOptions title="Layout">
		<Checkbox bind:checked={isCompact} label="Compact" />
		<Checkbox bind:checked={hasDivider} label="Divider" />
		<Checkbox bind:checked={hasShadow} label="Shadow" />
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Item">
	Item components display information with optional avatars, icons, descriptions, and actions.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Usage Examples</h3>
	<p>The Item component is versatile and can be used in various contexts:</p>
	<ul>
		<li><strong>Lists:</strong> Display user profiles, contacts, or any list items</li>
		<li><strong>Navigation:</strong> Use with href prop for navigable items</li>
		<li><strong>Selection:</strong> Use with active prop for selectable lists</li>
		<li><strong>Actions:</strong> Add action buttons using the actions snippet</li>
	</ul>

	<h3>Actions Snippet</h3>
	<p>You can add custom actions to items using the actions snippet:</p>
</div>

<DocCode
	code={`<Item label="John Doe" onclick={(id) => console.log(id)}>
	{#snippet actions()}
		<Button variant="ghost" size="sm">Edit</Button>
		<Button variant="ghost" size="sm">Delete</Button>
	{/snippet}
</Item>`}
/>
