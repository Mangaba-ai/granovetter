import type { Meta, StoryObj } from '@storybook/react';
import Dashboard from './Dashboard';
import RiskRadar from '../RiskRadar/RiskRadar';
import ThresholdHeatmap from '../ThresholdHeatmap/ThresholdHeatmap';
import DataCard from '../../molecules/DataCard/DataCard';

const rows = ['Diretoria', 'Gerência', 'Operação'];
const columns = ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4'];
const data = rows.flatMap((row, r) => columns.map((column, c) => ({ row, column, value: Math.min(100, 15 + r * 10 + c * 18) })));

const radar = [
  { label: 'Cultura', value: 72 },
  { label: 'Execução', value: 48 },
  { label: 'Reputação', value: 35 },
  { label: 'Engajamento', value: 64 },
  { label: 'Custo', value: 41 },
];

const meta: Meta<typeof Dashboard> = {
  title: 'Organisms/Dashboard', component: Dashboard, tags: ['autodocs'], parameters: { layout: 'fullscreen' },
  args: {
    title: 'Retorno ao escritório',
    description: 'Simulação com 1.200 agentes em 3 níveis hierárquicos',
    columns: 3,
    sections: [
      { id: 'adesao', title: 'Adesão', content: <DataCard value="62,5%" label="Adesão projetada" change={{ value: 12, isPositive: true }} variant="success" /> },
      { id: 'resistencia', title: 'Resistência', content: <DataCard value="18%" label="Resistência ativa" variant="error" /> },
      { id: 'virada', title: 'Ponto de virada', content: <DataCard value="12%" label="Limiar médio" variant="warning" /> },
      { id: 'radar', title: 'Riscos', content: <RiskRadar size={260} dataPoints={radar} /> },
      { id: 'heat', title: 'Adoção por nível', colspan: 2, content: <ThresholdHeatmap data={data} rows={rows} columns={columns} /> },
    ],
  },
};
export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {};
