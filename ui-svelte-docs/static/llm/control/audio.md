# Audio Component

Audio player with waveform visualization and playback controls.

## Import

```svelte
import {Audio} from 'ui-svelte';
```

## Props

| Prop        | Type                                                                                  | Default     | Description                     |
| ----------- | ------------------------------------------------------------------------------------- | ----------- | ------------------------------- |
| `src`       | `string`                                                                              | -           | Audio source URL                |
| `color`     | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'` | Color theme                     |
| `variant`   | `'solid' \| 'soft'`                                                                   | `'soft'`    | Visual style                    |
| `avatarSrc` | `string`                                                                              | -           | Avatar image URL (right side)   |
| `subtitle`  | `string`                                                                              | -           | Subtitle text (e.g., timestamp) |
| `class`     | `string`                                                                              | -           | Additional classes              |

## Patterns

### Basic

```svelte
<Audio src="https://example.com/audio.mp3" />
```

### With Avatar & Subtitle

```svelte
<Audio
	src="https://example.com/voice.mp3"
	avatarSrc="/user.jpg"
	subtitle="5:24 p.m."
	color="success"
/>
```

### Color Variants

```svelte
<Audio src="..." color="primary" variant="soft" />
<Audio src="..." color="muted" variant="solid" />
```

## Features

- Waveform visualization
- Play/pause controls
- Seek by clicking waveform
- Progress indicator
- Duration display

## Notes

- Avatar displays on right side for chat-style messages
- Subtitle appears below waveform
- Waveform generated from audio data
