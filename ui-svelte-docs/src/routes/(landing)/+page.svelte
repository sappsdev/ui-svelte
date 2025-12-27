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
	import { Chip, Section, Card, Button, Icon } from 'ui-svelte';

	const features = [
		{
			icon: Rocket24RegularIcon,
			color: 'success',
			title: 'Lightning Fast',
			description: `Optimized components that don't sacrifice performance. Built with Svelte for maximum speed.`
		},
		{
			icon: Code24RegularIcon,
			color: 'warning',
			title: 'Developer First',
			description: `Intuitive API, excellent TypeScript support, and semantic component names you'll remember.`
		},
		{
			icon: SparkleAction24RegularIcon,
			color: 'danger',
			title: 'AI-Optimized',
			description:
				'Documentation structured for AI code generation. Build faster with Claude, GPT, and more.'
		},
		{
			icon: Settings24RegularIcon,
			color: 'secondary',
			title: 'Fully Customizable',
			description: `Built on top of Tailwind CSS. Easily customize themes, colors, and styles to match your brand.`
		},
		{
			icon: Form24RegularIcon,
			color: 'primary',
			title: 'Robust Forms',
			description: `Complete set of form components with built-in validation, accessibility, and keyboard support.`
		},
		{
			icon: LayoutColumnOneThirdRight24RegularIcon,
			color: 'secondary',
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
			color: 'muted',
			isSolid: true
		},
		{
			label: 'View Components',
			href: '/docs/display/card',
			color: 'primary',
			isSolid: false
		}
	] as const;
</script>

<Section bodyClass="items-center gap-6 text-center px-4 pt-6 md:pt-10 xl:pt-16" isBoxed>
	<Chip startIcon={StarsMinimalisticLinearIcon} size="md" isSolid>Modern UI Component Library</Chip>

	<h1 class="hero-title">
		Build beautiful web apps
		<span class="grad"> faster </span>
		with UiSvelte
	</h1>

	<p class="hero-subtitle">
		A comprehensive Svelte component library that handles the complexity, so you can focus on
		building great products. Optimized for AI code generation and mobile-first design.
	</p>

	<div class="row gap-4 flex-wrap justify-center">
		{#each ctas as { label, href, color }}
			<Button {color} variant="solid" size="lg" {href}>
				{label}
			</Button>
		{/each}
	</div>

	<p class="text-sm">Open source • Powered by SappsDev</p>
</Section>

<Section isBoxed bodyClass="gap-12 py-20 center">
	<h2 class="text-3xl md:text-4xl font-bold">Key Features</h2>
	<div class="grid-1 md:grid-3 gap-6">
		{#each features as { icon, color, title, description }}
			<Card
				{color}
				variant="solid"
				rootClass="hover:-translate-y-2 transition-transform duration-300"
				headerClass="justify-start"
				bodyClass="center gap-4"
			>
				{#snippet header()}
					<Icon {icon} class="w-12 h-12" />
					<h3 class="card-title">{title}</h3>
				{/snippet}
				<p class="card-description">{description}</p>
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
		<Button color="primary" size="lg" href="/docs/starter/install" variant="solid"
			>Get Started</Button
		>
		<Button color="secondary" size="lg" href="https://github.com/sappsdev/ui-svelte">
			View on GitHub
		</Button>
	</div>
</Section>
