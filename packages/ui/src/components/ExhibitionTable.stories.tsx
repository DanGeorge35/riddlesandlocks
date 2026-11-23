import type { Meta, StoryObj } from '@storybook/react';
import { ExhibitionTable } from './ExhibitionTable';

const meta: Meta<typeof ExhibitionTable> = {
  title: 'Components/ExhibitionTable',
  component: ExhibitionTable,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ExhibitionTable>;

const common = {
  level: 'NOVICE' as const,
  title: 'Novice Exhibition · Today',
  entryFeeUsdt: '1',
  prizeUsdt: '5',
};

export const Open: Story = {
  args: {
    ...common,
    state: 'open',
    playersText: '7 players · table is on',
    timeText: 'Ends in 4h 12m',
    progressFraction: 1,
    gameCardPlaysLeft: 2,
    onJoin: () => {},
  },
};
export const Filling: Story = {
  args: {
    ...common,
    state: 'filling',
    playersText: '3 of 5 players needed',
    timeText: 'Closes 23:59',
    progressFraction: 0.6,
    gameCardPlaysLeft: 2,
    onJoin: () => {},
  },
};
export const Entered: Story = {
  args: {
    ...common,
    state: 'entered',
    playersText: '7 players · table is on',
    timeText: 'Ends in 4h 12m',
    progressFraction: 1,
    onOpen: () => {},
  },
};
export const Locked: Story = {
  args: { ...common, state: 'locked', lockReason: 'Complete Practice to unlock' },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ExhibitionTable
        {...common}
        state="open"
        playersText="7 players · table is on"
        timeText="Ends in 4h 12m"
        progressFraction={1}
        gameCardPlaysLeft={2}
        onJoin={() => {}}
        className="w-[345px]"
      />
      <ExhibitionTable
        {...common}
        state="filling"
        playersText="3 of 5 players needed"
        timeText="Closes 23:59"
        progressFraction={0.6}
        gameCardPlaysLeft={2}
        onJoin={() => {}}
        className="w-[345px]"
      />
      <ExhibitionTable
        {...common}
        state="entered"
        playersText="7 players · table is on"
        timeText="Ends in 4h 12m"
        progressFraction={1}
        onOpen={() => {}}
        className="w-[345px]"
      />
      <ExhibitionTable
        {...common}
        state="locked"
        lockReason="Complete Practice to unlock"
        className="w-[345px]"
      />
    </div>
  ),
};
