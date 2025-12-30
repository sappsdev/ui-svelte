# useForm Hook

Form handling with validation, submission, and error management.

## Import

```svelte
import {useForm} from 'ui-svelte';
```

## Configuration

| Option               | Type                         | Default     | Description              |
| -------------------- | ---------------------------- | ----------- | ------------------------ |
| `validationRules`    | `ValidationRules`            | `{}`        | Field validation rules   |
| `url`                | `string`                     | -           | API endpoint URL         |
| `method`             | `'POST' \| 'PUT' \| 'PATCH'` | -           | HTTP method              |
| `headers`            | `Record<string, string>`     | `{}`        | Request headers          |
| `showToast`          | `boolean`                    | `false`     | Show toast notifications |
| `successTitle`       | `string`                     | `'Success'` | Toast success title      |
| `successDescription` | `string`                     | -           | Toast success message    |
| `errorTitle`         | `string`                     | `'Error'`   | Toast error title        |
| `resetOnSuccess`     | `boolean`                    | `false`     | Reset form after success |
| `transformData`      | `(data) => any`              | -           | Transform before submit  |
| `onSuccess`          | `(response) => void`         | -           | Success callback         |
| `onError`            | `(errors) => void`           | -           | Error callback           |

## Return Value

| Property       | Type                     | Description            |
| -------------- | ------------------------ | ---------------------- |
| `state`        | `HTMLFormElement`        | Form element reference |
| `errors`       | `Record<string, string>` | Field errors           |
| `isSubmitting` | `boolean`                | Submission state       |
| `reset`        | `() => void`             | Reset form             |

## Validation Rules

| Rule             | Description                  |
| ---------------- | ---------------------------- |
| `required`       | Field is required            |
| `email`          | Valid email format           |
| `url`            | Valid URL format             |
| `phone`          | Valid phone number           |
| `min:N`          | Minimum length               |
| `max:N`          | Maximum length               |
| `strongPassword` | Strong password requirements |
| `matches:field`  | Match another field          |
| `pattern:regex`  | Custom regex pattern         |

## Patterns

### Login Form

```svelte
<script>
	let form = useForm({
		validationRules: {
			email: [
				{ rule: 'required', message: 'Email is required' },
				{ rule: 'email', message: 'Invalid email format' }
			],
			password: [
				{ rule: 'required', message: 'Password is required' },
				{ rule: 'min:8', message: 'Min 8 characters' }
			]
		},
		url: '/api/login',
		method: 'POST',
		showToast: true
	});
</script>

<form bind:this={form.state}>
	<TextField name="email" label="Email" errorText={form.errors.email} />
	<TextField name="password" type="password" label="Password" errorText={form.errors.password} />
	<Button type="submit" isDisabled={form.isSubmitting} isLoading={form.isSubmitting}>Login</Button>
</form>
```

### Create/Edit Mode

```svelte
<script>
	let isEditing = $state(false);
	const userId = $derived(isEditing ? '123' : undefined);

	let form = useForm({
		url: isEditing ? `/api/users/${userId}` : '/api/users',
		method: isEditing ? 'PUT' : 'POST',
		validationRules: {
			name: [{ rule: 'required', message: 'Name is required' }],
			email: [{ rule: 'email', message: 'Invalid email' }]
		}
	});
</script>

<Button type="submit">
	{isEditing ? 'Update' : 'Create'}
</Button>
```

## Notes

- Bind `form.state` to form element
- Display `form.errors.fieldName` on each field
- Use `form.isSubmitting` for loading states
- Supports dynamic URL/method for CRUD operations
