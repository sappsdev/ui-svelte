<script lang="ts">
	import { Avatar, Button, Card, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const styleOptions = [
		{ id: 'bd-glow', label: 'Glow' },
		{ id: 'bd-neon', label: 'Neon' },
		{ id: 'bd-grad', label: 'Gradient' },
		{ id: 'bd-rainbow', label: 'Rainbow' },
		{ id: 'bd-shimmer', label: 'Shimmer' },
		{ id: 'bd-pulse', label: 'Pulse' },
		{ id: 'bd-wave', label: 'Wave' },
		{ id: 'bd-frost', label: 'Frost' },
		{ id: 'bd-ember', label: 'Ember' },
		{ id: 'bd-laser', label: 'Laser' },
		{ id: 'bd-solid', label: 'Solid' },
		{ id: 'bd-dash', label: 'Dash' }
	];

	const colorOptions = [
		{ id: '', label: 'Default' },
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	let style: any = $state('bd-glow');
	let color: any = $state('primary');

	let code = $derived(() => {
		const colorClass = color ? ` ${style}-${color}` : '';
		return `<Card rootClass="${style}${colorClass}">
  <p>Card content</p>
</Card>`;
	});

	const classes = [
		{ class: 'bd-glow', description: 'Soft luminous border with glow effect' },
		{ class: 'bd-neon', description: 'Intense neon border with pulse animation' },
		{ class: 'bd-grad', description: 'Gradient border (two-color blend)' },
		{ class: 'bd-rainbow', description: 'Animated multicolor rotating border' },
		{ class: 'bd-shimmer', description: 'Sliding shine effect along the border' },
		{ class: 'bd-pulse', description: 'Expanding ring pulse animation' },
		{ class: 'bd-wave', description: 'Rotating luminous wave border' },
		{ class: 'bd-frost', description: 'Frosted glass/icy border effect' },
		{ class: 'bd-ember', description: 'Fire/ember flickering border' },
		{ class: 'bd-laser', description: 'Scanning laser line around border' },
		{ class: 'bd-solid', description: 'Simple solid border with hover effect' },
		{ class: 'bd-dash', description: 'Animated marching dashed border' }
	];

	const colorVariants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
</script>

<DocsHeader title="Decorations">
	CSS utility classes to add decorative border effects to cards, buttons, avatars and other
	elements. Includes glowing, gradient, animated, and special effect borders.
</DocsHeader>

<Section>
	<Card>
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Style"
				size="sm"
				options={styleOptions}
				bind:value={style}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
		</div>

		<div class="doc-preview">
			<Card variant="ghost" rootClass="{style} {color ? `${style}-${color}` : ''} max-w-xs">
				<p class="card-title">Preview Card</p>
				<p class="card-description">This card has decorative border</p>
			</Card>
		</div>
		<Code lang="html" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">All Styles on Cards</p>
	<Card>
		<div class="grid-2 md:grid-3 gap-4">
			{#each styleOptions as item}
				<Card variant="ghost" rootClass="{item.id} {item.id}-primary">
					<p class="card-title">{item.label}</p>
					<p class="card-description">.{item.id}</p>
				</Card>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">On Buttons</p>
	<p class="section-description">
		Apply border decorations to buttons using the <code>class</code> prop.
	</p>
	<Card>
		<div class="wrap gap-4 center">
			{#each ['bd-glow', 'bd-neon', 'bd-grad', 'bd-shimmer', 'bd-pulse', 'bd-wave'] as bd}
				<Button class="{bd} {bd}-primary" variant="ghost">{bd.replace('bd-', '')}</Button>
			{/each}
		</div>
		<Code
			lang="html"
			code={`<Button class="bd-glow bd-glow-primary" variant="ghost">Glow</Button>
<Button class="bd-neon bd-neon-secondary" variant="ghost">Neon</Button>
<Button class="bd-shimmer bd-shimmer-info" variant="ghost">Shimmer</Button>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">On Avatars</p>
	<p class="section-description">
		Apply border decorations to avatars using the <code>class</code> prop.
	</p>
	<Card>
		<div class="wrap gap-6 center">
			<Avatar class="bd-glow bd-glow-primary" src="https://i.pravatar.cc/150?img=1" size="lg" />
			<Avatar class="bd-neon bd-neon-secondary" src="https://i.pravatar.cc/150?img=2" size="lg" />
			<Avatar class="bd-pulse bd-pulse-success" src="https://i.pravatar.cc/150?img=3" size="lg" />
			<Avatar class="bd-shimmer bd-shimmer-info" src="https://i.pravatar.cc/150?img=4" size="lg" />
			<Avatar class="bd-wave bd-wave-warning" src="https://i.pravatar.cc/150?img=5" size="lg" />
		</div>
		<Code
			lang="html"
			code={`<Avatar class="bd-glow bd-glow-primary" src="..." size="lg" />
<Avatar class="bd-neon bd-neon-secondary" src="..." size="lg" />
<Avatar class="bd-pulse bd-pulse-success" src="..." size="lg" />`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Variants</p>
	<p class="section-description">
		Each style supports 6 color variants: primary, secondary, success, warning, danger, info
	</p>
	<Card>
		{#each ['bd-glow', 'bd-neon', 'bd-grad', 'bd-shimmer'] as baseStyle}
			<div class="py-4 border-b border-muted last:border-b-0">
				<h5 class="mb-2 uppercase text-on-muted">{baseStyle}</h5>
				<div class="grid-2 md:grid-3 lg:grid-6 gap-3">
					{#each colorVariants as c}
						<Card variant="ghost" rootClass="{baseStyle} {baseStyle}-{c}">
							<p class="caption text-center">{c}</p>
						</Card>
					{/each}
				</div>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Animated Borders</p>
	<p class="section-description">These styles include animations for dynamic visual effects.</p>
	<Card>
		<div class="grid-2 md:grid-4 gap-4">
			<Card variant="ghost" rootClass="bd-rainbow">
				<p class="card-title">Rainbow</p>
				<p class="caption">Rotating multicolor</p>
			</Card>
			<Card variant="ghost" rootClass="bd-shimmer bd-shimmer-primary">
				<p class="card-title">Shimmer</p>
				<p class="caption">Sliding shine</p>
			</Card>
			<Card variant="ghost" rootClass="bd-pulse bd-pulse-secondary">
				<p class="card-title">Pulse</p>
				<p class="caption">Expanding ring</p>
			</Card>
			<Card variant="ghost" rootClass="bd-wave bd-wave-info">
				<p class="card-title">Wave</p>
				<p class="caption">Rotating wave</p>
			</Card>
			<Card variant="ghost" rootClass="bd-neon bd-neon-success">
				<p class="card-title">Neon</p>
				<p class="caption">Pulsing glow</p>
			</Card>
			<Card variant="ghost" rootClass="bd-ember">
				<p class="card-title">Ember</p>
				<p class="caption">Fire flicker</p>
			</Card>
			<Card variant="ghost" rootClass="bd-laser bd-laser-danger">
				<p class="card-title">Laser</p>
				<p class="caption">Scanning line</p>
			</Card>
			<Card variant="ghost" rootClass="bd-dash bd-dash-warning">
				<p class="card-title">Dash</p>
				<p class="caption">Marching border</p>
			</Card>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Special Effects</p>
	<Card>
		<div class="grid-2 md:grid-3 gap-4">
			<Card variant="ghost" rootClass="bd-frost bd-frost-info">
				<p class="card-title">Frost</p>
				<p class="card-description">Icy frosted glass effect with subtle inner glow</p>
			</Card>
			<Card variant="ghost" rootClass="bd-ember">
				<p class="card-title">Ember</p>
				<p class="card-description">Warm fire-like border with flickering animation</p>
			</Card>
			<Card variant="ghost" rootClass="bd-rainbow">
				<p class="card-title">Rainbow</p>
				<p class="card-description">Full spectrum rotating gradient border</p>
			</Card>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Combining with Card Variants</p>
	<Card>
		<div class="grid-2 md:grid-4 gap-4">
			<Card color="surface" variant="solid" rootClass="bd-glow bd-glow-primary">
				<p class="card-title">Solid + Glow</p>
			</Card>
			<Card color="muted" variant="soft" rootClass="bd-neon bd-neon-secondary">
				<p class="card-title">Soft + Neon</p>
			</Card>
			<Card variant="ghost" rootClass="bd-shimmer bd-shimmer-success">
				<p class="card-title">Ghost + Shimmer</p>
			</Card>
			<Card variant="outlined" rootClass="bd-pulse bd-pulse-info">
				<p class="card-title">Outlined + Pulse</p>
			</Card>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Available Classes</p>
	<DocsProps
		props={classes.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Color Modifier Classes</p>
	<p class="section-description">
		Add a color suffix to any style class: <code>.bd-style-color</code>
	</p>
	<Card>
		<Code
			lang="html"
			code={`<!-- Card Examples -->
<Card rootClass="bd-glow bd-glow-primary">Primary Glow</Card>
<Card rootClass="bd-neon bd-neon-secondary">Secondary Neon</Card>
<Card rootClass="bd-grad bd-grad-success">Success Gradient</Card>

<!-- Button Examples -->
<Button class="bd-shimmer bd-shimmer-info" variant="ghost">Info Shimmer</Button>
<Button class="bd-pulse bd-pulse-warning" variant="ghost">Warning Pulse</Button>

<!-- Avatar Examples -->
<Avatar class="bd-wave bd-wave-danger" src="..." />
<Avatar class="bd-frost bd-frost-info" src="..." />`}
		/>
	</Card>
</Section>
