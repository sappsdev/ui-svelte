<script lang="ts">
	import {
		StarsMinimalisticLinearIcon,
		Rocket24RegularIcon,
		SparkleAction24RegularIcon,
		Code24RegularIcon,
		Settings24RegularIcon,
		Form24RegularIcon,
		LayoutColumnOneThirdRight24RegularIcon
	} from '$lib/icons';
	import { Chip, Section, Card, Button, Icon, Accordion } from 'ui-svelte';

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
		},
		{
			icon: Settings24RegularIcon,
			variant: 'secondary',
			title: 'Fully Customizable',
			description: `Built on top of Tailwind CSS. Easily customize themes, colors, and styles to match your brand.`
		},
		{
			icon: Form24RegularIcon,
			variant: 'primary',
			title: 'Robust Forms',
			description: `Complete set of form components with built-in validation, accessibility, and keyboard support.`
		},
		{
			icon: LayoutColumnOneThirdRight24RegularIcon,
			variant: 'secondary',
			title: 'Modern Layouts',
			description: `Flexible layout components like Split, Grid, and Stack to build complex responsive interfaces.`
		}
	] as const;

	const faqItems = [
		{
			id: '1',
			label: 'Is it compatible with Svelte 5?',
			content:
				'Yes, ui-svelte is built specifically for Svelte 5 to take advantage of the latest performance improvements and features like runes.'
		},
		{
			id: '2',
			label: 'Can I use it with Tailwind CSS?',
			content:
				'Absolutely. ui-svelte is built on top of Tailwind CSS, making it incredibly easy to customize and extend using utility classes.'
		},
		{
			id: '3',
			label: 'Is it accessible?',
			content:
				' Accessibility is a top priority. All components follow WAI-ARIA best practices and are tested for keyboard navigation and screen reader support.'
		}
	];

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

	<p class="text-sm opacity-70">Open source • Powered by SappsDes</p>
</Section>

<Section isBoxed bodyClass="gap-12 py-20 center">
	<h2 class="text-3xl md:text-4xl font-bold">Key Features</h2>
	<div class="grid-1 md:grid-3 gap-6">
		{#each features as { icon, variant, title, description }}
			<Card
				{variant}
				rootClass="hover:-translate-y-2 transition-transform duration-300"
				headerClass="justify-start"
				bodyClass="center gap-4"
			>
				{#snippet header()}
					<Icon {icon} class="w-12 h-12" />
					<h3>{title}</h3>
				{/snippet}
				<p class="opacity-80">{description}</p>
			</Card>
		{/each}
	</div>
</Section>

<Section bodyClass="items-center gap-6 text-center px-4 py-20">
	<h2 class="text-3xl md:text-4xl font-bold max-w-2xl">Ready to build something amazing?</h2>
	<p class="text-lg opacity-80 max-w-2xl">
		Join the growing community of developers building faster, better web applications with UiSvelte.
	</p>
	<div class="row gap-4 flex-wrap justify-center">
		<Button variant="primary" size="lg" href="/docs/starter/install" isSolid>Get Started</Button>
		<Button variant="secondary" size="lg" href="https://github.com/sappsdev/ui-svelte">
			View on GitHub
		</Button>
	</div>
</Section>
