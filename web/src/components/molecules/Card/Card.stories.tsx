import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default card with standard styling.',
    elevation: 'md',
    padding: 'md',
    variant: 'default',
  },
};

export const WithElevation: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card elevation="none">No Shadow</Card>
      <Card elevation="sm">Small Shadow</Card>
      <Card elevation="md">Medium Shadow</Card>
      <Card elevation="lg">Large Shadow</Card>
    </div>
  ),
};

export const WithPadding: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card padding="sm">Small Padding</Card>
      <Card padding="md">Medium Padding</Card>
      <Card padding="lg">Large Padding</Card>
    </div>
  ),
};

export const Variants: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card variant="default">Default Variant</Card>
      <Card variant="highlight">Highlight Variant</Card>
      <Card variant="success">Success Variant</Card>
      <Card variant="warning">Warning Variant</Card>
      <Card variant="error">Error Variant</Card>
    </div>
  ),
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: 'Click or hover on this card to see the effect.',
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0' }}>Card Title</h3>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
          This card contains various content elements including heading and paragraph.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <Card hoverable elevation="sm">
        <h4 style={{ margin: '0 0 8px 0' }}>Card 1</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>Hover me</p>
      </Card>
      <Card hoverable elevation="sm" variant="highlight">
        <h4 style={{ margin: '0 0 8px 0' }}>Card 2</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>Hover me too</p>
      </Card>
      <Card hoverable elevation="sm" variant="success">
        <h4 style={{ margin: '0 0 8px 0' }}>Card 3</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>Hover me as well</p>
      </Card>
      <Card hoverable elevation="sm" variant="warning">
        <h4 style={{ margin: '0 0 8px 0' }}>Card 4</h4>
        <p style={{ margin: 0, fontSize: '14px' }}>And hover me!</p>
      </Card>
    </div>
  ),
};
