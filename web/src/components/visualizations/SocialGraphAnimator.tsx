/**
 * Social Graph Animator
 * Visualiza a propagação de mudança através da rede social
 * em tempo real, com animações de adoção
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Person {
  id: string;
  name: string;
  group: string;
  adoption: number; // 0-100%
  influence: number; // 0-10
}

interface Edge {
  source: string;
  target: string;
  strength: number; // 0-1
}

interface SocialGraphProps {
  people: Person[];
  edges: Edge[];
  round: number; // 1-3
  isPlaying: boolean;
  onRoundChange?: (round: number) => void;
}

const getColorByAdoption = (adoption: number): string => {
  if (adoption >= 70) return '#10b981'; // Verde - adotou
  if (adoption >= 40) return '#f59e0b'; // Amarelo - hesitando
  if (adoption >= 20) return '#ef4444'; // Vermelho - resistindo
  return '#6b7280'; // Cinza - não decidido
};

const getNodeRadius = (influence: number): number => {
  return 8 + influence * 2; // Maior nó = mais influência
};

export const SocialGraphAnimator: React.FC<SocialGraphProps> = ({
  people,
  edges,
  round,
  isPlaying,
  onRoundChange,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [simulation, setSimulation] = useState<d3.Simulation<Person, undefined> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;

    // Limpar SVG anterior
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f9fafb');

    // Criar simulação de força
    const sim = d3
      .forceSimulation<Person>(people)
      .force('link', d3.forceLink<Person, Edge>(edges).id((d) => d.id).distance(60))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => getNodeRadius(d.influence) + 5));

    setSimulation(sim);

    // Desenhar links (conexões)
    const link = svg
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', '#d1d5db')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.6);

    // Desenhar nós (pessoas)
    const node = svg
      .selectAll('circle')
      .data(people)
      .enter()
      .append('circle')
      .attr('r', (d) => getNodeRadius(d.influence))
      .attr('fill', (d) => getColorByAdoption(d.adoption))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('r', (d) => getNodeRadius(d.influence) + 3);
        svg
          .selectAll('text')
          .filter((t: any) => t.id === d.id)
          .style('opacity', 1)
          .style('font-weight', 'bold');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('r', (d) => getNodeRadius(d.influence));
        svg
          .selectAll('text')
          .filter((t: any) => t.id === d.id)
          .style('opacity', 0.7);
      });

    // Labels
    const text = svg
      .selectAll('text')
      .data(people)
      .enter()
      .append('text')
      .attr('font-size', '11px')
      .attr('text-anchor', 'middle')
      .attr('fill', '#1f2937')
      .attr('opacity', 0.7)
      .text((d) => d.name.split(' ')[0]); // Primeiro nome

    // Atualizar posições a cada frame
    sim.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d) => d.x || 0).attr('cy', (d) => d.y || 0);

      text.attr('x', (d) => d.x || 0).attr('y', (d) => (d.y || 0) + 4);
    });
  }, [people, edges]);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">🌐 Network Dynamics</h2>
          <p className="text-sm text-gray-600">Veja como a mudança se propaga pela organização</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onRoundChange?.(Math.max(1, round - 1))}
              disabled={round === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded text-sm"
            >
              ◀
            </button>
            <span className="text-sm font-medium">Round: {round}/3</span>
            <button
              onClick={() => onRoundChange?.(Math.min(3, round + 1))}
              disabled={round === 3}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded text-sm"
            >
              ▶
            </button>
          </div>

          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm"
            disabled={isPlaying}
          >
            {isPlaying ? '⏸ Pausar' : '▶ Jogar'}
          </button>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
          <span>Adotou (70%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Hesitando (40-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Resistindo (20-40%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#6b7280' }}></div>
          <span>Não decidido (&lt;20%)</span>
        </div>
      </div>

      {/* Visualização */}
      <div ref={containerRef} className="w-full bg-gradient-to-b from-gray-50 to-white rounded-lg">
        <svg ref={svgRef} className="w-full"></svg>
      </div>

      {/* Controles */}
      <div className="mt-4 flex gap-2">
        <div className="flex-1">
          <label className="text-xs font-medium text-gray-700 block mb-1">
            Velocidade: <span className="text-gray-900">1x</span>
          </label>
          <input type="range" min="0.5" max="2" step="0.5" defaultValue="1" className="w-full" />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-4 grid grid-cols-4 gap-4 text-center text-sm">
        <div className="bg-green-50 p-3 rounded">
          <div className="text-green-900 font-semibold">
            {Math.round((people.filter((p) => p.adoption >= 70).length / people.length) * 100)}%
          </div>
          <div className="text-green-700 text-xs">Adotaram</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded">
          <div className="text-yellow-900 font-semibold">
            {Math.round((people.filter((p) => p.adoption >= 40 && p.adoption < 70).length / people.length) * 100)}%
          </div>
          <div className="text-yellow-700 text-xs">Hesitando</div>
        </div>
        <div className="bg-red-50 p-3 rounded">
          <div className="text-red-900 font-semibold">
            {Math.round((people.filter((p) => p.adoption >= 20 && p.adoption < 40).length / people.length) * 100)}%
          </div>
          <div className="text-red-700 text-xs">Resistindo</div>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <div className="text-gray-900 font-semibold">
            {Math.round((people.filter((p) => p.adoption < 20).length / people.length) * 100)}%
          </div>
          <div className="text-gray-700 text-xs">Não decidido</div>
        </div>
      </div>
    </div>
  );
};
