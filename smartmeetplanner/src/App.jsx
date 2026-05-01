import { useState } from 'react'
import './App.css'
import Header from './compoonents/Header/Header'
import Footer from './compoonents/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user"))
  );
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
