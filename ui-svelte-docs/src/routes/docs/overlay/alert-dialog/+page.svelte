<script lang="ts">
	import { AlertDialog, Button, Card, Code, Section, Select, Checkbox } from 'ui-svelte';
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

	let color: any = $state('danger');
	let isLoading = $state(false);

	let openDialog = $state(false);
	let openDeleteDialog = $state(false);
	let openLogoutDialog = $state(false);

	let hasProps = $derived([color !== 'danger', isLoading].some(Boolean));

	let code = $derived(() => {
		const lines = [
			`<script lang="ts">`,
			`\tlet openDialog = $state(false);`,
			`<\/script>`,
			``,
			`<Button onclick={() => (openDialog = true)}>Open Dialog</Button>`,
			``,
			`<AlertDialog`,
			`\tbind:open={openDialog}`,
			color !== 'danger' && `\tcolor="${color}"`,
			isLoading && `\tisLoading`,
			`\ttitle="Delete Item"`,
			`\tdescription="Are you sure you want to delete this item? This action cannot be undone."`,
			`\tconfirmText="Delete"`,
			`\tcancelText="Cancel"`,
			`\tonconfirm={() => console.log('Confirmed!')}`,
			`/>`
		].filter(Boolean);
		return lines.join('\n');
	});

	const props = [
		{
			prop: 'open',
			type: 'boolean',
			initial: 'false',
			description: 'Controls dialog visibility (bindable)'
		},
		{ prop: 'title', type: 'string', initial: 'Are you sure?', description: 'Dialog title' },
		{
			prop: 'description',
			type: 'string',
			initial: 'This action cannot be undone.',
			description: 'Dialog description'
		},
		{ prop: 'confirmText', type: 'string', initial: 'Confirm', description: 'Confirm button text' },
		{ prop: 'cancelText', type: 'string', initial: 'Cancel', description: 'Cancel button text' },
		{
			prop: 'onconfirm',
			type: '() => void',
			initial: '-',
			description: 'Callback when confirm is clicked'
		},
		{
			prop: 'oncancel',
			type: '() => void',
			initial: '-',
			description: 'Callback when cancel is clicked'
		},
		{
			prop: 'color',
			type: "'primary' | 'secondary' | 'muted' | 'success' | 'info' | 'warning' | 'danger'",
			initial: 'danger',
			description: 'Confirm button color'
		},
		{
			prop: 'isLoading',
			type: 'boolean',
			initial: 'false',
			description: 'Shows loading state on confirm button'
		},
		{
			prop: 'rootClass',
			type: 'string',
			initial: '-',
			description: 'Additional CSS class for the modal'
		}
	];

	function handleConfirm() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
			openDialog = false;
		}, 1500);
	}
</script>

<DocsHeader title="AlertDialog" llmUrl="https://ui-svelte.sappsdev.com/llm/overlay/alert-dialog.md">
	A confirmation dialog component for destructive actions like deleting items. Built on top of Modal
	and Button components.
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
			<Checkbox bind:checked={isLoading} label="isLoading" />
		</div>

		<div class="doc-preview">
			<Button color="danger" onclick={() => (openDialog = true)}>Delete Item</Button>
		</div>
		<Code lang="svelte" code={code()} />
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Use Cases</p>
	<Card>
		<div class="wrap gap-4">
			<Button color="danger" onclick={() => (openDeleteDialog = true)}>Delete Account</Button>
			<Button color="warning" onclick={() => (openLogoutDialog = true)}>Logout</Button>
		</div>
	</Card>
</Section>

<Section>
	<p class="section-subtitle">Props</p>
	<DocsProps {props} />
</Section>

<AlertDialog
	bind:open={openDialog}
	{color}
	{isLoading}
	title="Delete Item"
	description="Are you sure you want to delete this item? This action cannot be undone."
	confirmText="Delete"
	cancelText="Cancel"
	onconfirm={handleConfirm}
/>

<AlertDialog
	bind:open={openDeleteDialog}
	color="danger"
	title="Delete Account"
	description="This will permanently delete your account and all associated data. This action is irreversible."
	confirmText="Delete Account"
	cancelText="Keep Account"
	onconfirm={() => (openDeleteDialog = false)}
/>

<AlertDialog
	bind:open={openLogoutDialog}
	color="warning"
	title="Logout"
	description="Are you sure you want to logout? You will need to login again to access your account."
	confirmText="Logout"
	cancelText="Stay"
	onconfirm={() => (openLogoutDialog = false)}
/>
