<script lang="ts">
	import {
		Section,
		Card,
		Button,
		Avatar,
		AvatarGroup,
		Chip,
		Item,
		Toggle,
		Divider,
		IconButton
	} from 'ui-svelte';

	// Icons defined inline
	const SunIcon = {
		body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path stroke-linecap="round" d="M12 2v2m0 16v2M4 12H2m20 0h-2m-.222-7.777l-2.222 2.031M4.222 4.223l2.222 2.031m0 11.302l-2.222 2.222m15.556-.001l-2.222-2.222"/></g>',
		viewbox: '0 0 24 24'
	};

	const MoonIcon = {
		body: '<g fill="none"><path stroke="currentColor" d="M19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.48.48 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.48.48 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.48.48 0 0 1-.273-.274zM16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.48.48 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.48.48 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.48.48 0 0 1-.272-.273z"/><path fill="currentColor" d="m21.067 11.857l-.642-.388zm-8.924-8.924l-.388-.642zM21.25 12A9.25 9.25 0 0 1 12 21.25v1.5c5.937 0 10.75-4.813 10.75-10.75zM12 21.25A9.25 9.25 0 0 1 2.75 12h-1.5c0 5.937 4.813 10.75 10.75 10.75zM2.75 12A9.25 9.25 0 0 1 12 2.75v-1.5C6.063 1.25 1.25 6.063 1.25 12zm12.75 2.25A5.75 5.75 0 0 1 9.75 8.5h-1.5a7.25 7.25 0 0 0 7.25 7.25zm4.925-2.781A5.75 5.75 0 0 1 15.5 14.25v1.5a7.25 7.25 0 0 0 6.21-3.505zM9.75 8.5a5.75 5.75 0 0 1 2.781-4.925l-.776-1.284A7.25 7.25 0 0 0 8.25 8.5zM12 2.75a.38.38 0 0 1-.268-.118a.3.3 0 0 1-.082-.155c-.004-.031-.002-.121.105-.186l.776 1.284c.503-.304.665-.861.606-1.299c-.062-.455-.42-1.026-1.137-1.026zm9.71 9.495c-.066.107-.156.109-.187.105a.3.3 0 0 1-.155-.082a.38.38 0 0 1-.118-.268h1.5c0-.717-.571-1.075-1.026-1.137c-.438-.059-.995.103-1.299.606z"/></g>',
		viewbox: '0 0 24 24'
	};

	const ChevronRightIcon = {
		body: '<path fill="currentColor" d="M8.47 4.22a.75.75 0 0 0 0 1.06L15.19 12l-6.72 6.72a.75.75 0 1 0 1.06 1.06l7.25-7.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0"/>',
		viewbox: '0 0 24 24'
	};

	let isDark = $state(false);

	function toggleTheme() {
		isDark = !isDark;
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	// Sample data for the demo
	const teamMembers = [
		{ name: 'Alice Chen', role: 'Lead Developer', status: 'online' as const, src: 'https://i.pravatar.cc/150?img=1' },
		{ name: 'Marcus Johnson', role: 'UI Designer', status: 'busy' as const, src: 'https://i.pravatar.cc/150?img=2' },
		{ name: 'Sofia Ramirez', role: 'Product Manager', status: 'away' as const, src: 'https://i.pravatar.cc/150?img=3' },
		{ name: 'David Kim', role: 'Backend Engineer', status: 'offline' as const, src: 'https://i.pravatar.cc/150?img=4' }
	];

	const features = [
		{ title: 'Fast', description: 'Lightning-fast performance', color: 'secondary' as const },
		{ title: 'Secure', description: 'Enterprise-grade security', color: 'success' as const },
		{ title: 'Scalable', description: 'Grows with your needs', color: 'info' as const }
	];

	const menuItems = [
		{ id: 'profile', label: 'My Profile', description: 'View and edit your profile' },
		{ id: 'settings', label: 'Settings', description: 'App preferences' },
		{ id: 'notifications', label: 'Notifications', description: 'Manage alerts' },
		{ id: 'help', label: 'Help & Support', description: 'Get assistance' }
	];
</script>


	<!-- Hero Section -->
	<Section>
			<div class="column items-center gap-4 text-center">
				<h1 class="hero-title">
					Build <span class="text-gradient">beautiful</span> mobile apps<br />
					with <span class="text-gradient">ui-svelte</span>
				</h1>
				<p class="hero-subtitle prose-normal">
					A modern mobile application framework combining the power of ui-svelte components with
					Capacitor native performance. Create stunning, cross-platform apps in minutes.
				</p>
			</div>
			
			<div class="row gap-3 justify-center mb-6">
				<Button color="primary" size="lg">Get Started</Button>
				<Button color="secondary" variant="outlined" size="lg">Learn More</Button>
			</div>

			<div class="row gap-2 justify-center flex-wrap">
				<Chip color="success" variant="soft" size="sm">Open Source</Chip>
				<Chip color="info" variant="soft" size="sm">Capacitor Ready</Chip>
				<Chip color="warning" variant="soft" size="sm">Mobile First</Chip>
			</div>
	</Section>

	<!-- Features Section -->
	<Section bodyClass="py-6 px-4">
		<h2 class="section-title mb-4">Features</h2>
		<div class="column gap-3">
			{#each features as feature}
				<Card color={feature.color} variant="soft">
					<h3 class="feature-title">{feature.title}</h3>
					<p class="body-sm text-on-muted">{feature.description}</p>
				</Card>
			{/each}
		</div>
	</Section>

	<Divider />

	<!-- Team Section -->
	<Section bodyClass="py-6 px-4">
		<div class="row justify-between items-center mb-4">
			<h2 class="section-title">Team</h2>
			<AvatarGroup 
				items={teamMembers.map(m => ({ src: m.src, name: m.name }))} 
				max={3} 
				size="sm"
				isBordered
			/>
		</div>
		
		<div class="column gap-2">
			{#each teamMembers as member}
				<Item
					id={member.name}
					label={member.name}
					description={member.role}
					src={member.src}
					status={member.status}
					hasIndicator
					onclick={() => console.log('Tapped:', member.name)}
				>
					{#snippet actions()}
						<IconButton 
							icon={ChevronRightIcon} 
							variant="ghost" 
							color="muted" 
							size="sm" 
						/>
					{/snippet}
				</Item>
			{/each}
		</div>
	</Section>

	<Divider />

	<!-- Quick Actions Section -->
	<Section bodyClass="py-6 px-4">
		<h2 class="section-title mb-4">Quick Actions</h2>
		<div class="grid-2 gap-3">
			<Card color="primary" variant="soft" bodyClass="text-center py-4">
				<Avatar name="📊" color="primary" variant="solid" size="lg" class="mb-2" />
				<p class="body-md font-medium">Analytics</p>
			</Card>
			<Card color="success" variant="soft" bodyClass="text-center py-4">
				<Avatar name="💬" color="success" variant="solid" size="lg" class="mb-2" />
				<p class="body-md font-medium">Messages</p>
			</Card>
			<Card color="info" variant="soft" bodyClass="text-center py-4">
				<Avatar name="📁" color="info" variant="solid" size="lg" class="mb-2" />
				<p class="body-md font-medium">Files</p>
			</Card>
			<Card color="warning" variant="soft" bodyClass="text-center py-4">
				<Avatar name="⚙️" color="warning" variant="solid" size="lg" class="mb-2" />
				<p class="body-md font-medium">Settings</p>
			</Card>
		</div>
	</Section>

	<Divider />

	<!-- Settings Section with Toggle -->
	<Section bodyClass="py-6 px-4">
		<h2 class="section-title mb-4">Settings</h2>
		<Card>
			<div class="column">
				{#each menuItems as item, i}
					<Item
						id={item.id}
						label={item.label}
						description={item.description}
						hasIndicator
						hasDivider={i < menuItems.length - 1}
						onclick={() => console.log('Navigate to:', item.id)}
					/>
				{/each}
			</div>
		</Card>

		<Card rootClass="mt-4">
			<div class="row justify-between items-center p-2">
				<div class="row items-center gap-3">
					<IconButton 
						icon={isDark ? MoonIcon : SunIcon} 
						variant="soft" 
						color={isDark ? 'info' : 'warning'}
						size="sm"
					/>
					<div>
						<p class="body-md font-medium">Dark Mode</p>
						<p class="body-sm text-on-muted">Toggle app theme</p>
					</div>
				</div>
				<Toggle bind:checked={isDark} onchange={toggleTheme} />
			</div>
		</Card>
	</Section>

	<!-- Bottom spacing for BottomNav -->
	<div class="pb-20"></div>

