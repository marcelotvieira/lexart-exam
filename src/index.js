import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Products from './pages/Products';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/', //root,
    element: <App />
  },
  {
    path: '/products', //root,
    element: <Products />
  },
])


ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

