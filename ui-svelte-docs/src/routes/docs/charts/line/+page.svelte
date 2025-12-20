<script lang="ts">
	import { Card, Checkbox, Code, LineChart, Section, Select } from 'ui-svelte';
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
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const curveOptions = [
		{ id: 'linear', label: 'Linear' },
		{ id: 'smooth', label: 'Smooth' }
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

	let color: any = $state('primary');
	let size: any = $state('md');
	let curve: any = $state('linear');
	let palette: any = $state('');
	let legendPosition: any = $state('bottom');

	let hidePoints = $state(false);
	let hideGrid = $state(false);
	let hideLegend = $state(false);
	let hideXAxis = $state(false);
	let hideYAxis = $state(false);
	let showGradientFill = $state(false);
	let showGlow = $state(false);
	let disableAnimation = $state(false);
	let loading = $state(false);
	let empty = $state(false);
	let useSeries = $state(false);

	const sampleData = [
		{ x: 0, y: 10 },
		{ x: 1, y: 25 },
		{ x: 2, y: 15 },
		{ x: 3, y: 40 },
		{ x: 4, y: 30 },
		{ x: 5, y: 50 }
	];

	const sampleSeries = [
		{
			name: 'Sales',
			data: [
				{ x: 0, y: 10 },
				{ x: 1, y: 25 },
				{ x: 2, y: 15 },
				{ x: 3, y: 40 },
				{ x: 4, y: 30 },
				{ x: 5, y: 50 }
			]
		},
		{
			name: 'Revenue',
			data: [
				{ x: 0, y: 15 },
				{ x: 1, y: 20 },
				{ x: 2, y: 30 },
				{ x: 3, y: 25 },
				{ x: 4, y: 45 },
				{ x: 5, y: 40 }
			]
		},
		{
			name: 'Profit',
			data: [
				{ x: 0, y: 5 },
				{ x: 1, y: 15 },
				{ x: 2, y: 12 },
				{ x: 3, y: 20 },
				{ x: 4, y: 25 },
				{ x: 5, y: 35 }
			]
		}
	];

	let hasProps = $derived(
		[
			color !== 'primary',
			size !== 'md',
			curve !== 'linear',
			palette,
			legendPosition !== 'bottom',
			hidePoints,
			hideGrid,
			hideLegend,
			hideXAxis,
			hideYAxis,
			showGradientFill,
			showGlow,
			disableAnimation,
			loading,
			empty,
			useSeries
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { LineChart } from 'ui-svelte';`,
			useSeries
				? `\n\tconst series = [\n\t\t{ name: 'Sales', data: [{ x: 0, y: 10 }, { x: 1, y: 25 }, { x: 2, y: 15 }] },\n\t\t{ name: 'Revenue', data: [{ x: 0, y: 15 }, { x: 1, y: 20 }, { x: 2, y: 30 }] }\n\t];`
				: `\n\tconst data = [\n\t\t{ x: 0, y: 10 },\n\t\t{ x: 1, y: 25 },\n\t\t{ x: 2, y: 15 },\n\t\t{ x: 3, y: 40 },\n\t\t{ x: 4, y: 30 },\n\t\t{ x: 5, y: 50 }\n\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<LineChart`,
			useSeries ? `\tseries={series}` : `\tdata={data}`,
			color !== 'primary' && !useSeries && `\tcolor="${color}"`,
			size !== 'md' && `\tsize="${size}"`,
			curve !== 'linear' && `\tcurve="${curve}"`,
			palette && `\tpalette="${palette}"`,
			legendPosition !== 'bottom' && `\tlegendPosition="${legendPosition}"`,
			hidePoints && `\thidePoints`,
			hideGrid && `\thideGrid`,
			hideLegend && `\thideLegend`,
			hideXAxis && `\thideXAxis`,
			hideYAxis && `\thideYAxis`,
			showGradientFill && `\tshowGradientFill`,
			showGlow && `\tshowGlow`,
			disableAnimation && `\tdisableAnimation`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && (useSeries ? `<LineChart series={series} />` : `<LineChart data={data} />`)
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[]', initial: '[]' },
		{ prop: 'series', type: 'Series[]', initial: '[]' },
		{ prop: 'color', type: 'Color', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'curve', type: 'linear | smooth', initial: 'linear' },
		{ prop: 'palette', type: 'default | rainbow | ocean | sunset | forest | neon', initial: '' },
		{ prop: 'legendPosition', type: 'top | right | bottom | left | none', initial: 'bottom' },
		{ prop: 'hidePoints', type: 'boolean', initial: 'false' },
		{ prop: 'hideGrid', type: 'boolean', initial: 'false' },
		{ prop: 'hideLegend', type: 'boolean', initial: 'false' },
		{ prop: 'hideXAxis', type: 'boolean', initial: 'false' },
		{ prop: 'hideYAxis', type: 'boolean', initial: 'false' },
		{ prop: 'showGradientFill', type: 'boolean', initial: 'false' },
		{ prop: 'showGlow', type: 'boolean', initial: 'false' },
		{ prop: 'disableAnimation', type: 'boolean', initial: 'false' },
		{ prop: 'animationDuration', type: 'number', initial: '800' },
		{ prop: 'strokeWidth', type: 'number', initial: '2' },
		{ prop: 'pointRadius', type: 'number', initial: '3' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 40, left: 50 }' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'valueFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'xFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'onClick', type: '(point, seriesName, index) => void', initial: '' },
		{ prop: 'onHover', type: '(point, seriesName, index) => void', initial: '' },
		{ prop: 'tooltipContent', type: 'Snippet', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' }
	];

	const dataPointProps = [
		{ prop: 'x', type: 'number', initial: '', required: true },
		{ prop: 'y', type: 'number', initial: '', required: true }
	];

	const seriesProps = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'data', type: 'DataPoint[]', initial: '', required: true },
		{ prop: 'color', type: 'Color', initial: '' }
	];
</script>

<DocsHeader title="LineChart">
	LineChart visualizes data trends over continuous intervals with customizable styling, multiple
	series support, animations, and interactive tooltips.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
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
				label="Curve"
				size="sm"
				options={curveOptions}
				bind:value={curve}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Palette"
				size="sm"
				options={paletteOptions}
				bind:value={palette}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Legend Position"
				size="sm"
				options={legendPositionOptions}
				bind:value={legendPosition}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			{#if !useSeries}
				<Select
					isFloatLabel
					rootClass="max-w-xs"
					label="Color"
					size="sm"
					options={colorOptions}
					bind:value={color}
				/>
			{/if}
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={useSeries} label="Multiple Series" />
			<Checkbox bind:checked={hidePoints} label="Hide Points" />
			<Checkbox bind:checked={hideGrid} label="Hide Grid" />
			<Checkbox bind:checked={hideLegend} label="Hide Legend" />
			<Checkbox bind:checked={hideXAxis} label="Hide X Axis" />
			<Checkbox bind:checked={hideYAxis} label="Hide Y Axis" />
			<Checkbox bind:checked={showGradientFill} label="Gradient Fill" />
			<Checkbox bind:checked={showGlow} label="Glow Effect" />
			<Checkbox bind:checked={disableAnimation} label="Disable Animation" />
			<Checkbox bind:checked={loading} label="Loading" />
			<Checkbox bind:checked={empty} label="Empty" />
		</div>

		<div class="doc-preview">
			<LineChart
				data={useSeries ? undefined : sampleData}
				series={useSeries ? sampleSeries : undefined}
				{color}
				{size}
				{curve}
				palette={palette || undefined}
				{legendPosition}
				{hidePoints}
				{hideGrid}
				{hideLegend}
				{hideXAxis}
				{hideYAxis}
				{showGradientFill}
				{showGlow}
				{disableAnimation}
				{loading}
				{empty}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each sizeOptions as sizeItem}
			<div class="mb-8">
				<p class="text-sm text-on-muted mb-2">Size: {sizeItem.label}</p>
				<LineChart data={sampleData} size={sizeItem.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Colors</p>
	<Card>
		<div class="grid md:grid-2 gap-4">
			{#each colorOptions as colorItem}
				<div>
					<p class="text-sm text-on-muted mb-2">{colorItem.label}</p>
					<LineChart data={sampleData} size="sm" color={colorItem.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Palettes (Multiple Series)</p>
	<Card>
		{#each paletteOptions.filter((p) => p.id) as paletteItem}
			<div class="mb-8">
				<p class="text-sm text-on-muted mb-2">Palette: {paletteItem.label}</p>
				<LineChart series={sampleSeries} size="sm" palette={paletteItem.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Curve Types</p>
	<Card>
		<div class="grid md:grid-2 gap-4">
			{#each curveOptions as curveItem}
				<div>
					<p class="text-sm text-on-muted mb-2">{curveItem.label}</p>
					<LineChart data={sampleData} size="sm" curve={curveItem.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Legend Positions</p>
	<Card>
		{#each legendPositionOptions.filter((p) => p.id !== 'none') as posItem}
			<div class="mb-8">
				<p class="text-sm text-on-muted mb-2">Legend: {posItem.label}</p>
				<LineChart series={sampleSeries} size="sm" legendPosition={posItem.id as any} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Visual Effects</p>
	<Card>
		<div class="grid md:grid-2 gap-4">
			<div>
				<p class="text-sm text-on-muted mb-2">Gradient Fill</p>
				<LineChart data={sampleData} size="sm" showGradientFill />
			</div>
			<div>
				<p class="text-sm text-on-muted mb-2">Glow Effect</p>
				<LineChart data={sampleData} size="sm" showGlow />
			</div>
			<div>
				<p class="text-sm text-on-muted mb-2">Both Effects</p>
				<LineChart data={sampleData} size="sm" showGradientFill showGlow />
			</div>
			<div>
				<p class="text-sm text-on-muted mb-2">Smooth Curve with Effects</p>
				<LineChart data={sampleData} size="sm" curve="smooth" showGradientFill showGlow />
			</div>
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
