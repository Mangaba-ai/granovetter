import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header', component: Header, tags: ['autodocs'], parameters: { layout: 'fullscreen' },
  args: {
    logo: <span>granovetter<span style={{ color: '#22e5ff' }}>.</span></span>,
    navLinks: [
      { label: 'Painel', href: '#painel', active: true },
      { label: 'Simulações', href: '#simulacoes' },
      { label: 'Relatórios', href: '#relatorios' },
    ],
    userMenu: { name: 'Maria Oliveira', email: 'maria@empresa.com.br' },
  },
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
export const Compact: Story = { args: { variant: 'compact' } };
export const WithoutUser: Story = { args: { userMenu: undefined } };
