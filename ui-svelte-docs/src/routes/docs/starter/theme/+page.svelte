<script lang="ts">
	import { Card, Code, Section, Tabs, Button, Modal, Drawer, Alert } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import Color from '$lib/components/utils/Color.svelte';
	import { storeApp } from '$lib/store/store.svelte';

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
			storeApp.setDarkThemeColor(key as keyof typeof storeApp.darkThemeColors, colorValue);
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

	const colorVariables = [
		{ variable: '--primary', description: 'Main brand color for primary actions' },
		{ variable: '--on-primary', description: 'Text/icon color on primary backgrounds' },
		{ variable: '--secondary', description: 'Secondary brand color for supporting elements' },
		{ variable: '--on-secondary', description: 'Text/icon color on secondary backgrounds' },
		{ variable: '--muted', description: 'Subtle background for less prominent elements' },
		{ variable: '--on-muted', description: 'Text/icon color on muted backgrounds' },
		{ variable: '--background', description: 'Main application background color' },
		{ variable: '--on-background', description: 'Text/icon color on main background' },
		{ variable: '--surface', description: 'Background for cards and elevated surfaces' },
		{ variable: '--on-surface', description: 'Text/icon color on surface backgrounds' },
		{ variable: '--success', description: 'Success states and positive feedback' },
		{ variable: '--on-success', description: 'Text/icon color on success backgrounds' },
		{ variable: '--info', description: 'Informational messages and neutral states' },
		{ variable: '--on-info', description: 'Text/icon color on info backgrounds' },
		{ variable: '--warning', description: 'Warning messages and cautionary states' },
		{ variable: '--on-warning', description: 'Text/icon color on warning backgrounds' },
		{ variable: '--danger', description: 'Error states and destructive actions' },
		{ variable: '--on-danger', description: 'Text/icon color on danger backgrounds' }
	];

	const utilityVariables = [
		{ variable: '--radius-ui', description: 'Border radius for UI components', default: '0.75rem' },
		{ variable: '--scrollbar-size', description: 'Width of custom scrollbars', default: '6px' }
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
				<strong>On color:</strong> Use weight <code class="px-1 py-0.5 bg-muted rounded">100</code>
				(e.g., <code class="px-1 py-0.5 bg-muted rounded">blue-100</code>,
				<code class="px-1 py-0.5 bg-muted rounded">pink-100</code>)
			</li>
		</ul>
		<div class="grid-2 gap-2 mt-2">
			<div class="p-4 bg-primary text-on-primary rounded center">Primary</div>
			<div class="p-4 bg-secondary text-on-secondary rounded center">Secondary</div>
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
				<strong>On color:</strong> Use weight <code class="px-1 py-0.5 bg-muted rounded">100</code>
				(e.g., <code class="px-1 py-0.5 bg-muted rounded">green-100</code>,
				<code class="px-1 py-0.5 bg-muted rounded">red-100</code>)
			</li>
		</ul>
		<div class="grid-4 gap-2 mt-2">
			<div class="p-3 bg-success text-on-success rounded center text-sm">Success</div>
			<div class="p-3 bg-info text-on-info rounded center text-sm">Info</div>
			<div class="p-3 bg-warning text-on-warning rounded center text-sm">Warning</div>
			<div class="p-3 bg-danger text-on-danger rounded center text-sm">Danger</div>
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
		</ul>
		<div class="grid-3 gap-2 mt-2">
			<div class="p-3 bg-background text-on-background rounded center text-sm border border-muted">
				Background
			</div>
			<div class="p-3 bg-surface text-on-surface rounded center text-sm">Surface</div>
			<div class="p-3 bg-muted text-on-muted rounded center text-sm">Muted</div>
		</div>
	</div>
{/snippet}

<DocsHeader title="Theme">
	Customize your application's color palette using CSS variables. The theme system provides semantic
	color tokens for consistent styling across all components.
</DocsHeader>

<Section>
	<Alert status="info">
		<strong>Interactive Theme Customization:</strong> Click on any color below to open the color picker.
		Your changes will be applied immediately throughout the entire application. Use the "Generate CSS"
		button to export your customized theme.
	</Alert>
</Section>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<div class="column gap-4 w-full">
			<div class="grid-2 gap-3">
				<div class="p-4 bg-primary text-on-primary rounded-lg center">Primary</div>
				<div class="p-4 bg-secondary text-on-secondary rounded-lg center">Secondary</div>
			</div>
			<div class="grid-4 gap-2">
				<div class="p-3 bg-success text-on-success rounded center text-sm">Success</div>
				<div class="p-3 bg-info text-on-info rounded center text-sm">Info</div>
				<div class="p-3 bg-warning text-on-warning rounded center text-sm">Warning</div>
				<div class="p-3 bg-danger text-on-danger rounded center text-sm">Danger</div>
			</div>
			<div class="grid-3 gap-2">
				<div class="p-3 bg-surface text-on-surface rounded center text-sm border border-muted">
					Surface
				</div>
				<div class="p-3 bg-muted text-on-muted rounded center text-sm">Muted</div>
				<div
					class="p-3 bg-background text-on-background rounded center text-sm border border-muted"
				>
					Background
				</div>
			</div>
		</div>
	</DocsPreview>
	<Card>
		<div class="row gap-2 mb-4">
			<Button variant="outlined" size="sm" onclick={() => (showCssDrawer = true)}
				>Generate CSS</Button
			>
			<Button variant="outlined" size="sm" onclick={resetColors}>Reset Colors</Button>
		</div>
		<p class="text-sm text-on-muted">
			Click on the color swatches below to customize each theme color. Changes are applied in
			real-time.
		</p>
	</Card>
	<DocsCode
		code={`<div class="bg-primary text-on-primary">
	Primary styled element
</div>

<div class="bg-success text-on-success">
	Success message
</div>`}
	/>
</Section>

<Section>
	<Card>
		<Tabs tabs={guidelinesTabs} />
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Light Mode Colors</h4>
		{/snippet}
		<div class="grid gap-4">
			{#each themeColorPairs as colorPair}
				{@const mainKey = colorPair.key as ThemeColorKey}
				{@const onKey =
					`on${colorPair.key.charAt(0).toUpperCase()}${colorPair.key.slice(1)}` as ThemeColorKey}
				<div class="border-b border-muted last:border-b-0 pb-4 last:pb-0">
					<div class="mb-2">
						<h5 class="text-sm font-semibold">{colorPair.label}</h5>
						<p class="text-xs text-on-muted">{colorPair.description}</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'main')}
								class="size-12 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0 cursor-pointer"
								style="background-color: {storeApp.themeColors[mainKey]}; color: {storeApp
									.themeColors[onKey]};"
								title="Click to customize {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<span class="text-xs font-medium">{colorPair.label}</span>
								<Code code={storeApp.themeColors[mainKey]} lang="css" />
							</div>
						</div>

						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'on')}
								class="size-12 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0 cursor-pointer"
								style="background-color: {storeApp.themeColors[onKey]}; color: {storeApp
									.themeColors[mainKey]};"
								title="Click to customize On {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<span class="text-xs font-medium">On {colorPair.label}</span>
								<Code code={storeApp.themeColors[onKey]} lang="css" />
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Dark Mode Colors</h4>
		{/snippet}
		<Alert status="info">
			Toggle dark mode using the button in the top navigation to see your changes.
		</Alert>
		<div class="grid gap-4">
			{#each darkThemeColorPairs as colorPair}
				{@const mainKey = colorPair.key as keyof typeof storeApp.darkThemeColors}
				{@const onKey =
					`on${colorPair.key.charAt(0).toUpperCase()}${colorPair.key.slice(1)}` as keyof typeof storeApp.darkThemeColors}
				<div class="border-b border-muted last:border-b-0 pb-4 last:pb-0">
					<div class="mb-2">
						<h5 class="text-sm font-semibold">{colorPair.label}</h5>
						<p class="text-xs text-on-muted">{colorPair.description}</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'main', 'dark')}
								class="size-12 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0 cursor-pointer"
								style="background-color: {storeApp.darkThemeColors[mainKey]}; color: {storeApp
									.darkThemeColors[onKey]};"
								title="Click to customize {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<span class="text-xs font-medium">{colorPair.label}</span>
								<Code code={storeApp.darkThemeColors[mainKey]} lang="css" />
							</div>
						</div>

						<div class="flex items-center gap-3">
							<button
								onclick={() => openPicker(mainKey, 'on', 'dark')}
								class="size-12 rounded-lg shadow-sm transition-all hover:scale-105 hover:shadow-md shrink-0 cursor-pointer"
								style="background-color: {storeApp.darkThemeColors[onKey]}; color: {storeApp
									.darkThemeColors[mainKey]};"
								title="Click to customize On {colorPair.label}"
							>
							</button>
							<div class="flex-1 min-w-0">
								<span class="text-xs font-medium">On {colorPair.label}</span>
								<Code code={storeApp.darkThemeColors[onKey]} lang="css" />
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>CSS Variables Reference</h4>
		{/snippet}
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
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold">💡 Pro Tips</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Tailwind Classes:</strong> Use semantic color classes like
					<code class="px-1 py-0.5 bg-blue rounded">bg-primary</code> and
					<code class="px-1 py-0.5 bg-blue rounded">text-on-primary</code>
				</li>
				<li>
					<strong>CSS Variables:</strong> Access colors directly via
					<code class="px-1 py-0.5 bg-blue rounded">var(--primary)</code>
				</li>
				<li>
					<strong>Dark Mode:</strong> Colors automatically switch when
					<code class="px-1 py-0.5 bg-blue rounded">.dark</code> class is applied to the root
				</li>
				<li>
					<strong>Consistency:</strong> Always pair background colors with their
					<code class="px-1 py-0.5 bg-blue rounded">on-*</code> counterparts for proper contrast
				</li>
			</ul>
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Usage Examples</h4>
		{/snippet}
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

	<Code code={generateAppCss()} lang="css" />
</Drawer>
