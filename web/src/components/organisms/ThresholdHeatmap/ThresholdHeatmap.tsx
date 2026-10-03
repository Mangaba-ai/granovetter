import React from 'react';
import styles from './ThresholdHeatmap.module.css';

interface HeatmapCell {
  row: string;
  column: string;
  value: number; // 0-100
}

interface ThresholdHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Heatmap data */
  data: HeatmapCell[];
  /** Row labels */
  rows: string[];
  /** Column labels */
  columns: string[];
  /** Color scheme: sequential (0-100) or diverging (-100 to 100) */
  colorScheme?: 'sequential' | 'diverging';
  /** Cell click handler */
  onCellClick?: (cell: HeatmapCell) => void;
}

const ThresholdHeatmap = React.forwardRef<HTMLDivElement, ThresholdHeatmapProps>(
  ({
    data,
    rows,
    columns,
    colorScheme = 'sequential',
    onCellClick,
    className = '',
    ...props
  }, ref) => {
    const [hoveredCell, setHoveredCell] = React.useState<string | null>(null);

    const getCellColor = (value: number): string => {
      if (colorScheme === 'diverging') {
        if (value >= 0) {
          const intensity = value / 100;
          return `rgba(198, 255, 74, ${0.12 + intensity * 0.7})`;
        } else {
          const intensity = Math.abs(value) / 100;
          return `rgba(255, 127, 225, ${0.12 + intensity * 0.7})`;
        }
      } else {
        const intensity = value / 100;
        return `rgba(34, 229, 255, ${0.08 + intensity * 0.72})`;
      }
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
        <div className={styles.heatmapWrapper}>
          {/* Column headers */}
          <div className={styles.grid} style={{ gridTemplateColumns: `auto repeat(${columns.length}, 1fr)` }}>
            <div className={styles.cornerCell} />
            {columns.map((col) => (
              <div key={`col-${col}`} className={styles.columnHeader}>
                {col}
              </div>
            ))}

            {/* Rows */}
            {rows.map((row) => (
              <React.Fragment key={`row-${row}`}>
                <div className={styles.rowHeader}>{row}</div>

                {columns.map((col) => {
                  const cellData = data.find((d) => d.row === row && d.column === col);
                  const value = cellData?.value ?? 0;
                  const cellId = `cell-${row}-${col}`;
                  const isHovered = hoveredCell === cellId;

                  return (
                    <div
                      key={cellId}
                      className={[styles.cell, isHovered && styles.hovered].filter(Boolean).join(' ')}
                      style={{ backgroundColor: getCellColor(value) }}
                      onMouseEnter={() => setHoveredCell(cellId)}
                      onMouseLeave={() => setHoveredCell(null)}
                      onClick={() => cellData && onCellClick?.(cellData)}
                      role="button"
                      tabIndex={0}
                      aria-label={`${row}, ${col}: ${value}%`}
                    >
                      <span
                        className={styles.cellValue}
                      >
                        {value}
                      </span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: 'rgba(34, 229, 255, 0.15)' }} />
            <span className={styles.legendLabel}>Baixo</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: 'rgba(34, 229, 255, 0.45)' }} />
            <span className={styles.legendLabel}>Médio</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: 'rgba(34, 229, 255, 0.8)' }} />
            <span className={styles.legendLabel}>Alto</span>
          </div>
        </div>
      </div>
    );
  }
);

ThresholdHeatmap.displayName = 'ThresholdHeatmap';

export default ThresholdHeatmap;
