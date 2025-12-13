<script lang="ts">
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import Color from '$lib/components/utils/Color.svelte';
	import { storeApp } from '$lib/store/store.svelte';
	import { Button, Card, Modal, Section, Alert, Code, Drawer } from 'ui-svelte';

	type ThemeColorKey = keyof typeof storeApp.themeColors;

	const themeColorPairs = [
		{
			key: 'primary',
			label: 'Primary',
			description: 'Main brand color for primary actions and emphasis'
		},
		{
			key: 'secondary',
			label: 'Secondary',
			description: 'Secondary brand color for supporting elements'
		},
		{
			key: 'muted',
			label: 'Muted',
			description: 'Subtle background color for less prominent elements'
		},
		{
			key: 'background',
			label: 'Background',
			description: 'Main background color for the application'
		},
		{
			key: 'success',
			label: 'Success',
			description: 'Indicates successful operations and positive states'
		},
		{ key: 'info', label: 'Info', description: 'Informational messages and neutral notifications' },
		{ key: 'warning', label: 'Warning', description: 'Warning messages and cautionary states' },
		{ key: 'danger', label: 'Danger', description: 'Error states and destructive actions' },
		{
			key: 'surface',
			label: 'Surface',
			description: 'Background color for cards and elevated surfaces'
		}
	];

	const darkThemeColorPairs = [
		{
			key: 'muted',
			label: 'Muted',
			description: 'Dark mode subtle background color'
		},
		{
			key: 'background',
			label: 'Background',
			description: 'Dark mode main background color'
		},
		{
			key: 'surface',
			label: 'Surface',
			description: 'Dark mode background for cards and elevated surfaces'
		}
	];

	let openColorPicker = $state(false);
	let selectedColorKey = $state<ThemeColorKey | keyof typeof storeApp.darkThemeColors>('primary');
	let selectedColorType = $state<'main' | 'on'>('main');
	let selectedColorMode = $state<'light' | 'dark'>('light');
	let showCssDrawer = $state(false);

	function openPicker(
		colorKey: ThemeColorKey | keyof typeof storeApp.darkThemeColors,
		type: 'main' | 'on',
		mode: 'light' | 'dark' = 'light'
	) {
		selectedColorKey = colorKey;
		selectedColorType = type;
		selectedColorMode = mode;
		openColorPicker = true;
	}

	function handleColorSelect(colorName: string, shade: number, colorValue: string) {
		if (selectedColorMode === 'dark') {
			const key =
				selectedColorType === 'main'
					? selectedColorKey
					: (`on${(selectedColorKey as string).charAt(0).toUpperCase()}${(selectedColorKey as string).slice(1)}` as keyof typeof storeApp.darkThemeColors);
			storeApp.setDarkThemeColor(key, colorValue);
		} else {
			const key =
				selectedColorType === 'main'
					? selectedColorKey
					: (`on${(selectedColorKey as string).charAt(0).toUpperCase()}${(selectedColorKey as string).slice(1)}` as ThemeColorKey);
			storeApp.setThemeColor(key as ThemeColorKey, colorValue);
		}
		openColorPicker = false;
	}

	function resetColors() {
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
	}

	function generateAppCss() {
		const colors = storeApp.themeColors;
		const darkColors = storeApp.darkThemeColors;
		return `@import 'tailwindcss';
@import 'ui-svelte/css';

@custom-variant dark (&:is(.dark *));

body {
	font-family: 'Montserrat Variable', sans-serif;
}

:root {
	--primary: ${colors.primary};
	--on-primary: ${colors.onPrimary};

	--secondary: ${colors.secondary};
	--on-secondary: ${colors.onSecondary};

	--muted: ${colors.muted};
	--on-muted: ${colors.onMuted};

	--background: ${colors.background};
	--on-background: ${colors.onBackground};

	--surface: ${colors.surface};
	--on-surface: ${colors.onSurface};

	--success: ${colors.success};
	--on-success: ${colors.onSuccess};

	--info: ${colors.info};
	--on-info: ${colors.onInfo};

	--warning: ${colors.warning};
	--on-warning: ${colors.onWarning};

	--danger: ${colors.danger};
	--on-danger: ${colors.onDanger};

	--radius-ui: 0.75rem;
	--scrollbar-size: 6px;
}

.dark {
	--muted: ${darkColors.muted};
	--on-muted: ${darkColors.onMuted};

	--background: ${darkColors.background};
	--on-background: ${darkColors.onBackground};

	--surface: ${darkColors.surface};
	--on-surface: ${darkColors.onSurface};
}`;
	}
</script>

<DocHeader title="Theme Colors">
	Customize your application's color palette using the interactive theme color system. Click on any
	color to change it and see the changes applied throughout the documentation in real-time.
</DocHeader>

<Section>
	<Card>
		<h3 class="text-lg font-semibold mb-4">Color Weight Guidelines</h3>
		<p class="text-sm text-on-muted mb-4">
			When selecting colors for your theme, follow these recommended weight patterns for optimal
			contrast and visual hierarchy:
		</p>

		<div class="space-y-4">
			<div>
				<h4 class="font-medium mb-2">Brand Colors (Primary, Secondary)</h4>
				<ul class="list-disc list-inside space-y-1 text-sm text-on-muted">
					<li>
						<strong>Main color:</strong> Use weight <code>600</code> (e.g., <code>blue-600</code>,
						<code>pink-600</code>)
					</li>
					<li>
						<strong>On color:</strong> Use weight <code>100</code> (e.g., <code>blue-100</code>,
						<code>pink-100</code>)
					</li>
				</ul>
			</div>

			<div>
				<h4 class="font-medium mb-2">Semantic Colors (Success, Info, Warning, Danger)</h4>
				<ul class="list-disc list-inside space-y-1 text-sm text-on-muted">
					<li>
						<strong>Main color:</strong> Use weight <code>600</code> (e.g.,
						<code>green-600</code>,
						<code>sky-600</code>, <code>yellow-600</code>, <code>red-600</code>)
					</li>
					<li>
						<strong>On color:</strong> Use weight <code>100</code> (e.g., <code>green-100</code>,
						<code>sky-100</code>, <code>yellow-100</code>, <code>red-100</code>)
					</li>
				</ul>
			</div>

			<div>
				<h4 class="font-medium mb-2">Neutral Colors (Surface, Background, Muted)</h4>
				<p class="text-sm text-on-muted mb-2">
					Use neutral tones: <code>slate</code>, <code>gray</code>, <code>zinc</code>,
					<code>neutral</code>, or <code>stone</code>
				</p>
				<ul class="list-disc list-inside space-y-1 text-sm text-on-muted">
					<li>
						<strong>Background:</strong> Use weight <code>50</code> for light mode,
						<code>950</code>
						for dark mode
					</li>
					<li>
						<strong>On Background:</strong> Use weight <code>900</code> for light mode,
						<code>100</code> for dark mode
					</li>
					<li>
						<strong>Surface:</strong> Use weight <code>100</code> for light mode, <code>900</code> for
						dark mode
					</li>
					<li>
						<strong>On Surface:</strong> Use weight <code>800</code> for light mode,
						<code>200</code>
						for dark mode
					</li>
					<li>
						<strong>Muted:</strong> Use weight <code>300</code> for light mode, <code>700</code> for dark
						mode
					</li>
					<li>
						<strong>On Muted:</strong> Use weight <code>700</code> for light mode,
						<code>300</code>
						for dark mode
					</li>
				</ul>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Alert status="info">
		<strong>Interactive Theme Customization:</strong> Click on any color below to open the color picker.
		Your changes will be applied immediately throughout the entire application. Use the "Generate CSS"
		button to export your customized theme, or "Reset Colors" to restore default values.
	</Alert>

	<div class="flex justify-end gap-2 mb-4">
		<Button variant="outlined" size="sm" onclick={() => (showCssDrawer = true)}>Generate CSS</Button
		>
		<Button variant="outlined" size="sm" onclick={resetColors}>Reset Colors</Button>
	</div>

	<Card>
		<div class="grid gap-6">
			{#each themeColorPairs as colorPair}
				{@const mainKey = colorPair.key as ThemeColorKey}
				{@const onKey =
					`on${colorPair.key.charAt(0).toUpperCase()}${colorPair.key.slice(1)}` as ThemeColorKey}
				<div class="border-b border-muted last:border-b-0 pb-6 last:pb-0">
					<div class="mb-3">
						<h3 class="text-base font-semibold">{colorPair.label}</h3>
						<p class="text-xs text-on-muted">{colorPair.description}</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'main')}
								class="size-16 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0"
								style="background-color: {storeApp.themeColors[mainKey]}; color: {storeApp
									.themeColors[onKey]};"
								title="Click to customize {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<div class="flex items-center justify-between mb-1">
									<span class="text-xs font-medium">{colorPair.label}</span>
									<Button onclick={() => openPicker(mainKey, 'main')} variant="ghost" size="xs">
										Change
									</Button>
								</div>
								<Code code={storeApp.themeColors[mainKey]} lang="css" />
							</div>
						</div>

						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'on')}
								class="size-16 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0"
								style="background-color: {storeApp.themeColors[onKey]}; color: {storeApp
									.themeColors[mainKey]};"
								title="Click to customize On {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<div class="flex items-center justify-between mb-1">
									<span class="text-xs font-medium">On {colorPair.label}</span>
									<Button onclick={() => openPicker(mainKey, 'on')} variant="ghost" size="xs">
										Change
									</Button>
								</div>
								<Code code={storeApp.themeColors[onKey]} lang="css" />
							</div>
						</div>
					</div>

					<div
						class="mt-3 p-3 rounded-lg text-center"
						style="background-color: {storeApp.themeColors[mainKey]}; color: {storeApp.themeColors[
							onKey
						]};"
					>
						<p class="text-xs font-medium">
							Example: {colorPair.label} with On-{colorPair.label} text
						</p>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<h2 class="text-2xl font-bold mb-4">Dark Mode Colors</h2>
	<Alert status="info">
		<strong>Dark Mode Specific Colors:</strong> These colors are only applied when dark mode is active.
		Toggle dark mode using the button in the top right to see your changes.
	</Alert>

	<Card>
		<div class="grid gap-6">
			{#each darkThemeColorPairs as colorPair}
				{@const mainKey = colorPair.key as keyof typeof storeApp.darkThemeColors}
				{@const onKey =
					`on${colorPair.key.charAt(0).toUpperCase()}${colorPair.key.slice(1)}` as keyof typeof storeApp.darkThemeColors}
				<div class="border-b border-muted last:border-b-0 pb-6 last:pb-0">
					<div class="mb-3">
						<h3 class="text-base font-semibold">{colorPair.label}</h3>
						<p class="text-xs text-on-muted">{colorPair.description}</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'main', 'dark')}
								class="size-16 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0"
								style="background-color: {storeApp.darkThemeColors[mainKey]}; color: {storeApp
									.darkThemeColors[onKey]};"
								title="Click to customize {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<div class="flex items-center justify-between mb-1">
									<span class="text-xs font-medium">{colorPair.label}</span>
									<Button
										onclick={() => openPicker(mainKey, 'main', 'dark')}
										variant="ghost"
										size="xs"
									>
										Change
									</Button>
								</div>
								<Code code={storeApp.darkThemeColors[mainKey]} lang="css" />
							</div>
						</div>

						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'on', 'dark')}
								class="size-16 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0"
								style="background-color: {storeApp.darkThemeColors[onKey]}; color: {storeApp
									.darkThemeColors[mainKey]};"
								title="Click to customize On {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<div class="flex items-center justify-between mb-1">
									<span class="text-xs font-medium">On {colorPair.label}</span>
									<Button
										onclick={() => openPicker(mainKey, 'on', 'dark')}
										variant="ghost"
										size="xs"
									>
										Change
									</Button>
								</div>
								<Code code={storeApp.darkThemeColors[onKey]} lang="css" />
							</div>
						</div>
					</div>

					<div
						class="mt-3 p-3 rounded-lg text-center"
						style="background-color: {storeApp.darkThemeColors[mainKey]}; color: {storeApp
							.darkThemeColors[onKey]};"
					>
						<p class="text-xs font-medium">
							Example: {colorPair.label} with On-{colorPair.label} text
						</p>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<Card>
		<h3 class="text-lg font-semibold mb-4">How to Use Theme Colors</h3>

		<div class="space-y-4">
			<div>
				<h4 class="font-medium mb-2">In CSS/Tailwind Classes</h4>
				<Code
					code={'<div class="bg-primary text-on-primary">Primary Button</div>'}
					lang="html"
					showCopy
				/>
			</div>

			<div>
				<h4 class="font-medium mb-2">In CSS Custom Properties</h4>
				<Code
					code={'.my-element {\n  background-color: var(--primary);\n  color: var(--on-primary);\n}'}
					lang="css"
					showCopy
				/>
			</div>

			<div>
				<h4 class="font-medium mb-2">Available Theme Colors</h4>
				<ul class="list-disc list-inside space-y-1 text-sm">
					<li><code>primary</code> / <code>on-primary</code> - Main brand color</li>
					<li><code>secondary</code> / <code>on-secondary</code> - Secondary brand color</li>
					<li><code>muted</code> / <code>on-muted</code> - Subtle backgrounds</li>
					<li><code>success</code> / <code>on-success</code> - Success states</li>
					<li><code>info</code> / <code>on-info</code> - Informational states</li>
					<li><code>warning</code> / <code>on-warning</code> - Warning states</li>
					<li><code>danger</code> / <code>on-danger</code> - Error/danger states</li>
					<li><code>surface</code> / <code>on-surface</code> - Card backgrounds</li>
				</ul>
			</div>
		</div>
	</Card>
</Section>

<Modal bind:open={openColorPicker}>
	<Color onColorSelect={handleColorSelect} />
</Modal>

<Drawer bind:open={showCssDrawer} position="end" onclose={() => (showCssDrawer = false)}>
	{#snippet header()}
		<h3 class="text-lg font-semibold">Generated app.css</h3>
		<p class="text-sm text-on-muted mt-1">
			Copy this CSS file to your <code>src/app.css</code> to apply your custom theme colors
		</p>
	{/snippet}

	<Code code={generateAppCss()} lang="css" showCopy />
</Drawer>
