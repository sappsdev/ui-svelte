<script lang="ts">
	import { Card, Code, Section, Select, Slider, Tabs, Button, Icon } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import { formatCurrency, formatDate, formatNumber, plural, t, i18n } from 'ui-svelte';

	// Streamline Color Icons
	const FolderAddIcon = {
		body: '<g fill="none"><path fill="#ffef5e" d="M19.174 17.26a.957.957 0 0 0 .957-.956V4.826a.956.956 0 0 0-.957-.956H9.722a.96.96 0 0 1-.855-.53L7.96 1.53A.96.96 0 0 0 7.105 1H1.957A.957.957 0 0 0 1 1.957v14.347a.956.956 0 0 0 .957.957z"/><path fill="#fff9bf" d="M9.722 3.87a.96.96 0 0 1-.855-.53L7.96 1.53A.96.96 0 0 0 7.105 1H1.957A.957.957 0 0 0 1 1.957v14.347a.956.956 0 0 0 .957.957h.67L16.017 3.87z"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M20.131 8.652V4.826a.956.956 0 0 0-.957-.956H9.722a.96.96 0 0 1-.855-.53L7.96 1.53A.96.96 0 0 0 7.105 1H1.957A.957.957 0 0 0 1 1.957v14.347a.956.956 0 0 0 .957.957h6.696"/><path fill="#78eb7b" d="M17.26 23a5.74 5.74 0 1 0 0-11.478a5.74 5.74 0 0 0 0 11.478"/><path fill="#c9f7ca" d="M17.261 11.522A5.74 5.74 0 0 0 13.49 21.58l8.09-8.09a5.72 5.72 0 0 0-4.319-1.968"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M17.26 23a5.74 5.74 0 1 0 0-11.478a5.74 5.74 0 0 0 0 11.478m0-8.609v5.74m2.87-2.871h-5.739"/></g>',
		viewbox: '0 0 24 24'
	};

	const CloudWarningIcon = {
		body: '<g fill="none"><path fill="#fff" d="M18.768 14.499c-.749.05 4.23-.232 4.23-4.642a4.71 4.71 0 0 0-4.953-4.634a6.7 6.7 0 0 0-6.044-3.72A6.603 6.603 0 0 0 5.328 7.61a3.56 3.56 0 0 0-4.323 3.408c0 3.268 3.26 3.46 3.763 3.48z"/><path fill="#e3e3e3" d="M18.712 12h.056c-.08.004-.095.006-.056 0H4.768c-.424-.019-2.817-.158-3.55-2.171c-.141.38-.214.783-.213 1.188c0 3.269 3.26 3.46 3.763 3.482h13.944c.322-.059 4.286-.707 4.286-4.642c0-.406-.055-.81-.163-1.2c-.749 2.784-3.836 3.291-4.123 3.342"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M20.499 13.905a4.31 4.31 0 0 0 2.499-4.048a4.71 4.71 0 0 0-4.953-4.634a6.7 6.7 0 0 0-6.044-3.72A6.603 6.603 0 0 0 5.328 7.61a3.56 3.56 0 0 0-4.323 3.408a3.185 3.185 0 0 0 2.499 3.28"/><path fill="#ffef5e" d="M12.839 11.5a.949.949 0 0 0-1.676 0L6.11 21.134a.923.923 0 0 0 .376 1.244c.14.078.3.12.462.12h10.109a.95.95 0 0 0 .806-.45a.92.92 0 0 0 .031-.913z"/><path fill="#fff9bf" d="M12.001 11a.94.94 0 0 0-.838.5L6.11 21.134a.923.923 0 0 0 .376 1.244c.14.078.3.12.462.119H12z"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M12.839 11.5a.949.949 0 0 0-1.676 0L6.11 21.134a.923.923 0 0 0 .376 1.244c.14.078.3.12.462.12h10.109a.95.95 0 0 0 .806-.45a.92.92 0 0 0 .031-.913zm-.838 5.998v-3"/><path stroke="#191919" d="M12 19.997a.25.25 0 1 1 0-.5m0 .5a.25.25 0 1 0 0-.5"/></g>',
		viewbox: '0 0 24 24'
	};

	const AwardBadgeIcon = {
		body: '<g fill="none"><path fill="#e3e3e3" d="M21.17 19.626a.484.484 0 0 1-.482.483H3.312a.48.48 0 0 1-.482-.483V6.284a.97.97 0 0 1 .515-.854l8.205-4.32a.97.97 0 0 1 .899 0l8.205 4.319a.97.97 0 0 1 .515.854z"/><path fill="#fff" d="M12 1a1 1 0 0 0-.45.11L3.345 5.43a.97.97 0 0 0-.515.854v13.342a.48.48 0 0 0 .482.483H12z"/><path fill="#ffef5e" d="m12.567 7.058l1.238 2.433h2.413a.592.592 0 0 1 .416 1.032l-2.09 2.184l1.158 2.665a.63.63 0 0 1-.9.79L12 14.58l-2.8 1.577a.631.631 0 0 1-.898-.79l1.158-2.665l-2.094-2.184a.59.59 0 0 1 .417-1.028h2.413l1.237-2.433a.638.638 0 0 1 1.134 0"/><path fill="#fff9bf" d="m9.46 12.703l-1.158 2.665a.6.6 0 0 0 .013.51l6.388-6.387h-.897l-1.238-2.433a.638.638 0 0 0-1.134 0l-1.24 2.433H7.78a.59.59 0 0 0-.413 1.028z"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M21.17 19.626a.484.484 0 0 1-.482.483H3.312a.48.48 0 0 1-.482-.483V6.284a.97.97 0 0 1 .515-.854l8.205-4.32a.97.97 0 0 1 .899 0l8.205 4.319a.97.97 0 0 1 .515.854zM2.83 23h18.34"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="m12.567 7.058l1.238 2.433h2.413a.592.592 0 0 1 .416 1.032l-2.09 2.184l1.158 2.665a.63.63 0 0 1-.9.79L12 14.58l-2.8 1.577a.631.631 0 0 1-.898-.79l1.158-2.665l-2.094-2.184a.59.59 0 0 1 .417-1.028h2.413l1.237-2.433a.638.638 0 0 1 1.134 0"/></g>',
		viewbox: '0 0 24 24'
	};

	const ShieldGlobeIcon = {
		body: '<g fill="none"><path fill="#e3e3e3" d="M1.957 4.133v7.305a11.77 11.77 0 0 0 7.861 10.969l1.072.396a3.22 3.22 0 0 0 2.22 0l1.072-.396a11.78 11.78 0 0 0 7.86-10.969V4.133a1.47 1.47 0 0 0-.892-1.344A23.2 23.2 0 0 0 12 1a23.2 23.2 0 0 0-9.15 1.788a1.47 1.47 0 0 0-.893 1.344"/><path fill="#fff" d="M12 1.001a23.2 23.2 0 0 0-9.15 1.788a1.47 1.47 0 0 0-.893 1.344v7.305a11.77 11.77 0 0 0 7.861 10.969l1.073.396c.355.13.73.197 1.109.197z"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M1.957 4.133v7.305a11.77 11.77 0 0 0 7.861 10.969l1.072.396a3.22 3.22 0 0 0 2.22 0l1.072-.396a11.78 11.78 0 0 0 7.86-10.969V4.133a1.47 1.47 0 0 0-.892-1.344A23.2 23.2 0 0 0 12 1a23.2 23.2 0 0 0-9.15 1.788a1.47 1.47 0 0 0-.893 1.344"/><path fill="#78eb7b" d="M18.234 11.022A6.235 6.235 0 0 1 12 17.261a6.305 6.305 0 0 1-6.2-6.353a6.08 6.08 0 0 1 5.95-6.076a6.18 6.18 0 0 1 6.484 6.188"/><path fill="#c9f7ca" d="M11.75 4.833a6.08 6.08 0 0 0-5.95 6.075c0 .999.233 1.984.68 2.877c.82.4 1.722.607 2.633.607a6.245 6.245 0 0 0 5.616-8.954a6.25 6.25 0 0 0-2.709-.61q-.135-.001-.27.005"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M18.234 11.022A6.235 6.235 0 0 1 12 17.261a6.305 6.305 0 0 1-6.2-6.353a6.08 6.08 0 0 1 5.95-6.076a6.18 6.18 0 0 1 6.484 6.188"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M11.75 4.834c-3.244 3.514-3.244 8.099 0 12.424m.537-12.424c3.244 3.514 3.244 8.097 0 12.422m-6.504-6.212h12.434"/></g>',
		viewbox: '0 0 24 24'
	};

	const LightBulbIcon = {
		body: '<g fill="none"><path fill="#66e1ff" d="M17.739 14.391H6.261V6.74a5.74 5.74 0 0 1 11.478 0z"/><path fill="#c2f3ff" d="M12 1a5.74 5.74 0 0 0-5.74 5.74v7.651H12z"/><path stroke="#191919" stroke-linecap="round" stroke-linejoin="round" d="M5.304 14.391h13.391m-9.565 0V23m5.74-8.609V23M12 14.391V9.61m0 0l-1.913-1.913M12 9.609l1.913-1.913m3.826 6.695H6.261V6.74a5.74 5.74 0 0 1 11.478 0z"/></g>',
		viewbox: '0 0 24 24'
	};

	const languageOptions = [
		{ id: 'en', label: 'English' },
		{ id: 'es', label: 'Español' }
	];

	let selectedLanguage: any = $state('en');
	let itemCount = $state(5);
	let today = new Date();
	let price = 99.99;
	let number = 1234567.89;

	const i18nStore = i18n();

	$effect(() => {
		i18nStore.setLanguage(selectedLanguage);
	});

	let code = $derived(() => {
		return `<script>
  import { formatCurrency, formatDate, formatNumber, plural, t } from "ui-svelte";
  let itemCount = ${itemCount};
  let today = new Date();
  let price = ${price};
  let number = ${number};
<\/script>

<div class="column gap-4 p-4">
  <h1>{t("common.welcome", { name: "John" })}</h1>
  <p>{formatDate(today, { dateStyle: "medium" })}</p>
  <p>{formatCurrency(price, "EUR")}</p>
  <p>{formatNumber(number)}</p>
  <p>{plural("messages.items", itemCount)}</p>
</div>`;
	});

	const functions = [
		{
			name: 't(key, params?)',
			description: 'Translate a key with optional parameters',
			example: 't("common.welcome", { name: "John" })'
		},
		{
			name: 'plural(key, count)',
			description: 'Handle pluralization based on count',
			example: 'plural("messages.items", 5)'
		},
		{
			name: 'formatDate(date, options?)',
			description: 'Format dates using Intl.DateTimeFormat',
			example: 'formatDate(new Date(), { dateStyle: "medium" })'
		},
		{
			name: 'formatNumber(number)',
			description: 'Format numbers with locale-specific separators',
			example: 'formatNumber(1234567.89)'
		},
		{
			name: 'formatCurrency(amount, currency)',
			description: 'Format currency with symbol and positioning',
			example: 'formatCurrency(99.99, "EUR")'
		},
		{
			name: 'i18n()',
			description: 'Access the i18n store for language management',
			example: 'const store = i18n(); store.setLanguage("es");'
		}
	];

	const configOptions = [
		{
			option: 'defaultLanguage',
			type: 'string',
			description: 'The default language to use when no preference is stored (e.g., "en")'
		},
		{
			option: 'availableLanguages',
			type: 'string[]',
			description: 'Array of supported language codes (e.g., ["en", "es", "fr"])'
		}
	];

	const setupTabs = [
		{ id: 'translations', label: 'Translation Files', content: translationsContent },
		{ id: 'hooks', label: 'hooks.client.ts', content: hooksContent },
		{ id: 'usage', label: 'Component Usage', content: usageContent }
	];

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

	const hooksCode = `import { initLanguage } from "ui-svelte";

initLanguage({
  defaultLanguage: "en",
  availableLanguages: ["es", "en"],
});`;

	const usageCode = `<script>
  import { formatCurrency, formatDate, formatNumber, plural, t } from "ui-svelte";
  let itemCount = 5;
  let today = new Date();
  let price = 99.99;
  let number = 1234567.89;
<\/script>

<div class="column gap-4 p-4">
  <h1>{t("common.welcome", { name: "John" })}</h1>
  <p>{formatDate(today, { dateStyle: "medium" })}</p>
  <p>{formatCurrency(price, "EUR")}</p>
  <p>{formatNumber(number)}</p>
  <p>{plural("messages.items", itemCount)}</p>
</div>`;
</script>

{#snippet translationsContent()}
	<div class="column gap-4">
		<p class="text-sm text-on-muted">
			Create translation files in <code>src/lib/locales/</code>. File names must match the language
			codes.
		</p>
		<div>
			<p class="text-xs font-medium mb-2">src/lib/locales/en.ts</p>
			<Code code={localeEnCode} lang="typescript" />
		</div>
		<div>
			<p class="text-xs font-medium mb-2">src/lib/locales/es.ts</p>
			<Code code={localeEsCode} lang="typescript" />
		</div>
	</div>
{/snippet}

{#snippet hooksContent()}
	<div class="column gap-4">
		<p class="text-sm text-on-muted">
			Initialize the i18n system in <code>src/hooks.client.ts</code>.
		</p>
		<Code code={hooksCode} lang="typescript" />
	</div>
{/snippet}

{#snippet usageContent()}
	<div class="column gap-4">
		<p class="text-sm text-on-muted">Import and use i18n functions in your Svelte components.</p>
		<Code code={usageCode} lang="svelte" />
	</div>
{/snippet}

<DocsHeader
	title="Internationalization (i18n)"
	llmUrl="https://ui-svelte.sappsdev.com/llm/starter/i18n.md"
>
	Add multi-language support to your application with the built-in i18n system. Includes translation
	management, date/number formatting, pluralization, and automatic locale detection.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Card bodyClass="column gap-4">
			<div>
				<p class="text-xs text-on-muted mb-1">Translation with Parameters</p>
				<h2 class="text-xl font-semibold">{t('common.welcome', { name: 'John' })}</h2>
			</div>

			<div class="grid-2 gap-3">
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

			<div class="row gap-2">
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
		</Card>
	</DocsPreview>
	<Card>
		<Select label="Language" size="sm" options={languageOptions} bind:value={selectedLanguage} />
		<Slider label="Item Count" min={0} max={10} bind:value={itemCount} />
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card>
		<Tabs tabs={setupTabs} />
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Available Functions</h4>
		{/snippet}
		<div class="overflow-x-auto">
			<table class="w-full border-collapse">
				<thead>
					<tr class="border-b border-muted-200">
						<th class="text-left p-3 font-semibold">Function</th>
						<th class="text-left p-3 font-semibold">Description</th>
						<th class="text-left p-3 font-semibold">Example</th>
					</tr>
				</thead>
				<tbody>
					{#each functions as func}
						<tr class="border-b border-muted-100">
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{func.name}</code></td>
							<td class="p-3 text-sm">{func.description}</td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{func.example}</code></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<Section>
	<Card>
		{#snippet header()}
			<h4>Configuration Options</h4>
		{/snippet}
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
					{#each configOptions as opt}
						<tr class="border-b border-muted-100">
							<td class="p-3"><code class="px-2 py-1 rounded text-sm">{opt.option}</code></td>
							<td class="p-3"><code class="px-2 py-1 rounded text-xs">{opt.type}</code></td>
							<td class="p-3 text-sm">{opt.description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-4">
	<Card variant="primary">
		{#snippet header()}
			<h4 class="font-semibold mb-2 row gap-2">
				<Icon icon={FolderAddIcon} class="w-6 h-6" /> File Naming
			</h4>
		{/snippet}
		<p class="text-sm">
			Translation files <strong>must</strong> be named exactly as the language code (e.g.,
			<code class="px-1 py-0.5 bg-primary-200 rounded">en.ts</code>,
			<code class="px-1 py-0.5 bg-primary-200 rounded">es.ts</code>).
		</p>
	</Card>

	<Card variant="warning">
		{#snippet header()}
			<h4 class="font-semibold mb-2 row gap-2">
				<Icon icon={CloudWarningIcon} class="w-6 h-6" /> Important
			</h4>
		{/snippet}
		<p class="text-sm">
			Initialize i18n in
			<code class="px-1 py-0.5 bg-warning-200 rounded">hooks.client.ts</code>
			before using any translation functions.
		</p>
	</Card>

	<Card variant="success">
		{#snippet header()}
			<h4 class="font-semibold mb-2 row gap-2">
				<Icon icon={AwardBadgeIcon} class="w-6 h-6" /> Best Practice
			</h4>
		{/snippet}
		<p class="text-sm">
			Use descriptive nested keys (e.g.,
			<code class="px-1 py-0.5 bg-success-200 rounded">common.welcome</code>) for better
			organization.
		</p>
	</Card>

	<Card variant="info">
		{#snippet header()}
			<h4 class="font-semibold mb-2 row gap-2">
				<Icon icon={ShieldGlobeIcon} class="w-6 h-6" /> New Languages
			</h4>
		{/snippet}
		<p class="text-sm">
			Create a translation file and add the language code to <code
				class="px-1 py-0.5 bg-info-200 rounded">availableLanguages</code
			>.
		</p>
	</Card>
</Section>

<Section>
	<Card variant="info">
		<div class="column gap-3">
			<h4 class="font-semibold row gap-2">
				<Icon icon={LightBulbIcon} class="w-5 h-5" /> Pro Tips
			</h4>
			<ul class="text-sm space-y-2 list-disc list-inside">
				<li>
					<strong>Auto Detection:</strong> The system automatically detects language from localStorage
					or browser settings
				</li>
				<li>
					<strong>Reactive Updates:</strong> Language changes update all components automatically without
					page reload
				</li>
				<li>
					<strong>Locale-Aware:</strong> All formatting functions use JavaScript Intl API for accurate
					locale-specific formatting
				</li>
				<li>
					<strong>Pluralization:</strong> Use
					<code class="px-1 py-0.5 bg-info-200 rounded">singular</code>
					and <code class="px-1 py-0.5 bg-info-200 rounded">plural</code> keys for count-based translations
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
			code={`<!-- Basic Translation -->
<h1>{t("common.welcome", { name: "Alice" })}</h1>

<!-- Pluralization -->
<p>{plural("messages.items", itemCount)}</p>

<!-- Date Formatting -->
<p>{formatDate(new Date(), { dateStyle: "full" })}</p>
<p>{formatDate(new Date(), { dateStyle: "short" })}</p>

<!-- Number Formatting -->
<p>{formatNumber(1234567.89)}</p>

<!-- Currency Formatting -->
<p>{formatCurrency(99.99, "USD")}</p>
<p>{formatCurrency(99.99, "EUR")}</p>

<!-- Change Language Programmatically -->
<script>
  import { i18n } from "ui-svelte";
  const store = i18n();
  store.setLanguage("es");
<\/script>`}
		/>
	</Card>
</Section>
