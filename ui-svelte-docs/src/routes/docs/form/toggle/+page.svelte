<script lang="ts">
	import { Card, Code, Section, Select, Toggle, Checkbox } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	let selectedColor: any = $state('primary');
	let isDisabled = $state(false);
	let showLabel = $state(true);
	let isChecked = $state(true);

	let code = $derived(() => {
		const props = [];

		if (isChecked) props.push('checked');
		if (selectedColor !== 'primary') props.push(`color="${selectedColor}"`);
		if (showLabel) props.push('label="Toggle Label"');
		if (isDisabled) props.push('disabled');

		const propsString = props.length > 0 ? ` ${props.join(' ')}` : '';
		return `<Toggle${propsString} />`;
	});

	const propsTable = [
		{
			prop: 'checked',
			type: 'boolean',
			default: 'false',
			description: 'The checked state of the toggle (bindable)'
		},
		{
			prop: 'defaultChecked',
			type: 'boolean',
			default: 'undefined',
			description: 'Initial checked state (uncontrolled)'
		},
		{
			prop: 'label',
			type: 'string',
			default: 'undefined',
			description: 'Label text displayed after the toggle'
		},
		{
			prop: 'labelLeft',
			type: 'string',
			default: 'undefined',
			description: 'Label text on the left (active when unchecked)'
		},
		{
			prop: 'labelRight',
			type: 'string',
			default: 'undefined',
			description: 'Label text on the right (active when checked)'
		},
		{
			prop: 'color',
			type: "'primary' | 'secondary' | 'muted'",
			default: "'primary'",
			description: 'Color variant of the toggle when checked'
		},
		{
			prop: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the toggle interaction'
		},
		{
			prop: 'name',
			type: 'string',
			default: 'undefined',
			description: 'Name attribute for form submission'
		},
		{
			prop: 'onchange',
			type: '(checked: boolean) => void',
			default: 'undefined',
			description: 'Callback fired when toggle state changes'
		},
		{
			prop: 'class',
			type: 'string',
			default: 'undefined',
			description: 'Additional CSS classes to apply'
		}
	];
</script>

<DocsHeader title="Toggle" llmUrl="https://ui-svelte.sappsdev.com/llm/form/toggle.md">
	A toggle switch component for binary on/off settings. Provides a more visual alternative to
	checkboxes with smooth transitions and multiple color variants.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<div class="row center min-h-[100px]">
			<Toggle
				bind:checked={isChecked}
				color={selectedColor}
				disabled={isDisabled}
				label={showLabel ? 'Toggle Label' : undefined}
			/>
		</div>
	</DocsPreview>
	<Card>
		<Select label="Color" size="sm" options={colorOptions} bind:value={selectedColor} />
		<div class="column gap-2 mt-2">
			<Checkbox bind:checked={showLabel} label="Show Label" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<!-- Primary Color -->
	<Card>
		{#snippet header()}
			<h4>Primary</h4>
		{/snippet}
		<div class="row center py-2">
			<Toggle checked color="primary" label="Primary" />
		</div>
		{#snippet footer()}
			<code class="text-xs">color="primary"</code>
		{/snippet}
	</Card>

	<!-- Secondary Color -->
	<Card>
		{#snippet header()}
			<h4>Secondary</h4>
		{/snippet}
		<div class="row center py-2">
			<Toggle checked color="secondary" label="Secondary" />
		</div>
		{#snippet footer()}
			<code class="text-xs">color="secondary"</code>
		{/snippet}
	</Card>

	<!-- Muted Color -->
	<Card>
		{#snippet header()}
			<h4>Muted</h4>
		{/snippet}
		<div class="row center py-2">
			<Toggle checked color="muted" label="Muted" />
		</div>
		{#snippet footer()}
			<code class="text-xs">color="muted"</code>
		{/snippet}
	</Card>

	<!-- Unchecked State -->
	<Card>
		{#snippet header()}
			<h4>Unchecked</h4>
		{/snippet}
		<div class="row center py-2">
			<Toggle checked={false} label="Off" />
		</div>
		{#snippet footer()}
			<code class="text-xs">checked={'{false}'}</code>
		{/snippet}
	</Card>

	<!-- Disabled State -->
	<Card>
		{#snippet header()}
			<h4>Disabled</h4>
		{/snippet}
		<div class="column center gap-2 py-2">
			<Toggle checked disabled label="Disabled On" />
			<Toggle checked={false} disabled label="Disabled Off" />
		</div>
		{#snippet footer()}
			<code class="text-xs">disabled</code>
		{/snippet}
	</Card>

	<!-- Without Label -->
	<Card>
		{#snippet header()}
			<h4>Without Label</h4>
		{/snippet}
		<div class="row center py-2">
			<Toggle checked />
		</div>
		{#snippet footer()}
			<code class="text-xs">&lt;Toggle checked /&gt;</code>
		{/snippet}
	</Card>

	<!-- Dual Labels -->
	<Card>
		{#snippet header()}
			<h4>Dual Labels</h4>
		{/snippet}
		<div class="row center py-2">
			<Toggle labelLeft="Monthly" labelRight="Yearly" />
		</div>
		{#snippet footer()}
			<code class="text-xs">labelLeft="Monthly" labelRight="Yearly"</code>
		{/snippet}
	</Card>
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
					{#each propsTable as prop}
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

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Binding:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">bind:checked</code> for two-way binding
				</li>
				<li>
					<strong>Forms:</strong> Add a
					<code class="px-1 py-0.5 bg-blue rounded">name</code> prop for form submission
				</li>
				<li>
					<strong>Accessibility:</strong> Always provide a
					<code class="px-1 py-0.5 bg-blue rounded">label</code> for screen readers or use aria-label
				</li>
				<li>
					<strong>Use Cases:</strong> Toggles are best for settings that take effect immediately, use
					checkboxes for form submissions
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
			code={`<script lang="ts">
	import { Toggle } from 'ui-svelte';

	let darkMode = $state(false);
	let notifications = $state(true);
<\/script>

<!-- Basic Toggle -->
<Toggle label="Enable feature" bind:checked={darkMode} />

<!-- Colored Toggle -->
<Toggle label="Secondary color" color="secondary" checked />

<!-- Toggle with callback -->
<Toggle
	label="Notifications"
	bind:checked={notifications}
	onchange={(value) => console.log('Changed:', value)}
/>

<!-- Disabled Toggle -->
<Toggle label="Unavailable" disabled checked />

<!-- Dual Labels (Billing Toggle) -->
<Toggle labelLeft="Billed Monthly" labelRight="Billed Yearly" bind:checked={isYearly} />

<!-- In a settings form -->
<form>
	<Toggle name="dark_mode" label="Dark Mode" bind:checked={darkMode} />
	<Toggle name="notifications" label="Notifications" bind:checked={notifications} />
</form>`}
		/>
	</Card>
</Section>
