import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './Components/AuthProvider';
import Products from './pages/Products';
import Register from './pages/Register';
import Signin from './pages/Signin';
import './styles/app.css';
import './styles/index.css';


const router = createBrowserRouter([
  {
    path: '/', //root,
    element: <App />,
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/products',
    element: <Products />
  },
])


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

