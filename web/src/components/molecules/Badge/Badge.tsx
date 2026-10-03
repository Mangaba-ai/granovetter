import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge semantic color */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Badge content */
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    variant = 'default',
    size = 'md',
    children,
    className = '',
    ...props
  }, ref) => {
    const classes = [
      styles.badge,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
