<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Select, Checkbox, BarChart } from 'ui-svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	const chartTypeOptions = [
		{ id: 'single', label: 'Single Series' },
		{ id: 'grouped', label: 'Grouped' },
		{ id: 'stacked', label: 'Stacked' }
	];

	// Sample data
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

	// Selects
	let color: any = $state('primary');
	let chartType: any = $state('single');

	// States
	let showGrid = $state(true);
	let showLegend = $state(false);
	let showValues = $state(false);
	let loading = $state(false);
	let empty = $state(false);

	let isGrouped = $derived(chartType === 'grouped');
	let isStacked = $derived(chartType === 'stacked');
	let isSeries = $derived(chartType !== 'single');

	let hasProps = $derived(
		[
			color !== 'primary',
			!showGrid,
			showLegend,
			showValues,
			isGrouped,
			isStacked,
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
			isSeries ? `\t\t\tdata: [` : `\t\t{ label: 'Mar', value: 80 },`,
			isSeries ? `\t\t\t\t{ label: 'Jan', value: 65 },` : `\t\t{ label: 'Apr', value: 81 },`,
			isSeries ? `\t\t\t\t{ label: 'Feb', value: 59 },` : `\t\t{ label: 'May', value: 56 },`,
			isSeries ? `\t\t\t\t{ label: 'Mar', value: 80 }` : `\t\t{ label: 'Jun', value: 55 }`,
			isSeries ? `\t\t\t],` : `\t];`,
			isSeries ? `\t\t\tcolor: 'primary'` : '',
			isSeries ? `\t\t},` : '',
			isSeries ? `\t\t{` : '',
			isSeries ? `\t\t\tname: 'Product B',` : '',
			isSeries ? `\t\t\tdata: [` : '',
			isSeries ? `\t\t\t\t{ label: 'Jan', value: 28 },` : '',
			isSeries ? `\t\t\t\t{ label: 'Feb', value: 48 },` : '',
			isSeries ? `\t\t\t\t{ label: 'Mar', value: 40 }` : '',
			isSeries ? `\t\t\t],` : '',
			isSeries ? `\t\t\tcolor: 'secondary'` : '',
			isSeries ? `\t\t}` : '',
			isSeries ? `\t];` : '',
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<BarChart`,
			isSeries ? `\t{series}` : `\t{data}`,
			color !== 'primary' && !isSeries && `\tcolor="${color}"`,
			isGrouped && `\tgrouped`,
			isStacked && `\tstacked`,
			!showGrid && `\tshowGrid={false}`,
			showLegend && isSeries && `\tshowLegend`,
			showValues && `\tshowValues`,
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
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 40, left: 40 }' },
		{ prop: 'color', type: 'Color', initial: 'primary' },
		{ prop: 'colors', type: 'Color[]', initial: '[]' },
		{ prop: 'grouped', type: 'boolean', initial: 'false' },
		{ prop: 'stacked', type: 'boolean', initial: 'false' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'showLegend', type: 'boolean', initial: 'false' },
		{ prop: 'showValues', type: 'boolean', initial: 'false' },
		{ prop: 'barPadding', type: 'number', initial: '0.1' },
		{ prop: 'groupPadding', type: 'number', initial: '0.2' },
		{ prop: 'barRadius', type: 'number', initial: '4' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
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

	const marginProps = [
		{ prop: 'top', type: 'number', initial: '', required: true },
		{ prop: 'right', type: 'number', initial: '', required: true },
		{ prop: 'bottom', type: 'number', initial: '', required: true },
		{ prop: 'left', type: 'number', initial: '', required: true }
	];

	const colorType = [
		{
			prop: 'Color',
			type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted'",
			initial: ''
		}
	];
</script>

{#snippet preview()}
	<BarChart
		data={isSeries ? undefined : singleData}
		series={isSeries ? seriesData : undefined}
		{color}
		grouped={isGrouped || undefined}
		stacked={isStacked || undefined}
		{showGrid}
		showLegend={showLegend && isSeries ? showLegend : undefined}
		{showValues}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Chart Type" size="sm" options={chartTypeOptions} bind:value={chartType} />
	{#if !isSeries}
		<Select label="Color" size="sm" options={colorOptions} bind:value={color} />
	{/if}

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showGrid} label="showGrid" />
		{#if isSeries}
			<Checkbox bind:checked={showLegend} label="showLegend" />
		{/if}
		<Checkbox bind:checked={showValues} label="showValues" />
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} label="loading" />
		<Checkbox bind:checked={empty} label="empty" />
	</DocOptions>
{/snippet}

<DocHeader title="BarChart">
	BarChart components visualize data with rectangular bars representing values.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>Color Type</h3>
	<p>Available color options for the chart:</p>
</div>

<DocProps props={colorType} />

<div class="prose mt-8">
	<h3>DataPoint Type</h3>
	<p>Each data point in the data array should follow this structure:</p>
</div>

<DocProps props={dataPointProps} />

<div class="prose mt-8">
	<h3>Series Type</h3>
	<p>When using multiple series, each series should follow this structure:</p>
</div>

<DocProps props={seriesProps} />

<div class="prose mt-8">
	<h3>Margin Type</h3>
	<p>Custom margins for the chart:</p>
</div>

<DocProps props={marginProps} />
