## AppBar Component

Top navigation bar with slots for branding, navigation, and user actions.

```svelte
<AppBar
  variant="ghost"
  isBlurred={false}
  isBordered={false}
  borderOnScrollOnly={false}
  hideOnScroll={false}
  isSticky={false}
  isBoxed={false}
>
  {#snippet start()}...{/snippet}
  {#snippet center()}...{/snippet}
  {#snippet end()}...{/snippet}
</AppBar>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `start` | - | Snippet for left section (menu toggles, logos) |
| `center` | - | Snippet for middle section (navigation, title) |
| `end` | - | Snippet for right section (user actions, profile) |
| `variant` | `'ghost'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` |
| `isBlurred` | `false` | Adds backdrop blur when scrolled |
| `isBordered` | `false` | Shows bottom border |
| `borderOnScrollOnly` | `false` | Shows border only after scrolling |
| `hideOnScroll` | `false` | Hides on scroll down, shows on scroll up |
| `isSticky` | `false` | Sticks to top when scrolling |
| `isBoxed` | `false` | Constrains content width |
| `rootClass` | - | Custom class for root element |
| `contentClass` | - | Custom class for content wrapper |

### Examples

```svelte
<!-- Basic with NavMenu -->
<script lang="ts">
  import { AppBar, NavMenu, IconButton, Dropdown, Avatar } from 'ui-svelte';

  const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'About', href: '/about' }
  ];
</script>

<AppBar isBordered>
  {#snippet start()}
    <IconButton icon={MenuIcon} variant="ghost" />
  {/snippet}

  {#snippet center()}
    <NavMenu items={navItems} />
  {/snippet}

  {#snippet end()}
    <Dropdown options={profileOptions}>
      <Avatar src="/avatar.jpg" />
    </Dropdown>
  {/snippet}
</AppBar>

<!-- Sticky with blur effect -->
<AppBar isSticky isBlurred isBordered borderOnScrollOnly>
  {#snippet center()}
    <h1>My App</h1>
  {/snippet}
</AppBar>

<!-- Mobile responsive -->
<AppBar isBordered>
  {#snippet start()}
    <IconButton icon={MenuIcon} variant="ghost" class="md:hidden" />
  {/snippet}

  {#snippet center()}
    <NavMenu items={navItems} class="hidden md:flex" />
  {/snippet}
</AppBar>
```

### Related Components

- [IconButton](https://ui-svelte.sappsdev.com/llm/control/icon-button.md): For menu toggles and action buttons
- [Dropdown](https://ui-svelte.sappsdev.com/llm/overlay/dropdown.md): For profile menus and action menus
- [NavMenu](https://ui-svelte.sappsdev.com/llm/navigation/nav-menu.md): For horizontal navigation
- [Avatar](https://ui-svelte.sappsdev.com/llm/display/avatar.md): For user profile images

**For LLMs**: AppBar uses three snippet slots: `start` (left), `center` (middle), `end` (right). Combine with `NavMenu` for navigation, `IconButton` for menu toggles, and `Dropdown` with `Avatar` for profile menus. Use `isSticky` + `isBlurred` for modern sticky headers.
