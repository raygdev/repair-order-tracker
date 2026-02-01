export const Status =  {
    approved: 'Approved',
    declined: 'Declined',
    "waiting-on-customer": 'Waiting on customer',
    'waiting-on-parts': 'Waiting on parts',
    completed: 'Completed',
    quoted: 'Quoted',
    "in-progress": 'In Progress'
}

export interface Part {
    price: number,
    name: string,
    id: string
}

export interface Job {
    id: string
    description: string
    labor: number,
    status: keyof typeof Status,
    parts?: Part[]
}