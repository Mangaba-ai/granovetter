import type { Meta, StoryObj } from '@storybook/react';
import DataCard from './DataCard';

const meta: Meta<typeof DataCard> = { title: 'Molecules/DataCard', component: DataCard, tags: ['autodocs'], args: { value: '62,5%', label: 'Adesão projetada' } };
export default meta;
type Story = StoryObj<typeof DataCard>;

export const Default: Story = {};
export const Positive: Story = { args: { change: { value: 12, isPositive: true }, variant: 'success' } };
export const Negative: Story = { args: { value: '18%', label: 'Resistência ativa', change: { value: 4, isPositive: false }, variant: 'error' } };
export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
      <DataCard value="62,5%" label="Adesão projetada" change={{ value: 12, isPositive: true }} variant="success" />
      <DataCard value="18%" label="Resistência ativa" change={{ value: 4, isPositive: false }} variant="error" />
      <DataCard value="12%" label="Ponto de virada" variant="warning" />
    </div>
  ),
};
