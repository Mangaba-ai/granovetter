import React from 'react';
import styles from './Radio.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Radio label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Radio size */
  size?: 'sm' | 'md' | 'lg';
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({
    label,
    helperText,
    size = 'md',
    id,
    className = '',
    disabled = false,
    ...props
  }, ref) => {
    const radioId = id || `radio-${Math.random()}`;

    const wrapperClasses = [
      styles.wrapper,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <div className={styles.radioContainer}>
          <input
            ref={ref}
            type="radio"
            id={radioId}
            disabled={disabled}
            className={[styles.radio, styles[`size-${size}`]].join(' ')}
            {...props}
          />
          <span className={styles.radiomark} aria-hidden="true" />
        </div>

        {label && (
          <label htmlFor={radioId} className={styles.label}>
            {label}
          </label>
        )}

        {helperText && (
          <p
            className={styles.helperText}
            id={`${radioId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
