import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const DotIcon = () => <span className="inline-block size-2 rounded-full bg-current" />;

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Live: Story = { args: { variant: 'live', label: 'Live', icon: <DotIcon /> } };
export const EndingSoon: Story = {
  args: { variant: 'ending-soon', label: 'Ending soon', icon: <DotIcon /> },
};
export const Solved: Story = { args: { variant: 'solved', label: 'Solved', icon: <DotIcon /> } };
export const RolledOver: Story = {
  args: { variant: 'rolled-over', label: 'Rolled over', icon: <DotIcon /> },
};
export const Legendary: Story = {
  args: { variant: 'legendary', label: 'Legendary', icon: <DotIcon /> },
};
export const Pending: Story = { args: { variant: 'pending', label: 'Pending', icon: <DotIcon /> } };
export const Successful: Story = {
  args: { variant: 'successful', label: 'Successful', icon: <DotIcon /> },
};
export const Failed: Story = { args: { variant: 'failed', label: 'Failed', icon: <DotIcon /> } };
export const Scheduled: Story = {
  args: { variant: 'scheduled', label: 'Scheduled', icon: <DotIcon /> },
};
export const Neutral: Story = { args: { variant: 'neutral', label: 'Neutral', icon: <DotIcon /> } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(
        [
          'live',
          'ending-soon',
          'solved',
          'rolled-over',
          'legendary',
          'pending',
          'successful',
          'failed',
          'scheduled',
          'neutral',
        ] as const
      ).map((v) => (
        <Chip key={v} variant={v} label={v} icon={<DotIcon />} />
      ))}
    </div>
  ),
};
