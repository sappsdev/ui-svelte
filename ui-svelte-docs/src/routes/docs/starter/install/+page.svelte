<script lang="ts">
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import { Section, Card, Code, Alert } from 'ui-svelte';
</script>

<DocsHeader title="Installation">
	{#snippet textAlert()}
		<strong>Prerequisites:</strong> Make sure you have Bun or NodeJs installed on your system. If
		you don't have it, visit <a href="https://bun.sh" target="_blank" class="underline">bun.sh</a> to
		install it.
	{/snippet}

	Get started with ui-svelte by following these simple steps to set up your Svelte project with
	Tailwind CSS and the ui-svelte component library.
</DocsHeader>

<Section>
	<p class="section-subtitle">Create a new Svelte project</p>
	<Card>
		<p class="text-sm text-on-muted mb-4">
			Use the Svelte CLI to create a new project. Replace <code>project-name</code> with your desired
			project name.
		</p>
		<Code code="bunx sv create project-name" lang="bash" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Add Tailwind CSS</p>
	<Card>
		<p class="text-sm text-on-muted mb-4">
			Navigate to your project directory and add Tailwind CSS using the Svelte CLI.
		</p>
		<Code code="cd project-name && bunx sv add tailwind" lang="bash" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Install ui-svelte</p>
	<Card>
		<p class="text-sm text-on-muted mb-4">
			Install the ui-svelte component library as a dependency in your project.
		</p>
		<Code code="bun add ui-svelte" lang="bash" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Configure your CSS file</p>
	<Card>
		<p class="text-sm text-on-muted mb-4">
			Create or update your <code>src/app.css</code> file with the following configuration. This includes
			Tailwind CSS, ui-svelte styles, and theme color variables.
		</p>
		<Code
			code={`@import 'tailwindcss';
@import 'ui-svelte/css';

:root {
  --primary: oklch(54.6% 0.245 262.881);
  --on-primary: oklch(93.2% 0.032 255.585);

  --secondary: oklch(60% 0.118 184.704);
  --on-secondary: oklch(95.3% 0.051 180.801);

  --muted: oklch(87.2% 0.01 258.338);
  --on-muted: oklch(37.2% 0.044 257.287);

  --background: oklch(98.5% 0.002 247.839);
  --on-background: oklch(21% 0.034 264.665);

  --surface: oklch(96.7% 0.003 264.542);
  --on-surface: oklch(27.9% 0.041 260.031);

  --outline: oklch(70.7% 0.022 261.325);
  --on-outline: oklch(21% 0.034 264.665);

  --overlay: oklch(0 0 0 / 60%);
  --on-overlay: oklch(1 0 0);

  --success: oklch(62.7% 0.194 149.214);
  --on-success: oklch(96.2% 0.044 156.743);

  --info: oklch(58.8% 0.158 241.966);
  --on-info: oklch(95.1% 0.026 236.824);

  --warning: oklch(68.1% 0.162 75.834);
  --on-warning: oklch(97.3% 0.071 103.193);

  --danger: oklch(57.7% 0.245 27.325);
  --on-danger: oklch(93.6% 0.032 17.717);

  --radius-ui: 0.75rem;
  --scrollbar-size: 6px;
}

.dark {
  --muted: oklch(37.3% 0.034 259.733);
  --on-muted: oklch(87.2% 0.01 258.338);

  --background: oklch(13% 0.028 261.692);
  --on-background: oklch(96.7% 0.003 264.542);

  --surface: oklch(21% 0.034 264.665);
  --on-surface: oklch(92.8% 0.006 264.531);
}`}
			lang="css"
		/>
		<Alert color="warning">
			<strong>Note:</strong> You can customize these color values to match your brand. See the
			<a href="/docs/starter/theme" class="underline">Theme Colors</a> section for more information.
		</Alert>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Setup the Provider</p>
	<Card>
		<p class="text-sm text-on-muted mb-4">
			Update your <code>src/routes/+layout.svelte</code> file to include the Provider component and import
			your CSS. The Provider component handles toast notifications and view transitions.
		</p>
		<Code
			code={`<script lang="ts">
  import { Provider } from 'ui-svelte';
  import '@fontsource-variable/montserrat';
  import '../app.css';

  let { children } = $props();
<\/script>

<Provider
  toastPosition="bottom-right"
  toastIcon={true}
  toastSolid={false}
>
  {@render children()}
</Provider>`}
			lang="svelte"
		/>
		<Alert color="info">
			<strong>Provider Props:</strong>
			<code>toastPosition</code> ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right'),
			<code>toastIcon</code> (boolean),
			<code>toastSolid</code> (boolean)
		</Alert>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Install custom fonts (Optional)</p>
	<Card>
		<p class="text-sm text-on-muted mb-4">
			You can use <a href="https://fontsource.org" target="_blank" class="underline">Fontsource</a> to
			easily add custom fonts to your project. Follow these steps to add Montserrat Variable:
		</p>

		<p class="font-medium mb-2">Install the font package:</p>
		<Code code="bun add @fontsource-variable/montserrat" lang="bash" />

		<p class="font-medium mt-6 mb-2">Add the font-family to your <code>src/app.css</code>:</p>
		<Code
			code={`body {
  font-family: 'Montserrat Variable', sans-serif;
}`}
			lang="css"
		/>

		<p class="font-medium mt-6 mb-2">Import the font in your <code>+layout.svelte</code>:</p>
		<Code code="import '@fontsource-variable/montserrat';" lang="javascript" />

		<Alert>
			Browse available fonts at <a href="https://fontsource.org" target="_blank" class="underline"
				>fontsource.org</a
			>. Each font package includes installation and usage instructions.
		</Alert>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">🎉 You're all set!</p>
	<Card>
		<p class="text-sm text-on-muted mb-4">
			Your Svelte project is now configured with ui-svelte. You can start using components in your
			pages.
		</p>
		<Code
			code={`<script>
  import { Button, Card } from 'ui-svelte';
<\/script>

<Card>
  <div class="p-6">
    <h1>Welcome to ui-svelte!</h1>
    <Button variant="solid" status="primary">
      Get Started
    </Button>
  </div>
</Card>`}
			lang="svelte"
		/>
		<Alert color="success">
			<strong>Next Steps:</strong>
			Explore <a href="/docs/starter/theme" class="underline">Theme Colors</a>, learn about
			<a href="/docs/starter/icons" class="underline">Icons</a> integration, and browse the component
			documentation.
		</Alert>
	</Card>
</Section>
