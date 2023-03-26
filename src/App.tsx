import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Hotel from './pages/Hotel'
import List from './pages/List'
import Login from './pages/Login'
import Register from './pages/Register'
import { useActions } from './services/hooks'

function App() {
  const { setUser } = useActions()
  const { addSearchInfo } = useActions()

  const user = JSON.parse(
    localStorage.getItem('user') || JSON.stringify({ name: null, token: null })
  )

  const searchInfo = JSON.parse(
    localStorage.getItem('searchInfo') ||
      JSON.stringify({
        destination: null,
        dates: [
          { startDate: new Date(), endDate: new Date(), key: 'selection' },
        ],
        options: { adult: 1, children: 0, room: 1 },
      })
  )

  useEffect(() => {
    setUser(user)
    addSearchInfo(searchInfo)
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/hotels' element={<List />} />
          <Route path='/hotels/:id' element={<Hotel />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
