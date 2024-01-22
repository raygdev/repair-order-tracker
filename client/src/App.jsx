import React, {Suspense} from 'react' 
import './App.css';
import loadable from '@loadable/component';
const Header = loadable(() => import('./components/Header'))
const Outlet = loadable(() => import('react-router-dom').then(module => ({default : module.Outlet})))

function App() {

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
