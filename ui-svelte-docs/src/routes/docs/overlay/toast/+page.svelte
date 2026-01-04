<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Select, toast } from 'ui-svelte';
	import DocsHeader from '$lib/components/DocsHeader.svelte';
	import DocsProps from '$lib/components/DocsProps.svelte';
	import { storeApp } from '$lib/store/store.svelte';

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
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' }
	];

	const positionOptions = [
		{ id: 'top-left', label: 'Top Left' },
		{ id: 'top-right', label: 'Top Right' },
		{ id: 'bottom-left', label: 'Bottom Left' },
		{ id: 'bottom-right', label: 'Bottom Right' }
	];

	const durationOptions = [
		{ id: '0', label: 'Manual (0ms)' },
		{ id: '2000', label: '2 seconds' },
		{ id: '3000', label: '3 seconds' },
		{ id: '5000', label: '5 seconds' }
	];

	let color: any = $state('info');
	let duration: any = $state('3000');

	let title = $state('Toast Title');
	let description = $state('This is a toast notification message.');

	const handleClick = () => {
		toast.show({
			title: title || undefined,
			description,
			color,
			duration: parseInt(duration),
			position: storeApp.toastPosition || undefined,
			variant: storeApp.toastVariant as any
		});
	};

	let hasProps = $derived(
		[
			color !== 'info',
			storeApp.toastVariant !== 'soft',
			storeApp.toastPosition !== 'bottom-left',
			duration !== '0',
			title
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Button, toast } from 'ui-svelte';`,
			`\n\tconst handleClick = () => {`,
			`\t\ttoast.show({`,
			title && `\t\t\ttitle: '${title}',`,
			`\t\t\tdescription: '${description}',`,
			color !== 'info' && `\t\t\tcolor: '${color}',`,
			storeApp.toastVariant !== 'soft' && `\t\t\tvariant: '${storeApp.toastVariant}',`,
			duration !== '0' && `\t\t\tduration: ${duration},`,
			storeApp.toastPosition !== 'bottom-left' && `\t\t\tposition: '${storeApp.toastPosition}'`,
			`\t\t});`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [`\n<Button onclick={handleClick}>Show Toast</Button>`];

		return [...scriptLines, ...componentLines].join('\n');
	});

	const toastProps = [
		{ prop: 'description', type: 'string', initial: '', required: true },
		{ prop: 'title', type: 'string', initial: '' },
		{
			prop: 'color',
			type: 'primary | secondary | muted | success | info | danger | warning',
			initial: 'info'
		},
		{ prop: 'variant', type: 'solid | soft', initial: 'soft' },
		{ prop: 'duration', type: 'number', initial: '0' },
		{
			prop: 'position',
			type: 'top-left | top-right | bottom-left | bottom-right',
			initial: 'bottom-left'
		},
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'id', type: 'string', initial: 'auto-generated' }
	];

	const componentProps = [
		{ prop: 'class', type: 'string', initial: '' },
		{
			prop: 'position',
			type: 'top-left | top-right | bottom-left | bottom-right',
			initial: 'bottom-left'
		},
		{ prop: 'variant', type: 'solid | soft', initial: 'soft' },
		{ prop: 'showIcon', type: 'boolean', initial: 'false' }
	];

	const storeMethods = [
		{
			prop: 'toast.show()',
			type: '(message: ToastMessage) => string',
			initial: 'Shows a toast and returns its id'
		},
		{
			prop: 'toast.close()',
			type: '(id: string) => void',
			initial: 'Closes a specific toast by id'
		},
		{ prop: 'toast.closeAll()', type: '() => void', initial: 'Closes all active toasts' },
		{ prop: 'toast.messages', type: 'ToastMessage[]', initial: 'Reactive list of active toasts' }
	];
</script>

<DocsHeader title="Toast" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/toast.md">
	Toast is a lightweight notification component that provides brief messages about app processes.
	They can automatically disappear after a set duration or be manually dismissed.
</DocsHeader>

<Section>
	<Card headerClass="grid-2 md:grid-4 gap-2" color="background" variant="outlined">
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
				value={storeApp.toastVariant}
				onchange={(v) => (storeApp.toastVariant = v as any)}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Position"
				size="sm"
				options={positionOptions}
				value={storeApp.toastPosition}
				onchange={(v) => (storeApp.toastPosition = v as any)}
			/>
			<Select
				isFloatLabel
				rootClass="max-w-xs"
				label="Duration"
				size="sm"
				options={durationOptions}
				bind:value={duration}
			/>
		</div>
		<div class="grid-2 md:grid-4 gap-2">
			<Checkbox
				onchange={(v) => (v ? (title = 'Toast Title') : (title = ''))}
				checked={!!title}
				label="Title"
			/>
			<Checkbox
				checked={storeApp.toastIcon}
				onchange={(v) => (storeApp.toastIcon = v)}
				label="Show Icon"
			/>
		</div>

		<div class="doc-preview">
			<Button onclick={handleClick}>Show Toast</Button>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Variants</p>
	<Card color="background" variant="outlined">
		<div class="wrap gap-4 center">
			{#each variantOptions as variantItem}
				{#each colorOptions as colorItem}
					<Button
						color={colorItem.id as any}
						variant={variantItem.id as any}
						onclick={() =>
							toast.show({
								title: `${variantItem.label} ${colorItem.label}`,
								description: `This is a ${variantItem.label.toLowerCase()} toast.`,
								color: colorItem.id as any,
								variant: variantItem.id as any,
								duration: 3000
							})}
					>
						{variantItem.label}
						{colorItem.label}
					</Button>
				{/each}
			{/each}
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Toast Store Methods</p>
	<DocsProps props={storeMethods} />
</Section>

<Section>
	<p class="section-subtitle">Toast Message Props</p>
	<DocsProps props={toastProps} />
</Section>

<Section>
	<p class="section-subtitle">Toast Component Props</p>
	<DocsProps props={componentProps} />
</Section>
