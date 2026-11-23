import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DesktopSidebar, type SidebarRoute } from './DesktopSidebar';

const meta: Meta<typeof DesktopSidebar> = {
  title: 'Components/DesktopSidebar',
  component: DesktopSidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DesktopSidebar>;

export const LobbyActive: Story = { args: { active: 'lobby', onNav: () => {} } };
export const WalletActive: Story = { args: { active: 'wallet', onNav: () => {} } };

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState<SidebarRoute>('lobby');
    return <DesktopSidebar active={active} onNav={setActive} />;
  },
};
