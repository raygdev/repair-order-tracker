import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './status-badge';
import { Status } from '@features/repair-orders/src/lib/domain/models/job.model';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/Status/StatusBadge',
  component: StatusBadge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(Status) as Array<keyof typeof Status>
    }
  }
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Playground: Story = {
  args: { variant: 'approved' }
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(Object.keys(Status) as Array<keyof typeof Status>).map(v => (
        <div key={v}>
          <StatusBadge variant={v} />
        </div>
      ))}
    </div>
  )
};