<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, Toggle } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	let color: any = $state('primary');
	let checked = $state(true);
	let disabled = $state(false);
	let showLabel = $state(true);
	let showDualLabels = $state(false);

	let hasProps = $derived(
		[color !== 'primary', disabled, !showLabel, showDualLabels].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Toggle } from 'ui-svelte';`,
			`\n\tlet checked = $state(false);`,
			`\n\tconst handleChange = (value: boolean) => {`,
			`\t\tconsole.log('Toggle changed:', value);`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Toggle`,
			hasProps && `\tbind:checked`,
			color !== 'primary' && `\tcolor="${color}"`,
			showLabel && !showDualLabels && `\tlabel="Toggle Label"`,
			showDualLabels && `\tlabelLeft="Off"`,
			showDualLabels && `\tlabelRight="On"`,
			disabled && `\tdisabled`,
			hasProps && `\tonchange={handleChange}`,
			hasProps && `/>`,
			!hasProps && `<Toggle bind:checked label="Toggle Label" onchange={handleChange} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'checked', type: 'boolean', initial: 'false' },
		{ prop: 'defaultChecked', type: 'boolean', initial: '' },
		{ prop: 'onchange', type: '(checked: boolean) => void', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'labelLeft', type: 'string', initial: '' },
		{ prop: 'labelRight', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted',
			initial: 'primary'
		},
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Toggle" llmUrl="https://ui-svelte.sappsdev.com/llm/form/toggle.md">
	Toggle switches allow users to turn a single option on or off.
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
			<Checkbox bind:checked={showLabel} label="Show Label" />
			<Checkbox bind:checked={showDualLabels} label="Dual Labels" />
			<Checkbox bind:checked={disabled} label="Disabled" />
		</div>

		<div class="doc-preview">
			<Toggle
				bind:checked
				{color}
				{disabled}
				label={showLabel && !showDualLabels ? 'Toggle Label' : undefined}
				labelLeft={showDualLabels ? 'Off' : undefined}
				labelRight={showDualLabels ? 'On' : undefined}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each colorOptions as colorItem}
				<Toggle checked color={colorItem.id as any} label={colorItem.label} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">States</p>
	<Card>
		<div class="wrap gap-4 center">
			<Toggle label="Unchecked" />
			<Toggle checked label="Checked" />
			<Toggle disabled label="Disabled" />
			<Toggle checked disabled label="Checked Disabled" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Dual Labels</p>
	<Card>
		<div class="wrap gap-4 center">
			<Toggle labelLeft="Monthly" labelRight="Yearly" />
			<Toggle checked labelLeft="Off" labelRight="On" />
			<Toggle labelLeft="Light" labelRight="Dark" color="secondary" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Without Label</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each colorOptions as colorItem}
				<Toggle checked color={colorItem.id as any} />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
