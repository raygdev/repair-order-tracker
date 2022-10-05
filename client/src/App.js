import React from 'react'
import { Register } from './components/Register'; 
import './App.css';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
