import type { Meta, StoryObj } from '@storybook/react';
import Dashboard from './Dashboard';
import RiskRadar from '../RiskRadar/RiskRadar';
import ThresholdHeatmap from '../ThresholdHeatmap/ThresholdHeatmap';
import DataCard from '../../molecules/DataCard/DataCard';
import SocialGraph from '../SocialGraph/SocialGraph';

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

const influenceNodes = [
  { id: 'dir', label: 'Diretoria', size: 16 },
  { id: 'rh', label: 'RH', size: 12 },
  { id: 'gv', label: 'Gerência Vendas', size: 13 },
  { id: 'gt', label: 'Gerência TI', size: 13 },
  { id: 'go', label: 'Gerência Operações', size: 13 },
  { id: 'n', label: 'Equipe Norte' },
  { id: 's', label: 'Equipe Sul' },
  { id: 'dev', label: 'Desenvolvimento' },
  { id: 'sup', label: 'Suporte' },
  { id: 'log', label: 'Logística' },
  { id: 'fab', label: 'Fábrica' },
  { id: 'jr', label: 'Engenharia júnior' },
];
const influenceEdges = [
  { source: 'dir', target: 'rh', strength: 0.9 }, { source: 'dir', target: 'gv', strength: 0.8 },
  { source: 'dir', target: 'gt', strength: 0.8 }, { source: 'dir', target: 'go', strength: 0.7 },
  { source: 'rh', target: 'go', strength: 0.4 }, { source: 'gv', target: 'n', strength: 0.7 },
  { source: 'gv', target: 's', strength: 0.6 }, { source: 'gt', target: 'dev', strength: 0.8 },
  { source: 'gt', target: 'sup', strength: 0.5 }, { source: 'go', target: 'log', strength: 0.7 },
  { source: 'go', target: 'fab', strength: 0.8 }, { source: 'dev', target: 'jr', strength: 0.9 },
  { source: 's', target: 'sup', strength: 0.3 }, { source: 'log', target: 'fab', strength: 0.5 },
];

export const Influence: Story = {
  args: {
    title: 'Rede de influência',
    description: 'Quem puxa a adesão e onde a resistência se propaga',
    columns: 3,
    sections: [
      { id: 'grafo', title: 'Laços entre grupos', colspan: 2, rowspan: 2, content: <SocialGraph nodes={influenceNodes} edges={influenceEdges} size={460} /> },
      { id: 'pro', title: 'Mais favorável', content: <DataCard value="85%" label="Engenharia júnior" variant="success" /> },
      { id: 'contra', title: 'Mais resistente', content: <DataCard value="12%" label="Operações" variant="error" /> },
    ],
  },
};
