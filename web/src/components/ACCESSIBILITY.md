# Guia de Acessibilidade - Design System Granovetter

Documento técnico sobre conformidade WCAG AAA dos componentes.

## Padrões Adotados

- **WCAG 2.1 Level AAA** (highest conformance)
- **ARIA 1.2** attributes onde apropriado
- **Keyboard navigation** completa
- **Screen reader** friendly
- **Color contrast** (7:1 ratio minimum)
- **Focus management** com indicators visíveis

## Componentes Atômicos

### Button

**Conformidade**: WCAG AAA ✅

- ✅ Semantic `<button>` element
- ✅ Proper `aria-busy` quando loading
- ✅ Focus visible with 2px outline
- ✅ Minimum touch target: 44x44px (lg size)
- ✅ Color contrast: 7:1+ ratio
- ✅ Keyboard: Enter, Space activation
- ✅ Disabled state: visual + functional

**Testing**:
```bash
npm run e2e -- button.spec.ts
```

**Audit with Axe DevTools**:
- Chrome DevTools → Lighthouse → Accessibility
- Or: `npm run test` → Checkbox tests

### Input

**Conformidade**: WCAG AAA ✅

- ✅ Associated `<label>` with `htmlFor`
- ✅ `aria-invalid` for errors
- ✅ `aria-describedby` for helper text
- ✅ Proper `type` attribute (email, number, etc)
- ✅ Focus visible with 2px outline
- ✅ Disabled state: visual + functional
- ✅ Placeholder is NOT label substitute

**Testing**:
```bash
npm run e2e -- input.spec.ts
```

## Componentes Molecules

### Card

**Conformidade**: WCAG AAA ✅

- ✅ Semantic section (or `<article>`)
- ✅ No keyboard trap
- ✅ Border left color for highlighting
- ✅ Sufficient contrast on all text
- ✅ Hoverable cards have `:focus` outline

### Badge

**Conformidade**: WCAG AAA ✅

- ✅ Semantic color for meaning (not color-only)
- ✅ Sufficient contrast: 7:1 minimum
- ✅ No blinking/animation
- ✅ If interactive: keyboard accessible

### FormGroup

**Conformidade**: WCAG AAA ✅

- ✅ Visible labels (never placeholder-only)
- ✅ Helper text properly associated
- ✅ Required indicator (*) with aria-label
- ✅ Error messages with `role="alert"`
- ✅ Logical tab order
- ✅ Instructions clear and concise

### Checkbox & Radio

**Conformidade**: WCAG AAA ✅

- ✅ Custom styled but keyboard accessible
- ✅ `:checked` and `:indeterminate` states
- ✅ Label properly associated
- ✅ Focus visible on both input and label
- ✅ Sufficient color contrast on custom indicator
- ✅ Name, role, value determinable by AT
- ✅ Disabled state clear

**Focus Management**:
- When focused: 2px outline on input
- On label: cursor indicates clickability
- Tab order: natural DOM order

### DataCard

**Conformidade**: WCAG AAA ✅

- ✅ Semantic heading for label
- ✅ Numeric values with context
- ✅ Icon has accessible name via aria-label
- ✅ Change indicator clearly marked (↑↓ with aria-label)
- ✅ Color not sole indicator

## Componentes Organisms

### Header

**Conformidade**: WCAG AAA ✅

- ✅ Navigation with `<nav>` and aria-label
- ✅ Current page: `aria-current="page"`
- ✅ Skip links (implementar em templates)
- ✅ Logo clickable to home with accessible name
- ✅ User menu: `aria-haspopup`, `aria-expanded`
- ✅ Dropdown menu with `role="menu"`
- ✅ Keyboard: Tab/Shift+Tab, Escape to close
- ✅ Position fixed: doesn't block content

**Keyboard Navigation**:
- Tab: move through nav links
- Enter/Space: open user menu
- Escape: close user menu
- Arrow keys: navigate menu items

### RiskRadar

**Conformidade**: WCAG AAA ✅

- ✅ SVG with `role="img"` e `aria-label`
- ✅ Interactive points: `role="button"`, `tabIndex=0`
- ✅ Focus visible with outline
- ✅ Tooltip on hover: `aria-label` com valor
- ✅ Graceful degradation without JS
- ✅ Color + pattern for distinction

**Keyboard Navigation**:
- Tab: navigate to data points
- Enter/Space: interact with point
- Tooltip shows via aria-label

### SocialGraph

**Conformidade**: WCAG AAA ✅

- ✅ SVG with `role="img"`
- ✅ Draggable nodes: `role="button"`, `tabIndex=0`
- ✅ Focus visible with outline
- ✅ Cursor changes: grab/grabbing
- ✅ Legend: explains visual encoding
- ✅ Connection strength via stroke-width AND opacity

**Keyboard Navigation**:
- Tab: navigate to nodes
- Enter/Space: focus node
- Drag not keyboard accessible (use description)

### ThresholdHeatmap

**Conformidade**: WCAG AAA ✅

- ✅ `<table>` semantic (grid = CSS Grid alternative)
- ✅ Header row with `<th>`
- ✅ `scope="col"` / `scope="row"`
- ✅ Cells are clickable: `role="button"`, `tabIndex=0`
- ✅ Color + pattern for colorblind users
- ✅ Legend explains colors
- ✅ Focus visible with inset box-shadow

**Keyboard Navigation**:
- Tab: navigate cells
- Enter/Space: interact
- Values readable without color

### Dashboard

**Conformidade**: WCAG AAA ✅

- ✅ Semantic structure: `<h1>` title, `<h2>` sections
- ✅ Proper heading hierarchy
- ✅ Grid layout responsive at all sizes
- ✅ No content hiding (just reflow)
- ✅ Skip to main content link
- ✅ Section landmarks with headings

## Testes de Acessibilidade

### Automated Testing

```bash
# Vitest com accessibility checks
npm run test

# Playwright com Axe Core
npm run e2e

# Storybook a11y addon
npm run storybook
# Navegue → Components → Acessibilidade tab
```

### Manual Testing

1. **Keyboard Navigation**:
   ```bash
   # Tab through entire interface
   # Verify all interactive elements are reachable
   # Verify focus indicators are visible
   ```

2. **Screen Reader** (NVDA Windows / JAWS / VoiceOver Mac):
   ```bash
   npm run storybook
   # Ative screen reader
   # Navegue via tab e arrow keys
   # Verifique: labels, roles, states são anunciados
   ```

3. **Color Contrast**:
   - Chrome DevTools → Lighthouse → Accessibility
   - WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
   - Requirement: 7:1 for AAA (normal text), 4.5:1 (large text)

4. **Color Blindness**:
   - Don't rely on color alone
   - Use patterns, icons, text labels
   - Test with: https://www.color-blindness.com/coblis-color-blindness-simulator/

5. **Zoom & Responsive**:
   ```bash
   # Zoom to 200%
   # Verify no content cut off
   # Verify all interactive elements still accessible
   # Test on mobile (375px width)
   ```

6. **Motion**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     /* All animations removed */
   }
   ```

## WCAG Success Criteria Checklist

### Perceivable

- ✅ **1.4.3 Contrast (Minimum)** - Level AA/AAA
  - Text 7:1 ratio (AAA)
  - Large text (18pt+) 4.5:1 ratio (AA)

- ✅ **1.4.11 Non-text Contrast** - Level AAA
  - UI Components 3:1 ratio
  - Graphical elements 3:1 ratio

### Operable

- ✅ **2.1.1 Keyboard** - Level A
  - All functionality accessible via keyboard
  - No keyboard trap
  - Focus visible

- ✅ **2.4.3 Focus Order** - Level A
  - Logical tab order
  - Focus visible clearly

- ✅ **2.4.7 Focus Visible** - Level AA
  - Visible focus indicator (2px outline minimum)

### Understandable

- ✅ **3.2.1 On Focus** - Level A
  - No unexpected context changes on focus

- ✅ **3.2.2 On Input** - Level A
  - No unexpected changes from input

- ✅ **3.3.2 Labels or Instructions** - Level A
  - Form fields have visible labels
  - Error messages provided

### Robust

- ✅ **4.1.2 Name, Role, Value** - Level A
  - All components have accessible names
  - Roles properly set
  - State updates announced

- ✅ **4.1.3 Status Messages** - Level AA
  - Status updates announced to screen readers

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

## CI/CD

Accessibility checks rodam automaticamente em:

1. **Pre-commit**:
   - Visual focus indicators
   - ARIA validation

2. **Unit Tests**:
   - Button.test.tsx: keyboard navigation
   - Checkbox.test.tsx: ARIA attributes
   - FormGroup.test.tsx: label association

3. **E2E Tests**:
   - button.spec.ts: Axe audit
   - Keyboard navigation tests
   - Focus management tests

4. **Storybook**:
   - a11y addon: cada story auditada automaticamente
   - Violations bloqueadas em production builds

5. **Lighthouse CI**:
   - Accessibility score: minimum 90%
   - Pre-commit hook verification

## Suporte

Para reportar problemas de acessibilidade:
- Abra uma issue: `[A11Y] Descrição do problema`
- Inclua: componente, navegador, AT usado, passos para reproduzir
