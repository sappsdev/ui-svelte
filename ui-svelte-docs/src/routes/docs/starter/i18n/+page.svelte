<script lang="ts">
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import { Card, Section, Alert, Code, Button, Select } from 'ui-svelte';
	import { formatCurrency, formatDate, formatNumber, plural, t, i18n } from 'ui-svelte';

	const languageOptions = [
		{ id: 'en', label: 'English' },
		{ id: 'es', label: 'Español' }
	];

	let selectedLanguage = $state('en');
	let itemCount = $state(5);
	let today = new Date();
	let price = 99.99;
	let number = 1234567.89;

	const i18nStore = i18n();

	$effect(() => {
		i18nStore.setLanguage(selectedLanguage);
	});

	const previewCode = `<script>
  import { formatCurrency, formatDate, formatNumber, plural, t } from "ui-svelte";
  let itemCount = 5;
  let today = new Date();
  let price = 99.99;
  let number = 1234567.89;
<\/script>

<div class="flex flex-col p-4">
  <h1>{t("common.welcome", { name: "John" })}</h1>
  <p>{formatDate(today, { dateStyle: "medium" })}</p>
  <p>{formatCurrency(price, "EUR")}</p>
  <p>{formatNumber(number)}</p>
  <p>{plural("messages.items", itemCount)}</p>
</div>`;

	const hooksCode = `import { initLanguage } from "ui-svelte";

initLanguage({
  defaultLanguage: "en",
  availableLanguages: ["es", "en"],
});`;

	const localeEnCode = `export default {
  common: {
    welcome: "Welcome, {{name}}!",
  },
  messages: {
    items: {
      singular: "You have {{count}} item",
      plural: "You have {{count}} items"
    }
  }
};`;

	const localeEsCode = `export default {
  common: {
    welcome: "Bienvenido, {{name}}!",
  },
  messages: {
    items: {
      singular: "Tienes {{count}} artículo",
      plural: "Tienes {{count}} artículos"
    }
  }
};`;

	const usageExamples = [
		{
			title: 'Basic Translation',
			code: `// Simple translation
t("common.welcome", { name: "John" })
// Output: "Welcome, John!" or "Bienvenido, John!"`,
			description: 'Use the t() function with a key path and optional parameters'
		},
		{
			title: 'Pluralization',
			code: `// Automatic singular/plural handling
plural("messages.items", 1)  // "You have 1 item"
plural("messages.items", 5)  // "You have 5 items"`,
			description: 'Automatically selects singular or plural form based on count'
		},
		{
			title: 'Date Formatting',
			code: `// Format dates according to locale
formatDate(new Date(), { dateStyle: "medium" })
// en: "Dec 10, 2025"
// es: "10 dic 2025"`,
			description: 'Format dates using Intl.DateTimeFormat with locale awareness'
		},
		{
			title: 'Number Formatting',
			code: `// Format numbers with locale-specific separators
formatNumber(1234567.89)
// en: "1,234,567.89"
// es: "1.234.567,89"`,
			description: 'Format numbers according to locale conventions'
		},
		{
			title: 'Currency Formatting',
			code: `// Format currency with locale and currency code
formatCurrency(99.99, "EUR")
// en: "€99.99"
// es: "99,99 €"`,
			description: 'Format currency values with proper symbols and positioning'
		},
		{
			title: 'Change Language',
			code: `// Programmatically change language
import { i18n } from "ui-svelte";

const i18nStore = i18n();
i18nStore.setLanguage("es");`,
			description: 'Switch languages dynamically at runtime'
		}
	];
</script>

<DocHeader title="Internationalization (i18n)">
	Add multi-language support to your application with the built-in i18n system. Includes translation
	management, date/number formatting, pluralization, and automatic locale detection.
</DocHeader>

<Section>
	<Alert status="info">
		<strong>Quick Start:</strong> The i18n system is already included in ui-svelte. Follow the setup steps
		below to configure translations for your application.
	</Alert>
</Section>

<Section>
	<Card>
		<h3 class="text-lg font-semibold mb-4">Setup Instructions</h3>

		<div class="space-y-6">
			<div>
				<h4 class="font-medium mb-2">1. Create Translation Files</h4>
				<p class="text-sm text-on-muted mb-3">
					Create translation files in <code>src/lib/locales/</code>. File names must match the
					language codes (e.g., <code>en.ts</code>, <code>es.ts</code>).
				</p>

				<div class="space-y-3">
					<div>
						<p class="text-xs font-medium mb-1">src/lib/locales/en.ts</p>
						<Code code={localeEnCode} lang="typescript" showCopy />
					</div>

					<div>
						<p class="text-xs font-medium mb-1">src/lib/locales/es.ts</p>
						<Code code={localeEsCode} lang="typescript" showCopy />
					</div>
				</div>
			</div>

			<div>
				<h4 class="font-medium mb-2">2. Initialize i18n in hooks.client.ts</h4>
				<p class="text-sm text-on-muted mb-3">
					Create or update <code>src/hooks.client.ts</code> to initialize the i18n system with your configuration.
				</p>
				<Code code={hooksCode} lang="typescript" showCopy />
			</div>

			<div>
				<h4 class="font-medium mb-2">3. Use i18n Functions in Components</h4>
				<p class="text-sm text-on-muted mb-3">
					Import and use the i18n functions in your Svelte components.
				</p>
				<Code code={previewCode} lang="svelte" showCopy />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<h2 class="text-2xl font-bold mb-4">Live Preview</h2>
	<Alert status="warning">
		<strong>Interactive Demo:</strong> Change the language below to see how translations, dates, numbers,
		and currency formats adapt automatically.
	</Alert>

	<DocPreview>
		{#snippet builder()}
			<Select label="Language" size="sm" options={languageOptions} bind:value={selectedLanguage} />

			<DocOptions title="Demo Values">
				<div class="space-y-2 text-xs">
					<p><strong>Item Count:</strong> {itemCount}</p>
					<p><strong>Price:</strong> {price}</p>
					<p><strong>Number:</strong> {number}</p>
				</div>
			</DocOptions>
		{/snippet}

		<Card>
			<div class="flex flex-col gap-3 p-4">
				<div>
					<p class="text-xs text-on-muted mb-1">Translation with Parameters</p>
					<h2 class="text-xl font-semibold">{t('common.welcome', { name: 'John' })}</h2>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div class="p-3 bg-muted rounded-lg">
						<p class="text-xs text-on-muted mb-1">Date Formatting</p>
						<p class="font-medium">{formatDate(today, { dateStyle: 'medium' })}</p>
					</div>

					<div class="p-3 bg-muted rounded-lg">
						<p class="text-xs text-on-muted mb-1">Currency Formatting</p>
						<p class="font-medium">{formatCurrency(price, 'EUR')}</p>
					</div>

					<div class="p-3 bg-muted rounded-lg">
						<p class="text-xs text-on-muted mb-1">Number Formatting</p>
						<p class="font-medium">{formatNumber(number)}</p>
					</div>

					<div class="p-3 bg-muted rounded-lg">
						<p class="text-xs text-on-muted mb-1">Pluralization</p>
						<p class="font-medium">{plural('messages.items', itemCount)}</p>
					</div>
				</div>

				<div class="mt-2">
					<p class="text-xs text-on-muted mb-2">
						Current Language: <strong>{i18nStore.language}</strong>
					</p>
					<div class="flex gap-2">
						{#each languageOptions as lang}
							<Button
								size="sm"
								variant={selectedLanguage === lang.id ? 'primary' : 'outlined'}
								onclick={() => (selectedLanguage = lang.id)}
							>
								{lang.label}
							</Button>
						{/each}
					</div>
				</div>
			</div>
		</Card>
	</DocPreview>
</Section>

<Section>
	<Card>
		<h3 class="text-lg font-semibold mb-4">Available Functions</h3>

		<div class="space-y-6">
			{#each usageExamples as example}
				<div class="border-b border-muted last:border-b-0 pb-4 last:pb-0">
					<h4 class="font-medium mb-2">{example.title}</h4>
					<p class="text-sm text-on-muted mb-3">{example.description}</p>
					<Code code={example.code} lang="javascript" showCopy />
				</div>
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<Card>
		<h3 class="text-lg font-semibold mb-4">Configuration Options</h3>

		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Option</th>
						<th class="text-left p-3 font-semibold">Type</th>
						<th class="text-left p-3 font-semibold">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-muted-100">
						<td class="p-3">
							<code class="px-2 py-1 bg-muted-100 rounded text-sm">defaultLanguage</code>
						</td>
						<td class="p-3">
							<code class="px-2 py-1 bg-muted-100 rounded text-xs">string</code>
						</td>
						<td class="p-3 text-sm">
							The default language to use when no preference is stored (e.g., "en")
						</td>
					</tr>
					<tr class="border-b border-muted-100">
						<td class="p-3">
							<code class="px-2 py-1 bg-muted-100 rounded text-sm">availableLanguages</code>
						</td>
						<td class="p-3">
							<code class="px-2 py-1 bg-muted-100 rounded text-xs">string[]</code>
						</td>
						<td class="p-3 text-sm">
							Array of supported language codes (e.g., ["en", "es", "fr"])
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		<h3 class="text-lg font-semibold mb-4">Translation File Structure</h3>

		<div class="space-y-4">
			<div>
				<h4 class="font-medium mb-2">Nested Keys</h4>
				<p class="text-sm text-on-muted mb-3">
					Organize translations using nested objects for better structure and maintainability.
				</p>
				<Code
					code={`export default {
  common: {
    welcome: "Welcome, {{name}}!",
    goodbye: "Goodbye!"
  },
  navigation: {
    home: "Home",
    about: "About",
    contact: "Contact"
  }
};`}
					lang="typescript"
					showCopy
				/>
			</div>

			<div>
				<h4 class="font-medium mb-2">Parameter Interpolation</h4>
				<p class="text-sm text-on-muted mb-3">
					Use double curly braces <code>{`{{parameter}}`}</code> for dynamic values in translations.
				</p>
				<Code
					code={`// Translation file
greeting: "Hello, {{name}}! You have {{count}} messages."

// Usage
t("greeting", { name: "Alice", count: 5 })
// Output: "Hello, Alice! You have 5 messages."`}
					lang="typescript"
					showCopy
				/>
			</div>

			<div>
				<h4 class="font-medium mb-2">Pluralization Structure</h4>
				<p class="text-sm text-on-muted mb-3">
					Define singular and plural forms using nested objects with <code>singular</code> and
					<code>plural</code> keys.
				</p>
				<Code
					code={`export default {
  messages: {
    items: {
      singular: "You have {{count}} item",
      plural: "You have {{count}} items"
    },
    notifications: {
      singular: "{{count}} new notification",
      plural: "{{count}} new notifications"
    }
  }
};`}
					lang="typescript"
					showCopy
				/>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		<h3 class="text-lg font-semibold mb-4">Advanced Features</h3>

		<div class="space-y-4">
			<div>
				<h4 class="font-medium mb-2">Automatic Language Detection</h4>
				<p class="text-sm text-on-muted">
					The i18n system automatically detects the user's preferred language from:
				</p>
				<ul class="list-disc list-inside space-y-1 text-sm text-on-muted mt-2">
					<li>Previously stored language preference in localStorage</li>
					<li>Browser language settings (navigator.language)</li>
					<li>Falls back to the configured default language</li>
				</ul>
			</div>

			<div>
				<h4 class="font-medium mb-2">Locale-Aware Formatting</h4>
				<p class="text-sm text-on-muted mb-2">
					All formatting functions use the JavaScript Intl API for accurate locale-specific
					formatting:
				</p>
				<ul class="list-disc list-inside space-y-1 text-sm text-on-muted">
					<li><strong>Dates:</strong> Respects locale date ordering and separators</li>
					<li><strong>Numbers:</strong> Uses correct thousands and decimal separators</li>
					<li><strong>Currency:</strong> Positions symbols correctly for each locale</li>
				</ul>
			</div>

			<div>
				<h4 class="font-medium mb-2">Reactive Language Switching</h4>
				<p class="text-sm text-on-muted mb-3">
					Language changes are reactive and update all components automatically without page reload.
				</p>
				<Code
					code={`import { i18n } from "ui-svelte";

const i18nStore = i18n();

// Access current language
console.log(i18nStore.language);

// Get available languages
console.log(i18nStore.availableLanguages);

// Check loading state
console.log(i18nStore.isLoading);

// Change language
await i18nStore.setLanguage("es");`}
					lang="typescript"
					showCopy
				/>
			</div>
		</div>
	</Card>
</Section>

<Section bodyClass="grid gap-4 md:grid-cols-2 pb-8">
	<Card variant="primary">
		<h4>📁 File Naming Convention</h4>
		<p>
			Translation files <strong>must</strong> be named exactly as the language code (e.g.,
			<code class="px-1 py-0.5 bg-blue-100 rounded">en.ts</code>,
			<code class="px-1 py-0.5 bg-blue-100 rounded">es.ts</code>,
			<code class="px-1 py-0.5 bg-blue-100 rounded">fr.ts</code>). The system dynamically imports
			files based on these names.
		</p>
	</Card>

	<Card variant="warning">
		<h4>⚠️ Important Notes</h4>
		<p>
			The i18n system must be initialized in
			<code class="px-1 py-0.5 bg-yellow-100 rounded">hooks.client.ts</code> before using any translation
			functions. Translation files are loaded asynchronously, so components may briefly show empty strings
			during initial load.
		</p>
	</Card>

	<Card variant="success">
		<h4>✨ Best Practices</h4>
		<p>
			Use descriptive nested keys for better organization (e.g.,
			<code class="px-1 py-0.5 bg-green-100 rounded">common.welcome</code> instead of just
			<code class="px-1 py-0.5 bg-green-100 rounded">welcome</code>). Keep translation keys
			consistent across all language files.
		</p>
	</Card>

	<Card variant="info">
		<h4>🌍 Adding New Languages</h4>
		<p>
			To add a new language: 1) Create a new translation file in
			<code class="px-1 py-0.5 bg-sky-100 rounded">src/lib/locales/</code>, 2) Add the language code
			to
			<code class="px-1 py-0.5 bg-sky-100 rounded">availableLanguages</code> in your
			<code class="px-1 py-0.5 bg-sky-100 rounded">hooks.client.ts</code> configuration.
		</p>
	</Card>
</Section>
