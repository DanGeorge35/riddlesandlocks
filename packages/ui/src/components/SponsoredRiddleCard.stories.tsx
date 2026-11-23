import type { Meta, StoryObj } from '@storybook/react';
import { SponsoredRiddleCard } from './SponsoredRiddleCard';

const meta: Meta<typeof SponsoredRiddleCard> = {
  title: 'Components/SponsoredRiddleCard',
  component: SponsoredRiddleCard,
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
type Story = StoryObj<typeof SponsoredRiddleCard>;

export const Default: Story = {
  args: {
    sponsorName: 'CryptoVault Inc.',
    riddleTitle: 'The Ancient Cipher',
    prizeUsdt: '500.00',
    endsText: 'Ends in 3 days',
    onEnter: () => {},
  },
};

export const LargePrize: Story = {
  args: {
    sponsorName: 'BlockChain Labs',
    riddleTitle: 'Quantum Enigma Challenge',
    prizeUsdt: '10,000.00',
    endsText: 'Ends in 1 day',
    onEnter: () => {},
  },
};
