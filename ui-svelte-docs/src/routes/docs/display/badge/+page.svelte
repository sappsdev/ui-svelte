<script lang="ts">
	import { Avatar, Badge, Card, Checkbox, Code, Section, Select } from 'ui-svelte';
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
		{ id: 'warning', label: 'Warning' }
	];

	const positionOptions = [
		{ id: 'top-left', label: 'Top Left' },
		{ id: 'top-right', label: 'Top Right' },
		{ id: 'bottom-left', label: 'Bottom Left' },
		{ id: 'bottom-right', label: 'Bottom Right' }
	];

	let variant: any = $state('primary');
	let position: any = $state('top-right');
	let badgeText = $state('5');
	let useAvatar = $state(true);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Badge${useAvatar ? ', Avatar' : ', Card'} } from 'ui-svelte';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = useAvatar
			? [
					`<Badge`,
					`\ttext="${badgeText}"`,
					variant !== 'primary' && `\tvariant="${variant}"`,
					position !== 'top-right' && `\tposition="${position}"`,
					`>`,
					`\t<Avatar src="/user.jpg" alt="User" />`,
					`</Badge>`
				]
			: [
					`<Badge`,
					`\ttext="${badgeText}"`,
					variant !== 'primary' && `\tvariant="${variant}"`,
					position !== 'top-right' && `\tposition="${position}"`,
					`>`,
					`\t<Card>`,
					`\t\t<p>Card content</p>`,
					`\t</Card>`,
					`</Badge>`
				];

		return [...scriptLines, ...componentLines.filter(Boolean)].join('\n');
	});

	const props = [
		{ prop: 'text', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | success | info | warning | danger',
			initial: 'primary'
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

<Section bodyClass="md:grid-3">
	<DocsPreview>
		{#if useAvatar}
			<Badge text={badgeText} {variant} {position}>
				<Avatar src="https://i.pravatar.cc/150?img=3" alt="User" size="xl" />
			</Badge>
		{:else}
			<Badge text={badgeText} {variant} {position}>
				<Card>
					<p class="text-sm">Card with badge</p>
				</Card>
			</Badge>
		{/if}
	</DocsPreview>
	<Card>
		<Select label="Variant" size="sm" options={variantOptions} bind:value={variant} />
		<Select label="Position" size="sm" options={positionOptions} bind:value={position} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={useAvatar} label="Use Avatar" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="grid-4 md:grid-7 center">
		{#snippet header()}
			<h4>Badge Variants</h4>
		{/snippet}
		{#each variantOptions as item, i}
			<Badge text="3" variant={item.id as any}>
				<Avatar src={`https://i.pravatar.cc/150?img=${i + 1}`} alt={item.label} size="lg" />
			</Badge>
		{/each}
	</Card>
</Section>

<Section>
	<Card bodyClass="grid-4 center">
		{#snippet header()}
			<h4>Badge Positions</h4>
		{/snippet}
		{#each positionOptions as item, i}
			<div class="column center gap-2">
				<Badge text="!" position={item.id as any} variant="danger">
					<Avatar src={`https://i.pravatar.cc/150?img=${i + 20}`} alt={item.label} size="xl" />
				</Badge>
				<span class="text-xs">{item.label}</span>
			</div>
		{/each}
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<!-- Badge on Avatar with notification count -->
	<Badge text="5" variant="danger">
		<Avatar src="https://i.pravatar.cc/150?img=5" alt="User notifications" size="xl" />
	</Badge>

	<!-- Badge on Avatar with status text -->
	<Badge text="New" variant="success">
		<Avatar src="https://i.pravatar.cc/150?img=8" alt="User" size="xl" />
	</Badge>

	<!-- Badge on Card -->
	<Badge text="3" variant="info" position="top-right">
		<Card variant="outlined">
			<p class="text-sm">Inbox</p>
			<p class="text-xs">You have messages</p>
		</Card>
	</Badge>

	<!-- Badge on Card with icon text -->
	<Badge text="!" variant="warning" position="top-left">
		<Card variant="outlined">
			<p class="text-sm">Alerts</p>
			<p class="text-xs">Action required</p>
		</Card>
	</Badge>

	<!-- Badge on Avatar group -->
	<div class="flex gap-2 items-center">
		<Badge text="2" variant="primary">
			<Avatar name="JD" variant="primary" size="lg" />
		</Badge>
		<Badge text="8" variant="secondary">
			<Avatar name="AB" variant="secondary" size="lg" />
		</Badge>
		<Badge text="99+" variant="danger">
			<Avatar name="CD" variant="muted" size="lg" />
		</Badge>
	</div>

	<!-- Badge on Card product -->
	<Badge text="Sale" variant="danger" position="top-left">
		<Card cover="https://picsum.photos/seed/product/300/200" hasOverlay>
			<p class="text-xs">FEATURED</p>
			<h4>Product Name</h4>
		</Card>
	</Badge>

	<!-- Badge on Avatar with bordered style -->
	<Badge text="Pro" variant="success">
		<Avatar
			src="https://i.pravatar.cc/150?img=12"
			alt="Pro user"
			size="xl"
			isBordered
			variant="success"
		/>
	</Badge>

	<!-- Pricing card with Most Popular badge -->
	<Badge text="Most Popular" variant="primary">
		<Card variant="primary">
			{#snippet header()}
				<h4>Pro Plan</h4>
			{/snippet}
			<p class="text-2xl font-bold">$29<span class="text-sm">/mo</span></p>
			<p class="text-sm">Everything you need to grow</p>
		</Card>
	</Badge>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Badge on Avatar -->
<Badge text="5" variant="danger">
	<Avatar src="/user.jpg" alt="User" size="xl" />
</Badge>

<!-- Badge with Different Positions -->
<Badge text="New" position="top-left">
	<Avatar name="JD" size="lg" />
</Badge>
<Badge text="!" position="bottom-right" variant="warning">
	<Avatar name="AB" size="lg" />
</Badge>

<!-- Badge on Card -->
<Badge text="3" variant="info">
	<Card>
		<p>Card content with badge</p>
	</Card>
</Badge>

<!-- Badge with Text Labels -->
<Badge text="Sale" variant="danger" position="top-left">
	<Card cover="/product.jpg" hasOverlay>
		<h4>Product Name</h4>
	</Card>
</Badge>

<!-- Badge on Avatar with Status -->
<Badge text="Pro" variant="success" position="bottom-right">
	<Avatar src="/user.jpg" alt="Pro user" isBordered variant="success" />
</Badge>`}
		/>
	</Card>
</Section>

<DocsProps {props} />
