import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from './Button';
import { KeyValueRow } from './KeyValueRow';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  args: {
    title: 'Confirm Withdrawal',
    open: true,
    onClose: () => {},
    children: (
      <div className="flex flex-col gap-4">
        <KeyValueRow label="Amount" value="250.00 USDT" />
        <KeyValueRow label="To address" value="0x4f8a…c3b2" />
        <div className="flex gap-3 pt-2">
          <Button variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" className="flex-1">
            Confirm
          </Button>
        </div>
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
          Open Modal
        </Button>
        <Modal title="Enter Round" open={open} onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-4">
            <KeyValueRow label="Entry fee" value="5.00 USDT" />
            <KeyValueRow label="Your balance" value="48.92 USDT" />
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="flex-1" onClick={() => setOpen(false)}>
                Enter
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};
