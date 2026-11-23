import type { Meta, StoryObj } from '@storybook/react';
import { NoticeBar } from './NoticeBar';

const meta: Meta<typeof NoticeBar> = {
  title: 'Components/NoticeBar',
  component: NoticeBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof NoticeBar>;

export const Warning: Story = {
  args: {
    variant: 'warning',
    text: 'Notice message goes here.',
    linkLabel: 'Action',
    onLink: () => {},
  },
};
export const ErrorVariant: Story = {
  args: {
    variant: 'error',
    text: 'Notice message goes here.',
    linkLabel: 'Action',
    onLink: () => {},
  },
};
export const Info: Story = {
  args: {
    variant: 'info',
    text: 'Notice message goes here.',
    linkLabel: 'Action',
    onLink: () => {},
  },
};
export const Success: Story = {
  args: {
    variant: 'success',
    text: 'Notice message goes here.',
    linkLabel: 'Action',
    onLink: () => {},
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[345px] flex-col gap-3">
      {(['warning', 'error', 'info', 'success'] as const).map((v) => (
        <NoticeBar
          key={v}
          variant={v}
          text="Notice message goes here."
          linkLabel="Action"
          onLink={() => {}}
        />
      ))}
    </div>
  ),
};
