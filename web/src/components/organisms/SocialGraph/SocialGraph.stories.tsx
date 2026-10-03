import type { Meta, StoryObj } from '@storybook/react';
import SocialGraph from './SocialGraph';

const nodes = [
  { id: 'dir', label: 'Diretoria', size: 18 },
  { id: 'ger1', label: 'Gerência Vendas', size: 14 },
  { id: 'ger2', label: 'Gerência TI', size: 14 },
  { id: 'eq1', label: 'Equipe Norte' },
  { id: 'eq2', label: 'Equipe Sul' },
  { id: 'eq3', label: 'Dev Backend' },
  { id: 'eq4', label: 'Suporte' },
];
const edges = [
  { source: 'dir', target: 'ger1', strength: 0.9 },
  { source: 'dir', target: 'ger2', strength: 0.8 },
  { source: 'ger1', target: 'eq1', strength: 0.7 },
  { source: 'ger1', target: 'eq2', strength: 0.6 },
  { source: 'ger2', target: 'eq3', strength: 0.8 },
  { source: 'ger2', target: 'eq4', strength: 0.4 },
  { source: 'eq2', target: 'eq4', strength: 0.3 },
];

const meta: Meta<typeof SocialGraph> = { title: 'Organisms/SocialGraph', component: SocialGraph, tags: ['autodocs'], args: { nodes, edges } };
export default meta;
type Story = StoryObj<typeof SocialGraph>;

export const Default: Story = {};
export const Static: Story = { args: { draggable: false } };
