<script lang="ts">
	import { Alert, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	let color: any = $state('info');
	let variant: any = $state('soft');
	let title = $state('Alert Title');
	let description = $state('This is an alert description with more details.');

	let showIcon = $state(true);
	let hasTitle = $state(true);
	let hasDescription = $state(true);

	let hasProps = $derived(
		[color !== 'info', variant !== 'soft', showIcon, hasTitle, hasDescription].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Alert } from 'ui-svelte';`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Alert`,
			color !== 'info' && `\tcolor="${color}"`,
			variant !== 'soft' && `\tvariant="${variant}"`,
			hasTitle && `\ttitle="Alert Title"`,
			hasDescription && `\tdescription="This is an alert description."`,
			showIcon && `\tshowIcon`,
			hasProps && `/>`,
			!hasProps && `<Alert title="Alert Title" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'title', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'info'
		},
		{ prop: 'variant', type: 'solid | soft', initial: 'soft' },
		{ prop: 'showIcon', type: 'boolean', initial: 'false' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'src', type: 'string', initial: '', description: 'Avatar image URL' },
		{ prop: 'name', type: 'string', initial: '', description: 'Avatar name (shows initial)' },
		{ prop: 'alt', type: 'string', initial: '', description: 'Avatar alt text' },
		{
			prop: 'avatarSize',
			type: 'xs | sm | md | lg | xl',
			initial: 'md',
			description: 'Avatar size'
		},
		{
			prop: 'status',
			type: 'online | offline | busy | away',
			initial: '',
			description: 'Avatar status indicator'
		},
		{ prop: 'isBordered', type: 'boolean', initial: 'false', description: 'Avatar border' }
	];
</script>

<DocsHeader title="Alert" llmUrl="https://ui-svelte.sappsdev.com/llm/display/alert.md">
	Alerts display important messages to users, such as status updates, warnings, or errors.
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showIcon} label="showIcon" />
			<Checkbox bind:checked={hasTitle} label="Title" />
			<Checkbox bind:checked={hasDescription} label="Description" />
		</div>

		<div class="doc-preview">
			<Alert
				{color}
				{variant}
				title={hasTitle ? title : undefined}
				description={hasDescription ? description : undefined}
				{showIcon}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Variants</p>
	<Card color="background" variant="outlined">
		<div class="column gap-4">
			{#each colorOptions as item}
				<Alert
					color={item.id as any}
					{variant}
					title={item.label + ' Alert'}
					description="This is a {item.label.toLowerCase()} alert message."
					showIcon
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Solid Variants</p>
	<Card color="background" variant="outlined">
		<div class="column gap-4">
			{#each colorOptions as item}
				<Alert
					color={item.id as any}
					variant="solid"
					title={item.label + ' Alert'}
					description="This is a solid {item.label.toLowerCase()} alert message."
					showIcon
				/>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Avatar</p>
	<Card color="background" variant="outlined">
		<div class="column gap-4">
			<!-- With image -->
			<Alert
				src="https://i.pravatar.cc/150?img=32"
				title="New message from John"
				description="Hey! Just wanted to check in with you about the project."
				color="info"
				status="online"
			/>
			<Alert
				name="María García"
				title="Friend request"
				description="María García wants to connect with you."
				color="success"
				isBordered
			/>
			<Alert
				src="https://i.pravatar.cc/150?img=5"
				title="User is busy"
				description="This user is currently unavailable."
				color="warning"
				status="busy"
				avatarSize="lg"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
