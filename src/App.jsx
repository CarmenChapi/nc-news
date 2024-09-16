import { useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='app'>
     <Header/>
     <Body/>
     </div>
    </>
  )
}

export default App
