import type { Meta, StoryObj } from '@storybook/react';
import { PieceRow } from './PieceRow';

const meta: Meta<typeof PieceRow> = {
  title: 'Components/PieceRow',
  component: PieceRow,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PieceRow>;

const defaults = { number: 4, category: 'CIPHER' as const, title: 'The shifted alphabet' };

export const Locked: Story = { args: { ...defaults, state: 'locked' } };
export const Available: Story = { args: { ...defaults, state: 'available' } };
export const Checking: Story = { args: { ...defaults, state: 'checking' } };
export const Correct: Story = { args: { ...defaults, state: 'correct' } };
export const Wrong: Story = { args: { ...defaults, state: 'wrong' } };
export const LimitReached: Story = { args: { ...defaults, state: 'limit-reached' } };

export const AllStates: Story = {
  render: () => (
    <div className="flex w-[345px] flex-col gap-3">
      {(['locked', 'available', 'checking', 'correct', 'wrong', 'limit-reached'] as const).map(
        (s) => (
          <PieceRow key={s} {...defaults} state={s} />
        ),
      )}
    </div>
  ),
};
