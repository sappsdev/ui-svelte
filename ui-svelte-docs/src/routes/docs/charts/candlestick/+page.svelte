<script lang="ts">
	import { Candlestick, Card, Checkbox, Section, Select, Slider } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
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

	const scaleTypeOptions = [
		{ id: 'linear', label: 'Linear' },
		{ id: 'log', label: 'Logarithmic' }
	];

	const gridStyleOptions = [
		{ id: 'dashed', label: 'Dashed' },
		{ id: 'solid', label: 'Solid' },
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

	function generateCandleData(count: number) {
		const data = [];
		let currentPrice = 100;
		const startDate = new Date('2024-01-01');

		for (let i = 0; i < count; i++) {
			const date = new Date(startDate);
			date.setDate(date.getDate() + i);

			const open = currentPrice;
			const change = (Math.random() - 0.5) * 10;
			const close = open + change;
			const high = Math.max(open, close) + Math.random() * 5;
			const low = Math.min(open, close) - Math.random() * 5;
			const volume = Math.floor(Math.random() * 1000000) + 500000;

			data.push({
				date: date.toISOString().split('T')[0],
				open: Number(open.toFixed(2)),
				high: Number(high.toFixed(2)),
				low: Number(low.toFixed(2)),
				close: Number(close.toFixed(2)),
				volume
			});

			currentPrice = close;
		}

		return data;
	}

	const candleData = generateCandleData(150);

	let size: any = $state('md');
	let theme: any = $state('default');
	let candleStyle: any = $state('filled');
	let scaleType: any = $state('linear');
	let gridStyle: any = $state('dashed');
	let bullishColor: any = $state('success');
	let bearishColor: any = $state('danger');

	let candleWidth = $state(8);
	let wickWidth = $state(1);
	let initialVisibleCandles = $state(50);

	let showVolume = $state(true);
	let showGrid = $state(true);
	let showCrosshair = $state(true);
	let showLastPrice = $state(true);
	let enableZoom = $state(true);
	let enableScroll = $state(true);
	let loading = $state(false);
	let empty = $state(false);

	let showSMA = $state(false);
	let smaPeriod = $state(20);
	let showEMA = $state(false);
	let emaPeriod = $state(12);
	let showBollinger = $state(false);
	let bollingerPeriod = $state(20);

	let indicators: any = $derived(() => {
		const result: any[] = [];
		if (showSMA) result.push({ type: 'sma', period: smaPeriod, color: 'info' });
		if (showEMA) result.push({ type: 'ema', period: emaPeriod, color: 'warning' });
		if (showBollinger)
			result.push({ type: 'bollinger', period: bollingerPeriod, color: 'secondary' });
		return result;
	});

	let code = $derived(() => {
		const dataStr = `[
		{ date: '2024-01-01', open: 100, high: 110, low: 95, close: 105, volume: 1000000 },
		{ date: '2024-01-02', open: 105, high: 115, low: 103, close: 112, volume: 1200000 },
		// ... more data
	]`;

		const indicatorsStr =
			showSMA || showEMA || showBollinger
				? `[
		${showSMA ? `{ type: 'sma', period: ${smaPeriod}, color: 'info' },` : ''}
		${showEMA ? `{ type: 'ema', period: ${emaPeriod}, color: 'warning' },` : ''}
		${showBollinger ? `{ type: 'bollinger', period: ${bollingerPeriod}, color: 'secondary' },` : ''}
	]`
				: '';

		const propsLines = [
			`<Candlestick`,
			`\tdata={${dataStr}}`,
			size !== 'md' && `\tsize="${size}"`,
			theme !== 'default' && `\ttheme="${theme}"`,
			candleStyle !== 'filled' && `\tcandleStyle="${candleStyle}"`,
			scaleType !== 'linear' && `\tscaleType="${scaleType}"`,
			gridStyle !== 'dashed' && `\tgridStyle="${gridStyle}"`,
			bullishColor !== 'success' && `\tbullishColor="${bullishColor}"`,
			bearishColor !== 'danger' && `\tbearishColor="${bearishColor}"`,
			candleWidth !== 8 && `\tcandleWidth={${candleWidth}}`,
			showVolume && `\tshowVolume`,
			showGrid && `\tshowGrid`,
			showCrosshair && `\tshowCrosshair`,
			showLastPrice && `\tshowLastPrice`,
			enableZoom && `\tenableZoom`,
			enableScroll && `\tenableScroll`,
			(showSMA || showEMA || showBollinger) && `\tindicators={${indicatorsStr}}`,
			loading && `\tloading`,
			empty && `\tempty`,
			`/>`
		].filter(Boolean);

		return propsLines.join('\n');
	});

	const props = [
		{ prop: 'data', type: 'CandleData[]', initial: '[]' },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{ prop: 'theme', type: 'default | tradingview | dark | light', initial: 'default' },
		{ prop: 'candleStyle', type: 'filled | hollow | heikinashi | line | area', initial: 'filled' },
		{ prop: 'scaleType', type: 'linear | log', initial: 'linear' },
		{ prop: 'gridStyle', type: 'solid | dashed | dotted | none', initial: 'dashed' },
		{ prop: 'showVolume', type: 'boolean', initial: 'false' },
		{ prop: 'showGrid', type: 'boolean', initial: 'false' },
		{ prop: 'showCrosshair', type: 'boolean', initial: 'false' },
		{ prop: 'showLastPrice', type: 'boolean', initial: 'false' },
		{ prop: 'showYAxisLabels', type: 'boolean', initial: 'false' },
		{ prop: 'showXAxisLabels', type: 'boolean', initial: 'false' },
		{ prop: 'candleWidth', type: 'number', initial: '8' },
		{ prop: 'wickWidth', type: 'number', initial: '1' },
		{ prop: 'bullishColor', type: 'Color', initial: 'success' },
		{ prop: 'bearishColor', type: 'Color', initial: 'danger' },
		{ prop: 'indicators', type: 'Indicator[]', initial: '[]' },
		{ prop: 'enableZoom', type: 'boolean', initial: 'false' },
		{ prop: 'enableScroll', type: 'boolean', initial: 'false' },
		{ prop: 'initialVisibleCandles', type: 'number', initial: '50' },
		{ prop: 'minVisibleCandles', type: 'number', initial: '10' },
		{ prop: 'maxVisibleCandles', type: 'number', initial: '200' },
		{ prop: 'onClick', type: '(candle, index) => void', initial: '' },
		{ prop: 'onRangeChange', type: '(start, end) => void', initial: '' },
		{ prop: 'priceFormatter', type: '(value: number) => string', initial: '' },
		{ prop: 'dateFormatter', type: '(date: Date) => string', initial: '' },
		{ prop: 'animated', type: 'boolean', initial: 'false' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'tooltipContent', type: 'Snippet', initial: '' },
		{ prop: 'rootClass', type: 'string', initial: '' },
		{ prop: 'chartClass', type: 'string', initial: '' }
	];

	const candleDataProps = [
		{ prop: 'date', type: 'string | Date', initial: 'required' },
		{ prop: 'open', type: 'number', initial: 'required' },
		{ prop: 'high', type: 'number', initial: 'required' },
		{ prop: 'low', type: 'number', initial: 'required' },
		{ prop: 'close', type: 'number', initial: 'required' },
		{ prop: 'volume', type: 'number', initial: '' }
	];

	const indicatorProps = [
		{ prop: 'type', type: 'sma | ema | bollinger', initial: 'required' },
		{ prop: 'period', type: 'number', initial: 'required' },
		{ prop: 'color', type: 'Color', initial: 'primary' },
		{ prop: 'stdDev', type: 'number', initial: '2 (bollinger only)' }
	];
</script>

<DocsHeader title="Candlestick">
	Professional candlestick chart for financial data with interactive zoom, scroll, crosshair,
	technical indicators (SMA, EMA, Bollinger Bands), multiple candle styles, and theme support.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Candlestick
			data={empty ? [] : candleData}
			{size}
			{theme}
			{candleStyle}
			{scaleType}
			{gridStyle}
			{bullishColor}
			{bearishColor}
			{candleWidth}
			{wickWidth}
			{showVolume}
			{showGrid}
			{showCrosshair}
			{showLastPrice}
			{enableZoom}
			{enableScroll}
			{initialVisibleCandles}
			indicators={indicators()}
			{loading}
			{empty}
		/>
	</DocsPreview>
	<Card>
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Select label="Theme" size="sm" options={themeOptions} bind:value={theme} />
		<Select label="Candle Style" size="sm" options={candleStyleOptions} bind:value={candleStyle} />
		<Select label="Scale" size="sm" options={scaleTypeOptions} bind:value={scaleType} />
		<Select label="Grid Style" size="sm" options={gridStyleOptions} bind:value={gridStyle} />
		<Slider label="Candle Width" min={4} max={16} bind:value={candleWidth} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={showVolume} label="Volume" />
			<Checkbox bind:checked={showGrid} label="Grid" />
			<Checkbox bind:checked={showCrosshair} label="Crosshair" />
			<Checkbox bind:checked={showLastPrice} label="Last Price" />
			<Checkbox bind:checked={enableZoom} label="Zoom" />
			<Checkbox bind:checked={enableScroll} label="Scroll" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-1 xl:grid-2 items-end">
		{#snippet header()}
			<h4>Sizes</h4>
		{/snippet}
		{#each sizeOptions as sizeOpt}
			<div class="flex flex-col items-center gap-2">
				<Candlestick
					data={candleData.slice(0, 50)}
					size={sizeOpt.id as any}
					showGrid
					showYAxisLabels
				/>
				<span class="text-sm text-on-muted">{sizeOpt.id}</span>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-4 center">
		{#snippet header()}
			<h4>Themes</h4>
		{/snippet}
		{#each themeOptions as themeOpt}
			<div class="flex flex-col items-center gap-2">
				<Candlestick data={candleData.slice(0, 50)} size="sm" theme={themeOpt.id as any} showGrid />
				<span class="text-sm text-on-muted">{themeOpt.label}</span>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-5 center">
		{#snippet header()}
			<h4>Candle Styles</h4>
		{/snippet}
		{#each candleStyleOptions as styleOpt}
			<div class="flex flex-col items-center gap-2">
				<Candlestick
					data={candleData.slice(0, 50)}
					size="sm"
					candleStyle={styleOpt.id as any}
					showGrid
				/>
				<span class="text-sm text-on-muted">{styleOpt.label}</span>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Technical Indicators</h4>
		{/snippet}
		<div class="grid-1 md:grid-3 gap-4 center">
			<div class="flex flex-col items-center gap-2">
				<Candlestick
					data={candleData}
					size="sm"
					indicators={[{ type: 'sma', period: 20, color: 'info' }]}
					showGrid
				/>
				<span class="text-sm text-on-muted">SMA (20)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Candlestick
					data={candleData}
					size="sm"
					indicators={[{ type: 'ema', period: 12, color: 'warning' }]}
					showGrid
				/>
				<span class="text-sm text-on-muted">EMA (12)</span>
			</div>
			<div class="flex flex-col items-center gap-2">
				<Candlestick
					data={candleData}
					size="sm"
					indicators={[{ type: 'bollinger', period: 20, color: 'secondary' }]}
					showGrid
				/>
				<span class="text-sm text-on-muted">Bollinger Bands</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Indicator Builder</h4>
		{/snippet}
		<div class="flex flex-col md:flex-row gap-4">
			<div class="flex-1">
				<Candlestick data={candleData} size="md" indicators={indicators()} showGrid />
			</div>
			<div class="flex flex-col gap-2 min-w-48">
				<Checkbox bind:checked={showSMA} label="SMA" />
				{#if showSMA}
					<Slider size="sm" min={5} max={50} bind:value={smaPeriod} label="SMA Period" />
				{/if}
				<Checkbox bind:checked={showEMA} label="EMA" />
				{#if showEMA}
					<Slider size="sm" min={5} max={50} bind:value={emaPeriod} label="EMA Period" />
				{/if}
				<Checkbox bind:checked={showBollinger} label="Bollinger Bands" />
				{#if showBollinger}
					<Slider size="sm" min={10} max={50} bind:value={bollingerPeriod} label="BB Period" />
				{/if}
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-3 center">
		{#snippet header()}
			<h4>Scale Types</h4>
		{/snippet}
		{#each scaleTypeOptions as scaleOpt}
			<div class="flex flex-col items-center gap-2">
				<Candlestick
					data={candleData.slice(0, 50)}
					size="sm"
					scaleType={scaleOpt.id as any}
					showGrid
				/>
				<span class="text-sm text-on-muted">{scaleOpt.label}</span>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-2 md:grid-3 center">
		{#snippet header()}
			<h4>States</h4>
		{/snippet}
		<div class="flex flex-col items-center gap-2">
			<Candlestick data={candleData} size="sm" loading showGrid />
			<span class="text-sm text-on-muted">Loading</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<Candlestick data={[]} size="sm" empty emptyText="No data available" showGrid />
			<span class="text-sm text-on-muted">Empty</span>
		</div>
		<div class="flex flex-col items-center gap-2">
			<Candlestick data={candleData} size="sm" showVolume showGrid />
			<span class="text-sm text-on-muted">With Volume</span>
		</div>
	</Card>
</Section>

<Section>
	<h3>Candlestick Props</h3>
	<DocsProps {props} />
</Section>

<Section>
	<h3>CandleData Type</h3>
	<DocsProps props={candleDataProps} />
</Section>

<Section>
	<h3>Indicator Type</h3>
	<DocsProps props={indicatorProps} />
</Section>
