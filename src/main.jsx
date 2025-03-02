import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AuthProvider from './AuthContext/AuthProvider';
import Contact from './pages/Contact';
import AddLink from './pages/AddLink';
import VerifyPage from './pages/VerifyPage';
import MyLinks from './pages/MyLinks';
import PrivateRoute from './hooks/PrivateRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, 
    errorElement: <div>Hello world!</div>,
    children: [
      {
        index: true, 
        element: <Login></Login>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: '/contact-us',
        element: <Contact></Contact>
      },
      {
        path: '/add-link',
        element: <PrivateRoute><AddLink></AddLink></PrivateRoute>,
      }
      ,{
        path: "/link/:uniqueId" ,
        element: <VerifyPage/>
      }
      ,{
        path: '/my-links',
        element: <PrivateRoute><MyLinks></MyLinks></PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
