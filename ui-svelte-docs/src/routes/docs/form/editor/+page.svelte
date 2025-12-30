<script lang="ts">
	import { Editor, Card, Checkbox, Code, Section, Select, TextField } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const variantOptions = [
		{ id: 'soft', label: 'Soft' },
		{ id: 'solid', label: 'Solid' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	let color: any = $state('muted');
	let variant: any = $state('outlined');
	let size: any = $state('md');

	let editorValue = $state(
		'<p>This is a <strong>rich text editor</strong> with support for <em>formatting</em>, <u>underline</u>, lists and more.</p>'
	);
	let placeholder = $state('Write here...');
	let label = $state('Content');
	let helpText = $state('');
	let errorText = $state('');
	let minHeight = $state('200px');

	let isDisabled = $state(false);
	let isReadonly = $state(false);
	let hideToolbar = $state(false);

	let hasProps = $derived(
		[
			color !== 'muted',
			variant !== 'outlined',
			size !== 'md',
			isDisabled,
			isReadonly,
			hideToolbar,
			placeholder,
			label,
			helpText,
			errorText
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Editor } from 'ui-svelte';`,
			`\tlet content = $state('');`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Editor`,
			hasProps && `\tbind:value={content}`,
			color !== 'muted' && `\tcolor="${color}"`,
			variant !== 'outlined' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			placeholder && `\tplaceholder="${placeholder}"`,
			label && `\tlabel="${label}"`,
			helpText && `\thelpText="${helpText}"`,
			errorText && `\terrorText="${errorText}"`,
			minHeight !== '200px' && `\tminHeight="${minHeight}"`,
			isDisabled && `\tisDisabled`,
			isReadonly && `\tisReadonly`,
			hideToolbar && `\thideToolbar`,
			hasProps && `/>`,
			!hasProps && `<Editor bind:value={content} placeholder="Write here..." />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'value', type: 'string', initial: "''", description: 'HTML content (bindable)' },
		{
			prop: 'placeholder',
			type: 'string',
			initial: "''",
			description: 'Placeholder text when empty'
		},
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'muted'
		},
		{
			prop: 'variant',
			type: 'soft | solid | outlined | line',
			initial: 'outlined'
		},
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'minHeight', type: 'string', initial: '200px' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'isReadonly', type: 'boolean', initial: 'false' },
		{ prop: 'hideToolbar', type: 'boolean', initial: 'false' },
		{
			prop: 'labels',
			type: 'EditorLabels',
			initial: '{}',
			description: 'Custom labels for i18n support'
		},
		{ prop: 'onchange', type: '(value: string) => void', initial: '' },
		{ prop: 'oninput', type: '(value: string) => void', initial: '' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' }
	];
</script>

<DocsHeader title="Editor" llmUrl="https://ui-svelte.sappsdev.com/llm/form/editor.md">
	A rich text editor component with a full-featured toolbar for text formatting, alignment, lists,
	headings, and media insertion.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2">
		<div class="grid-2 md:grid-4 gap-2">
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Color"
				size="sm"
				options={colorOptions}
				bind:value={color}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Variant"
				size="sm"
				options={variantOptions}
				bind:value={variant}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Size"
				size="sm"
				options={sizeOptions}
				bind:value={size}
			/>
			<TextField
				isFloatLabel
				rootClass="max-w-xs"
				label="Placeholder"
				size="sm"
				bind:value={placeholder}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<TextField isFloatLabel rootClass="max-w-xs" label="Label" size="sm" bind:value={label} />
			<Checkbox bind:checked={isDisabled} label="Disabled" />
			<Checkbox bind:checked={isReadonly} label="Readonly" />
			<Checkbox bind:checked={hideToolbar} label="Hide Toolbar" />
		</div>

		<div class="doc-preview">
			<Editor
				bind:value={editorValue}
				{color}
				{variant}
				{size}
				{placeholder}
				{label}
				{helpText}
				{errorText}
				{minHeight}
				{isDisabled}
				{isReadonly}
				{hideToolbar}
			/>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Keyboard Shortcuts</p>
	<Card>
		<div class="grid md:grid-2 lg:grid-3 gap-4">
			<div class="flex items-center gap-2">
				<kbd class="kbd">Ctrl+B</kbd>
				<span>Bold</span>
			</div>
			<div class="flex items-center gap-2">
				<kbd class="kbd">Ctrl+I</kbd>
				<span>Italic</span>
			</div>
			<div class="flex items-center gap-2">
				<kbd class="kbd">Ctrl+U</kbd>
				<span>Underline</span>
			</div>
			<div class="flex items-center gap-2">
				<kbd class="kbd">Ctrl+Z</kbd>
				<span>Undo</span>
			</div>
			<div class="flex items-center gap-2">
				<kbd class="kbd">Ctrl+Shift+Z</kbd>
				<span>Redo</span>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Sizes</p>
	<Card>
		<div class="stack gap-6">
			{#each sizeOptions as sizeItem}
				<Editor size={sizeItem.id as any} placeholder={`Size ${sizeItem.label}`} minHeight="80px" />
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">With Label</p>
	<Card>
		<Editor label="Content" placeholder="Write your content here..." minHeight="100px" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Internacionalización (i18n)</p>
	<Card>
		<p class="mb-4 opacity-70">
			Usa la prop <code>labels</code> para personalizar todos los tooltips y prompts de la barra de herramientas:
		</p>
		<Code
			lang="svelte"
			code={`<Editor
  labels={{
    bold: 'Negrita (Ctrl+B)',
    italic: 'Cursiva (Ctrl+I)',
    underline: 'Subrayado (Ctrl+U)',
    strikethrough: 'Tachado',
    alignLeft: 'Alinear izquierda',
    alignCenter: 'Alinear centro',
    alignRight: 'Alinear derecha',
    justify: 'Justificar',
    orderedList: 'Lista ordenada',
    unorderedList: 'Lista desordenada',
    heading1: 'Encabezado 1',
    heading2: 'Encabezado 2',
    heading3: 'Encabezado 3',
    insertLink: 'Insertar enlace',
    insertImage: 'Insertar imagen',
    quote: 'Cita',
    code: 'Código',
    horizontalRule: 'Línea horizontal',
    undo: 'Deshacer (Ctrl+Z)',
    redo: 'Rehacer (Ctrl+Shift+Z)',
    clearFormatting: 'Limpiar formato',
    linkPrompt: 'Ingresa la URL del enlace:',
    imagePrompt: 'Ingresa la URL de la imagen:'
  }}
/>`}
		/>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">States</p>
	<Card>
		<div class="grid md:grid-2 gap-4">
			<Editor label="Disabled" placeholder="Cannot edit..." isDisabled minHeight="100px" />
			<Editor
				label="Readonly"
				value="<p>This content is <strong>read-only</strong>.</p>"
				isReadonly
				minHeight="100px"
			/>
			<Editor
				label="With Help Text"
				placeholder="Content..."
				helpText="Use the toolbar to format your text."
				minHeight="100px"
			/>
			<Editor
				label="With Error"
				placeholder="Content..."
				errorText="This field is required."
				minHeight="100px"
			/>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Toolbar Features</p>
	<Card>
		<p class="mb-4 opacity-70">The editor toolbar includes:</p>
		<div class="grid md:grid-2 lg:grid-3 gap-4 mb-6">
			<div>
				<p class="font-semibold text-sm mb-1">Text Formatting</p>
				<p class="text-sm opacity-60">Bold, Italic, Underline, Strikethrough</p>
			</div>
			<div>
				<p class="font-semibold text-sm mb-1">Alignment</p>
				<p class="text-sm opacity-60">Left, Center, Right, Justify</p>
			</div>
			<div>
				<p class="font-semibold text-sm mb-1">Lists</p>
				<p class="text-sm opacity-60">Ordered and Unordered Lists</p>
			</div>
			<div>
				<p class="font-semibold text-sm mb-1">Headings</p>
				<p class="text-sm opacity-60">H1, H2, H3</p>
			</div>
			<div>
				<p class="font-semibold text-sm mb-1">Insert</p>
				<p class="text-sm opacity-60">Links, Images, Quotes, Code, Horizontal Rules</p>
			</div>
			<div>
				<p class="font-semibold text-sm mb-1">History</p>
				<p class="text-sm opacity-60">Undo, Redo, Clear Formatting</p>
			</div>
		</div>
		<Editor placeholder="Try out all the toolbar features..." minHeight="200px" />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>
