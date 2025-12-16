<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select, Tooltip } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const positionOptions = [
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'start', label: 'Start' },
		{ id: 'end', label: 'End' }
	];

	let variant: any = $state('primary');
	let position: any = $state('top');
	let label = $state('Tooltip text');
	let isSolid = $state(false);

	let code = $derived(() => {
		const props = [
			`label="${label}"`,
			variant !== 'primary' && `variant="${variant}"`,
			position !== 'top' && `position="${position}"`,
			isSolid && `isSolid`
		].filter(Boolean);

		const propsString = props.length > 0 ? `\n\t${props.join('\n\t')}\n` : ' label="Tooltip text"';

		return `<Tooltip${propsString}>
	<Button>Hover me</Button>
</Tooltip>`;
	});

	const props = [
		{
			prop: 'label',
			type: 'string',
			initial: '',
			required: true,
			description: 'Text content of the tooltip'
		},
		{
			prop: 'children',
			type: 'Snippet',
			initial: '',
			required: true,
			description: 'Element that triggers the tooltip on hover'
		},
		{
			prop: 'variant',
			type: 'primary | secondary | muted',
			initial: 'primary',
			description: 'Visual style variant'
		},
		{
			prop: 'position',
			type: 'top | bottom | start | end',
			initial: 'top',
			description: 'Position of the tooltip relative to trigger'
		},
		{
			prop: 'isSolid',
			type: 'boolean',
			initial: 'false',
			description: 'Uses solid background instead of translucent'
		},
		{
			prop: 'class',
			type: 'string',
			initial: '',
			description: 'Additional CSS classes'
		}
	];
</script>

<DocsHeader title="Tooltip" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/tooltip.md">
	Tooltips display informative text when users hover over, focus on, or tap an element.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Tooltip {label} {variant} {position} {isSolid}>
			<Button isSolid>Hover me</Button>
		</Tooltip>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Position" size="sm" options={positionOptions} bind:value={position} />
		<Checkbox bind:checked={isSolid} label="Solid" />
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
					{#each props as prop}
						<tr class="border-b border-muted-100">
							<td class="p-3">
								<code class="px-2 py-1 rounded text-sm">{prop.prop}</code>
								{#if prop.required}
									<span class="text-danger text-xs">*</span>
								{/if}
							</td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
							<td class="p-3 text-sm">{prop.initial || '—'}</td>
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
					<strong>Smart Positioning:</strong> The tooltip automatically adjusts its position to stay within
					the viewport boundaries
				</li>
				<li>
					<strong>RTL Support:</strong> Use <code class="px-1 py-0.5 bg-blue rounded">start</code>
					and
					<code class="px-1 py-0.5 bg-blue rounded">end</code> instead of left/right for proper RTL support
				</li>
				<li>
					<strong>Accessibility:</strong> Tooltips are triggered on hover and work well with any interactive
					element like buttons, icons, or links
				</li>
				<li>
					<strong>Keep it Brief:</strong> Tooltips work best with short, helpful text. For longer content,
					consider using a popover or dropdown
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
	import { Tooltip, Button } from 'ui-svelte';
<\/script>

<!-- Basic Usage -->
<Tooltip label="Save changes">
	<Button>Save</Button>
</Tooltip>

<!-- Different Positions -->
<Tooltip label="Top" position="top">
	<Button>Top</Button>
</Tooltip>

<Tooltip label="Bottom" position="bottom">
	<Button>Bottom</Button>
</Tooltip>

<!-- Variants -->
<Tooltip label="Secondary" variant="secondary">
	<Button variant="secondary">Secondary</Button>
</Tooltip>

<Tooltip label="Muted" variant="muted">
	<Button variant="muted">Muted</Button>
</Tooltip>

<!-- Solid Style -->
<Tooltip label="Solid tooltip" isSolid>
	<Button isSolid>Solid</Button>
</Tooltip>`}
		/>
	</Card>
</Section>
