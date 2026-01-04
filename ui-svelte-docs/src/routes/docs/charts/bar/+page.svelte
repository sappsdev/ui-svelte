<script lang="ts">
	import { BarChart, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' },
		{ id: 'xl', label: 'Extra Large' }
	];

	const chartTypeOptions = [
		{ id: 'single', label: 'Single Series' },
		{ id: 'grouped', label: 'Grouped' },
		{ id: 'stacked', label: 'Stacked' }
	];

	const paletteOptions = [
		{ id: '', label: 'None' },
		{ id: 'default', label: 'Default' },
		{ id: 'rainbow', label: 'Rainbow' },
		{ id: 'ocean', label: 'Ocean' },
		{ id: 'sunset', label: 'Sunset' },
		{ id: 'forest', label: 'Forest' },
		{ id: 'neon', label: 'Neon' }
	];

	const legendPositionOptions = [
		{ id: 'none', label: 'None' },
		{ id: 'top', label: 'Top' },
		{ id: 'right', label: 'Right' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'left', label: 'Left' }
	];

	const singleData = [
		{ label: 'Jan', value: 65 },
		{ label: 'Feb', value: 59 },
		{ label: 'Mar', value: 80 },
		{ label: 'Apr', value: 81 },
		{ label: 'May', value: 56 },
		{ label: 'Jun', value: 55 }
	];

	const seriesData = [
		{
			name: 'Product A',
			data: [
				{ label: 'Jan', value: 65 },
				{ label: 'Feb', value: 59 },
				{ label: 'Mar', value: 80 },
				{ label: 'Apr', value: 81 },
				{ label: 'May', value: 56 },
				{ label: 'Jun', value: 55 }
			],
			color: 'primary' as const
		},
		{
			name: 'Product B',
			data: [
				{ label: 'Jan', value: 28 },
				{ label: 'Feb', value: 48 },
				{ label: 'Mar', value: 40 },
				{ label: 'Apr', value: 19 },
				{ label: 'May', value: 86 },
				{ label: 'Jun', value: 27 }
			],
			color: 'secondary' as const
		},
		{
			name: 'Product C',
			data: [
				{ label: 'Jan', value: 45 },
				{ label: 'Feb', value: 25 },
				{ label: 'Mar', value: 60 },
				{ label: 'Apr', value: 50 },
				{ label: 'May', value: 40 },
				{ label: 'Jun', value: 70 }
			],
			color: 'success' as const
		}
	];

	let color: any = $state('primary');
	let size: any = $state('md');
	let chartType: any = $state('single');
	let palette: any = $state('');
	let legendPosition: any = $state('bottom');

	let hideGrid = $state(false);
	let showLegend = $state(false);
	let showValues = $state(false);
	let showGradient = $state(false);
	let showGlow = $state(false);
	let disableAnimation = $state(false);
	let loading = $state(false);
	let empty = $state(false);

	let isGrouped = $derived(chartType === 'grouped');
	let isStacked = $derived(chartType === 'stacked');
	let isSeries = $derived(chartType !== 'single');

	let hasProps = $derived(
		[
			color !== 'primary',
			size !== 'md',
			hideGrid,
			showLegend,
			showValues,
			showGradient,
			showGlow,
			disableAnimation,
			isGrouped,
			isStacked,
			palette,
			legendPosition !== 'bottom',
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { BarChart } from 'ui-svelte';`,
			isSeries ? `\n\tconst series = [` : `\n\tconst data = [`,
			isSeries ? `\t\t{` : `\t\t{ label: 'Jan', value: 65 },`,
			isSeries ? `\t\t\tname: 'Product A',` : `\t\t{ label: 'Feb', value: 59 },`,
			isSeries
				? `\t\t\tdata: [{ label: 'Jan', value: 65 }, ...]`
				: `\t\t{ label: 'Mar', value: 80 },`,
			isSeries ? `\t\t}` : `\t\t...`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<BarChart`,
			isSeries ? `\t{series}` : `\t{data}`,
			color !== 'primary' && !isSeries && `\tcolor="${color}"`,
			size !== 'md' && `\tsize="${size}"`,
			isGrouped && `\tgrouped`,
			isStacked && `\tstacked`,
			hideGrid && `\thideGrid`,
			showLegend && isSeries && `\tshowLegend`,
			showValues && `\tshowValues`,
			showGradient && `\tshowGradient`,
			showGlow && `\tshowGlow`,
			disableAnimation && `\tdisableAnimation`,
			palette && `\tpalette="${palette}"`,
			legendPosition !== 'bottom' && `\tlegendPosition="${legendPosition}"`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && (isSeries ? `<BarChart {series} />` : `<BarChart {data} />`)
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[]', initial: '[]' },
		{ prop: 'series', type: 'Series[]', initial: '[]' },
		{ prop: 'color', type: 'Color', initial: 'primary' },
		{ prop: 'colors', type: 'Color[]', initial: "['primary', 'secondary', ...]" },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'palette', type: 'Palette', initial: '' },
		{ prop: 'grouped', type: 'boolean', initial: 'false' },
		{ prop: 'stacked', type: 'boolean', initial: 'false' },
		{ prop: 'hideGrid', type: 'boolean', initial: 'false' },
		{ prop: 'showLegend', type: 'boolean', initial: 'false' },
		{ prop: 'showValues', type: 'boolean', initial: 'false' },
		{ prop: 'showGradient', type: 'boolean', initial: 'false' },
		{ prop: 'showGlow', type: 'boolean', initial: 'false' },
		{ prop: 'legendPosition', type: 'top | right | bottom | left | none', initial: 'bottom' },
		{ prop: 'disableAnimation', type: 'boolean', initial: 'false' },
		{ prop: 'animationDuration', type: 'number', initial: '800' },
		{ prop: 'barPadding', type: 'number', initial: '0.2' },
		{ prop: 'groupPadding', type: 'number', initial: '0.1' },
		{ prop: 'barRadius', type: 'number', initial: '4' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 40, left: 50 }' },
		{ prop: 'valueFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'onClick', type: '(bar, seriesIndex, dataIndex) => void', initial: '' },
		{ prop: 'onHover', type: '(bar, seriesIndex, dataIndex) => void', initial: '' },
		{ prop: 'tooltipContent', type: 'Snippet', initial: '' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' }
	];

	const dataPointProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'value', type: 'number', initial: '', required: true }
	];

	const seriesProps = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'data', type: 'DataPoint[]', initial: '', required: true },
		{ prop: 'color', type: 'Color', initial: '' }
	];
</script>

<DocsHeader title="BarChart" llmUrl="https://ui-svelte.sappsdev.com/llm/charts/bar.md">
	BarChart visualizes data with rectangular bars representing values. Supports single series,
	grouped, and stacked layouts with animations, tooltips, and customizable legends.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Chart Type"
				size="sm"
				options={chartTypeOptions}
				bind:value={chartType}
			/>
			{#if !isSeries}
				<Select
					isFloatLabel
					rootClass="max-w-xs"
					label="Color"
					size="sm"
					options={colorOptions}
					bind:value={color}
				/>
			{/if}
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Palette"
				size="sm"
				options={paletteOptions}
				bind:value={palette}
			/>
			{#if showLegend && isSeries}
				<Select
					isFloatLabel
					rootClass="max-w-xs"
					label="Legend Position"
					size="sm"
					options={legendPositionOptions}
					bind:value={legendPosition}
				/>
			{/if}
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hideGrid} label="hideGrid" />
			{#if isSeries}
				<Checkbox bind:checked={showLegend} label="showLegend" />
			{/if}
			<Checkbox bind:checked={showValues} label="showValues" />
			<Checkbox bind:checked={showGradient} label="showGradient" />
			<Checkbox bind:checked={showGlow} label="showGlow" />
			<Checkbox bind:checked={disableAnimation} label="disableAnimation" />
			<Checkbox bind:checked={loading} label="loading" />
			<Checkbox bind:checked={empty} label="empty" />
		</div>

		<div class="doc-preview">
			<BarChart
				data={isSeries ? undefined : singleData}
				series={isSeries ? seriesData : undefined}
				{color}
				{size}
				palette={palette || undefined}
				grouped={isGrouped || undefined}
				stacked={isStacked || undefined}
				{hideGrid}
				showLegend={showLegend && isSeries ? showLegend : undefined}
				{showValues}
				{showGradient}
				{showGlow}
				{disableAnimation}
				{legendPosition}
				{loading}
				{empty}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		<div class="grid md:grid-2 gap-8">
			{#each sizeOptions as sizeItem}
				<div>
					<p class="text-sm text-on-muted mb-2">{sizeItem.label}</p>
					<BarChart data={singleData} size={sizeItem.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Palettes</p>
	<Card color="background" variant="outlined">
		<div class="grid md:grid-2 gap-8">
			{#each paletteOptions.slice(1) as paletteItem}
				<div>
					<p class="text-sm text-on-muted mb-2">{paletteItem.label}</p>
					<BarChart
						series={seriesData}
						grouped
						palette={paletteItem.id as any}
						showLegend
						size="sm"
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Chart Modes</p>
	<Card color="background" variant="outlined">
		<div class="grid md:grid-3 gap-8">
			<div>
				<p class="text-sm text-on-muted mb-2">Single Series</p>
				<BarChart data={singleData} color="primary" />
			</div>
			<div>
				<p class="text-sm text-on-muted mb-2">Grouped</p>
				<BarChart series={seriesData} grouped showLegend />
			</div>
			<div>
				<p class="text-sm text-on-muted mb-2">Stacked</p>
				<BarChart series={seriesData} stacked showLegend />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Visual Effects</p>
	<Card color="background" variant="outlined">
		<div class="grid md:grid-2 gap-8">
			<div>
				<p class="text-sm text-on-muted mb-2">With Gradient</p>
				<BarChart data={singleData} showGradient color="secondary" />
			</div>
			<div>
				<p class="text-sm text-on-muted mb-2">With Glow</p>
				<BarChart data={singleData} showGlow color="info" />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Legend Positions</p>
	<Card color="background" variant="outlined">
		<div class="grid md:grid-2 gap-8">
			{#each legendPositionOptions.slice(1) as posItem}
				<div>
					<p class="text-sm text-on-muted mb-2">{posItem.label}</p>
					<BarChart series={seriesData} grouped showLegend legendPosition={posItem.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">DataPoint Type</p>
	<DocsProps props={dataPointProps} />
</Section>

<Section>
	<p class="section-subtitle">Series Type</p>
	<DocsProps props={seriesProps} />
</Section>
