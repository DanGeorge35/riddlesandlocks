import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedTabs } from './SegmentedTabs';

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Components/SegmentedTabs',
  component: SegmentedTabs,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SegmentedTabs<string>>;

const tabs = [
  { id: 'deposit', label: 'Deposit' },
  { id: 'withdraw', label: 'Withdraw' },
  { id: 'history', label: 'History' },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('deposit');
    return <SegmentedTabs tabs={tabs} active={active} onChange={setActive} />;
  },
};
