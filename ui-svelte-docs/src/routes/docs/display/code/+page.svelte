<script lang="ts">
	import { Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsPreview from '$lib/components/DocsPreview.svelte';
	import DocsCode from '$lib/components/DocsCode.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const langOptions = [
		{ id: 'javascript', label: 'JavaScript' },
		{ id: 'typescript', label: 'TypeScript' },
		{ id: 'html', label: 'HTML' },
		{ id: 'css', label: 'CSS' },
		{ id: 'svelte', label: 'Svelte' },
		{ id: 'json', label: 'JSON' },
		{ id: 'python', label: 'Python' },
		{ id: 'bash', label: 'Bash' }
	];

	const lightThemeOptions = [
		{ id: 'catppuccin-latte', label: 'Catppuccin Latte' },
		{ id: 'github-light', label: 'GitHub Light' },
		{ id: 'min-light', label: 'Min Light' },
		{ id: 'one-light', label: 'One Light' }
	];

	const darkThemeOptions = [
		{ id: 'catppuccin-frappe', label: 'Catppuccin Frappe' },
		{ id: 'catppuccin-mocha', label: 'Catppuccin Mocha' },
		{ id: 'github-dark', label: 'GitHub Dark' },
		{ id: 'one-dark-pro', label: 'One Dark Pro' },
		{ id: 'dracula', label: 'Dracula' }
	];

	let lang: any = $state('typescript');
	let lightTheme: any = $state('catppuccin-latte');
	let darkTheme: any = $state('catppuccin-frappe');
	let disableCopy = $state(false);
	let hideLang = $state(false);

	const sampleCodes: Record<string, string> = {
		typescript: `const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};

console.log(greeting('World'));`,
		javascript: `const greeting = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greeting('World'));`,
		html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello World</title>
  </head>
  <body>
    <h1>Welcome!</h1>
  </body>
</html>`,
		css: `.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
}`,
		svelte: `<script lang="ts">
  let count = $state(0);
<\/script>

<button onclick={() => count++}>
  Clicks: {count}
</button>`,
		json: `{
  "name": "ui-svelte",
  "version": "1.0.0",
  "description": "A modern Svelte UI library"
}`,
		python: `def greeting(name: str) -> str:
    return f"Hello, {name}!"

print(greeting("World"))`,
		bash: `#!/bin/bash
echo "Installing dependencies..."
npm install
npm run dev`
	};

	let sampleCode = $derived(sampleCodes[lang] || sampleCodes.typescript);

	let hasProps = $derived(
		[
			lightTheme !== 'catppuccin-latte',
			darkTheme !== 'catppuccin-frappe',
			disableCopy,
			hideLang
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Code } from 'ui-svelte';`,
			``,
			`\tconst code = \`const hello = "world";\`;`,
			`<\/script>`
		];

		const componentLines = [
			`<Code`,
			`\tcode={code}`,
			`\tlang="${lang}"`,
			lightTheme !== 'catppuccin-latte' && `\tlightTheme="${lightTheme}"`,
			darkTheme !== 'catppuccin-frappe' && `\tdarkTheme="${darkTheme}"`,
			disableCopy && `\tdisableCopy`,
			hideLang && `\thideLang`,
			`/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'code', type: 'string', initial: '' },
		{ prop: 'lang', type: 'string', initial: '' },
		{ prop: 'lightTheme', type: 'string', initial: 'catppuccin-latte' },
		{ prop: 'darkTheme', type: 'string', initial: 'catppuccin-frappe' },
		{ prop: 'disableCopy', type: 'boolean', initial: 'false' },
		{ prop: 'hideLang', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Code" llmUrl="https://ui-svelte.sappsdev.com/llm/display/code.md">
	Display syntax-highlighted code blocks with copy functionality.
</DocsHeader>

<Section bodyClass="md:grid-3">
	<DocsPreview>
		<Code code={sampleCode} {lang} {lightTheme} {darkTheme} {disableCopy} {hideLang} />
	</DocsPreview>
	<Card>
		<Select label="Language" size="sm" options={langOptions} bind:value={lang} />
		<Select label="Light Theme" size="sm" options={lightThemeOptions} bind:value={lightTheme} />
		<Select label="Dark Theme" size="sm" options={darkThemeOptions} bind:value={darkTheme} />
		<div class="grid-2 gap-2">
			<Checkbox bind:checked={disableCopy} label="Disable Copy" />
			<Checkbox bind:checked={hideLang} label="Hide Lang" />
		</div>
	</Card>
	<DocsCode code={code()} />
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Multiple Languages</h4>
		{/snippet}
		<div class="grid-1 md:grid-2 gap-4">
			<Code code={sampleCodes.typescript} lang="typescript" />
			<Code code={sampleCodes.python} lang="python" />
			<Code code={sampleCodes.html} lang="html" />
			<Code code={sampleCodes.css} lang="css" />
		</div>
	</Card>
</Section>

<Section>
	<Card bodyClass="column gap-4">
		{#snippet header()}
			<h4>Svelte Component Example</h4>
		{/snippet}
		<Code code={sampleCodes.svelte} lang="svelte" />
	</Card>
</Section>

<Section bodyClass="grid-2 md:grid-3">
	<Card bodyClass="column gap-2">
		{#snippet header()}
			<h5>Default</h5>
		{/snippet}
		<Code code={`const x = 42;`} lang="typescript" />
	</Card>
	<Card bodyClass="column gap-2">
		{#snippet header()}
			<h5>No Copy Button</h5>
		{/snippet}
		<Code code={`const x = 42;`} lang="typescript" disableCopy />
	</Card>
	<Card bodyClass="column gap-2">
		{#snippet header()}
			<h5>Hidden Language</h5>
		{/snippet}
		<Code code={`const x = 42;`} lang="typescript" hideLang />
	</Card>
</Section>

<DocsProps {props} />
