<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { PieChart, Select, Checkbox } from 'ui-svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	const chartData = [
		{ label: 'Product A', value: 30, color: 'primary' },
		{ label: 'Product B', value: 25, color: 'secondary' },
		{ label: 'Product C', value: 20, color: 'success' },
		{ label: 'Product D', value: 15, color: 'warning' },
		{ label: 'Product E', value: 10, color: 'danger' }
	];

	// States
	let donut = $state(false);
	let showLabels = $state(false);
	let showValues = $state(false);
	let showLegend = $state(false);
	let showPercentages = $state(false);
	let loading = $state(false);
	let empty = $state(false);

	// Props
	let centerLabel = $state('');
	let centerValue = $state('');
	let emptyText = $state('');
	let donutWidth = $state(80);
	let startAngle = $state(0);
	let padAngle = $state(0);

	let hasProps = $derived(
		[
			donut,
			donutWidth !== 80,
			showLabels !== false,
			showValues,
			showLegend !== false,
			showPercentages,
			centerLabel,
			centerValue,
			startAngle !== 0,
			padAngle !== 0,
			loading,
			empty,
			emptyText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { PieChart } from 'ui-svelte';`,
			`\n\tconst data = [`,
			`\t\t{ label: 'Product A', value: 30, color: 'primary' },`,
			`\t\t{ label: 'Product B', value: 25, color: 'secondary' },`,
			`\t\t{ label: 'Product C', value: 20, color: 'success' },`,
			`\t\t{ label: 'Product D', value: 15, color: 'warning' },`,
			`\t\t{ label: 'Product E', value: 10, color: 'danger' }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<PieChart`,
			hasProps && `\tdata={data}`,
			donut && `\tdonut`,
			donut && donutWidth !== 80 && `\tdonutWidth={${donutWidth}}`,
			showLabels !== true && `\tshowLabels={${showLabels}}`,
			showValues && `\tshowValues`,
			showLegend !== true && `\tshowLegend={${showLegend}}`,
			showPercentages && `\tshowPercentages`,
			centerLabel && `\tcenterLabel="${centerLabel}"`,
			centerValue && `\tcenterValue="${centerValue}"`,
			startAngle !== 0 && `\tstartAngle={${startAngle}}`,
			padAngle !== 0 && `\tpadAngle={${padAngle}}`,
			loading && `\tloading`,
			empty && `\tempty`,
			emptyText && `\temptyText="${emptyText}"`,
			hasProps && `/>`,
			!hasProps && `<PieChart data={data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[]', initial: '[]' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 20, left: 20 }' },
		{ prop: 'colors', type: 'Color[]', initial: '[]' },
		{ prop: 'donut', type: 'boolean', initial: 'false' },
		{ prop: 'donutWidth', type: 'number', initial: '80' },
		{ prop: 'showLabels', type: 'boolean', initial: 'true' },
		{ prop: 'showValues', type: 'boolean', initial: 'false' },
		{ prop: 'showLegend', type: 'boolean', initial: 'true' },
		{ prop: 'showPercentages', type: 'boolean', initial: 'false' },
		{ prop: 'centerLabel', type: 'string', initial: '' },
		{ prop: 'centerValue', type: 'string | number', initial: '' },
		{ prop: 'startAngle', type: 'number', initial: '0' },
		{ prop: 'padAngle', type: 'number', initial: '0' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const dataPointProps = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'value', type: 'number', initial: '', required: true },
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
	<PieChart
		data={empty ? [] : (chartData as any)}
		{donut}
		donutWidth={donut ? donutWidth : undefined}
		{showLabels}
		{showValues}
		{showLegend}
		{showPercentages}
		centerLabel={centerLabel || undefined}
		centerValue={centerValue || undefined}
		{startAngle}
		{padAngle}
		{loading}
		{empty}
		emptyText={emptyText || undefined}
	/>
{/snippet}

{#snippet builder()}
	<DocOptions title="Chart Type">
		<Checkbox bind:checked={donut} label="Donut" />
		{#if donut}
			<label class="flex flex-col gap-1">
				<span class="text-sm text-muted-foreground">Donut Width: {donutWidth}</span>
				<input type="range" min="40" max="120" bind:value={donutWidth} class="w-full" />
			</label>
		{/if}
	</DocOptions>

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showLabels} label="Show Labels" />
		<Checkbox bind:checked={showValues} label="Show Values" />
		<Checkbox bind:checked={showLegend} label="Show Legend" />
		<Checkbox bind:checked={showPercentages} label="Show Percentages" />
	</DocOptions>

	<DocOptions title="Center Content">
		<Checkbox
			onchange={(v) => (v ? (centerLabel = 'Total') : (centerLabel = ''))}
			label="Center Label"
		/>
		<Checkbox
			onchange={(v) => (v ? (centerValue = '100') : (centerValue = ''))}
			label="Center Value"
		/>
	</DocOptions>

	<DocOptions title="Advanced">
		<label class="flex flex-col gap-1">
			<span class="text-sm text-muted-foreground">Start Angle: {startAngle}°</span>
			<input type="range" min="0" max="360" bind:value={startAngle} class="w-full" />
		</label>
		<label class="flex flex-col gap-1">
			<span class="text-sm text-muted-foreground">Pad Angle: {padAngle}°</span>
			<input type="range" min="0" max="10" step="0.5" bind:value={padAngle} class="w-full" />
		</label>
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} label="Loading" />
		<Checkbox bind:checked={empty} label="Empty" />
		{#if empty}
			<Checkbox
				onchange={(v) => (v ? (emptyText = 'No data available') : (emptyText = ''))}
				label="Empty Text"
			/>
		{/if}
	</DocOptions>
{/snippet}

<DocHeader title="PieChart">
	PieChart components visualize data proportions in a circular format, with support for donut style
	and customizable display options.
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
	<h3>Margin Type</h3>
	<p>The margin object defines spacing around the chart:</p>
</div>

<DocProps props={marginProps} />

<div class="prose mt-8">
	<h3>Color Type</h3>
	<p>Available color values for chart segments:</p>
</div>

<DocProps props={colorType} />
