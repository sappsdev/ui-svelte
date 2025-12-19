<script lang="ts">
	import { Card, Checkbox, Code, Section, Select, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';

	const flexDirectionOptions = [
		{ id: 'row', label: 'Row' },
		{ id: 'row-reverse', label: 'Row Reverse' },
		{ id: 'column', label: 'Column' },
		{ id: 'column-reverse', label: 'Column Reverse' },
		{ id: 'wrap', label: 'Wrap' }
	];

	const gridColsOptions = [
		{ id: 'grid-1', label: '1 Column' },
		{ id: 'grid-2', label: '2 Columns' },
		{ id: 'grid-3', label: '3 Columns' },
		{ id: 'grid-4', label: '4 Columns' },
		{ id: 'grid-auto-fit', label: 'Auto Fit' }
	];

	let layoutType: any = $state('flex');
	let flexDirection: any = $state('row');
	let gridCols: any = $state('grid-3');
	let useCenter = $state(false);
	let useGap = $state(true);

	let classes = $derived(() => {
		const classList = [];

		if (layoutType === 'flex') {
			classList.push(flexDirection);
		} else {
			classList.push(gridCols);
		}

		if (useCenter) classList.push('center');
		if (useGap) classList.push('gap-4');

		return classList.join(' ');
	});

	let code = $derived(() => {
		const classString = classes();
		const items = layoutType === 'grid' ? 6 : 3;
		const itemsArray = Array.from({ length: items }, (_, i) => i + 1);

		const componentLines = [
			`<div class="${classString}">`,
			...itemsArray.map((i) => `\t<div class="p-4 bg-primary text-white rounded">Item ${i}</div>`),
			`</div>`
		];

		return componentLines.join('\n');
	});

	const flexUtilities = [
		{
			utility: 'row',
			equivalent: 'flex flex-row',
			description: 'Displays children in a horizontal row (left to right)'
		},
		{
			utility: 'row-reverse',
			equivalent: 'flex flex-row-reverse',
			description: 'Displays children in a horizontal row in reverse order (right to left)'
		},
		{
			utility: 'column',
			equivalent: 'flex flex-col',
			description: 'Displays children in a vertical column (top to bottom)'
		},
		{
			utility: 'column-reverse',
			equivalent: 'flex flex-col-reverse',
			description: 'Displays children in a vertical column in reverse order (bottom to top)'
		},
		{
			utility: 'wrap',
			equivalent: 'flex-wrap',
			description: 'Allows flex children to wrap to multiple lines (combine with row/column)'
		},
		{
			utility: 'center',
			equivalent: 'items-center justify-center',
			description: 'Centers children both horizontally and vertically'
		}
	];

	const gridUtilities = [
		{
			utility: 'grid-1',
			equivalent: 'grid grid-cols-1',
			description: 'Creates a grid with 1 column'
		},
		{
			utility: 'grid-2',
			equivalent: 'grid grid-cols-2',
			description: 'Creates a grid with 2 columns'
		},
		{
			utility: 'grid-3',
			equivalent: 'grid grid-cols-3',
			description: 'Creates a grid with 3 columns'
		},
		{
			utility: 'grid-4',
			equivalent: 'grid grid-cols-4',
			description: 'Creates a grid with 4 columns'
		},
		{
			utility: 'grid-5',
			equivalent: 'grid grid-cols-5',
			description: 'Creates a grid with 5 columns'
		},
		{
			utility: 'grid-6',
			equivalent: 'grid grid-cols-6',
			description: 'Creates a grid with 6 columns'
		},
		{
			utility: 'grid-auto-fit',
			equivalent: 'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
			description: 'Responsive grid that auto-fits columns'
		},
		{
			utility: 'grid-auto-fill',
			equivalent: 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]',
			description: 'Responsive grid that auto-fills columns'
		}
	];

	const utilityTabs = [
		{ id: 'flex', label: 'Flex Utilities', content: flexUtilitiesContent },
		{ id: 'grid', label: 'Grid Utilities', content: gridUtilitiesContent }
	];
</script>

{#snippet flexUtilitiesContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Utility</th>
					<th class="text-left p-3 font-semibold">Tailwind Equivalent</th>
					<th class="text-left p-3 font-semibold">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each flexUtilities as util}
					<tr class="border-b border-muted-100">
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{util.utility}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{util.equivalent}</code></td>
						<td class="p-3 text-sm">{util.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet gridUtilitiesContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Utility</th>
					<th class="text-left p-3 font-semibold">Tailwind Equivalent</th>
					<th class="text-left p-3 font-semibold">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each gridUtilities as util}
					<tr class="border-b border-muted-100">
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{util.utility}</code></td>
						<td class="p-3"><code class="px-2 py-1 rounded text-xs">{util.equivalent}</code></td>
						<td class="p-3 text-sm">{util.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

<DocsHeader title="Flex & Grid" llmUrl="https://ui-svelte.sappsdev.com/llm/starter/flex-grid.md">
	Utility classes for quickly creating flex and grid layouts. These utilities simplify common layout
	patterns by combining multiple Tailwind classes into single, semantic class names.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Layout Type"
				size="sm"
				options={[
					{ id: 'flex', label: 'Flex' },
					{ id: 'grid', label: 'Grid' }
				]}
				bind:value={layoutType}
			/>
			{#if layoutType === 'flex'}
				<Select
					isFloatLabel
					rootClass="max-w-xs"
					label="Direction"
					size="sm"
					options={flexDirectionOptions}
					bind:value={flexDirection}
				/>
			{:else}
				<Select
					isFloatLabel
					rootClass="max-w-xs"
					label="Grid Columns"
					size="sm"
					options={gridColsOptions}
					bind:value={gridCols}
				/>
			{/if}
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={useCenter} label="Center" />
			<Checkbox bind:checked={useGap} label="Gap (gap-4)" />
		</div>

		<div class="doc-preview">
			<div class="{classes()} min-h-[200px] border-2 border-dashed border-muted-300 rounded-lg p-4">
				<div class="p-4 bg-primary text-on-primary rounded">Item 1</div>
				<div class="p-4 bg-secondary text-on-secondary rounded">Item 2</div>
				<div class="p-4 bg-muted text-on-muted rounded">Item 3</div>
				{#if layoutType === 'grid'}
					<div class="p-4 bg-primary text-on-primary rounded">Item 4</div>
					<div class="p-4 bg-secondary text-on-secondary rounded">Item 5</div>
					<div class="p-4 bg-muted text-on-muted rounded">Item 6</div>
				{/if}
			</div>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Utility Reference</p>
	<Card>
		<Tabs tabs={utilityTabs} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Examples</p>
	<Card bodyClass="grid-2 md:grid-3 gap-4">
		<!-- Flex Row Example -->
		<Card>
			{#snippet header()}
				<h4>Flex Row</h4>
			{/snippet}
			<div class="row gap-2">
				<div class="p-2 bg-primary text-on-primary rounded text-sm">1</div>
				<div class="p-2 bg-primary text-on-primary rounded text-sm">2</div>
				<div class="p-2 bg-primary text-on-primary rounded text-sm">3</div>
			</div>
			{#snippet footer()}
				<code class="text-xs">class="row gap-2"</code>
			{/snippet}
		</Card>

		<!-- Flex Column Example -->
		<Card>
			{#snippet header()}
				<h4>Flex Column</h4>
			{/snippet}
			<div class="column gap-2">
				<div class="p-2 bg-secondary text-on-secondary rounded text-sm">1</div>
				<div class="p-2 bg-secondary text-on-secondary rounded text-sm">2</div>
				<div class="p-2 bg-secondary text-on-secondary rounded text-sm">3</div>
			</div>
			{#snippet footer()}
				<code class="text-xs">class="column gap-2"</code>
			{/snippet}
		</Card>

		<!-- Grid 3 Example -->
		<Card>
			{#snippet header()}
				<h4>Grid 3 Columns</h4>
			{/snippet}
			<div class="grid-3 gap-2">
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">1</div>
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">2</div>
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">3</div>
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">4</div>
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">5</div>
				<div class="p-2 bg-muted text-on-muted rounded text-sm center">6</div>
			</div>
			{#snippet footer()}
				<code class="text-xs">class="grid-3 gap-2"</code>
			{/snippet}
		</Card>

		<!-- Center Example -->
		<Card>
			{#snippet header()}
				<h4>Center</h4>
			{/snippet}
			<div class="row center gap-2 min-h-[80px] border border-dashed border-muted-300 rounded">
				<div class="p-2 bg-info text-on-info rounded text-sm">Centered</div>
			</div>
			{#snippet footer()}
				<code class="text-xs">class="row center"</code>
			{/snippet}
		</Card>

		<!-- Responsive Example -->
		<Card>
			{#snippet header()}
				<h4>Responsive</h4>
			{/snippet}
			<div class="column md:row gap-2">
				<div class="p-2 bg-success text-on-success rounded text-sm flex-1 center">A</div>
				<div class="p-2 bg-success text-on-success rounded text-sm flex-1 center">B</div>
			</div>
			{#snippet footer()}
				<code class="text-xs">class="column md:row"</code>
			{/snippet}
		</Card>

		<!-- Auto Fit Example -->
		<Card>
			{#snippet header()}
				<h4>Grid Auto Fit</h4>
			{/snippet}
			<div class="grid-auto-fit gap-2">
				<div class="p-2 bg-warning text-on-warning rounded text-sm center">1</div>
				<div class="p-2 bg-warning text-on-warning rounded text-sm center">2</div>
			</div>
			{#snippet footer()}
				<code class="text-xs">class="grid-auto-fit"</code>
			{/snippet}
		</Card>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Pro Tips</p>
	<Card color="info">
		<div class="column gap-3">
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Section & Card:</strong> Both components support flex and grid utilities in their
					<code class="px-1 py-0.5 bg-blue rounded">class</code> prop
				</li>
				<li>
					<strong>Responsive:</strong> Combine with breakpoint prefixes:
					<code class="px-1 py-0.5 bg-blue rounded">column lg:row</code> or
					<code class="px-1 py-0.5 bg-blue rounded">grid-1 md:grid-3</code>
				</li>
				<li>
					<strong>Grid Auto-Fit:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">grid-auto-fit</code> for truly responsive layouts
					that adapt to any screen size
				</li>
				<li>
					<strong>Center:</strong> The <code class="px-1 py-0.5 bg-blue rounded">center</code> utility
					works with both flex and grid layouts
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage Examples</p>
	<Card>
		<Code
			lang="svelte"
			code={`<!-- Flex Row -->
<div class="row gap-4">
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
</div>

<!-- Flex Column -->
<div class="column gap-4">
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
</div>

<!-- Grid with 3 Columns -->
<div class="grid-3 gap-4">
	<div>Item 1</div>
	<div>Item 2</div>
	<div>Item 3</div>
</div>

<!-- Responsive Layout -->
<div class="column md:row gap-4">
	<div>Stacks on mobile, side-by-side on desktop</div>
	<div>Second item</div>
</div>

<!-- Centered Content -->
<div class="row center min-h-[200px]">
	<div>Centered both horizontally and vertically</div>
</div>

<!-- Auto-fit Grid -->
<div class="grid-auto-fit gap-4">
	<div>Auto-sizing column</div>
	<div>Auto-sizing column</div>
	<div>Auto-sizing column</div>
</div>`}
		/>
	</Card>
</Section>
