import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './status-badge';
import { JobStatus } from '@features/repair-orders/src/lib/domain/models/job.model';
import { RepairOrderStatus } from '@features/repair-orders/src/lib/domain/models/repair-order.models';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/Status/StatusBadge',
  component: StatusBadge,
  argTypes: {
    kind: {
      control: { type: 'select' },
      options: ['job', 'repair-order']
    }
  }
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Playground: Story = {
  args: { kind: 'repair-order', variant: 'approved' }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(Object.keys(RepairOrderStatus) as Array<keyof typeof RepairOrderStatus>).map(v => (
        <div key={`repair-order-${v}`}>
          <StatusBadge kind="repair-order" variant={v} />
        </div>
      ))}
      {(Object.keys(JobStatus) as Array<keyof typeof JobStatus>).map(v => (
        <div key={`job-${v}`}>
          <StatusBadge kind="job" variant={v} />
        </div>
      ))}
    </div>
  )
};