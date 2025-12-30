# Record Component

Audio recording with waveform visualization and review.

## Import

```svelte
import {Record} from 'ui-svelte';
```

## Props

| Prop                  | Type                                                                                  | Default     | Description           |
| --------------------- | ------------------------------------------------------------------------------------- | ----------- | --------------------- |
| `name`                | `string`                                                                              | -           | Input name (required) |
| `color`               | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme           |
| `variant`             | `'solid' \| 'soft'`                                                                   | `'soft'`    | Visual style          |
| `url`                 | `string`                                                                              | -           | Upload URL (POST)     |
| `headers`             | `Record<string, string>`                                                              | `{}`        | Upload headers        |
| `onRecordingComplete` | `(blob: Blob, url: string) => void`                                                   | -           | Complete callback     |
| `class`               | `string`                                                                              | -           | Additional classes    |

## Patterns

### Basic Recording

```svelte
<script>
	function handleComplete(blob: Blob, url: string) {
		console.log('Recording complete:', { blob, url });
	}
</script>

<Record name="voice-message" onRecordingComplete={handleComplete} />
```

### With Auto-Upload

```svelte
<Record
	name="audio-file"
	url="https://api.example.com/upload"
	headers={{ Authorization: 'Bearer token' }}
	onRecordingComplete={handleComplete}
/>
```

### Color Variants

```svelte
<Record name="demo1" color="primary" variant="soft" />
<Record name="demo2" color="success" variant="solid" />
```

## Features

- Real-time waveform visualization
- Pause/resume recording
- Review before saving
- Re-record option
- Timer display
- Confirm/cancel actions

## Workflow

1. Click to start recording
2. Pause/resume as needed
3. Click stop to review
4. Play back recording
5. Confirm to save or re-record

## Notes

- If `url` provided, uploads via POST on confirm
- If no `url`, saves blob to hidden file input
- `onRecordingComplete` receives blob and object URL
