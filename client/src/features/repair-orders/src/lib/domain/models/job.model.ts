export const JobStatus =  {
    approved: 'Approved',
    declined: 'Declined',
    pending: 'Pending'
}

export type JobStatus = keyof typeof JobStatus

export interface Part {
    price: number,
    name: string,
    id: string
    jobId: string
}

export interface Job {
    id: string
    description: string
    labor: number,
    status: JobStatus,
    parts?: Part[]
}