import {
	ArrowSyncCheckmarkRegularIcon,
	Form24RegularIcon,
	HandDraw24RegularIcon,
	LayoutColumnOneThirdRight24RegularIcon,
	LayoutRowTwoSplitBottom24RegularIcon,
	PersonChat24RegularIcon,
	StarArrowRightStart24RegularIcon,
	StreetSign24RegularIcon
} from '$lib/icons';
import type { SideNavItem } from 'ui-svelte';

export const sideMenuItems: SideNavItem[] = [
	{
		type: 'submenu',
		icon: StarArrowRightStart24RegularIcon,
		label: 'Getting Started',
		open: true,
		subitems: [
			{
				label: 'Installation',
				href: '/docs/starter/install'
			},
			{
				label: 'Flex & Grid',
				href: '/docs/starter/flex-grid'
			},
			{
				label: 'I18n',
				href: '/docs/starter/i18n'
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
				label: 'Provider',
				href: '/docs/starter/provider'
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
				label: 'Mobile',
				href: '/docs/starter/mobile'
			},
			{
				label: 'Desktop',
				href: '/docs/starter/desktop'
			}
		]
	},
	{
		type: 'submenu',
		icon: HandDraw24RegularIcon,
		label: 'Control',
		open: true,
		subitems: [
			{
				label: 'Audio',
				href: '/docs/control/audio'
			},
			{
				label: 'Button',
				href: '/docs/control/button'
			},
			{
				label: 'Fab',
				href: '/docs/control/fab'
			},
			{
				label: 'IconButton',
				href: '/docs/control/icon-button'
			},
			{
				label: 'Image',
				href: '/docs/control/image'
			},
			{
				label: 'Record',
				href: '/docs/control/record'
			},
			{
				label: 'ToggleGroup',
				href: '/docs/control/toggle-group'
			},
			{
				label: 'Video',
				href: '/docs/control/video'
			}
		]
	},
	{
		type: 'submenu',
		icon: PersonChat24RegularIcon,
		label: 'Display',
		open: true,
		subitems: [
			{
				label: 'Accordion',
				href: '/docs/display/accordion'
			},
			{
				label: 'Alert',
				href: '/docs/display/alert'
			},
			{
				label: 'Animations',
				href: '/docs/display/animations'
			},
			{
				label: 'Avatar',
				href: '/docs/display/avatar'
			},
			{
				label: 'AvatarGroup',
				href: '/docs/display/avatar-group'
			},
			{
				label: 'Badge',
				href: '/docs/display/badge'
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
				label: 'Chip',
				href: '/docs/display/chip'
			},
			{
				label: 'Collapsible',
				href: '/docs/display/collapsible'
			},
			{
				label: 'Decorations',
				href: '/docs/display/decorations'
			},
			{
				label: 'Countdown',
				href: '/docs/display/countdown'
			},
			{
				label: 'Divider',
				href: '/docs/display/divider'
			},
			{
				label: 'Empty',
				href: '/docs/display/empty'
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
				label: 'Map',
				href: '/docs/display/map'
			},
			{
				label: 'RichText',
				href: '/docs/display/rich-text'
			},
			{
				label: 'Section',
				href: '/docs/display/section'
			},
			{
				label: 'Skeleton',
				href: '/docs/display/skeleton'
			},
			{
				label: 'Table',
				href: '/docs/display/table'
			}
		]
	},
	{
		type: 'submenu',
		icon: Form24RegularIcon,
		label: 'Form',
		open: true,
		subitems: [
			{
				label: 'Checkbox',
				href: '/docs/form/checkbox'
			},
			{
				label: 'ColorField',
				href: '/docs/form/color-field'
			},
			{
				label: 'ComboBox',
				href: '/docs/form/combo-box'
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
				label: 'DateRange',
				href: '/docs/form/date-range'
			},
			{
				label: 'DragDrop',
				href: '/docs/form/drag-drop'
			},
			{
				label: 'Dropzone',
				href: '/docs/form/dropzone'
			},
			{
				label: 'Editor',
				href: '/docs/form/editor'
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
				label: 'PasswordField',
				href: '/docs/form/password-field'
			},
			{
				label: 'PhoneField',
				href: '/docs/form/phone-field'
			},
			{
				label: 'PinField',
				href: '/docs/form/pin-field'
			},
			{
				label: 'RadioGroup',
				href: '/docs/form/radio-group'
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
			}
		]
	},
	{
		type: 'submenu',
		icon: LayoutColumnOneThirdRight24RegularIcon,
		label: 'Overlay',
		open: true,
		subitems: [
			{
				label: 'AlertDialog',
				href: '/docs/overlay/alert-dialog'
			},
			{
				label: 'Command',
				href: '/docs/overlay/command'
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
			}
		]
	},
	{
		type: 'submenu',
		icon: LayoutRowTwoSplitBottom24RegularIcon,
		label: 'Layout',
		open: true,
		subitems: [
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
			}
		]
	},
	{
		type: 'submenu',
		icon: StreetSign24RegularIcon,
		label: 'Navigation',
		open: true,
		subitems: [
			{
				label: 'BottomNav',
				href: '/docs/navigation/bottom-nav'
			},
			{
				label: 'Navmenu',
				href: '/docs/navigation/nav-menu'
			},
			{
				label: 'Pagination',
				href: '/docs/navigation/pagination'
			},
			{
				label: 'Sidenav',
				href: '/docs/navigation/sidenav'
			},
			{
				label: 'Tabs',
				href: '/docs/navigation/tabs'
			}
		]
	},
	{
		type: 'submenu',
		icon: LayoutColumnOneThirdRight24RegularIcon,
		label: 'Charts',
		open: true,
		subitems: [
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
		]
	},
	{
		type: 'submenu',
		icon: ArrowSyncCheckmarkRegularIcon,
		label: 'Hooks',
		open: true,
		subitems: [
			{
				label: 'useBreakpoint',
				href: '/docs/hooks/use-breakpoint'
			}
		]
	}
];
