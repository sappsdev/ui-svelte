<script lang="ts">
	import { AreaChart, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	const sampleData = [
		{ x: 1, y: 45 },
		{ x: 2, y: 35 },
		{ x: 3, y: 55 },
		{ x: 4, y: 50 },
		{ x: 5, y: 70 },
		{ x: 6, y: 65 },
		{ x: 7, y: 80 }
	];

	const sampleSeries = [
		{
			name: 'Revenue',
			data: [
				{ x: 1, y: 45 },
				{ x: 2, y: 35 },
				{ x: 3, y: 55 },
				{ x: 4, y: 50 },
				{ x: 5, y: 70 },
				{ x: 6, y: 65 },
				{ x: 7, y: 80 }
			]
		},
		{
			name: 'Expenses',
			data: [
				{ x: 1, y: 30 },
				{ x: 2, y: 45 },
				{ x: 3, y: 40 },
				{ x: 4, y: 60 },
				{ x: 5, y: 55 },
				{ x: 6, y: 75 },
				{ x: 7, y: 70 }
			]
		},
		{
			name: 'Profit',
			data: [
				{ x: 1, y: 15 },
				{ x: 2, y: 20 },
				{ x: 3, y: 25 },
				{ x: 4, y: 18 },
				{ x: 5, y: 35 },
				{ x: 6, y: 30 },
				{ x: 7, y: 45 }
			]
		}
	];

	let color: any = $state('primary');
	let size: any = $state('md');
	let curve: any = $state('smooth');
	let palette: any = $state('');
	let legendPosition: any = $state('bottom');

	let useSeries = $state(true);
	let hideLine = $state(false);
	let showPoints = $state(false);
	let hideGrid = $state(false);
	let hideLegend = $state(false);
	let hideGradient = $state(false);
	let stacked = $state(false);
	let disableAnimation = $state(false);
	let hideXAxis = $state(false);
	let hideYAxis = $state(false);
	let showGlow = $state(false);
	let loading = $state(false);
	let empty = $state(false);

	let hasProps = $derived(
		[
			color !== 'primary',
			size !== 'md',
			curve !== 'smooth',
			palette,
			legendPosition !== 'bottom',
			useSeries,
			hideLine,
			showPoints,
			hideGrid,
			hideLegend,
			hideGradient,
			stacked,
			disableAnimation,
			hideXAxis,
			hideYAxis,
			showGlow,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AreaChart } from 'ui-svelte';`,
			useSeries
				? [
						`\n\tconst series = [`,
						`\t\t{`,
						`\t\t\tname: 'Revenue',`,
						`\t\t\tdata: [`,
						`\t\t\t\t{ x: 1, y: 45 },`,
						`\t\t\t\t{ x: 2, y: 35 },`,
						`\t\t\t\t{ x: 3, y: 55 }`,
						`\t\t\t]`,
						`\t\t},`,
						`\t\t{`,
						`\t\t\tname: 'Expenses',`,
						`\t\t\tdata: [`,
						`\t\t\t\t{ x: 1, y: 30 },`,
						`\t\t\t\t{ x: 2, y: 45 },`,
						`\t\t\t\t{ x: 3, y: 40 }`,
						`\t\t\t]`,
						`\t\t}`,
						`\t];`
					].join('\n')
				: [
						`\n\tconst data = [`,
						`\t\t{ x: 1, y: 45 },`,
						`\t\t{ x: 2, y: 35 },`,
						`\t\t{ x: 3, y: 55 }`,
						`\t];`
					].join('\n'),
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<AreaChart`,
			useSeries ? `\tseries={series}` : `\tdata={data}`,
			color !== 'primary' && !useSeries && `\tcolor="${color}"`,
			size !== 'md' && `\tsize="${size}"`,
			curve !== 'smooth' && `\tcurve="${curve}"`,
			palette && `\tpalette="${palette}"`,
			legendPosition !== 'bottom' && `\tlegendPosition="${legendPosition}"`,
			hideLine && `\thideLine`,
			showPoints && `\tshowPoints`,
			hideGrid && `\thideGrid`,
			hideLegend && `\thideLegend`,
			hideGradient && `\thideGradient`,
			stacked && `\tstacked`,
			disableAnimation && `\tdisableAnimation`,
			hideXAxis && `\thideXAxis`,
			hideYAxis && `\thideYAxis`,
			showGlow && `\tshowGlow`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && (useSeries ? `<AreaChart series={series} />` : `<AreaChart data={data} />`)
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[]', initial: '[]' },
		{ prop: 'series', type: 'Series[]', initial: '[]' },
		{ prop: 'color', type: 'Color', initial: 'primary' },
		{ prop: 'colors', type: 'Color[]', initial: "['primary', 'secondary', ...]" },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'curve', type: 'linear | smooth', initial: 'linear' },
		{ prop: 'palette', type: 'default | rainbow | ocean | sunset | forest | neon', initial: '' },
		{ prop: 'legendPosition', type: 'top | right | bottom | left | none', initial: 'bottom' },
		{ prop: 'strokeWidth', type: 'number', initial: '2' },
		{ prop: 'fillOpacity', type: 'number', initial: '0.3' },
		{ prop: 'animationDuration', type: 'number', initial: '800' },
		{ prop: 'hideLine', type: 'boolean', initial: 'false' },
		{ prop: 'showPoints', type: 'boolean', initial: 'false' },
		{ prop: 'hideGrid', type: 'boolean', initial: 'false' },
		{ prop: 'hideLegend', type: 'boolean', initial: 'false' },
		{ prop: 'hideGradient', type: 'boolean', initial: 'false' },
		{ prop: 'stacked', type: 'boolean', initial: 'false' },
		{ prop: 'disableAnimation', type: 'boolean', initial: 'false' },
		{ prop: 'hideXAxis', type: 'boolean', initial: 'false' },
		{ prop: 'hideYAxis', type: 'boolean', initial: 'false' },
		{ prop: 'showGlow', type: 'boolean', initial: 'false' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' },
		{ prop: 'valueFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'xFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'onClick', type: '(point, series, index) => void', initial: '' },
		{ prop: 'onHover', type: '(point, series, index) => void', initial: '' },
		{ prop: 'tooltipContent', type: 'Snippet', initial: '' }
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

<DocsHeader title="AreaChart" llmUrl="https://ui-svelte.sappsdev.com/llm/charts/area.md">
	AreaChart components visualize data as filled areas under lines, ideal for showing trends,
	comparisons over time, and stacked data visualization.
</DocsHeader>

<Section>
	<Card>
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
			<Checkbox bind:checked={useSeries} label="Multiple Series" />
			<Checkbox bind:checked={showPoints} label="showPoints" />
			<Checkbox bind:checked={stacked} label="stacked" />
			<Checkbox bind:checked={showGlow} label="showGlow" />
		</div>

		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hideLine} label="hideLine" />
			<Checkbox bind:checked={hideGrid} label="hideGrid" />
			<Checkbox bind:checked={hideLegend} label="hideLegend" />
			<Checkbox bind:checked={hideGradient} label="hideGradient" />
			<Checkbox bind:checked={hideXAxis} label="hideXAxis" />
			<Checkbox bind:checked={hideYAxis} label="hideYAxis" />
			<Checkbox bind:checked={disableAnimation} label="disableAnimation" />
		</div>

		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={loading} label="loading" />
			<Checkbox bind:checked={empty} label="empty" />
		</div>

		<div class="doc-preview">
			<AreaChart
				data={useSeries ? undefined : sampleData}
				series={useSeries ? sampleSeries : undefined}
				{color}
				{size}
				{curve}
				palette={palette || undefined}
				{legendPosition}
				{hideLine}
				{showPoints}
				{hideGrid}
				{hideLegend}
				{hideGradient}
				{stacked}
				{disableAnimation}
				{hideXAxis}
				{hideYAxis}
				{showGlow}
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
		<div class="col gap-8">
			{#each sizeOptions as sizeOption}
				<div class="col gap-2">
					<p class="text-sm text-on-muted font-medium">{sizeOption.label.toUpperCase()}</p>
					<AreaChart data={sampleData} size={sizeOption.id as any} curve="smooth" />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Palettes</p>
	<Card>
		<div class="col gap-8">
			{#each paletteOptions.filter((p) => p.id) as paletteOption}
				<div class="col gap-2">
					<p class="text-sm text-on-muted font-medium">{paletteOption.label}</p>
					<AreaChart series={sampleSeries} palette={paletteOption.id as any} curve="smooth" />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Legend Positions</p>
	<Card>
		<div class="grid-1 md:grid-2 gap-8">
			{#each legendPositionOptions.filter((l) => l.id !== 'none') as legendOption}
				<div class="col gap-2">
					<p class="text-sm text-on-muted font-medium">{legendOption.label}</p>
					<AreaChart
						series={sampleSeries}
						legendPosition={legendOption.id as any}
						curve="smooth"
						size="sm"
					/>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Stacked Area Chart</p>
	<Card>
		<AreaChart series={sampleSeries} stacked curve="smooth" palette="ocean" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Glow Effect</p>
	<Card>
		<AreaChart series={sampleSeries} showGlow showPoints curve="smooth" palette="neon" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Single Color Chart</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each colorOptions as colorOption}
				<div class="col gap-2 flex-1 min-w-[200px]">
					<p class="text-sm text-on-muted font-medium">{colorOption.label}</p>
					<AreaChart data={sampleData} color={colorOption.id as any} curve="smooth" size="sm" />
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
