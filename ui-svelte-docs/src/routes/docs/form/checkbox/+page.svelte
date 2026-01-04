<script lang="ts">
	import { Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	let color: any = $state('primary');
	let checked = $state(false);
	let disabled = $state(false);
	let isMuted = $state(false);
	let label = $state('Checkbox Label');

	let hasProps = $derived(
		[color !== 'primary', disabled, isMuted, label !== 'Checkbox Label'].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Checkbox } from 'ui-svelte';`,
			`\n\tlet checked = $state(false);`,
			`\n\tconst handleChange = (value: boolean) => {`,
			`\t\tconsole.log('Checkbox changed:', value);`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Checkbox`,
			hasProps && `\tbind:checked`,
			color !== 'primary' && `\tcolor="${color}"`,
			label !== 'Checkbox Label' && `\tlabel="${label}"`,
			isMuted && `\tisMuted`,
			disabled && `\tdisabled`,
			hasProps && `\tonchange={handleChange}`,
			hasProps && `/>`,
			!hasProps && `<Checkbox bind:checked label="Checkbox Label" onchange={handleChange} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'checked', type: 'boolean', initial: 'false' },
		{ prop: 'defaultChecked', type: 'boolean', initial: '' },
		{ prop: 'onchange', type: '(checked: boolean) => void', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'isMuted', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Checkbox" llmUrl="https://ui-svelte.sappsdev.com/llm/form/checkbox.md">
	Checkboxes allow users to select one or more items from a set.
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
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={disabled} label="Disabled" />
			<Checkbox bind:checked={isMuted} label="Muted" />
		</div>

		<div class="doc-preview">
			<Checkbox bind:checked {color} {disabled} {isMuted} {label} />
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each colorOptions as colorItem}
				<Checkbox checked color={colorItem.id as any} label={colorItem.label} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">States</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			<Checkbox label="Unchecked" />
			<Checkbox checked label="Checked" />
			<Checkbox disabled label="Disabled" />
			<Checkbox checked disabled label="Checked Disabled" />
			<Checkbox isMuted label="Muted" />
			<Checkbox checked isMuted label="Checked Muted" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Without Label</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each colorOptions as colorItem}
				<Checkbox checked color={colorItem.id as any} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
