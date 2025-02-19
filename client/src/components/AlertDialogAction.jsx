import { useState } from 'react'
import { useSubmit } from 'react-router-dom'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogTitle,
    AlertDialogFooter
} from '@/components/ui/alert-dialog'
import {
    Button
} from '@/components/ui/button'

function AlertDeleteDialog({ method, action, name, className }) {
    const [open, setOpen ] = useState(false)
    const submit = useSubmit()

    const handleSubmit = () => {
        submit(null, { method, action })
        setOpen(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button className={className}>
                    <span className='sr-only'>Delete {name}</span> <FontAwesomeIcon icon={faTrash}/>
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {name}.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={() =>handleSubmit()}>Delete</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDeleteDialog