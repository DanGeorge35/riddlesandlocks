import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet';
import { Button } from './Button';
import { KeyValueRow } from './KeyValueRow';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Open: Story = {
  args: {
    title: 'Confirm Entry',
    open: true,
    onClose: () => {},
    children: (
      <div className="flex flex-col gap-4">
        <KeyValueRow label="Round" value="The Great Cipher #47" />
        <KeyValueRow label="Entry fee" value="5.00 USDT" />
        <Button variant="primary" className="w-full">
          Confirm &amp; Enter
        </Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex justify-center p-8">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Sheet
        </Button>
        <BottomSheet title="Round Details" open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-4">
            <KeyValueRow label="Level" value="Riddler" />
            <KeyValueRow label="Prize" value="1,284.00 USDT" />
            <Button variant="primary" className="w-full" onClick={() => setOpen(false)}>
              Enter Round
            </Button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};
