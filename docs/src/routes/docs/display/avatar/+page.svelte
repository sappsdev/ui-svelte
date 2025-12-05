<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Avatar, Checkbox, Select } from 'ui-svelte';

	const sourceOptions = [
		{ id: 'image', label: 'Image' },
		{ id: 'name', label: 'Name' }
	];

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'info', label: 'Info' },
		{ id: 'transparent', label: 'Transparent' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' },
		{ id: 'xl', label: 'xl' }
	];

	const statusOptions = [
		{ id: 'none', label: 'None' },
		{ id: 'online', label: 'Online' },
		{ id: 'offline', label: 'Offline' },
		{ id: 'busy', label: 'Busy' },
		{ id: 'away', label: 'Away' }
	];

	// Selects
	let source: any = $state('image');
	let variant: any = $state('primary');
	let size: any = $state('lg');
	let statusValue: any = $state('none');

	// States
	let isBordered = $state(false);

	let hasProps = $derived(
		[
			source !== 'image',
			variant !== 'primary',
			size !== 'md',
			statusValue !== 'none',
			isBordered
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Avatar } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Avatar`,
			source === 'image' && `\tsrc="/avatar-1.jpeg"`,
			source === 'name' && `\tname="J"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			statusValue !== 'none' && `\tstatus="${statusValue}"`,
			isBordered && `\tisBordered`,
			hasProps && `/>`,
			!hasProps && `<Avatar src="/avatar-1.jpeg" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'alt', type: 'string', initial: '' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | warning | error | info | transparent',
			initial: 'primary'
		},
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'lg' },
		{ prop: 'status', type: 'online | offline | busy | away', initial: '' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<Avatar
		src={source === 'image' ? '/images/avatar-1.jpeg' : undefined}
		name={source === 'name' ? 'J' : undefined}
		{variant}
		{size}
		status={statusValue !== 'none' ? statusValue : undefined}
		{isBordered}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Source" size="sm" options={sourceOptions} bind:value={source} />
	<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
	<Select label="Status" size="sm" options={statusOptions} bind:value={statusValue} />

	<DocOptions title="Props">
		<Checkbox bind:checked={isBordered} label="Bordered" />
	</DocOptions>
{/snippet}

<DocHeader title="Avatar"
	>Avatars are used to show a thumbnail representation of an individual or business.</DocHeader
>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
