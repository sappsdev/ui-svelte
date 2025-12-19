<script lang="ts">
	import { Card, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const styleOptions = [
		{ id: 'mark', label: 'Mark' },
		{ id: 'grad', label: 'Gradient' },
		{ id: 'pill', label: 'Pill' },
		{ id: 'slant', label: 'Slant' },
		{ id: 'glow', label: 'Glow' },
		{ id: 'under', label: 'Underline' },
		{ id: 'strike', label: 'Strike' },
		{ id: 'box', label: 'Box' },
		{ id: 'wave', label: 'Wave' },
		{ id: 'neon', label: 'Neon' },
		{ id: 'pop', label: 'Pop' },
		{ id: 'tag', label: 'Tag' }
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

	let style: any = $state('mark');
	let color: any = $state('');

	let code = $derived(() => {
		const colorClass = color ? ` ${style}-${color}` : '';
		return `<h1 class="hero-title">Test <span class="${style}${colorClass}">heading</span>, please ignore</h1>`;
	});

	const classes = [
		{ class: 'mark', description: 'Background highlight with uppercase text' },
		{ class: 'grad', description: 'Gradient text effect (from secondary to warning)' },
		{ class: 'pill', description: 'Text with pill/rounded border' },
		{ class: 'slant', description: 'Angled/skewed background highlight' },
		{ class: 'glow', description: 'Glowing text effect with shadow' },
		{ class: 'under', description: 'Animated underline decoration' },
		{ class: 'strike', description: 'Strikethrough text decoration' },
		{ class: 'box', description: 'Boxed/framed text with border' },
		{ class: 'wave', description: 'Wavy underline decoration' },
		{ class: 'neon', description: 'Neon sign effect with flicker animation' },
		{ class: 'pop', description: '3D pop-out text effect' },
		{ class: 'tag', description: 'Light background badge/tag with shadow' }
	];

	const colorVariants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
</script>

<DocsHeader title="Rich Text">
	CSS utility classes to decorate and animate inline text elements like headings, keywords, or
	highlighted words.
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
			<h1 class="hero-title">
				Test <span class="{style} {color ? `${style}-${color}` : ''}">heading</span>, please ignore
			</h1>
		</div>
		<Code lang="html" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">All Styles</p>
	<Card>
		{#each styleOptions as item}
			<div class="py-4 border-b border-muted last:border-b-0">
				<h1 class="heading-xl">
					Test <span class={item.id}>{item.label}</span>, please ignore
				</h1>
				<Code lang="html" code={`<span class="${item.id}">${item.label}</span>`} />
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Variants</p>
	<p class="section-description">
		Each style supports 6 color variants: primary, secondary, success, warning, danger, info
	</p>
	<Card>
		{#each ['mark', 'grad', 'slant', 'glow', 'under', 'neon'] as baseStyle}
			<div class="py-4 border-b border-muted last:border-b-0">
				<h5 class="mb-2 uppercase text-on-muted">{baseStyle}</h5>
				<div class="wrap gap-4">
					{#each colorVariants as c}
						<h3 class="heading-lg">
							<span class="{baseStyle} {baseStyle}-{c}">{c}</span>
						</h3>
					{/each}
				</div>
			</div>
		{/each}
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Combining with Headings</p>
	<Card>
		<div class="space-y-6">
			<h1 class="hero-title">Build <span class="grad grad-primary">amazing</span> apps</h1>
			<h2 class="section-title">The <span class="mark mark-success">best</span> UI library</h2>
			<h3 class="heading-lg">Easy to <span class="slant slant-secondary">customize</span></h3>
			<h4 class="heading-md">Includes <span class="neon neon-warning">animations</span></h4>
			<p class="lead-lg">Create <span class="glow glow-danger">stunning</span> user interfaces</p>
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
		Add a color suffix to any style class: <code>.style-color</code>
	</p>
	<Card>
		<Code
			lang="html"
			code={`<!-- Examples -->
<span class="mark mark-primary">Primary</span>
<span class="grad grad-secondary">Secondary</span>
<span class="slant slant-success">Success</span>
<span class="glow glow-warning">Warning</span>
<span class="neon neon-danger">Danger</span>
<span class="pop pop-info">Info</span>`}
		/>
	</Card>
</Section>
