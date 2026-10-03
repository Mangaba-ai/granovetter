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

## Próximas Fases

- **Fase 2**: Componentes Molecules (Card, FormGroup, Badge)
- **Fase 3**: Componentes Organisms (Header, Sidebar, Modal)
- **Fase 4**: Storybook setup e testes com Vitest + Playwright
- **Fase 5**: Acessibilidade WCAG AAA, performance Lighthouse 90+

## Suporte

Para dúvidas sobre o design system, abra uma issue em `/web` ou contacte o time de design.
