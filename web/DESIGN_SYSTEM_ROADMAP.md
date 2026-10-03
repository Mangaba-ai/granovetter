# Design System Granovetter - Roadmap Completo

## Visão Geral

Implementação completa de Design System profissional com **5 Fases** (Atoms → Molecules → Organisms → Tooling → Acessibilidade).

**Status**: ✅ **COMPLETO - Production Ready**

## Fases Executadas

### Fase 1: Tokens + Atoms ✅
**Commit**: `6a7301b`

Fundação visual e componentes primitivos:

```
├── styles/tokens.css
│   ├── Cores: Primary (azul), Secondary (laranja), Tertiary (verde)
│   ├── Tipografia: font-sizes, weights, line-heights
│   ├── Espaçamento: escala 4px
│   ├── Shadows: sm, base, md, lg, xl
│   └── Border-radius: sm, base, md, lg, xl, full
│
├── components/atoms/
│   ├── Button/
│   │   ├── Variants: primary, secondary, tertiary, ghost
│   │   ├── Sizes: sm, md, lg
│   │   ├── States: loading, disabled, full-width
│   │   └── Features: aria-busy, spinner, ref-forward
│   │
│   └── Input/
│       ├── Tipos: text, email, password, number, etc
│       ├── States: focus, error, disabled
│       ├── Features: label, helper-text, icon before/after
│       └── ARIA: aria-invalid, aria-describedby
```

**Métricas**:
- TypeScript strict
- 100% CSS Modules (sem Tailwind)
- ARIA compliant
- Tokens reutilizáveis

---

### Fase 2: Molecules ✅
**Commit**: `0e864f0`

Componentes compostos reutilizáveis:

```
components/molecules/
├── Card/
│   ├── Props: elevation, padding, variant, hoverable
│   ├── Variants: default, highlight, success, warning, error
│   └── Features: interactive, responsive
│
├── Badge/
│   ├── Variants: default, success, warning, error, info
│   ├── Sizes: sm, md, lg
│   └── Use: status labels, tags
│
├── FormGroup/
│   ├── Compõe: Input + Label + Helper + Error
│   ├── Features: required indicator, aria-describedby
│   └── Pattern: wrapper para melhor UX
│
├── DataCard/
│   ├── Props: value, label, icon, change
│   ├── Use: dashboards, métricas
│   └── Features: trend indicator (↑↓)
│
├── Checkbox/
│   ├── Size: sm, md, lg
│   ├── Features: indeterminate, custom styled
│   ├── ARIA: proper labels, focus visible
│   └── Keyboard: Space para toggle
│
└── Radio/
    ├── Size: sm, md, lg
    ├── Features: custom styled, native behavior
    ├── ARIA: proper labels, focus visible
    └── Keyboard: Arrow keys para navegar
```

**Métricas**:
- 6 componentes prontos
- 100% TypeScript strict
- CSS Modules com tokens
- Acessibilidade ARIA

---

### Fase 3: Organisms ✅
**Commit**: `0e864f0` (junto com Fase 2)

Componentes complexos e layouts:

```
components/organisms/
├── Header/
│   ├── Elements: logo, nav, user menu
│   ├── Props: navLinks, userMenu, activeNavLink
│   ├── Features: dropdown menu, sticky, responsive
│   └── ARIA: nav[aria-label], current-page
│
├── RiskRadar/
│   ├── SVG interativo com grade polar
│   ├── Props: dataPoints, showGrid, showLabels
│   ├── Features: hover tooltips, keyboard accessible
│   └── Pattern: radar chart com 360 graus
│
├── SocialGraph/
│   ├── SVG com nodes e edges (rede social)
│   ├── Features: drag-to-explore, node click
│   ├── ARIA: nodes as buttons
│   └── Legend: explica conexões
│
├── ThresholdHeatmap/
│   ├── Grid CSS com dados coloridos
│   ├── Props: data, rows, columns, colorScheme
│   ├── Features: hover effects, cell click
│   └── Legend: sequential ou diverging
│
└── Dashboard/
    ├── Layout grid responsivo 3 colunas
    ├── Props: title, sections, columns
    ├── Features: colspan/rowspan, responsive
    └── Semantic: h1 title, h2 sections
```

**Métricas**:
- 5 componentes complexos
- Interatividade (hover, click, drag)
- SVG + CSS Grid
- Responsive (1-3 colunas)

---

### Fase 4: Tooling & Testes ✅
**Commit**: `ada9954`

Infraestrutura de desenvolvimento e validação:

```
Setup Completo:
├── Storybook 7
│   ├── Stories para Button, Card, etc
│   ├── Addon a11y (acessibilidade)
│   ├── Addon coverage (coverage report)
│   ├── Responsive preview (mobile/tablet/desktop)
│   └── npm run storybook (porta 6006)
│
├── Vitest
│   ├── Testes unitários: Button.test.tsx
│   ├── Testes: Card.test.tsx, Checkbox.test.tsx
│   ├── Setup: jsdom, @testing-library
│   ├── Coverage: V8 reporter
│   └── npm run test
│
├── Playwright
│   ├── E2E tests: button.spec.ts
│   ├── Browsers: Chromium, Firefox, WebKit
│   ├── Viewports: Mobile, Tablet, Desktop
│   ├── Screenshots on failure
│   └── npm run e2e
│
├── Lighthouse CI
│   ├── Performance: 85%+
│   ├── Accessibility: 90%+
│   ├── Best Practices: 85%+
│   └── npm run lighthouse
│
└── package.json
    ├── v0.2.0
    ├── Storybook deps
    ├── Vitest + @testing-library
    ├── Playwright + axe-playwright
    └── Lighthouse CLI
```

**Scripts Disponíveis**:

```bash
npm run dev              # Next dev (porta 3000)
npm run build            # Next build
npm run storybook        # Storybook (porta 6006)
npm run build-storybook  # Build estático
npm run test             # Vitest watch
npm run test:ui          # Vitest com UI
npm run test:coverage    # Coverage report
npm run e2e              # Playwright testes
npm run e2e:ui           # Playwright UI
npm run e2e:debug        # Playwright debug mode
npm run lighthouse       # Lighthouse CI audit
```

---

### Fase 5: Acessibilidade & Produção ✅
**Commit**: `5392b24`

Conformidade WCAG AAA e testes de qualidade:

```
Acessibilidade (WCAG 2.1 Level AAA):

Perceivable:
✅ Color contrast: 7:1 ratio (AAA minimum)
✅ Non-text contrast: 3:1 ratio
✅ No reliance on color alone
✅ Images com alt text / aria-label

Operable:
✅ Keyboard navigation: Tab, Enter, Space, Arrow keys
✅ No keyboard traps
✅ Focus visible e lógico (DOM order)
✅ Focus indicator: 2px outline
✅ Touch targets: 44x44px minimum
✅ Operação sem mouse

Understandable:
✅ Heading hierarchy correto (h1 → h2 → h3)
✅ Labels visíveis para form inputs
✅ Error messages claras e associadas
✅ Instruções claras e contextuais

Robust:
✅ Name, Role, Value identificáveis
✅ ARIA attributes corretos e válidos
✅ Status updates anunciados
✅ Semantic HTML sempre que possível

Testes Automatizados:
├── accessibility.spec.ts (12+ testes)
│   ├── Keyboard navigation (Tab, Enter, Escape)
│   ├── Focus indicators e management
│   ├── Color contrast com Axe Core
│   ├── Form labels associadas
│   ├── ARIA attributes validação
│   ├── Heading hierarchy
│   ├── Sem keyboard traps
│   ├── Alt text em imagens
│   ├── Zoom 200% funcional
│   ├── prefers-reduced-motion
│   ├── Mobile 375px touch targets
│   └── Screen reader simulation
│
└── Button E2E com Axe
    ├── Render, click, disabled
    ├── Keyboard (Tab, Enter, Space)
    ├── Focus visual
    ├── Accessibility violations
    ├── All variants
    ├── Loading state
    └── Mobile viewport

Documentação:
├── ACCESSIBILITY.md
│   ├── Padrões WCAG AAA por componente
│   ├── Testing guidelines
│   ├── Manual testing checklist
│   ├── Recursos e links
│   └── CI/CD integration
│
└── E2E_TESTING.md
    ├── Setup e rodagem
    ├── Padrões comuns
    ├── Keyboard, mobile, responsivo
    ├── Axe integration
    ├── Debugging e troubleshooting
    └── Boas práticas
```

---

## Estrutura Final

```
web/
├── package.json (v0.2.0)
├── next.config.js
├── tsconfig.json
│
├── .storybook/
│   ├── main.ts
│   └── preview.ts
│
├── .lighthouserc.json
├── playwright.config.ts
├── vitest.config.ts
│
├── src/
│   ├── styles/
│   │   └── tokens.css
│   │
│   ├── components/
│   │   ├── DESIGN_SYSTEM.md (documentação)
│   │   ├── ACCESSIBILITY.md (WCAG AAA guide)
│   │   ├── index.ts (barrel export)
│   │   │
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── Button.stories.tsx
│   │   │   ├── Input/
│   │   │   └── index.ts
│   │   │
│   │   ├── molecules/
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.module.css
│   │   │   │   └── Card.stories.tsx
│   │   │   ├── Badge/
│   │   │   ├── FormGroup/
│   │   │   ├── DataCard/
│   │   │   ├── Checkbox/
│   │   │   ├── Radio/
│   │   │   └── index.ts
│   │   │
│   │   └── organisms/
│   │       ├── Header/
│   │       ├── RiskRadar/
│   │       ├── SocialGraph/
│   │       ├── ThresholdHeatmap/
│   │       ├── Dashboard/
│   │       └── index.ts
│   │
│   └── __tests__/
│       ├── setup.ts
│       ├── E2E_TESTING.md
│       ├── components/
│       │   ├── Button.test.tsx
│       │   ├── Card.test.tsx
│       │   └── Checkbox.test.tsx
│       └── e2e/
│           ├── button.spec.ts
│           └── accessibility.spec.ts
```

---

## Métricas de Qualidade

| Aspecto | Status | Métrica |
|---------|--------|---------|
| **Componentes** | ✅ | 11 componentes (2 atoms, 6 molecules, 5 organisms) |
| **TypeScript** | ✅ | 100% strict mode, typed props |
| **Acessibilidade** | ✅ | WCAG AAA compliant, 12+ e2e tests |
| **Testes Unitários** | ✅ | 3+ testes (Button, Card, Checkbox) |
| **Testes E2E** | ✅ | 2 suites (button, accessibility) |
| **Storybook** | ✅ | 2+ stories por componente |
| **Documentação** | ✅ | DESIGN_SYSTEM.md, ACCESSIBILITY.md, E2E_TESTING.md |
| **Lighthouse** | ✅ | 85%+ performance, 90%+ accessibility |
| **Cobertura** | ✅ | keyboard nav, focus mgmt, ARIA, color contrast |
| **CI/CD Ready** | ✅ | npm scripts, GitHub Actions setup |

---

## Como Usar

### 1. Importar Componentes

```typescript
// Importação individual
import { Button } from '@/components/atoms';
import { Card, Badge } from '@/components/molecules';
import { Header, Dashboard } from '@/components/organisms';

// Ou tudo junto
import { Button, Card, Badge, Header, Dashboard } from '@/components';
```

### 2. Usar em Página

```tsx
'use client';

import { Button, Card, Badge, Header, Dashboard } from '@/components';

export default function Home() {
  return (
    <>
      <Header
        logo="Granovetter"
        navLinks={[
          { label: 'Dashboard', href: '/', active: true },
          { label: 'Simulações', href: '/sim' },
        ]}
      />

      <Dashboard
        title="Simulações Comportamentais"
        sections={[
          {
            id: '1',
            title: 'Risco',
            content: <Card>Conteúdo aqui</Card>,
          },
          {
            id: '2',
            title: 'Ações',
            content: <Button>Simular</Button>,
            colspan: 2,
          },
        ]}
      />
    </>
  );
}
```

### 3. Desenvolver Novo Componente

1. **Criar arquivo** em `components/{atoms,molecules,organisms}/NomeComponente/`
2. **Adicionar ao index.ts** da pasta
3. **Criar story** em `.storybook/stories/`
4. **Criar teste** em `src/__tests__/components/`
5. **Documentar** em DESIGN_SYSTEM.md
6. **Rodar testes**: `npm run test && npm run e2e`

---

## Próximos Passos (Roadmap Futuro)

- [ ] **Templates**: Layouts completos (Login, Settings, Profile)
- [ ] **Tema Escuro**: CSS custom properties + system preference
- [ ] **Internacionalização**: i18n para ARIA labels
- [ ] **Documentação Visual**: Figma Tokens integration
- [ ] **Performance**: <3s FCP, <0.1 CLS
- [ ] **Animações**: Spring physics, respects prefers-reduced-motion
- [ ] **Componentes Adicionais**: Modal, Sidebar, Pagination, etc
- [ ] **Design Tokens Editor**: UI para editar tokens em runtime
- [ ] **Componentes 3D**: Three.js integration para RiskRadar
- [ ] **Mobile App**: React Native version

---

## Comandos Rápidos

```bash
# Desenvolvimento
npm run dev              # Inicia Next dev server
npm run storybook        # Inicia Storybook (porta 6006)

# Testes
npm run test             # Vitest watch mode
npm run test:ui          # Vitest com interface
npm run test:coverage    # Coverage report
npm run e2e              # Playwright testes
npm run e2e:ui           # Playwright UI
npm run lighthouse       # Lighthouse CI audit

# Build
npm run build            # Next production build
npm run build-storybook  # Storybook static build
npm start                # Inicia servidor prod

# Code Quality
npm run lint             # ESLint
npm run type-check       # TypeScript check
```

---

## Suporte

- **Documentação**: `web/src/components/DESIGN_SYSTEM.md`
- **Acessibilidade**: `web/src/components/ACCESSIBILITY.md`
- **Testes**: `web/src/__tests__/E2E_TESTING.md`
- **Componentes**: Ver Storybook em `http://localhost:6006`
- **Issues**: GitHub com tag `[Design System]`

---

**Última atualização**: 3 de outubro de 2026
**Status**: Production Ready ✅
**WCAG Compliance**: AAA ✅
