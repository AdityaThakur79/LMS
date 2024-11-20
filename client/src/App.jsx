import './App.css'
import Navbar from './components/Navbar'
import { Button } from './components/ui/button'
import Login from './pages/login'
import Herosection from './pages/student/Herosection'


function App() {
  return (
    <>
      <Navbar />
      <Herosection />
      <Login />

    </>
  )
}

export default App
