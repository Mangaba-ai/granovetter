import React from 'react';
import styles from './RiskRadar.module.css';

interface RiskDataPoint {
  label: string;
  value: number; // 0-100
  color?: string;
}

interface RiskRadarProps extends React.SVGAttributes<SVGSVGElement> {
  /** Risk data points for the radar */
  dataPoints: RiskDataPoint[];
  /** Radar size */
  size?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show labels */
  showLabels?: boolean;
  /** Hover callback */
  onPointHover?: (point: RiskDataPoint | null) => void;
}

const RiskRadar = React.forwardRef<SVGSVGElement, RiskRadarProps>(
  ({
    dataPoints,
    size = 300,
    showGrid = true,
    showLabels = true,
    onPointHover,
    className = '',
    ...props
  }, ref) => {
    const gradId = React.useId().replace(/:/g, '');
    const [hoveredPoint, setHoveredPoint] = React.useState<number | null>(null);

    const center = size / 2;
    // margem para os rótulos ficarem dentro do SVG
    const maxRadius = size / 2 - 64;
    const numLevels = 5;

    const handlePointHover = (index: number | null) => {
      setHoveredPoint(index);
      if (index !== null) {
        onPointHover?.(dataPoints[index]);
      } else {
        onPointHover?.(null);
      }
    };

    const angleSlice = (Math.PI * 2) / dataPoints.length;

    const getCoordinates = (index: number, value: number) => {
      const angle = angleSlice * index - Math.PI / 2;
      const radius = (value / 100) * maxRadius;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      };
    };

    const pathData = dataPoints
      .map((point, i) => {
        const { x, y } = getCoordinates(i, point.value);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ') + ' Z';

    const svgClasses = [
      styles.radar,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className={svgClasses}
        role="img"
        aria-label={`Radar de riscos: ${dataPoints.map((d) => `${d.label} ${d.value}%`).join(", ")}`}
        {...props}
      >
        {/* Grid circles and lines */}
        {showGrid && (
          <g className={styles.grid}>
            {Array.from({ length: numLevels }).map((_, i) => {
              const radius = (maxRadius / numLevels) * (i + 1);
              return (
                <circle
                  key={`circle-${i}`}
                  cx={center}
                  cy={center}
                  r={radius}
                  className={styles.gridCircle}
                />
              );
            })}

            {/* Radial lines */}
            {dataPoints.map((_, i) => {
              const angle = angleSlice * i - Math.PI / 2;
              const x2 = center + maxRadius * Math.cos(angle);
              const y2 = center + maxRadius * Math.sin(angle);
              return (
                <line
                  key={`line-${i}`}
                  x1={center}
                  y1={center}
                  x2={x2}
                  y2={y2}
                  className={styles.gridLine}
                />
              );
            })}
          </g>
        )}

        <defs>
          <linearGradient id={`${gradId}-fill`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22e5ff" stopOpacity={0.55} />
            <stop offset="55%" stopColor="#b9a4ff" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#ff7fe1" stopOpacity={0.5} />
          </linearGradient>
          <filter id={`${gradId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Data polygon */}
        <path
          d={pathData}
          className={styles.dataArea}
          fill={`url(#${gradId}-fill)`}
          stroke="#22e5ff"
          strokeWidth={2}
          filter={`url(#${gradId}-glow)`}
        />

        {/* Data points and labels */}
        {dataPoints.map((point, i) => {
          const coords = getCoordinates(i, point.value);
          const labelAngle = angleSlice * i - Math.PI / 2;
          const labelRadius = maxRadius + 18;
          const cos = Math.cos(labelAngle);
          const anchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';
          const labelX = center + labelRadius * Math.cos(labelAngle);
          const labelY = center + labelRadius * Math.sin(labelAngle);

          const isHovered = hoveredPoint === i;

          return (
            <g key={`point-${i}`}>
              {/* Interactive circle */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r={isHovered ? 8 : 5}
                className={styles.dataPoint}
                fill={point.color || '#22e5ff'}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => handlePointHover(i)}
                onMouseLeave={() => handlePointHover(null)}
                onFocus={() => handlePointHover(i)}
                onBlur={() => handlePointHover(null)}
                role="button"
                tabIndex={0}
                aria-label={`${point.label}: ${point.value}%`}
              />

              {/* Label */}
              {showLabels && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={anchor}
                  className={styles.label}
                  opacity={isHovered ? 1 : 0.8}
                >
                  {point.label}
                </text>
              )}

              {/* Value tooltip on hover */}
              {isHovered && (
                <text
                  x={coords.x}
                  y={coords.y - 15}
                  textAnchor="middle"
                  className={styles.tooltip}
                >
                  {point.value}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
    );
  }
);

RiskRadar.displayName = 'RiskRadar';

export default RiskRadar;
