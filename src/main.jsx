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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Root layout component
    errorElement: <div>Hello world!</div>,
    children: [
      {
        index: true, // This makes it the default route for "/"
        element: <Home />,
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
        path: "/dashboard",
        element: <Home/>, // Dashboard Layout Component
        children: [
          {
            path: "add-link", // No need for '/' in child routes
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
