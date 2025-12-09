<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { AreaChart, Select, Checkbox } from 'ui-svelte';

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
			name: 'Series 1',
			data: [
				{ x: 1, y: 45 },
				{ x: 2, y: 35 },
				{ x: 3, y: 55 },
				{ x: 4, y: 50 },
				{ x: 5, y: 70 },
				{ x: 6, y: 65 },
				{ x: 7, y: 80 }
			],
			color: 'primary' as const
		},
		{
			name: 'Series 2',
			data: [
				{ x: 1, y: 30 },
				{ x: 2, y: 45 },
				{ x: 3, y: 40 },
				{ x: 4, y: 60 },
				{ x: 5, y: 55 },
				{ x: 6, y: 75 },
				{ x: 7, y: 70 }
			],
			color: 'secondary' as const
		}
	];

	// Selects
	let color: any = $state('primary');
	let curve: any = $state('smooth');

	// States
	let useSeries = $state(false);
	let showLine = $state(true);
	let showPoints = $state(false);
	let showGrid = $state(true);
	let showLegend = $state(false);
	let stacked = $state(false);
	let gradient = $state(true);
	let loading = $state(false);
	let empty = $state(false);

	let hasProps = $derived(
		[
			color !== 'primary',
			curve !== 'smooth',
			useSeries,
			!showLine,
			showPoints,
			!showGrid,
			showLegend,
			stacked,
			!gradient,
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
						`\t\t\tname: 'Series 1',`,
						`\t\t\tdata: [`,
						`\t\t\t\t{ x: 0, y: 30 },`,
						`\t\t\t\t{ x: 1, y: 45 },`,
						`\t\t\t\t{ x: 2, y: 35 }`,
						`\t\t\t],`,
						`\t\t\tcolor: 'primary'`,
						`\t\t},`,
						`\t\t{`,
						`\t\t\tname: 'Series 2',`,
						`\t\t\tdata: [`,
						`\t\t\t\t{ x: 0, y: 20 },`,
						`\t\t\t\t{ x: 1, y: 30 },`,
						`\t\t\t\t{ x: 2, y: 45 }`,
						`\t\t\t],`,
						`\t\t\tcolor: 'secondary'`,
						`\t\t}`,
						`\t];`
					].join('\n')
				: [
						`\n\tconst data = [`,
						`\t\t{ x: 0, y: 30 },`,
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
			curve !== 'smooth' && `\tcurve="${curve}"`,
			!showLine && `\tshowLine={false}`,
			showPoints && `\tshowPoints`,
			!showGrid && `\tshowGrid={false}`,
			showLegend && `\tshowLegend`,
			stacked && `\tstacked`,
			!gradient && `\tgradient={false}`,
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
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 20, left: 40 }' },
		{ prop: 'color', type: 'Color', initial: 'primary' },
		{ prop: 'colors', type: 'Color[]', initial: '[]' },
		{ prop: 'showLine', type: 'boolean', initial: 'true' },
		{ prop: 'showPoints', type: 'boolean', initial: 'false' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'showLegend', type: 'boolean', initial: 'false' },
		{ prop: 'curve', type: 'linear | smooth', initial: 'smooth' },
		{ prop: 'strokeWidth', type: 'number', initial: '2' },
		{ prop: 'fillOpacity', type: 'number', initial: '0.3' },
		{ prop: 'stacked', type: 'boolean', initial: 'false' },
		{ prop: 'gradient', type: 'boolean', initial: 'true' },
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
	<AreaChart
		data={useSeries ? undefined : sampleData}
		series={useSeries ? sampleSeries : undefined}
		{color}
		{curve}
		{showLine}
		{showPoints}
		{showGrid}
		{showLegend}
		{stacked}
		{gradient}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	{#if !useSeries}
		<Select label="Color" size="sm" options={colorOptions} bind:value={color} />
	{/if}
	<Select label="Curve" size="sm" options={curveOptions} bind:value={curve} />

	<DocOptions title="Data">
		<Checkbox bind:checked={useSeries} label="Multiple Series" />
	</DocOptions>

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showLine} label="showLine" />
		<Checkbox bind:checked={showPoints} label="showPoints" />
		<Checkbox bind:checked={showGrid} label="showGrid" />
		<Checkbox bind:checked={showLegend} label="showLegend" />
		<Checkbox bind:checked={stacked} label="stacked" />
		<Checkbox bind:checked={gradient} label="gradient" />
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} label="loading" />
		<Checkbox bind:checked={empty} label="empty" />
	</DocOptions>
{/snippet}

<DocHeader title="AreaChart"
	>AreaChart components visualize data as filled areas under lines, ideal for showing trends and
	comparisons over time.</DocHeader
>

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
	<p>When using multiple series, each series in the series array should follow this structure:</p>
</div>

<DocProps props={seriesProps} />

<div class="prose mt-8">
	<h3>Margin Type</h3>
	<p>The margin object controls spacing around the chart:</p>
</div>

<DocProps props={marginProps} />

<div class="prose mt-8">
	<h3>Color Values</h3>
	<p>
		Available color options: <code>primary</code>, <code>secondary</code>, <code>success</code>,
		<code>info</code>, <code>warning</code>, <code>danger</code>, <code>muted</code>
	</p>
</div>
