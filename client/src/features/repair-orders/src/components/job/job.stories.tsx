import type { Meta, StoryObj } from "@storybook/react-vite";
import { withRouter } from '.storybook/withRouter'
import { Job, type JobProps } from "./job";
import { redirect } from "react-router";

const job: JobProps = {
    job: {
         id: '123',
        description: "Remove and replace purge valve",
        labor: 2.4,
        status: "approved",
        parts: [{ price: 12.45, name: "Purge Valve", id: '1' }, { price: 50.47, name: "Intake Gaskets", id: '2' }]
    }
}

 function Wrapper() {
    return <Job {...job} />
}



const meta: Meta<typeof Job> = {
    title: 'Features/RepairOrders/Components/Job',
    component: Job,
    decorators: [
        withRouter({
            routes: [{
                path: 'dashboard/repairorders/:repairId',
                element: <Wrapper />,
                children: [
                    {
                        path: 'job/:jobId',
                        action: async ({ request }) => {
                            console.log(await request.json())
                            redirect('/dashboard/repairorders/123')
                            return null
                        }
                    },
                    {
                        path: 'part/:partId',
                        action: async({ request }) => {
                            console.log(await request.json())
                            redirect('/dashboard/repairorders/123')
                            return null
                        }
                    }
                ]
            }],
            initialEntries: ['/dashboard/repairorders/123']
        })

    ]
}

export default meta;

type Story = StoryObj<typeof Job>

export const Playground: Story = {
    args: {
        job: job.job
    }
}