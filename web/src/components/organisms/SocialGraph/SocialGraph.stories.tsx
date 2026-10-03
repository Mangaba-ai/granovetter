import type { Meta, StoryObj } from '@storybook/react';
import SocialGraph from './SocialGraph';
import { graph } from '../../storyData';

const { nodes, edges } = graph;

const meta: Meta<typeof SocialGraph> = { title: 'Organisms/SocialGraph', component: SocialGraph, tags: ['autodocs'], args: { nodes, edges } };
export default meta;
type Story = StoryObj<typeof SocialGraph>;

export const Default: Story = {};
export const Static: Story = { args: { draggable: false } };
