import type { Meta, StoryObj } from '@storybook/react';
import { KeyValueRow } from './KeyValueRow';

const meta: Meta<typeof KeyValueRow> = {
  title: 'Components/KeyValueRow',
  component: KeyValueRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof KeyValueRow>;

export const Default: Story = { args: { label: 'Entry fee', value: '5.00 USDT' } };
export const LongValue: Story = { args: { label: 'Transaction hash', value: '0x4f8a…c3b2' } };

export const DataGroup: Story = {
  render: () => (
    <div className="w-80">
      <KeyValueRow label="Round" value="#47" />
      <KeyValueRow label="Level" value="Riddler" />
      <KeyValueRow label="Entry fee" value="5.00 USDT" />
      <KeyValueRow label="Players" value="12 / 20" />
      <KeyValueRow label="Closes" value="in 3 days" />
    </div>
  ),
};
