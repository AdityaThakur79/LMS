import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/login.jsx'
import Herosection from './pages/student/Herosection.jsx'
import MainLayout from './layout/MainLayout.jsx'

const appRouter = createBrowserRouter([{
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element:
        <>
          <Herosection />
          {/* Courses */}
        </>
    },
    {
      path: "login",
      element: <Login />
    }
  ]
}])

function App() {

  return (

    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
