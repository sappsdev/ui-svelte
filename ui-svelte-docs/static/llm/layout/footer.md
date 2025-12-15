## Footer Component

Bottom section with slots for copyright, navigation, and secondary actions.

```svelte
<Footer
  variant="ghost"
  isBlurred={false}
  isBordered={false}
  isBoxed={false}
  hideOnScroll={false}
>
  {#snippet start()}...{/snippet}
  {#snippet center()}...{/snippet}
  {#snippet end()}...{/snippet}
</Footer>
```

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `start` | - | Snippet for left section (copyright, branding) |
| `center` | - | Snippet for middle section (navigation links) |
| `end` | - | Snippet for right section (social links, info) |
| `variant` | `'ghost'` | `primary` `secondary` `muted` `success` `info` `warning` `danger` `surface` `ghost` |
| `isBlurred` | `false` | Adds backdrop blur effect |
| `isBordered` | `false` | Shows top border |
| `isBoxed` | `false` | Constrains content width |
| `hideOnScroll` | `false` | Hides on scroll down, shows on scroll up |
| `rootClass` | - | Custom class for root element |
| `contentClass` | - | Custom class for content wrapper |

### Sub-Components

#### FooterNav
Horizontal navigation links with active state detection.

```svelte
<FooterNav links={[
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' }
]} />
```

#### FooterGroup
Vertical link sections with title for multi-column layouts.

```svelte
<FooterGroup 
  title="Product" 
  links={[
    { label: 'Features', href: '/features' },
    { label: 'Docs', href: '/docs', external: true }
  ]} 
/>
```

### Examples

```svelte
<!-- Simple footer -->
<Footer isBordered>
  {#snippet start()}
    <p class="text-sm text-muted-foreground">© 2024 Company</p>
  {/snippet}

  {#snippet center()}
    <FooterNav links={navLinks} />
  {/snippet}

  {#snippet end()}
    <p class="text-sm text-muted-foreground">Made with ❤️</p>
  {/snippet}
</Footer>

<!-- Multi-column footer -->
<Footer isBordered>
  {#snippet center()}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <FooterGroup title="Product" links={productLinks} />
      <FooterGroup title="Company" links={companyLinks} />
      <FooterGroup title="Support" links={supportLinks} />
      <FooterGroup title="Legal" links={legalLinks} />
    </div>
  {/snippet}
</Footer>
```

**For LLMs**: Footer uses three snippet slots: `start` (left), `center` (middle), `end` (right). Use `FooterNav` for simple horizontal links. Use `FooterGroup` for multi-column layouts with categorized links. Combine with `Divider` for visual separation.
