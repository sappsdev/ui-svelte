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
		{ prop: 'status', type: 'info | success | warning | danger', initial: 'info' },
		{ prop: 'showIcon', type: 'boolean', initial: 'false' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
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
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
