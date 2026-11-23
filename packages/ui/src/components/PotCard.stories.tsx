import type { Meta, StoryObj } from '@storybook/react';
import { PotCard } from './PotCard';
import { Chip } from './Chip';

const meta: Meta<typeof PotCard> = {
  title: 'Components/PotCard',
  component: PotCard,
  parameters: { layout: 'centered' },
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
type Story = StoryObj<typeof PotCard>;

export const Hero: Story = {
  render: () => (
    <PotCard
      variant="hero"
      title="The Great Cipher"
      prizeMicro={1_284_000_000n}
      chip={<Chip variant="live" icon={null} label="Live" />}
      mode="Exhibition"
      onClick={() => {}}
    />
  ),
};

export const Compact: Story = {
  render: () => (
    <PotCard
      variant="compact"
      title="Weekly Challenge #12"
      prizeMicro={500_000_000n}
      chip={<Chip variant="ending-soon" icon={null} label="Ending soon" />}
      mode="Exhibition"
      onClick={() => {}}
    />
  ),
};
