<script lang="ts">
	import {
		StarsMinimalisticLinearIcon,
		Rocket24RegularIcon,
		SparkleAction24RegularIcon,
		Code24RegularIcon
	} from '$lib/icons';
	import { Chip, Section, Card, Button, Icon } from 'ui-svelte';
</script>

<Section bodyClass="items-center gap-6 text-center px-4 pt-6 md:pt-10 xl:pt-16">
	<Chip startIcon={StarsMinimalisticLinearIcon} size="md" isSolid>Modern UI Component Library</Chip>

	<h1 class="hero-title max-w-4xl">
		Build beautiful web apps <span
			class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">faster</span
		> with UiSvelte
	</h1>

	<p class="hero-subtitle max-w-2xl">
		A comprehensive Svelte component library that handles the complexity, so you can focus on
		building great products. Optimized for AI code generation and mobile-first design.
	</p>

	<div class="row gap-4 flex-wrap justify-center">
		<Button variant="secondary" size="lg" href="/docs/starter/install" isSolid>Get Started</Button>
		<Button variant="outlined" size="lg" href="/docs/display/card">View Components</Button>
	</div>

	<p class="text-sm opacity-70">Open source</p>
</Section>

<Section isBoxed bodyClass="gap-12 py-20">
	<div class="grid-1 md:grid-3 gap-6">
		<Card variant="outlined" hasShadow bodyClass="center gap-4 text-center p-6">
			<div class="icon-wrapper">
				<Icon icon={Rocket24RegularIcon} class="w-12 h-12" />
			</div>
			<h3 class="text-xl font-semibold">Lightning Fast</h3>
			<p class="opacity-80">
				Optimized components that don't sacrifice performance. Built with Svelte for maximum speed.
			</p>
		</Card>

		<Card variant="outlined" hasShadow bodyClass="center gap-4 text-center p-6">
			<div class="icon-wrapper">
				<Icon icon={Code24RegularIcon} class="w-12 h-12" />
			</div>
			<h3 class="text-xl font-semibold">Developer First</h3>
			<p class="opacity-80">
				Intuitive API, excellent TypeScript support, and semantic component names you'll remember.
			</p>
		</Card>

		<Card variant="outlined" hasShadow bodyClass="center gap-4 text-center p-6">
			<div class="icon-wrapper">
				<Icon icon={SparkleAction24RegularIcon} class="w-12 h-12" />
			</div>
			<h3 class="text-xl font-semibold">AI-Optimized</h3>
			<p class="opacity-80">
				Documentation structured for AI code generation. Build faster with Claude, GPT, and more.
			</p>
		</Card>
	</div>
</Section>

<style>
	.icon-wrapper {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(102, 126, 234, 0.1);
		border-radius: 12px;
	}
</style>
