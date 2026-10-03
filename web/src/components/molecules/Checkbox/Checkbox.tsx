import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Checkbox label */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label,
    helperText,
    indeterminate = false,
    size = 'md',
    id,
    className = '',
    disabled = false,
    ...props
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const checkboxId = id || `checkbox-${Math.random()}`;

    const wrapperClasses = [
      styles.wrapper,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        <div className={styles.checkboxContainer}>
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={[styles.checkbox, styles[`size-${size}`]].join(' ')}
            {...props}
          />
          <span className={styles.checkmark} aria-hidden="true" />
        </div>

        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
          </label>
        )}

        {helperText && (
          <p
            className={styles.helperText}
            id={`${checkboxId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
