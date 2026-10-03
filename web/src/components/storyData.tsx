/* Dados de exemplo compartilhados pelas histórias do Storybook */
export const radar = [
  { label: 'Cultura', value: 72 },
  { label: 'Execução', value: 48 },
  { label: 'Reputação', value: 35 },
  { label: 'Engajamento', value: 64 },
  { label: 'Custo', value: 41 },
];

const rows = ['Diretoria', 'Gerência', 'Operação'];
const columns = ['Mês 1', 'Mês 2', 'Mês 3', 'Mês 4'];
export const heat = {
  rows,
  columns,
  data: rows.flatMap((row, r) => columns.map((column, c) => ({ row, column, value: Math.min(100, 15 + r * 10 + c * 18) }))),
};

export const graph = {
  nodes: [
    { id: 'dir', label: 'Diretoria', size: 18, color: '#ff7fe1' },
    { id: 'ger1', label: 'Vendas', size: 14, color: '#b9a4ff' },
    { id: 'ger2', label: 'TI', size: 14, color: '#b9a4ff' },
    { id: 'eq1', label: 'Norte' },
    { id: 'eq2', label: 'Sul' },
    { id: 'eq3', label: 'Backend' },
    { id: 'eq4', label: 'Suporte', color: '#c6ff4a' },
    { id: 'eq5', label: 'Produto', color: '#ffc857' },
  ],
  edges: [
    { source: 'dir', target: 'ger1', strength: 0.9 },
    { source: 'dir', target: 'ger2', strength: 0.8 },
    { source: 'ger1', target: 'eq1', strength: 0.7 },
    { source: 'ger1', target: 'eq2', strength: 0.6 },
    { source: 'ger2', target: 'eq3', strength: 0.8 },
    { source: 'ger2', target: 'eq4', strength: 0.4 },
    { source: 'eq2', target: 'eq4', strength: 0.3 },
    { source: 'ger2', target: 'eq5', strength: 0.5 },
    { source: 'eq5', target: 'ger1', strength: 0.4 },
  ],
};
