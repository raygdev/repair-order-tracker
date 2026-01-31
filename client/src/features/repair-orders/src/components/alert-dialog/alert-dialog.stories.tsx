import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertDialog } from "./alert-dialog";

const meta: Meta<typeof AlertDialog> = {
    title: 'Features/RepairOrders/Components/AlertDialog',
    component: AlertDialog,
    argTypes: {
        description: {
            description: 'description of why the user was alerted'
        },
        level: {
            description: 'Message level to pass for styling the alert',
            options: ['info', "warn", "error"],
            control: { type: 'select' }
        },
        title: {
            description: 'A title for the alert dialog. Defaults to "Something went wrong!"'
        }
    }
}

export default meta;
type Story = StoryObj<typeof AlertDialog>

export const Playground: Story = {
    args: {
        description: "Provide a useful message to the user here",
        level: 'info',
        title: "Title for the alert"
    }
}