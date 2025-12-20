<script lang="ts">
	import { Candlestick, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const sizeOptions = [
		{ id: 'sm', label: 'Small' },
		{ id: 'md', label: 'Medium' },
		{ id: 'lg', label: 'Large' },
		{ id: 'xl', label: 'Extra Large' }
	];

	const themeOptions = [
		{ id: 'default', label: 'Default' },
		{ id: 'tradingview', label: 'TradingView' },
		{ id: 'dark', label: 'Dark' },
		{ id: 'light', label: 'Light' }
	];

	const candleStyleOptions = [
		{ id: 'filled', label: 'Filled' },
		{ id: 'hollow', label: 'Hollow' },
		{ id: 'heikinashi', label: 'Heikin-Ashi' },
		{ id: 'line', label: 'Line' },
		{ id: 'area', label: 'Area' }
	];

	const gridStyleOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'dashed', label: 'Dashed' },
		{ id: 'dotted', label: 'Dotted' },
		{ id: 'none', label: 'None' }
	];

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	let size: any = $state('md');
	let theme: any = $state('default');
	let candleStyle: any = $state('filled');
	let gridStyle: any = $state('dashed');
	let bullishColor: any = $state('success');
	let bearishColor: any = $state('danger');

	let hideVolume = $state(false);
	let hideGrid = $state(false);
	let hideCrosshair = $state(false);
	let hideYAxisLabels = $state(false);
	let hideXAxisLabels = $state(false);
	let hideLastPrice = $state(false);
	let disableZoom = $state(false);
	let disableScroll = $state(false);
	let loading = $state(false);

	function generateSampleData(days: number = 60) {
		const data = [];
		let price = 100;

		for (let i = 0; i < days; i++) {
			const date = new Date();
			date.setDate(date.getDate() - (days - i));

			const change = (Math.random() - 0.5) * 5;
			const open = price;
			const close = price + change;
			const high = Math.max(open, close) + Math.random() * 2;
			const low = Math.min(open, close) - Math.random() * 2;
			const volume = Math.floor(Math.random() * 1000000) + 100000;

			data.push({
				date: date.toISOString().split('T')[0],
				open: Number(open.toFixed(2)),
				high: Number(high.toFixed(2)),
				low: Number(low.toFixed(2)),
				close: Number(close.toFixed(2)),
				volume
			});

			price = close;
		}
		return data;
	}

	let sampleData = $state(generateSampleData());

	let hasProps = $derived(
		[
			size !== 'md',
			theme !== 'default',
			candleStyle !== 'filled',
			gridStyle !== 'dashed',
			bullishColor !== 'success',
			bearishColor !== 'danger',
			hideVolume,
			hideGrid,
			hideCrosshair,
			hideYAxisLabels,
			hideXAxisLabels,
			hideLastPrice,
			disableZoom,
			disableScroll,
			loading
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Candlestick } from 'ui-svelte';`,
			``,
			`\tconst data = [`,
			`\t\t{ date: '2024-01-01', open: 100, high: 105, low: 98, close: 103, volume: 500000 },`,
			`\t\t{ date: '2024-01-02', open: 103, high: 108, low: 102, close: 106, volume: 600000 },`,
			`\t\t// ... more data`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Candlestick`,
			hasProps && `\t{data}`,
			size !== 'md' && `\tsize="${size}"`,
			theme !== 'default' && `\ttheme="${theme}"`,
			candleStyle !== 'filled' && `\tcandleStyle="${candleStyle}"`,
			gridStyle !== 'dashed' && `\tgridStyle="${gridStyle}"`,
			bullishColor !== 'success' && `\tbullishColor="${bullishColor}"`,
			bearishColor !== 'danger' && `\tbearishColor="${bearishColor}"`,
			hideVolume && `\thideVolume`,
			hideGrid && `\thideGrid`,
			hideCrosshair && `\thideCrosshair`,
			hideYAxisLabels && `\thideYAxisLabels`,
			hideXAxisLabels && `\thideXAxisLabels`,
			hideLastPrice && `\thideLastPrice`,
			disableZoom && `\tdisableZoom`,
			disableScroll && `\tdisableScroll`,
			loading && `\tloading`,
			hasProps && `/>`,
			!hasProps && `<Candlestick {data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'CandleData[]', initial: '[]' },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'theme', type: 'default | tradingview | dark | light', initial: 'default' },
		{ prop: 'candleStyle', type: 'filled | hollow | heikinashi | line | area', initial: 'filled' },
		{ prop: 'gridStyle', type: 'solid | dashed | dotted | none', initial: 'dashed' },
		{
			prop: 'bullishColor',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'success'
		},
		{
			prop: 'bearishColor',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'danger'
		},
		{ prop: 'candleWidth', type: 'number', initial: '8' },
		{ prop: 'wickWidth', type: 'number', initial: '1' },
		{ prop: 'initialVisibleCandles', type: 'number', initial: '50' },
		{ prop: 'minVisibleCandles', type: 'number', initial: '10' },
		{ prop: 'maxVisibleCandles', type: 'number', initial: '200' },
		{ prop: 'margin', type: '{ top, right, bottom, left }', initial: '{ 20, 60, 40, 60 }' },
		{ prop: 'hideVolume', type: 'boolean', initial: 'false' },
		{ prop: 'hideGrid', type: 'boolean', initial: 'false' },
		{ prop: 'hideCrosshair', type: 'boolean', initial: 'false' },
		{ prop: 'hideYAxisLabels', type: 'boolean', initial: 'false' },
		{ prop: 'hideXAxisLabels', type: 'boolean', initial: 'false' },
		{ prop: 'hideLastPrice', type: 'boolean', initial: 'false' },
		{ prop: 'disableZoom', type: 'boolean', initial: 'false' },
		{ prop: 'disableScroll', type: 'boolean', initial: 'false' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'animated', type: 'boolean', initial: 'false' },
		{ prop: 'scaleType', type: 'linear | log', initial: 'linear' },
		{ prop: 'indicators', type: 'Indicator[]', initial: '[]' },
		{ prop: 'onClick', type: '(candle, index) => void', initial: '' },
		{ prop: 'onRangeChange', type: '(start, end) => void', initial: '' },
		{ prop: 'priceFormatter', type: '(value) => string', initial: '' },
		{ prop: 'dateFormatter', type: '(date) => string', initial: '' },
		{ prop: 'tooltipContent', type: 'Snippet', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Candlestick">
	Interactive candlestick chart for financial data visualization with support for multiple styles,
	themes, technical indicators, and zoom/scroll functionality.
</DocsHeader>

<Section>
	<Card>
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
				label="Theme"
				size="sm"
				options={themeOptions}
				bind:value={theme}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Candle Style"
				size="sm"
				options={candleStyleOptions}
				bind:value={candleStyle}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Grid Style"
				size="sm"
				options={gridStyleOptions}
				bind:value={gridStyle}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Bullish Color"
				size="sm"
				options={colorOptions}
				bind:value={bullishColor}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Bearish Color"
				size="sm"
				options={colorOptions}
				bind:value={bearishColor}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hideVolume} label="Hide Volume" />
			<Checkbox bind:checked={hideGrid} label="Hide Grid" />
			<Checkbox bind:checked={hideCrosshair} label="Hide Crosshair" />
			<Checkbox bind:checked={hideYAxisLabels} label="Hide Y Labels" />
			<Checkbox bind:checked={hideXAxisLabels} label="Hide X Labels" />
			<Checkbox bind:checked={hideLastPrice} label="Hide Last Price" />
			<Checkbox bind:checked={disableZoom} label="Disable Zoom" />
			<Checkbox bind:checked={disableScroll} label="Disable Scroll" />
			<Checkbox bind:checked={loading} label="Loading" />
		</div>

		<div class="doc-preview">
			<Candlestick
				data={sampleData}
				{size}
				{theme}
				{candleStyle}
				{gridStyle}
				{bullishColor}
				{bearishColor}
				{hideVolume}
				{hideGrid}
				{hideCrosshair}
				{hideYAxisLabels}
				{hideXAxisLabels}
				{hideLastPrice}
				{disableZoom}
				{disableScroll}
				{loading}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Chart Sizes</p>
	<Card>
		<div class="gap-4">
			{#each sizeOptions as sizeOption}
				<div class="mb-4">
					<p class="text-sm text-on-muted mb-2">{sizeOption.label} ({sizeOption.id})</p>
					<Candlestick data={sampleData} size={sizeOption.id as any} />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Themes</p>
	<Card>
		<div class="gap-4">
			{#each themeOptions as themeOption}
				<div class="mb-4">
					<p class="text-sm text-on-muted mb-2">{themeOption.label}</p>
					<Candlestick data={sampleData} theme={themeOption.id as any} size="sm" />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Candle Styles</p>
	<Card>
		<div class="gap-4">
			{#each candleStyleOptions as styleOption}
				<div class="mb-4">
					<p class="text-sm text-on-muted mb-2">{styleOption.label}</p>
					<Candlestick data={sampleData} candleStyle={styleOption.id as any} size="sm" />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Technical Indicators</p>
	<Card>
		<div class="gap-4">
			<div class="mb-4">
				<p class="text-sm text-on-muted mb-2">SMA (20) + EMA (10)</p>
				<Candlestick
					data={sampleData}
					size="md"
					indicators={[
						{ type: 'sma', period: 20, color: 'primary' },
						{ type: 'ema', period: 10, color: 'warning' }
					]}
				/>
			</div>
			<div class="mb-4">
				<p class="text-sm text-on-muted mb-2">Bollinger Bands (20, 2)</p>
				<Candlestick
					data={sampleData}
					size="md"
					indicators={[{ type: 'bollinger', period: 20, stdDev: 2, color: 'info' }]}
				/>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Colors</p>
	<Card>
		<div class="wrap gap-4">
			<div class="flex-1 min-w-[300px]">
				<p class="text-sm text-on-muted mb-2">Primary / Secondary</p>
				<Candlestick data={sampleData} size="sm" bullishColor="primary" bearishColor="secondary" />
			</div>
			<div class="flex-1 min-w-[300px]">
				<p class="text-sm text-on-muted mb-2">Info / Warning</p>
				<Candlestick data={sampleData} size="sm" bullishColor="info" bearishColor="warning" />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Loading & Empty States</p>
	<Card>
		<div class="wrap gap-4">
			<div class="flex-1 min-w-[300px]">
				<p class="text-sm text-on-muted mb-2">Loading</p>
				<Candlestick data={[]} size="sm" loading />
			</div>
			<div class="flex-1 min-w-[300px]">
				<p class="text-sm text-on-muted mb-2">Empty</p>
				<Candlestick data={[]} size="sm" emptyText="No trading data available" />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<Section>
	<p class="section-subtitle">CandleData Type</p>
	<Card>
		<Code
			lang="typescript"
			code={`type CandleData = {
	date: string | Date;
	open: number;
	high: number;
	low: number;
	close: number;
	volume?: number;
};`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Indicator Types</p>
	<Card>
		<Code
			lang="typescript"
			code={`type Indicator =
	| { type: 'sma'; period: number; color?: Color }
	| { type: 'ema'; period: number; color?: Color }
	| { type: 'bollinger'; period: number; stdDev?: number; color?: Color };`}
		/>
	</Card>
</Section>
