import { Suspense, useEffect, useState } from 'react'
import './App.css';
import loadable from '@loadable/component';
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useResolvedPath } from 'react-router';
const Header = loadable(() => import('./components/Header'))
const Outlet = loadable(() => import('react-router-dom').then(module => ({default : module.Outlet})))

function App() {
  const navigate = useNavigate()
  const { pathname } = useResolvedPath()
  const userPath = pathname.includes('user')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    let decoded;
  if(token) {
    decoded = jwtDecode(token)
    const loggedInRoute = userPath ? pathname : `user/${decoded.id}`
    navigate(loggedInRoute, { replace: true })
  }
    setLoading(false)
  },[])

  if(loading) {
    return(
      <div>
        <Header />
        ...loading
      </div>
    )
  }

  return (
    <div className='app font-mono w-full'>
      <Header />
      <Suspense fallback={<div>...Loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
