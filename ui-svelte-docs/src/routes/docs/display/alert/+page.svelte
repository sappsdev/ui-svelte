<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Alert, Checkbox, Select, TextField } from 'ui-svelte';
	import { HeartAngleLinearIcon } from '$lib/icons';

	const statusOptions = [
		{ id: 'info', label: 'Info' },
		{ id: 'success', label: 'Success' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' }
	];

	let status: any = $state('info');
	let title = $state('Alert Title');
	let description = $state('This is a description for the alert component.');

	let showIcon: any = $state(true);
	let customIcon: any = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[
			status !== 'info',
			title !== 'Alert Title',
			description !== 'This is a description for the alert component.',
			!showIcon,
			customIcon,
			isSolid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Alert } from 'ui-svelte';`,
			customIcon && `\timport { InfoCircleLinearIcon } from '$lib/icons';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Alert`,
			status !== 'info' && `\tstatus="${status}"`,
			title && title !== 'Alert Title' && `\ttitle="${title}"`,
			description &&
				description !== 'This is a description for the alert component.' &&
				`\tdescription="${description}"`,
			!showIcon && `\tshowIcon={false}`,
			customIcon && `\ticon={InfoCircleLinearIcon}`,
			isSolid && `\tisSolid`,
			hasProps && `/>`,
			!hasProps &&
				`<Alert title="Alert Title" description="This is a description for the alert component." />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'title', type: 'string', initial: '' },
		{ prop: 'description', type: 'string', initial: '' },
		{ prop: 'children', type: 'Snippet', initial: '' },
		{ prop: 'status', type: 'info | success | warning | danger', initial: 'info' },
		{ prop: 'showIcon', type: 'boolean', initial: 'true' },
		{ prop: 'icon', type: 'IconData', initial: '' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<Alert
		{status}
		{title}
		{description}
		{showIcon}
		icon={customIcon ? HeartAngleLinearIcon : undefined}
		{isSolid}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Status" size="sm" options={statusOptions} bind:value={status} />
	<TextField label="Title" size="sm" bind:value={title} />
	<TextField label="Description" size="sm" bind:value={description} />

	<DocOptions title="Props">
		<Checkbox bind:checked={showIcon} label="Show Icon" />
		<Checkbox bind:checked={customIcon} label="Custom Icon" />
		<Checkbox bind:checked={isSolid} label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Alert">
	Alerts display brief messages for the user without interrupting their use of the app.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
