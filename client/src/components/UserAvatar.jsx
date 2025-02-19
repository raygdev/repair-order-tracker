import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuGroup
} from '@/components/ui/dropdown-menu'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useAuth } from '../hooks/useAuth'

function UserAvatar() {
    const auth = useAuth()
    const initials = (
        auth.user.firstName.substring(0,1).toUpperCase() +
        auth.user.lastName.substring(0,1).toUpperCase()
    )
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <span className='sr-only'>Toggle User Menu</span>
            <Avatar>
              <AvatarImage src="/assets/images/user.jpg"/>
              <AvatarFallback className='text-slate-500'>{initials}</AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' sideOffset={10} className='w-52'>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link to={'/profile'} className='flex gap-4 items-center text-slate-600'><FontAwesomeIcon aria-hidden={true} icon={faUser}/>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link to={'/settings'} className='flex gap-4 items-center text-slate-600'><FontAwesomeIcon aria-hidden={true} icon={faGear}/>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Logout />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        
    )
}

export default UserAvatar