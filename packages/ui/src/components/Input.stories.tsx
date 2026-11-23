import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Icon } from './Icon';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', id: 'email' },
};
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    id: 'email-err',
    error: 'Email is required.',
  },
};
export const WithIconLeft: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search riddles…',
    id: 'search',
    iconLeft: <Icon name="search" size={16} />,
  },
};
export const WithIconRight: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    id: 'pwd',
    type: 'password',
    iconRight: <Icon name="eye" size={16} />,
  },
};
export const Mono: Story = {
  args: { label: 'Wallet address', placeholder: '0xabc…', id: 'wallet', mono: true },
};
export const Disabled: Story = {
  args: { label: 'Username', value: 'player123', disabled: true, id: 'uname' },
};
