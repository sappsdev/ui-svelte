<script lang="ts">
	import {
		StarsMinimalisticLinearIcon,
		Rocket24RegularIcon,
		SparkleAction24RegularIcon,
		Code24RegularIcon,
		Settings24RegularIcon,
		Form24RegularIcon,
		LayoutColumnOneThirdRight24RegularIcon,
		GithubIconIcon,
		CheckmarkCircle24RegularIcon,
		BoltCircleLinearIcon,
		Flash24RegularIcon
	} from '$lib/icons';
	import { Chip, Section, Card, Button, Icon, Code, TextField, PasswordField } from 'ui-svelte';

	const features = [
		{
			icon: Rocket24RegularIcon,
			color: 'success',
			title: 'Lightning Fast',
			description: `Optimized components that don't sacrifice performance. Built with Svelte 5 for maximum speed.`
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
				'Documentation structured for AI code generation. Build faster with Claude, GPT, and more.',
			badge: 'Most Popular'
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

	const whyUiSvelte = [
		{
			icon: Flash24RegularIcon,
			title: 'Svelte 5 Native',
			description: 'Built from the ground up with runes and the latest Svelte 5 features.'
		},
		{
			icon: SparkleAction24RegularIcon,
			title: 'AI-Ready Docs',
			description: 'LLM-optimized documentation for seamless AI code generation workflows.'
		},
		{
			icon: BoltCircleLinearIcon,
			title: '60+ Components',
			description: 'Production-ready components for forms, layouts, overlays, and more.'
		}
	] as const;

	const codeExample = `<script>
  import { Button, Card, TextField } from 'ui-svelte';
<\/script>

<Card color="primary" variant="soft">
  <h3 class="card-title">Welcome Back</h3>
  <TextField label="Email" type="email" />
  <TextField label="Password" type="password" />
  <Button color="primary" variant="solid">
    Sign In
  </Button>
</Card>`;
</script>

<!-- Hero Section -->
<Section bodyClass="items-center gap-6 text-center px-4 pt-6 md:pt-10 xl:pt-16" isBoxed>
	<div class="fade-in-up">
		<Chip startIcon={StarsMinimalisticLinearIcon} size="md" class="pulse-soft"
			>Modern UI Component Library</Chip
		>
	</div>

	<h1 class="hero-title fade-in-up delay-100">
		Build beautiful web apps
		<span class="grad grad-primary"> faster </span>
		with UiSvelte
	</h1>

	<p class="hero-subtitle fade-in-up delay-200">
		A comprehensive Svelte 5 component library that handles the complexity, so you can focus on
		building great products. Optimized for AI code generation and mobile-first design.
	</p>

	<div class="row gap-4 flex-wrap justify-center fade-in-up delay-300">
		<Button color="primary" variant="solid" size="lg" href="/docs/starter/install">
			Install UiSvelte
		</Button>
		<Button color="muted" variant="soft" size="lg" href="/docs/display/card">
			Browse Components
		</Button>
	</div>

	<p class="text-sm opacity-70 fade-in-up delay-400">Open source • Powered by SappsDev</p>
</Section>

<!-- Social Proof Section -->
<Section isBoxed bodyClass="center gap-4 py-8">
	<div class="row gap-4 flex-wrap justify-center fade-in-up delay-500">
		<Chip color="muted" variant="outlined" size="md" startIcon={GithubIconIcon}>Open Source</Chip>
		<Chip color="muted" variant="outlined" size="md" startIcon={Code24RegularIcon}>
			60+ Components
		</Chip>
		<Chip color="success" variant="soft" size="md" startIcon={CheckmarkCircle24RegularIcon}>
			Svelte 5 Ready
		</Chip>
		<Chip color="primary" variant="outlined" size="md">v1.0 Stable</Chip>
	</div>
</Section>

<!-- Key Features Section -->
<Section isBoxed bodyClass="gap-12 py-28 center">
	<div class="column gap-2 text-center">
		<h2 class="section-title">Key Features</h2>
		<p class="section-subtitle opacity-70">Everything you need to build modern web applications</p>
	</div>
	<div class="grid-1 md:grid-3 gap-6">
		{#each features as { icon, color, title, description }, i}
			<Card
				{color}
				variant="solid"
				rootClass="hover:-translate-y-2 transition-all duration-300 bd-glow bd-glow-{color} fade-in-up delay-{i *
					100}"
				headerClass="justify-start"
				bodyClass="center gap-4 relative"
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

<!-- See it in Action Section -->
<Section isBoxed bodyClass="gap-12 py-28 center" color="muted" variant="soft">
	<div class="column gap-2 text-center">
		<h2 class="section-title">See it in Action</h2>
		<p class="section-subtitle opacity-70">
			Clean, intuitive API that just works — copy, paste, and customize
		</p>
	</div>

	<div class="grid-1 lg:grid-2 gap-8 w-full max-w-5xl items-stretch">
		<div class="fade-in-up">
			<Code code={codeExample} lang="svelte" />
		</div>
		<Card
			color="primary"
			variant="soft"
			rootClass="fade-in-up delay-200"
			bodyClass="center gap-4 h-full"
		>
			<h3 class="card-title">Welcome Back</h3>
			<div class="column gap-3 w-full max-w-xs">
				<TextField label="Email" placeholder="you@example.com" type="email" />
				<PasswordField label="Password" placeholder="••••••••" />
				<Button color="primary" variant="solid">Sign In</Button>
			</div>
		</Card>
	</div>
</Section>

<!-- Why UiSvelte Section -->
<Section isBoxed bodyClass="gap-12 py-28 center">
	<div class="column gap-2 text-center">
		<h2 class="section-title">Why Choose UiSvelte?</h2>
		<p class="section-subtitle opacity-70">Built for modern Svelte development</p>
	</div>

	<div class="grid-1 md:grid-3 gap-6 w-full">
		{#each whyUiSvelte as { icon, title, description }, i}
			<Card
				variant="outlined"
				rootClass="fade-in-up delay-{i * 100}"
				bodyClass="center gap-4 text-center"
			>
				<Icon {icon} class="w-10 h-10 text-primary" />
				<h3 class="font-bold text-lg">{title}</h3>
				<p class="card-description">{description}</p>
			</Card>
		{/each}
	</div>
</Section>

<!-- Final CTA Section -->
<Section bodyClass="items-center gap-6 text-center px-4 py-28" color="primary" variant="soft">
	<Chip color="success" variant="solid" size="sm">v1.0 Stable Release</Chip>
	<h2 class="section-title max-w-2xl">Ready to build something amazing?</h2>
	<p class="text-lg opacity-80 max-w-2xl">
		Join the growing community of developers building faster, better web applications with UiSvelte.
	</p>
	<div class="row gap-4 flex-wrap justify-center">
		<Button color="primary" size="lg" href="/docs/starter/install" variant="solid"
			>Install UiSvelte</Button
		>
		<Button
			color="muted"
			variant="outlined"
			size="lg"
			href="https://github.com/sappsdev/ui-svelte"
			startIcon={GithubIconIcon}
		>
			View on GitHub
		</Button>
	</div>
</Section>
