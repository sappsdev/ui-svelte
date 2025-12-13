<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import { HeartAngleLinearIcon, BalloonLinearIcon } from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const typeOptions = [
		{ id: 'button', label: 'Button' },
		{ id: 'submit', label: 'Submit' },
		{ id: 'reset', label: 'Reset' }
	];

	let variant: any = $state('primary');
	let size: any = $state('md');
	let type: any = $state('button');

	let startIcon: any = $state(false);
	let endIcon: any = $state(false);
	let href = $state('');

	let isLoading = $state(false);
	let isWide = $state(false);
	let isDisabled = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			type !== 'button',
			startIcon,
			endIcon,
			href,
			isLoading,
			isWide,
			isSolid,
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
			variant !== 'primary' && `\tvariant="${variant}"`,
			type !== 'button' && `\ttype="${type}"`,
			startIcon && `\tstartIcon={HeartAngleLinearIcon}`,
			endIcon && `\tendIcon={BalloonLinearIcon}`,
			href && `\thref="/example"`,
			hasProps && `\tlabel="Label"`,
			hasProps && !href && `\tonclick={handleClick}`,
			isLoading && `\tisLoading`,
			isWide && `\tisWide`,
			isSolid && `\tisSolid`,
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
			prop: 'variant',
			type: 'primary | secondary | muted | outline | ghost | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconData', initial: '' },
		{ prop: 'endIcon', type: 'IconData', initial: '' },
		{ prop: 'isLoading', type: 'boolean', initial: 'false' },
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<Button
		startIcon={startIcon ? HeartAngleLinearIcon : undefined}
		endIcon={endIcon ? BalloonLinearIcon : undefined}
		{variant}
		{size}
		{type}
		{isLoading}
		{isDisabled}
		{isWide}
		{isSolid}
	>
		Button Label
	</Button>
{/snippet}

<DocsHeader title="Button" llmUrl="https://ui-svelte.sappsdev.com/llm/control/button.md">
	Buttons allow users to take actions with a single tap.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Button
			startIcon={startIcon ? HeartAngleLinearIcon : undefined}
			endIcon={endIcon ? BalloonLinearIcon : undefined}
			{variant}
			{size}
			{type}
			{isLoading}
			{isDisabled}
			{isWide}
			{isSolid}
		>
			Button Label
		</Button>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Select label="Type" size="sm" options={typeOptions} bind:value={type} />
		<div class="grid-2 gap-2">
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
			<Checkbox bind:checked={isSolid} label="Solid" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-6 center">
		{#snippet header()}
			<h4>Button Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			<Button variant={item.id as any}>{item.label}</Button>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-6 center">
		{#snippet header()}
			<h4>Button Solid</h4>
		{/snippet}
		{#each variantOptions as item}
			<Button variant={item.id as any} isSolid>{item.label}</Button>
		{/each}
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<!-- Botón CTA primario con icono -->
	<Button variant="primary" size="lg" isWide startIcon={HeartAngleLinearIcon}>
		Get Started Free
	</Button>

	<!-- Botón de descarga -->
	<Button variant="success" isSolid size="lg" isWide>⬇️ Download Now</Button>

	<!-- Botón de suscripción -->
	<Button variant="info" size="lg" isWide endIcon={BalloonLinearIcon}>Subscribe</Button>

	<!-- Botón outline con hover -->
	<Button variant="outlined" size="lg" isWide>Learn More →</Button>

	<!-- Botón de loading -->
	<Button variant="primary" isLoading isWide>Processing...</Button>

	<!-- Botón de peligro -->
	<Button variant="danger" isSolid isWide>🗑️ Delete Account</Button>

	<!-- Botón secundario con iconos -->
	<Button variant="secondary" isWide startIcon={HeartAngleLinearIcon} endIcon={BalloonLinearIcon}>
		Add to Favorites
	</Button>

	<!-- Botón ghost -->
	<Button variant="ghost" isWide>Skip for now</Button>

	<!-- Grupo de tamaños -->
	<div class="flex gap-2 items-center">
		<Button variant="primary" size="xs">XS</Button>
		<Button variant="primary" size="sm">SM</Button>
		<Button variant="primary" size="md">MD</Button>
		<Button variant="primary" size="lg">LG</Button>
	</div>

	<!-- Botón warning -->
	<Button variant="warning" isSolid isWide>⚠️ Proceed with Caution</Button>

	<!-- Botón muted -->
	<Button variant="muted" isWide>Cancel</Button>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Button with Icon -->
<Button variant="primary" startIcon={HeartIcon}>
	Get Started
</Button>

<!-- Loading Button -->
<Button variant="primary" isLoading>
	Processing...
</Button>

<!-- Solid Variant -->
<Button variant="success" isSolid>
	Download Now
</Button>

<!-- Full Width Button -->
<Button variant="info" isWide>
	Subscribe
</Button>

<!-- Button as Link -->
<Button variant="outlined" href="/pricing">
	Learn More
</Button>

<!-- Button Sizes -->
<Button variant="primary" size="xs">XS</Button>
<Button variant="primary" size="sm">SM</Button>
<Button variant="primary" size="md">MD</Button>
<Button variant="primary" size="lg">LG</Button>

<!-- Ghost Button -->
<Button variant="ghost">
	Skip for now
</Button>`}
		/>
	</Card>
</Section>

<DocsProps {props} />
