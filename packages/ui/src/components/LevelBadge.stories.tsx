import type { Meta, StoryObj } from '@storybook/react';
import { LevelBadge } from './LevelBadge';

const meta: Meta<typeof LevelBadge> = {
  title: 'Components/LevelBadge',
  component: LevelBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LevelBadge>;

export const Novice: Story = { args: { level: 'NOVICE', size: 'default' } };
export const Apprentice: Story = { args: { level: 'APPRENTICE', size: 'default' } };
export const Riddler: Story = { args: { level: 'RIDDLER', size: 'default' } };
export const Enigmatist: Story = { args: { level: 'ENIGMATIST', size: 'default' } };
export const MasterOfMinds: Story = { args: { level: 'MASTER_OF_MINDS', size: 'default' } };

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['NOVICE', 'APPRENTICE', 'RIDDLER', 'ENIGMATIST', 'MASTER_OF_MINDS'] as const).map((l) => (
        <div key={l} className="flex flex-col items-start gap-2">
          <LevelBadge level={l} size="default" />
          <LevelBadge level={l} size="small" />
        </div>
      ))}
    </div>
  ),
};
