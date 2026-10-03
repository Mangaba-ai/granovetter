import type { Meta, StoryObj } from '@storybook/react';
import RiskRadar from './RiskRadar';

const meta: Meta<typeof RiskRadar> = { title: 'Organisms/RiskRadar', component: RiskRadar, tags: ['autodocs'], args: { dataPoints: [
  { label: 'Cultura', value: 72 },
  { label: 'Execução', value: 48 },
  { label: 'Reputação', value: 35 },
  { label: 'Engajamento', value: 64 },
  { label: 'Custo', value: 41 },
] } };
export default meta;
type Story = StoryObj<typeof RiskRadar>;

export const Default: Story = {};
export const WithoutGrid: Story = { args: { showGrid: false } };
export const Small: Story = { args: { size: 240 } };
