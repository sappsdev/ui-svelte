## IconButton Component

Compact button displaying only an icon for toolbars and action menus.

```svelte
<IconButton
  icon={IconData}
  onclick={handleClick}
  variant="primary"
  size="md"
  type="button"
  href=""
  isLoading={false}
  isDisabled={false}
  isSolid={false}
/>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `icon` | - | Icon to display (required) |
| `onclick` | - | Click handler |
| `href` | - | URL (converts to link) |
| `variant` | `'primary'` | `primary` `secondary` `muted` `outlined` `ghost` `success` `info` `warning` `danger` |
| `size` | `'md'` | `xs` `sm` `md` `lg` |
| `type` | `'button'` | `button` `submit` `reset` |
| `isLoading` | `false` | Show spinner, disable |
| `isDisabled` | `false` | Disable interactions |
| `isSolid` | `false` | Solid background |

### Examples

```svelte
<!-- Basic -->
<IconButton icon={HeartIcon} onclick={handleLike} />

<!-- Link -->
<IconButton icon={SettingsIcon} href="/settings" />

<!-- Variants -->
<IconButton icon={TrashIcon} variant="danger" />
<IconButton icon={CloseIcon} variant="ghost" />

<!-- Loading -->
<IconButton icon={SaveIcon} isLoading />

<!-- Toolbar -->
<div class="row gap-2">
  <IconButton icon={BoldIcon} variant="ghost" />
  <IconButton icon={ItalicIcon} variant="ghost" />
  <IconButton icon={UnderlineIcon} variant="ghost" />
</div>

<!-- Solid -->
<IconButton icon={DownloadIcon} variant="success" isSolid />
```

**For LLMs**: Use `icon` prop with IconData. Ideal for toolbars, action menus, and compact UI. Use `ghost` variant for toolbar buttons, `danger` for delete actions.
