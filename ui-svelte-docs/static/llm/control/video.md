# Video Component

Video player with HLS support and custom controls.

## Import

```svelte
import {Video} from 'ui-svelte';
```

## Props

| Prop       | Type                                                                                  | Default        | Description                    |
| ---------- | ------------------------------------------------------------------------------------- | -------------- | ------------------------------ |
| `src`      | `string`                                                                              | -              | Video source URL or HLS stream |
| `poster`   | `string`                                                                              | -              | Poster image URL               |
| `autoplay` | `boolean`                                                                             | `false`        | Auto-play on load              |
| `aspect`   | `'horizontal' \| 'vertical' \| 'square'`                                              | `'horizontal'` | Aspect ratio                   |
| `color`    | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'primary'`    | Control color                  |
| `class`    | `string`                                                                              | -              | Additional classes             |

## Patterns

### Basic

```svelte
<Video src="/video.mp4" poster="/poster.jpg" />
```

### HLS Stream

```svelte
<Video src="https://example.com/stream.m3u8" poster="/poster.jpg" />
```

### Aspect Ratios

```svelte
<Video src="..." aspect="horizontal" />
<!-- 16:9 -->
<Video src="..." aspect="vertical" />
<!-- 9:16 -->
<Video src="..." aspect="square" />
<!-- 1:1 -->
```

### Auto-play

```svelte
<Video src="/video.mp4" autoplay />
```

## Features

- HLS streaming support (auto-detected)
- Standard video file support
- Custom styled controls:
  - Play/pause
  - Volume control
  - Progress bar with seek
  - Time display
  - Picture-in-picture
  - Fullscreen

## Notes

- HLS streams detected by `.m3u8` extension
- Poster shown before playback starts
- Controls hide during playback, show on hover
- `aspect="horizontal"` = 16:9 (default)
