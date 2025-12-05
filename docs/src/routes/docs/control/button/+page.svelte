<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Button, Checkbox, Select } from 'ui-svelte';
	import { HeartAngleLinearIcon, BalloonLinearIcon } from '$lib/icons';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
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
	let hasShadow = $state(false);
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
			isDisabled,
			hasShadow
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
			hasShadow && `\thasShadow`,
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
		{ prop: 'hasShadow', type: 'boolean', initial: 'false' },
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
		{hasShadow}
		{isSolid}
	>
		Label
	</Button>
{/snippet}

{#snippet builder()}
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
	<Select label="Type" size="sm" options={typeOptions} bind:value={type} />

	<DocOptions title="Props">
		<Checkbox bind:checked={startIcon} label="startIcon" />
		<Checkbox bind:checked={endIcon} label="endIcon" />
		<Checkbox onchange={(v) => (v ? (href = '/example') : (href = ''))} name="href" label="Link" />
		<Checkbox bind:checked={isLoading} label="Loading" />
		<Checkbox bind:checked={isWide} label="Wide" />
		<Checkbox bind:checked={isDisabled} label="Disabled" />
		<Checkbox bind:checked={hasShadow} label="Shadow" />
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Button">Buttons allow users to take actions with a single tap.</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
