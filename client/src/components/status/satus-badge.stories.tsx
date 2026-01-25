import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge, variantText } from './status-badge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/Status/StatusBadge',
  component: StatusBadge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: Object.keys(variantText) as Array<keyof typeof variantText>
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
      {(Object.keys(variantText) as Array<keyof typeof variantText>).map(v => (
        <div key={v}>
          <StatusBadge variant={v} />
        </div>
      ))}
    </div>
  )
};