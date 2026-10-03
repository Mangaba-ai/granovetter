import React from 'react';
import * as d3 from 'd3';
import styles from './SocialGraph.module.css';

interface Node {
  id: string;
  label: string;
  size?: number;
  color?: string;
}

interface Edge {
  source: string;
  target: string;
  strength?: number; // 0-1
}

interface SocialGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Graph nodes */
  nodes: Node[];
  /** Graph edges/connections */
  edges: Edge[];
  /** Graph size */
  size?: number;
  /** Node click handler */
  onNodeClick?: (node: Node) => void;
  /** Enable drag interaction */
  draggable?: boolean;
}

const PAD = 48;
// grafo em retângulo 16:10 para ocupar a largura sem ficar alto demais
const ASPECT = 1.6;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Layout de forças determinístico: nós começam num círculo e a simulação roda síncrona.
function layoutGraph(nodes: Node[], edges: Edge[], size: number) {
  const W = size * ASPECT;
  type SimNode = d3.SimulationNodeDatum & { id: string };
  const r0 = size / 3;
  const simNodes: SimNode[] = nodes.map((n, i) => ({
    id: n.id,
    x: W / 2 + r0 * ASPECT * Math.cos((2 * Math.PI * i) / nodes.length),
    y: size / 2 + r0 * Math.sin((2 * Math.PI * i) / nodes.length),
  }));
  const links = edges.map((e) => ({ source: e.source, target: e.target, strength: e.strength ?? 0.5 }));
  const sim = d3
    .forceSimulation(simNodes)
    .force('link', d3.forceLink<SimNode, (typeof links)[number] & d3.SimulationLinkDatum<SimNode>>(links).id((d) => d.id).distance(size / 4).strength((l) => 0.2 + l.strength * 0.6))
    .force('charge', d3.forceManyBody().strength(-size / 1.5))
    .force('center', d3.forceCenter(W / 2, size / 2))
    .force('x', d3.forceX(W / 2).strength(0.02))
    .force('y', d3.forceY(size / 2).strength(0.08))
    .force('collide', d3.forceCollide(44))
    .stop();
  for (let i = 0; i < 300; i++) sim.tick();
  return new Map(simNodes.map((n) => [n.id, { x: clamp(n.x ?? W / 2, PAD, W - PAD), y: clamp(n.y ?? size / 2, PAD, size - PAD) }]));
}

const SocialGraph = React.forwardRef<HTMLDivElement, SocialGraphProps>(
  ({
    nodes,
    edges,
    size = 400,
    onNodeClick,
    draggable = true,
    className = '',
    ...props
  }, ref) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const initialPositions = React.useMemo(() => layoutGraph(nodes, edges, size), [nodes, edges, size]);
    const [positions, setPositions] = React.useState(initialPositions);
    React.useEffect(() => setPositions(initialPositions), [initialPositions]);

    const [draggedNode, setDraggedNode] = React.useState<string | null>(null);

    const handleMouseDown = (nodeId: string) => {
      if (draggable) setDraggedNode(nodeId);
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      if (!draggedNode || !svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const x = clamp(((e.clientX - rect.left) / rect.width) * size * ASPECT, PAD, size * ASPECT - PAD);
      const y = clamp(((e.clientY - rect.top) / rect.height) * size, PAD, size - PAD);

      setPositions((prev) => {
        const newPositions = new Map(prev);
        newPositions.set(draggedNode, { x, y });
        return newPositions;
      });
    };

    const handleMouseUp = () => {
      setDraggedNode(null);
    };

    const containerClasses = [
      styles.container,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={containerClasses}
        {...props}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${size * ASPECT} ${size}`}
          width="100%"
          style={{ height: 'auto', display: 'block' }}
          className={styles.svg}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          role="img"
          aria-label="Social Network Graph"
        >
          {/* Edges/Links */}
          <g className={styles.edges}>
            {edges.map((edge, i) => {
              const sourceNode = positions.get(edge.source);
              const targetNode = positions.get(edge.target);

              if (!sourceNode || !targetNode) return null;

              const strength = edge.strength ?? 0.5;

              return (
                <line
                  key={`edge-${i}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  className={styles.edge}
                  strokeOpacity={0.3 + strength * 0.4}
                  strokeWidth={1 + strength * 2}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g className={styles.nodes}>
            {nodes.map((node) => {
              const pos = positions.get(node.id);
              if (!pos) return null;

              const nodeSize = node.size ?? 8;

              return (
                <g
                  key={`node-${node.id}`}
                  className={styles.nodeGroup}
                >
                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={nodeSize}
                    className={styles.node}
                    fill={node.color || '#406fb4'}
                    style={{ cursor: draggable ? 'grab' : 'pointer' }}
                    onMouseDown={() => handleMouseDown(node.id)}
                    onClick={() => onNodeClick?.(node)}
                    role="button"
                    tabIndex={0}
                    aria-label={node.label}
                  />

                  {/* Node label */}
                  <text
                    x={pos.x}
                    y={pos.y + nodeSize + 16}
                    textAnchor="middle"
                    className={styles.nodeLabel}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <div className={styles.legend}>
          <p className={styles.legendTitle}>Rede Social</p>
          <p className={styles.legendText}>Arrastar nós para explorar • Clique para detalhes</p>
        </div>
      </div>
    );
  }
);

SocialGraph.displayName = 'SocialGraph';

export default SocialGraph;
