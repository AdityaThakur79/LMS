import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/login.jsx'
import MainLayout from './layout/MainLayout.jsx'
import Herosection from './pages/student/Herosection.jsx'
import Courses from './pages/student/Courses.jsx'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'

const appRouter = createBrowserRouter([{
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element:
        <>
          <Herosection />
          <Courses />
        </>
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path: "mylearning",
      element: <MyLearning />
    },
    {
      path: "profile",
      element: <Profile />
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
