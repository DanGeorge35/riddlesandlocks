import type { Meta, StoryObj } from '@storybook/react';
import { Money } from './Money';

const meta: Meta<typeof Money> = {
  title: 'Components/Money',
  component: Money,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Money>;

export const Default: Story = { args: { micro: 1_284_500_000n } };
export const Small: Story = { args: { micro: 500_000n } };
export const Large: Story = { args: { micro: 48_920_000_000n } };
export const Zero: Story = { args: { micro: 0n } };
