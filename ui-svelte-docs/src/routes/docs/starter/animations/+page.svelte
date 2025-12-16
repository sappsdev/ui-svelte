<script lang="ts">
	import { Card, Code, Section, Select, Tabs } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';

	let selectedAnimation: any = $state('fade-in-up');
	let animationKey = $state(0);

	const fadeAnimations = [
		{ id: 'fade-in', label: 'Fade In' },
		{ id: 'fade-in-up', label: 'Fade In Up' },
		{ id: 'fade-in-down', label: 'Fade In Down' },
		{ id: 'fade-in-left', label: 'Fade In Left' },
		{ id: 'fade-in-right', label: 'Fade In Right' }
	];

	const zoomAnimations = [
		{ id: 'zoom-in', label: 'Zoom In' },
		{ id: 'zoom-in-up', label: 'Zoom In Up' }
	];

	const bounceAnimations = [
		{ id: 'bounce-in', label: 'Bounce In' },
		{ id: 'bounce-in-up', label: 'Bounce In Up' }
	];

	const revealAnimations = [
		{ id: 'reveal-up', label: 'Reveal Up (with blur)' },
		{ id: 'reveal-scale', label: 'Reveal Scale' }
	];

	const flipAnimations = [
		{ id: 'flip-in-x', label: 'Flip In X' },
		{ id: 'flip-in-y', label: 'Flip In Y' }
	];

	const slideAnimations = [
		{ id: 'slide-up', label: 'Slide Up' },
		{ id: 'slide-down', label: 'Slide Down' },
		{ id: 'slide-left', label: 'Slide Left' },
		{ id: 'slide-right', label: 'Slide Right' }
	];

	const allAnimations = [
		...fadeAnimations,
		...zoomAnimations,
		...bounceAnimations,
		...revealAnimations,
		...flipAnimations,
		...slideAnimations
	];

	function replayAnimation() {
		animationKey++;
	}

	let code = $derived(() => {
		return `<div class="${selectedAnimation}">
	<h1>Animated Content</h1>
	<p>This content appears with animation</p>
</div>`;
	});

	const entranceAnimations = [
		{ utility: 'fade-in', description: 'Simple fade in' },
		{ utility: 'fade-in-up', description: 'Fade in from bottom to top' },
		{ utility: 'fade-in-down', description: 'Fade in from top to bottom' },
		{ utility: 'fade-in-left', description: 'Fade in from left to right' },
		{ utility: 'fade-in-right', description: 'Fade in from right to left' },
		{ utility: 'zoom-in', description: 'Scale up while fading in' },
		{ utility: 'zoom-in-up', description: 'Scale up and translate from bottom' },
		{ utility: 'bounce-in', description: 'Bounce effect with scale' },
		{ utility: 'bounce-in-up', description: 'Bounce up from bottom' },
		{ utility: 'reveal-up', description: 'Elegant reveal with blur effect' },
		{ utility: 'reveal-scale', description: 'Reveal with subtle scale' },
		{ utility: 'flip-in-x', description: '3D flip on X axis' },
		{ utility: 'flip-in-y', description: '3D flip on Y axis' },
		{ utility: 'slide-up', description: 'Slide from bottom (no fade)' },
		{ utility: 'slide-down', description: 'Slide from top (no fade)' },
		{ utility: 'slide-left', description: 'Slide from right (no fade)' },
		{ utility: 'slide-right', description: 'Slide from left (no fade)' }
	];

	const continuousAnimations = [
		{ utility: 'float', description: 'Gentle floating effect' },
		{ utility: 'pulse-soft', description: 'Subtle pulse animation' },
		{ utility: 'wiggle', description: 'Playful wiggle rotation' },
		{ utility: 'glow', description: 'Glowing box-shadow using --primary color' },
		{ utility: 'shake', description: 'Shake effect for attention' }
	];

	const delayUtilities = [
		{ utility: 'delay-0', value: '0ms' },
		{ utility: 'delay-75', value: '75ms' },
		{ utility: 'delay-100', value: '100ms' },
		{ utility: 'delay-150', value: '150ms' },
		{ utility: 'delay-200', value: '200ms' },
		{ utility: 'delay-300', value: '300ms' },
		{ utility: 'delay-400', value: '400ms' },
		{ utility: 'delay-500', value: '500ms' },
		{ utility: 'delay-600', value: '600ms' },
		{ utility: 'delay-700', value: '700ms' },
		{ utility: 'delay-800', value: '800ms' },
		{ utility: 'delay-1000', value: '1000ms' }
	];

	const durationUtilities = [
		{ utility: 'duration-300', value: '300ms' },
		{ utility: 'duration-500', value: '500ms' },
		{ utility: 'duration-700', value: '700ms' },
		{ utility: 'duration-1000', value: '1000ms' }
	];

	const utilityTabs = [
		{ id: 'entrance', label: 'Entrance', content: entranceContent },
		{ id: 'continuous', label: 'Continuous', content: continuousContent },
		{ id: 'modifiers', label: 'Modifiers', content: modifiersContent }
	];
</script>

{#snippet entranceContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Utility</th>
					<th class="text-left p-3 font-semibold">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each entranceAnimations as anim}
					<tr class="border-b border-muted-100">
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{anim.utility}</code></td>
						<td class="p-3 text-sm">{anim.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet continuousContent()}
	<div class="overflow-x-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-muted-200">
					<th class="text-left p-3 font-semibold">Utility</th>
					<th class="text-left p-3 font-semibold">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each continuousAnimations as anim}
					<tr class="border-b border-muted-100">
						<td class="p-3"><code class="px-2 py-1 rounded text-sm">{anim.utility}</code></td>
						<td class="p-3 text-sm">{anim.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/snippet}

{#snippet modifiersContent()}
	<div class="column gap-6">
		<div>
			<h5 class="font-semibold mb-3">Animation Delays</h5>
			<div class="grid-3 md:grid-4 gap-2">
				{#each delayUtilities as delay}
					<div class="p-2 bg-muted/50 rounded text-center">
						<code class="text-xs">{delay.utility}</code>
						<div class="text-xs text-muted-600 mt-1">{delay.value}</div>
					</div>
				{/each}
			</div>
		</div>
		<div>
			<h5 class="font-semibold mb-3">Animation Durations</h5>
			<div class="grid-4 gap-2">
				{#each durationUtilities as dur}
					<div class="p-2 bg-muted/50 rounded text-center">
						<code class="text-xs">{dur.utility}</code>
						<div class="text-xs text-muted-600 mt-1">{dur.value}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/snippet}

<DocsHeader title="Animations" llmUrl="https://ui-svelte.sappsdev.com/llm/starter/animations.md">
	CSS animation utilities for landing pages and content reveals. Add smooth entrance effects,
	continuous animations, and staggered reveals with simple class names.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		{#key animationKey}
			<div
				class="{selectedAnimation} p-8 bg-primary text-on-primary rounded-lg text-center min-h-[200px] center"
			>
				<div>
					<h3 class="text-xl font-bold mb-2">Animated Content</h3>
					<p class="text-sm opacity-90">Click "Replay" to see animation</p>
				</div>
			</div>
		{/key}
	</DocsPreview>
	<Card>
		<Select label="Animation" size="sm" options={allAnimations} bind:value={selectedAnimation} />
		<button
			class="w-full mt-4 px-4 py-2 bg-secondary text-on-secondary rounded-lg hover:opacity-90 transition-opacity"
			onclick={replayAnimation}
		>
			🔄 Replay Animation
		</button>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card>
		<Tabs tabs={utilityTabs} />
	</Card>
</Section>

<!-- Fade Animations Examples -->
<Section>
	<Card>
		{#snippet header()}
			<h4>Fade Animations</h4>
		{/snippet}
		<div class="grid-2 md:grid-5 gap-4">
			{#each fadeAnimations as anim}
				<button
					class="p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-center transition-colors"
					onclick={() => {
						selectedAnimation = anim.id;
						replayAnimation();
					}}
				>
					<div class="{anim.id} p-3 bg-primary text-on-primary rounded mb-2 text-sm">Box</div>
					<code class="text-xs">{anim.id}</code>
				</button>
			{/each}
		</div>
	</Card>
</Section>

<!-- Stagger Example -->
<Section>
	<Card>
		{#snippet header()}
			<h4>Staggered Animations</h4>
			<p class="text-sm text-muted-600">
				Combine animations with delay utilities for stagger effects
			</p>
		{/snippet}
		{#key animationKey}
			<div class="row gap-4 justify-center">
				<div class="fade-in-up delay-0 p-4 bg-primary text-on-primary rounded text-center">
					<div class="text-sm font-medium">delay-0</div>
				</div>
				<div class="fade-in-up delay-100 p-4 bg-primary text-on-primary rounded text-center">
					<div class="text-sm font-medium">delay-100</div>
				</div>
				<div class="fade-in-up delay-200 p-4 bg-primary text-on-primary rounded text-center">
					<div class="text-sm font-medium">delay-200</div>
				</div>
				<div class="fade-in-up delay-300 p-4 bg-primary text-on-primary rounded text-center">
					<div class="text-sm font-medium">delay-300</div>
				</div>
				<div class="fade-in-up delay-400 p-4 bg-primary text-on-primary rounded text-center">
					<div class="text-sm font-medium">delay-400</div>
				</div>
			</div>
		{/key}
		{#snippet footer()}
			<button
				class="px-4 py-2 bg-secondary text-on-secondary rounded hover:opacity-90 transition-opacity"
				onclick={replayAnimation}
			>
				🔄 Replay Stagger
			</button>
		{/snippet}
	</Card>
</Section>

<!-- Continuous Animations -->
<Section>
	<Card>
		{#snippet header()}
			<h4>Continuous Animations</h4>
			<p class="text-sm text-muted-600">Animations that loop infinitely for attention</p>
		{/snippet}
		<div class="grid-2 md:grid-5 gap-4">
			<div class="p-4 text-center">
				<div class="float p-4 bg-primary text-on-primary rounded mb-2 inline-block">🎈</div>
				<div><code class="text-xs">float</code></div>
			</div>
			<div class="p-4 text-center">
				<div class="pulse-soft p-4 bg-secondary text-on-secondary rounded mb-2 inline-block">
					💗
				</div>
				<div><code class="text-xs">pulse-soft</code></div>
			</div>
			<div class="p-4 text-center">
				<div class="wiggle p-4 bg-warning text-on-warning rounded mb-2 inline-block">👋</div>
				<div><code class="text-xs">wiggle</code></div>
			</div>
			<div class="p-4 text-center">
				<div class="glow p-4 bg-primary text-on-primary rounded mb-2 inline-block">✨</div>
				<div><code class="text-xs">glow</code></div>
			</div>
			<div class="p-4 text-center">
				<div class="shake p-4 bg-danger text-on-danger rounded mb-2 inline-block">⚠️</div>
				<div><code class="text-xs">shake</code></div>
			</div>
		</div>
	</Card>
</Section>

<!-- Pro Tips -->
<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Stagger Effects:</strong> Combine animation classes with delay utilities:
					<code class="px-1 py-0.5 bg-blue rounded">fade-in-up delay-100</code>
				</li>
				<li>
					<strong>Duration Control:</strong> Override animation speed with:
					<code class="px-1 py-0.5 bg-blue rounded">fade-in-up duration-700</code>
				</li>
				<li>
					<strong>Hero Sections:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">reveal-up</code> for titles with blur effect
				</li>
				<li>
					<strong>CTAs:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">glow</code> or
					<code class="px-1 py-0.5 bg-blue rounded">pulse-soft</code> to draw attention to buttons
				</li>
				<li>
					<strong>Scroll Reveals:</strong> Use
					<code class="px-1 py-0.5 bg-blue rounded">reveal</code> classes with Intersection Observer JS
				</li>
			</ul>
		</div>
	</Card>
</Section>

<!-- Usage Examples -->
<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
		<Code
			lang="svelte"
			code={`<!-- Simple Entrance Animation -->
<h1 class="fade-in-up">Welcome to our site</h1>

<!-- Staggered List Items -->
<div class="column gap-4">
	<div class="fade-in-up delay-0">First item</div>
	<div class="fade-in-up delay-100">Second item</div>
	<div class="fade-in-up delay-200">Third item</div>
</div>

<!-- Hero Section with Reveal -->
<section>
	<h1 class="reveal-up">Amazing Product</h1>
	<p class="fade-in-up delay-200">Discover what we have to offer</p>
	<button class="bounce-in delay-400">Get Started</button>
</section>

<!-- Floating Decorative Element -->
<div class="float">
	<img src="/hero-image.png" alt="Hero" />
</div>

<!-- Attention-Grabbing CTA -->
<button class="glow">
	Subscribe Now
</button>

<!-- Custom Duration -->
<div class="fade-in-up duration-1000">
	Slower animation (1 second)
</div>`}
		/>
	</Card>
</Section>

<!-- Intersection Observer Example -->
<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Scroll-Based Reveals (JavaScript)</h4>
			<p class="text-sm text-muted-600">
				Use Intersection Observer for scroll-triggered animations
			</p>
		{/snippet}
		<Code
			lang="svelte"
			code={`<script>
	import { onMount } from 'svelte';

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom')
			.forEach((el) => observer.observe(el));
	});
<\/script>

<!-- Elements with reveal classes will animate when scrolled into view -->
<div class="reveal">This fades in from bottom</div>
<div class="reveal-left">This slides in from left</div>
<div class="reveal-right">This slides in from right</div>
<div class="reveal-zoom">This zooms in</div>`}
		/>
	</Card>
</Section>
