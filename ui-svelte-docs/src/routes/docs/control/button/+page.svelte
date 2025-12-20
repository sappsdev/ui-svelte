<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import { HeartAngleLinearIcon, BalloonLinearIcon } from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'overlay', label: 'Overlay' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const propsOptions = [
		{ id: 'startIcon', label: 'Start Icon' },
		{ id: 'endIcon', label: 'End Icon' },
		{ id: 'bothIcons', label: 'Both Icons' },
		{ id: 'isLoading', label: 'Loading' },
		{ id: 'isDisabled', label: 'Disabled' },
		{ id: 'isWide', label: 'Wide' }
	];

	const typeOptions = [
		{ id: 'button', label: 'Button' },
		{ id: 'submit', label: 'Submit' },
		{ id: 'reset', label: 'Reset' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let size: any = $state('md');
	let type: any = $state('button');

	let startIcon: any = $state(false);
	let endIcon: any = $state(false);
	let href = $state('');

	let isLoading = $state(false);
	let isWide = $state(false);
	let isDisabled = $state(false);

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'solid',
			size !== 'md',
			type !== 'button',
			startIcon,
			endIcon,
			href,
			isLoading,
			isWide,
			isDisabled
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Button } from 'ui-svelte';`,
			(startIcon || endIcon) &&
				`\timport { HeartAngleLinearIcon, BalloonLinearIcon } from '$lib/icons';`,
			!href && `\n\tconst handleClick = () => {`,
			!href && `\t\tconsole.log('Button clicked');`,
			!href && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Button`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			type !== 'button' && `\ttype="${type}"`,
			startIcon && `\tstartIcon={HeartAngleLinearIcon}`,
			endIcon && `\tendIcon={BalloonLinearIcon}`,
			href && `\thref="/example"`,
			hasProps && !href && `\tonclick={handleClick}`,
			isLoading && `\tisLoading`,
			isWide && `\tisWide`,
			isDisabled && `\tisDisabled`,
			hasProps && `>`,
			hasProps && `\tLabel`,
			hasProps && `</Button>`,
			!hasProps && `<Button onclick={handleClick}>Label</Button>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'onclick', type: '() => void', initial: '' },
		{ prop: 'type', type: 'button | submit | reset', initial: 'button' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'target', type: '_self | _blank | _parent | _top', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft | outlined | ghost',
			initial: 'solid'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconData', initial: '' },
		{ prop: 'endIcon', type: 'IconData', initial: '' },
		{ prop: 'isLoading', type: 'boolean', initial: 'false' },
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="Button" llmUrl="https://ui-svelte.sappsdev.com/llm/control/button.md">
	Buttons allow users to take actions with a single tap.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
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
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Type"
				size="sm"
				options={typeOptions}
				bind:value={type}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={startIcon} label="startIcon" />
			<Checkbox bind:checked={endIcon} label="endIcon" />
			<Checkbox
				onchange={(v) => (v ? (href = '/example') : (href = ''))}
				name="href"
				label="Link"
			/>
			<Checkbox bind:checked={isLoading} label="Loading" />
			<Checkbox bind:checked={isWide} label="Wide" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
		</div>

		<div class="doc-preview">
			<Button
				startIcon={startIcon ? HeartAngleLinearIcon : undefined}
				endIcon={endIcon ? BalloonLinearIcon : undefined}
				{color}
				{variant}
				{size}
				{type}
				{isLoading}
				{isDisabled}
				{isWide}
			>
				Button Label
			</Button>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as color}
					<Button variant={item.id as any} color={color.id as any}
						>{item.label + ' ' + color.label}</Button
					>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as size}
					<Button variant={item.id as any} size={size.id as any}
						>{item.label + ' ' + size.label}</Button
					>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Other Props</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each propsOptions as prop}
					<Button
						isDisabled={prop.id === 'isDisabled'}
						isLoading={prop.id === 'isLoading'}
						isWide={prop.id === 'isWide'}
						startIcon={prop.id === 'startIcon' || prop.id === 'bothIcons'
							? HeartAngleLinearIcon
							: undefined}
						endIcon={prop.id === 'endIcon' || prop.id === 'bothIcons'
							? BalloonLinearIcon
							: undefined}
						variant={item.id as any}>{item.label + ' ' + prop.label}</Button
					>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
