import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Register/>
    </>
  )
}

export default App
