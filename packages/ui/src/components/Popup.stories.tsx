import type { Meta, StoryObj } from '@storybook/react';
import { Popup } from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Popup>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Transaction successful',
    body: 'Your withdrawal is on its way.',
    primaryLabel: 'Done',
    secondaryLabel: 'View receipt',
    copyValue: '0x9b1c4f…a744de',
    onPrimary: () => {},
    onSecondary: () => {},
    onCopy: () => {},
  },
};
export const Error: Story = {
  args: {
    type: 'error',
    title: 'Something went wrong',
    body: 'Please try again in a moment.',
    primaryLabel: 'Try again',
    secondaryLabel: 'Cancel',
    onPrimary: () => {},
    onSecondary: () => {},
  },
};
export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Are you sure?',
    body: 'This action needs your attention.',
    primaryLabel: 'Continue',
    secondaryLabel: 'Cancel',
    onPrimary: () => {},
    onSecondary: () => {},
  },
};
export const Confirm: Story = {
  args: {
    type: 'confirm',
    title: 'Confirm action',
    body: 'Please confirm to continue.',
    primaryLabel: 'Confirm',
    secondaryLabel: 'Cancel',
    onPrimary: () => {},
    onSecondary: () => {},
  },
};
