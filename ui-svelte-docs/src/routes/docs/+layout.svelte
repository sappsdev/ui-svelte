<script lang="ts">
	import { GithubIconIcon, List24RegularIcon, Search24RegularIcon } from '$lib/icons';
	import {
		Scaffold,
		Drawer,
		AppBar,
		Sidebar,
		ToggleTheme,
		SideNav,
		IconButton,
		NavMenu,
		Command,
		Button,
		useSearch
	} from 'ui-svelte';
	import { storeApp } from '$lib/store/store.svelte';
	import { theme } from 'ui-svelte';
	import { sideMenuItems } from '$lib/config/docs-menu-items';
	import { goto } from '$app/navigation';

	let { children } = $props();

	let drawerOpen = $state(false);
	let commandOpen = $state(false);

	const commandGroups = sideMenuItems
		.filter((item) => item.type === 'submenu' && item.subitems && item.label)
		.map((group) => ({
			label: group.label as string,
			icon: group.icon,
			options: (group.subitems ?? [])
				.filter((subitem) => subitem.href)
				.map((subitem, idx) => ({
					id: `${group.label}-${idx}`,
					label: subitem.label,
					href: subitem.href as string
				}))
		}));

	const search = useSearch({
		options: [],
		clientSide: true
	});

	// $effect(() => {
	// 	const root = document.documentElement;
	// 	const colors = storeApp.themeColors;
	// 	const darkColors = storeApp.darkThemeColors;

	// 	root.style.setProperty('--on-dark', colors.onDark);
	// 	root.style.setProperty('--on-light', colors.onLight);

	// 	root.style.setProperty('--primary', colors.primary);
	// 	root.style.setProperty('--secondary', colors.secondary);
	// 	root.style.setProperty('--success', colors.success);
	// 	root.style.setProperty('--info', colors.info);
	// 	root.style.setProperty('--warning', colors.warning);
	// 	root.style.setProperty('--danger', colors.danger);

	// 	if (theme.isDark) {
	// 		root.style.setProperty('--secondary', darkColors.secondary);
	// 		root.style.setProperty('--muted', darkColors.muted);
	// 		root.style.setProperty('--background', darkColors.background);
	// 		root.style.setProperty('--surface', darkColors.surface);
	// 	} else {
	// 		root.style.setProperty('--muted', colors.muted);
	// 		root.style.setProperty('--background', colors.background);
	// 		root.style.setProperty('--surface', colors.surface);
	// 	}
	// });

	const menuItems: any = [
		{
			label: 'Home',
			href: '/'
		},
		{
			label: 'Docs',
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
		<AppBar rootClass="bg-background h-16" isSticky isBoxed isBordered centerClass="hidden lg:flex">
			{#snippet start()}
				<IconButton
					icon={List24RegularIcon}
					onclick={() => (drawerOpen = !drawerOpen)}
					variant="ghost"
					color="secondary"
					size="sm"
					class="lg:hidden"
				/>
				<a href="/">
					<h4 class="heading-lg">UiSvelte</h4>
				</a>
			{/snippet}
			{#snippet center()}
				<NavMenu items={menuItems} />
			{/snippet}
			{#snippet end()}
				<Button
					onclick={() => (commandOpen = true)}
					startIcon={Search24RegularIcon}
					variant="soft"
					color="secondary"
					size="sm"
				>
					<span class="hidden md:inline">Search</span>
					<span class="hidden md:inline text-xs opacity-60 ml-2">⌘K</span>
				</Button>
				<ToggleTheme color="secondary" />
				<IconButton
					icon={GithubIconIcon}
					variant="ghost"
					color="secondary"
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
	<div class="pb-24"></div>
</Scaffold>
<Drawer bind:open={drawerOpen} onclose={() => (drawerOpen = false)} class="w-56">
	<SideNav items={sideMenuItems} />
</Drawer>
<Command
	bind:open={commandOpen}
	{search}
	groups={commandGroups}
	placeholder="Search components..."
	onselect={(item) => {
		if (item.href) {
			goto(item.href as string);
			commandOpen = false;
		}
	}}
/>
