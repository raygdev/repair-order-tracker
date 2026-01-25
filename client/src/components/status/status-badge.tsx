import { Badge } from "@/components/ui/badge";
import { Timer, Clock8, CircleCheck, CircleX, MessageSquareQuote  } from "lucide-react";
import { cva } from "class-variance-authority";

export interface StatusBadgeProps {
    variant: keyof typeof variantText
}

export const variantText =  {
    approved: 'Approved',
    declined: 'Declined',
    "waiting-on-customer": 'Waiting on customer',
    'waiting-on-parts': 'Waiting on parts',
    completed: 'Completed',
    quoted: 'Quoted'
}

const colorVariant: Record<keyof typeof variantText, string> = {
    approved: 'bg-green-50 text-blue-700 dark:bg-blue-950 dark:text-blue-50',
    declined: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-50',
    "waiting-on-customer": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    "waiting-on-parts": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    completed: 'bg-green-50 text-blue-700 dark:bg-blue-950 dark:text-blue-50',
    quoted: 'bg-neutral-50 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300'
}

const statusBadgeColors = cva("flex gap-2", {
    variants: {
        variant: {
           approved: 'bg-green-50 text-blue-700 dark:bg-blue-950 dark:text-blue-50',
    declined: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-50',
    "waiting-on-customer": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    "waiting-on-parts": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    completed: 'bg-green-50 text-blue-700 dark:bg-blue-950 dark:text-blue-50',
    quoted: 'bg-neutral-50 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300' 
        }
    }
})

const iconVariant: Record<keyof typeof variantText, React.ReactNode> = {
    approved: <CircleCheck size={16}/>,
    declined: <CircleX size={16}/>,
    "waiting-on-customer": <Clock8 size={16}/>,
    'waiting-on-parts': <Timer size={16}/>,
    completed: <CircleCheck  size={16}/>,
    quoted: <MessageSquareQuote size={16}/>
}

export function StatusBadge({ variant }: StatusBadgeProps) {
    return (
        <Badge variant={'destructive'} className='bg-green-50'>
            {iconVariant[variant]} {variantText[variant]}
        </Badge>
    )
}