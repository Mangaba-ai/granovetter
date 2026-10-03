import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text below input */
  helperText?: string;
  /** Label text */
  label?: string;
  /** Icon before input */
  iconBefore?: React.ReactNode;
  /** Icon after input */
  iconAfter?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    size = 'md',
    error = false,
    errorMessage = '',
    helperText = '',
    label = '',
    iconBefore,
    iconAfter,
    fullWidth = false,
    className = '',
    ...props
  }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {iconBefore && (
            <span className={styles.iconBefore} aria-hidden="true">
              {iconBefore}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`${styles.input} ${styles[size]} ${error ? styles.error : ''} ${className}`}
            aria-invalid={error}
            aria-describedby={error && errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {iconAfter && (
            <span className={styles.iconAfter} aria-hidden="true">
              {iconAfter}
            </span>
          )}
        </div>

        {error && errorMessage && (
          <span id={`${inputId}-error`} className={styles.errorMessage} role="alert">
            {errorMessage}
          </span>
        )}

        {!error && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
