import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '@/components/molecules';

describe('Card Component', () => {
  it('renders card with content', () => {
    render(<Card>Test content</Card>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies elevation classes', () => {
    const { container: containerMd } = render(<Card elevation="md">Test</Card>);
    expect(containerMd.querySelector('div')).toHaveClass('elevation-md');

    const { container: containerLg } = render(<Card elevation="lg">Test</Card>);
    expect(containerLg.querySelector('div')).toHaveClass('elevation-lg');
  });

  it('applies padding classes', () => {
    const { container } = render(<Card padding="lg">Test</Card>);
    expect(container.querySelector('div')).toHaveClass('padding-lg');
  });

  it('applies variant classes', () => {
    const { container } = render(<Card variant="success">Test</Card>);
    expect(container.querySelector('div')).toHaveClass('variant-success');
  });

  it('applies hoverable class when specified', () => {
    const { container } = render(<Card hoverable>Test</Card>);
    expect(container.querySelector('div')).toHaveClass('hoverable');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Test</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('supports click handler when hoverable', async () => {
    const handleClick = vi.fn();
    render(
      <Card hoverable onClick={handleClick}>
        Click me
      </Card>
    );

    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders children correctly', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
      </Card>
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
