<script lang="ts">
	import { Section, Card, Button, Chip, AppBar, IconButton, Item, ToggleTheme } from 'ui-svelte';
	import {
		Rocket24RegularIcon,
		Shield24RegularIcon,
		Flash24RegularIcon,
		Code24RegularIcon,
		BoxMinimalisticLinearIcon,
		GlobalLinearIcon,
		GithubIconIcon,
		Settings24RegularIcon,
		Heart24RegularIcon
	} from '$lib/icons';

	const features = [
		{
			icon: Flash24RegularIcon,
			title: 'Lightning Fast',
			description:
				'Built on Electrobun with Bun runtime for exceptional startup times and minimal memory footprint.',
			color: 'warning' as const
		},
		{
			icon: Shield24RegularIcon,
			title: 'Secure by Default',
			description:
				'Native security features with sandboxed processes and secure IPC communication.',
			color: 'success' as const
		},
		{
			icon: Code24RegularIcon,
			title: 'Web Technologies',
			description:
				'Build with familiar tools - Svelte, TypeScript, CSS. Hot reload during development.',
			color: 'info' as const
		},
		{
			icon: BoxMinimalisticLinearIcon,
			title: 'Tiny Bundle Size',
			description: 'Ship your app in a minimal package. No heavy runtime dependencies required.',
			color: 'secondary' as const
		},
		{
			icon: GlobalLinearIcon,
			title: 'Cross Platform',
			description: 'Build once, deploy everywhere. Supports macOS, Windows, and Linux.',
			color: 'primary' as const
		},
		{
			icon: Rocket24RegularIcon,
			title: 'Easy Distribution',
			description: 'Simple build process with automatic code signing and update mechanisms.',
			color: 'danger' as const
		}
	];
</script>

<!-- AppBar -->
<AppBar isBlurred isSticky borderOnScrollOnly>
	{#snippet start()}
		<div class="row items-center gap-3">
			<div class="app-logo">
				<h1 class="display-sm">UiSvelte</h1>
			</div>
			<Chip size="xs" color="success" variant="soft">Desktop</Chip>
		</div>
	{/snippet}
	{#snippet end()}
		<div class="row items-center gap-2">
			<ToggleTheme size="sm" />
			<IconButton
				icon={GithubIconIcon}
				variant="ghost"
				color="secondary"
				href="https://github.com"
				target="_blank"
			/>
			<IconButton icon={Settings24RegularIcon} variant="ghost" color="secondary" />
		</div>
	{/snippet}
</AppBar>

<!-- Hero Section -->
<Section rootClass="hero-section" bodyClass="column items-center text-center gap-8">
	<div class="hero-badge">
		<Chip color="primary" variant="soft" size="sm">✨ Powered by Electrobun + Bun</Chip>
	</div>

	<div class="column items-center gap-4">
		<h1 class="hero-title">
			Build <span class="text-gradient">beautiful</span> desktop apps<br />
			with <span class="text-gradient">ui-svelte</span>
		</h1>
		<p class="hero-subtitle prose-normal">
			A modern desktop application framework combining the power of ui-svelte components with
			Electrobun's native performance. Create stunning, cross-platform apps in minutes.
		</p>
	</div>

	<div class="row items-center gap-4 flex-wrap justify-center">
		<Button size="lg" startIcon={Rocket24RegularIcon}>Get Started</Button>
		<Button size="lg" variant="outlined" color="secondary" startIcon={GithubIconIcon}>
			View on GitHub
		</Button>
	</div>

	<div class="tech-stack row items-center gap-3 flex-wrap justify-center">
		<Chip variant="outlined" color="muted" size="sm">Svelte 5</Chip>
		<Chip variant="outlined" color="muted" size="sm">TypeScript</Chip>
		<Chip variant="outlined" color="muted" size="sm">Electrobun</Chip>
		<Chip variant="outlined" color="muted" size="sm">Bun</Chip>
	</div>
</Section>

<!-- Features Section -->
<Section color="surface" variant="soft" isBoxed bodyClass="column gap-8">
	<div class="text-center column gap-3">
		<p class="subheading text-primary">FEATURES</p>
		<h2 class="section-title">Everything you need to build desktop apps</h2>
		<p class="section-description prose-normal mx-auto">
			Combine the flexibility of web technologies with native desktop performance
		</p>
	</div>

	<div class="grid-3 gap-6">
		{#each features as feature}
			<Card variant="ghost" rootClass="feature-card">
				<div class="feature-icon-wrapper" data-color={feature.color}>
					<IconButton icon={feature.icon} variant="soft" color={feature.color} size="lg" />
				</div>
				<h3 class="feature-title">{feature.title}</h3>
				<p class="feature-description">{feature.description}</p>
			</Card>
		{/each}
	</div>
</Section>

<!-- Components Section -->
<Section isBoxed bodyClass="column gap-8">
	<div class="text-center column gap-3">
		<p class="subheading text-primary">COMPONENTS</p>
		<h2 class="section-title">Rich UI component library</h2>
		<p class="section-description prose-normal mx-auto">
			Pre-built, accessible components styled for desktop applications
		</p>
	</div>

	<div class="grid-2 gap-6">
		<Card>
			{#snippet header()}
				<h4 class="card-title">Display Components</h4>
			{/snippet}
			<div class="column gap-2">
				<Item
					label="Card"
					description="Container for grouping content"
					icon={BoxMinimalisticLinearIcon}
				/>
				<Item label="Chip" description="Compact labels and tags" icon={BoxMinimalisticLinearIcon} />
				<Item label="Badge" description="Status indicators" icon={BoxMinimalisticLinearIcon} />
			</div>
		</Card>

		<Card>
			{#snippet header()}
				<h4 class="card-title">Control Components</h4>
			{/snippet}
			<div class="column gap-2">
				<Item label="Button" description="Interactive action elements" icon={Rocket24RegularIcon} />
				<Item label="IconButton" description="Compact icon actions" icon={Settings24RegularIcon} />
				<Item label="Toggle" description="Switch controls" icon={Flash24RegularIcon} />
			</div>
		</Card>
	</div>
</Section>

<!-- CTA Section -->
<Section color="primary" variant="solid" bodyClass="text-center column gap-6 items-center">
	<h2 class="cta-title text-on-primary">Ready to build your desktop app?</h2>
	<p class="body-lg text-on-primary opacity-90">
		Start building beautiful, performant desktop applications today.
	</p>
	<div class="row gap-4">
		<Button color="secondary" size="lg" startIcon={Rocket24RegularIcon}>Create New Project</Button>
		<Button variant="outlined" color="secondary" size="lg">Read Documentation</Button>
	</div>
</Section>

<!-- Footer -->
<Section color="surface" variant="soft" bodyClass="row justify-between items-center py-4">
	<p class="body-sm text-on-muted">
		Built with <IconButton
			icon={Heart24RegularIcon}
			size="xs"
			variant="ghost"
			color="danger"
			class="inline-flex"
		/> using ui-svelte
	</p>
	<div class="row gap-4">
		<Button variant="ghost" color="muted" size="sm">Documentation</Button>
		<Button variant="ghost" color="muted" size="sm">Components</Button>
		<Button variant="ghost" color="muted" size="sm">GitHub</Button>
	</div>
</Section>

<style>
	:global(body) {
		overflow-x: hidden;
	}

	.app-logo {
		display: flex;
		align-items: center;
		gap: 0.125rem;
		font-weight: 700;
		font-size: 1.25rem;
	}

	.hero-badge {
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	.text-gradient {
		background: linear-gradient(
			135deg,
			var(--primary) 0%,
			oklch(from var(--primary) calc(l + 0.1) c calc(h + 30)) 100%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.feature-icon-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.mx-auto {
		margin-inline: auto;
	}

	.text-on-primary {
		color: var(--on-primary);
	}

	.opacity-90 {
		opacity: 0.9;
	}

	:global(.inline-flex) {
		display: inline-flex;
		vertical-align: middle;
	}
</style>
