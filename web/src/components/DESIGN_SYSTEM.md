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

## Próximas Fases

- **Fase 4**: Storybook setup, Vitest testes unitários, Lighthouse CI
- **Fase 5**: Acessibilidade WCAG AAA, testes E2E com Playwright

## Suporte

Para dúvidas sobre o design system, abra uma issue em `/web` ou contacte o time de design.
