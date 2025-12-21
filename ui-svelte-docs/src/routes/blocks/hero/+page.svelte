<script>
	import { Section, Card, Button, Chip, Icon } from 'ui-svelte';
	import {
		Rocket24RegularIcon,
		ArrowRightLinearIcon,
		StarsMinimalisticLinearIcon,
		Shield24RegularIcon,
		Flash24RegularIcon,
		HeartLinearIcon,
		Code24RegularIcon,
		ChartLinearIcon,
		CheckmarkCircle24RegularIcon,
		SparkleAction24RegularIcon,
		GithubIconIcon,
		PlayCircleLinearIcon,
		GlobalLinearIcon,
		GiftLinearIcon,
		ConfettiLinearIcon,
		CrownStarLinearIcon,
		BoltCircleLinearIcon
	} from '$lib/icons';
</script>

<!-- Hero 1: Centered Hero with Gradient Text -->
<Section rootClass="min-h-screen" bodyClass="column center gap-8 text-center py-20">
	<div class="fade-in-up">
		<Chip color="primary" variant="soft" size="sm" startIcon={CrownStarLinearIcon}
			>Just Released v2.0</Chip
		>
	</div>
	<h1 class="hero-title fade-in-up delay-100">
		Build <span class="grad grad-primary">stunning</span> web apps<br />with modern components
	</h1>
	<p class="hero-subtitle text-on-muted prose-normal fade-in-up delay-200">
		A comprehensive UI library designed for developers who want to ship
		<span class="mark mark-primary">beautiful products</span> faster without compromising on quality.
	</p>
	<div class="row gap-4 fade-in-up delay-300">
		<Button color="primary" size="lg" startIcon={Rocket24RegularIcon}>Get Started</Button>
		<Button variant="outlined" size="lg" startIcon={PlayCircleLinearIcon}>Watch Demo</Button>
	</div>
</Section>

<!-- Hero 2: Split Hero with Card (Left Content, Right Image) -->
<Section color="surface" variant="soft" rootClass="min-h-screen">
	<div class="grid-1 md:grid-2 gap-8 items-center py-16">
		<div class="column gap-6 fade-in-left">
			<Chip color="success" variant="soft" startIcon={Rocket24RegularIcon}>New Features</Chip>
			<h1 class="hero-title">
				Accelerate your <span class="slant slant-primary">development</span> workflow
			</h1>
			<p class="hero-description text-on-muted prose-normal">
				From idea to production in record time. Our components are built with performance and
				accessibility in mind, so you can focus on what matters most.
			</p>
			<div class="row gap-4 wrap">
				<Button color="primary" size="lg" endIcon={ArrowRightLinearIcon}>Start Building</Button>
				<Button variant="ghost" size="lg">Learn More</Button>
			</div>
		</div>
		<Card rootClass="fade-in-right delay-200" variant="soft" color="muted">
			<div class="column center gap-4 p-8">
				<div class="float">
					<div class="w-24 h-24 rounded-full bg-primary/20 center">
						<Icon icon={Code24RegularIcon} class="w-12 h-12 text-primary" />
					</div>
				</div>
				<h3 class="heading-lg text-center">Clean Code Architecture</h3>
				<p class="body-md text-on-muted text-center">
					Built with TypeScript and modern best practices
				</p>
			</div>
		</Card>
	</div>
</Section>

<!-- Hero 3: Hero with Background Image -->
<Section cover="/images/hero-bg.jpg" variant="solid" rootClass="min-h-screen">
	<div class="column center gap-8 text-center py-20 text-white">
		<div class="zoom-in">
			<Chip color="secondary" variant="solid" size="lg" startIcon={BoltCircleLinearIcon}
				>Lightning Fast</Chip
			>
		</div>
		<h1 class="hero-title zoom-in delay-100">
			The <span class="neon neon-primary">Future</span> of Web Development
		</h1>
		<p class="hero-subtitle zoom-in delay-200 prose-normal">
			Experience the next generation of UI components with
			<span class="glow glow-primary">seamless animations</span> and
			<span class="glow glow-secondary">stunning effects</span>.
		</p>
		<div class="row gap-4 zoom-in delay-300">
			<Button color="primary" size="xl" class="pulse-soft">Explore Now</Button>
			<Button variant="overlay" size="xl">View Docs</Button>
		</div>
	</div>
</Section>

<!-- Hero 4: Stats Hero with Cards -->
<Section color="primary" variant="solid" rootClass="py-24">
	<div class="column gap-12 text-center">
		<div class="column gap-4">
			<h1 class="hero-title text-white fade-in-up">
				Trusted by <span class="under under-secondary">thousands</span> of developers
			</h1>
			<p class="hero-subtitle text-on-primary fade-in-up delay-100">
				Join the community building the web's most beautiful applications
			</p>
		</div>
		<div class="grid-1 md:grid-3 gap-6">
			<Card variant="soft" color="surface" rootClass="bounce-in delay-100">
				<div class="column center gap-2 p-6">
					<h2 class="display-lg text-primary">50K+</h2>
					<p class="body-lg text-on-muted">GitHub Stars</p>
				</div>
			</Card>
			<Card variant="soft" color="surface" rootClass="bounce-in delay-200">
				<div class="column center gap-2 p-6">
					<h2 class="display-lg text-primary">100K+</h2>
					<p class="body-lg text-on-muted">Weekly Downloads</p>
				</div>
			</Card>
			<Card variant="soft" color="surface" rootClass="bounce-in delay-300">
				<div class="column center gap-2 p-6">
					<h2 class="display-lg text-primary">5K+</h2>
					<p class="body-lg text-on-muted">Contributors</p>
				</div>
			</Card>
		</div>
		<div class="fade-in-up delay-400">
			<Button color="secondary" size="lg" startIcon={GithubIconIcon}>Star on GitHub</Button>
		</div>
	</div>
</Section>

<!-- Hero 5: Features Hero (Centered with Feature Cards below) -->
<Section rootClass="py-24">
	<div class="column gap-16 text-center">
		<div class="column gap-6 items-center">
			<Chip color="info" variant="soft" startIcon={SparkleAction24RegularIcon}>Features</Chip>
			<h1 class="hero-title fade-in-up">
				Everything you need to build <span class="grad grad-info">modern apps</span>
			</h1>
			<p class="hero-subtitle text-on-muted prose-normal fade-in-up delay-100">
				A complete toolkit for building production-ready applications with
				<span class="pill pill-info">50+ components</span> and growing.
			</p>
		</div>
		<div class="grid-1 md:grid-3 gap-8">
			<Card variant="outlined" rootClass="slide-up delay-100">
				<div class="column gap-4 p-4">
					<div class="w-12 h-12 rounded-lg bg-primary/10 center">
						<Icon icon={Flash24RegularIcon} class="w-6 h-6 text-primary" />
					</div>
					<h3 class="feature-title">Lightning Fast</h3>
					<p class="feature-description text-on-muted">
						Optimized for performance with zero runtime overhead
					</p>
				</div>
			</Card>
			<Card variant="outlined" rootClass="slide-up delay-200">
				<div class="column gap-4 p-4">
					<div class="w-12 h-12 rounded-lg bg-success/10 center">
						<Icon icon={Shield24RegularIcon} class="w-6 h-6 text-success" />
					</div>
					<h3 class="feature-title">Type Safe</h3>
					<p class="feature-description text-on-muted">
						Full TypeScript support with intelligent autocomplete
					</p>
				</div>
			</Card>
			<Card variant="outlined" rootClass="slide-up delay-300">
				<div class="column gap-4 p-4">
					<div class="w-12 h-12 rounded-lg bg-warning/10 center">
						<Icon icon={HeartLinearIcon} class="w-6 h-6 text-warning" />
					</div>
					<h3 class="feature-title">Accessible</h3>
					<p class="feature-description text-on-muted">
						WCAG compliant with keyboard navigation built-in
					</p>
				</div>
			</Card>
		</div>
	</div>
</Section>

<!-- Hero 6: Split Hero (Right Content, Left Visual with Cards) -->
<Section color="muted" variant="soft" rootClass="py-24">
	<div class="grid-1 md:grid-2 gap-12 items-center">
		<div class="grid-2 gap-4 fade-in-left">
			<Card color="primary" variant="soft" rootClass="bounce-in">
				<div class="column center gap-2 p-6">
					<Icon icon={ChartLinearIcon} class="w-10 h-10 text-primary" />
					<p class="label-md">Analytics</p>
				</div>
			</Card>
			<Card color="success" variant="soft" rootClass="bounce-in delay-100">
				<div class="column center gap-2 p-6">
					<Icon icon={GlobalLinearIcon} class="w-10 h-10 text-success" />
					<p class="label-md">Global CDN</p>
				</div>
			</Card>
			<Card color="warning" variant="soft" rootClass="bounce-in delay-200">
				<div class="column center gap-2 p-6">
					<Icon icon={Shield24RegularIcon} class="w-10 h-10 text-warning" />
					<p class="label-md">Security</p>
				</div>
			</Card>
			<Card color="info" variant="soft" rootClass="bounce-in delay-300">
				<div class="column center gap-2 p-6">
					<Icon icon={Rocket24RegularIcon} class="w-10 h-10 text-info" />
					<p class="label-md">Deploy</p>
				</div>
			</Card>
		</div>
		<div class="column gap-6 fade-in-right delay-200">
			<h1 class="hero-title">
				One platform,
				<span class="box box-primary">endless</span> possibilities
			</h1>
			<p class="hero-description text-on-muted prose-normal">
				Scale your applications effortlessly with our comprehensive suite of tools. From development
				to deployment, we've got you covered.
			</p>
			<div class="column gap-3">
				<div class="row gap-3 items-center">
					<Icon icon={CheckmarkCircle24RegularIcon} class="w-5 h-5 text-success" />
					<span class="body-md">Automatic scaling & load balancing</span>
				</div>
				<div class="row gap-3 items-center">
					<Icon icon={CheckmarkCircle24RegularIcon} class="w-5 h-5 text-success" />
					<span class="body-md">Real-time monitoring & alerts</span>
				</div>
				<div class="row gap-3 items-center">
					<Icon icon={CheckmarkCircle24RegularIcon} class="w-5 h-5 text-success" />
					<span class="body-md">Enterprise-grade security</span>
				</div>
			</div>
			<div class="row gap-4">
				<Button color="primary" size="lg">Get Started Free</Button>
				<Button variant="ghost" size="lg">Contact Sales</Button>
			</div>
		</div>
	</div>
</Section>

<!-- Hero 7: Minimal CTA Hero -->
<Section rootClass="py-32">
	<div class="column center gap-8 text-center">
		<h1 class="display-2xl fade-in-up">
			Start building <span class="wave wave-primary">today</span>
		</h1>
		<p class="body-xl text-on-muted fade-in-up delay-100 prose-normal">
			No credit card required. Free for personal projects.
		</p>
		<div class="row gap-4 fade-in-up delay-200">
			<Button color="primary" size="xl" isWide class="min-w-64">Create Free Account</Button>
		</div>
		<p class="caption-md fade-in-up delay-300">
			Trusted by teams at <span class="text-semibold">Google</span>,
			<span class="text-semibold">Microsoft</span>, and
			<span class="text-semibold">Amazon</span>
		</p>
	</div>
</Section>

<!-- Hero 8: Announcement/Product Launch Hero -->
<Section color="secondary" variant="soft" rootClass="py-24">
	<div class="grid-1 lg:grid-2 gap-12 items-center">
		<div class="column gap-6 reveal-up">
			<div class="row gap-2">
				<Chip color="danger" variant="solid" size="sm">NEW</Chip>
				<Chip color="secondary" variant="outlined" size="sm">v3.0 Release</Chip>
			</div>
			<h1 class="hero-title">
				Introducing <span class="pop pop-primary">Component Studio</span>
			</h1>
			<p class="hero-description text-on-muted">
				The visual editor for building, customizing, and exporting UI components.
				<span class="tag tag-success">No code required</span>
			</p>
			<div class="row gap-4 wrap">
				<Button color="primary" size="lg" startIcon={Rocket24RegularIcon}>Try It Now</Button>
				<Button variant="outlined" size="lg" startIcon={PlayCircleLinearIcon}>Watch Video</Button>
			</div>
		</div>
		<Card variant="outlined" rootClass="reveal-scale delay-200 overflow-hidden">
			<div class="bg-gradient-primary p-8 min-h-80 column center">
				<div class="float">
					<div class="row gap-4">
						<Card variant="solid" color="primary" rootClass="p-4">
							<Icon icon={SparkleAction24RegularIcon} class="w-8 h-8" />
						</Card>
						<Card variant="solid" color="secondary" rootClass="p-4">
							<Icon icon={Code24RegularIcon} class="w-8 h-8" />
						</Card>
						<Card variant="solid" color="success" rootClass="p-4">
							<Icon icon={Rocket24RegularIcon} class="w-8 h-8" />
						</Card>
					</div>
				</div>
			</div>
		</Card>
	</div>
</Section>

<!-- Hero 9: Testimonial Hero -->
<Section rootClass="py-24" color="surface" variant="ghost">
	<div class="column gap-12 items-center text-center">
		<div class="column gap-4 items-center">
			<div class="row gap-1 fade-in">
				{#each [1, 2, 3, 4, 5] as _}
					<Icon icon={StarsMinimalisticLinearIcon} class="w-6 h-6 text-warning" />
				{/each}
			</div>
			<blockquote class="display-md prose-normal fade-in-up delay-100">
				"This is the <span class="mark mark-primary">best UI library</span> I've ever used. It's transformed
				how our team builds products."
			</blockquote>
		</div>
		<div class="row gap-4 items-center fade-in-up delay-200">
			<div class="w-14 h-14 rounded-full bg-primary/20 center">
				<span class="heading-md">JD</span>
			</div>
			<div class="column items-start">
				<span class="label-lg">Jane Doe</span>
				<span class="caption-md text-on-muted">CTO at TechCorp</span>
			</div>
		</div>
		<div class="row gap-4 fade-in-up delay-300">
			<Button color="primary" size="lg">Start Free Trial</Button>
			<Button variant="ghost" size="lg">Read Case Studies</Button>
		</div>
	</div>
</Section>

<!-- Hero 10: Promotional Hero with Multiple CTAs -->
<Section color="muted" variant="solid" rootClass="py-24">
	<div class="column gap-12">
		<div class="grid-1 lg:grid-2 gap-12 items-center">
			<div class="column gap-6">
				<Chip color="primary" variant="solid" startIcon={ConfettiLinearIcon} class="glow-pulse"
					>Special Offer</Chip
				>
				<h1 class="hero-title flip-in-y">
					Ready to <span class="grad grad-primary">transform</span> your workflow?
				</h1>
				<p class="hero-description text-on-muted">
					Join over 10,000 developers who have already made the switch. Get <span
						class="slant slant-success">50% off</span
					> your first year.
				</p>
				<div class="row gap-4 wrap">
					<Button color="primary" size="lg" class="glow-pulse" startIcon={GiftLinearIcon}
						>Claim Discount</Button
					>
					<Button variant="outlined" size="lg">Compare Plans</Button>
				</div>
			</div>
			<div class="column gap-4">
				<Card variant="outlined" rootClass="fade-in-right">
					<div class="row gap-4 items-center p-4">
						<div class="w-12 h-12 rounded-lg bg-primary/20 center">
							<Icon icon={CheckmarkCircle24RegularIcon} class="w-6 h-6 text-primary" />
						</div>
						<div class="column">
							<span class="label-lg">Unlimited Projects</span>
							<span class="caption-sm text-on-muted">No restrictions on team size</span>
						</div>
					</div>
				</Card>
				<Card variant="outlined" rootClass="fade-in-right delay-100">
					<div class="row gap-4 items-center p-4">
						<div class="w-12 h-12 rounded-lg bg-success/20 center">
							<Icon icon={Shield24RegularIcon} class="w-6 h-6 text-success" />
						</div>
						<div class="column">
							<span class="label-lg">Priority Support</span>
							<span class="caption-sm text-on-muted">24/7 dedicated assistance</span>
						</div>
					</div>
				</Card>
				<Card variant="outlined" rootClass="fade-in-right delay-200">
					<div class="row gap-4 items-center p-4">
						<div class="w-12 h-12 rounded-lg bg-warning/20 center">
							<Icon icon={Flash24RegularIcon} class="w-6 h-6 text-warning" />
						</div>
						<div class="column">
							<span class="label-lg">Early Access</span>
							<span class="caption-sm text-on-muted">Get new features first</span>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</div>
</Section>

<style>
	:global(.min-h-80) {
		min-height: 20rem;
	}
	:global(.min-w-64) {
		min-width: 16rem;
	}
	:global(.overflow-hidden) {
		overflow: hidden;
	}
	:global(.bg-gradient-primary) {
		background: linear-gradient(
			135deg,
			oklch(from var(--primary) l c h / 20%) 0%,
			oklch(from var(--secondary) l c h / 20%) 100%
		);
	}
</style>
