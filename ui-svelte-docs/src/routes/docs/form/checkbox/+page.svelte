<script lang="ts">
	import { Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	let color: any = $state('primary');
	let isChecked = $state(false);
	let isDisabled = $state(false);
	let hasLabel = $state(true);

	let code = $derived(() => {
		const props = [];
		if (isChecked) props.push('checked');
		if (isDisabled) props.push('disabled');
		if (hasLabel) props.push('label="Accept terms"');
		if (color !== 'primary') props.push(`color="${color}"`);

		const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
		return `<Checkbox${propsString} />`;
	});

	const propsData = [
		{
			prop: 'checked',
			type: 'boolean',
			default: 'false',
			description: 'Controls the checked state (bindable)'
		},
		{
			prop: 'defaultChecked',
			type: 'boolean',
			default: 'undefined',
			description: 'Initial checked state when uncontrolled'
		},
		{
			prop: 'label',
			type: 'string',
			default: 'undefined',
			description: 'Text label displayed next to the checkbox'
		},
		{
			prop: 'name',
			type: 'string',
			default: 'undefined',
			description: 'Name attribute for form submission'
		},
		{
			prop: 'color',
			type: "'primary' | 'secondary' | 'muted'",
			default: "'primary'",
			description: 'Color variant when checked'
		},
		{
			prop: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the checkbox interaction'
		},
		{
			prop: 'onchange',
			type: '(checked: boolean) => void',
			default: 'undefined',
			description: 'Callback when checked state changes'
		},
		{
			prop: 'class',
			type: 'string',
			default: 'undefined',
			description: 'Additional CSS classes'
		}
	];
</script>

<DocsHeader title="Checkbox" llmUrl="https://ui-svelte.sappsdev.com/llm/form/checkbox.md">
	A customizable checkbox component for boolean input with support for labels, colors, and
	controlled/uncontrolled modes.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<div class="row center min-h-[100px]">
			<Checkbox
				bind:checked={isChecked}
				disabled={isDisabled}
				label={hasLabel ? 'Accept terms' : undefined}
				{color}
			/>
		</div>
	</DocsPreview>
	<Card>
		<Select label="Color" size="sm" options={colorOptions} bind:value={color} />
		<div class="column gap-2 mt-4">
			<Checkbox bind:checked={isChecked} label="Checked" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
			<Checkbox bind:checked={hasLabel} label="Show Label" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card>
		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Prop</th>
						<th class="text-left p-3 font-semibold">Type</th>
						<th class="text-left p-3 font-semibold">Default</th>
						<th class="text-left p-3 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each propsData as prop}
						<tr class="border-b border-muted-100">
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.prop}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.default}</code></td>
							<td class="p-3 text-sm">{prop.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- Color Variants -->
	<Card>
		{#snippet header()}
			<h4>Primary</h4>
		{/snippet}
		<div class="row center gap-4">
			<Checkbox color="primary" checked />
			<Checkbox color="primary" />
		</div>
		{#snippet footer()}
			<code class="text-xs">color="primary"</code>
		{/snippet}
	</Card>

	<Card>
		{#snippet header()}
			<h4>Secondary</h4>
		{/snippet}
		<div class="row center gap-4">
			<Checkbox color="secondary" checked />
			<Checkbox color="secondary" />
		</div>
		{#snippet footer()}
			<code class="text-xs">color="secondary"</code>
		{/snippet}
	</Card>

	<Card>
		{#snippet header()}
			<h4>Muted</h4>
		{/snippet}
		<div class="row center gap-4">
			<Checkbox color="muted" checked />
			<Checkbox color="muted" />
		</div>
		{#snippet footer()}
			<code class="text-xs">color="muted"</code>
		{/snippet}
	</Card>

	<!-- States -->
	<Card>
		{#snippet header()}
			<h4>With Label</h4>
		{/snippet}
		<div class="column gap-2">
			<Checkbox label="Remember me" checked />
			<Checkbox label="Subscribe to newsletter" />
		</div>
		{#snippet footer()}
			<code class="text-xs">label="Remember me"</code>
		{/snippet}
	</Card>

	<Card>
		{#snippet header()}
			<h4>Disabled</h4>
		{/snippet}
		<div class="column gap-2">
			<Checkbox label="Disabled checked" checked disabled />
			<Checkbox label="Disabled unchecked" disabled />
		</div>
		{#snippet footer()}
			<code class="text-xs">disabled</code>
		{/snippet}
	</Card>

	<Card>
		{#snippet header()}
			<h4>Controlled</h4>
		{/snippet}
		<div class="column gap-2">
			<Checkbox label="Bind checked state" bind:checked={isChecked} />
			<span class="text-sm">State: {isChecked ? 'Checked' : 'Unchecked'}</span>
		</div>
		{#snippet footer()}
			<code class="text-xs">bind:checked</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Two-way binding:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">bind:checked</code> for reactive state management
				</li>
				<li>
					<strong>Form integration:</strong> Use the
					<code class="px-1 py-0.5 bg-blue rounded">name</code> prop for form submissions
				</li>
				<li>
					<strong>Change handler:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">onchange</code> callback for side effects on state
					change
				</li>
				<li>
					<strong>Accessibility:</strong> The label is automatically associated with the input for better
					accessibility
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<script>
	import { Checkbox } from 'ui-svelte';

	let isAccepted = $state(false);
	let preferences = $state({
		newsletter: true,
		notifications: false
	});
<\/script>

<!-- Basic checkbox -->
<Checkbox label="Accept terms" bind:checked={isAccepted} />

<!-- Color variants -->
<Checkbox color="primary" label="Primary" checked />
<Checkbox color="secondary" label="Secondary" checked />
<Checkbox color="muted" label="Muted" checked />

<!-- Disabled state -->
<Checkbox label="Disabled option" disabled checked />

<!-- Form group -->
<div class="column gap-2">
	<Checkbox
		label="Subscribe to newsletter"
		bind:checked={preferences.newsletter}
	/>
	<Checkbox
		label="Enable notifications"
		bind:checked={preferences.notifications}
	/>
</div>

<!-- With change handler -->
<Checkbox
	label="Enable feature"
	onchange={(checked) => console.log('Changed:', checked)}
/>`}
		/>
	</Card>
</Section>
