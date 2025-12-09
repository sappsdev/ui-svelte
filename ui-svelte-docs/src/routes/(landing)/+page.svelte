<script lang="ts">
	import {
		StarsMinimalisticLinearIcon,
		Rocket24RegularIcon,
		SparkleAction24RegularIcon,
		Code24RegularIcon
	} from '$lib/icons';
	import { Chip, Section, Card, Button, Icon } from 'ui-svelte';

	// Configuración de features
	const features = [
		{
			icon: Rocket24RegularIcon,
			variant: 'success',
			title: 'Lightning Fast',
			description: `Optimized components that don't sacrifice performance. Built with Svelte for maximum speed.`
		},
		{
			icon: Code24RegularIcon,
			variant: 'warning',
			title: 'Developer First',
			description: `Intuitive API, excellent TypeScript support, and semantic component names you'll remember.`
		},
		{
			icon: SparkleAction24RegularIcon,
			variant: 'danger',
			title: 'AI-Optimized',
			description:
				'Documentation structured for AI code generation. Build faster with Claude, GPT, and more.'
		}
	] as const;

	// Configuración de CTAs
	const ctas = [
		{
			label: 'Get Started',
			href: '/docs/starter/install',
			variant: 'secondary',
			isSolid: true
		},
		{
			label: 'View Components',
			href: '/docs/display/card',
			variant: 'outlined',
			isSolid: false
		}
	] as const;
</script>

<!-- Hero Section -->
<Section bodyClass="items-center gap-6 text-center px-4 pt-6 md:pt-10 xl:pt-16">
	<Chip startIcon={StarsMinimalisticLinearIcon} size="md" isSolid>Modern UI Component Library</Chip>

	<h1 class="hero-title max-w-4xl">
		Build beautiful web apps
		<span class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
			faster
		</span>
		with UiSvelte
	</h1>

	<p class="hero-subtitle max-w-2xl">
		A comprehensive Svelte component library that handles the complexity, so you can focus on
		building great products. Optimized for AI code generation and mobile-first design.
	</p>

	<div class="row gap-4 flex-wrap justify-center">
		{#each ctas as { label, href, variant, isSolid }}
			<Button {variant} size="lg" {href} {isSolid}>
				{label}
			</Button>
		{/each}
	</div>

	<p class="text-sm opacity-70">Open source</p>
</Section>

<!-- Features Section -->
<Section isBoxed bodyClass="gap-12 py-20">
	<div class="grid-1 md:grid-3 gap-6">
		{#each features as { icon, variant, title, description }}
			<Card
				{variant}
				hasShadow
				class="hover:-translate-y-2 transition-transform duration-300"
				bodyClass="center gap-4 text-center"
			>
				<div class="size-16 row center rounded-ui">
					<Icon {icon} class="w-12 h-12" />
				</div>
				<h3 class="text-xl font-semibold">{title}</h3>
				<p class="opacity-80">{description}</p>
			</Card>
		{/each}
	</div>
</Section>
