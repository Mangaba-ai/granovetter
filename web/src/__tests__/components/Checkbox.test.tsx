import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@/components/molecules';

describe('Checkbox Component', () => {
  it('renders checkbox input', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('toggles checked state', async () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('can be disabled', () => {
    render(<Checkbox disabled label="Disabled" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('handles change events', async () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);

    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders helper text', () => {
    render(<Checkbox helperText="This is a helper text" />);
    expect(screen.getByText('This is a helper text')).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const { container: containerSm } = render(<Checkbox size="sm" />);
    expect(containerSm.querySelector('input')).toHaveClass('size-sm');

    const { container: containerLg } = render(<Checkbox size="lg" />);
    expect(containerLg.querySelector('input')).toHaveClass('size-lg');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('supports keyboard navigation', async () => {
    render(<Checkbox label="Test" />);
    const checkbox = screen.getByRole('checkbox');

    checkbox.focus();
    expect(checkbox).toHaveFocus();

    await userEvent.keyboard(' ');
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  it('supports indeterminate state', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} indeterminate={true} />);
    expect((ref.current as HTMLInputElement).indeterminate).toBe(true);
  });
});
