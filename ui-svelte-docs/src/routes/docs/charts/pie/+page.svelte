<script lang="ts">
	import { PieChart, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const paletteOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'rainbow', label: 'Rainbow' },
		{ id: 'ocean', label: 'Ocean' },
		{ id: 'sunset', label: 'Sunset' },
		{ id: 'forest', label: 'Forest' },
		{ id: 'neon', label: 'Neon' }
	];

	const legendPositionOptions = [
		{ id: 'right', label: 'Right' },
		{ id: 'left', label: 'Left' },
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'none', label: 'None' }
	];

	const chartData = [
		{ label: 'Product A', value: 30 },
		{ label: 'Product B', value: 25 },
		{ label: 'Product C', value: 20 },
		{ label: 'Product D', value: 15 },
		{ label: 'Product E', value: 10 }
	];

	let size: any = $state('md');
	let palette: any = $state('default');
	let legendPosition: any = $state('right');
	let donut = $state(false);
	let donutWidth = $state(60);

	let showGlow = $state(false);
	let showGradient = $state(false);
	let disableAnimation = $state(false);

	let hideLabels = $state(false);
	let hideValues = $state(false);
	let hideLegend = $state(false);
	let hidePercentages = $state(false);

	let loading = $state(false);
	let empty = $state(false);

	let hasProps = $derived(
		[
			size !== 'md',
			palette !== 'default',
			legendPosition !== 'right',
			donut,
			donutWidth !== 60,
			showGlow,
			showGradient,
			disableAnimation,
			hideLabels,
			hideValues,
			hideLegend,
			hidePercentages,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { PieChart } from 'ui-svelte';`,
			`\n\tconst data = [`,
			`\t\t{ label: 'Product A', value: 30 },`,
			`\t\t{ label: 'Product B', value: 25 },`,
			`\t\t{ label: 'Product C', value: 20 },`,
			`\t\t{ label: 'Product D', value: 15 },`,
			`\t\t{ label: 'Product E', value: 10 }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<PieChart`,
			hasProps && `\tdata={data}`,
			size !== 'md' && `\tsize="${size}"`,
			palette !== 'default' && `\tpalette="${palette}"`,
			legendPosition !== 'right' && `\tlegendPosition="${legendPosition}"`,
			donut && `\tdonut`,
			donut && donutWidth !== 60 && `\tdonutWidth={${donutWidth}}`,
			showGlow && `\tshowGlow`,
			showGradient && `\tshowGradient`,
			disableAnimation && `\tdisableAnimation`,
			hideLabels && `\thideLabels`,
			hideValues && `\thideValues`,
			hideLegend && `\thideLegend`,
			hidePercentages && `\thidePercentages`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && `<PieChart data={data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[]', initial: '[]' },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'palette', type: 'default | rainbow | ocean | sunset | forest | neon', initial: '' },
		{ prop: 'legendPosition', type: 'top | right | bottom | left | none', initial: 'right' },
		{ prop: 'donut', type: 'boolean', initial: 'false' },
		{ prop: 'donutWidth', type: 'number', initial: '60' },
		{ prop: 'centerLabel', type: 'string', initial: 'Total' },
		{ prop: 'centerValue', type: 'string | number', initial: '' },
		{ prop: 'startAngle', type: 'number', initial: '-90' },
		{ prop: 'padAngle', type: 'number', initial: '0' },
		{ prop: 'disableAnimation', type: 'boolean', initial: 'false' },
		{ prop: 'animationDuration', type: 'number', initial: '800' },
		{ prop: 'showGlow', type: 'boolean', initial: 'false' },
		{ prop: 'showGradient', type: 'boolean', initial: 'false' },
		{ prop: 'hideLabels', type: 'boolean', initial: 'false' },
		{ prop: 'hideValues', type: 'boolean', initial: 'false' },
		{ prop: 'hideLegend', type: 'boolean', initial: 'false' },
		{ prop: 'hidePercentages', type: 'boolean', initial: 'false' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'valueFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'onClick', type: '(slice: DataPoint, index: number) => void', initial: '' },
		{ prop: 'onHover', type: '(slice: DataPoint | null, index: number) => void', initial: '' },
		{ prop: 'selected', type: 'number[]', initial: '[]' },
		{ prop: 'centerContent', type: 'Snippet', initial: '' },
		{ prop: 'tooltipContent', type: 'Snippet<[{ slice, percentage }]>', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' }
	];

	const dataPointProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'value', type: 'number', initial: '', required: true },
		{ prop: 'color', type: 'Color', initial: '' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' }
	];

	const colorType = [
		{
			prop: 'Color',
			type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted'",
			initial: ''
		}
	];
</script>

<DocsHeader title="PieChart">
	PieChart component displays data as proportional slices of a circle, with support for donut style,
	animations, and customizable display options.
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
			<Checkbox bind:checked={donut} label="Donut" />
			<Checkbox bind:checked={showGlow} label="Glow" />
			<Checkbox bind:checked={showGradient} label="Gradient" />
			<Checkbox bind:checked={disableAnimation} label="No Animation" />
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hideLabels} label="Hide Labels" />
			<Checkbox bind:checked={hideValues} label="Hide Values" />
			<Checkbox bind:checked={hideLegend} label="Hide Legend" />
			<Checkbox bind:checked={hidePercentages} label="Hide Percentages" />
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={loading} label="Loading" />
			<Checkbox bind:checked={empty} label="Empty" />
		</div>

		{#if donut}
			<div class="grid-2 md:grid-4 gap-2">
				<label class="flex flex-col gap-1">
					<span class="text-sm text-muted-foreground">Donut Width: {donutWidth}</span>
					<input type="range" min="30" max="100" bind:value={donutWidth} class="w-full" />
				</label>
			</div>
		{/if}

		<div class="doc-preview">
			<PieChart
				data={empty ? [] : chartData}
				{size}
				palette={palette as any}
				legendPosition={legendPosition as any}
				{donut}
				donutWidth={donut ? donutWidth : undefined}
				{showGlow}
				{showGradient}
				{disableAnimation}
				{hideLabels}
				{hideValues}
				{hideLegend}
				{hidePercentages}
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
		<div class="wrap gap-8 center">
			{#each sizeOptions as sizeOption}
				<div class="flex flex-col items-center gap-2">
					<PieChart data={chartData} size={sizeOption.id as any} hideLegend />
					<span class="text-sm text-muted-foreground">{sizeOption.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Palettes</p>
	<Card>
		<div class="grid-2 md:grid-3 gap-8">
			{#each paletteOptions as paletteOption}
				<div class="flex flex-col items-center gap-2">
					<PieChart
						data={chartData}
						size="sm"
						palette={paletteOption.id as any}
						legendPosition="bottom"
					/>
					<span class="text-sm text-muted-foreground">{paletteOption.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Legend Positions</p>
	<Card>
		<div class="grid-2 gap-8">
			{#each legendPositionOptions.filter((p) => p.id !== 'none') as position}
				<div class="flex flex-col items-center gap-2">
					<PieChart data={chartData} size="sm" legendPosition={position.id as any} />
					<span class="text-sm text-muted-foreground">{position.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Donut Style</p>
	<Card>
		<div class="wrap gap-8 center">
			<div class="flex flex-col items-center gap-2">
				<PieChart data={chartData} donut centerLabel="Total" centerValue={100} hideLegend />
				<span class="text-sm text-muted-foreground">Default Donut</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<PieChart
					data={chartData}
					donut
					donutWidth={40}
					centerLabel="Sales"
					centerValue="$100K"
					hideLegend
				/>
				<span class="text-sm text-muted-foreground">Thin Donut</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<PieChart
					data={chartData}
					donut
					donutWidth={80}
					centerLabel="Revenue"
					centerValue={500}
					hideLegend
				/>
				<span class="text-sm text-muted-foreground">Wide Donut</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Effects</p>
	<Card>
		<div class="wrap gap-8 center">
			<div class="flex flex-col items-center gap-2">
				<PieChart data={chartData} size="sm" showGlow hideLegend />
				<span class="text-sm text-muted-foreground">Glow Effect</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<PieChart data={chartData} size="sm" showGradient hideLegend />
				<span class="text-sm text-muted-foreground">Gradient Effect</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<PieChart data={chartData} size="sm" showGlow showGradient hideLegend />
				<span class="text-sm text-muted-foreground">Both Effects</span>
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
	<p class="section-subtitle">Color Type</p>
	<DocsProps props={colorType} />
</Section>
