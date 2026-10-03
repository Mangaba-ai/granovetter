import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';

const meta: Meta<typeof Radio> = { title: 'Molecules/Radio', component: Radio, tags: ['autodocs'], args: { label: 'Cenário otimista', name: 'cenario' } };
export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};
export const Group: Story = {
  render: () => (
    <fieldset style={{ border: 0, padding: 0, display: 'grid', gap: 8 }}>
      <legend style={{ marginBottom: 8, fontWeight: 600 }}>Cenário da simulação</legend>
      <Radio name="cenario" value="otimista" label="Otimista" defaultChecked />
      <Radio name="cenario" value="realista" label="Realista" />
      <Radio name="cenario" value="pessimista" label="Pessimista" />
    </fieldset>
  ),
};
export const Disabled: Story = { args: { disabled: true } };
