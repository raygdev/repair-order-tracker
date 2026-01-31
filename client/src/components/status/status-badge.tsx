import { Badge } from "@/components/ui/badge";
import { Timer, Clock8, CircleCheck, CircleX, MessageSquareQuote, CircleDot  } from "lucide-react";
import { cva } from "class-variance-authority";
import { Status } from "@features/repair-orders/src/lib/domain/models/job.model";
export interface StatusBadgeProps {
    variant: keyof typeof Status
}


const colorVariant: Record<keyof typeof Status, string> = {
    approved: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-50',
    declined: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-50',
    "waiting-on-customer": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    "waiting-on-parts": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    completed: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-50',
    quoted: 'bg-neutral-50 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300',
    "in-progress": 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
}

const statusBadgeColors = cva("gap-2", {
    variants: {
        variant: colorVariant
    }
})

const iconVariant: Record<keyof typeof Status, React.ReactNode> = {
    approved: <CircleCheck size={16}/>,
    declined: <CircleX size={16}/>,
    "waiting-on-customer": <Clock8 size={16}/>,
    'waiting-on-parts': <Timer size={16}/>,
    completed: <CircleCheck  size={16}/>,
    quoted: <MessageSquareQuote size={16}/>,
    "in-progress": <CircleDot size={16} />
}

export function StatusBadge({ variant }: StatusBadgeProps) {
    return (
        <Badge variant={'destructive'} className={statusBadgeColors({ variant })}>
            {iconVariant[variant]} {Status[variant]}
        </Badge>
    )
}