import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './router'
import loadable from '@loadable/component';
const RouterProvider = loadable(() => import('react-router-dom').then(module => ({default: module.RouterProvider})))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);