import type { Meta, StoryObj } from '@storybook/react';
import { MobileNavHeader } from './MobileNavHeader';
import { Icon } from './Icon';

const meta: Meta<typeof MobileNavHeader> = {
  title: 'Components/MobileNavHeader',
  component: MobileNavHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96 bg-vault">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof MobileNavHeader>;

export const TitleOnly: Story = { args: { title: 'Wallet' } };
export const WithBack: Story = { args: { title: 'Round Details', onBack: () => {} } };
export const WithBackAndRight: Story = {
  args: {
    title: 'My Account',
    onBack: () => {},
    right: (
      <button className="flex size-11 items-center justify-center rounded-full text-muted hover:bg-surface">
        <Icon name="sliders" size={20} />
      </button>
    ),
  },
};
