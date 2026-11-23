import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Selected: Story = {
  args: { checked: true, label: 'Polygon (MATIC)', onChange: () => {} },
};
export const Unselected: Story = {
  args: { checked: false, label: 'Solana (SOL)', onChange: () => {} },
};

export const Group: Story = {
  render: () => {
    const [v, setV] = useState('polygon');
    return (
      <div className="flex flex-col gap-3">
        <Radio checked={v === 'polygon'} onChange={() => setV('polygon')} label="Polygon (USDT)" />
        <Radio checked={v === 'solana'} onChange={() => setV('solana')} label="Solana (USDT)" />
      </div>
    );
  },
};
