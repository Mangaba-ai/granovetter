import React from 'react';
import styles from './FormGroup.module.css';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Form input element */
  children: React.ReactElement;
  /** Form field ID for accessibility */
  id?: string;
  /** Required indicator */
  required?: boolean;
}

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({
    label,
    helperText,
    errorMessage,
    children,
    id,
    required = false,
    className = '',
    ...props
  }, ref) => {
    const childWithProps = React.cloneElement(children, {
      id: id || (children.props.id || `field-${Math.random()}`),
    });

    const classes = [
      styles.formGroup,
      errorMessage && styles.hasError,
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
        {label && (
          <label
            htmlFor={id || childWithProps.props.id}
            className={styles.label}
          >
            <span className={styles.labelText}>{label}</span>
            {required && <span className={styles.required} aria-label="required">*</span>}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {childWithProps}
        </div>

        {helperText && !errorMessage && (
          <p
            className={styles.helperText}
            id={`${id || childWithProps.props.id}-helper`}
          >
            {helperText}
          </p>
        )}

        {errorMessage && (
          <p
            className={styles.errorMessage}
            id={`${id || childWithProps.props.id}-error`}
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

export default FormGroup;
