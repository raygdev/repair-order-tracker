import type { Meta, StoryObj } from "@storybook/react-vite";
import { withRouter } from ".storybook/withRouter";
import { redirect } from "react-router";
import { sleep } from "@features/utils/sleep";
import { RepairOrderPage } from "./repair-page";
import type { RepairOrder } from "../../lib/domain";

const repairs: RepairOrder[]  = [{
    _id: '123',
    isWarranty: true,
    vin: 'XYZ',
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
    notes: 'Some customer notes to be provided by technicians.',
    jobs:[
      {
        id: "123",
        description: "Remove and replace purge valve",
        labor: 2.4,
        status: "approved",
        parts: [
          { price: 12.45, name: "Purge Valve", id: "1" },
          { price: 50.47, name: "Intake Gaskets", id: "2" },
        ],
      }
    ],
}];

function Wrapper() {
  return <RepairOrderPage/>;
}

const meta: Meta<typeof RepairOrderPage> = {
  title: "Features/RepairOrders/Components/RepairOrderPage",
  component: RepairOrderPage,
  decorators: [
    withRouter({
      routes: [
        {
          path: "dashboard/repairorders/:repairId",
          id: 'root',
          element: <Wrapper />,
          loader: () => repairs,
          children: [
            {
              path: "job/:jobId",
              action: async ({ request }) => {
                console.log(await request.json());
                redirect("/dashboard/repairorders/123");
                return null;
              },
            },
            {
              path: "part/:partId",
              action: async ({ request }) => {
                console.log(await request.json());
                await sleep();
                return { success: true };
              },
            },
          ],
        },
      ],
      initialEntries: ["/dashboard/repairorders/123"],
    }),
  ],
};

export default meta;

type Story = StoryObj<typeof RepairOrderPage>;

export const Playground: Story = {
 
};
