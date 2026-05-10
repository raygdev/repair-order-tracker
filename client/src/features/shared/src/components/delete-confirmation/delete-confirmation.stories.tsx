import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DeleteConfirmation } from "./delete-confirmation";
import { withRouter } from ".storybook/withRouter";
import { sleep } from "@features/utils/sleep";

function Wrapper() {
  const [open, setOpen] = useState(true);
  return (
    <DeleteConfirmation
      id={"1"}
      open={open}
      setOpen={setOpen}
      name="Some Part"
    />
  );
}

const meta: Meta<typeof DeleteConfirmation> = {
  title: "Features/Shared/Components/DeleteConfrimation",
  component: DeleteConfirmation,
  decorators: [
    withRouter({
      routes: [
        {
          path: "dashboard/repairorders/:repairId",
          element: <Wrapper />,
          children: [
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
type Story = StoryObj<typeof DeleteConfirmation>;

export const Playground: Story = {
  args: {
    open: true,
    name: "Some Part",
    setOpen: () => false,
    id: "1",
  },
};
