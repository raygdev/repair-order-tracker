export const Status =  {
    approved: 'Approved',
    declined: 'Declined',
    "waiting-on-customer": 'Waiting on customer',
    'waiting-on-parts': 'Waiting on parts',
    completed: 'Completed',
    quoted: 'Quoted',
    "in-progress": 'In Progress'
}

export interface Parts {
    price: number,
    name: string
}

export interface Job {
    description: string
    labor: number,
    status: keyof typeof Status,
    userId: string,
    repairId:string 
    parts?: Parts[]
}