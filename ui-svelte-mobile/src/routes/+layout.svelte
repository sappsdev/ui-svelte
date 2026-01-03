<script lang="ts">
	import { Capacitor } from '@capacitor/core';
  	import { StatusBar, Style } from '@capacitor/status-bar';
	import { Provider, Scaffold, AppBar, BottomNav, IconButton } from 'ui-svelte';
	import '@fontsource-variable/montserrat';
	import '../app.css';
	import { onMount } from 'svelte';

	const SearchIcon = {
		body: '<path fill="currentColor" d="M16.102 17.162a8 8 0 1 1 1.06-1.06l4.618 4.618a.75.75 0 1 1-1.06 1.06zM17.5 11a6.5 6.5 0 1 0-13 0a6.5 6.5 0 0 0 13 0"/>',
		viewbox: '0 0 24 24'
	};

	const MoreVerticalIcon = {
		body: '<path fill="currentColor" d="M12 7.75a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5m0 6a1.75 1.75 0 1 1 0-3.5a1.75 1.75 0 0 1 0 3.5M10.25 18a1.75 1.75 0 1 0 3.5 0a1.75 1.75 0 0 0-3.5 0"/>',
		viewbox: '0 0 24 24'
	};

	const HomeIcon = {
		body: '<path fill="currentColor" d="M12.97 2.59a1.5 1.5 0 0 0-1.94 0l-7.5 6.363A1.5 1.5 0 0 0 3 10.097V19.5A1.5 1.5 0 0 0 4.5 21h4.75a.75.75 0 0 0 .75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 0 0 1.5-1.5v-9.403a1.5 1.5 0 0 0-.53-1.144l-7.5-6.363Z"/>',
		viewbox: '0 0 24 24'
	};

	const HeartIcon = {
		body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 3.338A9.954 9.954 0 0 1 12 2c1.82 0 3.54.487 5.012 1.338M4.632 6.025a10.016 10.016 0 0 0-1.855 3.314M21.224 9.339c-.396-1.2-.999-2.313-1.766-3.297M2.5 14c0 4.478 2.268 8.429 5.718 10.76M21.5 14c0 4.478-2.268 8.429-5.718 10.76"/><path d="M15.727 11.455c.692-.592 1.273-1.2 1.273-2.237c0-1.545-1.3-2.718-2.842-2.718c-.63 0-1.418.394-2.158 1.08c-.74-.686-1.528-1.08-2.158-1.08c-1.543 0-2.842 1.173-2.842 2.718c0 1.038.581 1.645 1.273 2.237l3.727 3.545z"/></g>',
		viewbox: '0 0 24 24'
	};

	const UserIcon = {
		body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="6" r="4"/><path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"/></g>',
		viewbox: '0 0 24 24'
	};

	const SettingsIcon = {
		body: '<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M13.765 2.152C13.398 2 12.932 2 12 2s-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.617 1.617 0 0 1-.79 1.353a1.617 1.617 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7s-.7 1.21-.627 1.495a2 2 0 0 0 .395 1.478c.177.216.39.39.714.545c.55.264.895.854.895 1.482s-.345 1.218-.895 1.482c-.324.155-.537.329-.714.545a2 2 0 0 0-.395 1.478c.073.285.307.688.774 1.495s.7 1.21 1.015 1.453a2 2 0 0 0 1.477.396c.242-.032.484-.13.82-.308a1.617 1.617 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.051.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22s1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.484.143-.863c.02-.558.307-1.074.79-1.353a1.617 1.617 0 0 1 1.567-.008c.336.178.579.276.82.308a2 2 0 0 0 1.478-.396c.315-.244.547-.646 1.014-1.453s.7-1.21.627-1.495a2 2 0 0 0-.395-1.478c-.177-.216-.39-.39-.714-.545a1.617 1.617 0 0 1-.895-1.482c0-.628.345-1.218.895-1.482c.324-.155.537-.329.714-.545a2 2 0 0 0 .395-1.478c-.073-.285-.307-.688-.774-1.495s-.7-1.21-1.015-1.453a2 2 0 0 0-1.477-.396c-.242.032-.484.13-.82.308a1.617 1.617 0 0 1-1.567-.008a1.617 1.617 0 0 1-.79-1.353c-.014-.38-.051-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"/></g>',
		viewbox: '0 0 24 24'
	};

	const AddIcon = {
		body: '<path fill="currentColor" d="M11.75 3a.75.75 0 0 1 .75.75v7.5h7.5a.75.75 0 0 1 0 1.5h-7.5v7.5a.75.75 0 0 1-1.5 0v-7.5h-7.5a.75.75 0 0 1 0-1.5h7.5v-7.5a.75.75 0 0 1 .75-.75"/>',
		viewbox: '0 0 24 24'
	};

	const bottomNavItems = [
		{ id: 'home', label: 'Home', icon: HomeIcon, isActive: true },
		{ id: 'favorites', label: 'Favorites', icon: HeartIcon, badge: 3 },
		{ id: 'add', icon: AddIcon, isFab: true, onclick: () => console.log('Add clicked') },
		{ id: 'profile', label: 'Profile', icon: UserIcon },
		{ id: 'settings', label: 'Settings', icon: SettingsIcon }
	];

	let { children } = $props();

	onMount(() => {
		if (Capacitor.isNativePlatform()) {
			StatusBar.setStyle({ style: Style.Light });
			StatusBar.setOverlaysWebView({ overlay: true });
		}
	});
</script>

<Provider>
	<Scaffold mainClass="mt-32 pb-16">
		{#snippet appBar()}
			<AppBar color="primary" variant="solid" contentClass="h-14" isSticky isBordered>
				{#snippet start()}
					<h4 class="font-semibold text-lg ml-2">UI Svelte </h4>
				{/snippet}
				{#snippet end()}
					<IconButton icon={SearchIcon} variant="ghost" color="muted" size="sm" />
					<IconButton icon={MoreVerticalIcon} variant="ghost" color="muted" size="sm" />
				{/snippet}
			</AppBar>
		{/snippet}

		{@render children()}

		{#snippet bottomBar()}
			<BottomNav 
				items={bottomNavItems} 
				color="surface" 
				fabColor="primary"
				activeStyle="pill"
				variant="blur"
				isBordered
			/>
		{/snippet}
	</Scaffold>
</Provider>
