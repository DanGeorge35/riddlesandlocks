import type { Meta, StoryObj } from '@storybook/react';
import { AttemptsMeter } from './AttemptsMeter';

const meta: Meta<typeof AttemptsMeter> = {
  title: 'Components/AttemptsMeter',
  component: AttemptsMeter,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AttemptsMeter>;

export const ThreeOfThree: Story = { args: { total: 3, remaining: 3 } };
export const TwoOfThree: Story = { args: { total: 3, remaining: 2 } };
export const OneOfThree: Story = { args: { total: 3, remaining: 1 } };
export const ZeroOfThree: Story = { args: { total: 3, remaining: 0 } };
