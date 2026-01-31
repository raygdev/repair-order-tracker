import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Info, TriangleAlert, CircleX } from "lucide-react";

interface DialogProps {
    description: string,
    level: AlertLevel,
    title?: string
}

type AlertLevel = "info" | "warn" | "error"

type LevelColor = Record<AlertLevel, string>

type LevelIcon = Record<AlertLevel, React.ReactNode>

const levelColor: LevelColor = {
    info: 'bg-sky-50 border-sky-200 text-sky-950',
    warn: 'bg-amber-50 border-amber-200 text-amber-950',
    error: 'bg-red-50 border-red-200 text-red-950'
}

const descriptionColor: LevelColor = {
    info: 'text-sky-700',
    warn: 'text-amber-700',
    error: 'text-red-700'
}

const levelIcon: LevelIcon = {
    info: <Info size={16} />,
    warn: <TriangleAlert size={16} />,
    error: <CircleX size={16} />
}


const DEFAULT_ERROR_DESCRIPTION = "Please try again later."
const DEFAULT_LEVEL = 'error'
const DEFAULT_TITLE = "Something went wrong!"

export function AlertDialog({ description, level, title }: DialogProps = { description: DEFAULT_ERROR_DESCRIPTION, level: DEFAULT_LEVEL, title: DEFAULT_TITLE }) {
    return (
        <Alert className={levelColor[level]}>
            <div className="flex gap-2">
                {levelIcon[level]}
                <AlertTitle>{title}</AlertTitle>
            </div>
            <AlertDescription className={descriptionColor[level]}>{description}</AlertDescription>
        </Alert>
    )
}