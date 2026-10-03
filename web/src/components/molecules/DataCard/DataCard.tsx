import React from 'react';
import styles from './DataCard.module.css';

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Main metric value */
  value: string | number;
  /** Metric label */
  label: string;
  /** Optional icon or visual element */
  icon?: React.ReactNode;
  /** Change indicator (positive/negative) */
  change?: {
    value: number;
    isPositive: boolean;
  };
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({
    value,
    label,
    icon,
    change,
    variant = 'default',
    className = '',
    ...props
  }, ref) => {
    const classes = [
      styles.dataCard,
      styles[`variant-${variant}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {icon && (
          <div className={styles.iconWrapper}>
            {icon}
          </div>
        )}

        <div className={styles.content}>
          <p className={styles.label}>{label}</p>
          <div className={styles.valueWrapper}>
            <h3 className={styles.value}>{value}</h3>
            {change && (
              <span
                className={[
                  styles.change,
                  change.isPositive ? styles.positive : styles.negative,
                ].join(' ')}
                aria-label={`${change.isPositive ? 'increased' : 'decreased'} by ${Math.abs(change.value)}%`}
              >
                {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

DataCard.displayName = 'DataCard';

export default DataCard;
