<script lang="ts">
	import { IconButton, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import {
		HeartAngleLinearIcon,
		BalloonLinearIcon,
		Settings24RegularIcon,
		Search24RegularIcon,
		TrashLinearIcon,
		DownloadLinearIcon,
		Heart24RegularIcon,
		SendRegularIcon
	} from '$lib/icons';
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
		{ id: 'ghost', label: 'Ghost' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const iconOptions = [
		{ id: 'heart', label: 'Heart', icon: HeartAngleLinearIcon },
		{ id: 'settings', label: 'Settings', icon: Settings24RegularIcon },
		{ id: 'search', label: 'Search', icon: Search24RegularIcon },
		{ id: 'trash', label: 'Trash', icon: TrashLinearIcon },
		{ id: 'download', label: 'Download', icon: DownloadLinearIcon },
		{ id: 'send', label: 'Send', icon: SendRegularIcon }
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
	let selectedIcon: any = $state('heart');

	let href = $state('');
	let isLoading = $state(false);
	let isDisabled = $state(false);

	let currentIcon = $derived(
		iconOptions.find((i) => i.id === selectedIcon)?.icon ?? HeartAngleLinearIcon
	);

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'solid',
			size !== 'md',
			type !== 'button',
			href,
			isLoading,
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
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			type !== 'button' && `\ttype="${type}"`,
			href && `\thref="/example"`,
			`\ticon={HeartAngleLinearIcon}`,
			hasProps && !href && `\tonclick={handleClick}`,
			isLoading && `\tisLoading`,
			isDisabled && `\tisDisabled`,
			hasProps && `/>`,
			!hasProps && `<IconButton icon={HeartAngleLinearIcon} onclick={handleClick} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'icon', type: 'IconData', initial: '', description: 'Required. The icon to display.' },
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
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'isLoading', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' }
	];
</script>

<DocsHeader title="IconButton" llmUrl="https://ui-svelte.sappsdev.com/llm/control/icon-button.md">
	Icon buttons are compact buttons that display only an icon, ideal for toolbars and actions where
	space is limited.
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
				label="Icon"
				size="sm"
				options={iconOptions}
				bind:value={selectedIcon}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox
				onchange={(v) => (v ? (href = '/example') : (href = ''))}
				name="href"
				label="Link"
			/>
			<Checkbox bind:checked={isLoading} label="Loading" />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
		</div>

		<div class="doc-preview">
			<IconButton icon={currentIcon} {color} {variant} {size} {type} {isLoading} {isDisabled} />
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<h4>Variants & Colors</h4>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as c}
					<IconButton variant={item.id as any} color={c.id as any} icon={HeartAngleLinearIcon} />
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<h4>Sizes</h4>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each sizeOptions as s}
					<IconButton variant={item.id as any} size={s.id as any} icon={Settings24RegularIcon} />
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<h4>Different Icons</h4>
	<Card>
		<div class="wrap gap-4 center">
			<IconButton icon={HeartAngleLinearIcon} color="danger" />
			<IconButton icon={Settings24RegularIcon} color="muted" />
			<IconButton icon={Search24RegularIcon} color="info" />
			<IconButton icon={TrashLinearIcon} color="danger" variant="soft" />
			<IconButton icon={DownloadLinearIcon} color="success" variant="outlined" />
			<IconButton icon={SendRegularIcon} color="primary" variant="ghost" />
		</div>
	</Card>
</Section>

<Section>
	<h4>States</h4>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				<IconButton variant={item.id as any} icon={Heart24RegularIcon} />
				<IconButton variant={item.id as any} icon={Heart24RegularIcon} isLoading />
				<IconButton variant={item.id as any} icon={Heart24RegularIcon} isDisabled />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<h4>The component accepts the following props:</h4>
	<DocsProps {props} />
</Section>
