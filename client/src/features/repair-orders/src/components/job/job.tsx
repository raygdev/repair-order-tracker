import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    TableHeader
} from '@components/ui/table'
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis, Trash, SquarePen } from 'lucide-react'
import { Button } from '@components/ui/button';
import { StatusBadge } from '@components/status/status-badge';

import type { Job, Part } from "../../lib/domain/models/job.model";
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useSubmit } from 'react-router-dom';


export interface JobProps {
    job: Job
}

/** 
 * @todo add functionality to job button
 */

export function Job({ job }: JobProps) {


    const partsTotal = job.parts?.reduce((a,b) => a + b.price || 0, 0).toFixed(2) || 0
    const totalLabor = (job.labor * 150).toFixed(2)
    const totalJob = (+totalLabor + +partsTotal).toFixed(2)
    const rowBorderStyles = 'border-gray-300 hover:bg-gray-50'
    return (
        <section aria-labelledby='job-description'>
            <div className='mb-4 py-5 px-1 rounded border-gray-200 border-1 flex justify-between items-center'>
                <h2 className='font-bold' id='job-description'>{job.description}</h2>
                <div className='flex gap-4'>
                    <StatusBadge variant={job.status} />
                    <Button variant='ghost' size='icon' aria-label={`More actions for job: ${job.description}`} >
                        <Ellipsis />
                    </Button>
                </div>
            </div>
            <div>
                <div className='py-2 pl-2 flex items-center gap-4'>
                    <span className='text-sm font-bold'>Labor</span>
                    <span>{job.labor} hours</span>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className={rowBorderStyles}>
                            <TableHead>Part</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { job.parts?.map(part => (
                            <TableRow className={rowBorderStyles} key={part.id}>
                                <TableCell>{part.name}</TableCell>
                                <TableCell>${part.price}</TableCell>
                                <TableCell className='text-right'><Actions part={part} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className={rowBorderStyles}>
                            <TableCell>Total Parts</TableCell>
                            <TableCell colSpan={2}>
                            ${partsTotal}
                            </TableCell>
                        </TableRow>
                        <TableRow className={rowBorderStyles}>
                            <TableCell className='font-bold'>Total Job</TableCell>
                            <TableCell colSpan={2}>${totalJob}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </section>
    )
}

interface ActionProps {
    part: Part
}

/**
 * @todo add functionality for edit and delete for a job
 */

function Actions({ part }: ActionProps) {

    const submit = useSubmit()
    const submitType = { method: 'delete', encType: 'applicaiton/json' }

    const baseItemStyles = "flex items-center gap-2 cursor-pointer hover:bg-gray-50"
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button className='cursor-pointer' variant='ghost' size='icon' aria-label={`More actions for ${part.name}`}>
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='bg-white border-slate-50'>
                    <DropdownMenuItem className={baseItemStyles}>
                        <SquarePen size={16} /> Edit <span className='sr-only'>{part.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => submit({ id: part.id }, { method: 'delete', action: `part/${part.id}`, encType: 'application/json'})}
                      className={`text-red-600 ${baseItemStyles}`}
                    >
                        <Trash size={16}/> Delete <span className='sr-only'>{part.name}</span>
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}