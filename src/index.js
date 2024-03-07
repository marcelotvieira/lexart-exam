import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Components/AuthProvider';

import { ConfigProvider } from 'antd';
import NewProduct from './pages/NewProduct';
import Products from './pages/Products';
import Register from './pages/Register';
import Signin from './pages/Signin';
import UpdateProduct from './pages/UpdateProduct';
import './styles/app.css';
import './styles/index.css';
import { theme } from './theme/themeConfig';


const router = createBrowserRouter([
  {
    path: '/', //root,
    element: <Products />,
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
    path: '/products/new',
    element: <NewProduct />
  },
  {
    path: '/products/update/:id',
    element: <UpdateProduct />
  },
])


ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider theme={theme} >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

