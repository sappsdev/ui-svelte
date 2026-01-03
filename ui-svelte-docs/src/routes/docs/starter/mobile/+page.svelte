<script lang="ts">
	import { Card, Code, Image, Section } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';

	const capacitorConfigCode = `import type { CapacitorConfig } from '@capacitor/cli';

const isAndroid = process.env.CAP_PLATFORM === 'android';

const config: CapacitorConfig = {
  server: {
    url: isAndroid ? "http://10.0.2.2:5173" : "http://localhost:5173",
    cleartext: true,
  },
  appId: 'com.myapp.mobile',
  appName: 'MyMobileApp',
  webDir: 'dist'
};

export default config;`;

	const svelteConfigCode = `import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: 'warn'
		}
	}
};

export default config;`;

	const scriptsCode = `"scripts": {
	"dev": "vite dev --host",
	"build": "vite build",
	"dev:android": "CAP_PLATFORM=android bunx cap run android",
	"dev:ios": "CAP_PLATFORM=ios bunx cap run ios",
	"build:android": "bun run build && bunx cap sync",
	"build:ios": "bun run build && bunx cap sync"
}`;
</script>

<DocsHeader title="Mobile Apps">
	Create apps for Android and iOS with ui-svelte and
	<a href="https://capacitorjs.com/docs" target="_blank" class="text-primary hover:underline"
		>Capacitor</a
	>.
</DocsHeader>

<Section>
	<Image
		src="/images/ui-svelte-mobile.png"
		alt="Mobile app preview built with ui-svelte and Capacitor"
		aspect="horizontal"
		hideControls
		class="rounded-lg shadow-lg"
	/>
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">1. Install Dependencies</h3>
	<div class="column gap-4">
		<div class="column gap-2">
			<p class="text-sm">Add Capacitor core:</p>
			<Code code="bun add @capacitor/core" lang="bash" />
		</div>
		<div class="column gap-2">
			<p class="text-sm">Add Capacitor CLI as dev dependency:</p>
			<Code code="bun add -d @capacitor/cli" lang="bash" />
		</div>
		<div class="column gap-2">
			<p class="text-sm">Add platform packages:</p>
			<Code code="bun add @capacitor/android @capacitor/ios" lang="bash" />
		</div>
		<div class="column gap-2">
			<p class="text-sm">Add the static adapter:</p>
			<Code code="bun add -d @sveltejs/adapter-static" lang="bash" />
		</div>
	</div>
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">2. Initialize Platforms</h3>
	<div class="column gap-4">
		<div class="column gap-2">
			<p class="text-sm">Add Android platform:</p>
			<Code code="bunx cap add android" lang="bash" />
		</div>
		<div class="column gap-2">
			<p class="text-sm">Add iOS platform:</p>
			<Code code="bunx cap add ios" lang="bash" />
		</div>
	</div>
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">3. Create Capacitor Config</h3>
	<p class="text-sm mb-4">
		Create <code class="px-1 py-0.5 rounded bg-muted">capacitor.config.ts</code> in the root:
	</p>
	<Code code={capacitorConfigCode} lang="typescript" />
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">4. Configure SvelteKit</h3>
	<p class="text-sm mb-4">
		Update <code class="px-1 py-0.5 rounded bg-muted">svelte.config.js</code> to use the static adapter:
	</p>
	<Code code={svelteConfigCode} lang="javascript" />
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">5. Add Scripts</h3>
	<p class="text-sm mb-4">
		Add these scripts to your <code class="px-1 py-0.5 rounded bg-muted">package.json</code>:
	</p>
	<Code code={scriptsCode} lang="json" />
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">6. Run Your App</h3>
	<div class="column gap-4">
		<Card bodyClass="column gap-2">
			<p class="font-medium">Development (Android)</p>
			<Code code="bun dev" lang="bash" />
			<Code code="bun dev:android" lang="bash" />
			<p class="text-sm">
				Runs Vite dev server with hot reload and starts the app on an Android emulator or device.
			</p>
		</Card>
		<Card bodyClass="column gap-2">
			<p class="font-medium">Development (iOS)</p>
			<Code code="bun dev" lang="bash" />
			<Code code="bun dev:ios" lang="bash" />
			<p class="text-sm">
				Runs Vite dev server with hot reload and starts the app on an iOS simulator or device.
			</p>
		</Card>
		<Card bodyClass="column gap-2">
			<p class="font-medium">Production Build</p>
			<Code code="bun run build:android" lang="bash" />
			<Code code="bun run build:ios" lang="bash" />
			<p class="text-sm">Builds the SvelteKit app and syncs it with Capacitor for production.</p>
		</Card>
	</div>
</Section>
