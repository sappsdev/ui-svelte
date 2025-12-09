<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Candlestick, Select, Checkbox, Section, Slider } from 'ui-svelte';

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

	let bullishColor: any = $state('success');
	let bearishColor: any = $state('danger');
	let candleWidth: any = $state(8);
	let wickWidth: any = $state(1);
	let initialVisibleCandles: any = $state(50);
	let minVisibleCandles: any = $state(10);
	let maxVisibleCandles: any = $state(100);

	let showVolume = $state(true);
	let showGrid = $state(true);
	let enableZoom = $state(true);
	let enableScroll = $state(true);
	let loading = $state(false);
	let empty = $state(false);

	let hasProps = $derived(
		[
			showVolume !== true,
			showGrid !== true,
			candleWidth !== 8,
			bullishColor !== 'success',
			bearishColor !== 'danger',
			wickWidth !== 1,
			enableZoom !== true,
			enableScroll !== true,
			initialVisibleCandles !== 50,
			minVisibleCandles !== 10,
			maxVisibleCandles !== 100,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Candlestick } from 'ui-svelte';`,
			`\n\tconst data = [`,
			`\t\t{ date: '2024-01-01', open: 100, high: 110, low: 95, close: 105, volume: 1000000 },`,
			`\t\t{ date: '2024-01-02', open: 105, high: 115, low: 103, close: 112, volume: 1200000 },`,
			`\t\t// ... more data`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Candlestick`,
			hasProps && `\tdata={data}`,
			showVolume !== true && `\tshowVolume={${showVolume}}`,
			showGrid !== true && `\tshowGrid={${showGrid}}`,
			candleWidth !== 8 && `\tcandleWidth={${candleWidth}}`,
			bullishColor !== 'success' && `\tbullishColor="${bullishColor}"`,
			bearishColor !== 'danger' && `\tbearishColor="${bearishColor}"`,
			wickWidth !== 1 && `\twickWidth={${wickWidth}}`,
			enableZoom !== true && `\tenableZoom={${enableZoom}}`,
			enableScroll !== true && `\tenableScroll={${enableScroll}}`,
			initialVisibleCandles !== 50 && `\tinitialVisibleCandles={${initialVisibleCandles}}`,
			minVisibleCandles !== 10 && `\tminVisibleCandles={${minVisibleCandles}}`,
			maxVisibleCandles !== 100 && `\tmaxVisibleCandles={${maxVisibleCandles}}`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && `<Candlestick data={data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'CandleData[]', initial: '[]' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 40, left: 60 }' },
		{ prop: 'showVolume', type: 'boolean', initial: 'false' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'candleWidth', type: 'number', initial: '8' },
		{ prop: 'bullishColor', type: 'Color', initial: 'success' },
		{ prop: 'bearishColor', type: 'Color', initial: 'danger' },
		{ prop: 'wickWidth', type: 'number', initial: '1' },
		{ prop: 'enableZoom', type: 'boolean', initial: 'true' },
		{ prop: 'enableScroll', type: 'boolean', initial: 'true' },
		{ prop: 'initialVisibleCandles', type: 'number', initial: '50' },
		{ prop: 'minVisibleCandles', type: 'number', initial: '10' },
		{ prop: 'maxVisibleCandles', type: 'number', initial: '200' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const candleDataProps = [
		{ prop: 'date', type: 'string | Date', initial: '', required: true },
		{ prop: 'open', type: 'number', initial: '', required: true },
		{ prop: 'high', type: 'number', initial: '', required: true },
		{ prop: 'low', type: 'number', initial: '', required: true },
		{ prop: 'close', type: 'number', initial: '', required: true },
		{ prop: 'volume', type: 'number', initial: '' }
	];

	const marginProps = [
		{ prop: 'top', type: 'number', initial: '', required: true },
		{ prop: 'right', type: 'number', initial: '', required: true },
		{ prop: 'bottom', type: 'number', initial: '', required: true },
		{ prop: 'left', type: 'number', initial: '', required: true }
	];

	const colorType: any = [
		{
			prop: 'Color',
			type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted'"
		}
	];
</script>

{#snippet preview()}
	<Candlestick
		data={empty ? [] : candleData}
		{showVolume}
		{showGrid}
		{candleWidth}
		{bullishColor}
		{bearishColor}
		{wickWidth}
		{enableZoom}
		{enableScroll}
		{initialVisibleCandles}
		{minVisibleCandles}
		{maxVisibleCandles}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Bullish Color" size="sm" options={colorOptions} bind:value={bullishColor} />
	<Select label="Bearish Color" size="sm" options={colorOptions} bind:value={bearishColor} />

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showVolume} label="Show Volume" />
		<Checkbox bind:checked={showGrid} label="Show Grid" />
	</DocOptions>

	<DocOptions title="Zoom & Scroll">
		<Checkbox bind:checked={enableZoom} label="Enable Zoom" />
		<Checkbox bind:checked={enableScroll} label="Enable Scroll" />
	</DocOptions>

	<DocOptions title="Visible Candles">
		<Slider
			size="sm"
			min={10}
			max={150}
			bind:value={initialVisibleCandles}
			label="Initial Visible"
		/>
		<Slider size="sm" min={5} max={50} bind:value={minVisibleCandles} label="Min Visible" />
		<Slider size="sm" min={50} max={150} bind:value={maxVisibleCandles} label="Max Visible" />
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} label="Loading" />
		<Checkbox bind:checked={empty} label="Empty" />
	</DocOptions>

	<DocOptions title="Dimensions">
		<Slider size="sm" min={4} max={20} bind:value={candleWidth} label="Candle Width" />
		<Slider size="sm" min={1} max={4} bind:value={wickWidth} label="Wick Width" />
	</DocOptions>
{/snippet}

<DocHeader title="Candlestick">
	Candlestick charts display financial data showing the open, high, low, and close prices for a
	specific time period. Features interactive zoom and scroll for analyzing large datasets.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<Section class="prose mt-8">
	<h3>CandleData Type</h3>
	<p>Each data point in the data array should follow this structure:</p>
</Section>

<DocProps props={candleDataProps} />

<Section class="prose mt-8">
	<h3>Margin Type</h3>
	<p>The margin object defines the spacing around the chart:</p>
</Section>

<DocProps props={marginProps} />

<Section class="prose mt-8">
	<h3>Color Type</h3>
	<p>Available color options for bullish and bearish candles:</p>
</Section>

<DocProps props={colorType} />

<Section class="prose mt-8">
	<h3>Interactive Features</h3>
	<ul>
		<li><strong>Zoom:</strong> Use mouse wheel or trackpad to zoom in/out on the chart</li>
		<li><strong>Scroll:</strong> Click and drag to pan through historical data</li>
		<li><strong>Touch Support:</strong> Full touch gesture support for mobile devices</li>
		<li>
			<strong>Scrollbar:</strong> Visual indicator showing the current position in the dataset
		</li>
	</ul>
</Section>
