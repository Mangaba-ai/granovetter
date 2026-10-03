import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = { title: 'Molecules/Checkbox', component: Checkbox, tags: ['autodocs'], args: { label: 'Incluir lideranças intermediárias' } };
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithHelper: Story = { args: { helperText: 'Gestores entre a diretoria e as equipes' } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Todos os grupos' } };
export const Disabled: Story = { args: { disabled: true } };
