import type { Meta, StoryObj } from '@storybook/react';
import { Countdown } from './Countdown';

const meta: Meta<typeof Countdown> = {
  title: 'Components/Countdown',
  component: Countdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Countdown>;

const future = new Date(
  Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 6 * 60 * 1000 + 41 * 1000,
);

export const Default: Story = { args: { targetDate: future, size: 'default' } };
export const Small: Story = { args: { targetDate: future, size: 'small' } };
