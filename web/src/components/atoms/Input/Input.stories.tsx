import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = { title: 'Atoms/Input', component: Input, tags: ['autodocs'], args: { label: 'Nome da organização', placeholder: 'Ex: Acme Corp' } };
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithHelper: Story = { args: { helperText: 'Usado nos relatórios da simulação' } };
export const Error: Story = { args: { label: 'E-mail', type: 'email', defaultValue: 'maria@', error: true, errorMessage: 'E-mail inválido' } };
export const Required: Story = { args: { required: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Somente leitura' } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <Input size="sm" label="Pequeno" />
      <Input size="md" label="Médio" />
      <Input size="lg" label="Grande" />
    </div>
  ),
};
