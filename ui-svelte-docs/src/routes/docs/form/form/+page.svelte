<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { TextField, Button, Checkbox, Select, useForm } from 'ui-svelte';

	const exampleOptions = [
		{ id: 'basic', label: 'Basic Form' },
		{ id: 'login', label: 'Login Form' },
		{ id: 'register', label: 'Registration Form' },
		{ id: 'edit', label: 'Create/Edit Mode' }
	];

	let exampleMode: string = $state('basic');
	let showValidation = $state(true);
	let showTransform = $state(false);
	let showCallbacks = $state(false);
	let showToast = $state(true);
	let resetOnSuccess = $state(false);
	let isEditing = $state(false);

	const userId = $derived(isEditing ? '123' : undefined);

	let formConfig = $derived.by(() => {
		const baseConfig: any = {
			url: isEditing ? `https://api.example.com/users/${userId}` : 'https://api.example.com/users',
			method: isEditing ? 'PUT' : 'POST',
			showToast: showToast,
			successDescription: isEditing ? 'User updated successfully' : 'User created successfully',
			validationRules: {}
		};

		if (showValidation) {
			if (exampleMode === 'login') {
				baseConfig.validationRules = {
					email: [
						{ rule: 'required', message: 'Email is required' },
						{ rule: 'email', message: 'Invalid email format' }
					],
					password: [
						{ rule: 'required', message: 'Password is required' },
						{ rule: 'min:8', message: 'Password must be at least 8 characters' }
					]
				};
			} else if (exampleMode === 'register') {
				baseConfig.validationRules = {
					email: [
						{ rule: 'required', message: 'Email is required' },
						{ rule: 'email', message: 'Invalid email format' }
					],
					password: [
						{ rule: 'required', message: 'Password is required' },
						{ rule: 'min:8', message: 'Password must be at least 8 characters' },
						{ rule: 'strongPassword', message: 'Password must be strong' }
					],
					confirmPassword: [
						{ rule: 'required', message: 'Please confirm your password' },
						{ rule: 'matches:password', message: 'Passwords do not match' }
					]
				};
			} else {
				baseConfig.validationRules = {
					email: [
						{ rule: 'required', message: 'Email is required' },
						{ rule: 'email', message: 'Invalid email format' }
					],
					name: [{ rule: 'required', message: 'Name is required' }]
				};
			}
		}

		if (showCallbacks) {
			baseConfig.onSuccess = (response: unknown) => {
				console.log('Form submitted successfully:', response);
			};
			baseConfig.onError = (errors: Record<string, string>) => {
				console.error('Form validation errors:', errors);
			};
		}

		if (showTransform) {
			baseConfig.transformData = (data: Record<string, unknown>) => ({
				...data,
				timestamp: new Date().toISOString()
			});
		}

		if (resetOnSuccess) {
			baseConfig.resetOnSuccess = true;
		}

		return baseConfig;
	});

	let form = $derived(useForm(formConfig));

	let code = $derived.by(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { useForm } from 'ui-svelte';`,
			`\timport { TextField, Button } from 'ui-svelte';`,
			``
		];

		if (exampleMode === 'edit' || isEditing) {
			scriptLines.push(
				`\t// State for edit mode`,
				`\tlet isEditing = $state(false);`,
				`\tconst userId = $derived(isEditing ? '123' : undefined);`,
				``
			);
		}

		scriptLines.push(`\tlet form = useForm({`);

		if (showValidation) {
			scriptLines.push(`\t\tvalidationRules: {`);

			if (exampleMode === 'login') {
				scriptLines.push(
					`\t\t\temail: [`,
					`\t\t\t\t{ rule: 'required', message: 'Email is required' },`,
					`\t\t\t\t{ rule: 'email', message: 'Invalid email format' }`,
					`\t\t\t],`,
					`\t\t\tpassword: [`,
					`\t\t\t\t{ rule: 'required', message: 'Password is required' },`,
					`\t\t\t\t{ rule: 'min:8', message: 'Password must be at least 8 characters' }`,
					`\t\t\t]`
				);
			} else if (exampleMode === 'register') {
				scriptLines.push(
					`\t\t\temail: [`,
					`\t\t\t\t{ rule: 'required', message: 'Email is required' },`,
					`\t\t\t\t{ rule: 'email', message: 'Invalid email format' }`,
					`\t\t\t],`,
					`\t\t\tpassword: [`,
					`\t\t\t\t{ rule: 'required', message: 'Password is required' },`,
					`\t\t\t\t{ rule: 'min:8', message: 'Password must be at least 8 characters' },`,
					`\t\t\t\t{ rule: 'strongPassword', message: 'Password must be strong' }`,
					`\t\t\t],`,
					`\t\t\tconfirmPassword: [`,
					`\t\t\t\t{ rule: 'required', message: 'Please confirm your password' },`,
					`\t\t\t\t{ rule: 'matches:password', message: 'Passwords do not match' }`,
					`\t\t\t]`
				);
			} else {
				scriptLines.push(
					`\t\t\temail: [`,
					`\t\t\t\t{ rule: 'required', message: 'Email is required' },`,
					`\t\t\t\t{ rule: 'email', message: 'Invalid email format' }`,
					`\t\t\t],`,
					`\t\t\tname: [{ rule: 'required', message: 'Name is required' }]`
				);
			}

			scriptLines.push(`\t\t},`);
		}

		if (exampleMode === 'edit' || isEditing) {
			scriptLines.push(
				`\t\turl: isEditing ? \`https://api.example.com/users/\${userId}\` : 'https://api.example.com/users',`,
				`\t\tmethod: isEditing ? 'PUT' : 'POST'`
			);
		} else {
			scriptLines.push(
				`\t\turl: 'https://api.example.com/${exampleMode === 'login' ? 'login' : exampleMode === 'register' ? 'register' : 'users'}',`,
				`\t\tmethod: 'POST'`
			);
		}

		if (showToast) {
			scriptLines.push(`,\t\tshowToast: true`);
		}

		if (exampleMode === 'edit' || isEditing) {
			scriptLines.push(
				`,\t\tsuccessDescription: isEditing ? 'User updated successfully' : 'User created successfully'`
			);
		} else if (exampleMode === 'register') {
			scriptLines.push(
				`,\t\tsuccessTitle: 'Registration Successful'`,
				`,\t\tsuccessDescription: 'Your account has been created.'`
			);
		}

		if (resetOnSuccess) {
			scriptLines.push(`,\t\tresetOnSuccess: true`);
		}

		if (showCallbacks) {
			scriptLines.push(
				`,\t\tonSuccess: (response) => {`,
				`\t\t\tconsole.log('Success:', response);`,
				`\t\t}`,
				`,\t\tonError: (errors) => {`,
				`\t\t\tconsole.error('Errors:', errors);`,
				`\t\t}`
			);
		}

		if (showTransform) {
			scriptLines.push(
				`,\t\ttransformData: (data) => ({`,
				`\t\t\t...data,`,
				`\t\t\ttimestamp: new Date().toISOString()`,
				`\t\t})`
			);
		}

		scriptLines.push(`\t});`, `<\/script>`);

		const componentLines: (string | false)[] = [`\n<form bind:this={form.state}>`];

		if (exampleMode === 'basic' || exampleMode === 'edit') {
			componentLines.push(
				`\t<TextField`,
				`\t\tname="name"`,
				`\t\tplaceholder="Enter your name"`,
				`\t\tlabel="Name"`,
				showValidation && `\t\terrorText={form.errors.name}`,
				`\t/>`
			);
		}

		componentLines.push(
			`\n\t<TextField`,
			`\t\tname="email"`,
			`\t\ttype="email"`,
			`\t\tplaceholder="Enter your email"`,
			`\t\tlabel="Email"`,
			showValidation && `\t\terrorText={form.errors.email}`,
			`\t/>`
		);

		componentLines.push(
			`\n\t<TextField`,
			`\t\tname="password"`,
			`\t\ttype="password"`,
			`\t\tplaceholder="Enter your password"`,
			`\t\tlabel="Password"`,
			showValidation && `\t\terrorText={form.errors.password}`,
			`\t/>`
		);

		if (exampleMode === 'register') {
			componentLines.push(
				`\n\t<TextField`,
				`\t\tname="confirmPassword"`,
				`\t\ttype="password"`,
				`\t\tplaceholder="Confirm your password"`,
				`\t\tlabel="Confirm Password"`,
				showValidation && `\t\terrorText={form.errors.confirmPassword}`,
				`\t/>`
			);
		}

		const buttonLabel =
			exampleMode === 'login'
				? 'Login'
				: exampleMode === 'register'
					? 'Register'
					: exampleMode === 'edit'
						? "(isEditing ? 'Update' : 'Create')"
						: 'Submit';

		componentLines.push(
			`\n\t<Button`,
			`\t\tlabel={form.isSubmitting ? 'Submitting...' : ${buttonLabel}}`,
			`\t\ttype="submit"`,
			`\t\tisDisabled={form.isSubmitting}`,
			`\t/>`,
			`</form>`
		);

		return [...scriptLines, ...componentLines.filter(Boolean)].join('\n');
	});

	const props = [
		{ prop: 'validationRules', type: 'ValidationRules', initial: '{}', required: true },
		{ prop: 'url', type: 'string', initial: '', required: true },
		{ prop: 'method', type: "'POST' | 'PUT' | 'PATCH' | 'DELETE'", initial: '', required: true },
		{ prop: 'headers', type: 'Record<string, string>', initial: '{}' },
		{ prop: 'onError', type: '(errors: Record<string, string>) => void', initial: '' },
		{ prop: 'onSuccess', type: '(response: any) => void', initial: '' },
		{ prop: 'transformData', type: '(data: Record<string, any>) => any', initial: '' },
		{ prop: 'showToast', type: 'boolean', initial: 'false' },
		{ prop: 'errorTitle', type: 'string', initial: "'Error'" },
		{ prop: 'errorDescription', type: 'string', initial: '' },
		{ prop: 'errorIcon', type: 'string', initial: '' },
		{ prop: 'successTitle', type: 'string', initial: "'Success'" },
		{ prop: 'successDescription', type: 'string', initial: '' },
		{ prop: 'successIcon', type: 'string', initial: '' },
		{ prop: 'resetOnSuccess', type: 'boolean', initial: 'false' }
	];

	const validationRuleProps = [
		{ prop: 'rule', type: 'ValidationRuleType', initial: '', required: true },
		{ prop: 'message', type: 'string', initial: '', required: true }
	];

	const returnProps = [
		{ prop: 'state', type: 'HTMLFormElement', initial: '', required: false },
		{ prop: 'errors', type: 'Record<string, string>', initial: '{}', required: false },
		{ prop: 'isSubmitting', type: 'boolean', initial: 'false', required: false },
		{ prop: 'reset', type: '() => void', initial: '', required: false }
	];
</script>

{#snippet preview()}
	<form bind:this={form.state} class="space-y-4 w-full max-w-md">
		{#if exampleMode === 'basic' || exampleMode === 'edit'}
			<TextField
				name="name"
				placeholder="Enter your name"
				label="Name"
				errorText={form.errors.name}
			/>
		{/if}

		<TextField
			name="email"
			type="email"
			placeholder="Enter your email"
			label="Email"
			errorText={form.errors.email}
		/>

		<TextField
			name="password"
			type="password"
			placeholder="Enter your password"
			label="Password"
			errorText={form.errors.password}
		/>

		{#if exampleMode === 'register'}
			<TextField
				name="confirmPassword"
				type="password"
				placeholder="Confirm your password"
				label="Confirm Password"
				errorText={form.errors.confirmPassword}
			/>
		{/if}

		<Button type="submit" isDisabled={form.isSubmitting} isLoading={form.isSubmitting}>
			{form.isSubmitting
				? 'Submitting...'
				: exampleMode === 'login'
					? 'Login'
					: exampleMode === 'register'
						? 'Register'
						: exampleMode === 'edit' && isEditing
							? 'Update'
							: 'Submit'}
		</Button>
	</form>
{/snippet}

{#snippet builder()}
	<Select label="Example Mode" size="sm" options={exampleOptions} bind:value={exampleMode} />

	<DocOptions title="Configuration">
		<Checkbox bind:checked={showValidation} label="Validation Rules" />
		<Checkbox bind:checked={showTransform} label="Transform Data" />
		<Checkbox bind:checked={showCallbacks} label="Callbacks" />
		<Checkbox bind:checked={showToast} label="Show Toast" />
		<Checkbox bind:checked={resetOnSuccess} label="Reset on Success" />
		{#if exampleMode === 'edit'}
			<Checkbox bind:checked={isEditing} label="Edit Mode (PUT)" />
		{/if}
	</DocOptions>
{/snippet}

<DocHeader title="Form & useForm">
	A powerful form handling hook that manages form state, validation, submission, and error handling.
	Supports both create (POST) and edit (PUT/PATCH) modes dynamically.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode {code} />

<div class="prose mt-8">
	<h3>Configuration</h3>
	<p>The useForm hook accepts a configuration object with the following properties:</p>
</div>

<DocProps {props} />

<div class="prose mt-8">
	<h3>Validation Rule Type</h3>
	<p>Each validation rule in the validationRules object should follow this structure:</p>
</div>

<DocProps props={validationRuleProps} />

<div class="prose mt-8">
	<h3>Available Validation Rules</h3>
	<ul>
		<li><code>required</code> - Field is required</li>
		<li><code>email</code> - Valid email format</li>
		<li><code>url</code> - Valid URL format</li>
		<li><code>phone</code> - Valid phone number</li>
		<li><code>numeric</code> - Only numeric characters</li>
		<li><code>alpha</code> - Only alphabetic characters</li>
		<li><code>alphanumeric</code> - Only alphanumeric characters</li>
		<li><code>strongPassword</code> - Strong password requirements</li>
		<li><code>creditCard</code> - Valid credit card number</li>
		<li><code>date</code> - Valid date format</li>
		<li><code>min:number</code> - Minimum length (e.g., <code>min:5</code>)</li>
		<li><code>max:number</code> - Maximum length (e.g., <code>max:50</code>)</li>
		<li><code>minWords:number</code> - Minimum word count</li>
		<li><code>maxWords:number</code> - Maximum word count</li>
		<li><code>pattern:regex</code> - Custom regex pattern</li>
		<li><code>matches:fieldName</code> - Match another field</li>
		<li><code>custom:functionName</code> - Custom validation function</li>
	</ul>
</div>

<div class="prose mt-8">
	<h3>Return Value</h3>
	<p>The useForm hook returns an object with the following properties:</p>
</div>

<DocProps props={returnProps} />
