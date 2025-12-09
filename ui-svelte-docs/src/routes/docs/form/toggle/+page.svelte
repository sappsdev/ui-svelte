<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, Toggle } from 'ui-svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	// Selects
	let color: any = $state('primary');

	// Props
	let label = $state('');

	// States
	let isDisabled = $state(false);
	let isDefaultChecked = $state(false);

	let hasProps = $derived([color !== 'primary', label, isDisabled, isDefaultChecked].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Toggle } from 'ui-svelte';`,
			`\n\tlet checked = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Toggle`,
			hasProps && `\tname="toggle"`,
			label && `\tlabel="${label}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			isDisabled && `\tdisabled`,
			isDefaultChecked && `\tdefaultChecked`,
			hasProps && `\tbind:checked`,
			hasProps && `/>`,
			!hasProps && `<Toggle name="toggle" bind:checked />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: false },
		{ prop: 'checked', type: 'boolean', initial: 'false' },
		{ prop: 'defaultChecked', type: 'boolean', initial: 'false' },
		{ prop: 'onchange', type: '(checked: boolean) => void', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'color', type: 'primary | secondary | muted', initial: 'primary' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	let checked = $state(false);
</script>

{#snippet preview()}
	<Toggle
		name="toggle"
		{color}
		disabled={isDisabled}
		defaultChecked={isDefaultChecked}
		label={label || undefined}
		bind:checked
	/>
{/snippet}

{#snippet builder()}
	<Select label="Color" size="sm" options={colorOptions} bind:value={color} />

	<DocOptions title="States">
		<Checkbox bind:checked={isDisabled} label="Disabled" />
		<Checkbox bind:checked={isDefaultChecked} label="Default Checked" />
	</DocOptions>

	<DocOptions title="Labels">
		<Checkbox
			onchange={(v) => (v ? (label = 'Enable notifications') : (label = ''))}
			label="Label"
		/>
	</DocOptions>
{/snippet}

<DocHeader title="Toggle">
	Toggle components allow users to switch between two states, typically on/off or enabled/disabled.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Usage</h3>
	<p>
		The Toggle component is ideal for binary choices where the change takes effect immediately
		without requiring a form submission. Use <code>checked</code> for controlled state or
		<code>defaultChecked</code>
		for uncontrolled components.
	</p>
</div>
