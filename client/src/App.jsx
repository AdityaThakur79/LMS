import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/login.jsx'
import MainLayout from './layout/MainLayout.jsx'
import Herosection from './pages/student/Herosection.jsx'
import Courses from './pages/student/Courses.jsx'
import MyLearning from './pages/student/MyLearning.jsx'
import Profile from './pages/student/Profile.jsx'
import Sidebar from './pages/admin/Sidebar.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'


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
    },

    {
      path: "admin",
      element: (

        <Sidebar />

      ),
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "course",
          element: <CourseTable />,
        },
        {
          path: "course/create",
          element: <AddCourse />
        }
      ]
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
