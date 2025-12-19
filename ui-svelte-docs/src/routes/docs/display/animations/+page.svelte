<script lang="ts">
	import { Button, Card, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const animationOptions = [
		{ id: 'fade-in', label: 'Fade In' },
		{ id: 'fade-in-up', label: 'Fade In Up' },
		{ id: 'fade-in-down', label: 'Fade In Down' },
		{ id: 'fade-in-left', label: 'Fade In Left' },
		{ id: 'fade-in-right', label: 'Fade In Right' },
		{ id: 'zoom-in', label: 'Zoom In' },
		{ id: 'zoom-in-up', label: 'Zoom In Up' },
		{ id: 'slide-up', label: 'Slide Up' },
		{ id: 'slide-down', label: 'Slide Down' },
		{ id: 'slide-left', label: 'Slide Left' },
		{ id: 'slide-right', label: 'Slide Right' },
		{ id: 'bounce-in', label: 'Bounce In' },
		{ id: 'bounce-in-up', label: 'Bounce In Up' },
		{ id: 'reveal-up', label: 'Reveal Up' },
		{ id: 'reveal-scale', label: 'Reveal Scale' },
		{ id: 'flip-in-x', label: 'Flip In X' },
		{ id: 'flip-in-y', label: 'Flip In Y' }
	];

	const continuousOptions = [
		{ id: 'float', label: 'Float' },
		{ id: 'pulse-soft', label: 'Pulse Soft' },
		{ id: 'shake', label: 'Shake' },
		{ id: 'wiggle', label: 'Wiggle' },
		{ id: 'glow-pulse', label: 'Glow Pulse' }
	];

	const delayOptions = [
		{ id: 'delay-0', label: '0ms' },
		{ id: 'delay-75', label: '75ms' },
		{ id: 'delay-100', label: '100ms' },
		{ id: 'delay-150', label: '150ms' },
		{ id: 'delay-200', label: '200ms' },
		{ id: 'delay-300', label: '300ms' },
		{ id: 'delay-500', label: '500ms' },
		{ id: 'delay-700', label: '700ms' },
		{ id: 'delay-1000', label: '1000ms' }
	];

	let animation: any = $state('fade-in-up');
	let delay: any = $state('delay-0');
	let animationKey = $state(0);

	function replayAnimation() {
		animationKey++;
	}

	let code = $derived(() => {
		const delayClass = delay !== 'delay-0' ? ` ${delay}` : '';
		return `<div class="${animation}${delayClass}">
  Animated content
</div>`;
	});

	const entranceClasses = [
		{ class: 'fade-in', description: 'Simple opacity fade from 0 to 1' },
		{ class: 'fade-in-up', description: 'Fade in while moving up from below' },
		{ class: 'fade-in-down', description: 'Fade in while moving down from above' },
		{ class: 'fade-in-left', description: 'Fade in while moving from left' },
		{ class: 'fade-in-right', description: 'Fade in while moving from right' },
		{ class: 'zoom-in', description: 'Fade in with scale from 0.8 to 1' },
		{ class: 'zoom-in-up', description: 'Zoom and move up simultaneously' },
		{ class: 'slide-up', description: 'Slide from bottom to position' },
		{ class: 'slide-down', description: 'Slide from top to position' },
		{ class: 'slide-left', description: 'Slide from right to position' },
		{ class: 'slide-right', description: 'Slide from left to position' },
		{ class: 'bounce-in', description: 'Bouncy scale entrance with overshoot' },
		{ class: 'bounce-in-up', description: 'Bouncy entrance from below' },
		{ class: 'reveal-up', description: 'Reveal with blur effect from below' },
		{ class: 'reveal-scale', description: 'Scale and translate reveal' },
		{ class: 'flip-in-x', description: '3D flip entrance on X axis' },
		{ class: 'flip-in-y', description: '3D flip entrance on Y axis' }
	];

	const continuousClasses = [
		{ class: 'float', description: 'Gentle up/down floating motion (infinite)' },
		{ class: 'pulse-soft', description: 'Soft pulsing opacity and scale (infinite)' },
		{ class: 'shake', description: 'Horizontal shake effect' },
		{ class: 'wiggle', description: 'Playful rotation wiggle (infinite)' },
		{ class: 'glow-pulse', description: 'Pulsing box-shadow glow (infinite)' }
	];

	const scrollRevealClasses = [
		{ class: 'reveal', description: 'Scroll reveal from below (add .is-visible to trigger)' },
		{ class: 'reveal-left', description: 'Scroll reveal from left (add .is-visible to trigger)' },
		{ class: 'reveal-right', description: 'Scroll reveal from right (add .is-visible to trigger)' },
		{ class: 'reveal-zoom', description: 'Scroll reveal with zoom (add .is-visible to trigger)' }
	];

	const delayClasses = [
		{ class: 'delay-0', description: 'No delay (0ms)' },
		{ class: 'delay-75', description: '75ms delay' },
		{ class: 'delay-100', description: '100ms delay' },
		{ class: 'delay-150', description: '150ms delay' },
		{ class: 'delay-200', description: '200ms delay' },
		{ class: 'delay-300', description: '300ms delay' },
		{ class: 'delay-400', description: '400ms delay' },
		{ class: 'delay-500', description: '500ms delay' },
		{ class: 'delay-600', description: '600ms delay' },
		{ class: 'delay-700', description: '700ms delay' },
		{ class: 'delay-800', description: '800ms delay' },
		{ class: 'delay-1000', description: '1000ms delay' }
	];

	const durationClasses = [
		{ class: 'duration-300', description: '300ms animation duration' },
		{ class: 'duration-700', description: '700ms animation duration' },
		{ class: 'duration-3000', description: '1000ms animation duration' }
	];
</script>

<DocsHeader title="Animations">
	CSS utility classes for entrance animations, continuous effects, and scroll-triggered reveals.
	Perfect for adding motion and life to your UI elements.
</DocsHeader>

<Section>
	<Card>
		<div class="grid-2 md:grid-4 gap-2 center">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Animation"
				size="sm"
				options={animationOptions}
				bind:value={animation}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Delay"
				size="sm"
				options={delayOptions}
				bind:value={delay}
			/>
			<Button size="sm" variant="soft" onclick={replayAnimation}>Replay ↻</Button>
		</div>

		<div class="doc-preview">
			{#key animationKey}
				<Card rootClass="{animation} {delay} max-w-xs">
					<p class="card-title">Preview Card</p>
					<p class="card-description">This card is animated</p>
				</Card>
			{/key}
		</div>
		<Code lang="html" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Entrance Animations</p>
	<p class="section-description">
		One-time animations that play when an element is rendered. Great for page loads and modal
		appearances.
	</p>
	<Card>
		<div class="grid-2 md:grid-3 lg:grid-4 gap-4">
			{#each animationOptions as item}
				{#key animationKey}
					<Card rootClass="{item.id} delay-{animationOptions.indexOf(item) * 75}">
						<p class="card-title">{item.label}</p>
						<p class="caption text-on-muted">.{item.id}</p>
					</Card>
				{/key}
			{/each}
		</div>
		<Button size="sm" variant="soft" onclick={replayAnimation} class="mt-4">Replay All ↻</Button>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Continuous Animations</p>
	<p class="section-description">
		Looping animations for attention-grabbing elements, loading states, or decorative effects.
	</p>
	<Card>
		<div class="grid-2 md:grid-5 gap-4">
			{#each continuousOptions as item}
				<Card rootClass={item.id}>
					<p class="card-title">{item.label}</p>
					<p class="caption text-on-muted">.{item.id}</p>
				</Card>
			{/each}
		</div>
		<Code
			lang="html"
			code={`<div class="float">Floating element</div>
<div class="pulse-soft">Pulsing element</div>
<div class="wiggle">Wiggling element</div>
<div class="glow-pulse">Glowing element</div>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Staggered Animations</p>
	<p class="section-description">
		Use delay utilities to create staggered entrance effects for lists and grids.
	</p>
	<Card>
		<div class="grid-4 md:grid-6 gap-3">
			{#key animationKey}
				{#each [0, 75, 150, 200, 300, 400, 500, 600, 700, 800, 1000] as d, i}
					<Card variant="soft" color="muted" rootClass="fade-in-up delay-{d} text-center py-4">
						<p class="caption">{d}ms</p>
					</Card>
				{/each}
			{/key}
		</div>
		<Button size="sm" variant="soft" onclick={replayAnimation} class="mt-4">Replay ↻</Button>
		<Code
			lang="html"
			code={`<div class="fade-in-up delay-0">First</div>
<div class="fade-in-up delay-100">Second</div>
<div class="fade-in-up delay-200">Third</div>
<div class="fade-in-up delay-300">Fourth</div>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">On Buttons</p>
	<p class="section-description">Apply animations to buttons for interactive effects.</p>
	<Card>
		<div class="wrap gap-4 center">
			{#key animationKey}
				<Button class="fade-in-up delay-0">Fade Up</Button>
				<Button class="zoom-in delay-100" variant="soft">Zoom In</Button>
				<Button class="bounce-in delay-200" variant="ghost">Bounce</Button>
				<Button class="float" variant="outlined">Float</Button>
				<Button class="pulse-soft" color="success">Pulse</Button>
			{/key}
		</div>
		<Button size="sm" variant="soft" onclick={replayAnimation} class="mt-4">Replay ↻</Button>
		<Code
			lang="html"
			code={`<Button class="fade-in-up">Fade Up</Button>
<Button class="zoom-in delay-100">Zoom In</Button>
<Button class="bounce-in delay-200">Bounce</Button>
<Button class="float">Floating Button</Button>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Entrance Animation Classes</p>
	<DocsProps
		props={entranceClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Continuous Animation Classes</p>
	<DocsProps
		props={continuousClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Scroll Reveal Classes</p>
	<DocsProps
		props={scrollRevealClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Delay Utilities</p>
	<DocsProps
		props={delayClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>

<Section>
	<p class="section-subtitle">Duration Utilities</p>
	<DocsProps
		props={durationClasses.map((c) => ({
			prop: `.${c.class}`,
			type: 'CSS class',
			initial: c.description
		}))}
	/>
</Section>
