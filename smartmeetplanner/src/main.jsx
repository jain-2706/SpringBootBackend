import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './compoonents/Home/Home.jsx'
import Login from './compoonents/Login/Login.jsx'
import Register from './compoonents/Login/Register.jsx'
import PrivateRoute from './PrivateRoute.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      {/* <Route path="" element={<PrivateRoute>
      <Home />
    </PrivateRoute>}/> */}
      <Route path="" element={<Home/>}/>
      <Route path="Login" element={<Login/>}/>
      <Route path="Register" element={<Register/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
