# TextField Component

Input field for text data entry.

## Import

```svelte
import {TextField} from 'ui-svelte';
```

## Props

| Prop           | Type                                                                                  | Default      | Description               |
| -------------- | ------------------------------------------------------------------------------------- | ------------ | ------------------------- |
| `value`        | `string \| number`                                                                    | `''`         | Bound value               |
| `type`         | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'`                       | `'text'`     | Input type                |
| `color`        | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`    | Color theme               |
| `variant`      | `'solid' \| 'soft' \| 'outlined' \| 'line'`                                           | `'outlined'` | Visual style              |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                                | `'md'`       | Input size                |
| `label`        | `string`                                                                              | -            | Label text                |
| `isFloatLabel` | `boolean`                                                                             | `false`      | Floating label style      |
| `placeholder`  | `string`                                                                              | -            | Placeholder text          |
| `helpText`     | `string`                                                                              | -            | Help message below input  |
| `errorText`    | `string`                                                                              | -            | Error message below input |
| `startIcon`    | `IconData`                                                                            | -            | Icon at start             |
| `endIcon`      | `IconData`                                                                            | -            | Icon at end               |
| `startText`    | `string`                                                                              | -            | Text prefix               |
| `endText`      | `string`                                                                              | -            | Text suffix               |

## Patterns

### Basic Input

```svelte
<TextField bind:value placeholder="Enter text..." />
```

### With Label

```svelte
<TextField label="Username" placeholder="Enter username" />

<TextField label="Email" isFloatLabel placeholder="Enter email" />
```

### With Icons

```svelte
<TextField startIcon={SearchIcon} placeholder="Search..." />

<TextField endIcon={UserIcon} placeholder="Username" />
```

### With Text Affixes

```svelte
<TextField startText="$" placeholder="Amount" />

<TextField startText="https://" endText=".com" placeholder="domain" />
```

### Validation States

```svelte
<TextField label="Email" helpText="We'll never share your email" />

<TextField label="Password" errorText="Password is required" />
```

## Component References

- **@see icons.md** - Icon usage for `startIcon`, `endIcon`
