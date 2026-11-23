import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { variant: 'success', message: 'Entry successful! Good luck.', onDismiss: () => {} },
};
export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Something went wrong. Please try again.',
    onDismiss: () => {},
  },
};
export const Warning: Story = {
  args: { variant: 'warning', message: 'Your session expires in 5 minutes.', onDismiss: () => {} },
};
export const Info: Story = {
  args: { variant: 'info', message: 'New clue drops in 30 minutes.', onDismiss: () => {} },
};
