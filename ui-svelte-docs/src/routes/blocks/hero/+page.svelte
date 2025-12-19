<script lang="ts">
	import { Section, Button, Chip, Card } from 'ui-svelte';
	import {
		ArrowRightLinearIcon,
		GithubIconIcon,
		Rocket24RegularIcon,
		SparkleAction24RegularIcon
	} from '$lib/icons';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
</script>

<DocsHeader title="Hero Blocks">
	Collection of hero sections designed for landing pages and marketing sites.
</DocsHeader>

<!-- 1. Simple Centered Hero -->
<Section isBoxed rootClass="text-center">
	<div class="flex flex-col items-center gap-6 max-w-3xl mx-auto">
		<Chip variant="soft" color="primary" size="lg">New v2.0 Released</Chip>

		<h1 class="hero-title text-balance">
			Build faster with <span class="text-primary">UI Svelte</span>
		</h1>

		<p class="hero-description text-pretty">
			A complete component library for building modern web applications. Accessible, customizable,
			and ready for production.
		</p>

		<div class="flex flex-wrap items-center justify-center gap-4">
			<Button size="lg" color="primary" endIcon={ArrowRightLinearIcon}>Get Started</Button>
			<Button size="lg" variant="outlined" startIcon={GithubIconIcon}>View on GitHub</Button>
		</div>

		<p class="caption-lg text-muted">Free and open source under MIT License</p>
	</div>
</Section>

<!-- 2. Rich Text & Gradient Hero -->
<Section color="surface" variant="soft" isBoxed>
	<div class="grid md:grid-cols-2 gap-12 items-center">
		<div class="flex flex-col gap-6">
			<h1 class="hero-title text-balance">
				Create <span class="grad grad-primary">stunning</span> user interfaces
			</h1>

			<p class="hero-description">
				Leverage the power of <span class="mark mark-secondary">rich typography</span> and
				<span class="underline decoration-primary/30 decoration-wavy">advanced components</span>
				to build your next masterpiece.
			</p>

			<div class="flex flex-wrap gap-4">
				<Button size="lg" color="primary" startIcon={Rocket24RegularIcon}>Launch Project</Button>
				<Button size="lg" variant="ghost">Read Documentation</Button>
			</div>

			<div class="flex items-center gap-4 mt-4">
				<div class="flex -space-x-3">
					{#each [1, 2, 3, 4] as i}
						<div
							class="w-10 h-10 rounded-full bg-muted border-2 border-surface flex items-center justify-center text-xs font-bold"
						>
							User
						</div>
					{/each}
				</div>
				<p class="label-md text-muted">Trusted by 1000+ developers</p>
			</div>
		</div>

		<Card rootClass="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
			<div class="p-8 flex flex-col items-center justify-center min-h-[400px] text-center gap-4">
				<div
					class="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"
				></div>
				<h3 class="heading-lg">Interactive Demo</h3>
				<p class="body-md">Visual placeholder for dashboard or app preview</p>
			</div>
		</Card>
	</div>
</Section>

<!-- 3. Cover Image Hero -->
<Section
	cover="/images/img-1.jpeg"
	variant="solid"
	rootClass="min-h-[600px] flex items-center"
	overlayClass="bg-gradient-to-r from-black/80 via-black/50 to-transparent"
>
	<div class="max-w-2xl text-white">
		<div class="mb-6 flex gap-2">
			<Chip color="warning" variant="solid">Featured</Chip>
			<Chip color="surface" variant="ghost" class="text-white border-white/20">Design System</Chip>
		</div>

		<h1 class="hero-title mb-6">Design without limits</h1>

		<p class="hero-description text-white/90 mb-8 max-w-xl">
			Experience the freedom of a fully customizable design system. Colors, typography, and spacing
			that work in harmony.
		</p>

		<div class="flex flex-wrap gap-4">
			<Button size="lg" color="white" class="text-black hover:bg-white/90">Explore Now</Button>
			<Button size="lg" variant="outlined" class="text-white border-white hover:bg-white/10">
				Learn More
			</Button>
		</div>
	</div>
</Section>
