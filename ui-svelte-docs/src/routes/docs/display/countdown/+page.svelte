<script lang="ts">
	import { Card, Checkbox, Code, Countdown, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'surface', label: 'Surface' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let size: any = $state('md');

	let showDays = $state(true);
	let showHours = $state(true);
	let showMinutes = $state(true);
	let showSeconds = $state(true);

	const targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'solid',
			size !== 'md',
			!showDays,
			!showHours,
			!showMinutes,
			!showSeconds
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Countdown } from 'ui-svelte';`,
			``,
			`\t// Target date: 7 days from now`,
			`\tconst targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);`,
			``,
			`\tconst handleComplete = () => {`,
			`\t\tconsole.log('Countdown completed!');`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Countdown`,
			hasProps && `\t{targetDate}`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			!showDays && `\tshowDays={false}`,
			!showHours && `\tshowHours={false}`,
			!showMinutes && `\tshowMinutes={false}`,
			!showSeconds && `\tshowSeconds={false}`,
			hasProps && `\tonComplete={handleComplete}`,
			hasProps && `/>`,
			!hasProps && `<Countdown {targetDate} onComplete={handleComplete} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'targetDate', type: 'Date', initial: '' },
		{ prop: 'showDays', type: 'boolean', initial: 'true' },
		{ prop: 'showHours', type: 'boolean', initial: 'true' },
		{ prop: 'showMinutes', type: 'boolean', initial: 'true' },
		{ prop: 'showSeconds', type: 'boolean', initial: 'true' },
		{ prop: 'size', type: 'sm | md | lg | xl', initial: 'md' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning | surface',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'solid'
		},
		{
			prop: 'labels',
			type: '{ days?: string; hours?: string; minutes?: string; seconds?: string }',
			initial: '{ days: "Days", hours: "Hours", ... }'
		},
		{ prop: 'onComplete', type: '() => void', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Countdown" llmUrl="https://ui-svelte.sappsdev.com/llm/display/countdown.md">
	Displays a clock countdown with large 2-digit numbers in styled boxes.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={showDays} label="Days" />
			<Checkbox bind:checked={showHours} label="Hours" />
			<Checkbox bind:checked={showMinutes} label="Minutes" />
			<Checkbox bind:checked={showSeconds} label="Seconds" />
		</div>

		<div class="doc-preview">
			<Countdown
				{targetDate}
				{color}
				{variant}
				{size}
				{showDays}
				{showHours}
				{showMinutes}
				{showSeconds}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card color="background" variant="outlined">
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem}
					<Countdown
						{targetDate}
						variant={item.id as any}
						color={colorItem.id as any}
						size="sm"
						showDays={false}
						showHours={false}
					/>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card color="background" variant="outlined">
		{#each sizeOptions as sizeItem}
			<div class="wrap gap-4 center">
				<Countdown {targetDate} size={sizeItem.id as any} showDays={false} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Custom Labels</p>
	<Card color="background" variant="outlined">
		<div class="doc-preview">
			<Countdown
				{targetDate}
				size="lg"
				labels={{
					days: 'Días',
					hours: 'Horas',
					minutes: 'Min',
					seconds: 'Seg'
				}}
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
