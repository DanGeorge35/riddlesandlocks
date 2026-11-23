import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: 'Primary button', variant: 'primary' } };
export const Secondary: Story = { args: { children: 'Secondary button', variant: 'secondary' } };
export const Ghost: Story = { args: { children: 'Ghost button', variant: 'ghost' } };
export const Danger: Story = { args: { children: 'Danger button', variant: 'danger' } };
export const Loading: Story = { args: { children: 'Loading…', variant: 'primary', loading: true } };
export const Disabled: Story = {
  args: { children: 'Disabled', variant: 'primary', disabled: true },
};
export const Small: Story = { args: { children: 'Small', variant: 'primary', size: 'sm' } };
export const WithIcon: Story = {
  args: {
    children: 'With icon',
    variant: 'primary',
    iconLeft: (
      <svg className="size-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
  },
};
