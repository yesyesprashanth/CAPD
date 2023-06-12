import './App.css'
import Homepage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import PageNotFound from './Pages/PageNotFound';
import Layout from './components/Layout/LandingPage/Layout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <LandingPage />,
      errorElement:<PageNotFound />
    },
    {
      path:"/homepage",
      element:<Homepage />,
      errorElement:<PageNotFound />,      
    },
  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
