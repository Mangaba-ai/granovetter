# Granovetter Design System v1.0

Documentação da arquitetura de componentes reutilizáveis para o laboratório de simulação comportamental.

## Estrutura

```
components/
├── atoms/          # Componentes primitivos (Button, Input, Label, etc)
├── molecules/      # Componentes compostos (Card, FormGroup, etc)
├── organisms/      # Componentes complexos (Header, Dashboard, etc)
├── templates/      # Layouts de página
└── DESIGN_SYSTEM.md
```

## Componentes Atômicos

### Button
Componente de botão reutilizável com múltiplas variantes.

```tsx
import { Button } from '@/components/atoms';

<Button variant="primary" size="md" onClick={handleClick}>
  Simular
</Button>

<Button 
  variant="secondary" 
  size="lg" 
  isLoading={true}
  fullWidth
>
  Processando...
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'tertiary' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `fullWidth`: boolean
- `disabled`: boolean

### Input
Campo de entrada com suporte a labels, helper text e validação.

```tsx
import { Input } from '@/components/atoms';

<Input 
  label="Nome da Organização"
  placeholder="Ex: Acme Corp"
  helperText="Nome será usado em relatórios"
/>

<Input 
  label="Email"
  type="email"
  error={true}
  errorMessage="Email inválido"
/>
```

**Props:**
- `label`: string
- `helperText`: string
- `error`: boolean
- `errorMessage`: string
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `iconBefore`: ReactNode
- `iconAfter`: ReactNode

## Design Tokens

Todos os componentes usam tokens CSS definidos em `@/styles/tokens.css`:

- **Cores**: Paleta primária (azul), secundária (laranja) e terciária (verde)
- **Tipografia**: Font sizes, weights, line heights
- **Espaçamento**: Escala 4px (4, 8, 12, 16, 24, 32...)
- **Shadows**: sm, base, md, lg, xl
- **Border Radius**: sm, base, md, lg, xl, full
- **Transitions**: fast, base, slow

## Convenções

1. **Naming**: usar PascalCase para componentes React
2. **Props Interface**: declarar com `interface ComponentProps` antes do componente
3. **CSS Modules**: `Component.module.css` no mesmo diretório
4. **Forwarding Ref**: todos os componentes devem suportar ref com `React.forwardRef`
5. **ARIA**: adicionar atributos de acessibilidade (aria-invalid, aria-describedby, etc)

## Componentes Molecules (Fase 2)

### Card
Container reutilizável com sombra, padding e rounded corners.

```tsx
import { Card } from '@/components/molecules';

<Card elevation="md" padding="lg" variant="default" hoverable>
  Conteúdo do card
</Card>
```

**Props:**
- `elevation`: 'none' | 'sm' | 'md' | 'lg'
- `padding`: 'sm' | 'md' | 'lg'
- `variant`: 'default' | 'highlight' | 'success' | 'warning' | 'error'
- `hoverable`: boolean

### Badge
Label pequeno com cor semântica para status/categorias.

```tsx
import { Badge } from '@/components/molecules';

<Badge variant="success" size="md">
  Ativo
</Badge>
```

**Props:**
- `variant`: 'default' | 'success' | 'warning' | 'error' | 'info'
- `size`: 'sm' | 'md' | 'lg'

### FormGroup
Agrupa Input + Label + helper text para formulários completos.

```tsx
import { FormGroup, Input } from '@/components/molecules';

<FormGroup label="Email" helperText="Seu email corporativo" required>
  <Input type="email" placeholder="seu@email.com" />
</FormGroup>
```

**Props:**
- `label`: string
- `helperText`: string
- `errorMessage`: string
- `required`: boolean

### DataCard
Card com número/métrica para dashboards.

```tsx
import { DataCard } from '@/components/molecules';

<DataCard 
  value="2.543"
  label="Simulações Ativas"
  change={{ value: 12, isPositive: true }}
  variant="success"
/>
```

### Checkbox & Radio
Componentes de seleção acessíveis com custom styling.

```tsx
import { Checkbox, Radio } from '@/components/molecules';

<Checkbox label="Concordo com os termos" size="md" />
<Radio label="Opção 1" name="options" size="md" />
```

## Componentes Organisms (Fase 3)

### Header
Cabeçalho com logo, navegação e menu de usuário.

```tsx
import { Header } from '@/components/organisms';

<Header
  logo={<YourLogo />}
  navLinks={[
    { label: 'Dashboard', href: '/dashboard', active: true },
    { label: 'Simulações', href: '/simulations' }
  ]}
  userMenu={{
    name: 'João Silva',
    email: 'joao@company.com',
    onLogout: handleLogout
  }}
/>
```

### RiskRadar
Visualização SVG interativa de risco em radar.

```tsx
import { RiskRadar } from '@/components/organisms';

<RiskRadar
  dataPoints={[
    { label: 'Risco A', value: 75 },
    { label: 'Risco B', value: 45 }
  ]}
  showGrid={true}
  showLabels={true}
/>
```

### SocialGraph
Grafo de rede social com drag-to-explore.

```tsx
import { SocialGraph } from '@/components/organisms';

<SocialGraph
  nodes={[...]}
  edges={[...]}
  draggable={true}
  onNodeClick={handleNodeClick}
/>
```

### ThresholdHeatmap
Grid colorido de adoção/intensidade.

```tsx
import { ThresholdHeatmap } from '@/components/organisms';

<ThresholdHeatmap
  data={[...]}
  rows={['Região A', 'Região B']}
  columns={['Q1', 'Q2', 'Q3', 'Q4']}
  colorScheme="sequential"
/>
```

### Dashboard
Layout principal com grid responsivo.

```tsx
import { Dashboard } from '@/components/organisms';

<Dashboard
  title="Simulações Comportamentais"
  description="Análise de simulação em tempo real"
  columns={3}
  sections={[
    { id: '1', title: 'Radar', content: <RiskRadar ... /> },
    { id: '2', title: 'Heatmap', content: <ThresholdHeatmap ... />, colspan: 2 }
  ]}
/>
```

## Fase 4: Interatividade & Performance ✅

Setup completo de testes, documentação e tooling:

- **Storybook 7**: Stories para todos os componentes
- **Vitest**: Testes unitários com @testing-library
- **Playwright**: Testes E2E com Axe accessibility
- **Lighthouse CI**: Performance 85%+, Accessibility 90%+
- **npm scripts**: `npm run storybook`, `npm run test`, `npm run e2e`, `npm run lighthouse`

## Fase 5: Acessibilidade & Testes E2E ✅

Conformidade completa com WCAG 2.1 Level AAA:

### Acessibilidade

Todos os componentes cumprem:
- ✅ **WCAG AAA Level** conformidade
- ✅ **Keyboard navigation** completa (Tab, Enter, Escape, Arrow keys)
- ✅ **Screen reader** compatible (ARIA labels, roles, states)
- ✅ **Color contrast** 7:1 ratio (AAA minimum)
- ✅ **Focus indicators** visíveis (2px outline)
- ✅ **Touch targets** mínimo 44x44px
- ✅ **Sem keyboard traps** - Tab sempre funciona
- ✅ **prefers-reduced-motion** respeitado
- ✅ **Zoom 200%** funcional

**Documentação**: Ver [ACCESSIBILITY.md](./ACCESSIBILITY.md)

### Testes Automatizados

```bash
# Testes unitários com acessibilidade
npm run test

# Testes E2E com Axe DevTools
npm run e2e

# Lighthouse CI (performance + accessibility)
npm run lighthouse

# Storybook a11y addon
npm run storybook
# Ir em Acessibilidade tab em cada story
```

### Testes Manuais

1. **Keyboard Navigation**: Tab através de toda interface
2. **Screen Reader** (NVDA/JAWS/VoiceOver): Verificar anúncio correto
3. **Color Contrast**: WebAIM Contrast Checker
4. **Zoom 200%**: Verificar reflow e usabilidade
5. **Mobile 375px**: Touch targets acessíveis

### WCAG Checklist

**Perceivable**
- ✅ Color contrast 7:1 (text), 3:1 (UI components)
- ✅ No reliance on color alone
- ✅ Images têm alt text ou aria-label

**Operable**
- ✅ Keyboard accessible (Tab, Enter, Space, Arrow keys)
- ✅ No keyboard traps
- ✅ Focus visible e lógico (DOM order)
- ✅ Operação sem mouse possível

**Understandable**
- ✅ Heading hierarchy correto (h1 → h2 → h3)
- ✅ Labels visíveis para form inputs
- ✅ Error messages claras e associadas
- ✅ Instruções claras e contextuais

**Robust**
- ✅ Name, Role, Value determinados por AT
- ✅ ARIA attributes válidos e bem-formados
- ✅ Status updates anunciados
- ✅ Semantic HTML onde possível

### Recursos

- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Guia detalhado por componente
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)

## Métricas de Sucesso

**Fase 1-2**: ✅ Componentes Atoms + Molecules
**Fase 3**: ✅ Componentes Organisms
**Fase 4**: ✅ Storybook + Vitest + Playwright
**Fase 5**: ✅ WCAG AAA + E2E + Documentação

### Contínuo

```bash
# Antes de cada commit
npm run lint
npm run test
npm run test:coverage

# CI/CD (GitHub Actions)
- npm run build
- npm run test
- npm run e2e
- npm run lighthouse

# Production
- Lighthouse score: 90+ (all categories)
- Zero accessibility violations
- 100% test coverage para atoms/molecules
```

## Roadmap Futuro

- **Tema Escuro**: CSS custom properties para dark mode
- **Documentação Visual**: Figma Tokens integration
- **Componentes Templates**: Layouts completos (Login, Dashboard)
- **Internacionalização**: i18n para labels ARIA
- **Performance**: <3s FCP, 90+ Lighthouse score

## Suporte

Para dúvidas sobre o design system:
- Documentação: Este arquivo + ACCESSIBILITY.md
- Código: Storybook stories (exemplos)
- Issues: GitHub com tag `[Design System]`
- Code review: PRs passam por design system audit
