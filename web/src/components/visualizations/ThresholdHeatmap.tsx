/**
 * Threshold Heatmap
 * Visualiza os limiares de adoção por grupo
 * com simulação interativa: "e se eu aumentar X?"
 */

'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GroupThreshold {
  name: string;
  adoption: number; // % atual
  threshold: number; // Limiar (0-100)
  risk: 'low' | 'medium' | 'high'; // Nível de risco
  influencers: number; // Quantidade de influenciadores
}

interface ThresholdHeatmapProps {
  groups: GroupThreshold[];
  onInterventionChange?: (group: string, intervention: number) => void;
}

const getRiskColor = (risk: string): string => {
  if (risk === 'low') return '#10b981'; // Verde
  if (risk === 'medium') return '#f59e0b'; // Amarelo
  return '#ef4444'; // Vermelho
};

const getRiskLabel = (risk: string): string => {
  if (risk === 'low') return '✅ Baixo risco';
  if (risk === 'medium') return '⚠️ Risco médio';
  return '🔴 Alto risco';
};

export const ThresholdHeatmap: React.FC<ThresholdHeatmapProps> = ({ groups, onInterventionChange }) => {
  const [interventions, setInterventions] = useState<Record<string, number>>({});
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleInterventionChange = (groupName: string, value: number) => {
    const newInterventions = { ...interventions, [groupName]: value };
    setInterventions(newInterventions);
    onInterventionChange?.(groupName, value);
  };

  // Simular impacto de intervenção
  const getProjectedAdoption = (group: GroupThreshold, intervention: number): number => {
    const baseGain = intervention * 0.01; // 1% de gain por ponto de intervenção
    const influencerBoost = (group.influencers / 10) * 0.1; // Mais influenciadores = mais impacto
    return Math.min(100, group.adoption + baseGain * 20 + influencerBoost * 10);
  };

  const chartData = groups.map((group) => ({
    name: group.name.split(' ')[0], // Primeiro nome/palavra
    adoption: group.adoption,
    threshold: group.threshold,
    projected: getProjectedAdoption(group, interventions[group.name] || 0),
  }));

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">📊 Adoption Likelihood by Group</h2>
        <p className="text-sm text-gray-600">
          Ajuste os sliders para testar impacto de intervenções (simulação em tempo real)
        </p>
      </div>

      {/* Gráfico de barras */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value) => `${Number(value).toFixed(0)}%`}
          />
          <Legend />
          <Bar dataKey="adoption" fill="#3b82f6" name="Adoção Atual" />
          <Bar dataKey="projected" fill="#10b981" name="Adoção Projetada" opacity={0.6} />
        </BarChart>
      </ResponsiveContainer>

      {/* Controles por grupo */}
      <div className="mt-8 space-y-6">
        {groups.map((group) => (
          <div
            key={group.name}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition"
            onClick={() => setSelectedGroup(selectedGroup === group.name ? null : group.name)}
          >
            {/* Cabeçalho do grupo */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{group.name}</h3>
                <p className="text-xs text-gray-500">
                  {group.influencers} influenciadores | Limiar: {group.threshold}%
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{group.adoption}%</div>
                  <div className="text-xs text-gray-500">atual</div>
                </div>

                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: getRiskColor(group.risk) }}
                >
                  {group.adoption}%
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-green-600">
                    {getProjectedAdoption(group, interventions[group.name] || 0).toFixed(0)}%
                  </div>
                  <div className="text-xs text-green-500">projetado</div>
                </div>
              </div>
            </div>

            {/* Barra de adoção */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${group.adoption}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Indicador de limiar */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Limiar: {group.threshold}%</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-red-400"
                    style={{ width: `${group.threshold}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Status de risco */}
            <div className="mb-4 text-sm">
              <span>{getRiskLabel(group.risk)}</span>
            </div>

            {/* Painel de intervenção (expandido) */}
            {selectedGroup === group.name && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="space-y-4">
                  {/* Treinamento */}
                  <div>
                    <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                      <span>💰 Investimento em Treinamento</span>
                      <span className="text-gray-900">
                        ${(interventions[group.name] || 0) * 1000} (0 - $10K)
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={interventions[group.name] || 0}
                      onChange={(e) => handleInterventionChange(group.name, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Mensagens de CEO */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🎤 Mensagem do CEO</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                      <option>Nenhuma</option>
                      <option>Alinhamento básico</option>
                      <option>Apresentação CEO</option>
                      <option>1:1 personalizado</option>
                    </select>
                  </div>

                  {/* Resultado projetado */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-green-900">
                          Adoção projetada: {getProjectedAdoption(group, interventions[group.name] || 0).toFixed(0)}%
                        </div>
                        <div className="text-xs text-green-700 mt-1">
                          +{(getProjectedAdoption(group, interventions[group.name] || 0) - group.adoption).toFixed(0)}% de impacto
                        </div>
                      </div>
                      {getProjectedAdoption(group, interventions[group.name] || 0) >= group.threshold && (
                        <div className="text-2xl">✅</div>
                      )}
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
                    Run Full Simulation
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resumo geral */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">📋 Resumo de Intervenções</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ${Object.values(interventions).reduce((a, b) => a + b, 0) * 1000}
            </div>
            <div className="text-gray-600">Investimento total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {groups
                .filter((g) => getProjectedAdoption(g, interventions[g.name] || 0) >= g.threshold)
                .length.toLocaleString()}
              /{groups.length}
            </div>
            <div className="text-gray-600">Grupos acima do limiar</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {(
                (groups
                  .filter((g) => getProjectedAdoption(g, interventions[g.name] || 0) >= g.threshold)
                  .length /
                  groups.length) *
                100
              ).toFixed(0)}
              %
            </div>
            <div className="text-gray-600">Taxa de sucesso projetada</div>
          </div>
        </div>
      </div>
    </div>
  );
};
