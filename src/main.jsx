import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './compontnts/Layout/Home'
import Shop from './compontnts/Shop/Shop'
import Orders from './compontnts/Orders/Orders'
import Inventory from './compontnts/Inventory/Inventory'
import Login from './compontnts/Login/Login'
import Checkout from './compontnts/Checkout/Checkout'
import cardProductLoaders from './loaders/cardProductLoader'
import SignUp from './compontnts/SignUp/SignUp'
import AuthProvider from './provider/AuthProvider'
import PrivateRoute from './route/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:5000/totalProducts')
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: cardProductLoaders
      },
      {
        path: 'inventory',
        element: <PrivateRoute><Inventory></Inventory></PrivateRoute>,
      },
      {
        path: "checkout",
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
