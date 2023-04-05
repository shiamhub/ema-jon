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
import cardProductLoaders from './loaders/CardProductLoader'
import Checkout from './compontnts/Checkout/Checkout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Shop></Shop>,
      },
      {
        path: 'orders',
        element: <Orders></Orders>,
        loader: cardProductLoaders
      },
      {
        path: 'inventory',
        element: <Inventory></Inventory>,
      },
      {
        path: "checkout",
        element: <Checkout></Checkout>
      },
      {
        path: 'login',
        element: <Login></Login>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
