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
		BoltCircleLinearIcon,
		Flash24RegularIcon,
		BoxMinimalisticLinearIcon,
		ShieldCheckLinearIcon
	} from '$lib/icons';
	import {
		Chip,
		Section,
		Card,
		Button,
		Icon,
		Code,
		TextField,
		PasswordField,
		Avatar,
		Skeleton,
		Divider
	} from 'ui-svelte';

	const installCode = `bun add ui-svelte`;

	const quickStartCode = `<script>
  import { Button, Card } from 'ui-svelte';
<\/script>

<Card color="primary" variant="soft">
  <h3 class="card-title">Hello UiSvelte!</h3>
  <Button color="primary" variant="solid">Click Me</Button>
</Card>`;

	const categories = [
		{
			name: 'Charts',
			count: 6,
			url: '/docs/charts/bar',
			skeleton: 'charts'
		},
		{
			name: 'Control',
			count: 8,
			url: '/docs/control/button',
			skeleton: 'control'
		},
		{
			name: 'Display',
			count: 23,
			url: '/docs/display/card',
			skeleton: 'display'
		},
		{
			name: 'Form',
			count: 20,
			url: '/docs/form/text-field',
			skeleton: 'form'
		},
		{
			name: 'Layout',
			count: 4,
			url: '/docs/layout/scaffold',
			skeleton: 'layout'
		},
		{
			name: 'Navigation',
			count: 5,
			url: '/docs/navigation/tabs',
			skeleton: 'navigation'
		},
		{
			name: 'Overlay',
			count: 7,
			url: '/docs/overlay/modal',
			skeleton: 'overlay'
		}
	] as const;

	const features = [
		{
			icon: Rocket24RegularIcon,
			color: 'success',
			title: 'Zero Runtime Overhead',
			description: `Components compile to vanilla JS. No virtual DOM, no runtime library. Just pure Svelte 5 performance.`
		},
		{
			icon: Code24RegularIcon,
			color: 'warning',
			title: 'TypeScript Everything',
			description: `Full autocomplete for props like color, variant, size. Catch errors before they happen.`
		},
		{
			icon: SparkleAction24RegularIcon,
			color: 'danger',
			title: 'AI-Ready Documentation',
			description: `Markdown docs in /static/llm/ designed for Claude, GPT, and Cursor. Just paste and build.`
		},
		{
			icon: Settings24RegularIcon,
			color: 'secondary',
			title: 'CSS Variables Only',
			description: `No CSS-in-JS. Customize colors, spacing, radii with standard CSS. Works with any approach.`
		},
		{
			icon: Form24RegularIcon,
			color: 'primary',
			title: '20+ Form Components',
			description: `Text, select, date, color, phone, OTP, rich editor. Built-in validation and accessibility.`
		},
		{
			icon: LayoutColumnOneThirdRight24RegularIcon,
			color: 'info',
			title: 'Complete App Shells',
			description: `Scaffold, Sidebar, AppBar, Footer, Tabs. Build production layouts in minutes, not hours.`
		}
	] as const;

	const whyUiSvelte = [
		{
			icon: Flash24RegularIcon,
			color: 'success',
			title: 'Svelte 5 Native',
			description: 'Built from scratch with $state, $derived, and runes. No legacy code.'
		},
		{
			icon: SparkleAction24RegularIcon,
			color: 'warning',
			title: 'AI-First Docs',
			description: 'Paste /static/llm/*.md into any LLM and generate components instantly.'
		},
		{
			icon: BoltCircleLinearIcon,
			color: 'primary',
			title: '70+ Components',
			description: 'Charts, forms, overlays, navigation, layouts. Everything you need.'
		}
	] as const;

	const codeExample = `<script>
  import { Button, Card, TextField, PasswordField } from 'ui-svelte';
<\/script>

<Card color="muted" variant="solid">
  <h3 class="card-title">Welcome Back</h3>
  <TextField label="Email" type="email" color="muted" variant="soft" />
  <PasswordField label="Password" color="muted" variant="soft" />
  <Button color="primary" variant="solid" isWide>
    Sign In
  </Button>
</Card>`;
</script>

<!-- Hero Section -->
<Section bodyClass="items-center gap-8 text-center px-4 pt-6 md:pt-10 xl:pt-16" isBoxed>
	<div class="fade-in-up">
		<Chip
			startIcon={StarsMinimalisticLinearIcon}
			size="md"
			color="secondary"
			variant="solid"
			class="pulse-soft">Modern UI Component Library</Chip
		>
	</div>

	<h1 class="hero-title fade-in-up">
		Build beautiful web apps
		<span class="grad grad-primary"> faster </span>
		with UiSvelte
	</h1>

	<p class="hero-description fade-in-up max-w-3xl">
		A comprehensive Svelte 5 component library that handles the complexity, so you can focus on
		building great products. Optimized for AI code generation and mobile-first design.
	</p>

	<div class="row gap-4 flex-wrap justify-center fade-in-up">
		<Button color="secondary" variant="solid" size="lg" href="/docs/starter/install">
			Get Started
		</Button>
		<Button color="primary" variant="solid" size="lg" href="/docs/display/card">
			Browse Components
		</Button>
	</div>

	<div class="row gap-6 md:gap-10 flex-wrap justify-center fade-in-up">
		<div class="row gap-2 items-center">
			<Icon icon={Code24RegularIcon} class="text-info" />
			<span class="text-sm font-medium">100% TypeScript</span>
		</div>
		<div class="row gap-2 items-center">
			<Icon icon={ShieldCheckLinearIcon} class="text-success" />
			<span class="text-sm font-medium">MIT License</span>
		</div>
		<div class="row gap-2 items-center">
			<Icon icon={BoxMinimalisticLinearIcon} class="text-secondary" />
			<span class="text-sm font-medium">Lightweight Bundle</span>
		</div>
	</div>

	<p class="text-sm opacity-60 fade-in-up">Open source • Powered by SappsDev</p>
</Section>

<Section isBoxed bodyClass="gap-10 py-20 center" color="muted" variant="soft">
	<div class="column gap-2 text-center">
		<h2 class="section-title">Why UiSvelte?</h2>
		<p class="section-subtitle opacity-70 max-w-2xl">
			Built different from traditional component libraries
		</p>
	</div>
	<div class="grid-1 md:grid-3 gap-8 w-full max-w-5xl">
		{#each whyUiSvelte as { icon, color, title, description }, i}
			<Card
				color="surface"
				variant="soft"
				rootClass="fade-in-up delay-{i * 100}"
				bodyClass="center gap-4 relative"
			>
				<div class="p-4 rounded-full bg-{color}/10">
					<Icon {icon} class="text-{color} w-8 h-8" />
				</div>
				<h3 class="card-title">{title}</h3>
				<p class="card-description text-center opacity-70">{description}</p>
			</Card>
		{/each}
	</div>
</Section>

<Section isBoxed bodyClass="gap-12 py-28 center">
	<div class="column gap-2 text-center">
		<h2 class="section-title">Key Features</h2>
		<p class="section-subtitle opacity-70">Everything you need to build modern web applications</p>
	</div>
	<div class="grid-1 md:grid-3 gap-6">
		{#each features as { icon, color, title, description }, i}
			<Card
				color="muted"
				variant="soft"
				rootClass="hover:-translate-y-2 transition-all duration-300 fade-in-up delay-{i * 100}"
				headerClass="justify-start"
				bodyClass="center gap-4 relative"
			>
				<Avatar size="xl" {icon} {color} class="w-16 h-16" />
				<h3 class="card-title">{title}</h3>
				<p class="card-description">{description}</p>
			</Card>
		{/each}
	</div>
</Section>

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
			color="surface"
			variant="solid"
			rootClass="fade-in-up delay-200"
			bodyClass="center gap-4 h-full"
		>
			<h3 class="card-title">Welcome Back</h3>
			<div class="column gap-3 w-full max-w-xs">
				<TextField
					label="Email"
					placeholder="you@example.com"
					type="email"
					color="muted"
					variant="soft"
				/>
				<PasswordField label="Password" placeholder="••••••••" color="muted" variant="soft" />
				<Button color="primary" variant="solid" isWide>Sign In</Button>
			</div>
		</Card>
	</div>
</Section>

<Section isBoxed bodyClass="gap-12 py-28 center">
	<div class="row w-full justify-between items-end">
		<div class="column gap-2">
			<h2 class="section-title">Components</h2>
			<p class="section-subtitle opacity-70">
				The building blocks used to create pages and sections.
			</p>
		</div>
		<p class="text-sm opacity-60">Total 70 components</p>
	</div>
	<div class="grid-2 md:grid-3 lg:grid-4 gap-6 w-full">
		{#each categories as { name, count, url, skeleton }, i}
			<a href={url} class="no-underline">
				<Card
					color="surface"
					variant="solid"
					rootClass="hover:-translate-y-1 transition-all duration-300 fade-in-up delay-{i * 50}"
					bodyClass="center gap-4 p-6 min-h-40"
				>
					<div class="w-full h-24 center">
						{#if skeleton === 'charts'}
							<div class="row items-end gap-1 w-full h-16">
								<Skeleton variant="rounded" width="16%" height="40%" />
								<Skeleton variant="rounded" width="16%" height="70%" />
								<Skeleton variant="rounded" width="16%" height="55%" />
								<Skeleton variant="rounded" width="16%" height="85%" />
								<Skeleton variant="rounded" width="16%" height="45%" />
								<Skeleton variant="rounded" width="16%" height="65%" />
							</div>
						{:else if skeleton === 'control'}
							<div class="column gap-3 w-full items-center">
								<Skeleton variant="rounded" width="70%" height="28px" />
								<div class="row gap-3">
									<Skeleton variant="circular" width="24px" height="24px" />
									<Skeleton variant="rounded" width="40px" height="20px" />
								</div>
							</div>
						{:else if skeleton === 'display'}
							<div class="column gap-3 w-full p-3 border border-muted rounded-lg">
								<Skeleton variant="rounded" width="100%" height="40px" />
								<div class="column gap-2">
									<Skeleton variant="text" width="70%" height="10px" />
									<Skeleton variant="text" width="90%" height="8px" />
								</div>
							</div>
						{:else if skeleton === 'form'}
							<div class="column gap-3 w-full">
								<div class="column gap-1">
									<Skeleton variant="text" width="30%" height="8px" />
									<Skeleton variant="rounded" width="100%" height="24px" />
								</div>
								<div class="column gap-1">
									<Skeleton variant="text" width="25%" height="8px" />
									<Skeleton variant="rounded" width="100%" height="24px" />
								</div>
							</div>
						{:else if skeleton === 'layout'}
							<div class="row gap-2 w-full h-16">
								<Skeleton variant="rounded" width="25%" height="100%" />
								<div class="column gap-2 flex-1">
									<Skeleton variant="rounded" width="100%" height="20%" />
									<Skeleton variant="rounded" width="100%" height="80%" />
								</div>
							</div>
						{:else if skeleton === 'navigation'}
							<div class="column gap-3 w-full">
								<div class="row gap-2 justify-center">
									<Skeleton variant="rounded" width="50px" height="20px" />
									<Skeleton variant="rounded" width="50px" height="20px" />
									<Skeleton variant="rounded" width="50px" height="20px" />
								</div>
								<Skeleton variant="text" width="100%" height="2px" />
							</div>
						{:else if skeleton === 'overlay'}
							<div class="column gap-3 w-full p-3 border border-muted rounded-lg relative">
								<div class="row justify-between items-center">
									<Skeleton variant="text" width="50%" height="12px" />
									<Skeleton variant="text" width="10px" height="10px" class="opacity-50" />
								</div>
								<Skeleton variant="text" width="80%" height="8px" />
								<div class="row gap-2 justify-end">
									<Skeleton variant="rounded" width="40px" height="16px" />
									<Skeleton variant="rounded" width="40px" height="16px" />
								</div>
							</div>
						{/if}
					</div>
				</Card>
				<div class="text-center mt-3">
					<p class="text-sm font-medium">{name}</p>
					<p class="text-xs opacity-60">{count} component{count > 1 ? 's' : ''}</p>
				</div>
			</a>
		{/each}
	</div>
</Section>

<Section isBoxed bodyClass="gap-10 py-24 center" color="muted" variant="soft">
	<div class="column gap-2 text-center">
		<h2 class="section-title">Get Started in 60 Seconds</h2>
		<p class="section-subtitle opacity-70">Copy, paste, and you're ready to build</p>
	</div>
	<div class="column gap-6 w-full max-w-2xl">
		<div class="column gap-2">
			<p class="text-sm font-medium opacity-80">1. Install the package</p>
			<Code code={installCode} lang="bash" />
		</div>
		<div class="column gap-2">
			<p class="text-sm font-medium opacity-80">2. Use components</p>
			<Code code={quickStartCode} lang="svelte" />
		</div>
	</div>
	<Button color="primary" variant="solid" size="lg" href="/docs/starter/install">
		Full Installation Guide →
	</Button>
</Section>

<Section color="primary" variant="solid" bodyClass="center gap-6 py-24 text-center" isBoxed>
	<h2 class="cta-title">Ready to Build Something Amazing?</h2>
	<p class="cta-subtitle opacity-80 max-w-xl">
		Join developers shipping faster with UiSvelte. Start building beautiful apps today.
	</p>
	<div class="row gap-4 flex-wrap justify-center">
		<Button color="secondary" variant="solid" size="lg" href="/docs/starter/install">
			Get Started Free
		</Button>
		<Button
			color="secondary"
			variant="soft"
			size="lg"
			href="https://github.com/sappsdev/ui-svelte"
			startIcon={GithubIconIcon}
		>
			Star on GitHub
		</Button>
	</div>
</Section>
