<script lang="ts">
	import { Avatar, Card, Checkbox, Section, Select } from 'ui-svelte';
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
		{ id: '', label: 'None' },
		{ id: 'online', label: 'Online' },
		{ id: 'offline', label: 'Offline' },
		{ id: 'busy', label: 'Busy' },
		{ id: 'away', label: 'Away' }
	];

	let variant: any = $state('primary');
	let size: any = $state('lg');
	let status: any = $state('');

	let useImage = $state(true);
	let isBordered = $state(false);

	let hasProps = $derived(
		[variant !== 'primary', size !== 'lg', status, useImage, isBordered].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Avatar } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Avatar`,
			useImage && `\tsrc="https://i.pravatar.cc/150?img=3"`,
			!useImage && `\tname="John Doe"`,
			`\talt="User avatar"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'lg' && `\tsize="${size}"`,
			status && `\tstatus="${status}"`,
			isBordered && `\tisBordered`,
			hasProps && `/>`,
			!hasProps && `<Avatar name="John Doe" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'alt', type: 'string', initial: 'Avatar' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | warning | danger | info | transparent',
			initial: 'primary'
		},
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'lg' },
		{ prop: 'status', type: 'online | offline | busy | away', initial: '' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Avatar" llmUrl="https://ui-svelte.sappsdev.com/llm/display/avatar.md">
	Avatars represent a user or entity with an image or initials.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Avatar
			src={useImage ? 'https://i.pravatar.cc/150?img=3' : undefined}
			name={!useImage ? 'John Doe' : undefined}
			alt="User avatar"
			{variant}
			{size}
			status={status || undefined}
			{isBordered}
		/>
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Size" size="sm" options={sizeOptions} bind:value={size} />
		<Select label="Status" size="sm" options={statusOptions} bind:value={status} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={useImage} label="Use Image" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-4 md:grid-8 center">
		{#snippet header()}
			<h4>Avatar Variants</h4>
		{/snippet}
		{#each variantOptions as item}
			<Avatar variant={item.id as any} name={item.label} />
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-4 md:grid-8 center">
		{#snippet header()}
			<h4>Avatar with Border</h4>
		{/snippet}
		{#each variantOptions as item, i}
			<Avatar
				variant={item.id as any}
				src={`https://i.pravatar.cc/150?img=${i + 10}`}
				alt={item.label}
				isBordered
			/>
		{/each}
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<!-- Avatar con imagen -->
	<Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="xl" />

	<!-- Avatar con iniciales -->
	<Avatar name="Alice Brown" variant="secondary" size="xl" />

	<!-- Avatar con status online -->
	<Avatar src="https://i.pravatar.cc/150?img=5" alt="User online" size="xl" status="online" />

	<!-- Avatar con status offline -->
	<Avatar name="Bob Smith" variant="muted" size="xl" status="offline" />

	<!-- Avatar con status busy -->
	<Avatar
		src="https://i.pravatar.cc/150?img=8"
		alt="User busy"
		size="xl"
		status="busy"
		isBordered
	/>

	<!-- Avatar con status away -->
	<Avatar name="Carol Davis" variant="warning" size="xl" status="away" isBordered />

	<!-- Grupo de tamaños -->
	<div class="flex gap-2 items-center">
		<Avatar name="XS" variant="primary" size="xs" />
		<Avatar name="SM" variant="primary" size="sm" />
		<Avatar name="MD" variant="primary" size="md" />
		<Avatar name="LG" variant="primary" size="lg" />
		<Avatar name="XL" variant="primary" size="xl" />
	</div>

	<!-- Avatar con borde -->
	<Avatar
		src="https://i.pravatar.cc/150?img=12"
		alt="Bordered avatar"
		size="xl"
		isBordered
		variant="success"
	/>
</Section>

<DocsProps {props} />
