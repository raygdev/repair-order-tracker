import { Suspense, useEffect, useState } from 'react'
import './App.css';
import loadable from '@loadable/component';
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router';
const Header = loadable(() => import('./components/Header'))
const Outlet = loadable(() => import('react-router-dom').then(module => ({default : module.Outlet})))

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

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
