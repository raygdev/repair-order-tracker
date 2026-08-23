import { Badge } from "@/components/ui/badge";
import { Timer, Clock8, CircleCheck, MessageSquareQuote, CircleDot, ThumbsUp, ThumbsDown  } from "lucide-react";
import { cva } from "class-variance-authority";
import {
    JobStatus,
} from "@features/repair-orders/src/lib/domain/models/job.model";
import { RepairOrderStatus } from "@features/repair-orders/src/lib/domain/models/repair-order.models";

export type StatusBadgeProps =
    | { kind: "job"; variant: JobStatus }
    | { kind: "repair-order"; variant: RepairOrderStatus };


const colorVariant = {
    approved: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-50',
    declined: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-50',
    "waiting-on-customer": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    "waiting-on-parts": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    completed: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-50',
    quoted: 'bg-neutral-50 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300',
    "in-progress": 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    pending: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
} as const;

const statusBadgeColors = cva("gap-2", {
    variants: {
        variant: colorVariant
    }
})

const iconVariant = {
    approved: <ThumbsUp size={16}/>,
    declined: <ThumbsDown size={16}/>,
    "waiting-on-customer": <Clock8 size={16}/>,
    'waiting-on-parts': <Timer size={16}/>,
    completed: <CircleCheck  size={16}/>,
    quoted: <MessageSquareQuote size={16}/>,
    "in-progress": <CircleDot size={16} />,
    pending: <Clock8 size={16}/>
} as const;

export function StatusBadge({ kind, variant }: StatusBadgeProps) {
    const label = kind === "job"
        ? JobStatus[variant]
        : RepairOrderStatus[variant];

    return (
        <Badge variant={'destructive'} className={statusBadgeColors({ variant })}>
            {iconVariant[variant]} {label}
        </Badge>
    )
}