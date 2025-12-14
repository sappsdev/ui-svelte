<script lang="ts">
	import { Card, Checkbox, Code, IconButton, Section, Select } from 'ui-svelte';
	import {
		HeartAngleLinearIcon,
		DownloadLinearIcon,
		TrashLinearIcon,
		Settings24RegularIcon,
		Search24RegularIcon,
		Heart24RegularIcon,
		BalloonLinearIcon
	} from '$lib/icons';
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

	let href = $state('');

	let isLoading = $state(false);
	let isDisabled = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			type !== 'button',
			href,
			isLoading,
			isSolid,
			isDisabled
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { IconButton } from 'ui-svelte';`,
			`\timport { HeartAngleLinearIcon } from '$lib/icons';`,
			!href && `\n\tconst handleClick = () => {`,
			!href && `\t\tconsole.log('IconButton clicked');`,
			!href && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<IconButton`,
			hasProps && `\ticon={HeartAngleLinearIcon}`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			type !== 'button' && `\ttype="${type}"`,
			href && `\thref="/example"`,
			hasProps && !href && `\tonclick={handleClick}`,
			isLoading && `\tisLoading`,
			isSolid && `\tisSolid`,
			isDisabled && `\tisDisabled`,
			hasProps && `/>`,
			!hasProps && `<IconButton icon={HeartAngleLinearIcon} onclick={handleClick} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'icon', type: 'IconData', initial: '' },
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
		{ prop: 'isLoading', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="IconButton" llmUrl="https://ui-svelte.sappsdev.com/llm/control/icon-button.md">
	IconButton is a compact button displaying only an icon, perfect for toolbars and action menus.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<IconButton
			icon={HeartAngleLinearIcon}
			{variant}
			{size}
			{type}
			{isLoading}
			{isDisabled}
			{isSolid}
		/>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Select label="Type" size="sm" options={typeOptions} bind:value={type} />
		<div class="grid-2 gap-2">
			<Checkbox
				onchange={(v) => (v ? (href = '/example') : (href = ''))}
				name="href"
				label="Link"
			/>
			<Checkbox bind:checked={isLoading} label="Loading" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
			<Checkbox bind:checked={isSolid} label="Solid" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-6 center">
		{#snippet header()}
			<h4>IconButton Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			<IconButton icon={HeartAngleLinearIcon} variant={item.id as any} />
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-3 md:grid-6 center">
		{#snippet header()}
			<h4>IconButton Solid</h4>
		{/snippet}
		{#each variantOptions as item}
			<IconButton icon={HeartAngleLinearIcon} variant={item.id as any} isSolid />
		{/each}
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<!-- Favorite action -->
	<IconButton variant="primary" size="lg" icon={Heart24RegularIcon} />

	<!-- Download action -->
	<IconButton variant="success" isSolid size="lg" icon={DownloadLinearIcon} />

	<!-- Search action -->
	<IconButton variant="info" size="lg" icon={Search24RegularIcon} />

	<!-- Settings action -->
	<IconButton variant="outlined" size="lg" icon={Settings24RegularIcon} />

	<!-- Loading button -->
	<IconButton variant="primary" isLoading icon={HeartAngleLinearIcon} />

	<!-- Delete action -->
	<IconButton variant="danger" isSolid icon={TrashLinearIcon} />

	<!-- Party action -->
	<IconButton variant="secondary" icon={BalloonLinearIcon} />

	<!-- Muted action -->
	<IconButton variant="muted" icon={Settings24RegularIcon} />

	<!-- Size variations -->
	<div class="flex gap-2 items-center">
		<IconButton variant="primary" size="xs" icon={HeartAngleLinearIcon} />
		<IconButton variant="primary" size="sm" icon={HeartAngleLinearIcon} />
		<IconButton variant="primary" size="md" icon={HeartAngleLinearIcon} />
		<IconButton variant="primary" size="lg" icon={HeartAngleLinearIcon} />
	</div>

	<!-- Warning action -->
	<IconButton variant="warning" isSolid icon={Settings24RegularIcon} />

	<!-- Ghost action -->
	<IconButton variant="ghost" icon={HeartAngleLinearIcon} />
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Basic IconButton -->
<IconButton icon={HeartIcon} onclick={handleClick} />

<!-- IconButton with Variant -->
<IconButton icon={SettingsIcon} variant="secondary" />

<!-- Loading IconButton -->
<IconButton icon={SearchIcon} isLoading />

<!-- Solid Variant -->
<IconButton icon={DownloadIcon} variant="success" isSolid />

<!-- IconButton as Link -->
<IconButton icon={ExternalLinkIcon} href="/settings" />

<!-- IconButton Sizes -->
<IconButton icon={HeartIcon} size="xs" />
<IconButton icon={HeartIcon} size="sm" />
<IconButton icon={HeartIcon} size="md" />
<IconButton icon={HeartIcon} size="lg" />

<!-- Ghost IconButton -->
<IconButton icon={CloseIcon} variant="ghost" />`}
		/>
	</Card>
</Section>

<DocsProps {props} />
