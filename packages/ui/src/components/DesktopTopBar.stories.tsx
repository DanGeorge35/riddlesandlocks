import type { Meta, StoryObj } from '@storybook/react';
import { DesktopTopBar } from './DesktopTopBar';

const meta: Meta<typeof DesktopTopBar> = {
  title: 'Components/DesktopTopBar',
  component: DesktopTopBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DesktopTopBar>;

export const Default: Story = {
  args: { title: 'Lobby', balanceMicro: 1284_500_000n, onWallet: () => {} },
};
export const EmptyBalance: Story = {
  args: { title: 'Wallet', balanceMicro: 0n, onWallet: () => {} },
};
