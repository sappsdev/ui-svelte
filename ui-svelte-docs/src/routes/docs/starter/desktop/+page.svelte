<script lang="ts">
	import { Card, Code, Image, Section } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';

	const bunIndexCode = `import { BrowserWindow } from "electrobun/bun";

const isDev = process.env.NODE_ENV === "development" || Bun.argv.includes("--dev");

const devUrl = "http://localhost:5173";
const prodUrl = "views://mainview/index.html";

const mainWindow = new BrowserWindow({
    title: "My Desktop App",
    url: isDev ? devUrl : prodUrl,
    frame: {
        width: 1200,
        height: 800,
        x: 200,
        y: 200,
    },
});

console.log(\`App started in \${isDev ? "development" : "production"} mode\`);`;

	const electrobunConfigCode = `import packageJson from "./package.json" assert { type: "json" };

export default {
    app: {
        name: "My Desktop App",
        identifier: "com.myapp.desktop",
        version: packageJson.version,
    },
    build: {
        bun: {
            entrypoint: "src/bun/index.ts",
            external: [],
        },
        views: {},
        copy: {
            "dist/": "views/mainview/",
        },
        mac: {
            bundleCEF: false,
        },
        linux: {
            bundleCEF: false,
        },
        win: {
            bundleCEF: false,
        },
    },
};`;

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
	 "dev:desktop": "electrobun build && electrobun dev",
	 "build:desktop": "bun run build && electrobun build",
}`;
</script>

<DocsHeader title="Desktop Apps">
	Create apps for Windows, Mac and Linux with ui-svelte and
	<a
		href="https://blackboard.sh/electrobun/docs/"
		target="_blank"
		class="text-primary hover:underline font-bold">Electrobun</a
	>.
</DocsHeader>

<Section>
	<Image
		src="/images/ui-svelte-desktop.png"
		alt="Desktop app preview built with ui-svelte and Electrobun"
		aspect="horizontal"
		hideControls
		class="rounded-lg shadow-lg"
	/>
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">1. Install Dependencies</h3>
	<div class="column gap-4">
		<div class="column gap-2">
			<p class="text-sm">Add Electrobun:</p>
			<Code code="bun add electrobun" lang="bash" />
		</div>
		<div class="column gap-2">
			<p class="text-sm">Add the static adapter:</p>
			<Code code="bun add -d @sveltejs/adapter-static" lang="bash" />
		</div>
	</div>
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">2. Create Bun Entry Point</h3>
	<p class="text-sm mb-4">
		Create the file <code class="px-1 py-0.5 rounded bg-muted">src/bun/index.ts</code>:
	</p>
	<Code code={bunIndexCode} lang="typescript" />
</Section>

<Section>
	<h3 class="text-lg font-semibold mb-4">3. Create Electrobun Config</h3>
	<p class="text-sm mb-4">
		Create <code class="px-1 py-0.5 rounded bg-muted">electrobun.config.ts</code> in the root:
	</p>
	<Code code={electrobunConfigCode} lang="typescript" />
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
		<Card bodyClass="column gap-2" color="background" variant="outlined">
			<p class="font-medium">Development</p>
			<Code code="bun dev" lang="bash" />
			<Code code="bun dev:desktop" lang="bash" />
			<p class="text-sm">
				Runs Vite dev server with hot reload inside and starts the Electrobun dev server.
			</p>
		</Card>
		<Card bodyClass="column gap-2" color="background" variant="outlined">
			<p class="font-medium">Production Build</p>
			<Code code="bun run build" lang="bash" />
			<p class="text-sm">Builds the SvelteKit app and packages it with Electrobun.</p>
		</Card>
	</div>
</Section>
