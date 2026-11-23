import type { Meta, StoryObj } from '@storybook/react';
import { TransactionRow } from './TransactionRow';

const meta: Meta<typeof TransactionRow> = {
  title: 'Components/TransactionRow',
  component: TransactionRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TransactionRow>;

export const EntryFee: Story = {
  args: {
    type: 'entry-fee',
    title: 'Entry fee',
    subtitle: 'Riddle #12 · 21 Nov, 14:02',
    amountMicro: 5_000_000n,
    status: 'successful',
  },
};
export const Deposit: Story = {
  args: {
    type: 'deposit',
    title: 'Deposit',
    subtitle: 'Polygon · 21 Nov, 14:02',
    amountMicro: 25_000_000n,
    status: 'successful',
  },
};
export const Withdrawal: Story = {
  args: {
    type: 'withdrawal',
    title: 'Withdrawal',
    subtitle: 'Polygon · 21 Nov, 14:02',
    amountMicro: 10_000_000n,
    status: 'pending',
  },
};
export const Winnings: Story = {
  args: {
    type: 'winnings',
    title: 'Winnings',
    subtitle: 'Riddle #12 · 21 Nov, 14:02',
    amountMicro: 1_091_830_000n,
    status: 'successful',
  },
};
export const ReferralReward: Story = {
  args: {
    type: 'referral-reward',
    title: 'Referral reward',
    subtitle: 'Riddle #12 · 21 Nov, 14:02',
    amountMicro: 64_200_000n,
    status: 'successful',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex w-[380px] flex-col gap-2">
      <TransactionRow
        type="entry-fee"
        title="Entry fee"
        subtitle="Riddle #12 · 21 Nov, 14:02"
        amountMicro={5_000_000n}
        status="successful"
      />
      <TransactionRow
        type="deposit"
        title="Deposit"
        subtitle="Polygon · 21 Nov, 14:02"
        amountMicro={25_000_000n}
        status="successful"
      />
      <TransactionRow
        type="withdrawal"
        title="Withdrawal"
        subtitle="Polygon · 21 Nov, 14:02"
        amountMicro={10_000_000n}
        status="pending"
      />
      <TransactionRow
        type="winnings"
        title="Winnings"
        subtitle="Riddle #12 · 21 Nov, 14:02"
        amountMicro={1_091_830_000n}
        status="successful"
      />
      <TransactionRow
        type="referral-reward"
        title="Referral reward"
        subtitle="Riddle #12 · 21 Nov, 14:02"
        amountMicro={64_200_000n}
        status="successful"
      />
    </div>
  ),
};
