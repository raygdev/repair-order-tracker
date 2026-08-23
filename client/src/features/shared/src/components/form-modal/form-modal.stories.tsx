import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { sleep } from "@features/utils/sleep";
import type { Form } from "../../lib/domain/models/form";
import { Status } from "@features/repair-orders/src/lib/domain/models/job.model";
import { FormModal } from "./form-modal";

const statusOptions = Object.entries(Status).map(([value, label]) => ({ value, label }));

const newRepairOrderForm: Form = {
  title: "Create Repair Order",
  method: "post",
  action: "/api/repair-orders/create",
  encType: "application/json",
  fields: [
    { label: "Repair order number", name: "ro_number", type: "text", placeHolder: "Enter an RO number" },
    { label: "VIN", name: "vin", type: "text", placeHolder: "Enter the vehicle VIN" },
    { label: "Notes", name: "notes", type: "text", placeHolder: "Add customer or technician notes" },
    { label: "Warranty", name: "isWarranty", type: "checkbox" },
  ],
};

const existingRepairOrderForm: Form = {
  ...newRepairOrderForm,
  id: "repair-order-123",
  title: "Edit Repair Order",
  method: "patch",
  action: "/api/repair-orders/repair-order-123",
  fields: [
    { label: "Repair order number", name: "ro_number", type: "text", value: "RO-123" },
    { label: "VIN", name: "vin", type: "text", value: "1HGCM82633A123456" },
    { label: "Created on", name: "created_on", type: "date", value: "2026-08-22" },
    { label: "Notes", name: "notes", type: "text", value: "Customer reports a warning light" },
    { label: "Warranty", name: "isWarranty", type: "checkbox", value: "true" },
    { label: "Status", name: "status", type: "select", value: "in-progress", options: statusOptions },
  ],
};

const newPartForm: Form = {
  title: "Add Part",
  method: "post",
  action: "/api/parts/create",
  encType: "application/json",
  fields: [
    { label: "Part name", name: "name", type: "text", placeHolder: "Enter a part name" },
    { label: "Price", name: "price", type: "number", placeHolder: "0.00", step: "0.01" },
  ],
};

const existingPartForm: Form = {
  ...newPartForm,
  id: "part-123",
  title: "Edit Part",
  method: "patch",
  action: "/api/parts/part-123",
  fields: [
    { label: "Part name", name: "name", type: "text", value: "Purge Valve" },
    { label: "Price", name: "price", type: "number", value: "12.45", step: "0.01" },
  ],
};

const newJobForm: Form = {
  title: "Add Job",
  method: "post",
  action: "/api/jobs/create",
  encType: "application/json",
  fields: [
    { label: "Description", name: "description", type: "text", placeHolder: "Describe the repair" },
    { label: "Labor hours", name: "labor", type: "number", placeHolder: "0.0", step: "0.1" },
  ],
};

const existingJobForm: Form = {
  ...newJobForm,
  id: "job-123",
  title: "Edit Job",
  method: "patch",
  action: "/api/jobs/job-123",
  fields: [
    { label: "Description", name: "description", type: "text", value: "Replace purge valve" },
    { label: "Labor hours", name: "labor", type: "number", value: "2.5", step: "0.1" },
  ],
};

const withFormRouter: Decorator = (Story) => {
  const router = createMemoryRouter(
    [{
      path: "*",
      element: <Story />,
      action: async ({ request }) => {
        console.log(await request.json());
        await sleep();
        return { success: true };
      },
    }],
    { initialEntries: ["/"] },
  );

  return <RouterProvider router={router} />;
};

const meta: Meta<typeof FormModal> = {
  title: "Features/Shared/Components/FormModal",
  component: FormModal,
  decorators: [withFormRouter],
};

export default meta;
type Story = StoryObj<typeof FormModal>;

export const NewRepairOrder: Story = {
  args: { form: newRepairOrderForm, setOpen: () => undefined },
};

export const ExistingRepairOrder: Story = {
  args: { form: existingRepairOrderForm, setOpen: () => undefined },
};

export const NewPart: Story = {
  args: { form: newPartForm, setOpen: () => undefined },
};

export const ExistingPart: Story = {
  args: { form: existingPartForm, setOpen: () => undefined },
};

export const NewJob: Story = {
  args: { form: newJobForm, setOpen: () => undefined },
};

export const ExistingJob: Story = {
  args: { form: existingJobForm, setOpen: () => undefined },
};
