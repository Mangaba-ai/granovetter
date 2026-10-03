import type { Meta, StoryObj } from '@storybook/react';
import Dashboard from './Dashboard';
import RiskRadar from '../RiskRadar/RiskRadar';
import ThresholdHeatmap from '../ThresholdHeatmap/ThresholdHeatmap';
import SocialGraph from '../SocialGraph/SocialGraph';
import DataCard from '../../molecules/DataCard/DataCard';
import Badge from '../../molecules/Badge/Badge';
import Button from '../../atoms/Button/Button';
import { radar, heat, graph } from '../../storyData';

export const sections = [
  { id: 'rede', kicker: 'Módulo 01', title: 'Rede de influência', size: 'hero' as const, accent: 'cyan' as const,
    content: <SocialGraph nodes={graph.nodes} edges={graph.edges} size={520} /> },
  { id: 'adesao', kicker: 'Projeção', title: 'Adesão', size: 'sm' as const, accent: 'lime' as const,
    content: <DataCard value="62,5%" label="Adesão em 90 dias" change={{ value: 12, isPositive: true }} variant="success" /> },
  { id: 'resistencia', kicker: 'Projeção', title: 'Resistência', size: 'sm' as const, accent: 'magenta' as const,
    content: <DataCard value="18%" label="Resistência ativa" change={{ value: 4, isPositive: false }} variant="error" /> },
  { id: 'radar', kicker: 'Módulo 02', title: 'Radar de riscos', size: 'tall' as const, accent: 'violet' as const,
    content: <RiskRadar size={300} dataPoints={radar} /> },
  { id: 'heat', kicker: 'Módulo 03', title: 'Adoção por nível hierárquico', size: 'wide' as const, accent: 'aurora' as const,
    content: <ThresholdHeatmap data={heat.data} rows={heat.rows} columns={heat.columns} /> },
  { id: 'virada', kicker: 'Limiar', title: 'Ponto de virada', size: 'wide' as const, accent: 'amber' as const,
    content: (
      <div style={{ display: 'grid', gap: 12 }}>
        <DataCard value="12%" label="Limiar médio de adesão" variant="warning" />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Badge variant="warning">Gerência</Badge>
          <Badge variant="info">Operação</Badge>
        </div>
      </div>
    ) },
];

const meta: Meta<typeof Dashboard> = {
  title: 'Organisms/Dashboard', component: Dashboard, tags: ['autodocs'], excludeStories: ['sections'], parameters: { layout: 'fullscreen' },
  args: {
    status: 'Simulação ao vivo',
    title: 'Retorno ao escritório',
    description: '1.200 agentes sintéticos em 3 níveis hierárquicos, 90 dias simulados.',
    actions: (
      <>
        <Button variant="ghost">Exportar</Button>
        <Button variant="primary">Nova simulação</Button>
      </>
    ),
    sections,
  },
};
export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {};
export const Compact: Story = { args: { sections: sections.slice(1, 4), actions: undefined } };
