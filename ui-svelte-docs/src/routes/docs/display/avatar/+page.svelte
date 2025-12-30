<script lang="ts">
	import { Avatar, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import {
		Person24RegularIcon,
		Heart24RegularIcon,
		Settings24RegularIcon,
		Rocket24RegularIcon,
		Shield24RegularIcon,
		HomeLinearIcon,
		GlobalLinearIcon
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
		{ id: 'soft', label: 'Soft' }
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

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let size: any = $state('md');
	let status: any = $state('');

	let src = $state('');
	let name = $state('John Doe');
	let isBordered = $state(false);
	let href = $state('');

	let hasImage = $state(false);
	let hasIcon = $state(false);
	const sampleImageUrl = 'https://i.pravatar.cc/150?img=3';

	let hasProps = $derived(
		[
			color !== 'primary',
			variant !== 'solid',
			size !== 'md',
			status,
			src,
			hasIcon,
			isBordered,
			href
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Avatar } from 'ui-svelte';`,
			hasIcon && `\timport { UserIcon } from 'ui-svelte/icons';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Avatar`,
			color !== 'primary' && `\tcolor="${color}"`,
			variant !== 'solid' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			status && `\tstatus="${status}"`,
			src && `\tsrc="${sampleImageUrl}"`,
			hasIcon && !src && `\ticon={UserIcon}`,
			!src && !hasIcon && name && `\tname="${name}"`,
			isBordered && `\tisBordered`,
			href && `\thref="/profile"`,
			hasProps && `/>`,
			!hasProps && `<Avatar name="${name}" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'src', type: 'string', initial: '' },
		{ prop: 'name', type: 'string', initial: '' },
		{ prop: 'alt', type: 'string', initial: 'Avatar' },
		{ prop: 'href', type: 'string', initial: '' },
		{ prop: 'onclick', type: '() => void', initial: '' },
		{ prop: 'target', type: '_self | _blank | _parent | _top', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'solid'
		},
		{ prop: 'size', type: 'xs | sm | md | lg | xl', initial: 'md' },
		{ prop: 'status', type: 'online | offline | busy | away', initial: '' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	$effect(() => {
		src = hasImage ? sampleImageUrl : '';
		if (hasImage) hasIcon = false;
	});

	$effect(() => {
		if (hasIcon) hasImage = false;
	});
</script>

<DocsHeader title="Avatar" llmUrl="https://ui-svelte.sappsdev.com/llm/display/avatar.md">
	Avatars represent users or entities with images or initials.
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
				label="Status"
				size="sm"
				options={statusOptions}
				bind:value={status}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={hasImage} label="Image" />
			<Checkbox bind:checked={hasIcon} label="Icon" />
			<Checkbox bind:checked={isBordered} label="Bordered" />
			<Checkbox
				onchange={(v) => (v ? (href = '/profile') : (href = ''))}
				name="href"
				label="Link"
			/>
		</div>

		<div class="doc-preview">
			<Avatar
				src={src || undefined}
				{name}
				{color}
				{variant}
				{size}
				status={status || undefined}
				{isBordered}
				href={href || undefined}
				icon={hasIcon ? Person24RegularIcon : undefined}
			/>
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
					<Avatar variant={item.id as any} color={color.id as any} name={color.label} />
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
					<Avatar variant={item.id as any} size={size.id as any} name={size.label} />
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Images</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each sizeOptions as size}
				<Avatar size={size.id as any} src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Icons</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each sizeOptions as size}
				<Avatar size={size.id as any} icon={Person24RegularIcon} />
			{/each}
		</div>
		<div class="wrap gap-4 center">
			<Avatar icon={Person24RegularIcon} color="primary" />
			<Avatar icon={Heart24RegularIcon} color="secondary" />
			<Avatar icon={Settings24RegularIcon} color="success" />
			<Avatar icon={Rocket24RegularIcon} color="info" />
			<Avatar icon={Shield24RegularIcon} color="warning" />
			<Avatar icon={HomeLinearIcon} color="danger" />
			<Avatar icon={GlobalLinearIcon} color="muted" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Status Indicators</p>
	<Card>
		<div class="wrap gap-4 center">
			<Avatar name="Online" status="online" />
			<Avatar name="Offline" status="offline" />
			<Avatar name="Busy" status="busy" />
			<Avatar name="Away" status="away" />
		</div>
		<div class="wrap gap-4 center">
			<Avatar src="https://i.pravatar.cc/150?img=1" status="online" />
			<Avatar src="https://i.pravatar.cc/150?img=2" status="offline" />
			<Avatar src="https://i.pravatar.cc/150?img=4" status="busy" />
			<Avatar src="https://i.pravatar.cc/150?img=5" status="away" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Bordered</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each colorOptions as color}
				<Avatar color={color.id as any} name={color.label} isBordered />
			{/each}
		</div>
		<div class="wrap gap-4 center">
			{#each colorOptions as color}
				<Avatar color={color.id as any} src="https://i.pravatar.cc/150?img=3" isBordered />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
