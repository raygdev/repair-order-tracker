import { Badge } from "@components/ui/badge";
import { Timer, Clock8, CircleCheck, CircleX, MessageSquareQuote  } from "lucide-react";

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

export const colorVariant: Record<keyof typeof variantText, string> = {
    approved: 'bg-green-50 text-blue-700 dark:bg-blue-950 dark:text-blue-50',
    declined: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-50',
    "waiting-on-customer": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    "waiting-on-parts": 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-50',
    completed: 'bg-green-50 text-blue-700 dark:bg-blue-950 dark:text-blue-50',
    quoted: 'bg-neutral-50 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300'
}

export const iconVariant: Record<keyof typeof variantText, React.ReactNode> = {
    approved: <CircleCheck />,
    declined: <CircleX />,
    "waiting-on-customer": <Clock8 />,
    'waiting-on-parts': <Timer />,
    completed: <CircleCheck />,
    quoted: <MessageSquareQuote />
}

export function StatusBadge({ variant }: StatusBadgeProps) {
    <Badge className={`flex gap-2 ${colorVariant[variant]}`}>
        {iconVariant[variant]} {variantText[variant]}
    </Badge>
}