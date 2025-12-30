<script lang="ts">
	import { GithubIconIcon, Heart24RegularIcon, List24RegularIcon } from '$lib/icons';
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
		// {
		// 	label: 'Pro',
		// 	href: '/pro'
		// }
	];

	let openMenu = $state(false);

	onMount(() => {
		storeApp.setThemeColor('primary', 'oklch(54.6% 0.245 262.881)');
		storeApp.setThemeColor('onPrimary', 'oklch(93.2% 0.032 255.585)');
		storeApp.setThemeColor('secondary', 'oklch(59.2% 0.249 0.584)');
		storeApp.setThemeColor('onSecondary', 'oklch(94.8% 0.028 342.258)');
		storeApp.setThemeColor('muted', 'oklch(87.2% 0.01 258.338)');
		storeApp.setThemeColor('onMuted', 'oklch(37.2% 0.044 257.287)');
		storeApp.setThemeColor('background', 'oklch(98.5% 0.002 247.839)');
		storeApp.setThemeColor('onBackground', 'oklch(21% 0.034 264.665)');
		storeApp.setThemeColor('success', 'oklch(62.7% 0.194 149.214)');
		storeApp.setThemeColor('onSuccess', 'oklch(96.2% 0.044 156.743)');
		storeApp.setThemeColor('info', 'oklch(58.8% 0.158 241.966)');
		storeApp.setThemeColor('onInfo', 'oklch(95.1% 0.026 236.824)');
		storeApp.setThemeColor('warning', 'oklch(68.1% 0.162 75.834)');
		storeApp.setThemeColor('onWarning', 'oklch(97.3% 0.071 103.193)');
		storeApp.setThemeColor('danger', 'oklch(57.7% 0.245 27.325)');
		storeApp.setThemeColor('onDanger', 'oklch(93.6% 0.032 17.717)');
		storeApp.setThemeColor('surface', 'oklch(96.7% 0.003 264.542)');
		storeApp.setThemeColor('onSurface', 'oklch(27.9% 0.041 260.031)');

		storeApp.setDarkThemeColor('muted', 'oklch(37.3% 0.034 259.733)');
		storeApp.setDarkThemeColor('onMuted', 'oklch(87.2% 0.01 258.338)');
		storeApp.setDarkThemeColor('background', 'oklch(13% 0.028 261.692)');
		storeApp.setDarkThemeColor('onBackground', 'oklch(96.7% 0.003 264.542)');
		storeApp.setDarkThemeColor('surface', 'oklch(21% 0.034 264.665)');
		storeApp.setDarkThemeColor('onSurface', 'oklch(92.8% 0.006 264.531)');
	});

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
			centerClass="invisible lg:visible"
		>
			{#snippet start()}
				<IconButton
					icon={List24RegularIcon}
					variant="ghost"
					class="md:hidden"
					onclick={() => (openMenu = true)}
				/>
				<a href="/">
					<h4 class="heading-lg">UiSvelte</h4>
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
<Drawer bind:open={openMenu} position="top">
	{#each menuItems as item}
		<Button variant="ghost" isWide href={item.href}>
			{item.label}
		</Button>
	{/each}
</Drawer>
