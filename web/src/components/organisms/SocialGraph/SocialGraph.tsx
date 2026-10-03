import React from 'react';
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
    const [positions, setPositions] = React.useState<Map<string, { x: number; y: number }>>(
      new Map(nodes.map((n) => [n.id, {
        x: Math.random() * size,
        y: Math.random() * size,
      }]))
    );

    const [draggedNode, setDraggedNode] = React.useState<string | null>(null);

    const handleMouseDown = (nodeId: string) => {
      if (draggable) setDraggedNode(nodeId);
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      if (!draggedNode || !svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

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
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
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
                    fill={node.color || '#22e5ff'}
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
