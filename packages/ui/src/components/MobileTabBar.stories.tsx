import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MobileTabBar, type TabId } from './MobileTabBar';

const meta: Meta<typeof MobileTabBar> = {
  title: 'Components/MobileTabBar',
  component: MobileTabBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MobileTabBar>;

export const LobbyActive: Story = { args: { active: 'lobby', onTab: () => {} } };
export const PlayActive: Story = { args: { active: 'play', onTab: () => {} } };
export const WalletActive: Story = { args: { active: 'wallet', onTab: () => {} } };
export const AccountActive: Story = { args: { active: 'account', onTab: () => {} } };

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState<TabId>('lobby');
    return (
      <div className="relative flex h-32 items-end bg-vault">
        <MobileTabBar active={active} onTab={setActive} className="w-full" />
      </div>
    );
  },
};
