import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { Job } from "./job";

const meta: Meta<typeof Job> = {
    title: 'Features/RepairOrders/Components/Job',
    component: Job,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ]
}

export default meta;

type Story = StoryObj<typeof Job>

export const Playground: Story = {
    args: {
        job: {
            id: '123',
            description: "Remove and replace purge valve",
            labor: 2.4,
            status: "approved",
            parts: [{ price: 12.45, name: "Purge Valve", id: '1' }, { price: 50.47, name: "Intake Gaskets", id: '2' }]
        }
    }
}