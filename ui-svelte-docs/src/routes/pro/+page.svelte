<script lang="ts">
	import {
		StarsMinimalisticLinearIcon,
		Rocket24RegularIcon,
		SparkleAction24RegularIcon,
		Code24RegularIcon,
		Flash24RegularIcon,
		Form24RegularIcon,
		LayoutColumnOneThirdRight24RegularIcon,
		LayoutDashboardIcon,
		Shield24RegularIcon,
		GiftLinearIcon,
		CrownStarLinearIcon,
		CheckmarkCircle24RegularIcon,
		ConfettiLinearIcon
	} from '$lib/icons';
	import { Chip, Section, Card, Button, Icon, TextField, Divider, Avatar } from 'ui-svelte';

	let email = $state('');
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);

	const handleWaitlist = async () => {
		if (!email) return;
		isSubmitting = true;
		// Simulate API call
		await new Promise((r) => setTimeout(r, 1000));
		isSubmitting = false;
		isSubmitted = true;
	};

	const proComponents = [
		{
			icon: LayoutColumnOneThirdRight24RegularIcon,
			title: 'Hero Sections',
			description: 'Stunning hero sections with gradients, animations, and parallax effects',
			count: '12+'
		},
		{
			icon: Form24RegularIcon,
			title: 'Complete Forms',
			description: 'Authentication, checkout, contact, survey forms with validation built-in',
			count: '15+'
		},
		{
			icon: LayoutDashboardIcon,
			title: 'Dashboard Templates',
			description: 'Analytics, admin panels, SaaS dashboards with charts and widgets',
			count: '8+'
		},
		{
			icon: Code24RegularIcon,
			title: 'Landing Pages',
			description: 'SaaS, startup, product launches with testimonials and pricing sections',
			count: '10+'
		}
	] as const;

	const features = [
		{
			icon: SparkleAction24RegularIcon,
			title: 'Copy & Paste Ready',
			description: 'Just copy the code, paste it in your project, and customize. No complex setup.'
		},
		{
			icon: Flash24RegularIcon,
			title: 'Built on UiSvelte',
			description: 'Uses the same component system you love. Consistent, performant, accessible.'
		},
		{
			icon: Rocket24RegularIcon,
			title: 'Production Ready',
			description: 'Professional designs tested in real projects. Ship faster with confidence.'
		}
	] as const;

	const earlyBirdPerks = [
		'Lifetime access to all Pro components',
		'All future updates included',
		'Priority feature requests',
		'Private Discord community access',
		'Early access to new templates'
	];
</script>

<!-- Hero Section -->
<Section bodyClass="items-center gap-8 text-center px-4 pt-8 md:pt-16 xl:pt-24 pb-12" isBoxed>
	<div class="fade-in-up">
		<Chip
			startIcon={CrownStarLinearIcon}
			size="lg"
			color="warning"
			variant="soft"
			class="pulse-soft"
		>
			Coming Soon
		</Chip>
	</div>

	<h1 class="hero-title fade-in-up delay-100 max-w-4xl">
		Build <span class="grad">production-ready</span> pages in minutes
	</h1>

	<p class="hero-description fade-in-up delay-200 max-w-3xl opacity-80">
		UiSvelte Pro gives you beautiful, copy-paste ready components for heroes, forms, dashboards, and
		complete page templates. Stop building from scratch.
	</p>

	<!-- Early Bird Banner -->
	<Card
		color="warning"
		variant="soft"
		rootClass="fade-in-up delay-300 max-w-lg"
		bodyClass="center gap-3 py-4"
	>
		<div class="row gap-2 items-center">
			<Icon icon={GiftLinearIcon} class="text-warning w-5 h-5" />
			<span class="font-semibold">Early Bird Pricing</span>
		</div>
		<div class="row gap-3 items-baseline">
			<span class="text-3xl font-bold">$49</span>
			<span class="text-lg line-through opacity-50">$149</span>
			<Chip color="success" variant="solid" size="sm">Save 67%</Chip>
		</div>
		<p class="text-sm opacity-70 text-center">One-time payment • Lifetime access • Limited spots</p>
	</Card>

	<!-- Waitlist Form -->
	<div class="fade-in-up delay-400 w-full max-w-md">
		{#if isSubmitted}
			<Card color="success" variant="soft" bodyClass="center gap-3 py-6">
				<Icon icon={CheckmarkCircle24RegularIcon} class="text-success w-12 h-12" />
				<p class="font-semibold text-lg">You're on the list!</p>
				<p class="text-sm opacity-70 text-center">
					We'll notify you when Pro launches with your exclusive early bird discount.
				</p>
			</Card>
		{:else}
			<div class="column gap-3">
				<TextField
					bind:value={email}
					placeholder="Enter your email"
					type="email"
					color="muted"
					variant="soft"
					size="lg"
				/>
				<Button
					color="primary"
					variant="solid"
					size="lg"
					isWide
					isLoading={isSubmitting}
					onclick={handleWaitlist}
				>
					Join Waitlist & Lock Early Bird Price
				</Button>
			</div>
			<p class="text-xs opacity-50 mt-2 text-center">No spam. Only launch updates.</p>
		{/if}
	</div>

	<!-- Countdown Timer Placeholder -->
	<div class="row gap-6 md:gap-10 flex-wrap justify-center fade-in-up delay-500 mt-4">
		<div class="row gap-2 items-center">
			<Icon icon={ConfettiLinearIcon} class="text-warning" />
			<span class="text-sm font-medium">Launching Q1 2025</span>
		</div>
		<div class="row gap-2 items-center">
			<Icon icon={Shield24RegularIcon} class="text-success" />
			<span class="text-sm font-medium">Secure Payment</span>
		</div>
	</div>
</Section>

<!-- What's Included Section -->
<Section isBoxed bodyClass="gap-12 py-24 center" color="muted" variant="soft">
	<div class="column gap-2 text-center">
		<Chip color="primary" variant="soft" size="sm">What You Get</Chip>
		<h2 class="section-title">Everything to Ship Faster</h2>
		<p class="section-subtitle opacity-70 max-w-2xl">
			45+ premium components designed for real-world applications
		</p>
	</div>
	<div class="grid-1 md:grid-2 gap-6 w-full max-w-4xl">
		{#each proComponents as { icon, title, description, count }, i}
			<Card
				color="surface"
				variant="soft"
				rootClass="hover:-translate-y-1 transition-all duration-300 fade-in-up delay-{i * 100}"
				bodyClass="gap-4"
			>
				<div class="row justify-between items-start">
					<Avatar size="lg" {icon} color="primary" />
					<Chip color="primary" variant="soft" size="sm">{count}</Chip>
				</div>
				<div class="column gap-2">
					<h3 class="card-title">{title}</h3>
					<p class="card-description opacity-70">{description}</p>
				</div>
			</Card>
		{/each}
	</div>
</Section>

<!-- Why Pro Section -->
<Section isBoxed bodyClass="gap-12 py-24 center">
	<div class="column gap-2 text-center">
		<h2 class="section-title">Why UiSvelte Pro?</h2>
		<p class="section-subtitle opacity-70 max-w-2xl">
			Built by developers, for developers who value their time
		</p>
	</div>
	<div class="grid-1 md:grid-3 gap-8 w-full max-w-5xl">
		{#each features as { icon, title, description }, i}
			<Card
				color="muted"
				variant="soft"
				rootClass="fade-in-up delay-{i * 100}"
				bodyClass="center gap-4"
			>
				<div class="p-4 rounded-full bg-primary/10">
					<Icon {icon} class="text-primary w-8 h-8" />
				</div>
				<h3 class="card-title">{title}</h3>
				<p class="card-description text-center opacity-70">{description}</p>
			</Card>
		{/each}
	</div>
</Section>

<!-- Preview Section -->
<Section isBoxed bodyClass="gap-12 py-24 center" color="muted" variant="soft">
	<div class="column gap-2 text-center">
		<Chip color="info" variant="soft" size="sm">Sneak Peek</Chip>
		<h2 class="section-title">Components Preview</h2>
		<p class="section-subtitle opacity-70">Coming soon in UiSvelte Pro</p>
	</div>

	<div class="grid-1 lg:grid-2 gap-8 w-full max-w-5xl">
		<!-- Hero Preview -->
		<Card color="surface" variant="soft" bodyClass="p-0 overflow-hidden">
			<div
				class="p-6 center gap-4 min-h-64 bg-linear-to-br from-primary/20 to-secondary/20 relative"
			>
				<div class="absolute inset-0 bg-linear-to-t from-surface/80 to-transparent"></div>
				<div class="column gap-3 center relative z-10">
					<Chip color="primary" variant="solid" size="sm">Hero Template</Chip>
					<p class="display-sm font-bold text-center">Launch Your Product</p>
					<p class="text-sm opacity-60 text-center max-w-xs">
						Beautiful hero sections with animations and gradients
					</p>
					<div class="row gap-2">
						<Button color="primary" variant="solid" size="sm">Get Started</Button>
						<Button color="muted" variant="soft" size="sm">Learn More</Button>
					</div>
				</div>
			</div>
		</Card>

		<!-- Dashboard Preview -->
		<Card color="surface" variant="soft" bodyClass="p-6 center gap-4 min-h-64">
			<Chip color="success" variant="solid" size="sm">Dashboard Template</Chip>
			<div class="grid-2 gap-4 w-full">
				<Card color="primary" variant="soft" bodyClass="center gap-1 p-4">
					<p class="display-sm font-bold">$12,450</p>
					<p class="text-xs opacity-60">Revenue</p>
				</Card>
				<Card color="success" variant="soft" bodyClass="center gap-1 p-4">
					<p class="display-sm font-bold">+24%</p>
					<p class="text-xs opacity-60">Growth</p>
				</Card>
			</div>
			<p class="text-sm opacity-60 text-center">Analytics dashboards with charts and widgets</p>
		</Card>

		<!-- Form Preview -->
		<Card color="surface" variant="soft" bodyClass="p-6 center gap-4 min-h-64">
			<Chip color="warning" variant="solid" size="sm">Form Template</Chip>
			<div class="column gap-3 w-full max-w-xs">
				<div class="column gap-1">
					<div class="h-3 w-16 bg-muted/50 rounded"></div>
					<div class="h-10 w-full bg-muted/30 rounded-lg border border-muted"></div>
				</div>
				<div class="column gap-1">
					<div class="h-3 w-20 bg-muted/50 rounded"></div>
					<div class="h-10 w-full bg-muted/30 rounded-lg border border-muted"></div>
				</div>
				<div class="h-10 w-full bg-primary rounded-lg"></div>
			</div>
			<p class="text-sm opacity-60 text-center">Auth, checkout, and contact forms</p>
		</Card>

		<!-- Landing Preview -->
		<Card color="surface" variant="soft" bodyClass="p-6 center gap-4 min-h-64">
			<Chip color="info" variant="solid" size="sm">Landing Template</Chip>
			<div class="column gap-3 w-full">
				<div class="h-16 w-full bg-linear-to-r from-primary/30 to-secondary/30 rounded-lg center">
					<p class="text-xs font-semibold opacity-60">Hero Section</p>
				</div>
				<div class="grid-3 gap-2">
					<div class="h-12 bg-muted/30 rounded center">
						<p class="text-xs opacity-50">Feature</p>
					</div>
					<div class="h-12 bg-muted/30 rounded center">
						<p class="text-xs opacity-50">Feature</p>
					</div>
					<div class="h-12 bg-muted/30 rounded center">
						<p class="text-xs opacity-50">Feature</p>
					</div>
				</div>
			</div>
			<p class="text-sm opacity-60 text-center">Complete SaaS and startup landing pages</p>
		</Card>
	</div>
</Section>

<!-- Early Bird Perks Section -->
<Section isBoxed bodyClass="gap-10 py-24 center">
	<div class="column gap-2 text-center">
		<Chip color="warning" variant="solid" size="sm" startIcon={GiftLinearIcon}>Limited Offer</Chip>
		<h2 class="section-title">Early Bird Benefits</h2>
		<p class="section-subtitle opacity-70 max-w-2xl">Get in early and save 67% + exclusive perks</p>
	</div>

	<Card color="warning" variant="soft" rootClass="max-w-xl w-full" bodyClass="gap-4 py-6">
		{#each earlyBirdPerks as perk, i}
			<div class="row gap-3 items-center fade-in-up delay-{i * 100}">
				<Icon icon={CheckmarkCircle24RegularIcon} class="text-success w-5 h-5 shrink-0" />
				<span class="font-medium">{perk}</span>
			</div>
			{#if i < earlyBirdPerks.length - 1}
				<Divider color="muted" />
			{/if}
		{/each}
	</Card>
</Section>

<!-- FAQ Section -->
<Section isBoxed bodyClass="gap-10 py-24 center" color="muted" variant="soft">
	<div class="column gap-2 text-center">
		<h2 class="section-title">Frequently Asked Questions</h2>
	</div>

	<div class="column gap-4 w-full max-w-2xl">
		<Card color="surface" variant="soft" bodyClass="gap-2">
			<h4 class="font-semibold">When will Pro launch?</h4>
			<p class="text-sm opacity-70">
				We're targeting Q1 2025. Early bird customers will get access first and be notified via
				email.
			</p>
		</Card>
		<Card color="surface" variant="soft" bodyClass="gap-2">
			<h4 class="font-semibold">What's included in the lifetime access?</h4>
			<p class="text-sm opacity-70">
				All current and future Pro components, templates, and updates. Pay once, keep forever.
			</p>
		</Card>
		<Card color="surface" variant="soft" bodyClass="gap-2">
			<h4 class="font-semibold">Do I need UiSvelte to use Pro?</h4>
			<p class="text-sm opacity-70">
				Yes, Pro components are built on top of UiSvelte core (free). They work seamlessly together.
			</p>
		</Card>
		<Card color="surface" variant="soft" bodyClass="gap-2">
			<h4 class="font-semibold">Can I use it for commercial projects?</h4>
			<p class="text-sm opacity-70">
				Absolutely! Use Pro components in unlimited personal and commercial projects.
			</p>
		</Card>
	</div>
</Section>

<!-- CTA Section -->
<Section color="primary" variant="solid" bodyClass="center gap-6 py-24 text-center" isBoxed>
	<Chip color="secondary" variant="solid" size="lg" startIcon={CrownStarLinearIcon}>
		Limited Early Bird Spots
	</Chip>
	<h2 class="cta-title text-white">Lock Your Lifetime Access</h2>
	<p class="cta-subtitle text-white opacity-80 max-w-xl">
		Join the waitlist now and get 67% off when we launch. Don't miss this limited offer.
	</p>

	<div class="row gap-3 items-baseline text-white">
		<span class="display-lg font-bold">$49</span>
		<span class="display-sm line-through opacity-50">$149</span>
	</div>

	{#if isSubmitted}
		<Card color="secondary" variant="soft" bodyClass="center gap-2 py-4 px-6">
			<Icon icon={CheckmarkCircle24RegularIcon} class="text-success w-6 h-6" />
			<p class="font-semibold">You're on the waitlist!</p>
		</Card>
	{:else}
		<div class="row gap-3 w-full max-w-md flex-wrap justify-center">
			<TextField
				bind:value={email}
				placeholder="Enter your email"
				type="email"
				color="muted"
				variant="solid"
				size="lg"
				rootClass="flex-1 min-w-64"
			/>
			<Button
				color="secondary"
				variant="solid"
				size="lg"
				isLoading={isSubmitting}
				onclick={handleWaitlist}
			>
				Join Waitlist
			</Button>
		</div>
	{/if}
</Section>

<style>
	.line-through {
		text-decoration: line-through;
	}

	.min-w-64 {
		min-width: 16rem;
	}
</style>
