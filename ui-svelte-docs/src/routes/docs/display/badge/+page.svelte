<script lang="ts">
	import { Avatar, Badge, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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

	const positionOptions = [
		{ id: 'top-left', label: 'Top Left' },
		{ id: 'top-right', label: 'Top Right' },
		{ id: 'bottom-left', label: 'Bottom Left' },
		{ id: 'bottom-right', label: 'Bottom Right' }
	];

	let color: any = $state('primary');
	let variant: any = $state('solid');
	let position: any = $state('top-right');
	let badgeText = $state('5');
	let useAvatar = $state(true);

	let hasProps = $derived(
		[color !== 'primary', variant !== 'solid', position !== 'top-right'].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Badge${useAvatar ? ', Avatar' : ', Card'} } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = useAvatar
			? [
					hasProps && `<Badge`,
					hasProps && `\ttext="${badgeText}"`,
					color !== 'primary' && `\tcolor="${color}"`,
					variant !== 'solid' && `\tvariant="${variant}"`,
					position !== 'top-right' && `\tposition="${position}"`,
					hasProps && `>`,
					hasProps && `\t<Avatar src="/user.jpg" alt="User" size="xl" />`,
					hasProps && `</Badge>`,
					!hasProps && `<Badge text="${badgeText}">`,
					!hasProps && `\t<Avatar src="/user.jpg" alt="User" size="xl" />`,
					!hasProps && `</Badge>`
				]
			: [
					hasProps && `<Badge`,
					hasProps && `\ttext="${badgeText}"`,
					color !== 'primary' && `\tcolor="${color}"`,
					variant !== 'solid' && `\tvariant="${variant}"`,
					position !== 'top-right' && `\tposition="${position}"`,
					hasProps && `>`,
					hasProps && `\t<Card>`,
					hasProps && `\t\t<p>Card content</p>`,
					hasProps && `\t</Card>`,
					hasProps && `</Badge>`,
					!hasProps && `<Badge text="${badgeText}">`,
					!hasProps && `\t<Card>`,
					!hasProps && `\t\t<p>Card content</p>`,
					!hasProps && `\t</Card>`,
					!hasProps && `</Badge>`
				];

		return [...scriptLines, ...componentLines.filter(Boolean)].join('\n');
	});

	const props = [
		{ prop: 'text', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | warning | danger',
			initial: 'primary'
		},
		{
			prop: 'variant',
			type: 'solid | soft',
			initial: 'solid'
		},
		{
			prop: 'position',
			type: 'top-left | top-right | bottom-left | bottom-right',
			initial: 'top-right'
		},
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Badge" llmUrl="https://ui-svelte.sappsdev.com/llm/display/badge.md">
	Badges are small status descriptors for UI elements. They display counts, notifications, or status
	indicators on top of other components.
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
				label="Position"
				size="sm"
				options={positionOptions}
				bind:value={position}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={useAvatar} label="Use Avatar" />
		</div>

		<div class="doc-preview">
			{#if useAvatar}
				<Badge text={badgeText} {color} {variant} {position}>
					<Avatar src="https://i.pravatar.cc/150?img=3" alt="User" size="xl" />
				</Badge>
			{:else}
				<Badge text={badgeText} {color} {variant} {position}>
					<Card variant="outlined">
						<p class="text-sm">Card with badge</p>
					</Card>
				</Badge>
			{/if}
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants & Colors</p>
	<Card>
		{#each variantOptions as item}
			<div class="wrap gap-4 center">
				{#each colorOptions as colorItem, i}
					<Badge text="3" variant={item.id as any} color={colorItem.id as any}>
						<Avatar
							src={`https://i.pravatar.cc/150?img=${i + 1}`}
							alt={colorItem.label}
							size="lg"
						/>
					</Badge>
				{/each}
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Positions</p>
	<Card>
		<div class="wrap gap-8 center">
			{#each positionOptions as item, i}
				<div class="column center gap-2">
					<Badge text="!" position={item.id as any} color="danger">
						<Avatar src={`https://i.pravatar.cc/150?img=${i + 20}`} alt={item.label} size="xl" />
					</Badge>
					<span class="text-xs">{item.label}</span>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage Examples</p>
	<Card>
		<div class="wrap gap-8 center">
			<!-- Badge on Avatar with notification count -->
			<Badge text="5" color="danger">
				<Avatar src="https://i.pravatar.cc/150?img=5" alt="User notifications" size="xl" />
			</Badge>

			<!-- Badge with text label -->
			<Badge text="New" color="success" variant="soft">
				<Avatar src="https://i.pravatar.cc/150?img=8" alt="User" size="xl" />
			</Badge>

			<!-- Badge on Avatar group -->
			<Badge text="2" color="primary" variant="soft">
				<Avatar name="JD" color="primary" size="lg" />
			</Badge>
			<Badge text="8" color="secondary">
				<Avatar name="AB" color="secondary" size="lg" />
			</Badge>
			<Badge text="99+" color="danger" variant="soft">
				<Avatar name="CD" color="muted" size="lg" />
			</Badge>

			<!-- Badge with Pro label -->
			<Badge text="Pro" color="success">
				<Avatar
					src="https://i.pravatar.cc/150?img=12"
					alt="Pro user"
					size="xl"
					isBordered
					color="success"
				/>
			</Badge>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Badge on Cards</p>
	<Card>
		<div class="wrap gap-8 center">
			<!-- Badge on Card -->
			<Badge text="3" color="info" position="top-right">
				<Card variant="outlined">
					<p class="text-sm">Inbox</p>
					<p class="text-xs">You have messages</p>
				</Card>
			</Badge>

			<!-- Badge on Card with icon text -->
			<Badge text="!" color="warning" position="top-left">
				<Card variant="outlined">
					<p class="text-sm">Alerts</p>
					<p class="text-xs">Action required</p>
				</Card>
			</Badge>

			<!-- Pricing card with Most Popular badge -->
			<Badge text="Most Popular" color="primary" variant="soft">
				<Card variant="soft" color="primary">
					<p class="text-2xl font-bold">$29<span class="text-sm">/mo</span></p>
					<p class="text-sm">Pro Plan</p>
				</Card>
			</Badge>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
