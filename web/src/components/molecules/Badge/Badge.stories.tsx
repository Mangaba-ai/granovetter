import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = { title: 'Molecules/Badge', component: Badge, tags: ['autodocs'], args: { children: 'Ativo' } };
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge>Rascunho</Badge>
      <Badge variant="success">Adesão alta</Badge>
      <Badge variant="warning">Risco médio</Badge>
      <Badge variant="error">Resistência</Badge>
      <Badge variant="info">Em simulação</Badge>
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge size="sm">Pequeno</Badge>
      <Badge size="md">Médio</Badge>
      <Badge size="lg">Grande</Badge>
    </div>
  ),
};
