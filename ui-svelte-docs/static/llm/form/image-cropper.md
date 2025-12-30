# ImageCropper Component

Avatar-style image upload with modal cropping interface.

## Import

```svelte
import {ImageCropper} from 'ui-svelte';
```

## Props

| Prop          | Type                                                                                  | Default     | Description            |
| ------------- | ------------------------------------------------------------------------------------- | ----------- | ---------------------- |
| `src`         | `string`                                                                              | `''`        | Initial image URL      |
| `alt`         | `string`                                                                              | `'Avatar'`  | Image alt text         |
| `label`       | `string`                                                                              | -           | Field label            |
| `name`        | `string`                                                                              | -           | Form field name        |
| `helpText`    | `string`                                                                              | -           | Helper text            |
| `errorText`   | `string`                                                                              | -           | Error message          |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                                | `'md'`      | Avatar size            |
| `shape`       | `'circle' \| 'square'`                                                                | `'circle'`  | Avatar shape           |
| `color`       | `'primary' \| 'secondary' \| 'muted' \| 'success' \| 'info' \| 'danger' \| 'warning'` | `'muted'`   | Color theme            |
| `variant`     | `'solid' \| 'soft' \| 'outlined' \| 'ghost'`                                          | `'soft'`    | Visual style           |
| `aspectRatio` | `number`                                                                              | -           | Crop aspect ratio      |
| `minWidth`    | `number`                                                                              | `50`        | Minimum crop width     |
| `minHeight`   | `number`                                                                              | `50`        | Minimum crop height    |
| `accept`      | `string`                                                                              | `'image/*'` | Accepted file types    |
| `disabled`    | `boolean`                                                                             | `false`     | Disable upload         |
| `onCrop`      | `(croppedImage: string) => void`                                                      | -           | Crop complete callback |
| `onChange`    | `(file: File \| null) => void`                                                        | -           | File change callback   |

## Patterns

### Profile Picture

```svelte
<script>
	let avatar = $state('');

	function handleCrop(cropped: string) {
		avatar = cropped;
	}
</script>

<ImageCropper label="Profile Picture" shape="circle" aspectRatio={1} onCrop={handleCrop} />
```

### Cover Image

```svelte
<ImageCropper
	label="Cover Image"
	shape="square"
	size="lg"
	aspectRatio={16 / 9}
	onCrop={handleCrop}
/>
```

### With Initial Image

```svelte
<ImageCropper src="/existing-avatar.jpg" shape="circle" aspectRatio={1} onCrop={handleCrop} />
```

### Form Integration

```svelte
<ImageCropper
	name="avatar"
	label="Your Photo"
	helpText="Click to upload"
	errorText={errors.avatar}
	onCrop={handleCrop}
	onChange={(file) => console.log(file)}
/>
```

## Features

- **Avatar Style**: Compact button displaying cropped image
- **Click to Upload**: Click avatar to select image file
- **Modal Cropper**: Full cropping interface in modal
- **Drag to Move**: Drag crop area to reposition
- **Resize Handles**: Eight handles for precise resizing
- **Aspect Ratio Lock**: Maintain specific proportions
- **Visual Grid**: Rule of thirds guide on hover
- **Edit Existing**: Click avatar to re-crop
- **Remove Image**: Clear and upload new image

## Notes

- `onCrop` returns base64 data URL of cropped image
- `onChange` fires when file selected (before crop)
- Use `aspectRatio={1}` for square crop
