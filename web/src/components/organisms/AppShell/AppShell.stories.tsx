import type { Meta, StoryObj } from '@storybook/react';
import AppShell from './AppShell';
import Dashboard from '../Dashboard/Dashboard';
import Button from '../../atoms/Button/Button';
import { sections } from '../Dashboard/Dashboard.stories';

const meta: Meta<typeof AppShell> = {
  title: 'Organisms/AppShell', component: AppShell, tags: ['autodocs'], parameters: { layout: 'fullscreen' },
  args: {
    brand: <span>granovetter<span style={{ color: '#22e5ff' }}>.</span></span>,
    nav: [
      { label: 'Painel', href: '#painel', icon: '◈', active: true },
      { label: 'Simulações', href: '#simulacoes', icon: '◎', badge: 3 },
      { label: 'Sociedades', href: '#sociedades', icon: '⬡' },
      { label: 'Cenários', href: '#cenarios', icon: '◇' },
      { label: 'Relatórios', href: '#relatorios', icon: '▤' },
    ],
    footerNav: [{ label: 'Configurações', href: '#config', icon: '⚙' }],
    systemStatus: 'Motor online · 1.200 agentes',
    user: { name: 'Maria Oliveira', role: 'Diretora de Pessoas' },
    toolbar: <Button size="sm" variant="secondary">Compartilhar</Button>,
    children: null,
  },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

export const Application: Story = {
  render: (args) => (
    <AppShell {...args}>
      <Dashboard
        status="Simulação ao vivo"
        title="Retorno ao escritório"
        description="1.200 agentes sintéticos em 3 níveis hierárquicos, 90 dias simulados."
        actions={<Button variant="primary">Nova simulação</Button>}
        sections={sections}
      />
    </AppShell>
  ),
};
