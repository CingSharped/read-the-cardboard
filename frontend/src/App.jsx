import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components/'
import * as Pages from './pages'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Pages.Home />}/>
        <Route path='/dashboard' element={<Pages.Dashboard />}/>
      </Route>
    </Routes>
  )
}

export default App
