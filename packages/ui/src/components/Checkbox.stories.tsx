import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Checked: Story = {
  args: { checked: true, label: 'I agree to the terms', onChange: () => {} },
};
export const Unchecked: Story = {
  args: { checked: false, label: 'I agree to the terms', onChange: () => {} },
};
export const Disabled: Story = {
  args: { checked: false, label: 'Disabled option', onChange: () => {}, disabled: true },
};

export const Interactive: Story = {
  render: () => {
    const [v, setV] = useState(false);
    return <Checkbox checked={v} onChange={setV} label="I accept the terms and conditions" />;
  },
};
