import Homepage from './Pages/HomePage';
import LandingPage from './Pages/LandingPage';
import TestPage from './Pages/TestPage';
import PageNotFound from './Pages/PageNotFound';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import InstructionPage from './Pages/InstructionPage';
import MatrixPage from './Pages/MatrixPage';
import RowPage from './Pages/RowPage';
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <LandingPage />,
      // element : <TestPage />,
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
      path:"/auditory-testpage",
      element:<TestPage />,
      errorElement:<PageNotFound />,      
    },
    {
      path:"/matrixspan",
      element: <MatrixPage />,
      errorElement:<PageNotFound />
    },
    {
      path:"/rowspan",
      element: <RowPage />,
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

