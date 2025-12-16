<script lang="ts">
	import { Card, Code, Divider, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	const colorOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const orientationOptions = [
		{ id: 'horizontal', label: 'Horizontal' },
		{ id: 'vertical', label: 'Vertical' }
	];

	let color: any = $state('default');
	let orientation: any = $state('horizontal');

	let code = $derived(() => {
		const props = [];
		if (orientation === 'vertical') props.push('vertical');
		if (color !== 'default') props.push(`color="${color}"`);
		const propsString = props.length > 0 ? ' ' + props.join(' ') : '';
		return `<Divider${propsString} />`;
	});

	const props = [
		{
			name: 'vertical',
			type: 'boolean',
			default: 'false',
			description: 'Renders divider vertically instead of horizontally'
		},
		{
			name: 'color',
			type: "'default' | 'surface' | 'primary' | 'secondary' | 'muted'",
			default: "'default'",
			description: 'Color theme for the divider line'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Optional content to display in the center of the divider'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional CSS classes to apply'
		}
	];
</script>

<DocsHeader title="Divider" llmUrl="https://ui-svelte.sappsdev.com/llm/display/divider.md">
	A visual separator for content sections. Supports horizontal and vertical orientations with
	optional centered content and color variants.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<div
			class="min-h-[200px] w-full border-2 border-dashed border-muted-300 rounded-lg p-4 {orientation ===
			'vertical'
				? 'row'
				: 'column'} gap-4"
		>
			<div class="p-4 bg-primary text-on-primary rounded">Content Before</div>
			<Divider vertical={orientation === 'vertical'} {color} />
			<div class="p-4 bg-secondary text-on-secondary rounded">Content After</div>
		</div>
	</DocsPreview>
	<Card>
		<Select label="Orientation" size="sm" options={orientationOptions} bind:value={orientation} />
		<Select label="Color" size="sm" options={colorOptions} bind:value={color} />
	</Card>
	<DocsCode code={code()} />
</Section>

<!-- Props Table -->
<Section>
	<Card>
		{#snippet header()}
			<h4>Props</h4>
		{/snippet}
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
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.name}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{prop.type}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{prop.default}</code></td>
							<td class="p-3 text-sm">{prop.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<!-- Examples Section -->
<Section bodyClass="grid-2 md:grid-3">
	<!-- Horizontal Divider -->
	<Card>
		{#snippet header()}
			<h4>Horizontal</h4>
		{/snippet}
		<div class="column gap-2">
			<div class="p-2 bg-muted text-on-muted rounded text-sm center">Above</div>
			<Divider />
			<div class="p-2 bg-muted text-on-muted rounded text-sm center">Below</div>
		</div>
		{#snippet footer()}
			<code class="text-xs">&lt;Divider /&gt;</code>
		{/snippet}
	</Card>

	<!-- Vertical Divider -->
	<Card>
		{#snippet header()}
			<h4>Vertical</h4>
		{/snippet}
		<div class="row gap-2 min-h-[80px]">
			<div class="p-2 bg-muted text-on-muted rounded text-sm center flex-1">Left</div>
			<Divider vertical />
			<div class="p-2 bg-muted text-on-muted rounded text-sm center flex-1">Right</div>
		</div>
		{#snippet footer()}
			<code class="text-xs">&lt;Divider vertical /&gt;</code>
		{/snippet}
	</Card>

	<!-- With Content -->
	<Card>
		{#snippet header()}
			<h4>With Content</h4>
		{/snippet}
		<div class="column gap-2">
			<div class="p-2 bg-muted text-on-muted rounded text-sm center">Above</div>
			<Divider>OR</Divider>
			<div class="p-2 bg-muted text-on-muted rounded text-sm center">Below</div>
		</div>
		{#snippet footer()}
			<code class="text-xs">&lt;Divider&gt;OR&lt;/Divider&gt;</code>
		{/snippet}
	</Card>

	<!-- Primary Color -->
	<Card>
		{#snippet header()}
			<h4>Primary Color</h4>
		{/snippet}
		<div class="column gap-2">
			<div class="p-2 bg-primary text-on-primary rounded text-sm center">Above</div>
			<Divider color="primary" />
			<div class="p-2 bg-primary text-on-primary rounded text-sm center">Below</div>
		</div>
		{#snippet footer()}
			<code class="text-xs">&lt;Divider color="primary" /&gt;</code>
		{/snippet}
	</Card>

	<!-- Secondary Color -->
	<Card>
		{#snippet header()}
			<h4>Secondary Color</h4>
		{/snippet}
		<div class="column gap-2">
			<div class="p-2 bg-secondary text-on-secondary rounded text-sm center">Above</div>
			<Divider color="secondary" />
			<div class="p-2 bg-secondary text-on-secondary rounded text-sm center">Below</div>
		</div>
		{#snippet footer()}
			<code class="text-xs">&lt;Divider color="secondary" /&gt;</code>
		{/snippet}
	</Card>

	<!-- Responsive Divider -->
	<Card>
		{#snippet header()}
			<h4>Responsive</h4>
		{/snippet}
		<div class="column xl:row gap-2 min-h-[80px]">
			<div class="p-2 bg-success text-on-success rounded text-sm center flex-1">A</div>
			<Divider class="invisible xl:visible" vertical />
			<Divider class="xl:hidden" />
			<div class="p-2 bg-success text-on-success rounded text-sm center flex-1">B</div>
		</div>
		{#snippet footer()}
			<code class="text-xs">invisible xl:visible / xl:hidden</code>
		{/snippet}
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Responsive Divider:</strong> Use visibility classes to switch between horizontal
					and vertical:
					<code class="px-1 py-0.5 bg-blue rounded">invisible xl:visible</code> for vertical and
					<code class="px-1 py-0.5 bg-blue rounded">xl:hidden</code> for horizontal
				</li>
				<li>
					<strong>With Content:</strong> Add text or icons as children to create labeled dividers like
					"OR" separators
				</li>
				<li>
					<strong>Vertical Height:</strong> Vertical dividers need a parent with defined height to display
					correctly
				</li>
				<li>
					<strong>Colors:</strong> Match divider colors with your content theme for visual consistency
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
			code={`<!-- Basic Horizontal Divider -->
<Divider />

<!-- Vertical Divider -->
<div class="row min-h-[100px]">
	<div>Left Content</div>
	<Divider vertical />
	<div>Right Content</div>
</div>

<!-- Divider with Label -->
<Divider>OR</Divider>

<!-- Colored Dividers -->
<Divider color="primary" />
<Divider color="secondary" />

<!-- Responsive Divider (vertical on xl, horizontal on smaller) -->
<div class="column xl:row gap-4">
	<div>Content A</div>
	<Divider class="invisible xl:visible" vertical />
	<Divider class="xl:hidden" />
	<div>Content B</div>
</div>`}
		/>
	</Card>
</Section>
