import type { Form } from "@features/shared/src/lib/domain/models/form";
import type {
  Repair,
  Job,
  Part,
} from "../../domain";

export const createJobForm = (): Form => {
    return {
        title: 'Create New Job',
        method: 'post',
        action: 'job/create',
        encType: 'application/json',
        fields: [
            {
                label: 'Part',
                type: 'text',
                placeHolder: 'part',
                name: 'name'
            },
            {
                label: 'Price',
                type: 'number',
                step: '0.01',
                name: 'price'
            }
        ]
    }
}

// createRepairForm

// createJobForm

// transformRepairToUpdateForm

// transformJobToUpdateFrom,

// transformPartToUpdateFrom