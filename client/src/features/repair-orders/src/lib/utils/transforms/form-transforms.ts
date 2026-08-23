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
                label: 'Descrition',
                type: 'text',
                placeHolder: 'Description i.e. R&R purge valve',
                name: 'description'
            },
            {
                label: 'Labor',
                type: 'number',
                step: '0.1',
                name: 'labor',
                placeHolder: '2.5'
            }
        ]
    }
}

// createRepairForm

//createPartFrom
export const createPartForm = (jobId: string): Form => {
    return {
        title: 'Create New Part',
        method: 'post',
        action: 'part/create',
        encType: 'application/json',
        id: jobId,
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
                placeHolder: 'Part price',
                step: '0.01',
                name: 'price'
            },
            {
                label: 'Quantity',
                type: 'number',
                defaultValue: 1,
                step: '1',
                name: 'quantity'
            }
        ]
    }
}

export const editJobForm = (job: Job): Form => {
  return {
        title: 'Edit Job',
        method: 'post',
        action: `job/update/${job.id}`,
        encType: 'application/json',
        fields: [
            {
                label: 'Descrition',
                type: 'text',
                defaultValue: job.description,
                name: 'description'
            },
            {
                label: 'Labor',
                type: 'number',
                step: '0.1',
                name: 'labor',
                defaultValue: job.labor || 0.0
            }
        ]
    }
}

export const editPartsForm = (part: Part): Form => {
    return {
        title: 'Edit Part',
        method: 'post',
        action: `part/update/${part.id}`,
        encType: 'application/json',
        fields: [
            {
                label: 'Part',
                type: 'text',
                defaultValue: part.name,
                name: 'name'
            },
            {
                label: 'Price',
                type: 'number',
                defaultValue: part.price || 0.00,
                step: '0.01',
                name: 'price'
            },
             {
                label: 'Quantity',
                type: 'number',
                defaultValue: part.quantity || 1,
                step: '1',
                name: 'quantity'
            }
        ]
    } 
}


// transformRepairToUpdateForm

// transformJobToUpdateFrom,

// transformPartToUpdateFrom