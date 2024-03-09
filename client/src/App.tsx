import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chats from './pages/Chats'
import PruebaAuth from './pages/PruebaAuth'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Chats></Chats>} />
          <Route path='/prueba' element={<PruebaAuth></PruebaAuth>} />
        </Routes>
      </BrowserRouter></>
  )
}

export default App
