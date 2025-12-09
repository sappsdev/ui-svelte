<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { LineChart, Select, Checkbox } from 'ui-svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	const curveOptions = [
		{ id: 'linear', label: 'Linear' },
		{ id: 'smooth', label: 'Smooth' }
	];

	// Selects
	let color: any = $state('primary');
	let curve: any = $state('linear');

	// States
	let showPoints = $state(true);
	let showGrid = $state(true);
	let showLegend = $state(false);
	let loading = $state(false);
	let empty = $state(false);
	let useSeries = $state(false);

	// Sample data
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
			],
			color: 'primary' as const
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
			],
			color: 'success' as const
		}
	];

	let hasProps = $derived(
		[
			color !== 'primary',
			curve !== 'linear',
			!showPoints,
			!showGrid,
			showLegend,
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
				? `\n\tconst series = [\n\t\t{\n\t\t\tname: 'Sales',\n\t\t\tdata: [\n\t\t\t\t{ x: 0, y: 10 },\n\t\t\t\t{ x: 1, y: 25 },\n\t\t\t\t{ x: 2, y: 15 }\n\t\t\t],\n\t\t\tcolor: 'primary'\n\t\t},\n\t\t{\n\t\t\tname: 'Revenue',\n\t\t\tdata: [\n\t\t\t\t{ x: 0, y: 15 },\n\t\t\t\t{ x: 1, y: 20 },\n\t\t\t\t{ x: 2, y: 30 }\n\t\t\t],\n\t\t\tcolor: 'success'\n\t\t}\n\t];`
				: `\n\tconst data = [\n\t\t{ x: 0, y: 10 },\n\t\t{ x: 1, y: 25 },\n\t\t{ x: 2, y: 15 },\n\t\t{ x: 3, y: 40 },\n\t\t{ x: 4, y: 30 },\n\t\t{ x: 5, y: 50 }\n\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<LineChart`,
			useSeries ? `\tseries={series}` : `\tdata={data}`,
			color !== 'primary' && !useSeries && `\tcolor="${color}"`,
			curve !== 'linear' && `\tcurve="${curve}"`,
			!showPoints && `\tshowPoints={false}`,
			!showGrid && `\tshowGrid={false}`,
			showLegend && `\tshowLegend`,
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
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 30, left: 40 }' },
		{ prop: 'color', type: 'Color', initial: 'primary' },
		{ prop: 'colors', type: 'Color[]', initial: '[]' },
		{ prop: 'showPoints', type: 'boolean', initial: 'true' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'showLegend', type: 'boolean', initial: 'false' },
		{ prop: 'curve', type: 'linear | smooth', initial: 'linear' },
		{ prop: 'strokeWidth', type: 'number', initial: '2' },
		{ prop: 'pointRadius', type: 'number', initial: '4' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
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

	const marginProps = [
		{ prop: 'top', type: 'number', initial: '', required: true },
		{ prop: 'right', type: 'number', initial: '', required: true },
		{ prop: 'bottom', type: 'number', initial: '', required: true },
		{ prop: 'left', type: 'number', initial: '', required: true }
	];
</script>

{#snippet preview()}
	<div class="h-56">
		<LineChart
			data={useSeries ? undefined : sampleData}
			series={useSeries ? sampleSeries : undefined}
			{color}
			{curve}
			{showPoints}
			{showGrid}
			{showLegend}
			{loading}
			{empty}
		/>
	</div>
{/snippet}

{#snippet builder()}
	{#if !useSeries}
		<Select label="Color" size="sm" options={colorOptions} bind:value={color} />
	{/if}
	<Select label="Curve" size="sm" options={curveOptions} bind:value={curve} />

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showPoints} label="Show Points" />
		<Checkbox bind:checked={showGrid} label="Show Grid" />
		<Checkbox bind:checked={showLegend} label="Show Legend" />
	</DocOptions>

	<DocOptions title="Data Mode">
		<Checkbox bind:checked={useSeries} label="Use Series (Multiple Lines)" />
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} label="Loading" />
		<Checkbox bind:checked={empty} label="Empty" />
	</DocOptions>
{/snippet}

<DocHeader title="LineChart">
	LineChart components visualize data trends over continuous intervals with customizable styling and
	multiple series support.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>DataPoint Type</h3>
	<p>Each data point in the data array should follow this structure:</p>
</div>

<DocProps props={dataPointProps} />

<div class="prose mt-8">
	<h3>Series Type</h3>
	<p>When using multiple lines, each series in the series array should follow this structure:</p>
</div>

<DocProps props={seriesProps} />

<div class="prose mt-8">
	<h3>Margin Type</h3>
	<p>The margin object defines spacing around the chart:</p>
</div>

<DocProps props={marginProps} />

<div class="prose mt-8">
	<h3>Color Type</h3>
	<p>
		Available color values: <code>primary</code>, <code>secondary</code>, <code>success</code>,
		<code>info</code>, <code>warning</code>, <code>danger</code>, <code>muted</code>
	</p>
</div>
