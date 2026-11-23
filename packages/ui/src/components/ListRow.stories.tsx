import type { Meta, StoryObj } from '@storybook/react';
import { ListRow } from './ListRow';
import { Icon } from './Icon';

const meta: Meta<typeof ListRow> = {
  title: 'Components/ListRow',
  component: ListRow,
  parameters: { layout: 'padded' },
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
type Story = StoryObj<typeof ListRow>;

export const Default: Story = {
  args: { icon: <Icon name="wallet" size={20} />, label: 'Wallet', onClick: () => {} },
};
export const Account: Story = {
  args: { icon: <Icon name="user" size={20} />, label: 'Account settings', onClick: () => {} },
};

export const ListGroup: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <ListRow icon={<Icon name="bell" size={20} />} label="Notifications" onClick={() => {}} />
      <ListRow icon={<Icon name="wallet" size={20} />} label="Wallet" onClick={() => {}} />
      <ListRow icon={<Icon name="gift" size={20} />} label="Referrals" onClick={() => {}} />
      <ListRow icon={<Icon name="help" size={20} />} label="Help & rules" onClick={() => {}} />
    </div>
  ),
};
