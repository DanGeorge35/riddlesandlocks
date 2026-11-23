import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const On: Story = { args: { checked: true, label: 'Notifications', onChange: () => {} } };
export const Off: Story = { args: { checked: false, label: 'Notifications', onChange: () => {} } };
export const Disabled: Story = {
  args: { checked: false, label: 'Notifications', onChange: () => {}, disabled: true },
};

export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState(false);
    return <Toggle checked={on} onChange={setOn} label="Push notifications" />;
  },
};
