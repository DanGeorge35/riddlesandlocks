import type { Meta, StoryObj } from '@storybook/react';
import { Icon, type IconName } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = { args: { name: 'lock', size: 24 } };

const ALL_ICONS: IconName[] = [
  'lock',
  'unlock',
  'check',
  'x',
  'clock',
  'bell',
  'wallet',
  'grid',
  'key',
  'user',
  'users',
  'copy',
  'arrow-left',
  'chevron-right',
  'chevron-down',
  'search',
  'mail',
  'alert',
  'info',
  'crown',
  'refresh',
  'gift',
  'share',
  'eye',
  'trophy',
  'flame',
  'plus',
  'arrow-in',
  'arrow-out',
  'volume',
  'volume-x',
  'link',
  'sliders',
  'calendar',
  'chart',
  'shield',
  'sparkles',
  'book',
  'loader',
  'logout',
  'help',
  'file',
  'clipboard',
  'qr',
  'at',
  'message',
  'send',
  'play',
  'video',
  'quote',
  'filter',
  'edit',
  'bot',
  'hash',
  'external',
  'x-circle',
  'check-circle',
  'menu',
  'calc',
  'landmark',
  'brain',
  'cipher',
  'megaphone',
  'logo',
];

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-4 p-4">
      {ALL_ICONS.map((name) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <Icon name={name} size={24} className="text-body" />
          <span className="text-center font-mono text-[9px] text-muted">{name}</span>
        </div>
      ))}
    </div>
  ),
};
