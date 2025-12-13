<script lang="ts">
	import {
		LineHorizontal324RegularIcon,
		Heart24RegularIcon,
		GithubIconIcon,
		List24RegularIcon
	} from '$lib/icons';
	import {
		Scaffold,
		Drawer,
		AppBar,
		Sidebar,
		ToggleTheme,
		SideNav,
		IconButton,
		NavMenu,
		Footer
	} from 'ui-svelte';
	import { storeApp } from '$lib/store/store.svelte';
	import { theme } from 'ui-svelte';
	import { sideMenuItems } from '$lib/config/docs-menu-items';

	let { children } = $props();

	let drawerOpen = $state(false);

	$effect(() => {
		const root = document.documentElement;
		const colors = storeApp.themeColors;
		const darkColors = storeApp.darkThemeColors;

		root.style.setProperty('--primary', colors.primary);
		root.style.setProperty('--on-primary', colors.onPrimary);
		root.style.setProperty('--secondary', colors.secondary);
		root.style.setProperty('--on-secondary', colors.onSecondary);
		root.style.setProperty('--success', colors.success);
		root.style.setProperty('--on-success', colors.onSuccess);
		root.style.setProperty('--info', colors.info);
		root.style.setProperty('--on-info', colors.onInfo);
		root.style.setProperty('--warning', colors.warning);
		root.style.setProperty('--on-warning', colors.onWarning);
		root.style.setProperty('--danger', colors.danger);
		root.style.setProperty('--on-danger', colors.onDanger);

		if (theme.isDark) {
			root.style.setProperty('--muted', darkColors.muted);
			root.style.setProperty('--on-muted', darkColors.onMuted);
			root.style.setProperty('--background', darkColors.background);
			root.style.setProperty('--on-background', darkColors.onBackground);
			root.style.setProperty('--surface', darkColors.surface);
			root.style.setProperty('--on-surface', darkColors.onSurface);
		} else {
			root.style.setProperty('--muted', colors.muted);
			root.style.setProperty('--on-muted', colors.onMuted);
			root.style.setProperty('--background', colors.background);
			root.style.setProperty('--on-background', colors.onBackground);
			root.style.setProperty('--surface', colors.surface);
			root.style.setProperty('--on-surface', colors.onSurface);
		}
	});

	const menuItems = [
		{
			label: 'Home',
			icon: 'fluent:home-24-regular',
			href: '/'
		},
		{
			label: 'Docs',
			icon: 'fluent:info-24-regular',
			href: '/docs'
		}
	];
</script>

<svelte:head>
	<title>UiSvelte Docs</title>
</svelte:head>

<Scaffold
	mainClass="lg:p-4 pb-16"
	startClass="invisible lg:visible lg:w-56"
	bodyClass="bg-background mt-16"
	isBoxed
>
	{#snippet appBar()}
		<AppBar
			rootClass="bg-background h-16"
			isSticky
			isBoxed
			isBordered
			centerClass="invisible lg:visible"
		>
			{#snippet start()}
				<IconButton
					icon={List24RegularIcon}
					onclick={() => (drawerOpen = !drawerOpen)}
					variant="ghost"
					size="sm"
					class="lg:hidden"
				/>
				<a href="/">
					<h4>UiSvelte</h4>
				</a>
			{/snippet}
			{#snippet center()}
				<NavMenu items={menuItems} />
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
				<IconButton
					icon={GithubIconIcon}
					variant="ghost"
					href="https://github.com/sappsdev/ui-svelte"
				/>
			{/snippet}
		</AppBar>
	{/snippet}
	{#snippet start()}
		<Sidebar rootClass="pb-8 vh-16">
			<SideNav items={sideMenuItems} />
			{#snippet footer()}
				<p class="text-sm">© {new Date().getFullYear()} UiSvelte</p>
			{/snippet}
		</Sidebar>
	{/snippet}
	{@render children()}
	<Footer isBordered>
		{#snippet start()}
			<p class="text-sm text-muted-foreground">© {new Date().getFullYear()} UiSvelte</p>
		{/snippet}

		{#snippet end()}
			<IconButton icon={Heart24RegularIcon} variant="ghost" href="https://www.sappsdev.com" />
		{/snippet}
	</Footer>
</Scaffold>
<Drawer bind:open={drawerOpen} onclose={() => (drawerOpen = false)} class="w-56">
	<SideNav items={sideMenuItems} />
</Drawer>
