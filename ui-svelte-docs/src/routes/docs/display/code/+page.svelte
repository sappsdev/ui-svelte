<script lang="ts">
	import { Card, Checkbox, Code, Section, Select } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
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
	let lightTheme: any = $state('github-light');
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
			lightTheme !== 'github-light' && `\tlightTheme="${lightTheme}"`,
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
		{ prop: 'lightTheme', type: 'string', initial: 'github-light' },
		{ prop: 'darkTheme', type: 'string', initial: 'catppuccin-frappe' },
		{ prop: 'disableCopy', type: 'boolean', initial: 'false' },
		{ prop: 'hideLang', type: 'boolean', initial: 'false' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Code" llmUrl="https://ui-svelte.sappsdev.com/llm/display/code.md">
	Display syntax-highlighted code blocks with copy functionality.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Language"
				size="sm"
				options={langOptions}
				bind:value={lang}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Light Theme"
				size="sm"
				options={lightThemeOptions}
				bind:value={lightTheme}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Dark Theme"
				size="sm"
				options={darkThemeOptions}
				bind:value={darkTheme}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox bind:checked={disableCopy} label="Disable Copy" />
			<Checkbox bind:checked={hideLang} label="Hide Lang" />
		</div>

		<div class="doc-preview">
			<Code code={sampleCode} {lang} {lightTheme} {darkTheme} {disableCopy} {hideLang} />
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Multiple Languages</p>
	<Card color="background" variant="outlined">
		<div class="grid-1 md:grid-2 gap-4">
			<Code code={sampleCodes.typescript} lang="typescript" />
			<Code code={sampleCodes.python} lang="python" />
			<Code code={sampleCodes.html} lang="html" />
			<Code code={sampleCodes.css} lang="css" />
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Svelte Component Example</p>
	<Card color="background" variant="outlined">
		<Code code={sampleCodes.svelte} lang="svelte" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Options</p>
	<Card color="background" variant="outlined">
		<div class="grid-2 md:grid-3 gap-4">
			<div class="column gap-2">
				<p class="text-sm">Default</p>
				<Code code={`const x = 42;`} lang="typescript" />
			</div>
			<div class="column gap-2">
				<p class="text-sm">No Copy Button</p>
				<Code code={`const x = 42;`} lang="typescript" disableCopy />
			</div>
			<div class="column gap-2">
				<p class="text-sm">Hidden Language</p>
				<Code code={`const x = 42;`} lang="typescript" hideLang />
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
