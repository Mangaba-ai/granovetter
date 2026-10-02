/**
 * Demo Page - Showcase das inovações de interface
 * Granovetter Visualization Suite
 */

import React, { useState } from 'react';
import { SocialGraphAnimator } from '../components/visualizations/SocialGraphAnimator';
import { ThresholdHeatmap } from '../components/visualizations/ThresholdHeatmap';
import { RiskRadar } from '../components/visualizations/RiskRadar';

// Dados de exemplo
const SAMPLE_PEOPLE = [
  { id: '1', name: 'Maria CEO', group: 'Leadership', adoption: 45, influence: 9 },
  { id: '2', name: 'João VP Eng', group: 'Engineering', adoption: 85, influence: 8 },
  { id: '3', name: 'Ana Eng Sr', group: 'Engineering', adoption: 90, influence: 7 },
  { id: '4', name: 'Carlos Eng Jr', group: 'Engineering', adoption: 75, influence: 4 },
  { id: '5', name: 'Pedro Sales', group: 'Sales', adoption: 50, influence: 6 },
  { id: '6', name: 'Lucia Ops', group: 'Operations', adoption: 25, influence: 5 },
  { id: '7', name: 'Ricardo Manager', group: 'Management', adoption: 35, influence: 5 },
  { id: '8', name: 'Fernanda Finance', group: 'Finance', adoption: 40, influence: 4 },
];

const SAMPLE_EDGES = [
  { source: '1', target: '2', strength: 0.8 },
  { source: '1', target: '3', strength: 0.6 },
  { source: '2', target: '3', strength: 0.9 },
  { source: '2', target: '4', strength: 0.7 },
  { source: '3', target: '4', strength: 0.8 },
  { source: '1', target: '5', strength: 0.5 },
  { source: '5', target: '6', strength: 0.4 },
  { source: '1', target: '7', strength: 0.7 },
  { source: '7', target: '6', strength: 0.6 },
  { source: '1', target: '8', strength: 0.5 },
];

const SAMPLE_GROUPS = [
  {
    name: 'Engineering',
    adoption: 85,
    threshold: 70,
    risk: 'low' as const,
    influencers: 3,
  },
  {
    name: 'Sales',
    adoption: 50,
    threshold: 60,
    risk: 'medium' as const,
    influencers: 2,
  },
  {
    name: 'Operations',
    adoption: 25,
    threshold: 55,
    risk: 'high' as const,
    influencers: 1,
  },
  {
    name: 'Management',
    adoption: 35,
    threshold: 65,
    risk: 'high' as const,
    influencers: 2,
  },
];

const SAMPLE_RISKS = [
  {
    id: 'risk-1',
    name: 'Ops Breakdown',
    severity: 9,
    probability: 85,
    angle: 180,
    mitigation: 'Redesenhar processos presenciais com DocuSign',
  },
  {
    id: 'risk-2',
    name: 'Churn de Talento',
    severity: 7,
    probability: 45,
    angle: 270,
    mitigation: 'Confirmar flexibilidade com eng sênior em 1:1',
  },
  {
    id: 'risk-3',
    name: 'Queda de Engajamento',
    severity: 5,
    probability: 30,
    angle: 90,
    mitigation: 'Criar rituais de conexão remota (virtual coffee)',
  },
];

const SAMPLE_OPPORTUNITIES = [
  {
    id: 'opp-1',
    name: 'Early Adopters',
    severity: 8,
    probability: 90,
    angle: 0,
    mitigation: 'Amplificar voz de eng sênior como campeões',
  },
];

export default function DemoPage() {
  const [round, setRound] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">🎨 Granovetter UI Suite</h1>
            <p className="text-lg text-gray-600 mt-2">
              Inovações de Interface para Simulação Organizacional
            </p>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Social Graph Animator
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Threshold Heatmap
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Risk Radar
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Seção 1: Social Graph Animator */}
        <section>
          <SocialGraphAnimator
            people={SAMPLE_PEOPLE}
            edges={SAMPLE_EDGES}
            round={round}
            isPlaying={isPlaying}
            onRoundChange={setRound}
          />

          <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">O que você está vendo:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>Nós:</strong> Pessoas da organização. Maior = mais influência
              </li>
              <li>
                <strong>Cores:</strong> Verde (adotou 70%+), Amarelo (hesitando 40-70%), Vermelho
                (resistindo 20-40%), Cinza (não decidido)
              </li>
              <li>
                <strong>Conexões:</strong> Linhas mostram relacionamentos (influência social)
              </li>
              <li>
                <strong>Animação:</strong> Pressione [Play] para ver os 3 rounds de simulação
              </li>
            </ul>
          </div>
        </section>

        {/* Seção 2: Threshold Heatmap */}
        <section>
          <ThresholdHeatmap groups={SAMPLE_GROUPS} />

          <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Como usar:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>Clique em um grupo</strong> para expandir e testar intervenções
              </li>
              <li>
                <strong>Arraste os sliders</strong> para simular impacto de treinamento e mensagens
              </li>
              <li>
                <strong>Veja em tempo real</strong> como a adoção projetada muda
              </li>
              <li>
                <strong>Pressione [Run Full Simulation]</strong> quando satisfeito com o cenário
              </li>
            </ul>
          </div>
        </section>

        {/* Seção 3: Risk Radar */}
        <section>
          <RiskRadar risks={SAMPLE_RISKS} opportunities={SAMPLE_OPPORTUNITIES} />

          <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Interpretando o Radar:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>Centro:</strong> Zona crítica (risco iminente)
              </li>
              <li>
                <strong>Extremidade:</strong> Zona OK (risco controlado)
              </li>
              <li>
                <strong>Cores:</strong> Vermelho = Crítico (&gt;70%), Amarelo = Médio (40-70%), Verde
                = Baixo
              </li>
              <li>
                <strong>Triângulos verdes:</strong> Oportunidades para acelerar adoção
              </li>
              <li>
                <strong>Clique [Intervir agora]</strong> nos riscos críticos para abrir planos de
                mitigação
              </li>
            </ul>
          </div>
        </section>

        {/* Guia de Impacto */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Por que essas inovações importam?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Decisão Mais Rápida</h3>
              <p className="text-sm text-gray-600">
                McKinsey leva 2 semanas para um relatório. Você toma decisão em 2 horas.
              </p>
            </div>

            <div>
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Colaboração Real-Time</h3>
              <p className="text-sm text-gray-600">
                Múltiplos stakeholders exploram cenários JUNTOS, não sequencialmente.
              </p>
            </div>

            <div>
              <div className="text-2xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Confiança nos Dados</h3>
              <p className="text-sm text-gray-600">
                Visualizações claras eliminam ambiguidade. Todos veem a mesma história.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Pronto para sua próxima mudança organizacional?</h2>
          <p className="text-blue-100 mb-6">
            Integre Granovetter no seu processo de change management e veja decisões melhores,
            mais rápidas, baseadas em dados reais de dinâmica social.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
            Agendar Demo
          </button>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
          <p>
            Granovetter UI Suite v0.1 | Desenvolvido por Dheiver Santos |{' '}
            <a href="https://github.com/Mangaba-ai/granovetter" className="text-blue-600 hover:underline">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
