import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RepairCard } from './repair-card'
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof RepairCard> = {
  title: 'Features/RepairOrders/Components/RepairCard',
  component: RepairCard,
  args : {
    placement: 'home'
  },
  argTypes: {
    placement: {
     defaultValue: { summary: 'home'},
     control: { type: 'select'},
     options: ['home', 'repair']
    }
  },
  decorators: [
    (Story) => (
        <MemoryRouter>
            <div className='flex w-full h-screen'>
                <div className='m-auto w-[675px]'>
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
                Year: '2020',
                VIN: 'XYZABC!@#5679JFPp',
                EngineSize: '2.4'
            },
            notes: 'Some customer notes to be provided by technicians.'
        },
        placement: 'home'
    }
}

export const NoVehicle: Story = {
    args: {
       repair: {
            created_on: '2026-01-24T23:26:36.361Z',
            id: '123',
            ro_number: '12345',
            status: 'in-progress',
       } 
    }
}