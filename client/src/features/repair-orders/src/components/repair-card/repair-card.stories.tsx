import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RepairCard } from './repair-card'
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof RepairCard> = {
  title: 'Features/RepairOrders/Components/RepairCard',
  component: RepairCard,
  decorators: [
    (Story) => (
        <MemoryRouter>
            <div className='flex w-full h-screen'>
                <div className='m-auto w-[375px]'>
                   <Story/>
                </div>
            </div>
        </MemoryRouter>
    )
  ]
}

export default meta;
type Story = StoryObj<typeof RepairCard>

export const Playground: Story = {
    args: {
        repair: {
            created_on: '2026-01-24T23:26:36.361Z',
            id: '123',
            ro_number: '12345',
            status: 'in-progress',
            vehicle: {
                Make: 'Toyota',
                Model: 'Corolla',
                Year: '2020'
            }
        }
    }
}

export const NoVehicle: Story = {
    args: {
       repair: {
            created_on: '2026-01-24T23:26:36.361Z',
            id: '123',
            ro_number: '12345',
            status: 'in-progress'
       } 
    }
}