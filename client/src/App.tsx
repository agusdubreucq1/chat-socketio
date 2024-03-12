import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chats from './pages/Chats'
import PruebaAuth from './pages/PruebaAuth'
import Header from './components/layout/Header'
import Profile from './pages/Profile'
import Messages from './pages/Messages'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'


function App() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  useQuery({
    queryKey: ['token'],
    queryFn: async () => await getAccessTokenSilently(),
    enabled: isAuthenticated
  })

  return (
    <>
      <BrowserRouter>
        <Header></Header>

        <Routes>
          <Route path='/profile' element={<Profile></Profile>} />
          <Route path='/' element={<Chats></Chats>} >
            <Route path='/:id' element={<Messages></Messages>} />
          </Route>
          <Route path='/prueba' element={<PruebaAuth></PruebaAuth>} />
        </Routes>
      </BrowserRouter></>
  )
}

export default App
