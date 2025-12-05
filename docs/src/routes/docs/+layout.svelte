<script lang="ts">
	import {
		Form24RegularIcon,
		HandDraw24RegularIcon,
		LayoutRowTwoSplitBottom24RegularIcon,
		LayoutColumnOneThirdRight24RegularIcon,
		PersonChat24RegularIcon,
		StarArrowRightStart24RegularIcon,
		StreetSign24RegularIcon,
		LineHorizontal324RegularIcon,
		Heart24RegularIcon
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

	let { children } = $props();

	let drawerOpen = $state(false);

	$effect(() => {
		const root = document.documentElement;
		const colors = storeApp.themeColors;

		root.style.setProperty('--primary', colors.primary);
		root.style.setProperty('--on-primary', colors.onPrimary);
		root.style.setProperty('--secondary', colors.secondary);
		root.style.setProperty('--on-secondary', colors.onSecondary);
		root.style.setProperty('--muted', colors.muted);
		root.style.setProperty('--on-muted', colors.onMuted);
		root.style.setProperty('--success', colors.success);
		root.style.setProperty('--on-success', colors.onSuccess);
		root.style.setProperty('--info', colors.info);
		root.style.setProperty('--on-info', colors.onInfo);
		root.style.setProperty('--warning', colors.warning);
		root.style.setProperty('--on-warning', colors.onWarning);
		root.style.setProperty('--danger', colors.danger);
		root.style.setProperty('--on-danger', colors.onDanger);
		root.style.setProperty('--surface', colors.surface);
		root.style.setProperty('--on-surface', colors.onSurface);
	});

	const uiItems: any = [
		{
			type: 'header',
			icon: StarArrowRightStart24RegularIcon,
			label: 'Getting Started'
		},
		{
			label: 'Installation',
			href: '/docs/starter/install'
		},
		{
			label: 'Flex & Grid',
			href: '/docs/starter/flex-utilities'
		},
		{
			label: 'Icons',
			href: '/docs/starter/icons'
		},
		{
			label: 'LLM',
			href: '/docs/starter/llm'
		},
		{
			label: 'Typography',
			href: '/docs/starter/typography'
		},
		{
			label: 'Theme',
			href: '/docs/starter/theme'
		},
		{
			type: 'header',
			icon: LayoutRowTwoSplitBottom24RegularIcon,
			label: 'Layout'
		},
		{
			label: 'AppBar',
			href: '/docs/layout/app-bar'
		},
		{
			label: 'Footer',
			href: '/docs/layout/footer'
		},
		{
			label: 'Scaffold',
			href: '/docs/layout/scaffold'
		},
		{
			label: 'Sidebar',
			href: '/docs/layout/sidebar'
		},
		{
			type: 'header',
			icon: HandDraw24RegularIcon,
			label: 'Control'
		},
		{
			label: 'Button',
			href: '/docs/control/button'
		},
		{
			label: 'IconButton',
			href: '/docs/control/icon-button'
		},
		{
			label: 'Audio',
			href: '/docs/control/audio'
		},
		{
			label: 'Record',
			href: '/docs/control/record'
		},
		{
			label: 'Video',
			href: '/docs/control/video'
		},
		{
			type: 'header',
			icon: PersonChat24RegularIcon,
			label: 'Display'
		},
		{
			label: 'Accordion',
			href: '/docs/display/accordion'
		},
		{
			label: 'Alert',
			href: '/docs/display/alert'
		},
		{
			label: 'Avatar',
			href: '/docs/display/avatar'
		},
		{
			label: 'Card',
			href: '/docs/display/card'
		},
		{
			label: 'Carousel',
			href: '/docs/display/carousel'
		},
		{
			label: 'ChatBox',
			href: '/docs/display/chat-box'
		},
		{
			label: 'Code',
			href: '/docs/display/code'
		},
		{
			label: 'Collapsible',
			href: '/docs/display/collapsible'
		},
		{
			label: 'Empty',
			href: '/docs/display/empty'
		},
		{
			label: 'Icon',
			href: '/docs/display/icon'
		},
		{
			label: 'Item',
			href: '/docs/display/item'
		},
		{
			label: 'Marquee',
			href: '/docs/display/marquee'
		},
		{
			label: 'Section',
			href: '/docs/display/section'
		},
		{
			label: 'Table',
			href: '/docs/display/table'
		},
		{
			type: 'header',
			icon: Form24RegularIcon,
			label: 'Form'
		},
		{
			label: 'Checkbox',
			href: '/docs/form/checkbox'
		},
		{
			label: 'CsvField',
			href: '/docs/form/csv-field'
		},
		{
			label: 'DateField',
			href: '/docs/form/date-field'
		},
		{
			label: 'Dropzone',
			href: '/docs/form/dropzone'
		},
		{
			label: 'Form',
			href: '/docs/form/form'
		},
		{
			label: 'ImageCropper',
			href: '/docs/form/image-cropper'
		},
		{
			label: 'Select',
			href: '/docs/form/select'
		},
		{
			label: 'Slider',
			href: '/docs/form/slider'
		},
		{
			label: 'PhoneField',
			href: '/docs/form/phone-field'
		},
		{
			label: 'RadioGroup',
			href: '/docs/form/radio-group'
		},
		{
			label: 'Textarea',
			href: '/docs/form/textarea'
		},
		{
			label: 'TextField',
			href: '/docs/form/text-field'
		},
		{
			label: 'Toggle',
			href: '/docs/form/toggle'
		},
		{
			type: 'header',
			icon: LayoutColumnOneThirdRight24RegularIcon,
			label: 'Overlay'
		},
		{
			label: 'Drawer',
			href: '/docs/overlay/drawer'
		},
		{
			label: 'Dropdown',
			href: '/docs/overlay/dropdown'
		},
		{
			label: 'Modal',
			href: '/docs/overlay/modal'
		},
		{
			label: 'Toast',
			href: '/docs/overlay/toast'
		},
		{
			label: 'Tooltip',
			href: '/docs/overlay/tooltip'
		},
		{
			type: 'header',
			icon: StreetSign24RegularIcon,
			label: 'Navigation'
		},
		{
			label: 'Navmenu',
			href: '/docs/navigation/nav-menu'
		},
		{
			label: 'Tabs',
			href: '/docs/navigation/tabs'
		},
		{
			label: 'Sidenav',
			href: '/docs/navigation/sidenav'
		},
		{
			type: 'header',
			icon: LayoutColumnOneThirdRight24RegularIcon,
			label: 'Charts'
		},
		{
			label: 'Arc',
			href: '/docs/charts/arc'
		},
		{
			label: 'Area',
			href: '/docs/charts/area'
		},
		{
			label: 'Bar',
			href: '/docs/charts/bar'
		},
		{
			label: 'Candlestick',
			href: '/docs/charts/candlestick'
		},
		{
			label: 'Line',
			href: '/docs/charts/line'
		},
		{
			label: 'Pie',
			href: '/docs/charts/pie'
		}
	];

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

<Scaffold
	mainClass="lg:ml-48 vh-20 lg:p-4 mt-16 pb-16"
	startClass="invisible lg:visible vh-16 mt-16"
	bodyClass="boxed"
>
	{#snippet appBar()}
		<AppBar class="h-16" contentClass="boxed" isBlurred>
			{#snippet start()}
				<IconButton
					icon={LineHorizontal324RegularIcon}
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
			{/snippet}
		</AppBar>
	{/snippet}
	{#snippet start()}
		<Sidebar class="w-48 py-8">
			<SideNav items={uiItems} />
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
	<SideNav items={uiItems} />
</Drawer>
