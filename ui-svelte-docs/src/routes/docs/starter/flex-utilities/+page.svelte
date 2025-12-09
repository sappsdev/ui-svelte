<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import { Checkbox, Select, Section, Card, Tabs } from 'ui-svelte';

	const exampleOptions = [
		{ id: 'basic', label: 'Basic Layout' },
		{ id: 'section-row', label: 'Section - Horizontal Cards' },
		{ id: 'section-column', label: 'Section - Vertical Stack' },
		{ id: 'card-grid', label: 'Card - Grid Items' },
		{ id: 'responsive', label: 'Responsive Layout' }
	];

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

	let selectedExample: any = $state('basic');
	let useCenter = $state(false);
	let useGap = $state(true);

	let layoutType: any = $state('flex');
	let flexDirection: any = $state('row');
	let gridCols: any = $state('grid-3');

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
		switch (selectedExample) {
			case 'basic':
				const classString = classes();
				const items = layoutType === 'grid' ? 6 : 3;
				const itemsArray = Array.from({ length: items }, (_, i) => i + 1);
				return [
					`<div class="${classString}">`,
					...itemsArray.map(
						(i) => `\t<div class="p-4 bg-primary text-white rounded">Item ${i}</div>`
					),
					`</div>`
				].join('\n');

			case 'section-row':
				return `<Section class="column md:row gap-4">
\t<Card>
\t\t<h3 class="font-semibold mb-2">Card 1</h3>
\t\t<p class="text-sm text-on-muted">Content for the first card</p>
\t</Card>
\t<Card>
\t\t<h3 class="font-semibold mb-2">Card 2</h3>
\t\t<p class="text-sm text-on-muted">Content for the second card</p>
\t</Card>
\t<Card>
\t\t<h3 class="font-semibold mb-2">Card 3</h3>
\t\t<p class="text-sm text-on-muted">Content for the third card</p>
\t</Card>
</Section>`;

			case 'section-column':
				return `<Section class="column gap-6">
\t<Card>
\t\t<h2 class="text-xl font-bold mb-2">Header</h2>
\t\t<p>Main header content</p>
\t</Card>
\t<Card>
\t\t<h3 class="font-semibold mb-2">Content</h3>
\t\t<p>Main content area</p>
\t</Card>
\t<Card>
\t\t<p class="text-sm text-on-muted">Footer</p>
\t</Card>
</Section>`;

			case 'card-grid':
				return `<Card class="grid-2 md:grid-4 gap-4">
\t<div class="p-4 bg-primary rounded">Item 1</div>
\t<div class="p-4 bg-primary rounded">Item 2</div>
\t<div class="p-4 bg-primary rounded">Item 3</div>
\t<div class="p-4 bg-primary rounded">Item 4</div>
\t<div class="p-4 bg-primary rounded">Item 5</div>
\t<div class="p-4 bg-primary rounded">Item 6</div>
\t<div class="p-4 bg-primary rounded">Item 7</div>
\t<div class="p-4 bg-primary rounded">Item 8</div>
</Card>`;

			case 'responsive':
				return `<Section class="column lg:row gap-4">
\t<Card class="flex-1">
\t\t<h3 class="font-semibold mb-2">Sidebar</h3>
\t\t<p class="text-sm">Stacks on mobile, side-by-side on desktop</p>
\t</Card>
\t<Card class="flex-[2]">
\t\t<h3 class="font-semibold mb-2">Main Content</h3>
\t\t<p class="text-sm">Takes more space on desktop</p>
\t</Card>
</Section>`;

			default:
				return '';
		}
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
			utility: 'grid-7',
			equivalent: 'grid grid-cols-7',
			description: 'Creates a grid with 7 columns'
		},
		{
			utility: 'grid-8',
			equivalent: 'grid grid-cols-8',
			description: 'Creates a grid with 8 columns'
		},
		{
			utility: 'grid-9',
			equivalent: 'grid grid-cols-9',
			description: 'Creates a grid with 9 columns'
		},
		{
			utility: 'grid-10',
			equivalent: 'grid grid-cols-10',
			description: 'Creates a grid with 10 columns'
		},
		{
			utility: 'grid-12',
			equivalent: 'grid grid-cols-12',
			description: 'Creates a grid with 12 columns'
		},
		{
			utility: 'grid-auto-fit',
			equivalent: 'grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
			description: 'Responsive grid that auto-fits columns based on available space'
		},
		{
			utility: 'grid-auto-fill',
			equivalent: 'grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]',
			description: 'Responsive grid that auto-fills columns based on available space'
		}
	];

	const utilityTabs = [
		{
			id: 'flex',
			label: 'Flex Utilities',
			content: flexUtilitiesContent
		},
		{
			id: 'grid',
			label: 'Grid Utilities',
			content: gridUtilitiesContent
		}
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
						<td class="p-3">
							<code class="px-2 py-1 rounded text-sm">{util.utility}</code>
						</td>
						<td class="p-3">
							<code class="px-2 py-1 rounded text-sm">{util.equivalent}</code>
						</td>
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
						<td class="p-3">
							<code class="px-2 py-1 bg-muted-100 rounded text-sm">{util.utility}</code>
						</td>
						<td class="p-3">
							<code class="px-2 py-1 bg-muted-100 rounded text-xs">{util.equivalent}</code>
						</td>
						<td class="p-3 text-sm text-on-muted">{util.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet preview()}
	{#if selectedExample === 'basic'}
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
	{:else if selectedExample === 'section-row'}
		<Section class="column md:row gap-4">
			<Card>
				<h3 class="font-semibold mb-2">Card 1</h3>
				<p class="text-sm text-on-muted">Content for the first card</p>
			</Card>
			<Card>
				<h3 class="font-semibold mb-2">Card 2</h3>
				<p class="text-sm text-on-muted">Content for the second card</p>
			</Card>
			<Card>
				<h3 class="font-semibold mb-2">Card 3</h3>
				<p class="text-sm text-on-muted">Content for the third card</p>
			</Card>
		</Section>
	{:else if selectedExample === 'section-column'}
		<Section class="column gap-6">
			<Card>
				<h2 class="text-xl font-bold mb-2">Header</h2>
				<p>Main header content</p>
			</Card>
			<Card>
				<h3 class="font-semibold mb-2">Content</h3>
				<p>Main content area</p>
			</Card>
			<Card>
				<p class="text-sm text-on-muted">Footer</p>
			</Card>
		</Section>
	{:else if selectedExample === 'card-grid'}
		<Card class="grid-2 md:grid-4 gap-4">
			<div class="p-4 bg-primary rounded">Item 1</div>
			<div class="p-4 bg-primary rounded">Item 2</div>
			<div class="p-4 bg-primary rounded">Item 3</div>
			<div class="p-4 bg-primary rounded">Item 4</div>
			<div class="p-4 bg-primary rounded">Item 5</div>
			<div class="p-4 bg-primary rounded">Item 6</div>
			<div class="p-4 bg-primary rounded">Item 7</div>
			<div class="p-4 bg-primary rounded">Item 8</div>
		</Card>
	{:else if selectedExample === 'responsive'}
		<Section class="column lg:row gap-4">
			<Card class="flex-1">
				<h3 class="font-semibold mb-2">Sidebar</h3>
				<p class="text-sm">Stacks on mobile, side-by-side on desktop</p>
			</Card>
			<Card class="flex-1">
				<h3 class="font-semibold mb-2">Main Content</h3>
				<p class="text-sm">Takes more space on desktop</p>
			</Card>
		</Section>
	{:else if selectedExample === 'dashboard'}
		<div class="column gap-6">
			<Section class="row gap-4">
				<Card class="flex-1">
					<h3 class="text-2xl font-bold">1,234</h3>
					<p class="text-sm text-on-muted">Total Users</p>
				</Card>
				<Card class="flex-1">
					<h3 class="text-2xl font-bold">$12.5K</h3>
					<p class="text-sm text-on-muted">Revenue</p>
				</Card>
				<Card class="flex-1">
					<h3 class="text-2xl font-bold">89%</h3>
					<p class="text-sm text-on-muted">Satisfaction</p>
				</Card>
			</Section>

			<Card class="grid-1 md:grid-3 gap-4">
				<div class="p-4 bg-muted rounded">Feature 1</div>
				<div class="p-4 bg-muted rounded">Feature 2</div>
				<div class="p-4 bg-muted rounded">Feature 3</div>
			</Card>
		</div>
	{/if}
{/snippet}

{#snippet builder()}
	<Select label="Example" size="sm" options={exampleOptions} bind:value={selectedExample} />

	{#if selectedExample === 'basic'}
		<div class="column gap-3 mt-4">
			<Select
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
					label="Direction"
					size="sm"
					options={flexDirectionOptions}
					bind:value={flexDirection}
				/>
			{:else}
				<Select label="Grid Columns" size="sm" options={gridColsOptions} bind:value={gridCols} />
			{/if}

			<DocOptions title="Options">
				<Checkbox bind:checked={useCenter} label="Center" />
				<Checkbox bind:checked={useGap} label="Gap (gap-4)" />
			</DocOptions>
		</div>
	{/if}
{/snippet}

<DocHeader title="Flex & Grid Utilities">
	Utility classes for quickly creating flex and grid layouts. These utilities simplify common layout
	patterns by combining multiple Tailwind classes into single, semantic class names.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<Section>
	<Card>
		<Tabs tabs={utilityTabs} />
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
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
