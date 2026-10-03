import type { Meta, StoryObj } from '@storybook/react';
import FormGroup from './FormGroup';

const meta: Meta<typeof FormGroup> = { title: 'Molecules/FormGroup', component: FormGroup, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: { label: 'Decisão a simular', helperText: 'Descreva a mudança em uma frase', id: 'decisao', children: <input placeholder="Ex: retorno ao escritório 3x por semana" /> },
};
export const WithError: Story = {
  args: { label: 'Número de colaboradores', errorMessage: 'Informe um número maior que zero', id: 'colaboradores', required: true, children: <input type="number" defaultValue={0} /> },
};
