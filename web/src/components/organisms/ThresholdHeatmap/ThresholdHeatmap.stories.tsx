import type { Meta, StoryObj } from '@storybook/react';
import ThresholdHeatmap from './ThresholdHeatmap';
import { heat } from '../../storyData';

const { rows, columns, data } = heat;

const meta: Meta<typeof ThresholdHeatmap> = { title: 'Organisms/ThresholdHeatmap', component: ThresholdHeatmap, tags: ['autodocs'], args: { data, rows, columns } };
export default meta;
type Story = StoryObj<typeof ThresholdHeatmap>;

export const Sequential: Story = {};
export const Diverging: Story = { args: { colorScheme: 'diverging' } };
