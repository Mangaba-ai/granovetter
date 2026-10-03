import type { Meta, StoryObj } from '@storybook/react';
import RiskRadar from './RiskRadar';
import { radar } from '../../storyData';

const meta: Meta<typeof RiskRadar> = { title: 'Organisms/RiskRadar', component: RiskRadar, tags: ['autodocs'], args: { dataPoints: radar } };
export default meta;
type Story = StoryObj<typeof RiskRadar>;

export const Default: Story = {};
export const WithoutGrid: Story = { args: { showGrid: false } };
export const Small: Story = { args: { size: 240 } };
