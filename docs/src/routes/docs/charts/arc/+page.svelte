<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { ArcChart, Select, Checkbox, TextField } from 'ui-svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	let centerText = $state('');
	let centerValue = $state('');
	let thickness = $state(20);
	let gap = $state(4);
	let emptyText = $state('');

	let animated = $state(true);
	let animationDuration = $state(1000);
	let loading = $state(false);
	let empty = $state(false);

	let showDataConfig = $state(false);
	let dataColor1: any = $state('primary');
	let dataValue1 = $state(75);
	let dataMax1 = $state(100);
	let dataLabel1 = $state('');

	let dataColor2: any = $state('success');
	let dataValue2 = $state(50);
	let dataMax2 = $state(100);
	let dataLabel2 = $state('');

	let dataColor3: any = $state('warning');
	let dataValue3 = $state(30);
	let dataMax3 = $state(100);
	let dataLabel3 = $state('');

	let buildData: any = $derived.by(() => {
		const data = [
			{
				value: dataValue1,
				max: dataMax1,
				color: dataColor1,
				label: dataLabel1 || undefined
			},
			{
				value: dataValue2,
				max: dataMax2,
				color: dataColor2,
				label: dataLabel2 || undefined
			},
			{
				value: dataValue3,
				max: dataMax3,
				color: dataColor3,
				label: dataLabel3 || undefined
			}
		];
		return data;
	});

	let hasProps = $derived(
		[
			centerText,
			centerValue,
			thickness !== 20,
			gap !== 4,
			!animated,
			animationDuration !== 1000,
			loading,
			empty,
			emptyText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ArcChart } from 'ui-svelte';`,
			`\n\tconst data = [`,
			`\t\t{ value: ${dataValue1}, max: ${dataMax1}, color: '${dataColor1}'${dataLabel1 ? `, label: '${dataLabel1}'` : ''} },`,
			`\t\t{ value: ${dataValue2}, max: ${dataMax2}, color: '${dataColor2}'${dataLabel2 ? `, label: '${dataLabel2}'` : ''} },`,
			`\t\t{ value: ${dataValue3}, max: ${dataMax3}, color: '${dataColor3}'${dataLabel3 ? `, label: '${dataLabel3}'` : ''} }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ArcChart`,
			hasProps && `\tdata={data}`,
			centerText && `\tcenterText="${centerText}"`,
			centerValue && `\tcenterValue="${centerValue}"`,
			thickness !== 20 && `\tthickness={${thickness}}`,
			gap !== 4 && `\tgap={${gap}}`,
			!animated && `\tanimated={false}`,
			animationDuration !== 1000 && `\tanimationDuration={${animationDuration}}`,
			loading && `\tloading`,
			empty && `\tempty`,
			emptyText && `\temptyText="${emptyText}"`,
			hasProps && `/>`,
			!hasProps && `<ArcChart data={data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'ArcData[]', initial: '[]' },
		{ prop: 'centerText', type: 'string', initial: '' },
		{ prop: 'centerValue', type: 'string | number', initial: '' },
		{ prop: 'thickness', type: 'number', initial: '20' },
		{ prop: 'gap', type: 'number', initial: '4' },
		{ prop: 'animated', type: 'boolean', initial: 'true' },
		{ prop: 'animationDuration', type: 'number', initial: '1000' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const arcDataProps = [
		{ prop: 'value', type: 'number', initial: '', required: true },
		{ prop: 'max', type: 'number', initial: '100' },
		{ prop: 'color', type: 'Color', initial: '', required: true },
		{ prop: 'label', type: 'string', initial: '' }
	];

	const colorTypeProps = [
		{
			prop: 'Color',
			type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted'",
			initial: ''
		}
	];
</script>

{#snippet preview()}
	<ArcChart
		data={buildData}
		centerText={centerText || undefined}
		centerValue={centerValue || undefined}
		{thickness}
		{gap}
		{animated}
		{animationDuration}
		{loading}
		{empty}
		emptyText={emptyText || undefined}
	/>
{/snippet}

{#snippet builder()}
	<DocOptions title="Center Content">
		<Checkbox
			onchange={(v) => (v ? (centerText = 'Progress') : (centerText = ''))}
			label="centerText"
		/>
		<Checkbox
			onchange={(v) => (v ? (centerValue = '75%') : (centerValue = ''))}
			label="centerValue"
		/>
	</DocOptions>

	<DocOptions title="Appearance">
		<TextField type="number" label="Thickness" size="sm" bind:value={thickness} min={10} max={50} />
		<TextField type="number" label="Gap" size="sm" bind:value={gap} min={0} max={20} />
	</DocOptions>

	<DocOptions title="Animation">
		<Checkbox bind:checked={animated} label="Animated" />
		{#if animated}
			<TextField
				type="number"
				label="Duration (ms)"
				size="sm"
				bind:value={animationDuration}
				min={100}
				max={5000}
			/>
		{/if}
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} label="Loading" />
		<Checkbox bind:checked={empty} label="Empty" />
		{#if empty}
			<Checkbox
				onchange={(v) => (v ? (emptyText = 'No data available') : (emptyText = ''))}
				label="emptyText"
			/>
		{/if}
	</DocOptions>

	<DocOptions title="Data Configuration">
		<Checkbox bind:checked={showDataConfig} label="Show Data Config" />
	</DocOptions>

	{#if showDataConfig}
		<DocOptions title="Arc 1">
			<Select label="Color" size="sm" options={colorOptions} bind:value={dataColor1} />
			<TextField type="number" label="Value" size="sm" bind:value={dataValue1} min={0} max={100} />
			<TextField type="number" label="Max" size="sm" bind:value={dataMax1} min={1} max={100} />
			<Checkbox
				onchange={(v) => (v ? (dataLabel1 = 'Label 1') : (dataLabel1 = ''))}
				label="Label"
			/>
		</DocOptions>

		<DocOptions title="Arc 2">
			<Select label="Color" size="sm" options={colorOptions} bind:value={dataColor2} />
			<TextField type="number" label="Value" size="sm" bind:value={dataValue2} min={0} max={100} />
			<TextField type="number" label="Max" size="sm" bind:value={dataMax2} min={1} max={100} />
			<Checkbox
				onchange={(v) => (v ? (dataLabel2 = 'Label 2') : (dataLabel2 = ''))}
				label="Label"
			/>
		</DocOptions>

		<DocOptions title="Arc 3">
			<Select label="Color" size="sm" options={colorOptions} bind:value={dataColor3} />
			<TextField type="number" label="Value" size="sm" bind:value={dataValue3} min={0} max={100} />
			<TextField type="number" label="Max" size="sm" bind:value={dataMax3} min={1} max={100} />
			<Checkbox
				onchange={(v) => (v ? (dataLabel3 = 'Label 3') : (dataLabel3 = ''))}
				label="Label"
			/>
		</DocOptions>
	{/if}
{/snippet}

<DocHeader title="ArcChart">
	ArcChart components display data in circular arc segments, ideal for showing progress, metrics, or
	multi-dimensional data visualization.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />

<div class="prose mt-8">
	<h3>ArcData Type</h3>
	<p>Each arc in the data array should follow this structure:</p>
</div>

<DocProps props={arcDataProps} />

<div class="prose mt-8">
	<h3>Color Type</h3>
	<p>Available color options for arcs:</p>
</div>

<DocProps props={colorTypeProps} />
