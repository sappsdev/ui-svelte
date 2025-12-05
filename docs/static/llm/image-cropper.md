## ImageCropper Component

Interactive image cropping tool.

```svelte
<ImageCropper
  src="/image.jpg"
  alt="Image to crop"
  aspectRatio={16/9}
  minWidth={50}
  minHeight={50}
  maxWidth={800}
  maxHeight={600}
  onCrop={handleCrop}
/>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `src` | - | Image source URL (required) |
| `alt` | `'Image to crop'` | Alt text |
| `aspectRatio` | - | Aspect ratio (e.g., `16/9`, `1`) |
| `minWidth` | `50` | Minimum crop width |
| `minHeight` | `50` | Minimum crop height |
| `maxWidth` | - | Maximum crop width |
| `maxHeight` | - | Maximum crop height |
| `onCrop` | - | Handler `(croppedImage: string) => void` |

### Common Patterns

```svelte
<script>
  let croppedImage = $state('');
  
  const handleCrop = (dataUrl) => {
    croppedImage = dataUrl;
    console.log('Cropped image:', dataUrl);
  };
</script>

<!-- Basic -->
<ImageCropper src="/photo.jpg" onCrop={handleCrop} />

<!-- Square Crop -->
<ImageCropper src="/photo.jpg" aspectRatio={1} onCrop={handleCrop} />

<!-- 16:9 Crop -->
<ImageCropper src="/photo.jpg" aspectRatio={16/9} onCrop={handleCrop} />

<!-- With Size Limits -->
<ImageCropper 
  src="/photo.jpg" 
  minWidth={100} 
  minHeight={100}
  maxWidth={1000}
  maxHeight={1000}
  onCrop={handleCrop} 
/>

<!-- Display Cropped Result -->
{#if croppedImage}
  <img src={croppedImage} alt="Cropped" />
{/if}
```

**For LLMs**: ImageCropper for interactive image cropping. Shows image with draggable/resizable crop area. Use `aspectRatio` to lock ratio. Returns base64 data URL via `onCrop`. Includes grid overlay and resize handles. Use for profile pictures, thumbnails, etc.
