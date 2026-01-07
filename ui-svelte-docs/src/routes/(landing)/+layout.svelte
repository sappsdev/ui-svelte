<script lang="ts">
	import {
		CloseRegularIcon,
		GithubIconIcon,
		Heart24RegularIcon,
		List24RegularIcon
	} from '$lib/icons';
	import { storeApp } from '$lib/store/store.svelte';
	import { onMount } from 'svelte';
	import {
		Scaffold,
		AppBar,
		ToggleTheme,
		NavMenu,
		Footer,
		IconButton,
		theme,
		Drawer,
		Button,
		Icon
	} from 'ui-svelte';

	let { children } = $props();

	const menuItems = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Docs',
			href: '/docs'
		}
	];

	let openMenu = $state(false);

	onMount(() => {
		storeApp.setThemeColor('onDark', 'oklch(97% 0.01 90)');
		storeApp.setThemeColor('onLight', 'oklch(25% 0.01 30)');
		storeApp.setThemeColor('primary', 'oklch(75% 0.15 145)');
		storeApp.setThemeColor('secondary', 'oklch(28.42% 0.0467 259.99)');
		storeApp.setThemeColor('muted', 'oklch(87.2% 0.01 258.338)');
		storeApp.setThemeColor('background', 'oklch(96% 0.005 85)');
		storeApp.setThemeColor('surface', 'oklch(98% 0.003 85)');
		storeApp.setThemeColor('success', 'oklch(62.7% 0.194 149.214)');
		storeApp.setThemeColor('info', 'oklch(58.8% 0.158 241.966)');
		storeApp.setThemeColor('warning', 'oklch(68.1% 0.162 75.834)');
		storeApp.setThemeColor('danger', 'oklch(57.7% 0.245 27.325)');

		storeApp.setDarkThemeColor('secondary', 'oklch(97% 0.01 90)');
		storeApp.setDarkThemeColor('muted', 'oklch(37.3% 0.034 259.733)');
		storeApp.setDarkThemeColor('background', 'oklch(13% 0.028 261.692)');
		storeApp.setDarkThemeColor('surface', 'oklch(21% 0.034 264.665)');
	});

	$effect(() => {
		const root = document.documentElement;
		const colors = storeApp.themeColors;
		const darkColors = storeApp.darkThemeColors;

		root.style.setProperty('--on-dark', colors.onDark);
		root.style.setProperty('--on-light', colors.onLight);

		root.style.setProperty('--primary', colors.primary);
		root.style.setProperty('--soft-primary', colors.softPrimary);
		root.style.setProperty('--secondary', colors.secondary);
		root.style.setProperty('--soft-secondary', colors.softSecondary);
		root.style.setProperty('--muted', colors.muted);
		root.style.setProperty('--soft-muted', colors.softMuted);
		root.style.setProperty('--background', colors.background);
		root.style.setProperty('--surface', colors.surface);
		root.style.setProperty('--success', colors.success);
		root.style.setProperty('--soft-success', colors.softSuccess);
		root.style.setProperty('--info', colors.info);
		root.style.setProperty('--soft-info', colors.softInfo);
		root.style.setProperty('--warning', colors.warning);
		root.style.setProperty('--soft-warning', colors.softWarning);
		root.style.setProperty('--danger', colors.danger);
		root.style.setProperty('--soft-danger', colors.softDanger);

		if (theme.isDark) {
			root.style.setProperty('--secondary', darkColors.secondary);
			root.style.setProperty('--soft-secondary', darkColors.softSecondary);
			root.style.setProperty('--muted', darkColors.muted);
			root.style.setProperty('--soft-muted', darkColors.softMuted);
			root.style.setProperty('--background', darkColors.background);
			root.style.setProperty('--surface', darkColors.surface);
		} else {
			root.style.setProperty('--muted', colors.muted);
			root.style.setProperty('--background', colors.background);
			root.style.setProperty('--surface', colors.surface);
		}
	});
</script>

<svelte:head>
	<title>UiSvelte Library</title>
</svelte:head>

<Scaffold mainClass="vh-16 mt-16">
	{#snippet appBar()}
		<AppBar
			rootClass="bg-background h-16"
			isBoxed
			isSticky
			isBordered
			borderOnScrollOnly
			centerClass="hidden lg:flex"
			bind:popoverOpen={openMenu}
		>
			{#snippet start()}
				<IconButton
					icon={openMenu ? CloseRegularIcon : List24RegularIcon}
					variant="ghost"
					color="secondary"
					class="md:hidden"
					onclick={() => (openMenu = !openMenu)}
				/>
				<a href="/">
					<h4 class="heading-lg">UiSvelte</h4>
				</a>
			{/snippet}
			{#snippet center()}
				<NavMenu items={menuItems} />
			{/snippet}
			{#snippet end()}
				<ToggleTheme color="secondary" variant="ghost" />
				<IconButton
					icon={GithubIconIcon}
					variant="ghost"
					color="secondary"
					target="_blank"
					href="https://github.com/sappsdev/ui-svelte"
				/>
			{/snippet}
			{#snippet popoverContent()}
				<Button href="/docs" isWide>Go to Docs</Button>
			{/snippet}
		</AppBar>
	{/snippet}
	{@render children()}
	<Footer isBoxed isBordered rootClass="min-h-24">
		{#snippet start()}
			<p>© {new Date().getFullYear()} UiSvelte</p>
		{/snippet}

		{#snippet end()}
			<a class="row center gap-1" href="https://www.sappsdev.com">
				Made with <Icon icon={Heart24RegularIcon} class="h-6 w-auto" />
			</a>
		{/snippet}
	</Footer>
</Scaffold>
