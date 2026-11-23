import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnswerInput } from './AnswerInput';

const meta: Meta<typeof AnswerInput> = {
  title: 'Components/AnswerInput',
  component: AnswerInput,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AnswerInput>;

export const Empty: Story = {
  args: { value: '', onChange: () => {} },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithValue: Story = {
  args: { value: 'SPHINX', onChange: () => {} },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: { value: 'LOCKED', onChange: () => {}, disabled: true },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="flex w-80 flex-col gap-3">
        <AnswerInput value={value} onChange={setValue} />
        <p className="font-mono text-xs text-muted">Raw value: "{value}"</p>
      </div>
    );
  },
};
