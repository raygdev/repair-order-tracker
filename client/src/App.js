import React, {Suspense} from 'react' 
import './App.css';
import { Outlet } from 'react-router-dom'
import loadable from '@loadable/component';
const Header = loadable(() => import('./components/Header'))

function App() {

  return (
    <div className='app'>
      <Header />
      <Suspense fallback={<div>...Loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
