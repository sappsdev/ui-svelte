## AppBar Component

Top navigation bar for displaying information and actions at the top of a screen.

```svelte
<AppBar
  class="h-16"
  contentClass=""
  startClass=""
  centerClass=""
  endClass=""
  isBlurred={false}
  isBordered={false}
  hideOnScroll={false}
>
  {#snippet start()}
    <IconButton icon="fluent:navigation-24-regular" variant="ghost" />
  {/snippet}
  
  {#snippet center()}
    <NavMenu items={navItems} variant="ghost" />
  {/snippet}
  
  {#snippet end()}
    <Dropdown options={profileOptions} variant="ghost">
      <IconButton icon="fluent:person-24-regular" variant="ghost" />
    </Dropdown>
  {/snippet}
</AppBar>
```

### Key Props

| Prop | Default | Description |
|------|---------|-------------|
| `start` | - | Snippet for left content |
| `center` | - | Snippet for center content |
| `end` | - | Snippet for right content |
| `class` | - | Custom CSS classes |
| `contentClass` | - | Classes for content wrapper |
| `startClass` | - | Classes for start section |
| `centerClass` | - | Classes for center section |
| `endClass` | - | Classes for end section |
| `isBlurred` | `false` | Apply blur effect |
| `isBordered` | `false` | Show bottom border |
| `hideOnScroll` | `false` | Hide when scrolling down |

### Common Patterns

```svelte
<!-- Basic with title -->
<AppBar class="h-16">
  <h1>My App</h1>
</AppBar>

<!-- With navigation menu -->
<script>
  const navItems = [
    { label: 'Home', icon: 'fluent:home-24-regular', href: '/' },
    { label: 'Products', icon: 'fluent:box-24-regular', href: '/products' },
    { label: 'Contact', icon: 'fluent:mail-24-regular', href: '/contact' }
  ];
</script>

<AppBar class="h-16">
  {#snippet center()}
    <NavMenu items={navItems} variant="ghost" />
  {/snippet}
</AppBar>

<!-- With menu button and profile -->
<script>
  const profileOptions = [
    { id: '1', label: 'Profile', icon: 'fluent:person-24-regular', href: '/profile' },
    { id: '2', label: 'Settings', icon: 'fluent:settings-24-regular', href: '/settings' },
    { id: '3', label: 'Sign Out', icon: 'fluent:sign-out-24-regular', onclick: () => logout() }
  ];
</script>

<AppBar class="h-16" isBordered>
  {#snippet start()}
    <IconButton 
      icon="fluent:navigation-24-regular" 
      variant="ghost"
      onclick={() => toggleMenu()}
    />
  {/snippet}
  
  {#snippet end()}
    <Dropdown options={profileOptions} variant="ghost">
      <IconButton icon="fluent:person-24-regular" variant="ghost" />
    </Dropdown>
  {/snippet}
</AppBar>

<!-- Fixed with blur effect -->
<AppBar class="h-16 fixed top-0 w-full z-50" isBlurred isBordered>
  <p>Fixed AppBar with blur</p>
</AppBar>

<!-- Used within Scaffold -->
<Scaffold>
  {#snippet appBar()}
    <AppBar class="h-16">
      <!-- AppBar content -->
    </AppBar>
  {/snippet}
  
  <!-- Main content -->
  <div>Content</div>
</Scaffold>
```

**For LLMs**: AppBar for top navigation. Use `start`, `center`, `end` snippets for layout sections. Commonly combined with `IconButton`, `NavMenu`, and `Dropdown` components. Use within `Scaffold` component's `appBar` snippet for app layouts. Set `class="h-16"` for standard height. Use `isBlurred` for glassmorphism effect and `isBordered` for visual separation.
