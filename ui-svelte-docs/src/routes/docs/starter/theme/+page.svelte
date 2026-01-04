<script lang="ts">
	import { Card, Code, Section, Tabs, Button, Modal, Drawer, Alert, ColorField } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import Color from '$lib/components/utils/Color.svelte';
	import { storeApp } from '$lib/store/store.svelte';

	type ThemeColorKey = keyof typeof storeApp.themeColors;

	const themeColorPairs = [
		{
			key: 'onDark',
			label: 'On Dark',
			description: 'Text color used on dark backgrounds (primary, secondary, success, etc.)'
		},
		{
			key: 'onLight',
			label: 'On Light',
			description: 'Text color used on light backgrounds (muted, background, surface, warning)'
		},
		{
			key: 'primary',
			label: 'Primary',
			description: 'Main brand color for primary actions and emphasis'
		},
		{
			key: 'softPrimary',
			label: 'Soft Primary',
			description: 'Soft variant of primary for backgrounds and subtle emphasis'
		},
		{
			key: 'secondary',
			label: 'Secondary',
			description: 'Secondary brand color for supporting elements'
		},
		{
			key: 'softSecondary',
			label: 'Soft Secondary',
			description: 'Soft variant of secondary for backgrounds and subtle emphasis'
		},
		{
			key: 'muted',
			label: 'Muted',
			description: 'Subtle background color for less prominent elements'
		},
		{
			key: 'softMuted',
			label: 'Soft Muted',
			description: 'Softer variant of muted for very subtle backgrounds'
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
		{
			key: 'softSuccess',
			label: 'Soft Success',
			description: 'Soft variant of success for backgrounds and subtle indicators'
		},
		{ key: 'info', label: 'Info', description: 'Informational messages and neutral notifications' },
		{
			key: 'softInfo',
			label: 'Soft Info',
			description: 'Soft variant of info for backgrounds and subtle indicators'
		},
		{ key: 'warning', label: 'Warning', description: 'Warning messages and cautionary states' },
		{
			key: 'softWarning',
			label: 'Soft Warning',
			description: 'Soft variant of warning for backgrounds and subtle indicators'
		},
		{ key: 'danger', label: 'Danger', description: 'Error states and destructive actions' },
		{
			key: 'softDanger',
			label: 'Soft Danger',
			description: 'Soft variant of danger for backgrounds and subtle indicators'
		},
		{
			key: 'surface',
			label: 'Surface',
			description: 'Background color for cards and elevated surfaces'
		}
	];

	const darkThemeColorPairs = [
		{
			key: 'secondary',
			label: 'Secondary',
			description: 'Dark mode secondary color'
		},
		{
			key: 'softSecondary',
			label: 'Soft Secondary',
			description: 'Dark mode soft secondary color'
		},
		{
			key: 'muted',
			label: 'Muted',
			description: 'Dark mode subtle background color'
		},
		{
			key: 'softMuted',
			label: 'Soft Muted',
			description: 'Dark mode softer muted color'
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
	let selectedColorMode = $state<'light' | 'dark'>('light');
	let showCssDrawer = $state(false);
	let customColorOklch = $state('');

	function openPicker(
		colorKey: ThemeColorKey | keyof typeof storeApp.darkThemeColors,
		mode: 'light' | 'dark' = 'light'
	) {
		selectedColorKey = colorKey;
		selectedColorMode = mode;
		if (mode === 'dark') {
			customColorOklch =
				storeApp.darkThemeColors[colorKey as keyof typeof storeApp.darkThemeColors];
		} else {
			customColorOklch = storeApp.themeColors[colorKey as ThemeColorKey];
		}
		openColorPicker = true;
	}

	function handleColorSelect(colorName: string, shade: number, colorValue: string) {
		if (selectedColorMode === 'dark') {
			storeApp.setDarkThemeColor(
				selectedColorKey as keyof typeof storeApp.darkThemeColors,
				colorValue
			);
		} else {
			storeApp.setThemeColor(selectedColorKey as ThemeColorKey, colorValue);
		}
		openColorPicker = false;
	}

	function handleCustomColorSelect() {
		if (!customColorOklch) return;
		if (selectedColorMode === 'dark') {
			storeApp.setDarkThemeColor(
				selectedColorKey as keyof typeof storeApp.darkThemeColors,
				customColorOklch
			);
		} else {
			storeApp.setThemeColor(selectedColorKey as ThemeColorKey, customColorOklch);
		}
		openColorPicker = false;
	}

	function resetColors() {
		storeApp.setThemeColor('onDark', 'oklch(97% 0.01 90)');
		storeApp.setThemeColor('onLight', 'oklch(25% 0.01 30)');
		storeApp.setThemeColor('primary', 'oklch(75% 0.15 145)');
		storeApp.setThemeColor('softPrimary', 'oklch(97% 0.01 145)');
		storeApp.setThemeColor('secondary', 'oklch(28.42% 0.0467 259.99)');
		storeApp.setThemeColor('softSecondary', 'oklch(92% 0.005 30)');
		storeApp.setThemeColor('muted', 'oklch(87.2% 0.01 258.338)');
		storeApp.setThemeColor('softMuted', 'oklch(94% 0.005 258.338)');
		storeApp.setThemeColor('background', 'oklch(96% 0.005 85)');
		storeApp.setThemeColor('surface', 'oklch(98% 0.003 85)');
		storeApp.setThemeColor('success', 'oklch(62.7% 0.194 149.214)');
		storeApp.setThemeColor('softSuccess', 'oklch(95% 0.06 149.214)');
		storeApp.setThemeColor('info', 'oklch(58.8% 0.158 241.966)');
		storeApp.setThemeColor('softInfo', 'oklch(95% 0.05 241.966)');
		storeApp.setThemeColor('warning', 'oklch(68.1% 0.162 75.834)');
		storeApp.setThemeColor('softWarning', 'oklch(96% 0.05 75.834)');
		storeApp.setThemeColor('danger', 'oklch(57.7% 0.245 27.325)');
		storeApp.setThemeColor('softDanger', 'oklch(95% 0.07 27.325)');

		storeApp.setDarkThemeColor('secondary', 'oklch(97% 0.01 90)');
		storeApp.setDarkThemeColor('softSecondary', 'oklch(28% 0.015 259.99)');
		storeApp.setDarkThemeColor('muted', 'oklch(37.3% 0.034 259.733)');
		storeApp.setDarkThemeColor('softMuted', 'oklch(28% 0.02 259.733)');
		storeApp.setDarkThemeColor('background', 'oklch(13% 0.028 261.692)');
		storeApp.setDarkThemeColor('surface', 'oklch(21% 0.034 264.665)');
	}

	function generateAppCss() {
		const colors = storeApp.themeColors;
		const darkColors = storeApp.darkThemeColors;
		return `@import 'tailwindcss';
@import 'ui-svelte/css';

:root {
	--on-dark: ${colors.onDark};
	--on-light: ${colors.onLight};

	--primary: ${colors.primary};
	--soft-primary: ${colors.softPrimary};
	--on-primary: var(--on-light);

	--secondary: ${colors.secondary};
	--soft-secondary: ${colors.softSecondary};
	--on-secondary: var(--on-dark);

	--muted: ${colors.muted};
	--soft-muted: ${colors.softMuted};
	--on-muted: var(--on-light);

	--background: ${colors.background};
	--on-background: var(--on-light);

	--surface: ${colors.surface};
	--on-surface: var(--on-light);

	--success: ${colors.success};
	--soft-success: ${colors.softSuccess};
	--on-success: var(--on-dark);

	--info: ${colors.info};
	--soft-info: ${colors.softInfo};
	--on-info: var(--on-dark);

	--warning: ${colors.warning};
	--soft-warning: ${colors.softWarning};
	--on-warning: var(--on-dark);

	--danger: ${colors.danger};
	--soft-danger: ${colors.softDanger};
	--on-danger: var(--on-dark);

	--overlay: oklch(0 0 0 / 60%);
	--on-overlay: var(--on-dark);

	--radius-avatar: calc(infinity * 1px);
	--radius-box: 0.75rem;
	--radius-ui: 0.75rem;

	--scrollbar-size: 6px;
}

.dark {
	--secondary: ${darkColors.secondary};
	--soft-secondary: ${darkColors.softSecondary};
	--on-secondary: var(--on-light);

	--muted: ${darkColors.muted};
	--soft-muted: ${darkColors.softMuted};
	--on-muted: var(--on-dark);

	--background: ${darkColors.background};
	--on-background: var(--on-dark);

	--surface: ${darkColors.surface};
	--on-surface: var(--on-dark);
}`;
	}

	const colorVariables = [
		{ variable: '--on-dark', description: 'Text/icon color for use on dark backgrounds' },
		{ variable: '--on-light', description: 'Text/icon color for use on light backgrounds' },
		{ variable: '--primary', description: 'Main brand color for primary actions' },
		{ variable: '--secondary', description: 'Secondary brand color for supporting elements' },
		{ variable: '--muted', description: 'Subtle background for less prominent elements' },
		{ variable: '--background', description: 'Main application background color' },
		{ variable: '--surface', description: 'Background for cards and elevated surfaces' },
		{ variable: '--success', description: 'Success states and positive feedback' },
		{ variable: '--info', description: 'Informational messages and neutral states' },
		{ variable: '--warning', description: 'Warning messages and cautionary states' },
		{ variable: '--danger', description: 'Error states and destructive actions' }
	];

	const guidelinesTabs = [
		{ id: 'brand', label: 'Brand Colors', content: brandGuidelinesContent },
		{ id: 'semantic', label: 'Semantic Colors', content: semanticGuidelinesContent },
		{ id: 'neutral', label: 'Neutral Colors', content: neutralGuidelinesContent }
	];
</script>

{#snippet brandGuidelinesContent()}
	<div class="column gap-4">
		<h4 class="font-medium">Brand Colors (Primary, Secondary)</h4>
		<ul class="list-disc list-inside space-y-2 text-sm text-on-muted">
			<li>
				<strong>Main color:</strong> Use weight
				<code class="px-1 py-0.5 bg-muted rounded">600</code>
				(e.g., <code class="px-1 py-0.5 bg-muted rounded">blue-600</code>,
				<code class="px-1 py-0.5 bg-muted rounded">pink-600</code>)
			</li>
			<li>
				<strong>Soft color:</strong> Use weight
				<code class="px-1 py-0.5 bg-muted rounded">100</code>
				(e.g., <code class="px-1 py-0.5 bg-muted rounded">blue-100</code>,
				<code class="px-1 py-0.5 bg-muted rounded">pink-100</code>) for subtle backgrounds
			</li>
			<li>
				<strong>On color:</strong> Use <code class="px-1 py-0.5 bg-muted rounded">--on-light</code>
				or <code class="px-1 py-0.5 bg-muted rounded">--on-dark</code> based on background
			</li>
		</ul>
		<div class="grid-2 gap-2 mt-2">
			<div class="column gap-2">
				<div class="p-4 bg-primary text-on-primary rounded center">Primary</div>
				<div class="p-3 bg-soft-primary text-on-light rounded center text-sm">Soft Primary</div>
			</div>
			<div class="column gap-2">
				<div class="p-4 bg-secondary text-on-secondary rounded center">Secondary</div>
				<div class="p-3 bg-soft-secondary text-on-light dark:text-on-dark rounded center text-sm">
					Soft Secondary
				</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet semanticGuidelinesContent()}
	<div class="column gap-4">
		<h4 class="font-medium">Semantic Colors (Success, Info, Warning, Danger)</h4>
		<ul class="list-disc list-inside space-y-2 text-sm text-on-muted">
			<li>
				<strong>Main color:</strong> Use weight
				<code class="px-1 py-0.5 bg-muted rounded">600</code>
				(e.g., <code class="px-1 py-0.5 bg-muted rounded">green-600</code>,
				<code class="px-1 py-0.5 bg-muted rounded">red-600</code>)
			</li>
			<li>
				<strong>Soft color:</strong> Use weight
				<code class="px-1 py-0.5 bg-muted rounded">100</code>
				(e.g., <code class="px-1 py-0.5 bg-muted rounded">green-100</code>) for alert backgrounds
			</li>
			<li>
				<strong>On color:</strong> Use <code class="px-1 py-0.5 bg-muted rounded">--on-dark</code>
				for main, <code class="px-1 py-0.5 bg-muted rounded">--on-light</code> for soft
			</li>
		</ul>
		<div class="grid-4 gap-2 mt-2">
			<div class="column gap-2">
				<div class="p-3 bg-success text-on-success rounded center text-sm">Success</div>
				<div class="p-2 bg-soft-success text-on-light rounded center text-xs">Soft</div>
			</div>
			<div class="column gap-2">
				<div class="p-3 bg-info text-on-info rounded center text-sm">Info</div>
				<div class="p-2 bg-soft-info text-on-light rounded center text-xs">Soft</div>
			</div>
			<div class="column gap-2">
				<div class="p-3 bg-warning text-on-warning rounded center text-sm">Warning</div>
				<div class="p-2 bg-soft-warning text-on-light rounded center text-xs">Soft</div>
			</div>
			<div class="column gap-2">
				<div class="p-3 bg-danger text-on-danger rounded center text-sm">Danger</div>
				<div class="p-2 bg-soft-danger text-on-light rounded center text-xs">Soft</div>
			</div>
		</div>
	</div>
{/snippet}

{#snippet neutralGuidelinesContent()}
	<div class="column gap-4">
		<h4 class="font-medium">Neutral Colors (Surface, Background, Muted)</h4>
		<p class="text-sm text-on-muted">
			Use neutral tones: <code class="px-1 py-0.5 bg-muted rounded">slate</code>,
			<code class="px-1 py-0.5 bg-muted rounded">gray</code>,
			<code class="px-1 py-0.5 bg-muted rounded">zinc</code>,
			<code class="px-1 py-0.5 bg-muted rounded">neutral</code>, or
			<code class="px-1 py-0.5 bg-muted rounded">stone</code>
		</p>
		<ul class="list-disc list-inside space-y-2 text-sm text-on-muted">
			<li>
				<strong>Background:</strong> Weight <code class="px-1 py-0.5 bg-muted rounded">50</code>
				(light) / <code class="px-1 py-0.5 bg-muted rounded">950</code> (dark)
			</li>
			<li>
				<strong>Surface:</strong> Weight <code class="px-1 py-0.5 bg-muted rounded">100</code>
				(light) / <code class="px-1 py-0.5 bg-muted rounded">900</code> (dark)
			</li>
			<li>
				<strong>Muted:</strong> Weight <code class="px-1 py-0.5 bg-muted rounded">300</code> (light)
				/ <code class="px-1 py-0.5 bg-muted rounded">700</code> (dark)
			</li>
			<li>
				<strong>Soft Muted:</strong> Weight <code class="px-1 py-0.5 bg-muted rounded">200</code>
				(light) / <code class="px-1 py-0.5 bg-muted rounded">800</code> (dark) for subtler backgrounds
			</li>
		</ul>
		<div class="grid-3 gap-2 mt-2">
			<div class="p-3 bg-background text-on-background rounded center text-sm border border-muted">
				Background
			</div>
			<div class="p-3 bg-surface text-on-surface rounded center text-sm">Surface</div>
			<div class="column gap-2">
				<div class="p-3 bg-muted text-on-muted rounded center text-sm">Muted</div>
				<div class="p-2 bg-soft-muted text-on-light dark:text-on-dark rounded center text-xs">
					Soft Muted
				</div>
			</div>
		</div>
	</div>
{/snippet}

<DocsHeader title="Theme">
	Customize your application's color palette using CSS variables. The theme system provides semantic
	color tokens for consistent styling across all components.
</DocsHeader>

<Section>
	<Card color="background" variant="outlined">
		<div class="row gap-2 mb-4">
			<Button variant="outlined" size="sm" onclick={() => (showCssDrawer = true)}
				>Generate CSS</Button
			>
			<Button variant="outlined" size="sm" onclick={resetColors}>Reset Colors</Button>
		</div>

		<div class="doc-preview">
			<div class="column gap-4 w-full">
				<div class="grid-2 gap-3">
					<div class="column gap-2">
						<div class="p-4 bg-primary text-on-primary rounded-lg center">Primary</div>
						<div class="p-3 bg-soft-primary text-on-light rounded-lg center text-sm">
							Soft Primary
						</div>
					</div>
					<div class="column gap-2">
						<div class="p-4 bg-secondary text-on-secondary rounded-lg center">Secondary</div>
						<div
							class="p-3 bg-soft-secondary text-on-light dark:text-on-dark rounded-lg center text-sm"
						>
							Soft Secondary
						</div>
					</div>
				</div>
				<div class="grid-4 gap-2">
					<div class="column gap-2">
						<div class="p-3 bg-success text-on-success rounded center text-sm">Success</div>
						<div class="p-2 bg-soft-success text-on-light rounded center text-xs">Soft</div>
					</div>
					<div class="column gap-2">
						<div class="p-3 bg-info text-on-info rounded center text-sm">Info</div>
						<div class="p-2 bg-soft-info text-on-light rounded center text-xs">Soft</div>
					</div>
					<div class="column gap-2">
						<div class="p-3 bg-warning text-on-warning rounded center text-sm">Warning</div>
						<div class="p-2 bg-soft-warning text-on-light rounded center text-xs">Soft</div>
					</div>
					<div class="column gap-2">
						<div class="p-3 bg-danger text-on-danger rounded center text-sm">Danger</div>
						<div class="p-2 bg-soft-danger text-on-light rounded center text-xs">Soft</div>
					</div>
				</div>
				<div class="grid-3 gap-2">
					<div class="p-3 bg-surface text-on-surface rounded center text-sm border border-muted">
						Surface
					</div>
					<div class="column gap-2">
						<div class="p-3 bg-muted text-on-muted rounded center text-sm">Muted</div>
						<div class="p-2 bg-soft-muted text-on-light dark:text-on-dark rounded center text-xs">
							Soft Muted
						</div>
					</div>
					<div
						class="p-3 bg-background text-on-background rounded center text-sm border border-muted"
					>
						Background
					</div>
				</div>
			</div>
		</div>
		<Code
			lang="svelte"
			code={`<div class="bg-primary text-on-primary">
	Primary styled element
</div>

<div class="bg-success text-on-success">
	Success message
</div>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Color Guidelines</p>
	<Card color="background" variant="outlined">
		<Tabs tabs={guidelinesTabs} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Light Mode Colors</p>
	<Card color="background" variant="outlined">
		<div class="grid gap-4">
			{#each themeColorPairs as colorPair}
				{@const mainKey = colorPair.key as ThemeColorKey}
				<div class="border-b border-muted last:border-b-0 pb-4 last:pb-0">
					<div class="mb-2">
						<h5 class="text-sm font-semibold">{colorPair.label}</h5>
						<p class="text-xs text-on-muted">{colorPair.description}</p>
					</div>

					<div class="flex items-center gap-3">
						<button
							onclick={() => openPicker(mainKey)}
							class="size-12 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0 cursor-pointer"
							style="background-color: {storeApp.themeColors[mainKey]};"
							title="Click to customize {colorPair.label}"
						>
						</button>
						<div class="flex-1 min-w-0">
							<span class="text-xs font-medium">{colorPair.label}</span>
							<Code code={storeApp.themeColors[mainKey]} lang="css" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Dark Mode Colors</p>
	<Card color="background" variant="outlined">
		<Alert color="info">
			Toggle dark mode using the button in the top navigation to see your changes.
		</Alert>
		<div class="grid gap-4 mt-4">
			{#each darkThemeColorPairs as colorPair}
				{@const mainKey = colorPair.key as keyof typeof storeApp.darkThemeColors}
				<div class="border-b border-muted last:border-b-0 pb-4 last:pb-0">
					<div class="mb-2">
						<h5 class="text-sm font-semibold">{colorPair.label}</h5>
						<p class="text-xs text-on-muted">{colorPair.description}</p>
					</div>

					<div class="flex items-center gap-3">
						<button
							onclick={() => openPicker(mainKey, 'dark')}
							class="size-12 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0 cursor-pointer"
							style="background-color: {storeApp.darkThemeColors[mainKey]};"
							title="Click to customize {colorPair.label}"
						>
						</button>
						<div class="flex-1 min-w-0">
							<span class="text-xs font-medium">{colorPair.label}</span>
							<Code code={storeApp.darkThemeColors[mainKey]} lang="css" />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">CSS Variables Reference</p>
	<Card color="background" variant="outlined">
		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Variable</th>
						<th class="text-left p-3 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody>
					{#each colorVariables as variable}
						<tr class="border-b border-muted-100">
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{variable.variable}</code></td
							>
							<td class="p-3 text-sm">{variable.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Usage Examples</p>
	<Card color="background" variant="outlined">
		<Code
			lang="svelte"
			code={`<!-- Using Tailwind Classes -->
<div class="bg-primary text-on-primary p-4 rounded-ui">
	Primary styled button
</div>

<!-- Semantic Colors -->
<div class="bg-success text-on-success">Success message</div>
<div class="bg-warning text-on-warning">Warning alert</div>
<div class="bg-danger text-on-danger">Error state</div>

<!-- Using CSS Variables -->
<style>
.custom-element {
	background-color: var(--primary);
	color: var(--on-primary);
	border-radius: var(--radius-ui);
}
</style>

<!-- Surface and Background -->
<div class="bg-surface text-on-surface p-4 rounded-ui">
	Card content on surface
</div>

<div class="bg-muted text-on-muted p-2 rounded-ui">
	Subtle muted section
</div>`}
		/>
	</Card>
</Section>

{#snippet tailwindPickerContent()}
	<Color onColorSelect={handleColorSelect} />
{/snippet}

{#snippet customPickerContent()}
	<div class="column gap-4 p-4">
		<p class="text-sm text-on-muted">
			Enter a custom color using the color picker. The OKLCH value will be used.
		</p>
		{#key selectedColorKey + selectedColorMode}
			<ColorField bind:oklch={customColorOklch} showOklch label="Custom Color" isFloatLabel />
		{/key}
		<Button onclick={handleCustomColorSelect} isDisabled={!customColorOklch}>Apply Color</Button>
	</div>
{/snippet}

<Modal bind:open={openColorPicker}>
	<Tabs
		tabs={[
			{ id: 'tailwind', label: 'Tailwind Colors', content: tailwindPickerContent },
			{ id: 'custom', label: 'Custom Color', content: customPickerContent }
		]}
	/>
</Modal>

<Drawer bind:open={showCssDrawer} position="end" onclose={() => (showCssDrawer = false)}>
	{#snippet header()}
		<h3 class="text-lg font-semibold">Generated app.css</h3>
		<p class="text-sm text-on-muted mt-1">
			Copy this CSS file to your <code>src/app.css</code> to apply your custom theme colors
		</p>
	{/snippet}

	<Code code={generateAppCss()} lang="css" />
</Drawer>
