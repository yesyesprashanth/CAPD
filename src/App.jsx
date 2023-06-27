import Homepage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import TestPage from './Pages/TestPage';
import PageNotFound from './Pages/PageNotFound';
import Layout from './components/Layout/LandingPage/Layout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import InstructionPage from './Pages/InstructionPage';
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
    {
      path:"/instruction",
      element:<InstructionPage />,
      errorElement:<PageNotFound />,      
    },
    {
      path:"/Auditory",
      element:<TestPage />,
      errorElement:<PageNotFound />,      
    },
    {
      path:"/jamesbond",
      element: <TestPage />,
      errorElement:<PageNotFound />
    }
  ])

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
