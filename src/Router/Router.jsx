

import { createBrowserRouter } from "react-router";
import HomeLayout from "../AllLayouts/HomeLayout/Homelayout";
import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "../component/PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element:  <HomeLayout></HomeLayout>,
    errorElement: <Error404 />, 
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error404 />,
      },
      {
        path: "signin",
        element: <Signin></Signin> ,
        errorElement: <Error404 />,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
        errorElement: <Error404 />,
      },
      
      {
        path: "",
        
        element: (
          <PrivateRoute>
          
          </PrivateRoute>
        ),
        errorElement: <Error404 />,
      },
      
    ],
  },
  {
    path: "*",
    element: <Error404 />, // catch-all fallback for unknown routes
  },
]);