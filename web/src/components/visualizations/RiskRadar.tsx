/**
 * Risk Radar
 * Visualiza riscos e oportunidades em um gráfico polar
 * Deixa clara a priorização de ação
 */

'use client';

import React, { useEffect, useRef } from 'react';

interface Risk {
  id: string;
  name: string;
  severity: number; // 1-10
  probability: number; // 0-100%
  angle: number; // 0-360 graus
  mitigation: string;
}

interface RiskRadarProps {
  risks: Risk[];
  opportunities?: Risk[];
}

export const RiskRadar: React.FC<RiskRadarProps> = ({ risks, opportunities = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = 120;

    // Limpar canvas
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, width, height);

    // Desenhar círculos de distância
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const r = (maxRadius / 4) * i;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Desenhar eixos (N, S, E, O)
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    // Norte-Sul
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - maxRadius);
    ctx.lineTo(centerX, centerY + maxRadius);
    ctx.stroke();
    // Leste-Oeste
    ctx.beginPath();
    ctx.moveTo(centerX - maxRadius, centerY);
    ctx.lineTo(centerX + maxRadius, centerY);
    ctx.stroke();

    // Labels dos eixos
    ctx.fillStyle = '#6b7280';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CRÍTICO', centerX, centerY - maxRadius - 10);
    ctx.fillText('OK', centerX, centerY + maxRadius + 20);
    ctx.textAlign = 'right';
    ctx.fillText('CRÍTICO', centerX + maxRadius + 20, centerY + 4);
    ctx.textAlign = 'left';
    ctx.fillText('CRÍTICO', centerX - maxRadius - 20, centerY + 4);

    // Desenhar riscos
    risks.forEach((risk) => {
      const radians = ((risk.angle - 90) * Math.PI) / 180;
      const distance = (risk.severity / 10) * maxRadius;
      const x = centerX + distance * Math.cos(radians);
      const y = centerY + distance * Math.sin(radians);

      // Cor baseada em probabilidade
      let color = '#10b981'; // Verde
      if (risk.probability > 70) color = '#ef4444'; // Vermelho
      else if (risk.probability > 40) color = '#f59e0b'; // Amarelo

      // Desenhar círculo do risco
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Borda branca
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Conectar ao centro com linha tracejada
      ctx.strokeStyle = color;
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Desenhar oportunidades (verde, fora do círculo)
    opportunities.forEach((opp) => {
      const radians = ((opp.angle - 90) * Math.PI) / 180;
      const distance = maxRadius + 30;
      const x = centerX + distance * Math.cos(radians);
      const y = centerY + distance * Math.sin(radians);

      // Desenhar triângulo verde para oportunidade
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(x, y - 10);
      ctx.lineTo(x + 10, y + 10);
      ctx.lineTo(x - 10, y + 10);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [risks, opportunities]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">⚠️ Risk & Opportunity Radar</h2>
        <p className="text-sm text-gray-600">
          Centro = Crítico | Extremidade = OK | 🔴 Alto = Vermelho | 🟡 Médio = Amarelo | 🟢 Baixo = Verde
        </p>
      </div>

      {/* Canvas radar */}
      <div className="flex justify-center mb-8">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-200 rounded-lg"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      {/* Lista de riscos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Riscos críticos */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            Riscos Críticos
          </h3>
          <div className="space-y-2">
            {risks
              .filter((r) => r.probability > 70)
              .map((risk) => (
                <div key={risk.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-red-900">{risk.name}</div>
                      <div className="text-xs text-red-700 mt-1">
                        Probabilidade: {risk.probability}% | Severidade: {risk.severity}/10
                      </div>
                      <div className="text-xs text-red-600 mt-2">
                        <strong>Mitigação:</strong> {risk.mitigation}
                      </div>
                    </div>
                    <div className="text-2xl">🔴</div>
                  </div>
                  <button className="w-full mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium">
                    Intervir agora
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* Riscos médios */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            Riscos Médios
          </h3>
          <div className="space-y-2">
            {risks
              .filter((r) => r.probability > 40 && r.probability <= 70)
              .map((risk) => (
                <div key={risk.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-yellow-900">{risk.name}</div>
                      <div className="text-xs text-yellow-700 mt-1">
                        Probabilidade: {risk.probability}% | Severidade: {risk.severity}/10
                      </div>
                      <div className="text-xs text-yellow-600 mt-2">
                        <strong>Mitigação:</strong> {risk.mitigation}
                      </div>
                    </div>
                    <div className="text-2xl">🟡</div>
                  </div>
                  <button className="w-full mt-2 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-xs font-medium">
                    Monitorar
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Oportunidades */}
      {opportunities.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            Oportunidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-green-900">{opp.name}</div>
                    <div className="text-xs text-green-700 mt-1">
                      Potencial: +{opp.severity * 10}% de impacto
                    </div>
                    <div className="text-xs text-green-600 mt-2">
                      <strong>Ação:</strong> {opp.mitigation}
                    </div>
                  </div>
                  <div className="text-2xl">🟢</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legenda e guia de ação */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Guia de Priorização</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            <strong>🔴 Críticos:</strong> Intervir nos próximos 2-3 dias (bloqueadores de go-live)
          </li>
          <li>
            <strong>🟡 Médios:</strong> Monitorar e preparar contingências (semana 1-2)
          </li>
          <li>
            <strong>🟢 Oportunidades:</strong> Aproveitar para acelerar adoção (se recursos permitir)
          </li>
        </ul>
      </div>
    </div>
  );
};
