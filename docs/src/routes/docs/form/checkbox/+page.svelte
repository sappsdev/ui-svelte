<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox } from 'ui-svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	// Selects
	let color: any = $state('primary');

	// Props
	let label = $state('');
	let name = $state('');

	// States
	let isDisabled = $state(false);
	let isDefaultChecked = $state(false);

	let hasProps = $derived(
		[color !== 'primary', label, name, isDisabled, isDefaultChecked].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Checkbox } from 'ui-svelte';`,
			`\n\tlet checked = $state(false);`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Checkbox`,
			label && `\tlabel="${label}"`,
			name && `\tname="${name}"`,
			color !== 'primary' && `\tcolor="${color}"`,
			isDisabled && `\tdisabled`,
			isDefaultChecked && `\tdefaultChecked`,
			hasProps && `\tbind:checked`,
			hasProps && `/>`,
			!hasProps && `<Checkbox bind:checked />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'checked', type: 'boolean', initial: 'false' },
		{ prop: 'defaultChecked', type: 'boolean', initial: 'false' },
		{ prop: 'onchange', type: '(checked: boolean) => void', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'color', type: 'primary | secondary | muted', initial: 'primary' }
	];

	let checked = $state(false);
</script>

{#snippet preview()}
	<Checkbox
		{color}
		label={label || undefined}
		name={name || undefined}
		disabled={isDisabled || undefined}
		defaultChecked={isDefaultChecked || undefined}
		bind:checked
	/>
{/snippet}

{#snippet builder()}
	<Select label="Color" size="sm" options={colorOptions} bind:value={color} />

	<DocOptions title="Props">
		<Checkbox
			onchange={(v) => (v ? (label = 'Accept terms and conditions') : (label = ''))}
			label="Label"
		/>
		<Checkbox onchange={(v) => (v ? (name = 'terms') : (name = ''))} label="Name" />
		<Checkbox bind:checked={isDisabled} label="Disabled" />
		<Checkbox bind:checked={isDefaultChecked} label="Default Checked" />
	</DocOptions>
{/snippet}

<DocHeader title="Checkbox">
	Checkbox components allow users to select or deselect options.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
