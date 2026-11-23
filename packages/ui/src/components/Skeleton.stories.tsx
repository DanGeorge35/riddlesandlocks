import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = { args: { className: 'h-4 w-48' } };
export const Avatar: Story = { args: { className: 'size-10 rounded-full' } };
export const Card: Story = { args: { className: 'h-32 w-full rounded-card' } };

export const CardGroup: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-32 w-full rounded-card" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-4 w-32" />
    </div>
  ),
};
