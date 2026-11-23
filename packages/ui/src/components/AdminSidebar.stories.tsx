import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AdminSidebar, type AdminRoute } from './AdminSidebar';

const meta: Meta<typeof AdminSidebar> = {
  title: 'Components/AdminSidebar',
  component: AdminSidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AdminSidebar>;

export const ReviewQueue: Story = { args: { active: 'review-queue', onNav: () => {} } };
export const Treasury: Story = { args: { active: 'treasury', onNav: () => {} } };
export const Users: Story = { args: { active: 'users', onNav: () => {} } };

export const Interactive: Story = {
  render: () => {
    const [active, setActive] = useState<AdminRoute>('review-queue');
    return <AdminSidebar active={active} onNav={setActive} />;
  },
};
