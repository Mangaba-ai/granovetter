import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from './molecules/Badge/Badge';
import DataCard from './molecules/DataCard/DataCard';
import RiskRadar from './organisms/RiskRadar/RiskRadar';
import SocialGraph from './organisms/SocialGraph/SocialGraph';
import ThresholdHeatmap from './organisms/ThresholdHeatmap/ThresholdHeatmap';

// Telas de vitrine das 4 etapas de "Como funciona", capturadas como imagem para o site.
type Lang = 'pt' | 'en';
const T = {
  pt: {
    tag: 'Exemplo ilustrativo', in: 'Entrada', sim: 'Simulação', out: 'Saída', int: 'Intervenção',
    decision: 'Decisão a simular', decisionV: 'Migrar 350 pessoas para o trabalho 100% remoto',
    groups: 'Grupos da organização', people: 'pessoas', rounds: 'rodadas',
    g: ['Diretoria', 'Gerência', 'Engenharia júnior', 'Engenharia sênior', 'Comercial', 'Operações'],
    ctx: 'Contexto', ctxV: ['Cultura de alta presença física', 'Mercado aquecido de tecnologia', 'Escritório próprio no centro'],
    simSub: 'Rodada 2 de 3: cada grupo reage ao que os outros pensam',
    adoption: 'Probabilidade de adoção', scenario: 'Cenário mais provável', scenarioV: 'Adoção lenta, com atrito',
    risks: ['Cultura', 'Execução', 'Reputação', 'Engajamento', 'Custo'],
    intSub: 'Adoção prevista por grupo (%) em cada intervenção',
    takeaway: 'Transição gradual com mensagem por grupo leva Operações de 12% para 38%.',
    cols: ['Sem ação', 'Mensagem por grupo', 'Transição gradual', 'Gradual + mensagem'],
  },
  en: {
    tag: 'Illustrative example', in: 'Input', sim: 'Simulation', out: 'Output', int: 'Intervention',
    decision: 'Decision to simulate', decisionV: 'Move 350 people to fully remote work',
    groups: 'Groups in the organization', people: 'people', rounds: 'rounds',
    g: ['Board', 'Management', 'Junior engineering', 'Senior engineering', 'Sales', 'Operations'],
    ctx: 'Context', ctxV: ['Strong in-office culture', 'Hot tech job market', 'Own downtown office'],
    simSub: 'Round 2 of 3: each group reacts to what the others think',
    adoption: 'Adoption likelihood', scenario: 'Most likely scenario', scenarioV: 'Slow adoption, with friction',
    risks: ['Culture', 'Execution', 'Reputation', 'Engagement', 'Cost'],
    intSub: 'Predicted adoption by group (%) under each intervention',
    takeaway: 'A gradual transition with a message per group takes Operations from 12% to 38%.',
    cols: ['No action', 'Message per group', 'Gradual transition', 'Gradual + message'],
  },
};

const frame: React.CSSProperties = {
  width: 800, height: 540, boxSizing: 'border-box', padding: 28, background: '#F4F1EA',
  fontFamily: 'Barlow, system-ui, sans-serif', color: '#0B0F1A', display: 'flex', flexDirection: 'column', gap: 18, overflow: 'hidden',
};
function Head({ step, title, sub, lang }: { step: string; title: string; sub?: string; lang: Lang }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
      <div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, letterSpacing: '.12em', color: '#9E300A' }}>{step}</div>
        <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.1 }}>{title}</div>
        {sub && <div style={{ fontSize: 15, color: '#374151', marginTop: 4 }}>{sub}</div>}
      </div>
      <Badge variant="info" size="sm">{T[lang].tag}</Badge>
    </div>
  );
}

const nodes = (g: string[]) => [
  { id: 'dir', label: g[0], size: 15 }, { id: 'ger', label: g[1], size: 13 }, { id: 'jr', label: g[2], size: 11 },
  { id: 'sr', label: g[3], size: 11 }, { id: 'com', label: g[4], size: 11 }, { id: 'op', label: g[5], size: 12 },
];
const edges = [
  { source: 'dir', target: 'ger', strength: 0.9 }, { source: 'ger', target: 'jr', strength: 0.6 }, { source: 'ger', target: 'sr', strength: 0.7 },
  { source: 'ger', target: 'com', strength: 0.6 }, { source: 'ger', target: 'op', strength: 0.8 }, { source: 'jr', target: 'sr', strength: 0.8 },
  { source: 'com', target: 'op', strength: 0.3 }, { source: 'dir', target: 'op', strength: 0.4 },
];

function Entrada({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div style={frame}>
      <Head step="01" title={t.in} lang={lang} />
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 18 }}>
        <div style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>{t.decision}</div>
        <div style={{ fontSize: 20, marginTop: 6 }}>{t.decisionV}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, flex: 1 }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 18 }}>
          <div style={{ fontSize: 13, color: '#374151', fontWeight: 600, marginBottom: 12 }}>{t.groups}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {t.g.map((x) => <Badge key={x} variant="default" size="md">{x}</Badge>)}
          </div>
          <div style={{ display: 'flex', gap: 28, marginTop: 22 }}>
            <div><div style={{ fontSize: 34, fontWeight: 600, color: '#1D4ED8' }}>350</div><div style={{ fontSize: 14, color: '#374151' }}>{t.people}</div></div>
            <div><div style={{ fontSize: 34, fontWeight: 600, color: '#1D4ED8' }}>6</div><div style={{ fontSize: 14, color: '#374151' }}>{t.groups.split(' ')[0].toLowerCase()}</div></div>
            <div><div style={{ fontSize: 34, fontWeight: 600, color: '#1D4ED8' }}>3</div><div style={{ fontSize: 14, color: '#374151' }}>{t.rounds}</div></div>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 18 }}>
          <div style={{ fontSize: 13, color: '#374151', fontWeight: 600, marginBottom: 12 }}>{t.ctx}</div>
          {t.ctxV.map((x) => <div key={x} style={{ fontSize: 16, padding: '10px 0', borderTop: '1px solid #f0f0f0' }}>{x}</div>)}
        </div>
      </div>
    </div>
  );
}

function Simulacao({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div style={frame}>
      <Head step="02" title={t.sim} sub={t.simSub} lang={lang} />
      <div style={{ width: 640, margin: '0 auto' }}><SocialGraph nodes={nodes(t.g)} edges={edges} size={400} draggable={false} /></div>
    </div>
  );
}

function Saida({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <div style={frame}>
      <Head step="03" title={t.out} lang={lang} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 16, flex: 1, minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <DataCard value={lang === 'pt' ? '62,5%' : '62.5%'} label={t.adoption} variant="default" />
          <DataCard value="52%" label={`${t.scenario}: ${t.scenarioV}`} variant="warning" />
        </div>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiskRadar size={300} dataPoints={t.risks.map((label, i) => ({ label, value: [72, 48, 35, 64, 41][i] }))} />
        </div>
      </div>
    </div>
  );
}

function Intervencao({ lang }: { lang: Lang }) {
  const t = T[lang];
  const rows = [t.g[2], t.g[4], t.g[5]];
  const vals = [[85, 88, 90, 92], [55, 63, 68, 74], [12, 21, 30, 38]];
  const data = rows.flatMap((row, r) => t.cols.map((column, c) => ({ row, column, value: vals[r][c] })));
  return (
    <div style={frame}>
      <Head step="04" title={t.int} sub={t.intSub} lang={lang} />
      <ThresholdHeatmap data={data} rows={rows} columns={t.cols} />
      <div style={{ fontSize: 18, fontWeight: 500, borderLeft: '4px solid #047857', paddingLeft: 14 }}>{t.takeaway}</div>
    </div>
  );
}

const meta: Meta = { title: 'Showcase/Etapas', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;

export const EntradaPt: Story = { render: () => <Entrada lang="pt" /> };
export const SimulacaoPt: Story = { render: () => <Simulacao lang="pt" /> };
export const SaidaPt: Story = { render: () => <Saida lang="pt" /> };
export const IntervencaoPt: Story = { render: () => <Intervencao lang="pt" /> };
export const EntradaEn: Story = { render: () => <Entrada lang="en" /> };
export const SimulacaoEn: Story = { render: () => <Simulacao lang="en" /> };
export const SaidaEn: Story = { render: () => <Saida lang="en" /> };
export const IntervencaoEn: Story = { render: () => <Intervencao lang="en" /> };
