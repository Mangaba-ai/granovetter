import type { Meta, StoryObj } from '@storybook/react';
import ThresholdHeatmap from './ThresholdHeatmap';

const rows = ['Diretoria', 'Gerência', 'Operação'];
const columns = ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4'];
const data = rows.flatMap((row, r) => columns.map((column, c) => ({ row, column, value: Math.min(100, 15 + r * 10 + c * 18) })));

const meta: Meta<typeof ThresholdHeatmap> = { title: 'Organisms/ThresholdHeatmap', component: ThresholdHeatmap, tags: ['autodocs'], args: { data, rows, columns } };
export default meta;
type Story = StoryObj<typeof ThresholdHeatmap>;

export const Sequential: Story = {};
export const Diverging: Story = { args: { colorScheme: 'diverging' } };
