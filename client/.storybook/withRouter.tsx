import {
  createMemoryRouter,
  RouterProvider,
  type RouteObject
} from 'react-router'

export function withRouter({
    routes,
    initialEntries = ['/'],
}: {
    routes: RouteObject[],
    initialEntries: string[]
}) {
    return function DataRouterDecorator() {
        const router = createMemoryRouter(routes, {
            initialEntries
        });

        return <RouterProvider router={router} />
    }
}