<script lang="ts">
	import { Heart24RegularIcon } from '$lib/icons';
	import { Scaffold, AppBar, ToggleTheme, NavMenu, Footer, IconButton } from 'ui-svelte';

	let { children } = $props();

	const menuItems = [
		{
			label: 'Home',
			icon: 'fluent:home-24-regular',
			href: '/'
		},
		{
			label: 'Docs',
			icon: 'fluent:info-24-regular',
			href: '/docs/display/card'
		}
	];
</script>

<Scaffold mainClass="vh-16 mt-16" bodyClass="">
	{#snippet appBar()}
		<AppBar class="h-16" contentClass="boxed" isBordered>
			{#snippet start()}
				<h4>UiSvelte</h4>
			{/snippet}
			{#snippet center()}
				<NavMenu items={menuItems} />
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
			{/snippet}
		</AppBar>
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
