import React from 'react';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card shadow elevation level */
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  /** Card padding size */
  padding?: 'sm' | 'md' | 'lg';
  /** Card background color variant */
  variant?: 'default' | 'highlight' | 'success' | 'warning' | 'error';
  /** Hover interaction effect */
  hoverable?: boolean;
  /** Card content */
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    elevation = 'md',
    padding = 'md',
    variant = 'default',
    hoverable = false,
    children,
    className = '',
    ...props
  }, ref) => {
    const classes = [
      styles.card,
      styles[`elevation-${elevation}`],
      styles[`padding-${padding}`],
      styles[`variant-${variant}`],
      hoverable && styles.hoverable,
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
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
