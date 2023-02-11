import loadable from '@loadable/component'
const Outlet = loadable(() => import('react-router-dom').then(module => ({default:module.Outlet})))

export default function UserLayout() {

  return (
    <div>
        <Outlet />
    </div>
  )
}
